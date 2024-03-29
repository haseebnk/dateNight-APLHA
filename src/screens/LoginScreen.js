import React, { useEffect, useState } from 'react';
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
    LayoutAnimation,
    Platform,
    UIManager,
    BackHandler,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import axiosconfig from '../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './loader';
import { moderateScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const inActiveColor = 'white';
const activeColor = '#00B712';


export default function LoginScreen2(props) {

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);


    const [loader, setLoader] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toggleActive, setToggle] = useState(false);


    const onLoginUser = () => {
        setLoader(true);

        var data = {
            email: email,
            password: password
        }

        var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setLoader(false);
        if (!emailReg.test(data.email)) {
            // alert('Invalid credentials')
        }

        if (data.email == '' || data.email == null) {
            alert('Email Required!');
            return false;
        }
        if (data.password == '' || data.password == null) {
            alert('Password Required!');
            return false;
        }


        setLoader(true);

        axiosconfig
            .post('login', data)
            .then((res: any) => {
                setLoader(false);

                if (res.data.error) {
                    alert('Invalid credentials')
                    // showToast('login error', res.data.error_description);
                }
              
                else {
                    console.log("Got it", res.data.token,)

                    storeData(res.data.token);


                }
            })
            .catch(err => {
                setLoader(false);
                alert('User Email or Password Is Incorrect');
            });


    }

    const storeData = async (value) => {
        try {

            await AsyncStorage.setItem('@auth_token', value);
            //   context.setuserToken(value);
            setTimeout(() => {
                props.navigation.navigate('home');
            }, 1000);

        } catch (e) { }
    };

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
                {loader ? (
                    <>
                        <Loader />
                    </>
                ) : null}
                <View style={styles.tinyLogo}>
                    <Image style={styles.tinyLogo}
                        source={require('../assets/imglogo.png')}
                    /></View>
                <Text style={styles.logoText}>Date Night</Text>
                <Text style={styles.loginText}>Sign Into Your Account</Text>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={require('../assets/emailll.png')} //Change your icon image here
                        style={styles.ImageStyle}
                    /> */}
                    <FontAwesome5 style={{ margin: 9 }} name='envelope' size={hp('2.7%')} color="#fff" />
                    <TextInput
                        style={{ flex: 1, color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginTop: 8 }}
                        value={email}
                        placeholder='Email'
                        placeholderTextColor='white'
                        autoCorrect={true}
                        autoCompleteType='email'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    {/* <Image
                        source={require('../assets/passs.png')} //Change your icon image here
                        style={styles.ImageStyle}
                    /> */}
                    <MaterialIcons style={{ margin: 3, }} name='lock-outline' size={hp('3.5%')} color="#fff" />
                    <TextInput
                        value={password}
                        style={{ flex: 1, color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginTop: 8 }}
                        placeholder="Password"
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity>
                    <View style={styles.tog}>
                        <TouchableOpacity
                            style={[
                                styles.toggleContainer,
                                { borderColor: null ? activeColor : null, },
                            ]}
                            onPress={() => {
                                LayoutAnimation.easeInEaseOut();
                                setToggle(!toggleActive);
                            }}
                            activeOpacity={1}>
                            <View
                                style={[
                                    styles.toggleBtn,
                                    toggleActive
                                        ? { backgroundColor: inActiveColor, borderRadius: 25, alignSelf: 'flex-end' }
                                        : { backgroundColor: activeColor, borderRadius: 25, },
                                ]}
                            />
                            <Text style={{ color: 'white', fontSize: 12, position: 'absolute', fontFamily: 'Poppins-Regular', bottom: Platform.OS === 'ios' ? moderateScale(1.7, 0) : moderateScale(-1, 0), left: Platform.OS === 'ios' ? moderateScale(5, 0) : moderateScale(5, 0) }}> Y</Text>
                            <Text style={{ color: !toggleActive ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(2, 0) : moderateScale(-0.5, 0), right: Platform.OS === 'ios' ? moderateScale(7.2, 0) : moderateScale(7.5, 0) }}>N</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 12, marginLeft: 70, marginTop: 4, fontFamily: 'Poppins-Regular', }}>Remember</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("forgotpassword")}>
                    <Text style={styles.fpText} >Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onLoginUser()}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#FF7474', '#E20303']}
                        style={styles.linearGradient} >
                        <Text style={styles.loginButtonText}>
                            Sign In
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.signUpTextView}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("signup")}>
                        <Text style={[styles.signUpText, { color: '#00A8FF' }]}>
                            {' Sign Up'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({



    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 19,

    },

    toggleContainer: {

        marginLeft: 12,
        height: 22,
        width: 43,
        borderRadius: 20,
        borderWidth: 0,
        overflow: 'hidden',
        padding: 2,
        position: 'relative',
        backgroundColor: '#363143',


    },
    toggleBtn: { height: '100%', width: '50%' },








    linearGradient: {


        width: 300,
        paddingVertical: 12,
        borderRadius: 11,
        marginTop: 26,
        alignSelf: 'center',
        height: 48,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    tog: {
        flex: 1,
        alignSelf: 'flex-start'
    },

    ImageStyle: {
        padding: 5,
        marginRight: 10,

        margin: 5,
        height: 25,
        width: 18,
        resizeMode: 'contain',
        alignItems: 'center',
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
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 65 : 30,
        paddingHorizontal: 20,
        backgroundColor: '#ffff'
    },
    tinyLogo: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "38%",
        marginRight: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,


    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    logoText: {
        color: '#fd2d1f',
        fontSize: 30,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Bold",
        marginTop: -5,
        marginBottom: 10,
        textAlign: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        marginTop: 10,
        marginBottom: 30,
        textAlign: 'center',
    },
    // input: {
    //   width: '100%',
    //   height: 60,
    //   backgroundColor: '#363143',
    //   borderRadius: 12,
    //   marginTop: 10,
    //   paddingHorizontal: 10,
    //   fontSize: 16,
    //   color: '#808e9b',
    // },
    fpText: {
        alignSelf: 'flex-end',
        color: '#00A8FF',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',

        marginTop: -17,
        // marginBottom:50,
    },
    loginButton: {
        backgroundColor: '#ee3231',
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 40,

    },
    loginButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
    },
    loginWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

    },

    signUpTextView: {
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#2279ae',
        marginTop: 65

    },
    signUpText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',

    },
});