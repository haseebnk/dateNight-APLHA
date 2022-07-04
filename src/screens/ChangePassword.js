import React, { useEffect, useState , useContext} from 'react';
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
import AppContext from '../components/appcontext';
import axios from 'axios';
import axiosconfig from '../Providers/axios';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ChangePassword({route , navigation }) {



    const [new_password, setnewPass] = useState();
    const [confirm_password, setconfirmPass] = useState();
    const [email,setemail] = useState("haseebnk37@gmail.com");

    // const context = useContext(AppContext);
    // const {
    //   name,
    //   email,
    //   password,
    //   roles,
    //   dob,
    //   phone,
    //   image,
    // } = route.params;



    const changePass = async() => {
        if(new_password == '' || new_password == null){
            alert('error', 'New Password Required')
            return false
        }
        else if(confirm_password == '' || confirm_password == null){
            alert('error', 'Confirm password Required')
            return false
        }

        if(new_password != confirm_password){
            alert('error', 'Password not match')
            return false
        }

        if ( email == '' || email == null ){


            alert('error', 'email not match')
            return false

        }



        var data = {
            email: email,
            new_password: new_password,
            confirm_password:confirm_password
        }
       

        // setLoader(true)
      
        // route.params.email
    
        await axiosconfig.post('forgot-password' , data).then((res:any)=>{
      
            (res.data)
           console.log(res) 
           navigation.navigate('login')

           
            
        }).catch((err)=>{
            // setLoader(false)
            alert('error hai ', err.response.message);
        })
        
    }





    // const onSignupUser = () => {

    //     var data = {
    //         name: name,
    //         email: email,
    //         password: password,
    //         roles:'admin',
    //         dob: dob,
    //         phone: phone,
    //         image: 'image1',
            
    
      
    //     }
    
    //     axiosconfig
    //         .post('register', data)
    //         .then((res: any) => {
    //             //   setLoader(false);
              
    //             if (res.data.error) {
    //                 alert('invalid credentials')
    //                 console.log('here in invalid pass')
    //                 console.log(res.data)
    //                 //   alert('login error', res.data.error_description);
    //             } else {
    //                 alert("registered successfully", res)
    
    //                 storeData(res.data.token);
    
    //                 console.log(res.data)
    //             }
    //         })
    //         .catch(err => {
    //           console.log('here in invalid pass')
    //             console.log('error', 'Invalid Credentials', err);
    //         });
    
           
    
    // }


    // const storeData = async (value) => {
    //     try {
    //         await AsyncStorage.setItem('@token', value);
    //         context.setuserToken(value);
    //         setTimeout(() => {
    //             navigation.navigate('login')
    //         }, 1000);
    //     } catch (e) {
      
    //     }
    //   }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <LinearGradient
                colors={['#24202f', '#24202f', '#24202f']}
                style={styles.container}
            >

                <View style={styles.viewStyle}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>

                        <Image style={styles.imgClose}
                            source={require("../assets/close.png")}
                        ></Image>
                    </TouchableOpacity>

                    <Text style={styles.changePassHeading}>Change password</Text>
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white',  fontFamily: 'Poppins-Regular', fontSize: 15 }}
                        placeholder="Email"
                        placeholderTextColor='white'
                        
                       
                        onChangeText={(e) => setemail(e)}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white',  fontFamily: 'Poppins-Regular', fontSize: 15 }}
                        placeholder="New Password"
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(e) => setnewPass(e)}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white',  fontFamily: 'Poppins-Regular', fontSize: 15 }}
                        placeholder="Confirm Password"
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(e) => setconfirmPass(e)}
                    />
                </View>
                <View style={styles.Cont}>
                    <TouchableOpacity onPress={() => changePass()}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#FF7474', '#E20303']}
                            style={styles.linearGradient} >
                            <Text style={styles.saveButtonText}>
                                Save
                            </Text>
                        </LinearGradient>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate("forgotpassword")}>
                        <Text style={styles.cancelButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: "row",
    },
    imgClose: {
        height: 19,
        width: 19,
        marginTop: 5,
        marginLeft: 5,
    },
    Cont: {
        marginTop: 200,

    },
    cancelButtonText: {
        fontSize: 16,

        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 22,
        fontFamily: 'Poppins-Regular',
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
    },
    linearGradient: {

        marginTop: 26,
        width: 350,
        paddingVertical: 12,
        borderRadius: 11,
        marginTop: 40,
        alignSelf: 'center',
        height: 48,
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 10,
        paddingHorizontal: 16,
        marginRight: 40,
        fontSize: 16,
        width: '95%',
        height: 76,

        margin: 10,
    },
    changePassHeading: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        alignSelf: 'center',
        marginTop: 2,
        marginBottom: 30,
        textAlign: 'center',
        marginHorizontal: 80,
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 65 : 30,
        paddingHorizontal: 20,
        backgroundColor: '#ffff'
    },
})



