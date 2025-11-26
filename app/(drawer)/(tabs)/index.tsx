import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/global';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { TurnButton } from '../../../components/TurnButton'


export default function ListagemScreen() {

    const [valor, setValor] = useState<string>('');

    const [useSal, setUseSal] = useState<boolean>(true);
    const [useAlho, setUseAlho] = useState<boolean>(true);
    const [useCebola, setUseCebola] = useState<boolean>(true);
    const [useOleo, setUseOleo] = useState<boolean>(true);
    const [useAzeite, setUseAzeite] = useState<boolean>(true);
    const [useAcucar, setUseAcucar] = useState<boolean>(true);
    const [useFarinha, setUseFarinha] = useState<boolean>(true);
    const [useOvo, setUseOvo] = useState<boolean>(true);

    const [useSalgado, setUseSalgado] = useState<boolean>(true);
    const [useDoce, setUseDoce] = useState<boolean>(false);
    const [useAgridoce, setUseAgridoce] = useState<boolean>(false);

    const [useLactose, setUseLactose] = useState<boolean>(false);
    const [useGluten, setUseGluten] = useState<boolean>(false);

    return (
        <SafeAreaView style={[globalStyles.container, { alignItems: 'center' }]}>
            <ScrollView style={globalStyles.container}>
                <View style={[globalStyles.container, { alignItems: 'center' }]}>
                    <TextInput
                    style={[{
                        flex: 1,
                        backgroundColor: "#fff",
                        borderColor: "#000",
                        borderWidth: 1,
                        width: 300,
                        color: '#000',
                        fontSize: 18,
                        padding: 20,
                        borderRadius: 20,
                        textAlignVertical: 'top',
                        marginBottom: 15,
                    }]}
                    placeholderTextColor='grey'
                    onChangeText={setValor}
                    value={valor}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={'Ingredientes...\nEx:\nPimenta, batata, feijão\nPode conter banana, manga'}
                />

                <Text style={globalStyles.descricao2}>
                    {'Basicos (Pode conter)'}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>


                    <TurnButton
                        text="Sal"
                        state={useSal}
                        onPress={() => { setUseSal(prev => !prev) }}
                    />
                    <TurnButton
                        text="Alho"
                        state={useAlho}
                        onPress={() => { setUseAlho(prev => !prev) }}
                    />
                    <TurnButton
                        text="Cebola"
                        state={useCebola}
                        onPress={() => { setUseCebola(prev => !prev) }}
                    />
                    <TurnButton
                        text="Óleo"
                        state={useOleo}
                        onPress={() => { setUseOleo(prev => !prev) }}
                    />
                    <TurnButton
                        text="Azeite"
                        state={useAzeite}
                        onPress={() => { setUseAzeite(prev => !prev) }}
                    />
                    <TurnButton
                        text="Açúcar"
                        state={useAcucar}
                        onPress={() => { setUseAcucar(prev => !prev) }}
                    />
                    <TurnButton
                        text="Farinha"
                        state={useFarinha}
                        onPress={() => { setUseFarinha(prev => !prev) }}
                    />
                    <TurnButton
                        text="Ovo"
                        state={useOvo}
                        onPress={() => { setUseOvo(prev => !prev) }}
                    />

                </View>

                <Text style={globalStyles.descricao2}>
                    Tipo
                </Text>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',

                }}>
                    <TurnButton
                        text="Salgado"
                        state={useSalgado}
                        onPress={() => { setUseSalgado(true), setUseDoce(false), setUseAgridoce(false) }}
                    />
                    <TurnButton
                        text="Doce"
                        state={useDoce}
                        onPress={() => { setUseSalgado(false), setUseDoce(true), setUseAgridoce(false) }}
                    />
                    <TurnButton
                        text="Agridoce"
                        state={useAgridoce}
                        onPress={() => { setUseSalgado(false), setUseDoce(false), setUseAgridoce(true) }}
                    />
                </View>
                <Text style={globalStyles.descricao2}>
                    Restições
                </Text>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',

                }}>
                    <TurnButton
                        text="Lactose"
                        state={useLactose}
                        onPress={() => { setUseLactose(prev => !prev) }}
                    />
                    <TurnButton
                        text="Glúten"
                        state={useGluten}
                        onPress={() => { setUseGluten(prev => !prev) }}
                    />
                </View>
                <Pressable onPress={() => {
                    if (valor.trim() == '') {
                        return
                    }
                    var _tipo
                    var _basicos = ''
                    var _restricoes = ''

                    if (useSal) {
                        _basicos += 'Sal, '
                    }
                    if (useAlho) {
                        _basicos += 'Alho, '
                    }
                    if (useCebola) {
                        _basicos += 'Cebola, '
                    }
                    if (useOleo) {
                        _basicos += 'Óleo, '
                    }
                    if (useAzeite) {
                        _basicos += 'Azeite, '
                    }
                    if (useAcucar) {
                        _basicos += 'Açúcar, '
                    }
                    if (useFarinha) {
                        _basicos += 'Farinha, '
                    }
                    if (useOvo) {
                        _basicos += 'Ovo'
                    }

                    if (useSalgado) {
                        _tipo = 'Salgada'
                    } else if (useDoce) {
                        _tipo = 'Doce'
                    } else {
                        _tipo = 'Agridoce'
                    }

                    if (useLactose) {
                        _restricoes += 'Lactose, '
                    }
                    if (useGluten) {
                        _restricoes += 'Glúten'
                    }

                    const dataTable = {
                        aiSearch: true,
                        receita: valor,
                        basicos: _basicos,
                        tipo: _tipo,
                        resticoes: _restricoes
                    }

                    router.push({
                        pathname: "../receita",
                        params: {
                            list: JSON.stringify(dataTable),
                        },
                    });
                }}>
                    <View style={{
                        backgroundColor: '#f78f25',
                        marginTop:20,
                        borderRadius: 10,
                        padding: 5,
                        alignItems: 'center'
                    }}>
                        <Text style={[globalStyles.descricao, {color:'#fff'}]}>
                            {"Me surpreenda"}
                        </Text>
                    </View>
                </Pressable>
                </View>
                
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    active: {
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 200,
        backgroundColor: '#f78f25',
        color: '#fff',
        margin: 5,
    },
    deactive: {
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 200,
        backgroundColor: '#aaa',
        color: '#fff',
        margin: 5,
    },
})