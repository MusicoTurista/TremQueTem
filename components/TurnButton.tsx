import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

type Props = {
    text: string,
    state: boolean,
    onPress: Function,
}

export function TurnButton(props: Props) {
    
    return (
        <Pressable onPress={() => {
            props.onPress()
        }}>

            <Text style={props.state ? styles.active : styles.deactive}>
                {props.text}
            </Text>

        </Pressable>
    )
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