import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { globalStyles } from '../../styles/global';

export default function SobreScreen() {

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.title}>
                {'Como criar novas receitas:'}
            </Text>
            <Text style={globalStyles.descricao}>
                {'Adicione todos os ingredientes que quer para a receita no campo de ingredientes, de preferencia separados por virgula.'}
            </Text>
            <Text style={globalStyles.descricao2}>
                {'Ex: banana, morango, açucar, leite'}
            </Text>
            <Text style={globalStyles.descricao}>
                {'Os ingredientes básicos estão inclusos por padrão,'}
                <Text style={globalStyles.descricao2}>
                    {' desmarque '}
                </Text>
                {'caso não tenha algum.'}
            </Text>
            <Text style={globalStyles.descricao}>
                {'Selecione o tipo de receita e as restriçoes alimentares (caso necessário).'}
            </Text>
            <Text style={globalStyles.descricao}>
                {'Deixe que sua receita seja gerada.'}
            </Text>
            <Text style={globalStyles.descricao}>
                {'Caso goste da receita você pode adiciona-la aos favoritos para não perde-la.'}
            </Text>
        </SafeAreaView>
    );
}