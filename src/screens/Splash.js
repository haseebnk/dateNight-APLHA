import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  ScrollView, LayoutAnimation,
  Platform,
  UIManager,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import SplashScreen from 'react-native-splash-screen';
import * as Animatable from 'react-native-animatable';
import { transform } from 'lodash';
import { moderateScale } from 'react-native-size-matters';
import SplashScreen from 'react-native-splash-screen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Splashing(props) {



  useEffect(() => {
    SplashScreen.hide()
    setTimeout(() => { fadeIn() }, 1000)
    setTimeout(() => { fadeInUp() }, 1000)
    setTimeout(() => props.navigation.navigate("slider") , 2000);
  }, []);

  const fadeAnim = useRef(new Animated.Value(-130)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver:true

    }).start();
  };

  const fadeAnimUp = useRef(new Animated.Value(130)).current;


  const fadeInUp = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnimUp, {
      toValue: 1,
      duration: 1000,
      useNativeDriver:true

    }).start();
  };



  return (
    <TouchableWithoutFeedback >
      <View style={styles.container}>




        <Animated.View style={{ translateY: fadeAnim }}>
          <Animatable.Text delay={1500} style={styles.welcome} animation="slideInDown"  >welcome to</Animatable.Text>
          <Animatable.Text delay={1500} style={styles.datenight} animation="slideInDown">Date Night</Animatable.Text>
          <Animatable.Text delay={1500} style={styles.datingText} animation="slideInDown" >Dating just got <Animatable.Text animation="slideInDown" style={{
           
            fontSize: 20,
            fontFamily: 'Poppins-Regular',
            fontStyle: 'italic',
            fontWeight: 'bold'
          }}>fun</Animatable.Text > again!</Animatable.Text>
        </Animated.View>



        <Animatable.Image style={styles.img} animation="zoomIn" source={require('../assets/imglogo.png')} >

        </Animatable.Image>



        <Animated.View style={{ translateY: fadeAnimUp }}>
          <Animatable.Text delay={1500} style={styles.getStarted} animation="slideInUp" >Get started in just</Animatable.Text>
          <Animatable.Text delay={1500} style={styles.steps} animation="slideInUp"  ><Animatable.Text animation="slideInUp" style={{
            color: 'red',
            fontSize: 25,
            fontFamily: 'Poppins',
          }}>4</Animatable.Text > simple steps...</Animatable.Text>
        </Animated.View>
      </View>

    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  img: {
    width: moderateScale(180),
    height: moderateScale(180),
    marginTop: moderateScale(100),
    marginBottom: moderateScale(120),
    alignSelf: "center",
    resizeMode: 'contain',

   
  },
  steps: {
    color: 'white',
    fontSize: 17,
    fontFamily: "Poppins-Regular",

    // marginTop: 180,
    // marginBottom: 10,
    alignSelf: "center",
    alignContent: "center",


  },
  getStarted: {
    color: 'white',
    fontFamily: "Poppins-Regular",
    fontSize: 17,

    // marginBottom: -230,
    alignSelf: "center",


  },
  container: {
    flex: 1,
    backgroundColor: "black",
    // paddingBottom:moderateScale(50),
    // paddingTop:moderateScale(0),
  position: "absolute",
    top: -45,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
   


  },
  welcome: {
    color: 'white',
    fontFamily: "Poppins-Regular",

    fontSize: 17,

    alignSelf: "center",
    alignContent: "center",


  },
  datenight: {
    color: '#FF2B25',
    fontSize: 43,

    fontFamily: "Poppins-Regular",

    alignSelf: "center",
    alignContent: "center",


  },
  datingText: {
    color: '#A5A5A5',
    fontSize: 17,
    fontFamily: "Poppins-Regular",

    alignSelf: "center",
    alignContent: "center",


  }

});