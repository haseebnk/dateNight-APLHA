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
    Dimensions
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import LinearGradient from 'react-native-linear-gradient';
// import SplashScreen from 'react-native-splash-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NotesContext } from "../context/NotesContext"




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






export default function AddAnotherCouple(props) {



    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false)



    const [date, setDate] = useState(new Date(Date.now()));

    const [time, setTime] = useState(new Date(Date.now()));

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setIsDateSelected(true)
        setDate(currentDate);
    };
    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setIsTimeSelected(true)
        setTime(currentDate);
    };

    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    const [press, setPress] = useState('');

    function questionPick(item) {
        setPress(item.id)
        setColor(item.color)
    }

    function questionClose(item) {
        setPress(item.id)
    }


    const { state, dispatch } = useContext(NotesContext)

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [dateb, setDateb] = useState("")
    const [password, setPass] = useState("")

    const [color, setColor] = useState([])













    // function questionPick(item) {
    //     setPress(item.id)
    // }

    // function questionClose(item) {
    //     setPress(item.id)
    // }



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


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
                    <SafeAreaView style={{flex:1}}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>

                            <Image style={styles.imgClose}
                                source={require("../assets/close.png")}
                            ></Image>
                        </TouchableOpacity>
                        <Text style={styles.ProfileDetails}>Add Another Couple</Text>
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
                            value={name}
                            onChangeText={(text) => (setName(text))}
                        />
                    </View>
                    <View style={styles.sectionStyle}>

                        <TextInput
                            style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: "Poppins-Regular", }}
                            placeholder="Mobile Number"
                            placeholderTextColor='white'

                            value={number}
                            onChangeText={(text) => (setNumber(text))}
                        />
                    </View>
                    <View style={styles.sectionStyle}>

                        <TextInput
                            style={{ flex: 1, color: 'white', fontSize: 13, fontFamily: "Poppins-Regular", }}

                            placeholder='Email'
                            placeholderTextColor='white'
                         
                            value={email}
                            onChangeText={(text) => (setEmail(text))}

                        />
                    </View>
                    <Pressable onPress={showDatepicker} >
                            <View style={styles.sectionStyle2}>

                                <Text
                                 value={dateb}
                                 onChangeText={(text) => (setDateb(text))}
                                    style={{ color: 'white', fontSize: 16, fontFamily: "Poppins-Regular", marginHorizontal: 20, }}
                                    onPress={showDatepicker}
                                >
                                    {isDateSelected ? `${date.getDate().toString() + ' | ' + date.getMonth().toString() + ' | ' + date.getFullYear().toString()}` : "Select Date"}
                                </Text>
                                


                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        
                                        // placeholderText='Date Of Birth'
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={mode == 'date' ? onChange : onChangeTime}
                                    />
                                )}
                            </View>
                        </Pressable>



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
                
                    <TouchableOpacity 
                    onPress={() => {
                        dispatch({ type: "Add", payload: { name, number ,email, dateb ,color } ,  } , props.navigation.navigate('home'))
                        }}
                    >


                       
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity> */}
   <View style={styles.Cont}>
                        <TouchableOpacity
                        
                        onPress={() => {
                            dispatch({ type: "Add", payload: { name, number ,email, dateb ,color } ,  } , props.navigation.navigate('home'))
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

                   </SafeAreaView>
                   
                </LinearGradient>
            </TouchableWithoutFeedback>
        </ScrollView>

    );
}

const styles = StyleSheet.create({


    cancelButtonText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 25,
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
        marginHorizontal: 65,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,


        fontFamily: "Poppins-Regular",
        fontSize: 16,
        width: '80%',
        height: 60,

        margin: 10,
        alignSelf: "center",
    },
    sectionStyle: {
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'center',
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
        
        paddingTop: Platform.OS ==='ios' ? 65 :30,
        paddingHorizontal: 20,
        backgroundColor: '#ffff',

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
        fontFamily: "Poppins-Regular",
    },
    profileText: {
        color: '#ffff',
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        alignSelf: "center",
        marginTop:10
    },
});