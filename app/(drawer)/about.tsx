import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image} from 'react-native';
import { globalStyles } from '../../styles/global';

export default function SobreScreen() {
    return (
        <SafeAreaView style={globalStyles.container} edges={['top']}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.logo}
                />
                <View style={{ flexDirection: 'column', flex:1, paddingRight:8}}>
                    <Text style={globalStyles.title}>Trem que Tem</Text>
                    <Text style={globalStyles.subTitle}>Crie receitas com o que tem na hora!</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Sobre o App</Text>
                <Text style={styles.text}>
                    O Trem que Tem te ajuda a descobrir receitas usando apenas os ingredientes que você já tem em casa. Simples, rápido e sem desperdício. Cozinhar vira um trem bão sem complicação!
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Tecnologias</Text>
                <Text style={styles.text}>• React Native + Expo</Text>
                <Text style={styles.text}>• Expo Router (file-based routing)</Text>
                <Text style={styles.text}>• Gemini API (Geração de receitas)</Text>
            </View>

            <Text style={styles.footer}>v1.0.0</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', marginBottom: 16, alignItems: 'center'},
    logo: { width: 125, height: 125, borderRadius: 10},
    card: {
        backgroundColor: '#ffeabeff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#2a2a2a',
        width: '100%',
    },
    sectionTitle: { color: '#f78f25', fontSize: 16, fontWeight: '600', marginBottom: 8 },
    footer: { marginTop: 'auto', color: '#777', textAlign: 'center', fontSize: 12 },
    text: {
        margin: 20,
        fontSize: 13,
        marginVertical: 5,
        color: '#000',
    },
});