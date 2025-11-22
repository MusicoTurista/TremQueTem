import { View, Text, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { globalStyles } from '../styles/global';

import { MaterialIcons } from '@expo/vector-icons';

import { part1, part2, part3, part4 } from '../components/Prompt'

function capitalizeFirstLetter(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
        return ''; // Handle empty or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Item = ({ nome, quantidade, unidade, nota }: ItemProps) => (
    <View style={globalStyles.item}>
        <Text style={globalStyles.subTitle}>
            {nome} - {quantidade} {unidade}
        </Text>
        <Text style={globalStyles.descricao}>{nota}</Text>
    </View>
);

const Passo = ({ passo, titulo, instrucao }: ItemProps) => (
    <View style={globalStyles.item}>
        <Text style={globalStyles.subTitle}>
            {passo} - {titulo}
        </Text>
        <Text style={globalStyles.descricao}>{instrucao}</Text>
    </View>
);

const Separador = () => (
    <View
        style={{
            height: 5,
            backgroundColor: '#f78f25',
            marginVertical: 15,
            borderRadius: 200,
        }}
    />
);

const API_KEY = 'AIzaSyAVd_SQjsQveBBHCgzvn_6o16D7qh5zjwI'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

export default function HomeScreen() {

    const [Receita, setReceita] = useState<JSON>();

    const { list } = useLocalSearchParams();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [isFavorite, setFavorite] = useState<boolean>(false);

    const gerarReceita = () => {
        const recipeData = JSON.parse(list as string)

        var promtpFinal = part1(recipeData.tipo) + recipeData.receita

        if (recipeData.basicos != '') {
            promtpFinal += ' ' + part2() + recipeData.basicos
        }
        if (recipeData.resticoes != '') {
            promtpFinal += ' ' + part3() + recipeData.resticoes
        }
        promtpFinal += part4()

        if (recipeData.aiSearch) {
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

                            <Text style={[globalStyles.descricao2, {marginHorizontal:5}]}>
                                {Receita.dificuldade} - {Receita.tempo_preparo}
                            </Text>
                            <Pressable onPress={() => {
                                setFavorite(!isFavorite)
                            }}>
                                <MaterialIcons name="favorite" size={25} color={isFavorite ? '#f78f25' : '#252525ff'} />
                            </Pressable>
                        </View>
                        
                        <Text style={[globalStyles.descricao, {textAlign:'center'}]}>{Receita.descricao}</Text>

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
                            keyExtractor={(item) => item.nome}
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
