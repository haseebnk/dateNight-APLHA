import React, { useState, useRef, useContext, useEffect } from 'react';
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
import Loader from './loader';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';




export default function ChangePassword({ route, navigation }) {




    const myContext = useContext(AppContext);
    const [loader, setLoader] = useState(false);
    const [new_password, setnewPass] = useState();
    const [confirm_password, setconfirmPass] = useState();

    const [name, setUserName] = useState(null)
    const [phone, setphone_number] = useState('')
    const [email, setEmail] = useState(null)
    const [dob, setdob] = useState(dob)
    const [password, setPassword] = useState(null)
    const [image, setImage] = useState(null)


    const changePass = async () => {
        if (new_password == '' || new_password == null) {
            alert('error', 'New Password Required')
            return false
        }
        else if (confirm_password == '' || confirm_password == null) {
            alert('error', 'Confirm password Required')
            return false
        }

        if (new_password != confirm_password) {
            alert('Password not match', 'Password not match')
            return false
        }

        var data = {

            email: route.params.email,
            new_password: new_password,
            confirm_password: confirm_password
        }


        await axiosconfig.post('forgot-password', data).then((res: any) => {

            (res.data)
            console.log(res)
            navigation.navigate('login')



        }).catch((err) => {

            alert('error hai ', err.response.message);
        })

    }





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
                {/* 
                {
                    loader ? (
                        <>
                            <Loader />
                        </>
                    ) : null
                } */}

                <View style={styles.viewStyle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>

                        <Image style={styles.imgClose}
                            source={require("../assets/close.png")}
                        >
                            
                        </Image>
                    </TouchableOpacity>

                    <Text style={styles.changePassHeading}>Change password</Text>
                </View>
                {/* <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white', fontFamily: 'Poppins-Regular', fontSize: 15 }}
                        placeholder={email}
                        placeholderTextColor='white'
                        value={route.params.email}


                    />
                </View> */}
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white', fontFamily: 'Poppins-Regular', fontSize: 15 }}
                        placeholder="New Password"
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(e) => setnewPass(e)}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={{ flex: 1, color: 'white', fontFamily: 'Poppins-Regular', fontSize: 15 }}
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

                    <TouchableOpacity onPress={() => navigation.goBack()}>
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



