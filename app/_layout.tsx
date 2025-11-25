import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global';
export const unstable_settings = {
  anchor: '(drawer)',
};

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={globalStyles.screen}>
                <Stack
                    screenOptions={{headerShown: false,
                        headerStyle: {backgroundColor: '#fffff1'}
                    }}
                >
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}