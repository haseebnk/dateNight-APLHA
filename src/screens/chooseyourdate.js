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
    Pressable,
    Dimensions,
    PermissionsAndroid
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NotesContext } from "../context/NotesContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import MaskInput from 'react-native-mask-input';
import axiosconfig from '../Providers/axios';
import AppContext from '../components/appcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Loader from './loader';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

export default function ChooseYourDate(props) {

    useEffect(() => {
        console.log(props,'dsdsd');
        myDataFunc()
        if(props?.route?.params?.data){
            let t = props?.route?.params?.data;
            setProfile(t.image)
            setName(t.name)
            setPhonee(t.phone)
            setEmail(t.email)
            setdob(t.dob)
            setColor([t.color1, t.color2])
        }
    }, []);

    const myContext = useContext(AppContext);
    const context = useContext(AppContext);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()));
    const [time, setTime] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [press, setPress] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { state, dispatch } = useContext(NotesContext)
    const [name, setName] = useState(null)
    const [number, setNumber] = useState(null)
    const [age, setAge] = useState(null)
    const [email, setEmail] = useState(null)
    const [dateb, setDateb] = useState(null)
    const [password, setPass] = useState("")
    const [dob, setdob] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [color, setColor] = useState([])
    const [phoneNum, setphoneNum] = useState(null);
    const [socialSec, setsocialSec] = useState(null);
    const [phone, setPhonee] = useState(null)
    const [user_id, setUserId] = useState()
    const [Loader22, setLoader2] = useState(false);
    const [profile, setProfile] = useState(null);
    const [mydata,setMydata] = useState(null)

    const {type, con} = props.route.params

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setdob(moment(date).format('MM/DD/yy') + ' (' + moment().diff(date, 'years') + ')')
        hideDatePicker();
    };

    function questionPick(item) {
        setPress(item.id)
        setColor(item.color)
    }

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
                        console.log(error)
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
                                imageUpload(image);
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            }, 1000);
        }
    };

    const imageUpload = async img => {
        let data = {
            image: null,
        };
        RNFS.readFile(img.assets[0].uri, 'base64').then(res => {
            data.image = res;

            setLoader2(true);
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
                    setLoader2(false);
                    console.log(res, 'res img')
                    setProfile(res.data.data.image_url);
                })
                .catch(err => {
                    console.log(err.response, 'res')
                    setLoader2(false);
                });
        });
    };

    const myDataFunc = async() => {
        const value = await AsyncStorage.getItem('@auth_token');
        axiosconfig.get('my-data',
          {
            headers: {
              Authorization: 'Bearer ' + value //the token is a variable which holds the token
            }
          }
        ).then((res)=>{
          setMydata(res.data)
        }).catch((err)=>{
          console.log(err.response)
        })
      }

    const onDateAdd = async () => {
        console.log(myContext.myData)
        let submitted = true
        var data = {
            user_id: mydata.id,
            name: name,
            phone: phone,
            
            email: email,
            image: profile,
            color: `${color[0]},${color[1]}`,
            date_or_other: con
        }

        if(props?.route?.params?.data){
            data['id'] = props?.route?.params?.data.id
            data['dob'] = props?.route?.params?.data.dob
        }else{
            data['dob'] = moment(dob).format('DD-MM-yy')
        }

        for (const property in data) {
            if(data[property] == null){
                submitted = false;
                alert(`${property} required!`)
                return;
            }
        }
        if(color.length == 0){
            alert(`color required!`);
            submitted = false;
            return
        }
        if (submitted) {
            setLoader2(true)
            const value = await AsyncStorage.getItem('@auth_token');
            await axiosconfig.post(`other-people-add`,
                data,
                {
                    headers: {
                        Authorization: 'Bearer ' + value //the token is a variable which holds the token
                    }
                }
            ).then((res: any) => {
                setLoader2(false)
                props.navigation.navigate('home');
            }).catch((err) => {
                setLoader2(false)
                console.log('error', err.response);
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            {Loader22 ? (
                <>
                    <Loader />
                </>
            ) : null}
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

                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>

                                <Image style={styles.imgClose}
                                    source={require("../assets/close.png")}
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.ProfileDetails}>{type}</Text>
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
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', }}
                                placeholder="Full Name"
                                placeholderTextColor='white'
                                value={name}
                                onChangeText={(text) => (setName(text))}
                            />
                        </View>
                        <View style={styles.sectionStyle2}>

                            <MaskInput
                                placeholderTextColor={'white'}
                                placeholder={'Mobile Number      '}

                                style={{ color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', width: '80%', }}
                                value={phone}
                                onChangeText={(masked, unmasked) => {
                                    setPhonee(masked);

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
                                style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: 'Poppins-Regular', }}

                                placeholder='Email'
                                placeholderTextColor='white'

                                value={email}
                                onChangeText={(text) => (setEmail(text))}

                            />
                        </View>
                        <TouchableOpacity style={styles.sectionStyle} onPress={() => showDatePicker()}>
                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', }}>{dob == null ? 'Birth Date' : dob}</Text>
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


                        <View style={styles.Cont}>
                            <TouchableOpacity
                                onPress={() => {
                                    onDateAdd()
                                }}
                            >
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
                        </View>

                    </LinearGradient>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({


    cancelButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 25,
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



    imgClose: {
        height: 19,
        width: 19,
        marginTop: 5,
        marginLeft: 5,
    },

    ProfileDetails: {
        color: 'white',
        fontSize: 20,
        marginTop: 0,
        marginHorizontal: 85,
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

        marginTop: 30,
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
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 10,
        paddingHorizontal: 16,

        fontSize: 13,
        width: '80%',
        height: 60,

        margin: 10,
    },
    sectionStyle: {
        alignSelf: "center",
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 10,
        paddingHorizontal: 16,

        fontSize: 13,
        width: '80%',
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

        paddingTop: Platform.OS === 'ios' ? 30 : 20,
        paddingHorizontal: 20,
        backgroundColor: '#ffff',

    },
    tinyLogo: {
        display: "flex",
        borderRadius:12,
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
});