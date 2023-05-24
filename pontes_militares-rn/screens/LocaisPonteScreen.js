import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function LocaisPonteScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../components/img_vigast.png")}
        style={styles.imageClass}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  imageClass: {
    width: 750,
    height: 390,
    transform: [{ rotate: "90deg" }],
  },
});
