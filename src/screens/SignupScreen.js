import React, { useEffect, useState, useContext } from 'react';
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
    ScrollView,
    FlatList,
    SafeAreaView,
    PermissionsAndroid,
    Platform,
    UIManager
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from '../components/appcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosconfig from '../Providers/axios';
import MaskInput from 'react-native-mask-input';
import Loader from './loader';
import RNFS from 'react-native-fs';




export default function SignupScreen({ navigation }) {



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [checked, setChecked] = React.useState(false);

    const myContext = useContext(AppContext);

    const [press, setPress] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setdob(moment(date).format('MM/DD/yy'))
        hideDatePicker();
    };

    function questionPick(item) {
        setPress(item.id)
    }

    function questionClose(item) {
        setPress(item.id)
    }


    const [image, setImage] = useState(null)
    const [name, setUserName] = useState(null)
    const [phone, setphone_number] = useState('')
    const [email, setEmail] = useState(null)
    const [dob, setdob] = useState('Birth Date')
    const [password, setPassword] = useState(null)
    const [loader, setLoader] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [profile_background_color, setprofile_background_color] = useState(null)
    const [phone_number, setPhoneNum] = useState(false)
    const [roles, setRole] = useState(null)
    const [socialSec, setsocialSec] = useState('');
    const [date_of_birth, setdate_of_birth] = useState(false)
    const context = useContext(AppContext);
    const [profile, setProfile] = useState(null)


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };



    const onSignupUser = () => {

        var data = {
            name: name,
            email: email,
            password: password,
            roles: 'admin',
            dob: dob,
            phone: phone,
            image: profile,
        }
        setLoader(true);
        axiosconfig
            .post('register', data)
            .then((res: any) => {
                setLoader(false);
                if (res.data.error) {
                    alert('invalid credentials')
                    console.log(res.data)

                } else {
                    alert("registered successfully", res)

                    // storeData(res.data.access_token);
                    navigation.navigate('login')
                    console.log(res.data)
                }
            })
            .catch(err => {
                setLoader(false);
                console.log(err.response.data.errors)
                for (const property in err.response.data.errors) {
                    console.log(`${property}: ${err.response.data.errors[property]}`);
                    alert(err.response.data.errors[property])
                    return
                }
            });
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@auth_token', value);
            context.setuserToken(value);
            setTimeout(() => {
                navigation.navigate('login')
            }, 1000);
        } catch (e) {

        }
    }



    const imageUpload = async img => {
        let data = {
            image: null,
        };
        RNFS.readFile(img.assets[0].uri, 'base64').then(res => {
            data.image = res;

            setLoader(true);
            axiosconfig
                .post(
                    'image-upload-64',
                    { image: res },
                    {
                        headers: {
                            Authorization: 'Bearer ' + myContext.userToken, //the token is a variable which holds the token
                        },
                    },
                )
                .then(res => {

                    setLoader(false);
                    console.log(res, 'res img')
                    setProfile(res.data.data.image_url);
                })
                .catch(err => {
                    console.log(err.response, 'res')
                    setLoader(false);
                });
        });
    };

    const openCamer = async c => {

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (c == 'g') {
            setTimeout(() => {
                launchImageLibrary({
                    width: 300,
                    height: 400,
                    cropping: true,
                    freeStyleCropEnabled: true,
                    saveToPhotos: true,
                })
                    .then(image => {
                        if (image.assets) {
                            // myContext.setProfile(image.assets[0].uri);
                            imageUpload(image);
                        }
                    })
                    .catch(error => {

                    });
            }, 1000);
        } else if (c == 'c') {
            setTimeout(() => {
                if (isCameraPermitted && isStoragePermitted) {
                    launchCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                        freeStyleCropEnabled: true,
                        saveToPhotos: true,
                    })
                        .then(image => {
                            if (image.assets) {
                                // myContext.setProfile(image.assets[0].uri);
                                imageUpload(image);
                            }
                        })
                        .catch(error => {

                        });
                }
            }, 1000);
        }

    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} >
            {
                loader ? (
                    <>
                        <Loader />
                    </>
                ) : null
            }
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <ScrollView>
                    <LinearGradient
                        colors={['#24202f', '#24202f', '#24202f']}
                        style={styles.container}
                    >
                        <View>
                            <Text style={styles.ProfileDetails}>Sign Up</Text>
                        </View>
                        <View style={styles.tinyLogo}>
                            {
                                profile == null ? (
                                    <>
                                        <Image style={styles.tinyLogo}
                                            source={require('../assets/profile.png')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Image style={styles.tinyLogo}
                                            source={{
                                                uri: profile
                                            }}
                                        />
                                    </>
                                )
                            }
                        </View>
                        <TouchableOpacity onPress={() => openCamer('c')}>
                            <Text style={styles.takePhoto}>Take a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openCamer('g')}>
                            <Text style={styles.uploadPhoto}>Upload Photo</Text>
                        </TouchableOpacity>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 8 }}
                                placeholder="Full Name"
                                placeholderTextColor='white'
                                onChangeText={(text) => setUserName(text)}
                            />
                        </View>
                        <View style={styles.sectionStyle2}>
                            <MaskInput
                                placeholderTextColor={'white'}
                                placeholder={'Mobile Number      '}

                                placeholderFillCharacter={true}

                                style={{ color: 'white', fontFamily: 'Poppins-Regular', }}
                                value={phone}
                                onChangeText={(masked, unmasked) => {
                                    setphone_number(masked);

                                    console.log(masked);
                                    console.log(unmasked);
                                }}
                                mask={[
                                    '(',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    ')',
                                    ' ',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                            />
                        </View>
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 8 }}
                                placeholder='Email'
                                placeholderTextColor='white'
                                autoCorrect={true}
                                autoCompleteType='email'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={() => showDatePicker()}>
                            <View style={styles.sectionStyle}>

                                <Text style={{ color: 'white', fontFamily: 'Poppins-Regular', }}>{dob}</Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 14, fontFamily: 'Poppins-Regular', marginTop: 8, }}
                                placeholder="Password"
                                placeholderTextColor='white'
                                secureTextEntry={true}
                                textContentType='password'

                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>

                        <TouchableOpacity onPress={() => onSignupUser()}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient}>
                                <Text style={styles.loginButtonText}>
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.loginWithBar}>
                            <TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpTextView}>
                            <Text style={styles.signUpText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                <Text style={[styles.signUpText, { color: '#00A8FF' }]}>
                                    {' Sign In'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </LinearGradient>
                </ScrollView>
            </TouchableWithoutFeedback>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    withOutBorder:
    {
        marginHorizontal: 4,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 38,
        height: 38,
        color: "White",
    }
    ,

    withBorder:
    {
        marginHorizontal: 4,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        width: 38,
        height: 38,
        color: "White",
    },


    ProfileDetails: {
        color: 'white',
        fontSize: 20,
        marginTop: -15,
        marginBottom: 25,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    takePhoto: {
        color: '#0090FF',
        fontSize: 14,

        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Regular',
    },
    uploadPhoto: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    backContainer: {
        alignSelf: "center",
        flexDirection: "row",

    },
    back1: {
        height: 38,
        width: 38,
        borderRadius: 10,
        margin: 2,
        marginTop: 10,



    },
    linearGradient: {

        marginTop: 40,
        width: 300,
        paddingVertical: 12,
        borderRadius: 11,

        alignSelf: 'center',
        height: 48,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
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
        height: 20,
        width: 18,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    sectionStyle2: {
        alignSelf: "center",
        flexDirection: 'row',


        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 10,
        paddingHorizontal: 16,

        fontSize: 13,
        width: '80%',
        height: 63,

        margin: 10,
    },
    sectionStyle: {
        alignSelf: "center",
        flexDirection: 'row',

        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 10,
        paddingHorizontal: 16,

        fontSize: 13,
        width: '80%',
        height: 63,

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

        borderRadius:12,
        justifyContent: "center",
        alignItems: "center",
        height: 126,
        width: 126,
        alignSelf: "center"


    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
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
        fontSize: 14,
        fontWeight: '500',
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
        marginTop: 50,
    },

    signUpTextView: {


        marginBottom: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#2279ae',

    },
    signUpText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    profileText: {
        color: '#ffff',
        fontSize: 16,
        marginTop: 20,
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },
});