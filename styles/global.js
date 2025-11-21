import { StyleSheet } from "react-native";

const corDestaque = '#f78f25';
const corDestaque2 = '#f0a016';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffff1',
  },

  container: {
    flex: 1,
    backgroundColor: '#fffff1',
    padding: 8,
  },

  title: {
    fontSize: 30,
    marginLeft: 20,
    marginVertical: 5,
    fontWeight: 'bold',
    color: corDestaque,
  },
  titleAlign: {
    fontSize: 30,
    margin: 20,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 'bold',
    color: corDestaque,
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 25,
    marginLeft: 20,
    marginVertical: 5,
    fontWeight: 'bold',
    color: corDestaque2,
  },

  descricao: {
    margin: 20,
    fontSize: 18,
    marginVertical: 5,
    color: '#000',
  },

  descricao2: {
    fontSize: 18,
    marginVertical: 5,
    color: '#000',
    fontWeight: 'bold',
    margin: 25,
    textAlign: 'center',
  },

  item: {
    marginVertical: 5,
  },
});