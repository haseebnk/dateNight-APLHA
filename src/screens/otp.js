import React, { useState, useEffect, useContext } from 'react';
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

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Loader from './loader';
import { moderateScale } from 'react-native-size-matters';
import AppContext from '../components/appcontext';
import axios from 'axios';
import axiosconfig from '../Providers/axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const OPT = ({ route,  navigation}) => {

  const [loader, setLoader] = useState(false);

  const context = useContext(AppContext);
  const {
    name,
    email,
    password,
    roles,
    dob,
    phone,
    image,
  } = route.params;


  const verifycode = async (c) => {

    if(route.params.roles == 'admin'){
      forgotPass(c)
    }
     else{
     forgotPass(c)
     }
  }




const storeData = async (value) => {
  try {
      await AsyncStorage.setItem('@token', value);
      context.setuserToken(value);
      setTimeout(() => {
          navigation.navigate('login')
      }, 1000);
  } catch (e) {

  }
}



  const forgotPass = async(c) => {
    setLoader(true)
    let data = {
      email:route.params.email,
      otp:c
    }

    axiosconfig.post('verify-otp',data).then((res:any)=>{
    
      setLoader(false)
      navigation.navigate('changepassword', data);
    }).catch((err)=>{
      setLoader(false)
      alert('Invalid Otp')
      alert('Invalide Otp',err.response.data.message)
    })
  }



  
  return (



    <View style={{ flex: 1,  backgroundColor: '#24202F',}}>
        {
          loader ? (
            <>
              <Loader />
            </>
          ) : null
        }


      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Image style={styles.imgClose}
            source={require("../assets/close.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#24202F' }}>
      

        <Text style={{ color: 'white', fontSize: moderateScale(20), fontFamily: Platform.OS === 'ios' ? "GazpachoBold" : "Gazpacho Bold", marginTop: 30 }}>OTP Verification</Text>
        <Text style={{ color: '#666666', fontSize: moderateScale(12), marginTop: 10, textAlign: 'center', width: 240, marginBottom: 10 }}> Enter the 6 digit code we sent on email.</Text>
        <OTPInputView
          style={{ width: '90%', height: 200, color: '#000' }}
          pinCount={6}
          autoFocusOnLoad={true}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => verifycode(code)}
        />
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },


  imgClose: {
    height: 19,
    width: 19,
    marginTop: 25,
    marginLeft: 25,
    
  },


  borderStyleBase: {
    width: moderateScale(35),
    height: moderateScale(35)
  },

  borderStyleHighLighted: {
    borderColor: "#00205b",
  },

  underlineStyleBase: {
    width: moderateScale(48, 0.1),
    height: moderateScale(48, 0.1),
    borderWidth: 0,
    // borderBottomWidth: 1,
    color: '#fff',
    backgroundColor: '#363143',
    borderRadius: moderateScale(8),
    
    alignSelf:'center'
    
  },

  underlineStyleHighLighted: {
    backgroundColor: '#363143',
  },
});


export default OPT;