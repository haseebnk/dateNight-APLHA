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
    SafeAreaView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppContext from '../components/appcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosconfig from '../services/axios';
import MaskInput from 'react-native-mask-input';

const COLORS = [
    {
        id: 1,
        color: ['#F11775', '#FB6580',],


    },
    {
        id: 2,
        color: ['#7AC9FD', '#0071BC',],


    }
    ,
    {
        id: 3,
        color: ['#7AFDD0', '#00BC89',],


    },
    {
        id: 4,
        color: ['#6617F1', '#8265FB',],


    },
    {
        id: 5,
        color: ['#F1D417', '#FBFB65',],


    },

]

export default function SignupScreen({ navigation }) {

    useEffect(() => {
        console.log(socialSec);
    }, [socialSec]);


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
    const [phone_number, setphone_number] = useState(null)
    const [email, setEmail] = useState(null)
    const [date_of_birth, setdate_of_birth] = useState(null)
    const [password, setPassword] = useState(null)
    const [dob, setdob] = useState('Birth Date ');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [confirm_password, setconfirm_password] = useState(null)
    const [profile_background_color, setprofile_background_color] = useState(null)
    const [type, settype] = useState(null)
    const [socialSec, setsocialSec] = useState('');

    const context = useContext(AppContext);

    const handleKeyDown = (e) => {
        console.log(e.nativeEvent.key)
    };

    const onTextChange = (text) => {
        let rg = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{3}$/
        if (rg.test(text)) {
            setphone_number(null)
        }
        else {
            var cleaned = ('' + text).replace(/\D/g, '')
            var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

            if (match) {
                var intlCode = (match[1] ? '+1 ' : ''),
                    number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                setphone_number(number)

                return;
            }
        }
    }

    const onSignupUser = () => {
        var data = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
            type: 'user',
            date_of_birth: date_of_birth,
            phone_number: phone_number,
            image: require('../assets/1.png'),

            profile_background_color: '#FFFFF'
        }
        axiosconfig
            .post('/register', data)
            .then((res: any) => {
                //   setLoader(false);
                if (email === null && password === null) {
                    console.log('Empty credentials')
                }
                if (res.data.error) {
                    alert('invalid credentials')
                    // showToast('login error', res.data.error_description);
                } else {
                    alert("registered successfully", res)

                    storeData(res.data.access_token);


                }
            })
            .catch(err => {
                console.log('error', 'Invalid Credentials', err);
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


    const openCamer = c => {

        if (c == 'g') {
            launchImageLibrary({
                width: 300,
                height: 400,
                cropping: true,
                freeStyleCropEnabled: true,
                saveToPhotos: true
            })
                .then(image => {
                    myContext.setprofileImagee(image.assets[0].uri);

                    imageUpload(image);
                })
                .catch(error => {
                    console.log(error)
                });
        } else if (c == 'c') {
            launchCamera({

                cropping: true,
                freeStyleCropEnabled: true,
                saveToPhotos: true
            })
                .then(image => {

                    myContext.setprofileImagee(image.assets[0].uri);
                    imageUpload(image);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        // refRBSheet.current.close();
    };

    return (
        <ScrollView>

            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <LinearGradient
                    colors={['#24202f', '#24202f', '#24202f']}
                    style={styles.container}
                >
                    <View>
                        <Text style={styles.ProfileDetails}>Personal Profile Details</Text>
                    </View>
                    <View style={styles.tinyLogo}>
                        <Image style={styles.tinyLogo}

                            source={require('../assets/profile.png')}
                        />
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
                            
                            style={{ color: 'white' , fontFamily: 'Poppins-Regular', }}
                            value={socialSec}
                            onChangeText={(masked, unmasked) => {
                                setsocialSec(masked);

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
                    <TouchableOpacity  onPress={() => showDatePicker()}>
                        <View style={styles.sectionStyle}>

                            <Text style={{ color: 'white' , fontFamily: 'Poppins-Regular', }}>{dob}</Text>
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
                            autoCompleteType='email'
                            keyboardType='email-address'
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <Text style={styles.profileText}>Profile Background color</Text>
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            horizontal={true}
                            data={COLORS}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ alignSelf: 'center', }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => questionPick(item)}
                                    style={{ marginTop: 5, padding: 0, marginTop: 20, }}
                                >
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        {press === item.id ?
                                            <TouchableOpacity onPress={() => setPress('')}  >
                                                <LinearGradient
                                                    colors={[item.color[0], item.color[1]]}
                                                    onChangeText={(text) => setprofile_background_color(text)}
                                                    style={styles.withBorder}>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            :
                                            <LinearGradient
                                                colors={[item.color[0], item.color[1]]}
                                                style={styles.withOutBorder}>
                                            </LinearGradient>
                                        }
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </SafeAreaView>
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
            </TouchableWithoutFeedback>
        </ScrollView>
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