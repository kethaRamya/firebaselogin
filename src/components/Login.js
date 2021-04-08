import React, { Component, useState } from "react";
import { Platform, StyleSheet, UIManager, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, LayoutAnimation, Alert, ScrollView } from "react-native";

import auth, { firebase } from "@react-native-firebase/auth";
import LoginComponent from './LoginComponent'
import SignupComponent from './signUpcomponent'
import SearchData from './Searchdata'
export default class LoginApp extends React.Component{
    state = {
      isLogin: false,
      authenticated: false
    };
    componentDidMount() {
      //  this.register("said1292@gmail.com", "123456");
      this.__isTheUserAuthenticated();
    }
  
    __isTheUserAuthenticated = () => {
      let user = firebase.auth().currentUser;
      if (user) {
        console.log( user);
  
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    };
  
    render() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      return (
        <View style={{ flex: 1 }}>
          {this.state.authenticated ? (
            <View style={{marginTop:20}}>
              {/* <Text style={{ textAlign: "center" }}>email {firebase.auth().currentUser.email} </Text> */}
              <TouchableOpacity
                  style={styles.loginButtonStyle}
                  onPress={async () => {
                    await firebase.auth().signOut();
                  }}
                >
                  <Text style={styles.loginButtonTextStyle}> Log Out</Text>
                </TouchableOpacity>
              <SearchData/>
              <View style={styles.loginButtonContainerStyle}>
               
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              {this.state.isLogin ? <LoginComponent /> : <SignupComponent />}
  
              <View style={styles.loginButtonContainerStyle}>
                <TouchableOpacity style={styles.loginButtonStyle} onPress={() => this.setState(state => ({ isLogin: !state.isLogin }))}>
                  <Text style={styles.loginButtonTextStyle}> {this.state.isLogin ? "New? Create account." : "Already have account? Log In"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      );
    }
  }

  const baseMargin = 5;
  const doubleBaseMargin = 10;
  const blue = "#ff0000";
  
  const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: "space-around"
    },
    headerContainerStyle: {
      flex: 0.2,
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
      alignItems: "flex-end",
      paddingHorizontal: baseMargin
    },
    signInButtonStyle: {
      width: 130,
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 130 / 4,
      alignItems: "center",
      backgroundColor: "white"
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
      flex: 1,
      paddingHorizontal: baseMargin,
      justifyContent: "center",
      alignItems: "center"
    },
    loginButtonStyle: {
      alignItems: "center"
    },
    loginButtonTextStyle: {
      color: blue
    }
  });