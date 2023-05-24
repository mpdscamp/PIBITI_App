import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AppContext from "../context-provider/AppContext";

export default function RelatorioScreen({ navigation }) {
  const {
    relNum,
    setRelNum,
    grpDataHora,
    setGrpDataHora,
    nomePostoGrad,
    setNomePostoGrad,
    para,
    setPara,
    nomeNr,
    setNomeNr,
    grpDataHoraRec,
    setGrpDataHoraRec,
    cartaEscalaReg,
    setCartaEscalaReg,
    contatoInimigo,
    setContatoInimigo,
    condMetTempo,
    setCondMetTempo,
    condMetTemperatura,
    setCondMetTemperatura,
    condMetChuva,
    setCondMetChuva,
    varl,
    varlu,
    vart,
    vard,
    vars,
    varb,
    varnv,
    varn,
    m1,
    m2,
    classeR1,
    classeL1,
    classeR2,
    classeL2,
  } = useContext(AppContext);

  const editFile = async () => {
    await fetch("http://mpdscamp.pythonanywhere.com/edit-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        relNum_value: relNum,
        grpDataHora_value: grpDataHora,
        nomePostoGrad_value: nomePostoGrad,
        para_value: para,
        nomeNr_value: nomeNr,
        grpDataHoraRec_value: grpDataHoraRec,
        cartaEscalaReg_value: cartaEscalaReg,
        contatoInimigo_value: contatoInimigo,
        condMetTempo_value: condMetTempo,
        condMetTemperatura_value: condMetTemperatura,
        condMetChuva_value: condMetChuva,
        varl_value: varl,
        varlu_value: varlu,
        vart_value: vart,
        vard_value: vard,
        vars_value: vars,
        varb_value: varb,
        varnv_value: varnv,
        varn_value: varn,
        m1_value: m1,
        m2_value: m2,
        classeR1_value: classeR1,
        classeL1_value: classeL1,
        classeR2_value: classeR2,
        classeL2_value: classeL2,
      }),
    });
  };

  const downloadFile = async () => {
    const fileUri = FileSystem.documentDirectory + "Planilha_Rel.xlsx";

    FileSystem.downloadAsync(
      "http://mpdscamp.pythonanywhere.com/download-file",
      fileUri
    );

    await Sharing.shareAsync(fileUri);
  };

  const buttonPressHandler = async () => {
    try {
      await editFile();
      await downloadFile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.vizButton}
        onPress={() => {
          navigation.navigate("Pontes de concreto armado com vigas em T");
        }}
      >
        <Text style={styles.vizButtonText}>
          Migrar para a página do cálculo de classe
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>RELATÓRIO DE RECONHECIMENTO DE PONTE</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-start", marginBottom: 10 }}
        >
          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Número do relatório"
            value={relNum}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9]/g, "");
              setRelNum(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Grupo Data-Hora"
            value={grpDataHora}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setGrpDataHora(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="De (Nome/Posto/Graduação, OM)"
            value={nomePostoGrad}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setNomePostoGrad(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Para"
            value={para}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setPara(newEntryValue);
            }}
          />
        </View>
      </View>

      <Text style={styles.subtitle}>PARTE 1 - DADOS GERAIS</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-start", marginBottom: 10 }}
        >
          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Nome e Nr do Itn ou Rdv"
            value={nomeNr}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setNomeNr(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Grupo Data-Hora do Reconhecimento"
            value={grpDataHoraRec}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setGrpDataHoraRec(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Carta e Escala da Região"
            value={cartaEscalaReg}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setCartaEscalaReg(newEntryValue);
            }}
          />

          <View
            style={{
              borderWidth: 1.5,
              borderColor: "#556B2F",
              borderRadius: 3,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "white",
            }}
          >
            <RNPickerSelect
              style={{
                placeholder: { color: "#1f1f14" },
                inputIOS: { color: "#1f1f14" },
                inputAndroid: { color: "#1f1f14" },
              }}
              placeholder={{
                label: "Selecione o contato com o inimigo:",
                value: null,
              }}
              onValueChange={(entryValue) => {
                let newEntryValue = entryValue;
                setContatoInimigo(newEntryValue);
              }}
              value={contatoInimigo}
              items={[
                {
                  label: "Houve contato com o inimigo",
                  value: "Houve contato com o inimigo",
                },
                {
                  label: "Observado indícios de presença inimiga",
                  value: "Observado indícios de presença inimiga",
                },
                {
                  label: "Não foi observada presença do inimigo",
                  value: "Não foi observada presença do inimigo",
                },
              ]}
            />
          </View>

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Condições meteorológicas - Tempo"
            value={condMetTempo}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setCondMetTempo(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Condições meteorológicas - Temperatura"
            value={condMetTemperatura}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setCondMetTemperatura(newEntryValue);
            }}
          />

          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Condições meteorológicas - Último dia de chuva"
            value={condMetChuva}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue;
              setCondMetChuva(newEntryValue);
            }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={buttonPressHandler}>
        <Text style={styles.buttonText}>Exportar dados para Arquivo Excel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 14.7,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  subtitle: {
    fontSize: 14.7,
    marginTop: 3,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333333",
  },
  button: {
    width: "100%",
    height: 30,
    backgroundColor: "#54A075",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  vizButton: {
    width: "100%",
    height: 30,
    backgroundColor: "#556B2F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  vizButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
