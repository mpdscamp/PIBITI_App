import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as Device from 'expo-device';

import AppContext from "../context-provider/AppContext";
import { ScrollView } from "react-native-gesture-handler";

const dados_lagartas = require("../dados/Dados_Lagartas.json");
const dados_rodas = require("../dados/Dados_Rodas.json");

export default function MainScreen({ navigation }) {
  const classes = [
    4, 8, 12, 16, 20, 24, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150,
  ];
  const distancias = [];
  let [buttonPressed, setButtonPressed] = useState(false);
  let [vizButtonPressed, setVizButtonPressed] = useState(false);

  const {
    varl,
    setl,
    varlu,
    setlu,
    vart,
    sett,
    vard,
    setd,
    vars,
    sets,
    varb,
    setb,
    varnv,
    setnv,
    varn,
    setn,
    m1,
    setm1,
    m2,
    setm2,
    classeL1,
    setClasseL1,
    classeR1,
    setClasseR1,
    classeL2,
    setClasseL2,
    classeR2,
    setClasseR2,
  } = useContext(AppContext);

  const data = {
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
  };

  useEffect(() => {
    calcularClasses();
    setButtonPressed(false);
  }, [buttonPressed]);

  useEffect(() => {
    setVizButtonPressed(false);
  }, [vizButtonPressed]);

  const calcularClasses = () => {
    for (const dado in data) {
      if (data["varn"] !== "1" && data["varn"] !== "2") {
        return;
      } else if (
        typeof data[dado] === "undefined" &&
        dado !== "m1" &&
        dado !== "m2"
      ) {
        return;
      }
    }

    let n1 = (4.5 * data.varnv) / data.varlu;
    let n2 = data.varnv / data.varn;

    let m1_temp =
      13.83 *
        n1 *
        (158 +
          0.4 *
            data.vard *
            (0.428 * data.vart +
              1.13 * data.varl +
              0.0108 * data.vars +
              0.308 * data.varb -
              24.1)) +
      12.129 * data.varl * data.varl;
    let m2_temp =
      13.83 *
        n2 *
        (158 +
          0.4 *
            data.vard *
            (0.428 * data.vart +
              1.13 * data.varl +
              0.0108 * data.vars +
              0.308 * data.varb -
              24.1)) +
      12.129 * data.varl * data.varl;

    setm1(m1_temp / 1000);
    setm2(m2_temp / 1000);

    for (let i = 0; i < Object.keys(dados_lagartas[0]).length; i++) {
      let arr = Object.keys(dados_lagartas[0]);

      let dist_ponto = arr[i];
      dist_ponto = dist_ponto.replace(/,/g, ".");

      distancias.push(Number(dist_ponto));
    }

    const nearest_dist = distancias.reduce((prev, curr) =>
      Math.abs(curr - data.varl) < Math.abs(prev - data.varl) ? curr : prev
    );

    let nearest_dist_left,
      nearest_dist_right,
      nearest_dist_left_string,
      nearest_dist_right_string;

    // Distâncias tabeladas mais próximas da fornecida
    if (data.varl > nearest_dist) {
      let nearest_dist_index = distancias.indexOf(nearest_dist);
      nearest_dist_left = nearest_dist;
      nearest_dist_right = distancias[nearest_dist_index + 1];
      nearest_dist_left_string = String(nearest_dist_left).replace(".", ",");
      nearest_dist_right_string = String(nearest_dist_right).replace(".", ",");
    } else if (data.varl < nearest_dist) {
      let nearest_dist_index = distancias.indexOf(nearest_dist);
      nearest_dist_right = nearest_dist;
      nearest_dist_left = distancias[nearest_dist_index - 1];
      nearest_dist_left_string = String(nearest_dist_left).replace(".", ",");
      nearest_dist_right_string = String(nearest_dist_right).replace(".", ",");
    } else {
      nearest_dist_left = nearest_dist;
      nearest_dist_right = nearest_dist;
      nearest_dist_left_string = String(nearest_dist_left).replace(".", ",");
      nearest_dist_right_string = String(nearest_dist_right).replace(".", ",");
    }

    let valores_para_dist_left_lagartas = [],
      valores_para_dist_right_lagartas = [],
      valores_para_dist_left_rodas = [],
      valores_para_dist_right_rodas = [];

    for (let i = 0; i < dados_lagartas.length; i++) {
      valores_para_dist_left_lagartas.push(
        dados_lagartas[i][nearest_dist_left_string]
      );
      valores_para_dist_right_lagartas.push(
        dados_lagartas[i][nearest_dist_right_string]
      );

      valores_para_dist_left_rodas.push(
        dados_rodas[i][nearest_dist_left_string]
      );
      valores_para_dist_right_rodas.push(
        dados_rodas[i][nearest_dist_right_string]
      );
    }

    let expected_momentum_lagartas = [],
      expected_momentum_rodas = [];

    for (let i = 0; i < valores_para_dist_left_lagartas.length; i++) {
      let a =
        Math.log10(
          valores_para_dist_right_lagartas[i] /
            valores_para_dist_left_lagartas[i]
        ) / Math.log10(nearest_dist_right / nearest_dist_left);
      let b =
        Math.log10(valores_para_dist_right_lagartas[i]) -
        a * Math.log10(nearest_dist_right);
      let expected_momentum_temp = Math.pow(10, a * Math.log10(data.varl) + b);
      expected_momentum_lagartas.push(expected_momentum_temp);

      a =
        Math.log10(
          valores_para_dist_right_rodas[i] / valores_para_dist_left_rodas[i]
        ) / Math.log10(nearest_dist_right / nearest_dist_left);
      b =
        Math.log10(valores_para_dist_right_rodas[i]) -
        a * Math.log10(nearest_dist_right);
      expected_momentum_temp = Math.pow(10, a * Math.log10(data.varl) + b);
      expected_momentum_rodas.push(expected_momentum_temp);
    }

    // Cálculo das classes para n = 1 (uma via)
    if (data["varn"] === "1") {
      const nearest_momentum_m1_lagartas = expected_momentum_lagartas.reduce(
        (prev, curr) =>
          Math.abs(curr - data.m1) < Math.abs(prev - data.m1) ? curr : prev
      );
      const nearest_momentum_m1_rodas = expected_momentum_rodas.reduce(
        (prev, curr) =>
          Math.abs(curr - data.m1) < Math.abs(prev - data.m1) ? curr : prev
      );

      let nearest_momentum_m1_lagartas_index;
      let nearest_momentum_m1_rodas_index;

      nearest_momentum_m1_lagartas_index = expected_momentum_lagartas.indexOf(
        nearest_momentum_m1_lagartas
      );
      nearest_momentum_m1_rodas_index = expected_momentum_rodas.indexOf(
        nearest_momentum_m1_rodas
      );

      let classeL1_temp = classes[nearest_momentum_m1_lagartas_index];
      let classeR1_temp = classes[nearest_momentum_m1_rodas_index];
      setClasseR1(classeR1_temp);
      setClasseL1(classeL1_temp);
    } // Cálculo das classes para n = 2 (duas vias)
    else if (data["varn"] === "2") {
      const nearest_momentum_m2_lagartas = expected_momentum_lagartas.reduce(
        (prev, curr) =>
          Math.abs(curr - data.m2) < Math.abs(prev - data.m2) ? curr : prev
      );
      const nearest_momentum_m2_rodas = expected_momentum_rodas.reduce(
        (prev, curr) =>
          Math.abs(curr - data.m2) < Math.abs(prev - data.m2) ? curr : prev
      );

      let nearest_momentum_m2_lagartas_index;
      let nearest_momentum_m2_rodas_index;

      nearest_momentum_m2_lagartas_index = expected_momentum_lagartas.indexOf(
        nearest_momentum_m2_lagartas
      );
      nearest_momentum_m2_rodas_index = expected_momentum_rodas.indexOf(
        nearest_momentum_m2_rodas
      );

      let classeL2_temp = classes[nearest_momentum_m2_lagartas_index];
      let classeR2_temp = classes[nearest_momentum_m2_rodas_index];
      setClasseR2(classeR2_temp);
      setClasseL2(classeL2_temp);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.vizButton}
        onPress={() => {
          navigation.navigate("Adicionar dados do relatório");
        }}
      >
        <Text style={styles.vizButtonText}>
          Migrar para a página do relatório
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>PONTES DE CONCRETO ARMADO COM VIGAS EM T</Text>

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
            label="Comprimento do vão (L, m)"
            value={varl}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              setl(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Largura da pista entre rodapés (Lu, m)"
            value={varlu}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              setlu(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Largura total da laje (T, cm)"
            value={vart}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              sett(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Espessura da laje de concreto (D, cm)"
            value={vard}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              setd(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Distância entre as vigas (S, cm)"
            value={vars}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              sets(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Espessura da viga (b, cm)"
            value={varb}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              setb(newEntryValue);
            }}
          />
        </View>
      </View>

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
            label="Número total de vigas (nv)"
            value={varnv}
            onChangeText={(entryValue) => {
              let newEntryValue = entryValue.replace(/[^0-9 | .]/g, "");
              setnv(newEntryValue);
            }}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Device.modelName === "ios" ? "padding" : "height"}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-start", marginBottom: 15 }}
        >
          <TextInput
            mode="outlined"
            outlineColor="#556B2F"
            activeOutlineColor="#556B2F"
            label="Número total de vias (n)"
            value={varn}
            onChangeText={(entryValue) => {
              setClasseL1(null);
              setClasseL2(null);
              setClasseR1(null);
              setClasseR2(null);
              let newEntryValue = entryValue.replace(/[^1-2]/g, "");
              setn(newEntryValue);
            }}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.vizButton}
        onPress={() => {
          navigation.navigate("Locais das Medidas na Ponte");
        }}
      >
        <Text style={styles.vizButtonText}>
          Visualizar locais das medidas na ponte
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setButtonPressed(true);
        }}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <View style={styles.container_answer}>
        <Text style={styles.above_answer}>CLASSES</Text>
        <View style={styles.answer}>
          {typeof classeR1 == "number" &&
          typeof classeL1 == "number" &&
          data.varn == 1 ? (
            <Text>
              {classeR1}R | {classeL1}L
            </Text>
          ) : typeof classeR2 == "number" &&
            typeof classeL2 == "number" &&
            data.varn == 2 ? (
            <Text>
              {classeR2}R | {classeL2}L
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </ScrollView>
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
    minHeight: '117%'
  },
  title: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333333",
  },
  button: {
    width: "100%",
    height: 30,
    backgroundColor: "#54A075",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
  text_ind: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    height: 25,
  },
  input: {
    backgroundColor: "#fff",
    height: 25,
    justifyContent: "flex-end",
    textAlign: "center",
    marginBottom: 10,
  },
  container_answer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  above_answer: {
    marginBottom: 3,
  },
  answer: {
    backgroundColor: "#fff",
    width: "100%",
    height: 40,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#556B2F",
    borderWidth: "1",
  },
});
