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


const OPT = () => {  


    const [loader, setLoader] = useState(false);
    const context = useContext(AppContext);




    return(


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          loader ? (
            <>
              <Loader />
            </>
          ) : null
        }
       
        <Text style={{ color: '#E83131', fontSize: moderateScale(20), fontWeight: 'bold', marginTop: 30 }}>OTP Verification</Text>
        <Text style={{ color: '#666666', fontSize: moderateScale(12), marginTop: 10, textAlign: 'center', width: 240, marginBottom: 10 }}> Enter the 4 digit code we sent on email.</Text>
        <OTPInputView
          style={{ width: '80%', height: 200, color: '#000' }}
          pinCount={4}
          autoFocusOnLoad={true}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        //   onCodeFilled={(code) => verifycode(code)}
        />
      </View>


    )
 }


 const styles = StyleSheet.create({
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
      borderBottomWidth: 1,
      color: '#000',
      backgroundColor: 'lightgrey',
      borderRadius: moderateScale(8)
    },
  
    underlineStyleHighLighted: {
      borderColor: "#fff",
    },
  });


  export default OPT;