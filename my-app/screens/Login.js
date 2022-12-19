import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Login({ navigation }) {
  const [data, setData] = useState({ email: "", pass: "" });
  const handleLogin = async () => {
    if (data.email && data.pass) {
      try {
        const email = data.email;
        const val = await AsyncStorage.getItem(email);
        if (val != null) {
          const obj = JSON.parse(val);
          if (obj.pass == data.pass) {
            navigation.push("Profile", { data: obj });
          }
        }
      } catch (e) {}
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.loginText, { textAlign: "center" }]}>
        Login By Saleem
      </Text>
      <View>
        <Text style={{ margin: "5px" }}>Email</Text>
        <TextInput
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          style={[styles.input, { margin: "5px" }]}
        />
        <Text style={{ margin: "5px" }}>Password</Text>
        <TextInput
          onChange={(e) => setData({ ...data, pass: e.target.value })}
          value={data.pass}
          style={[styles.input, { margin: "5px" }]}
        />
        <Button onPress={handleLogin} title={"Login"}></Button>
        <Text>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            Click here
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    border: "1px black solid",
  },
});
export default Login;
