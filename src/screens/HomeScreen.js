import React, { useRef, useState, useContext, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    TextInput,
    FlatList,
    Modal,
    Pressable,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,
    TouchableHighlight,
    BackHandler,
    Alert,

} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import ReactNavigationBottomTabs from './tabscardold';
import { scale } from "react-native-size-matters";
import CoupleCard from '../components/CoupleCard';
import { indexOf, sortBy } from 'lodash';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { NotesContext } from "../context/NotesContext";
import { State } from 'react-native-gesture-handler';

// import GetLocation from 'react-native-get-location';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { delay, entries, filter } from 'lodash';
import { Badge } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AppContext from '../components/appcontext';
// import HomeScreen from './HomeScreen';
import GetLocation from 'react-native-get-location';
import Loader from './loader';
import axios from 'axios';
import axiosconfig from '../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const inActiveColor = 'white';
const activeColor = '#00B712';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const activeIndex = 0
const { width: screenWidth } = Dimensions.get('window');

const PreData = [
    {


        id: 1,
        key: "1",
        title: 'Pre-Plan',
        description:
            'Date 01',
    },
    {
        id: 2,
        key: "2",
        title: 'Pre-Plan',
        description:
            'Date 02',
    },
    {
        id: 3,
        key: "3",
        title: 'Pre-Plan',
        description:
            'Date 03',
    },

    {
        id: 4,
        key: "4",
        title: 'Pre-Plan',
        description:
            'Date 04',
    },
    {
        id: 5,
        key: "5",
        title: 'Pre-Plan',
        description:
            'Date 05',
    },
    {
        id: 6,
        key: "6",
        title: 'Pre-Plan',
        description:
            'Date 06',
    },
    {
        id: 7,
        key: "7",
        title: 'Pre-Plan',
        description:
            'Date 07',
    },
]


const data2 = []

const data = [
    {

        id: 1,
        key: "1",
        color: ['#80D3FC', '#80D3FC',],
        title: 'First Date Mode',
        description:
            'It may, or may not  an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
    },
    {

        id: 2,
        key: "2",
        color: ['#44BEFB', '#44BEFB',],
        title: 'Casual Date Mode',
        description:
            'It may, or  not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
    },
    {

        id: 3,
        key: "3",
        color: ['#0883FB', '#0883FB',],
        title: 'Exclusive Date Mode',
        description:
            'It may, or may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
    },
    {

        id: 4,
        key: "4",
        color: ['#0149FF', '#0149FF',],
        title: 'Married Date Mode',
        description:
            'It may,  may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
    },
];

const pink2 = []

const pink = [
    {
        id: "1",
        key: "1",
        type: "unlock",
        text: "Selfie challenge",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "2",
        key: "2",
        type: "unlock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "3",
        key: "3",
        type: "unlock",
        text: "Truth  or  Dare",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "4",
        key: "4",
        type: "unlock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "5",
        key: "5",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "6",
        key: "6",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "7",
        key: "7",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },

]


const HomeScreen = (props) => {

    useEffect(() => {

        PingData()
        ModeData()

        getCurrentLocation()
        setPings(pink2)
        setEntries([{ type: 'add' }]);
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

    const { state } = useContext(NotesContext)

    const [Pings, setPings] = useState([])
    const [count, setCount] = useState(0);
    const [addEvent, setEvent] = useState(false);
    const [toggleActive, setToggle] = useState(false);
    const [press, setPress] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false)
    const [mode, setMode] = useState('date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [dob, setdob] = useState('Select Date');
    const [time, settime] = useState('Select Time');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenn, setModalOpenn] = useState(false);
    // const [typee, setType] = useState(true)
    const [entries, setEntries] = useState([]);

    const [xy, setXy] = useState('inactive')
    const [vy, setVy] = useState('active')
    const carouselRef = useRef(null);



    // const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);
    const [mainData, setMainData] = useState(DATA);
    const [isEnabled, setIsEnabled] = useState(false);
    const [checkes, setCheckes] = React.useState(false);
    const [checkei, setCheckei] = React.useState(false);
    const [Place, setPlace] = useState(false)
    const [Recommended, setRecommended] = useState(false)
    const [Filters, setFilters] = useState(false)
    const [tabState, setTabstate] = useState('yes')
    const [LocationName, setLocationName] = useState("")
    const [ustate, setState] = useState()
    const [location, setLocation] = useState()
    const [locationon, setlocationon] = useState(true);
    const [lat, setLat] = useState(24.871733)
    const [lng, setLng] = useState(67.359277);
    const [PlaceData, setPlaceData] = useState([])
    const myContext = useContext(AppContext);
    const [del, setDel] = useState(false)
    const [loader, setLoader] = useState(false);
    const [myData, setMyData] = useState()
    const [Pricestate, setPrice] = useState();

    // const [data, setData] = useState([]);

    const PingData = async () => {


        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`pings`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            res.data.data.map((res, i) => {

                pink2.push(res)

                console.log(res, "pings hello")

            })



        }).catch((err) => {

        })
    }


    const ModeData = async () => {
        myData
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`date-mode`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {
            // console.log(res,"my data");
            res.data.data.map((res, i) => {
                data2.push(res)
                console.log(i)
                if (data2[i] == 0) { data2[i].color = ['#80D3FC', '#80D3FC',] }
                if (data2[i] == 1) { data2[i].color = ['#44BEFB', '#44BEFB',] }
                if (data2[i] == 2) { data2[i].color = ['#0883FB', '#0883FB',] }
                else { data2[i].color = ['#0149FF', '#0149FF',] }


            })


            console.log(data2, "hello")

        }).catch((err) => {

        })
    }


    const getCurrentLocation = () => {
        setLoader(true)
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                // setLocation(location)
                console.log(location)
                setLat(location.latitude);
                setLng(location.longitude);

                setTimeout(() => {
                    handleRestaurantSearch(location.latitude, location.longitude);
                }, 1000);
            })
            .catch(error => {
                setlocationon(false)
                const { code, message } = error;
                setLoader(false)
            })
    }

    const handleRestaurantSearch = async (l, ln) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
        const location = `location=${l},${ln}`;
        const radius = '&radius=2000';
        const type = '&type=restaurant';
        // const keyword = '&keyword=Meal';
        const key = '&key=AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU';
        const restaurantSearchUrl = url + location + radius + type + key;
        try {
            let response = await fetch(
                restaurantSearchUrl
            );
            let json = await response.json();
            console.log(json, 'json');

            let a = []
            json.results.map((v, i) => {
                a.push(v.name)
            })
            setPlaceData(a);
        } catch (error) {
            console.error(error);
        }

    }

    const setToggleee = (item, id) => {
        mainData.map((v, i) => {
            if (v.Id == id) {
                console.log(mainData[i].check)
                mainData[i].check = !mainData[i].check;
                setMainData([...mainData])
            }
        })

        // handleRestaurantSearch(lat,lng)
    }



    const toggleInvert = (item, id) => {
        mainData.map((v, i) => {
            if (v.check != id) {
                console.log(mainData[i].check)
                mainData[i].check = !mainData[i].check;
                setMainData([...mainData])
            }
        })

    }

    const Item = ({ title, meal, drink, isEnabled, setIsEnabled, Id, index }) => {


        return (
            <View >
                <View style={{ marginTop: moderateScale(0) }}>
                    <TouchableOpacity  >

                        <Text style={styles.title2}>{title}</Text>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[
                        styles.toggleContainer2,
                        { borderColor: null ? activeColor : null, },
                    ]}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setToggleee(isEnabled, Id);
                    }}
                    activeOpacity={1}>
                    <View
                        style={[
                            styles.toggleBtn2,
                            isEnabled
                                ? { backgroundColor: inActiveColor, borderRadius: 25, alignSelf: 'flex-end' }
                                : { backgroundColor: activeColor, borderRadius: 25, },
                        ]}

                    />
                    <Text style={{ color: 'white', fontSize: 12, position: 'absolute', fontFamily: 'Poppins-Regular', bottom: Platform.OS === 'ios' ? moderateScale(1.7, 0) : moderateScale(-1, 0), left: Platform.OS === 'ios' ? moderateScale(5, 0) : moderateScale(5, 0) }}> Y</Text>
                    <Text style={{ color: !isEnabled ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(2, 0) : moderateScale(-0.5, 0), right: Platform.OS === 'ios' ? moderateScale(7.2, 0) : moderateScale(7.5, 0) }}>N</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItemm = ({ item, i }) => (
        <Item title={item.title} isEnabled={item.check} setIsEnabled={setIsEnabled} Id={item.Id} index={i} />
    );



    const PlaceName = () => {


        return (

            <FlatList
                data={PlaceData}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (




                    < ScrollView >



                        <View style={styles.placeView2}>

                            <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5 }}>

                                    <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                                        style={{ top: 30, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checked ? 'white' : 'white', borderWidth: 4, borderColor: 'white' }} >
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                        <View style={{ top: 4 }}>
                                            <View

                                            >
                                                {/* <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular', }}>
                                                    {item}
                                                </Text> */}
                                                <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular', }}>{((item).length > 10) ?
                                                    (((item).substring(0, 10 - 3)) + '...') :
                                                    item}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                            <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place1.png'))}></Image>
                                        </View>
                                        <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50 }}>
                                            <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place2.png'))}></Image>
                                        </View>
                                        <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                            <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place3.png'))}></Image>
                                        </View>
                                    </View>

                                </View>


                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                )}

            />
        )
    }


    const PlaceRecommended = () => {

        return (
            <FlatList
                data={PlaceData}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => (

                    <ScrollView nestedScrollEnabled={true} >
                        {
                            index == 0 ?
                                (
                                    <>
                                        <View >
                                            <TouchableOpacity onPress={() => checkes ? setCheckes(false) : setCheckes(true)}>
                                                <View style={styles.placeViewc}>
                                                    <View style={styles.yellowView}>
                                                        <Text style={{ color: '#000000', fontSize: 9, fontFamily: 'Poppins-Regular', alignSelf: 'flex-start', margin: 5, marginLeft: 10, }}>Recommended</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 10, color: '#BBBBBB', fontFamily: 'Poppins-Regular', top: 20, left: 45 }}>Don`t eat anywhere else</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                        <TouchableOpacity onPress={() => checkes ? setCheckes(false) : setCheckes(true)}
                                                            style={{ top: 25, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checkes ? 'white' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                                        </TouchableOpacity>

                                                        <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >

                                                            <View>
                                                                <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular', }}>{((item).length > 10) ?
                                                                    (((item).substring(0, 10 - 3)) + '...') :
                                                                    item}
                                                                </Text>
                                                            </View>

                                                            <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                                                <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place1.png'))}></Image>
                                                            </View>
                                                            <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50 }}>
                                                                <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place2.png'))}></Image>
                                                            </View>
                                                            <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                                                <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place3.png'))}></Image>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ color: 'white', fontSize: 8, fontFamily: 'Poppins-Regular', alignSelf: 'flex-start', top: 15, left: 50, }}>Discount Code</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Badge style={{ backgroundColor: '#363143', top: 20, left: 50, fontSize: 8, fontFamily: 'Poppins-Regular', }}> 7C85A3</Badge>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <View style={{ height: 1, width: 270, borderColor: 'white', borderWidth: .2, borderRadius: .1, marginVertical: 5, marginHorizontal: moderateScale(28), marginBottom: 15 }}></View>

                                        </View>
                                    </>
                                ) :



                                < ScrollView >

                                    <View style={styles.placeView2}>
                                        <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5 }}>

                                                <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                                                    style={{ top: 30, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checked ? 'white' : 'white', borderWidth: 4, borderColor: 'white' }} >
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                    <View style={{ top: 4 }}>
                                                        <View

                                                        >
                                                            {/* <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular', }}>
                                                    {item}
                                                </Text> */}
                                                            <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular', }}>{((item).length > 10) ?
                                                                (((item).substring(0, 10 - 3)) + '...') :
                                                                item}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                                        <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place1.png'))}></Image>
                                                    </View>
                                                    <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50 }}>
                                                        <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place2.png'))}></Image>
                                                    </View>
                                                    <View style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: 50, }}>
                                                        <Image style={{ alignSelf: 'center', top: 8 }} source={(require('../assets/place3.png'))}></Image>
                                                    </View>
                                                </View>

                                            </View>


                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                        }


                    </ScrollView>

                )}

            />
        )

    const carouselRef = useRef(null);
    
    const doneNow =()=>{
        props.navigation.navigate("datemode")
        setNotification()
    }

    const setNotification = () => {
        // Notifications.schduleNotification(date);
        Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
      };


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


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm2 = (time) => {
        console.warn("A time has been picked: ", time);
        settime(moment(time).format('hh:mm A'))
        hideTimePicker();
    };


    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [checked, setChecked] = React.useState(false);

    const animation = useRef(new Animated.Value(0)).current;

    function questionPick(item) {
        setPress(item.id)
    }

    function questionClose(item) {
        setPress(item.id)
    }





    const addEventCard = (t) => {
        // entries.push({ type: t })
        entries.splice(1, 0, { type: t })
        setEntries([...entries]);
        setTimeout(() => {
            goForward()
        }, 1000);
    }
    const RemoveEventCard = (b) => {

        entries.pop(indexOf, { type: b })

        LayoutAnimation.easeInEaseOut();
    }

    const renderItem = ({ item, index }, parallaxProps) => {
        // console.log(entries)
        return (
            <View style={styles.item}>
                {
                    item.type == 'add' ? (
                        <>
                            <TouchableOpacity onPress={() => addEventCard('meal')}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#80D3FC', '#80D3FC']}
                                    style={styles.addEventButton} >
                                    <Text style={styles.AddMeal}>
                                        Add a Meal
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addEventCard('activity')}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#44BEFB', '#44BEFB']}
                                    style={styles.addEventButton} >
                                    <Text style={styles.AddMeal}>
                                        Add an Activity
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addEventCard('desert')}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#0883FB', '#0883FB']}
                                    style={styles.addEventButton} >
                                    <Text style={styles.AddMeal}>
                                        Add Dessert
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addEventCard('drink')}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#0149FF', '#0149FF']}
                                    style={styles.addEventButton} >
                                    <Text style={styles.AddMeal}>
                                        Add Drink
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.mealView2}   >
                                {/* <TouchableHighlight onPress={() => RemoveEventCard()}>
                                <MaterialIcons style={{ marginLeft: 10, marginTop: 35 }} name='delete-outline' size={hp('5.5%')} color="white" />
                                </TouchableHighlight> */}
                                <ReactNavigationBottomTabs nestedScrollEnabled={true} item={item}></ReactNavigationBottomTabs>
                            </View>
                        </>
                    )
                }
            </View>
        );
    };

    const scale = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        setTimeout(() => {
            Animated.spring(animation, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }, 200);
    };

    const onPressMius = () => {
        Animated.spring(animation, {
            toValue: -5,
            useNativeDriver: true,
        }).start();
    };

    const onPress = () => setCount(count < 60 ? count + 5 : 0);
    const onPree = () => setCount((count <= 60 && count > 0) ? count - 5 : (count == 0 ? 60 : 0))

    const rendenPlanPing = () => {
        return (
            PreData.map((v, i) => {
                return (
                    <View >
                        <View style={styles.ping}
                            key={i}
                        >
                            <TouchableOpacity
                                onPress={() => setModalOpen(true)}
                                style={styles.PingPlayed2}
                                type={PreData}
                            >
                                <Text style={styles.PingText1}>
                                    {v.title}
                                </Text>
                                <Text style={styles.pinLockUnclock2}>
                                    {v.description}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })
        )

    }




    const xyz = (type, selected, Id, paid_or_free, item) => {


        Pings.paid_or_free == 'paid' ? setModalOpenn(true) : null
        console.log("not found")
        // type == 'unlock' && selected == true

    }

    const setActive = (index) => {
        // Pings[index].selected = !Pings[index].selected;
        // console.log(Pings[index])
        // setPings([...Pings])
    }

    const PingModeId = (id) => {

        console.log(id);

    }

    const rendenPing = () => {
        const [myArray, setMyArray] = useState([]);
        function onlclick() {
            let myLocalArray = []
            myLocalArray = Pings.splice(0, 1)
            setMyArray(myLocalArray)
            { Pings.paid_or_free == 'paid' ? setModalOpenn(true) : null }
        }
        return (
            <FlatList
                data={Pings}
                keyExtractor={(item) => item}
                horizontal={true}
                renderItem={({ item, index }) => (


                    <View style={styles.ping} >
                        {
                            item.paid_or_free == "paid" ?
                                (<>
                                    <TouchableOpacity onPress={() => { (item.paid_or_free ? [setModalOpenn(true), setPrice(item.price)] : null); PingModeId(item.mode_id) }}>

                                        <View style={styles.PingLock}>
                                            <View style={{ height: 60 }}>
                                                <Text style={styles.PingText11}>{item.name}</Text>
                                            </View>
                                            <View style={styles.pinLockPicback}>
                                                <Image style={styles.pinLockPic} source={require('../assets/lock.png')}></Image>
                                            </ View>
                                        </View>

                                    </TouchableOpacity >


                                </>) :

                                <TouchableOpacity onPress={() => PingModeId(item.mode_id)}>

                                    <View style={styles.PingUnlock}>
                                        <View style={{ height: 65 }}>
                                            <Text style={styles.PingText11}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.activeText} >Inactive</Text>
                                        </ View>
                                    </View>

                                </TouchableOpacity>



                        }


                        {/* {item.name == 'unlock' && item.selected == true ?
                    (<>
                        <TouchableOpacity onPress={() => setActive(item)}>
                            <View style={styles.PingPlayed}>
                                <View style={{ height: 65 }}>
                                    <Text style={styles.PingText11}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.activeText} >Active</Text>
                                </ View>
                            </View>
                        </TouchableOpacity>
                    </>) : null} */}

                    </View>

                )}
            />
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.TopHeader}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('faqscreen')}>
                        <Text style={{ fontSize: 20, fontFamily: "Gazpacho Regular", color: "white", alignSelf: "flex-start", margin: 20, }}> FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('personalprofiledetails')}>

                        <Image style={styles.imgSetting}
                            source={require("../assets/setting.png")}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView>

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
                            backgroundColor: '#000000e0',
                        }} >
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.modalViewH}>
                                <Text style={styles.modalText2}>This Ping is currently locked. Would you like to permanently unlock it for just ${Pricestate} ?</Text>

                                <View style={styles.modalButtons2} >
                                    <Pressable
                                        style={styles.buttonH}
                                        onPress={() => ('')}
                                    >
                                        <Text style={styles.textStyleNo1}>Yes</Text>
                                    </Pressable>

                                    <Pressable
                                        style={styles.buttonH}
                                        onPress={() => setModalOpenn(false)}
                                    >
                                        <Text style={styles.textStyleNo1}>No Thanks</Text>
                                    </Pressable>

                                </View>


                            </LinearGradient>
                        </View>

                    </Modal>

                    <View >
                        <View style={{ alignItems: 'center', }}>

                            <View>

                                <Text style={styles.ModeHeading}>Choose Your Mode</Text>
                            </View>

                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList

                                    nestedScrollEnabled
                                    ListEmptyComponent={null}
                                    ListFooterComponent={null}
                                    ListHeaderComponent={null}
                                    data={data2}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ width: (windowWidth - 50), }}
                                    renderItem={({ item, index }) => (
                                        <Pressable
                                            onPress={() => { LayoutAnimation.easeInEaseOut(); questionPick(item) }}
                                            style={{ marginTop: 20, width: '100%', padding: 0, }}
                                        >
                                            {press === item.id ?

                                                <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }}  >
                                                    <LinearGradient
                                                        colors={item.color}
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            backgroundColor: '#0883FB',
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 10, height: 76,
                                                            borderColor: 'white', borderWidth: 1.5,
                                                            borderTopLeftRadius: 18, borderTopRightRadius: 18,
                                                            borderBottomLeftRadius: 10,
                                                            borderBottomRightRadius: 10, color: "White",
                                                        }}>

                                                        <MaterialIcons name='expand-less' size={hp('5%')} color="white" />
                                                        <Text style={{
                                                            padding: 5,
                                                            color: 'white',
                                                            marginLeft: -20,
                                                            fontFamily: "Gazpacho Regular",
                                                            fontSize: 16,
                                                            width: moderateScale(180)
                                                        }}>{item.name}</Text>

                                                        {/* <AntDesign name="caretdown" size={16} color="black"/> */}
                                                        <TouchableOpacity>
                                                            <View style={styles.RadioView2}>
                                                                {/* <View style={onPress == item ? styles.RadioInnerViewNormal : styles.RadioInnerView} >
                                                                </View> */}
                                                            </View>
                                                        </TouchableOpacity>
                                                    </LinearGradient>
                                                </Pressable>

                                                :
                                                <LinearGradient
                                                    colors={item.color}
                                                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0883FB', paddingHorizontal: 10, paddingVertical: 10, height: 76, borderRadius: 18, color: "White", }}>
                                                    <MaterialIcons name='expand-more' size={hp('5%')} color="white" />
                                                    <View >
                                                        <Text style={{
                                                            padding: 5, marginLeft: -20,
                                                            fontFamily: "Gazpacho Regular",
                                                            color: "white",
                                                            fontSize: 16,
                                                            width: moderateScale(180),
                                                        }}>{item.name}</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <View style={styles.RadioView2}>
                                                            <TouchableOpacity
                                                                // onPress={() => checked ? setChecked(false) : setChecked(true)}
                                                                onPress={() => setChecked(item)}
                                                                style={{
                                                                    marginTop: moderateScale(4, 0.1),
                                                                    width: moderateScale(35),
                                                                    height: moderateScale(35),
                                                                    backgroundColor: '#00B712',
                                                                    borderRadius: 120,
                                                                    alignSelf: "center",
                                                                    borderRadius: moderateScale(20),
                                                                    backgroundColor: checked.id == item.id ? '#00B712' : 'white',
                                                                    borderWidth: 2.5,
                                                                    borderColor: 'white'
                                                                }} >

                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>

                                                </LinearGradient>
                                            }

                                            {press === item.id ?

                                                <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} style={{ zIndex: -999 }} >

                                                    <View style={{ backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, }}>
                                                        <Text style={{
                                                            margin: 15,
                                                            padding: 15,
                                                            marginHorizontal: 0,
                                                            marginTop: -10,
                                                            backgroundColor: "white",
                                                            color: "#B4B4B4",
                                                            borderBottomLeftRadius: 18,
                                                            borderBottomRightRadius: 18,
                                                            fontSize: 14,
                                                            fontFamily: 'Poppins-Regular',
                                                        }}>{item.description} </Text>
                                                    </View>


                                                </Pressable>

                                                :
                                                null
                                            }
                                        </Pressable>

                                    )}
                                />
                            </SafeAreaView>
                        </View>
                    </View>

                    <View >
                        <Modal

                            transparent={true}

                            visible={modalOpen}
                            animationType='fade'

                            navigation={props.navigation}

                        >
                            <View style={styles.centeredView} >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#FF7474', '#E20303']}
                                    style={styles.modalView}>
                                    <Text style={styles.modalText}>Lorem ipsum dolor sit amet, consectetuer
                                        adipiscing elit, sed diam nonummy nibh
                                        euismod tincidunt ut laoreet dolore
                                        magna aliquam erat volutpat. Ut wisi.</Text>

                                    <View style={styles.modalButtons} >
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => setModalOpen(false)}
                                        >
                                            <Text style={styles.textStyleNo}>Buy</Text>
                                        </Pressable>

                                        <Pressable
                                            style={styles.button}
                                            onPress={() => setModalOpen(false)}
                                        >
                                            <Text style={styles.textStyleNo}>No Thanks</Text>
                                        </Pressable>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => setModalOpen(false) || props.navigation.navigate('faqscreen')}
                                        >
                                            <Text style={styles.textStyleNo}>Learn More</Text>
                                        </Pressable>
                                    </View>


                                </LinearGradient>
                            </View>

                        </Modal>
                    </View>
                    <View style={styles.PrePlainDate}>
                        <Text style={styles.PrePlanText}> Pre-Planned Dates</Text>
                        <ScrollView horizontal={true}>
                            {rendenPlanPing()}
                        </ScrollView>
                    </View>

                    {
                        state && state.length > 0 ? (
                            <>
                                <View style={styles.AddPersonView}>
                                    <Text style={styles.chooseYourDateText}> Choose Your Date</Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate("choosedate")}>
                                        <Text style={{ bottom: -14, fontSize: 12, color: 'white', alignSelf: 'flex-end', marginRight: 45, fontFamily: 'Poppins-Regular', }}>Add New +</Text>
                                    </TouchableOpacity>

                                    <CoupleCard navigation={props.navigation}></CoupleCard>
                                    {/* </TouchableOpacity> */}
                                </View>
                            </>
                        ) : <View style={styles.AddPersonView5}>
                            <Text style={styles.chooseYourDateText}> Choose Your Date</Text>

                            <TouchableOpacity onPress={() => props.navigation.navigate("choosedate")}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#FF7474', '#E20303']}
                                    style={styles.linearGradient} >
                                    <Text style={styles.AddButtonText}>
                                        Add Person
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={styles.AddCouple}>

                        <Text style={styles.choosePersonText}>   Add Another Couple</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                            <Text style={{ bottom: -14, fontSize: 12, color: 'white', alignSelf: 'flex-end', marginRight: 45, fontFamily: 'Poppins-Regular', }}>Add New +</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient} >
                                <Text style={styles.AddButtonText}>
                                    Add Person 1
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient} >
                                <Text style={styles.AddButtonText}>
                                    Add Person 2
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addEvent} >
                        <View style={styles.mealView} >
                            <Text style={styles.choosePersonText}>  Add an Event</Text>
                            <View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}>

                                    {
                                        toggleActive == true ?
                                            <GooglePlacesAutocomplete

                                                placeholder='Enter Location'
                                                minLength={2}
                                                autoFocus={false}
                                                returnKeyType={'default'}
                                                fetchDetails={true}
                                                onPress={(data, details = null) => {
                                                    // 'details' is provided when fetchDetails = true
                                                    this.getPysicalAddress(data)
                                                }}
                                                query={{
                                                    key: 'AIzaSyDpjC5dmFxhdUHi24y0ZH6PGD_NhOLFCMA',
                                                    language: 'en',
                                                }}

                                                styles={{
                                                    textInput: {

                                                        backgroundColor: "#4D4D4D",
                                                        marginLeft: 0,
                                                        marginHorizontal: 90,
                                                        borderRadius: 6,

                                                        height: 32,
                                                        color: '#5d5d5d',
                                                        fontSize: 17,
                                                        color: 'white',
                                                        shadowColor: "#000",
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 4,
                                                        },
                                                        shadowOpacity: 0.32,
                                                        shadowRadius: 5.46,

                                                        elevation: 9,
                                                    },

                                                    predefinedPlacesDescription: {
                                                        color: '#000',
                                                    },
                                                    description: {
                                                        color: 'black',


                                                    },
                                                    container: {
                                                        flex: 1,
                                                        marginLeft: 10,

                                                    },

                                                }}

                                            />
                                            :
                                            <Text style={styles.zipCode}> Use Current Location ? </Text>

                                    }

                                    <View style={{ flexDirection: 'row', position: 'absolute', right: 10, marginTop: 3 }}>
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
                                            <Text style={{ color: !toggleActive ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(2, 0) : moderateScale(-0.5, 0), right: Platform.OS === 'ios' ? moderateScale(7.2, 0) : moderateScale(7.6, 0) }}>N</Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                            <Carousel
                                ref={carouselRef}
                                sliderWidth={screenWidth}
                                itemWidth={screenWidth - 60}
                                data={entries}
                                renderItem={renderItem}
                                hasParallaxImages={true}
                            />

                        </View>

                    </View>

                    <View style={{ height: moderateScale(400), backgroundColor: '#4D4D4D' }}>
                        <Text style={styles.SelectYourPingText}>   Select Your Ping Frequency</Text>
                        <View style={styles.ping}>
                            <View style={{ width: 100 }}>
                                <TouchableOpacity onPressIn={onPressMius}
                                    onPress={onPree}
                                    onPressOut={onPree}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#FF2B25', '#FF2B25']}
                                        style={styles.btn1} >
                                        <Text style={styles.btn1Text}>
                                            -
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 100, }} >
                                <Text style={styles.count}>{count}</Text>
                            </View>
                            <View style={{
                                width: 100,
                            }}>
                                <TouchableOpacity onPressIn={onPressIn}
                                    onPress={onPress}
                                    onPressOut={onPressOut}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#FF2B25', '#FF2B25']}
                                        style={styles.btn2} >
                                        <Text style={styles.btn2Text}>
                                            +
                                        </Text>

                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.mins}>mins</Text>
                        <Text style={styles.selectPngText}>Select Your Pings</Text>
                        <ScrollView horizontal={true}>

                            {
                                rendenPing()
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.ScheduleView}>
                        <Text style={styles.chooseDateText}> Schedule Your Date</Text>
                        <TouchableOpacity onPress={() => showDatePicker()}>
                            <View style={styles.sectionStyle2}>
                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}

                                >
                                    {dob}
                                </Text>
                                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(45), width: moderateScale(45), borderRadius: 55 }}>
                                    <Image
                                        source={require('../assets/calendar.png')} //Change your icon image here
                                        style={styles.imageStyle}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => showTimePicker()} >
                            <View style={styles.sectionStyle2}>
                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 10, }}

                                >  {time}</Text>

                                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(45), width: moderateScale(45), borderRadius: 55 }}>
                                    <Image
                                        source={require('../assets/time.png')} //Change your icon image here
                                        style={styles.imageStyle}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            () => 
                            doneNow()
                            }>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient2} >
                                <Text style={styles.AddButtonText2}>
                                    Send Invitation
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    activeText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 2
    },
    item: {
        width: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    textStyleNo1: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        textAlign: "center",
    },
    buttonH: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20

    },
    modalButtons2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,


    },
    modalText2: {
        marginBottom: 10,
        textAlign: "center",
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: 18
    },
    modalViewH: {
        width: 310,
        height: 209,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 310,
            height: 209
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },


    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 19,

    },
    toggleContainer: {


        height: 22,
        width: 43,
        borderRadius: 20,
        borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: '#24202F',
        padding: 2,
        position: 'relative',

    },
    toggleBtn: { height: '100%', width: '50%' },
    borderColor1: {
        borderColor: 'white',
        borderWidth: 2
    },
    RadioInnerViewNormal: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: 'white',
        borderRadius: 120,
        alignSelf: "center",
        margin: 6.5,
    },
    modalText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Poppins-Regular',
    },
    textStyleNo: {
        color: 'white',
        margin: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 14
    },
    buttonNo: {
        backgroundColor: 'white',
        margin: 20,
        width: 74,
        height: 44,

    },
    buttonYes: {
        color: 'white'

    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000e0',
    },
    modalView: {
        width: moderateScale(310),
        margin: 10,
        backgroundColor: "#00000087",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#00000087",
        shadowOffset: {
            width: 900,
            height: 900
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 0
    },

    RadioInnerView: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: '#00B712',
        borderRadius: 120,
        alignSelf: "center",
        margin: 6.5,
    },

    RadioInnerView2: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: 'white',
        borderRadius: 120,
        alignSelf: "center",
        margin: 6.5,
    },
    RadioView2: {
        width: moderateScale(42),
        height: moderateScale(42),
        backgroundColor: 'white',
        borderRadius: 120,
    },

    RadioView: {
        marginHorizontal: moderateScale(35),
        left: moderateScale(-20),
        width: moderateScale(42),
        height: moderateScale(42),

        backgroundColor: 'white',
        borderRadius: 120,
    },
    mealView: {
        flex: 1,
        flexDirection: 'column',
        width: scale(350),
        animation: LayoutAnimation.easeInEaseOut(),
        marginBottom: 30
    },
    mealView2: {
        animation: LayoutAnimation.easeInEaseOut(),
        height: 420
    },
    ModeHeading: {
        color: 'white',
        fontSize: 20,
        marginTop: 30,

        marginBottom: 5,
        fontFamily: "Gazpacho Regular",
        textAlign: 'center',

    },
    imgSetting: {
        height: 30,
        width: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,


        marginTop: 20,
    },
    TopHeader: {
        height: moderateScale(75),
        backgroundColor: '#363143',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomLeftRadius: 26, zIndex: 999,
        borderBottomRightRadius: 26,


    },
    ScheduleView: {
        marginTop: 0,
        height: 436,
        backgroundColor: 'black',

    },
    imageStyle: {
        top: 10,
        height: 25,
        width: 25,
        alignSelf: 'center'

    },
    sectionStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,


        fontFamily: "Gazpacho Regular",
        fontSize: 16,
        width: (windowWidth - 70),
        height: 76,

        margin: 10,
        alignSelf: "center",
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363143',
        borderRadius: 18,
        marginTop: 20,

        fontFamily: "Gazpacho Regular",
        fontSize: 16,
        width: (windowWidth - 70),
        height: 76,

        margin: 10,
        alignSelf: "center",
    },
    PingBtn: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#FF2B25",
        fontFamily: "Gazpacho Regular",
    },
    PingUnlock: {
        width: 90,
        height: moderateScale(90),
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#FF2B25",
        fontFamily: "Gazpacho Regular",
    },
    PingLock: {
        width: 90,
        height: moderateScale(90),
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#C5C5C5",
        fontFamily: "Gazpacho Regular",

    },
    PingPlayed2: {
        width: 90,
        height: moderateScale(85),
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#1AC72B",
        fontFamily: "Gazpacho Regular",

    },
    PingPlayed: {
        width: 90,
        height: moderateScale(90),
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#1AC72B",
        fontFamily: "Gazpacho Regular",

    },
    PingText1: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        marginTop: 26,
        lineHeight: 25,
        marginHorizontal: 6

    },
    PingText: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: "Gazpacho Bold",
        textAlign: "center",
        marginTop: 27,
        marginHorizontal: 4,
    },
    PingText11: {
        fontSize: 11.5,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        marginTop: moderateScale(20),
        marginHorizontal: 6,
    },
    pinLockPic: {
        height: 12,
        width: 12,
        alignSelf: 'center',
        top: 2,
    },
    pinLockPicback: {
        height: 17,
        width: 17,
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 5,
        marginHorizontal: 65
    },
    pinLockUnclock2: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        marginTop: -4,
        marginHorizontal: 6
    },
    pinLockUnclock: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        marginHorizontal: 6
    },

    selectPngText: {
        fontSize: 20,
        color: "white",
        marginTop: 10,
        marginBottom: -25,
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",
        textAlign: "center",

    },
    mins: {
        fontSize: 14,
        alignSelf: "center",
        color: "#B8B8B8",
        bottom: 30,
        fontFamily: 'Poppins-Regular',

    },
    count: {
        fontSize: 30,
        color: "white",
        alignSelf: "center",
        marginTop: moderateScale(30),

        fontFamily: 'Poppins-Regular',
    },
    ping: {
        flexDirection: "row",
        marginTop: 20,
        alignSelf: "center",
    },
    btn1Text: {
        textAlign: 'center', // <-- the magic
        fontSize: 38,

        marginTop: moderateScale(4),

        alignSelf: "center",
        color: "white",
        fontFamily: 'Poppins-Regular',

    },
    btn1: {
        width: 58,
        height: 58,
        margin: 25,
        borderRadius: 18,
        fontFamily: "Gazpacho Regular",


    },
    btn2Text: {
        textAlign: 'center', // <-- the magic
        fontSize: 38,

        marginTop: moderateScale(4),

        alignSelf: "center",
        color: "white",
        fontFamily: 'Poppins-Regular',

    },
    btn2: {
        width: 58,
        height: 58,
        margin: 25,
        borderRadius: 18,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

    addEventButton: {
        margin: 10,
        height: 76,
        borderRadius: 16,

        width: (windowWidth - 50),
        alignSelf: 'center'
    },
    AddMeal: {
        color: "white",
        alignSelf: "flex-start",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 25,
        fontSize: 16,
        fontFamily: "Gazpacho Regular",

    },
    zipCode: {
        fontSize: 17,
        color: "#9f9f9f",
        fontFamily: 'Poppins-Regular',
        marginTop: 3

    },
    addEvent: {

        backgroundColor: '#0000',
        width: '100%',
        flexDirection: 'row',
    },
    tinyLogo: {
        width: 23,
        height: 23,
    },
    AddButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',

        alignSelf: "center",
        color: '#FFFF',

    },
    linearGradient2: {


        width: windowWidth - 70,

        borderRadius: 16,
        marginTop: 20,
        alignSelf: 'center',
        height: 70,
    },
    linearGradient: {
        width: 354,
        borderRadius: 16,
        alignSelf: 'center',
        height: 74,
    },
    AddCouple: {
        height: 372,
        backgroundColor: '#4D4D4D',

    },
    AddButtonText2: {

        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginTop: 24,
        alignSelf: "center",
        color: '#FFFF',


    },
    AddButtonText: {
        height: 76,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginTop: 27,
        alignSelf: "center",
        color: '#FFFF',
    },
    linearGradient: {
        width: 314,
        borderRadius: 16,
        marginTop: 40,
        alignSelf: 'center',
        height: 76,
    },
    PrePlainDate: {
        marginTop: 60,
        height: 236,
        backgroundColor: '#4D4D4D',

    },
    AddPersonView: {
        marginTop: 20,
        backgroundColor: 'black',

    },
    AddPersonView5: {
        marginTop: 30,
        marginBottom: 60,
        backgroundColor: 'black',

    },
    chooseDateText: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",


    },
    chooseYourDateText: {
        marginTop: 10,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",

    },
    PrePlanText: {
        marginTop: 30,


        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",

    },
    SelectYourPingText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",
    },
    choosePersonText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Gazpacho Regular",
    }
    ,
    contentHead: {
        marginHorizontal: 20,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        height: 70,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: "Gazpacho Regular",
        marginBottom: 20,
    },
    header: {
        marginHorizontal: 20,
        backgroundColor: '#F5FCFF',
        padding: 10,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        height: 76,
        marginBottom: 5,
        top: 35,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Gazpacho Regular",
        color: "white",
        alignSelf: "flex-start",
        marginTop: 15,
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontFamily: "Gazpacho Regular",
        padding: 10,
        textAlign: 'center',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
        fontFamily: "Gazpacho Regular",
    },
});