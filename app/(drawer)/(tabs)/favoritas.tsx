import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../styles/global';
import { Text, ActivityIndicator, StyleSheet, FlatList, View} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritaEvents } from '../../../events/favoritaEvent';


export default function FavoritasScreen() {
    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    }
});