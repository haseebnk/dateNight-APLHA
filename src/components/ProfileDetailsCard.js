import React, { Component, useState, useContext, useEffect, useRef } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text, Pressable,
    View, Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosconfig from '../Providers/axios';
import Loader from '../screens/loader';
import moment from 'moment'
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RBSheet from "react-native-raw-bottom-sheet";
import AppContext from '../components/appcontext';
import Notifications from "../screens/Notifications";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const radio_props = [
    { label: 'Buy Flowers', value: 0 },
    { label: 'Plan Anniversary', value: 1 },
    { label: 'Plan Birthday', value: 2 },
    { label: 'Act of Service', value: 3 },
    { label: 'Custom Reminder', value: 4 },

];


function ProfileDetailsCard() {

    const myContext = useContext(AppContext);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [checked, setChecked] = React.useState(true);
    
    const [chk, setChk] = useState()
    const [checkedd, setCheckedd] = React.useState(false);
    const [modalOpenn, setModalOpenn] = useState(false);
    const [reminder, setReminder] = useState([]);
    const [loader, setLoader] = useState(false);

    const [name, setUserName] = useState()
    const [email, setEmail] = useState()
    const [dob, setdob] = useState(dob)
    const [dobb, setdobb] = useState('Select Date');
    const [time, settime] = useState('Select Time');
    const [repeat, setRepeat] = useState();

    const [datee, setDatee] = useState();
    const [timee, setTimee] = useState();


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
            setReminder(res.data.data)
            // res.data.data.map((res) => {

            //     setUserName(res.name);
            //     setdobb(res.reminder_date);
            //     settime(res.reminder_time);
            //     setRepeat(res.repeat);
            //     // setUserId(res.user_id);
            // })

            setLoader(false)
        }).catch((err) => {
            console.log(err, 'error');
            setLoader(false)
        })
    }


    const postReminders = async () => {

        var data = {

            user_id: myContext.myData.id,
            name: name,
            reminder_date: dob,
            reminder_time: time,
            repeat: repeat,


        }

        const value = await AsyncStorage.getItem('@auth_token')

        await axiosconfig.post('reminder-add',

            {
                user_id: myContext.myData.id,
                name: name,
                reminder_date: dob,
                reminder_time: time,
                repeat: repeat,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }

        ).then((res: any) => {

            (res)
            console.log(res, "hiii")
            alert("Reminder update successfully")

        }).catch((err) => {

            console.log('error hai ', err.response);
        })
    }

    const onActive = (v) => {
       const date=v.reminder_date+ ' ' + v.reminder_time
        console.log(new Date(date));
        console.log(v.reminder_time);
    }



    const setNotification = (v) => {
        // Notifications.schduleNotification(date);
         const date=v.reminder_date+ ' ' + v.reminder_time
        Notifications.schduleNotification(new Date(date) , "Next Date With" + ' ' +v.name);
        // console.log(new Date(Date.now() + 5 * 1000))
    };
    const onLogoutPress = async (v) => {
        await AsyncStorage.setItem(JSON.stringify(v.id),JSON.stringify(v.check))
        setTimeout ( async() => {
            const value =  await AsyncStorage.getItem(JSON.stringify(v.id))
            console.log(value);
        }, 1000);

    }
    const setPingGreen = (item) => {
        reminder.map((v, i) => {
            if (item.id == v.id) {
                v.check = !v.check;
                onLogoutPress(v)
            }
        })
    }

    const renderGift = () => {
        return (
            reminder.map((v, i) => {
                return (

                    <TouchableOpacity  onPress={() => { setPingGreen(v), setNotification(v), onActive(v), checked ? setChecked(false) : setChecked(true) }} activeOpacity={.9}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={v.check ? ['#00B712', '#00B712'] : ['#FF2B25', '#FF2B25']}
                            style={styles.container2}>
                            <View style={styles.flex22}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.cardTextHead}>Next Date With</Text>
                                    <Text style={styles.cardText2}>Name : {v.name}</Text>
                                    <Text style={styles.cardText2}>Date : {moment(v.reminder_date).format('MM | DD | yy')}</Text>
                                    <Text style={styles.cardText2}>Time : {moment(v.reminder_time, 'hh:mm:ss a').format('h:mm a')}</Text>
                                    <Text style={styles.cardText2}>Frequency : {v.repeat}</Text>
                                </View>
                            </View>
                            <View style={styles.flex11}>
                                <TouchableOpacity onPress={() => setModalOpenn(true)}>
                                    <View style={{}}>
                                        <MaterialIcons name='expand-more' size={hp('3%')} color="white" />
                                    </View>
                                </TouchableOpacity>
                                <MaterialIcons style={{}} name='expand-more' size={hp('3%')} color="white" />
                            </View>
                            <View style={styles.flex33}>
                                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                    <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='mode-edit' size={hp('3.1%')} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='delete-outline' size={hp('3.5%')} color="white" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity >
                )
            })
        )
    }

    useEffect(() => {
        getReminders()
    }, [])


    const refRBSheet = useRef();
    // const refRBSheet2 = useRef();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setdob(moment(date).format('MM/DD/yy'))
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm2 = (time) => {
        settime(moment(time).format('hh:mm A'))
        hideTimePicker();
    };

    return (
        <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Text style={{
                    textAlign: 'right',
                    marginRight: 20,
                    fontSize: 12,
                    color: 'white',
                    fontFamily: 'Poppins-Regular',

                }}>Add New +</Text>
            </TouchableOpacity>
            <ScrollView horizontal={true}>
                {/* {loader ? (
                <>
                    <Loader />
                </>
            ) : null} */}
                <Modal
                    transparent={true}
                    visible={modalOpenn}
                    animationType='fade'
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -5,
                        backgroundColor: '#000000b8',
                    }} >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#24202ff7', '#24202ff7']}
                            style={styles.modalViewH}>
                            <View style={{ alignSelf: 'flex-start', top: 5, left: -20 }}>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    onPress={(value) => { ({ value: value }) }}
                                    labelColor={'#fff'}
                                    buttonColor={'white'}
                                    selectedButtonColor={'#00B712'}
                                    selectedLabelColor={'white'}
                                    buttonInnerColor={'#e74c3c'}
                                    buttonSize={9}
                                    buttonOuterSize={18}
                                    labelStyle={{ fontSize: 13, top: -7, marginVertical: 5, fontFamily: 'Poppins-Regular' }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setModalOpenn(false)}>
                                <Text style={styles.DoneText}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Modal>
                {renderGift()}
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={450}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#000000a0"
                        },
                        draggableIcon: {
                            backgroundColor: "#fff"
                        },
                        container: {
                            backgroundColor: '#24202f',
                            borderTopRightRadius: 12,
                            borderTopLeftRadius: 12,
                        }

                    }}
                >
                    <View style={styles.sectionStyle22}>
                        <TextInput
                            style={{ flex: 1, color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', }}
                            placeholder="Name"
                            placeholderTextColor="white"
                            onChangeText={(text) => setUserName(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => showDatePicker()}>
                        <View style={styles.sectionStyle2}>
                            <Text
                                style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}
                            >
                                {dob == null ? 'Select date' : dob}
                            </Text>
                            <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(35), width: moderateScale(35), borderRadius: 55 }}>
                                <Image
                                    source={require('../assets/calendar.png')}
                                    style={styles.imageStyle}
                                />
                            </View>
                        </View>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => showTimePicker()} >
                        <View style={styles.sectionStyle2}>
                            <Text
                                style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 10, }}
                            >  {time == null ? 'Select time' : time}</Text>
                            <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(35), width: moderateScale(35), borderRadius: 55 }}>
                                <Image
                                    source={require('../assets/time.png')}
                                    style={styles.imageStyle}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.sectionStyle22}>
                        <TextInput
                            style={{ flex: 1, color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', }}
                            placeholder="Repeat"
                            placeholderTextColor="white"
                            onChangeText={(text) => setRepeat(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => postReminders()}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#FF7474', '#E20303']}
                            style={styles.linearGradient11} >
                            <Text style={styles.saveButtonText11} >
                                Save
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </RBSheet>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm2}
                    onCancel={hideTimePicker}
                />
            </ScrollView>

        </View>

    );
}
const styles = StyleSheet.create({
    imageStyle: {
        top: 9,
        height: 20,
        width: 20,
        alignSelf: 'center'

    },
    sectionStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,


        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        fontSize: 16,
        width: '75%',
        height: 60,

        margin: 10,
        alignSelf: "center",
    },

    saveButtonText11: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
    },
    linearGradient11: {

        marginTop: 15,
        width: 200,
        paddingVertical: 12,
        borderRadius: 11,
        marginTop: 40,
        alignSelf: 'center',
        height: 48,
    },
    sectionStyle22: {
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
    DoneText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    modalViewH: {
        width: 310,
        height: 270,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 310,
            height: 209
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 0
    },
    picSize: {
        marginLeft: 10,
        marginTop: 20,
        height: 150,
        width: 110,
        borderRadius: 14,
        alignItems: 'center'

    },
    flex33: {
        flex: .9,
        marginVertical: 25,
        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    flex22: {
        flex: 3.5,
    },
    flex11: {
        marginRight: 20,
        marginVertical: 20,
        flex: .5,
        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    flex3: {
        flex: 1.5,
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
        marginRight: 0,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,
    },
    container2: {
        flex: 1,
        height: moderateScale(165),
        width: moderateScale(318),
        marginVertical: 30,
        marginRight: 0,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,
    },
    cardTextHead: {
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

        fontSize: 18,
        marginLeft: 25,
        marginTop: moderateScale(13, 0.1)
    },

    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: 7,
        marginLeft: 25
    },
    cardText2: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 25
    },
});

export default ProfileDetailsCard;