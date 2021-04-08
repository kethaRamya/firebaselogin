
 import React, { Component, useState } from "react";
 import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert } from "react-native";
 
 import auth, { firebase } from "@react-native-firebase/auth";
 const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");
    const [isValid, setValid] = useState(true);

    const __filterError = error => {
        let message = "";
        let index = error.indexOf("]");
        message = error.substr(index + 1, error.length - 1);
      
        return message;
      };
      
      const __isValidEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };
    const __doLogin = () => {
      if (!email) {
        setError("Email required *");
        setValid(false);
        return;
      } else if (!password && password.trim() && password.length > 6) {
        setError("Weak password, minimum 5 chars");
        setValid(false);
        return;
      } else if (!__isValidEmail(email)) {
        setError("Invalid Email");
        setValid(false);
        return;
      }
      let signInRequestData = {
        email,
        password
      };
  
      __doSingIn(email, password);
    };
  
    const __doSingIn = async (email, password) => {
      try {
        let response = await auth().signInWithEmailAndPassword(email, password);
        if (response && response.user) {
          Alert.alert("Success ✅", "Logged successfully");
          props.navigation.navigate("Screen1")
        }
      } catch (e) {
        console.error(e.message);
      }
    };
  
    return (
      <SafeAreaView style={styles.containerStyle}>
        <View style={{ flex: 0.2 }}>{!!fetching && <ActivityIndicator color={blue} />}</View>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.headerTitleStyle}> Log In </Text>
        </View>
        <View style={styles.formContainerStyle}>
          <TextInput
            label={"Email"}
            autoCapitalize={false}
            keyboardType="email-address"
            style={styles.textInputStyle}
            placeholder="Mail address"
            onChangeText={text => {
              // let isValid = this.state.isValid;
              // isValid["email"] = !this.__isValidEmail(text);
              setValid(__isValidEmail(text));
              setEmail(text);
            }}
            error={isValid}
          />
          <TextInput label={"Password"} secureTextEntry autoCapitalize={false} style={styles.textInputStyle} selectionColor={blue} placeholder="Password" error={isValid} onChangeText={text => setPassword(text)} />
        </View>
        {error ? (
          <View style={styles.errorLabelContainerStyle}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}
  
        <View style={styles.signInButtonContainerStyle}>
          <TouchableHighlight style={styles.signInButtonStyle} onPress={__doLogin} underlayColor={blue}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.signInButtonTextStyle}>Sign In</Text>
            </View>
          </TouchableHighlight>
        </View>
        
        <View style={styles.loginButtonContainerStyle}>
                <TouchableOpacity style={styles.loginButtonStyle} onPress={() => {props.navigation.navigate("SignUp")}}>
                  <Text style={styles.loginButtonTextStyle}> { "New? Create account."}</Text>
                </TouchableOpacity>
              </View>
      </SafeAreaView>
    );
  };

  export default LoginComponent
  const baseMargin = 5;
const doubleBaseMargin = 10;
const blue = "#ff0000";

const styles = StyleSheet.create({
  containerStyle: {
    //flex: 1,
    marginTop:50,
    
    justifyContent: "space-around"
  },
  headerContainerStyle: {
   // flex: 0.2,
   marginBottom:10,
    alignItems: "center"
  },
  headerTitleStyle: {
    color: blue,
    fontSize: 30,
    fontWeight: "bold"
  },
  formContainerStyle: {
    paddingHorizontal: doubleBaseMargin,
    justifyContent: "space-around"
  },
  textInputStyle: {
    height: 60,
    marginVertical: baseMargin,
    borderRadius: 6,
    paddingHorizontal: doubleBaseMargin,
    backgroundColor: "transparent",
    borderColor: "#888",
    borderWidth: 1
  },
  signInButtonContainerStyle: {
    flex: 0.3,
    marginTop: doubleBaseMargin,
    alignItems: "center",
    paddingHorizontal: baseMargin
  },
  signInButtonStyle: {
    width: 130,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 130 / 4,
    alignItems: "center",
    backgroundColor: "#ddd"
  },
  signInButtonTextStyle: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: baseMargin
  },
  signInWithGoogleButtonContainerStyle: {
    flex: 0.2,
    paddingHorizontal: doubleBaseMargin
  },
  signInWithGoogleButtonStyle: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 130 / 4,
    alignItems: "center",
    backgroundColor: "white"
  },
  signInWithGoogleButtonTextStyle: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",

    marginHorizontal: baseMargin
  },
  errorLabelContainerStyle: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center"
  },
  loginButtonContainerStyle: {
    //flex: 0.2,
    paddingHorizontal: baseMargin,
    justifyContent: "center",
    alignItems: "center",
    marginTop:80
  },
  loginButtonStyle: {
    alignItems: "center"
  },
  loginButtonTextStyle: {
    color: blue
  }
});