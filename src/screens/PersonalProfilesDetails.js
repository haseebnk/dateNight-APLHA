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
    ScrollView,
    FlatList,
    SafeAreaView,
    PermissionsAndroid,
    Platform,
    UIManager
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import ProfileDetailsCard from '../components/ProfileDetailsCard';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Loader from './loader';
import MaskInput from 'react-native-mask-input';
import axiosconfig from '../Providers/axios';
import AppContext from '../components/appcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const mydataaa = [{
    id: 1,
    name: 'Scheduled Date 1',
    Gname: 'Alvina Taichi',
    date: 'Date :  01 | 07 | 2022:',
    day: 'Day:  Wednesday:',
    time: 'Time:  12:56 Am',
    Frequency: 'Frequency:  5 min'
},
{
    id: 2,
    name: 'Scheduled Date 2',
    Gname: 'Alvina Taichi 2',
    date: 'Date :  01 | 12 | 2022:',
    day: 'Day:  Wednesday:',
    time: 'Time:  12:56 Am',
    // Frequency: 'Frequency:  10 min'
}


]






export default function PersonalProfileDetails(props) {

    useEffect(() => {
        getRecords()
        getReminders()


        console.log(socialSec);
    }, [socialSec]);


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




    const myContext = useContext(AppContext);
    const context = useContext(AppContext);
    const phonenum = useRef();
    const [loader, setLoader] = useState(false);
    const [press, setPress] = useState('');
    const [phoneNum, setphoneNum] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [socialSec, setsocialSec] = useState('');
    const [myData, setMyData] = useState();
    const [name, setUserName] = useState()
    const [email, setEmail] = useState()
    const [dob, setdob] = useState(dob)
    const [phone, setphone_number] = useState()
   
   
    const [password, setPassword] = useState(null)
    const [image, setImage] = useState()
    const [userId, setUserId] = useState()
    const [profile, setProfile] = useState()
    
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


    const getReminders = async () => {
        setLoader(true)
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`reminders`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            // console.log(res, "datess");
            // setReminder(res.data.data)
            // res.data.data.map((res) => { 

            //     console.log(res.user_id,"id here");
            // })
          
            setLoader(false)
        }).catch((err) => {
            console.log(err, 'error');
            setLoader(false)
        })
    }

    const getRecords = async () => {

        const value = await AsyncStorage.getItem('@auth_token');
        setLoader(true);
        await axiosconfig
            .get('my-data', {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                },
            })
            .then((res: any) => {
                setLoader(false);
                setMyData(res);
                setMyData(res.name)
                setUserName(res.data.name)
                setphone_number(res.data.phone)
                setEmail(res.data.email)
                setdob(res.data.dob)
                setImage(res.data.image)
                setUserId(res.data.id)

                console.log(res.data.id, "id here")

            })
            .catch(err => {
                console.log(err, "yes err here")

                setLoader(false);
            });
    };


    const onUpdateUser = async () => {

        var data = {

            name: name,
            dob: dob,
            phone: phone,
            image: profile,
            id: userId
        }
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.post(`user-update`,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            (res.data)
            alert("User update successfully")

        }).catch((err) => {
            console.log('error hai ', err.response);
        })

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



    const DateTimeCard = () => {
        const [datesss, setDates] = useState([]);
        useEffect(() => {
          getDates()
        }, [])
        let dateArray = []
        

        const [checked, setChecked] = React.useState(false);



        const getDates = async () => {

            const value = await AsyncStorage.getItem('@auth_token');
            await axiosconfig.get(`dates`,
                {
                    headers: {
                        Authorization: 'Bearer ' + value //the token is a variable which holds the token
                    }
                }
            ).then((res: any) => {
                dateArray=[]
                // console.log(res, "datess");
                 res.data.map((res) => {
                    res['color1'] = res.date_person.color.split(',')[0]
                    res['color2'] = res.date_person.color.split(',')[1]
                    dateArray.push(res)
                    setTimeout(() => {
                        setDates(dateArray)
                        console.log(datesss);
                    }, 1000);
                })

            }).catch((err) => {
                console.log(err, 'error')
            })
        }
            return (

                datesss.length < 1 ?
                (
                    <>
                    <TouchableOpacity activeOpacity={.9} onPress={() => checked ? setChecked(false) : setChecked(true)}>
                                <LinearGradient
    
                                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}
                                    colors={['#EB1D36','#EB1D36']}
                                    style={styles.container2}>
                                    <View style={styles.flex2}>
    
    
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.cardTextHead}>Your Scheduled Dates</Text>
    
                                            <View style={{ top: 15 }}>
                                                <Text style={styles.cardText}>Name : </Text>
                                                <Text style={styles.cardText}>Date : </Text>
    
                                                <Text style={styles.cardText}>Time : </Text>
    
                                            </View>
                                        </View>
    
    
    
                                    </View>
                                    <View style={styles.flex1}>
                                        {/* <MaterialIcons style={{ marginLeft: -45, marginTop: 15 }} name='expand-more' size={hp('3%')} color="white" /> */}
                                    </View>
                                    <View style={styles.flex3}>
    
                                        {/* <MaterialIcons style={{ marginLeft: 7, marginTop: 25 }} name='mode-edit' size={hp('3.1%')} color="white" /> */}
                                        {/* <MaterialIcons style={{ marginLeft: 7, marginBottom: 25 }} name='delete-outline' size={hp('3.5%')} color="white" /> */}
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity >
                    </>
                )  :

                <FlatList
                    data={datesss}
                    horizontal={true}
                    renderItem={({ item, index }) => (
    
                      
                            <TouchableOpacity activeOpacity={.9} onPress={() => checked ? setChecked(false) : setChecked(true)}>
                                <LinearGradient
    
                                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                    colors={[item?.color1, item?.color2]}
                                    style={styles.container2}>
                                    <View style={styles.flex2}>
    
    
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.cardTextHead}>Scheduled Date</Text>
    
                                            <View style={{ top: 15 }}>
                                                <Text style={styles.cardText}>Name : {item.date_person.name}</Text>
                                                <Text style={styles.cardText}>Date : {item.start_date}</Text>
    
                                                <Text style={styles.cardText}>Time : {item.start_time}</Text>
    
                                            </View>
                                        </View>
    
    
    
                                    </View>
                                    <View style={styles.flex1}>
                                        {/* <MaterialIcons style={{ marginLeft: -45, marginTop: 15 }} name='expand-more' size={hp('3%')} color="white" /> */}
                                    </View>
                                    <View style={styles.flex3}>
    
                                        <MaterialIcons style={{ marginLeft: 7, marginTop: 25 }} name='mode-edit' size={hp('3.1%')} color="white" />
                                        <MaterialIcons style={{ marginLeft: 7, marginBottom: 25 }} name='delete-outline' size={hp('3.5%')} color="white" />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity >
                        
                    )}
                />
    
            );

    }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} >

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

                        <View style={{ flexDirection: "row", marginLeft: Platform.OS === 'ios' ? -10 : 0, justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>

                                <Image style={styles.imgClose}
                                    source={require("../assets/close.png")}
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.ProfileDetails}>Personal Profile Page</Text>
                        </View>
                        <View style={styles.tinyLogo}>
                            {
                                myContext.myData.image == null ? (
                                    <>
                                        <Image style={styles.tinyLogo}
                                            source={require('../assets/profile.png')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Image style={styles.tinyLogo}
                                            source={{
                                                uri: (profile == null) ? myContext.myData.image : profile
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
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', }}
                                value={name}
                                onChangeText={(text) => setUserName(text)}
                                placeholderTextColor='white'



                            />
                        </View>
                        <View style={styles.sectionStyle}>
                            <MaskInput
                                placeholderTextColor={'white'}
                                placeholder={phone}
                                style={{ color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', width: '80%', }}
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
                            {/* <PhoneInput
                                initialCountry={'us'}
                                textProps={{
                                    placeholder: 'Enter a phone number...',
                                }}
                                autoFormat={true}
                               
                                isValidNumber={e => console.log(e)}
                                ref={phonenum}
                                textStyle={{color:'white'}}                                
                            /> */}

                        </View>

                        <View style={styles.sectionStyle}>

                            <TextInput
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', }}
                                value={email}
                                onTextInput={false}
                                placeholderTextColor='white'
                                autoCorrect={true}
                                autoCompleteType='email'
                                editable={false}
                                selectTextOnFocus={false}

                            />
                        </View>
                        <TouchableOpacity style={styles.sectionStyle} onPress={() => showDatePicker()}>

                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', }}>{dob}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        {/* <Text style={styles.profileText}>Profile Background Color</Text>

                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                                horizontal={true}
                                data={COLORS}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ alignSelf: 'center', }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => questionPick(item)}
                                        style={{ marginTop: 5, p ing: 0, marginTop: 20, }}
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
                        </SafeAreaView> */}
                        <Text style={styles.ReminderText}>Reminders</Text>
                        <View style={{}}>
                            <ProfileDetailsCard></ProfileDetailsCard>
                        </View>
                        <Text style={styles.ReminderText2}>Scheduled Dates</Text>
                      
                            <DateTimeCard></DateTimeCard>
                       
                        <TouchableOpacity onPress={() => props.navigation.navigate("changepassword")}>
                            <Text style={styles.changePass} >
                                Change Password</Text>
                        </TouchableOpacity>
                        <View style={styles.Cont}>
                            <TouchableOpacity onPress={() => onUpdateUser()} >
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


        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    // date time card css 


    picSize: {
        marginLeft: 10,
        marginTop: 20,
        height: 150,
        width: 110,
        borderRadius: 14,
        alignItems: 'center'
    },
    flex3: {
        flex: .9,

        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    flex2: {
        flex: 4,
    },
    flex1: {
        flex: .5,
        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    container: {
        flex: 1,
        height: moderateScale(165),
        width: moderateScale(318),
        marginVertical: 30,
        marginHorizontal: 0,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,


    },

    container2: {
        flex: 1,
        height: moderateScale(165),
        width: moderateScale(318),
        marginVertical: 30,
        // marginRight: 30,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,


    },
    cardTextHead: {
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

        fontSize: 18,
        marginLeft: 25,
        marginTop: moderateScale(15, 0.1)

    },
    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: 8,
        marginLeft: 25
    },



    // date time cards css


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
        fontFamily: 'Poppins-Regular',
    },
    cancelButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 20
    },
    logoutButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 30
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        textAlign: 'center',


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
        paddingTop: Platform.OS === 'ios' ? 30 : 20,

        backgroundColor: '#24202f',

    },
    tinyLogo: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "38%",
        marginRight: "38%",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 18



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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },
    profileText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        alignSelf: "center",
        marginTop: 10
    },
    ReminderText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        alignSelf: "flex-start",
        marginTop: moderateScale(35),
        paddingLeft: moderateScale(20)
    },
    ReminderText2: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        alignSelf: "flex-start",
        marginTop: moderateScale(15),
        paddingLeft: moderateScale(20)
    },
});