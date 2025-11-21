import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Link, useNavigation, useLocalSearchParams } from 'expo-router';
import { HeaderTitle } from '@react-navigation/elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useEffect} from 'react'

export default function HomeScreen() {

    const { category, title, description } = useLocalSearchParams();
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
        headerTitle: title,
        headerShown: true,
        });
    }, [navigation, title]);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.category}>{category}</Text>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
        flex: 1,
        gap: 12, // se seu RN não suportar 'gap', troque por margens nos filhos
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    category: {
        color: '#8a8a8aff'
    },
    description: {
        fontSize: 20,
        /* fontWeight: '700', */
    }
});