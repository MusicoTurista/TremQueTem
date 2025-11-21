import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/global';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100';

export default function ListagemScreen() {

    const [valor, setValor] = useState<number>(0);


    const [isEnabled, setEnabled] = useState<boolean>(true);

    return (
        <SafeAreaView style={[globalStyles.container, { alignItems: 'center' }]}>

            <TextInput
                style={[{
                    flex: 1,
                    backgroundColor: "#fff",
                    borderColor: "#000",
                    borderWidth: 1,
                    width: '90%',
                    color: '#000',
                    fontSize: 18,
                    padding: 20,
                    borderRadius: 20,
                    textAlignVertical: 'top',
                }]}
                placeholderTextColor="#666"
                onChangeText={setValor}
                value={valor}
                multiline
                numberOfLines={4}
                placeholder="Ingredientes..."
            />
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'center',
                alignItems: 'center',

            }}>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={globalStyles.descricao}>
                        {"Ovo"}
                    </Text>
                    <Switch
                        trackColor={{ false: "#838383ff", true: "#838383ff" }}
                        thumbColor={isEnabled ? "#f78f25" : "#f4f3f4"}
                        ios_backgroundColor="#838383ff"
                        onValueChange={setEnabled}
                        value={isEnabled}
                    />
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
})