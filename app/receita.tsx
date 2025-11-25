import { View, Text, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { favoritaEvents } from '../events/favoritaEvent';

import { MaterialIcons } from '@expo/vector-icons';

import { part1, part2, part3, part4 } from '../components/Prompt'

import { Item, Passo } from '../components/ComponentesReceita'

import Separador from '../components/Separador'

function capitalizeFirstLetter(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
        return ''; // Handle empty or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

import getAPIKey from '../assets/apiKey'

const API_KEY = getAPIKey()
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

const RECEITAS_FAVORITAS = 'receitas_favoritas';

var receitaID = 0

export default function ReceitaScreen() {
    const [Receita, setReceita] = useState<JSON>();

    const { list } = useLocalSearchParams();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [isFavorite, setFavorite] = useState<boolean>(false);

    
    function generateNewId(favoritas) {
        if (!favoritas.length) return 1;
        const ids = favoritas.map(f => f.id);
        return Math.max(...ids) + 1;
    }

    const ToggleFavorito = () => {
    AsyncStorage.getItem(RECEITAS_FAVORITAS)
        .then(res => {
            const favoritas = res ? JSON.parse(res) : [];

            if (isFavorite) {
                const favoritas_atualizado = favoritas.filter((data) => {
                    return data.id !== receitaID
                });

                AsyncStorage.setItem(RECEITAS_FAVORITAS, JSON.stringify(favoritas_atualizado))
                    .then(() => {
                        setFavorite(false);
                        favoritaEvents.emit('favoritos:changed');
                        
                    });

            } else {
                receitaID = generateNewId(favoritas)
                const saveFile = {
                    id: receitaID,
                    receita: Receita
                };

                const favoritas_atualizado = [...favoritas, saveFile];

                AsyncStorage.setItem(RECEITAS_FAVORITAS, JSON.stringify(favoritas_atualizado))
                    .then(() => {
                        setFavorite(true);
                        favoritaEvents.emit('favoritos:changed');
                    });
            }
        });
};


    const gerarReceita = () => {
        
        const recipeData = JSON.parse(list as string)

        if (recipeData.aiSearch) {
            var promtpFinal = part1(recipeData.tipo) + recipeData.receita

            if (recipeData.basicos != '') {
                promtpFinal += ' ' + part2() + recipeData.basicos
            }
            if (recipeData.resticoes != '') {
                promtpFinal += ' ' + part3() + recipeData.resticoes
            }
            promtpFinal += part4()

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promtpFinal }] }],
                }),
            })
                .then(data => data.json())
                .then(data => {
                    var text
                    text = data.candidates[0].content.parts[0].text
                    text = text.replace(/```json/g, '');
                    text = text.replace(/```/g, '');
                    return text.trim();
                })
                .then(data => {
                    const obj = JSON.parse(data);
                    setReceita(obj);
                    return obj
                })
                .catch(err => setError(true))
                .finally(() => setLoading(false))
        } else {
            AsyncStorage.getItem(RECEITAS_FAVORITAS)
                .then(res => {
                    const favoritas = res ? JSON.parse(res) : [];
                    const receitaFinal = favoritas.filter((m) => m.id === recipeData.id)[0]

                    receitaID = receitaFinal.id
                    setReceita(receitaFinal.receita)
                })
                .catch(err => setError(true))
                .finally(() => setLoading(false));
            setFavorite(true)
        }
    }

    const navigation = useNavigation();
    useEffect(() => {
        gerarReceita()
    }, [list]);

    if (isLoading) {
        return (
            <SafeAreaView style={[globalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size={50} color="#f78f25" />
                <Text style={globalStyles.title}>
                    {'Carregando...'}
                </Text>
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView style={[globalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={globalStyles.title}>
                    {'Ocorreu um erro :('}
                </Text>
            </SafeAreaView>
        )
    }

    if (Receita != null) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={globalStyles.screen}>
                    <ScrollView style={globalStyles.container}>

                        <Text style={globalStyles.titleAlign}>
                            {Receita.nome_receita.toUpperCase()}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>

                            <Text style={[globalStyles.descricao2, { marginHorizontal: 5 }]}>
                                {Receita.dificuldade} - {Receita.tempo_preparo}
                            </Text>
                            <Pressable onPress={() => {
                                ToggleFavorito()
                            }}>
                                <MaterialIcons name="favorite" size={25} color={isFavorite ? '#f78f25' : '#252525ff'} />
                            </Pressable>
                        </View>

                        <Text style={[globalStyles.descricao, { textAlign: 'center' }]}>{Receita.descricao}</Text>

                        <Separador />

                        <Text style={globalStyles.title}>Ingredientes:</Text>
                        <FlatList
                            data={Receita.ingredientes}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <Item
                                    nome={item.nome}
                                    quantidade={item.quantidade}
                                    unidade={capitalizeFirstLetter(item.unidade)}
                                    nota={item.nota}
                                />
                            )}
                        />

                        <Separador />

                        <Text style={globalStyles.title}>Modo de Preparo:</Text>
                        <FlatList
                            data={Receita.modo_preparo}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <Passo
                                    passo={item.passo}
                                    titulo={item.titulo}
                                    instrucao={item.instrucao}
                                />
                            )}
                            keyExtractor={(item) => item.passo}
                        />

                        <Separador />

                        <Text style={globalStyles.title}>Dicas:</Text>

                        <Text style={globalStyles.descricao}>{Receita.alteracao}</Text>

                        <Text style={globalStyles.descricao}>
                            {Receita.nota_importante} {'\n'}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
    return (
        <SafeAreaView style={[globalStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={globalStyles.title}>
                {'Ocorreu um erro :('}
            </Text>
        </SafeAreaView>
    )
}
