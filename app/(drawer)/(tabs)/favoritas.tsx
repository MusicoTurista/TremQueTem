import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/global';
import { Text, ActivityIndicator, StyleSheet, FlatList, View, Pressable, SafeAreaProvider } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritaEvents } from '../../../events/favoritaEvent';
import { router } from 'expo-router';

const RECEITAS_FAVORITAS = 'receitas_favoritas';

export default function FavoritasScreen() {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [receitas, setReceitas] = useState([]);

    const listarReceitas = () => {
        setIsLoading(true);
        setError(null);
        AsyncStorage.getItem(RECEITAS_FAVORITAS)
            .then((res) => {
                const favoritas = res ? JSON.parse(res) : [];

                setReceitas(favoritas);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        listarReceitas();
    }, []);

    useEffect(() => {
        const subscription = favoritaEvents.addListener('favoritos:changed', listarReceitas);

        return () => subscription.remove();
    }, [])

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

    return (
        <SafeAreaView style={globalStyles.screen}>
            <FlatList style={globalStyles.container}
                data={receitas}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        const dataTable = {
                            aiSearch: false,
                            id: item.id,
                        }

                        router.push({
                            pathname: "../../receita",
                            params: {
                                list: JSON.stringify(dataTable),
                            },
                        });
                    }}>
                        <View style={{ marginHorizontal: 10, marginBottom: 10, padding: 8, backgroundColor: '#ffeabeff', borderRadius: 10, }}>
                            <Text style={[globalStyles.title, { fontSize: 22 }]}>
                                {item.receita.nome_receita}
                            </Text>
                            <Text style={[globalStyles.descricao, { fontSize: 18 }]}>
                                {item.receita.dificuldade}
                                {" - "}
                                {item.receita.tempo_preparo}
                            </Text>
                            <Text style={[globalStyles.descricao, { fontSize: 18 }]} numberOfLines={2}>
                                {item.receita.descricao}
                            </Text>
                        </View>

                    </Pressable>

                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    }
});