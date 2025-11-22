import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/global';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import {TurnButton} from '../../../components/TurnButton'


export default function ListagemScreen() {

    const [valor, setValor] = useState<number>(0);


    
    const [useAgua, setUseAgua] = useState<boolean>(true);
    const [useSal, setUseSal] = useState<boolean>(true);
    const [useAcucar, setUseAcucar] = useState<boolean>(true);
    const [useOvo, setUseOvo] = useState<boolean>(true);

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
                    marginBottom: 15,
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
                /* flexWrap: 'wrap', */
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>

                <TurnButton
                    text = "Agua"
                    state = {useAgua}
                    onPress = {() => {setUseAgua(prev => !prev)}}
                />
                <TurnButton
                    text = "Sal"
                    state = {useSal}
                    onPress = {() => {setUseSal(prev => !prev)}}
                />
                <TurnButton
                    text = "Açucar"
                    state = {useAcucar}
                    onPress = {() => {setUseAcucar(prev => !prev)}}
                />
                <TurnButton
                    text = "Ovo"
                    state = {useOvo}
                    onPress = {() => {setUseOvo(prev => !prev)}}
                />

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

    active: {
    alignSelf: 'flex-start',
    paddingHorizontal:20,
    paddingVertical:5,
    borderRadius:200,
    backgroundColor: '#f78f25',
    color: '#fff',
    margin: 5,
  },
  deactive: {
    alignSelf: 'flex-start',
    paddingHorizontal:20,
    paddingVertical:5,
    borderRadius:200,
    backgroundColor: '#aaa',
    color: '#fff',
    margin: 5,
  },
})