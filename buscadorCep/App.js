import React, {useState} from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import Api from './src/services/api'

export default function App(){

  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [bairro, setBairro] = useState("")
  const [localidade, setLocalidade] = useState("")
  const [uf, setUf] = useState("")

  async function buscarCep(){
    if(cep ==""){
      Alert.alert("Cep inválido!")
      setCep("")
    }

    try{
      const response = await Api.get(`/${cep}/json/`)
      setLogradouro(response.data.logradouro)
      setBairro(response.data.bairro)
      setLocalidade(response.data.localidade)
      setUf(response.data.uf)
    }catch(error){
      console.log("ERRO" + error)
    }

  }

  return(
    <View syle={styles.containerPrincipal}> 

      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de Cep 📌</Text>
      </View>

      <View style= {styles.containerCep}>
        <TextInput
        style={{
            borderColor: "#000000",
            borderWidth: 2,
            width: 200,
            fontSize: 18,
            marginTop: 30,
            marginEnd: 20,
            borderRadius: 10,
            padding: 20
          }}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Cep"
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textoInfo}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"/>
      <TextInput
        style={styles.textoInfo}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"/>
      <TextInput
        style={styles.textoInfo}
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"/>

      <TextInput
        style={{
            borderColor: "#000000",
            borderWidth: 2,
            width: 100,
            fontSize: 18,
            marginTop: 10,
            marginEnd: 20,
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 15
          }}
          value={uf}
          onChangeText={(texto) => setUf(texto)}
          placeholder="Estado"
        />
    </View>
  )
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    flexDirection: "column"
  },
  topBar: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "#0079FF",
    marginTop: 0
  },
  title: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 20,
    marginTop: 40
  },
  containerCep:{
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20,
    marginTop: 30
  },
  botaoBuscar:{
    backgroundColor: "#00DFA2",
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20
    
  },
  textoBotao:{
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center"
  },
  textoInfo:{
    borderColor: "#000000",
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20
  }

})