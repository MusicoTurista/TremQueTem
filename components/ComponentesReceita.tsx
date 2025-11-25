import { View, Text} from 'react-native';

import { globalStyles } from '../styles/global';

export const Item = ({ nome, quantidade, unidade, nota }) => (
    <View style={globalStyles.item}>
        <Text style={globalStyles.subTitle}>
            {nome} - {quantidade} {unidade}
        </Text>
        <Text style={globalStyles.descricao}>{nota}</Text>
    </View>
);

export const Passo = ({ passo, titulo, instrucao }) => (
    <View style={globalStyles.item}>
        <Text style={globalStyles.subTitle}>
            {passo} - {titulo}
        </Text>
        <Text style={globalStyles.descricao}>{instrucao}</Text>
    </View>
);