import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("HomeScreen a le focus");
    } else {
      console.log("HomeScreen n'a plus le focus");
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
