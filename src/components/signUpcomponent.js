import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight,TouchableOpacity,SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import auth from "@react-native-firebase/auth"

const SignupComponent = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")
  const [isValid, setValid] = useState(true)
  const __isValidEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const __doSignUp = () => {
    if (!email) {
      setError("Email required *")
      setValid(false)
      return
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars")
      setValid(false)
      return
    } else if (!__isValidEmail(email)) {
      setError("Invalid Email")
      setValid(false)
      return
    }

    __doCreateUser(email, password)
  }

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      if (response && response.user) {
        Alert.alert("Success ✅", "Account created successfully")
        props.navigation.navigate("Login")
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <View style={styles.containerStyle}>
      <View style={{ flex: 0.2 }}>
        {!!fetching && <ActivityIndicator 
        color={blue} />}
      </View>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.headerTitleStyle}> Sign Up </Text>
      </View>
      <View style={styles.formContainerStyle}>
        <TextInput
          label={"Email"}
          autoCapitalize={false}
          keyboardType="email-address"
          style={styles.textInputStyle}
          placeholder="Mail address"
          onChangeText={text => {
            setError
            setEmail(text)
          }}
          error={isValid}
        />

        <TextInput
          label={"Password"}
          secureTextEntry
          autoCapitalize={false}
          style={styles.textInputStyle}
          selectionColor={blue}
          placeholder="Password"
          error={isValid}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight
          style={styles.signInButtonStyle}
          onPress={__doSignUp}
          underlayColor={blue}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.signInButtonTextStyle}>Sign Up</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.loginButtonContainerStyle}>
                <TouchableOpacity style={styles.loginButtonStyle} onPress={() => {props.navigation.navigate("Login")}}>
                  <Text style={styles.loginButtonTextStyle}> { "Already have account? Log In"}</Text>
                </TouchableOpacity>
              </View>
    </View>
  )
}
export default SignupComponent
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
    //flex: 0.01,
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
