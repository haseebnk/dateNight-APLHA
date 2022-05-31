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
    ScrollView,
    FlatList,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import ProfileDetailsCard from '../components/ProfileDetailsCard';
import CoupleCard from '../components/CoupleCard';
import DateTimeCard from '../components/DateTimeCard';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './loader';
// import SplashScreen from 'react-native-splash-screen';
import PhoneInput from 'react-native-phone-input'


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


export default function PersonalProfileDetails(props) {


    const phonenum = useRef();

    const [loader, setLoader] = useState(false);
    const [press, setPress] = useState('');
    const [phoneNum, setphoneNum] = useState(null);
    const [dob, setdob] = useState('Date of birth');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



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


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onTextChange = (text) => {
        let rg = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{3}$/
        if (rg.test(text)) {
            setphoneNum(null)
        }
        else {
            var cleaned = ('' + text).replace(/\D/g, '')
            var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

            if (match) {
                var intlCode = (match[1] ? '+1 ' : ''),
                    number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                setphoneNum(number)

                return;
            }
        }
    }
    const handleKeyDown = (e) => {
        console.log(e.nativeEvent.key)
    };

    const onLogoutPress = async () => {
        await AsyncStorage.removeItem('@auth_token')
        setLoader(true);
        setTimeout(() => {
            props.navigation.navigate('login');
        }, 1000);
    }

    return (
        <SafeAreaView style={{flex:1}} >
        <View style={styles.container}>
            {loader ? (
                <>
                    <Loader />
                </>
            ) : null}
            <ScrollView nestedScrollEnabled={true}>

                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <LinearGradient
                        colors={['#24202f', '#24202f', '#24202f']}
                        style={styles.container}
                    >

                        <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>

                                <Image style={styles.imgClose}
                                    source={require("../assets/close.png")}
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.ProfileDetails}>Personal Profile Page</Text>
                        </View>
                        <View style={styles.tinyLogo}>
                            <Image style={styles.tinyLogo}

                                source={require('../assets/profile.png')}
                            />
                        </View>
                        <Text style={styles.takePhoto}>Take a photo</Text>
                        <Text style={styles.uploadPhoto}>Upload Photo</Text>

                        <View style={styles.sectionStyle}>

                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: "Poppins-Regular", }}
                                placeholder="Full Name"
                                placeholderTextColor='white'

                            />
                        </View>
                        <View style={styles.sectionStyle}>

                            <PhoneInput
                                initialCountry={'us'}
                                textProps={{
                                    placeholder: 'Enter a phone number...',
                                }}
                                autoFormat={true}
                               
                                isValidNumber={e => console.log(e)}
                                ref={phonenum}
                                textStyle={{color:'white'}}                                
                            />

                        </View>

                        <View style={styles.sectionStyle}>

                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: "Poppins-Regular", }}

                                placeholder='Email'
                                placeholderTextColor='white'
                                autoCorrect={true}
                                autoCompleteType='email'

                            />
                        </View>
                        <TouchableOpacity style={styles.sectionStyle} onPress={() => showDatePicker()}>

                            <Text style={{ color: '#fff' }}>{dob}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <Text style={styles.profileText}>Profile Background Color</Text>

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
                        <Text style={styles.ReminderText}>Reminders</Text>
                        <View style={{}}>
                            <ProfileDetailsCard></ProfileDetailsCard>
                        </View>
                        <Text style={styles.ReminderText2}>Scheduled Dates</Text>
                        <View style={{}}>
                            <DateTimeCard></DateTimeCard>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate("changepassword")}>
                            <Text style={styles.changePass} >
                                Change Password</Text>
                        </TouchableOpacity>
                        <View style={styles.Cont}>
                            <TouchableOpacity>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#FF7474', '#E20303']}
                                    style={styles.linearGradient} >
                                    <Text style={styles.saveButtonText} >
                                        Save
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                <Text style={styles.cancelButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onLogoutPress()}>
                                <Text style={styles.logoutButtonText}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                
            </ScrollView>
        </View>
        
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





    changePass: {
        color: '#0090FF',
        fontSize: 14,
        top: 10,
        marginBottom: 10,

        textAlign: 'center',
        textDecorationLine: 'underline',
        fontFamily: "Poppins-Regular",
    },
    cancelButtonText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 20
    },
    logoutButtonText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 30
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
    },
    Cont: {
        marginTop: 0,

    },
    imgClose: {
        height: 19,
        width: 19,
        marginTop: 5,

    },

    ProfileDetails: {
        color: 'white',
        fontSize: 20,
        marginTop: 0,
        alignSelf: 'center',
        marginBottom: 20,
        fontFamily: "Poppins-Regular",
        textAlign: 'center',


    },
    takePhoto: {
        color: '#0090FF',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontFamily: "Poppins-Regular",
    },
    uploadPhoto: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: "Poppins-Regular",

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

        marginTop: 26,
        width: 300,
        paddingVertical: 12,
        borderRadius: 11,
        marginTop: 40,
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
    sectionStyle: {
        alignSelf: "center",
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 4,
        paddingHorizontal: 16,

        fontSize: 13,
        width: '75%',
        height: 60,

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
        paddingTop: Platform.OS === 'ios' ? 40 : 20,

        backgroundColor: '#24202f',

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
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
    },


    signUpTextView: {

        marginTop: -20,
        marginBottom: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#2279ae',

    },
    signUpText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
    },
    profileText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        alignSelf: "center",
        marginTop: 10
    },
    ReminderText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        alignSelf: "flex-start",
        marginTop: moderateScale(35),
        paddingLeft: moderateScale(20)
    },
    ReminderText2: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        alignSelf: "flex-start",
        marginTop: moderateScale(15),
        paddingLeft: moderateScale(20)
    },
});