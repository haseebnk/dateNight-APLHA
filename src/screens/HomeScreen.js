import React, { useRef, useState, useContext, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Switch,
    View,
    Image,
    Animated,
    TextInput,
    FlatList,
    Modal,
    Pressable,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,
    BackHandler,
    Alert,
    Text, StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    ImageBackground,

} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import ReactNavigationBottomTabs from './tabscardold';
import { scale } from "react-native-size-matters";
// import CoupleCard from '../components/CoupleCard';
import { indexOf, sortBy } from 'lodash';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { NotesContext } from "../context/NotesContext";
import { ScrollView, State } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
// import GetLocation from 'react-native-get-location';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { delay, entries, filter } from 'lodash';
import { Badge } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AppContext from '../components/appcontext';
// import HomeScreen from './HomeScreen';
import GetLocation from 'react-native-get-location';
import RBSheet from "react-native-raw-bottom-sheet";
import Loader2 from './loader2';
import axios from 'axios';
import axiosconfig from '../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Popable } from 'react-native-popable';


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
const DATA = [
    {
        Id: 1,
        title: 'Asian Food',
        meal: 'chicken',
        dessert: 'lava',
        drink: 'dew',
        check: false
    },
    {
        Id: 2,
        title: 'Barbeque',
        check: false
    },
    {
        Id: 3,
        title: 'Breakfast Food',
        check: false
    },
    {
        Id: 4,
        title: 'Buffets',
        check: false
    },
    {
        Id: 5,
        title: 'Burger & Fries',
        check: false
    },
    {

        Id: 6,
        title: 'Fine Dining',
        check: false
    },
    {
        Id: 7,
        title: 'Fondue',
        check: false
    },

    {
        Id: 9,
        title: 'Hawaiian & Island Food',
        check: false
    },
    {
        Id: 10,
        title: 'Greek Food',
        check: false
    },
    {
        Id: 11,
        title: 'Hot Dogs',
        check: false
    },
    {
        Id: 12,
        title: 'Italian Food',
        check: false

    },
    {
        Id: 19,
        title: 'Mexican Food',
        check: false

    },
    {
        Id: 13,
        title: 'Pizza',
        check: false

    },
    {
        Id: 14,
        title: 'Sandwiches',
        check: false

    },
    {
        Id: 15,
        title: 'Soup & Salads',
        check: false

    },
    {
        Id: 16,
        title: 'Sushi & Seafood',
        check: false

    },
    {
        Id: 17,
        title: 'Steak',
        check: false

    }

]
const HomeScreen = (props) => {
    const isFocused = useIsFocused();
    const [refresher , setrefresher] = useState(true)
    useEffect(() => {

        EventData()
        ModeData()
        getPysicalAddress()
        getCurrentLocation()
        PreplanData()
        getDates()
        // setPink(pink2)
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
    }, [isFocused, refresher]);

    const { state } = useContext(NotesContext)
    const [Pings, setPings] = useState([])
    const [addEvent, setEvent] = useState(false);
    const [toggleActive, setToggle] = useState(false);
    const [press, setPress] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false)
    const [mode, setMode] = useState('date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenn, setModalOpenn] = useState(false);
    const [entries, setEntries] = useState([]);
    const [xy, setXy] = useState('inactive')
    const [vy, setVy] = useState('active')
    const carouselRef = useRef(null);

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
    const [Loader22, setLoader2] = useState(false);
    const [myData, setMyData] = useState({})
    const [Pricestate, setPrice] = useState();
    const [Pricestate2, setPrice2] = useState();
    const [pingid, setPingId] = useState();
    const [eventName, setEventName] = useState()
    const [modedataa, setModeData] = useState([]);
    const [pink2, setPink] = useState([]);
    const [prePlan, setPreplan] = useState([])
    const [events, setEvents] = useState([])
    const [eventChild, setEventChild] = useState([])
    const [childName, setChildName] = useState([])
    const [otherpersons1, setotherpersons1] = useState([])
    const [otherpersons2, setotherpersons2] = useState([])
    const [datepersons, setdatepersons] = useState([])
    const [count, setCount] = useState(5);
    const [dob, setdob] = useState('Select Date');
    const [time, settime] = useState('Select Time');

    const refRBSheet = useRef();
    const refRBSheet2 = useRef();

    const EventData = async () => {

        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`events`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {
            res.data.data.map((res) => {
                res.childs.map((r, i) => {
                    r['check'] = false
                })
            })
            myDataFunc(value)
            setEvents(res.data.data)
        }).catch((err) => {
            console.log(err.response, 'error')
        })
    }

    const PreplanData = async () => {
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`pre-plan-dates`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {
            res.data.data.map((v, i) => {
                v['check'] = false
            })
            console.log(res, "hehe");
            setPreplan(res.data.data)
        }).catch((err) => {

        })
    }

    const myDataFunc = (value) => {
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

    const [pingmode, PingModeId] = useState(null)

    const [pingsid, setPingsId] = useState('')

    const PingData = async (id, con) => {
        setLoader2(true)
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`pings-by-mode/${id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + value
                }
            }
        ).then((res: any) => {
            res.data.data.map((v, i) => {
                v['check'] = false
            })
            if (con) {
                con.map((v, i) => {
                    res.data.data.map((vi, ii) => {
                        if (Number(v) == vi.id) {
                            vi['check'] = true
                        }
                    })
                })
            }

            setPink([...res.data.data])
            res.data.data.map((v, i) => {
                setPingsId(v.id, "pinkid")
            })
            setLoader2(false)

        }).catch((err) => {
            setLoader2(false)
        })
    }

    const ModeData = async () => {
        const value = await AsyncStorage.getItem('@auth_token');
        setLoader2(true)
        await axiosconfig.get(`date-mode`,
            {
                headers: {
                    Authorization: 'Bearer ' + value
                }
            }
        ).then((res: any) => {
            res.data.data.map((v, i) => {
                v['check'] = false;
            })
            setModeData([...res.data.data])

            setLoader2(false)

        }).catch((err) => {

        })
    }

    const getCurrentLocation = () => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                // setLocation(location)
                setLat(location.latitude);
                setLng(location.longitude);

                // setTimeout(() => {
                //     handleRestaurantSearch(location.latitude, location.longitude);
                // }, 1000);
            })
            .catch(error => {
                setlocationon(false)
                const { code, message } = error;
                setLoader2(false)
            })
    }

    const getPysicalAddress = (location) => {

        Geocoder.init("AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU");
        setTimeout(() => {
            Geocoder.from(location?.latitude, location?.longitude)
                .then(json => {
                    var addressComponent = json.results[0].formatted_address;
                    // myContext.setaddress(addressComponent)
                    setPlaceData(addressComponent)
                })
                .catch(error =>

                    console.warn(error), "yesss");
        }, 1000);
    }

    const handleRestaurantSearch = async (l, ln, str, item) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
        const location = `location=${l},${ln}`;
        const radius = '&radius=2000';
        const type = '&type=restaurant';
        const key = '&key=AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU';
        const keyword = `&keyword=${str}`

        const restaurantSearchUrl = url + location + radius + type + keyword + key;
        try {
            let response = await fetch(
                restaurantSearchUrl
            );
            let json = await response.json();

            let a = []
            json.results.map((v, i) => {
                a.push(v)
            })
            return a;
            setPlaceData([...a]);
        } catch (error) {
            console.error(error);
        }

    }

    const setToggleee = (item, id, index, i) => {
        entries[index]['children'][i].check = !entries[index]['children'][i].check;
        setEntries([...entries])
    }

    const toggleInvert = (item) => {
        entries.map((v, i) => {
            if (item.uid == v.uid) {
                v.children.map((vi, ii) => {
                    vi.check = !vi.check;
                    setEntries([...entries])
                })
            }
        })
    }

    const changeTab = async (item, con) => {
        if (con != 'yesno') {
            setLoader2(true)
        }
        let str = ''
        entries.map((v, i) => {
            if (item.uid == v.uid) {
                v.children.map((vi, ii) => {
                    if (vi.check) {
                        str += vi.label
                    }
                })
            }
        })
        if (str == null || str == '') {
            alert('Please select the atlease one ' + item.type)
            return
        }
        else {
            let t = handleRestaurantSearch(lat, lng, str, item);
            setTimeout(async () => {
                if (t._W) {
                    entries.map((v, i) => {
                        if (item.uid == v.uid) {
                            for (const property in v.tabs) {
                                v.tabs[property] = false
                            }
                            v.tabs[con] = true;
                            v['places'] = t._W;
                            v.places.map((vii, ii) => {
                                vii['check'] = false
                            })
                            setEntries([...entries])
                        }
                    })
                }
                setLoader2(false)
            }, 1000);
        }
    }

    const RemoveEventCard = (item) => {
        entries.map((v, i) => {
            if (item.uid == v.uid) {
                entries.splice(i, 1)
                setEntries([...entries])
            }
        })
    }

    const setCheckedPlaces = (id, item) => {
        entries.map((v, i) => {
            if (item.uid == v.uid) {
                v.places.map((vi, ii) => {
                    if (vi.place_id == id) {
                        vi.check = true
                    } else {
                        vi.check = false
                    }
                })
                setEntries([...entries])
            }
        })
    }

    const PlaceName = (ii, item) => {
        var iop = ii[Math.floor(Math.random() * ii.length)];
        return (

            <View style={styles.placeView2}>
                <TouchableOpacity onPress={() => setCheckedPlaces(iop.place_id, item)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -10 }}>

                        <TouchableOpacity onPress={() => setCheckedPlaces(iop.place_id, item)}
                            style={{ top: 29, left: 20, height: 20, width: 20, borderRadius: 20, backgroundColor: item.check ? 'green' : 'white', borderWidth: 4, borderColor: 'white' }} >
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                            <View style={{ top: 4 }}>
                                <View>

                                    <Popable content={iop.name}>
                                        <Text numberOfLines={1}
                                            style={{ marginLeft: -50, top: 0, color: '#FFD500', fontSize: 14, fontFamily: 'Poppins-Regular', }}>

                                            {((iop.name).length > maxlimit) ?
                                                (((iop.name).substring(0, maxlimit - 3)) + '...') :
                                                iop.name}
                                        </Text>
                                    </Popable>


                                </View>
                            </View>

                            <View style={{ backgroundColor: 'white', height: 25, width: 25, borderRadius: 50, justifyContent: 'center', alignContent: 'center' }}>
                                <Ionicons style={{ alignSelf: 'center', top: 0, bottom: 0, }} name='location-outline' size={hp('2.6%')} color="red" />
                            </View>

                        </View>


                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const [maxlimit, setMaxlimit] = useState(17)

    const PlaceRecommended = (item, io) => {
        return (
            <FlatList
                data={item}
                renderItem={({ item, index }) => (

                    <ScrollView nestedScrollEnabled={true} >
                        {
                            index == 0 ?
                                (
                                    <>
                                        <View >
                                            <TouchableOpacity onPress={() => setCheckedPlaces(item.place_id, io)}>
                                                <View style={styles.placeViewc}>
                                                    <View style={styles.yellowView}>
                                                        <Text style={{ color: '#000000', fontSize: 9, fontFamily: 'Poppins-Regular', alignSelf: 'center', marginLeft: 10, }}>Date Night's Official Recommendation</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 10, color: '#BBBBBB', fontFamily: 'Poppins-Regular', top: 10, left: 40 }}>Don`t eat anywhere else</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 20 }}>

                                                        <TouchableOpacity onPress={() => setCheckedPlaces(item.place_id, io)}
                                                            style={{ top: 2, left: 20, height: 20, width: 20, borderRadius: 20, backgroundColor: item.check ? 'green' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                                        </TouchableOpacity>

                                                        <View style={{ marginLeft: 20, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 0, marginRight: 20 }} >
                                                            <View>
                                                                <Text style={{ marginLeft: 20, top: 2, color: '#FFD500', fontSize: 14, fontFamily: 'Poppins-Regular', }}>
                                                                    {Recommended}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ backgroundColor: 'white', height: 25, width: 25, borderRadius: 50, }}>
                                                            <Ionicons style={{ alignSelf: 'center', top: 0, bottom: 0, }} name='location-outline' size={hp('2.6%')} color="red" />
                                                        </View>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: 1, width: 270, borderColor: 'white', borderWidth: .2, borderRadius: .1, marginVertical: 5, marginHorizontal: moderateScale(28), marginBottom: 15 }}></View>
                                        </View>
                                    </>
                                ) :

                                <ScrollView >
                                    <View style={styles.placeView2}>
                                        <TouchableOpacity onPress={() => setCheckedPlaces(item.place_id, io)}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -10 }}>



                                                <TouchableOpacity onPress={() => setCheckedPlaces(item.place_id, io)}
                                                    style={{ top: 29, left: 20, height: 20, width: 20, borderRadius: 20, backgroundColor: item.check ? 'green' : 'white', borderWidth: 4, borderColor: 'white' }} >
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                    <View style={{ top: 4 }}>
                                                        <View>
                                                            <Popable content={item.name}>
                                                                <Text
                                                                    numberOfLines={1}

                                                                    style={{ marginLeft: -50, top: 0, color: '#FFD500', fontSize: 14, fontFamily: 'Poppins-Regular', }}>

                                                                    {((item.name).length > maxlimit) ?
                                                                        (((item.name).substring(0, maxlimit - 3)) + '...') :
                                                                        item.name}
                                                                </Text>
                                                            </Popable>
                                                        </View>
                                                    </View>

                                                    <View style={{ backgroundColor: 'white', height: 25, width: 25, borderRadius: 50, justifyContent: 'center', alignContent: 'center' }}>
                                                        <Ionicons style={{ alignSelf: 'center', top: 0, bottom: 0, }} name='location-outline' size={hp('2.6%')} color="red" />
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
    }

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

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const [checked, setChecked] = React.useState(false);

    const animation = useRef(new Animated.Value(0)).current;

    function questionPick(item) {
        setPress(item.id)
    }

    const addEventCard = (t) => {
        entries.splice(1, 0, {
            type: t.name,
            children: t.childs,
            id: t.id,
            uid: Math.floor(Math.random() * 101),
            tabs: { yesno: true, shuffle: false, all: false },
            check: false
        });
        setEntries([...entries]);
        setTimeout(() => {
            goForward();

        }, 1000);
    }

    const setEventCheck = (item) => {
        entries.map((v, i) => {
            if (item.id == v.id) {
                v.check = !v.check;
                setEntries([...entries]);
            }
        })
    }

    const renderItem = ({ item, index }, parallaxProps) => {

        return (
            <View style={styles.item}>

                {
                    item.type == 'add' ? (
                        <>
                            <FlatList
                                data={events}
                                renderItem={({ item, i }) => (
                                    <TouchableOpacity onPress={() => { addEventCard(item), setEventName(item.name) }}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                            colors={['#0883FB', '#0883FB']}
                                            style={styles.addEventButton} >
                                            <Text style={styles.AddMeal}>
                                                {item.name}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                )}
                            />
                        </>
                    ) : (
                        <>
                            <View style={styles.mealView2}   >
                                <View style={styles.Contain}>
                                    <View style={styles.InnerContain}>
                                        <View>
                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={item.type == 'meal' ? ['#80D3FC', '#80D3FC'] : item.type == 'activity' ? ['#44BEFB', '#44BEFB'] : item.type == 'desert' ? ['#0883FB', '#0883FB'] : ['#0149FF', '#0149FF']}
                                                style={styles.chooseContaine}>
                                                <TouchableOpacity onPress={() => RemoveEventCard(item)}>
                                                    <MaterialIcons style={{ marginLeft: 15, marginTop: 18 }} name='delete-outline' size={hp('4.5%')} color="white" />
                                                </TouchableOpacity>
                                                <Text style={styles.ChooseMeal}>
                                                    {item.type + ' Filter'}
                                                </Text>
                                                <TouchableOpacity onPress={() => setEventCheck(item)}
                                                    style={{ marginRight: 15, marginTop: moderateScale(15), height: moderateScale(37), width: moderateScale(37), borderRadius: moderateScale(20), backgroundColor: item.check ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >
                                                </TouchableOpacity>
                                            </LinearGradient>
                                            <ScrollView nestedScrollEnabled={true}>
                                                <View style={{ marginTop: 20, }}>

                                                    {item.tabs.yesno ? (
                                                        <>
                                                            <SafeAreaView style={{ flex: 1 }}>
                                                                <FlatList
                                                                    nestedScrollEnabled={true}
                                                                    data={item.children}
                                                                    // renderItem={(io, i) => renderItemm(io, i, item)}
                                                                    renderItem={(io, i) => (
                                                                        <View>
                                                                            {console.log(io.item, 'jhgjhgjgj', item.children)}
                                                                            <View style={{ marginTop: moderateScale(0) }}>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        LayoutAnimation.easeInEaseOut();
                                                                                        setToggleee(item, io.item.id, index, io.index);
                                                                                    }}
                                                                                >

                                                                                    <Text style={styles.title2}>{io.item.label}</Text>

                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            <TouchableOpacity
                                                                                style={[
                                                                                    styles.toggleContainer2,
                                                                                    { borderColor: null ? activeColor : null, },
                                                                                ]}
                                                                                onPress={() => {
                                                                                    LayoutAnimation.easeInEaseOut();
                                                                                    setToggleee(item, io.item.id, index, io.index);
                                                                                }}
                                                                                activeOpacity={1}>
                                                                                <View
                                                                                    style={[
                                                                                        styles.toggleBtn2,
                                                                                        io.item.check
                                                                                            ? { backgroundColor: activeColor, borderRadius: 25 }
                                                                                            : { backgroundColor: inActiveColor, borderRadius: 25, alignSelf: 'flex-end' },
                                                                                    ]}

                                                                                />
                                                                                <Text style={{ color: 'white', fontSize: 12, position: 'absolute', fontFamily: 'Poppins-Regular', bottom: Platform.OS === 'ios' ? moderateScale(1.7, 0) : moderateScale(-1, 0), left: Platform.OS === 'ios' ? moderateScale(8, 0) : moderateScale(8, 0) }}>Y</Text>
                                                                                <Text style={{ color: io.item.check ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(2, 0) : moderateScale(-0.5, 0), right: Platform.OS === 'ios' ? moderateScale(7.6, 0) : moderateScale(7.6, 0) }}>N</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                                />
                                                            </SafeAreaView>
                                                        </>) : item.tabs.shuffle && item.places ? (
                                                            <>
                                                                {PlaceName(item.places, item)}
                                                            </>
                                                        ) : item.tabs.all && item.places ?

                                                        (
                                                            <>
                                                                {PlaceRecommended(item.places, item)}
                                                            </>
                                                        ) : null
                                                    }
                                                </View>
                                            </ScrollView>
                                            <View style={styles.bottomTab}>
                                                <TouchableOpacity onPress={() => changeTab(item, 'yesno')} onPressIn={() => toggleInvert(item)}  >
                                                    <Image style={{ width: 60, height: 60 }} source={require('../assets/card1.png')}></Image>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { changeTab(item, 'shuffle'); }}>
                                                    <Image style={{ width: 60, height: 60 }} source={require('../assets/card2.png')}></Image>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { changeTab(item, 'all') }}>
                                                    <Image style={{ width: 60, height: 60 }} source={require('../assets/card3.png')}></Image>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View >
                                </View >
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

    const setPrePlaneDate = (item) => {
        console.log(item, 'itemm')
        prePlan.map((v, i) => {
            if (item.id == v.id) {
                v.check = !v.check;
                if (v.check) {
                    modedataa.map((vi, ii) => {
                        if (vi.id == Number(v.mode_id)) {
                            vi.check = true;
                            let pIds = v.ping_id.split(',');
                            PingData(vi.id, pIds)
                        } else {
                            vi.check = false;
                        }
                    })
                }
                setModeData([...modedataa])
            } else {
                v.check = false
            }
        })
        setPreplan([...prePlan]);
    }

    const rendenPlanPing = () => {
        return (
            <View>
                <ScrollView horizontal={true}>
                    {
                        prePlan ? (
                            <>
                                {prePlan.map((item, index) => {
                                    return (
                                        <View>
                                            <View style={styles.ping}>
                                                {
                                                    item.status == 'unpaid' ? (
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={() => [setModalOpen(true), setPrice2(item.price), setPingId(item.id)]}
                                                                style={styles.PingPlayed2}
                                                            >
                                                                <Text style={styles.PingText1}>
                                                                    {item.name}
                                                                </Text>
                                                                <View style={styles.pinLockPicback2}>
                                                                    <Image style={styles.pinLockPic} source={require('../assets/lock.png')}></Image>
                                                                </ View>
                                                            </TouchableOpacity>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TouchableOpacity onPress={() => setPrePlaneDate(item)}>
                                                                <View style={{ ...styles.PingUnlock, backgroundColor: item.check ? '#00B712' : '#FF2B25' }}>
                                                                    <View style={{ height: 65 }}>
                                                                        <Text style={styles.PingText11}>{item.name}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={styles.activeText} >{item.check ? 'Active' : 'Inactive'}</Text>
                                                                    </ View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                }
                                            </View>
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
                                                        <Text style={styles.modalText}>This pre-planned date is currently locked.  Would you like to unlock it for just ${Pricestate2} ${pingid}?</Text>

                                                        <View style={styles.modalButtons} >
                                                            <Pressable
                                                                style={styles.button}
                                                                onPress={() => setModalOpen(false) || [refRBSheet.current.open(), setPrice2(item.price)]}
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
                                    )
                                })}
                            </>
                        ) : null
                    }
                </ScrollView>
            </View>
        )
    }

    const xyz = (type, selected, Id, paid_or_free, item) => {
        Pings.paid_or_free == 'paid' ? setModalOpenn(true) : null
    }

    const setPingGreen = (item) => {
        pink2.map((v, i) => {
            if (item.id == v.id) {
                v.check = !v.check;
                setPink([...pink2])
            }
        })
    }


    // console.log(props,"here props")

    const rendenPing = () => {
        return (
            <ScrollView horizontal={true}>
                {
                    pink2 ? (
                        <>
                            {
                                pink2.map((item, index) => {
                                    return (
                                        <View style={styles.ping}>
                                            {
                                                item.paid_or_free == "paid" ?
                                                    (<>
                                                        <TouchableOpacity onPress={() => { (item.paid_or_free ? [setModalOpenn(true), setPrice(item.price)] : null) }}>
                                                            <View style={styles.PingLock}>
                                                                <View style={{ height: 60 }}>
                                                                    <Text style={styles.PingText11}>{item.name}</Text>
                                                                </View>
                                                                <View style={styles.pinLockPicback}>
                                                                    <Image style={styles.pinLockPic} source={require('../assets/lock.png')}></Image>
                                                                </ View>
                                                            </View>
                                                        </TouchableOpacity >
                                                    </>) : <>
                                                        <TouchableOpacity onPress={() => setPingGreen(item)}>
                                                            <View style={{ ...styles.PingUnlock, backgroundColor: item.check ? '#00B712' : '#FF2B25' }}>
                                                                <View style={{ height: 65 }}>
                                                                    <Text style={styles.PingText11}>{item.name}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={styles.activeText} >{item.check ? 'Active' : 'Inactive'}</Text>
                                                                </ View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                            }

                                        </View>
                                    )
                                })
                            }
                        </>
                    ) : null
                }
            </ScrollView>
        )
    }

    const getDates = async () => {
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.get(`other-people`,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {
            let other = [];
            let date = [];
            res.data.data.map((r, i) => {
                r['color1'] = r.color.split(',')[0]
                r['color2'] = r.color.split(',')[1]
                r['check'] = false;
                if (r.date_or_other == 'date') {
                    date.push(r)
                } else {
                    other.push(r)
                }
            })

            const middleIndex = Math.ceil(other.length / 2);
            const firstHalf = other.splice(0, middleIndex);
            const secondHalf = other.splice(-middleIndex);

            setdatepersons([...date])
            setotherpersons1([...firstHalf])
            setotherpersons2([...secondHalf])
        }).catch((err) => {
            console.log(err.response, 'error')
        })
    }

    const setModeMain = (item) => {
        console.log(item, "modId")
        modedataa.map((v, i) => {

            if (v.id == item.id) {
                v.check = true;
                PingData(v.id)
            } else {
                v.check = false;
            }
        })
        setModeData([...modedataa])
    }

    const saveDate = async () => {
        let data = {
            "ping_ids": null,
            "date_person_id": null,
            "mode_id": null,
            "ping_duration": count,
            "start_date": moment(dob).format('D-MM-yy'),
            "preplan_id": null,
            "first_other_id": null,
            "second_other_id": null,
            "start_time": moment(time, "h:mm A").format("HH:mm:ss"),
            "event": [],
            "user_id": myContext.myData.id
        }

        let pingsIds = '';
        pink2.map((v, i) => {
            if (v.check) {
                pingsIds += v.id + ','
            }
        })
        data.ping_ids = pingsIds.replace(/,\s*$/, "")

        datepersons.map((v, i) => {
            if (v.check) {
                data.date_person_id = v.id
            }
        });

        otherpersons1.map((v, i) => {
            if (v.check) {
                data.first_other_id = v.id
            }

        });

        otherpersons2.map((v, i) => {
            if (v.check) {
                data.second_other_id = v.id
            }
        });

        modedataa.map((v, i) => {
            if (v.check) {
                data.mode_id = v.id
            }
        });

        entries.map((v, i) => {
            if (v.type != 'add' && v.check) {
                let ids = '';
                let idx = '';
                let restEvents = {
                    "restaurant_name": null,
                    "restaurant_latlng": null,
                    "place_id": null,
                    "vicinity": null,
                    "event_id": null,
                    "event_child_ids": null
                }
                restEvents.event_id = v.id;
                v.children.map((vi, ii) => {
                    if (vi.check) {
                        ids += vi.id + ','
                    }
                })
                restEvents.event_child_ids = ids.replace(/,\s*$/, "");
                v.places.map((vi, ii) => {
                    if (vi.check) {
                        restEvents.place_id = vi.place_id
                        restEvents.vicinity = vi.vicinity
                        restEvents.restaurant_name = vi.name
                        restEvents.restaurant_name = vi.name
                        restEvents.restaurant_latlng = `${vi.geometry.location.lat},${vi.geometry.location.lng}`
                    }
                })
                data.event.push(restEvents);
            }
        })

        console.log(data)

        // errors
        if (data.mode_id == null) {
            alert("Please Select Mode")
            return
        }
        if (data.date_person_id == null) {
            alert("Please Select Date Person")
            return
        }

        if (data.start_date == "Invalid date") {
            alert("Please Select date")
            return
        }
        if (data.start_time == "Invalid date") {
            alert("Please Select Time")
            return
        }


        const value = await AsyncStorage.getItem('@auth_token');
        axiosconfig
            .post('date-book', data, {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            })
            .then((res: any) => {
                console.log(res);
                // alert("Date Event Added Successfully")
                props.navigation.navigate('donefornow')
            })
            .catch(err => {
                console.log(err);
            });
    }



    useEffect(() => {
        modedataa.map((v, i) => {
            if (v.check) {
                // PingData(v.id)
            }
        })
    }, [modedataa])

    const setDateChosen = (item, con) => {
        if (con == 'otherpersons1') {
            otherpersons1.map((v, i) => {
                if (v.id == item.id) {
                    v.check = true
                } else {
                    v.check = false
                }
            })
            setotherpersons1([...otherpersons1])
        } else if (con == 'otherpersons2') {
            otherpersons2.map((v, i) => {
                if (v.id == item.id) {
                    v.check = true
                } else {
                    v.check = false
                }
            })
            setotherpersons2([...otherpersons2])
        }
        else if (con == 'datepersons') {
            datepersons.map((v, i) => {
                if (v.id == item.id) {
                    v.check = true
                } else {
                    v.check = false
                }
            })
            setdatepersons([...datepersons])
        }
    }

    const OnRemove = async(id) => {

        Alert.alert("Hold on!", "Are you sure you want to delete that user?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => deletUser(id) }
        ]);
    }

    const deletUser = async(id) => {
        setLoader2(true)
        let data = {
            id:id,
            active_status:0,
            // user_id: myContext.myData.id,
        }

        const value = await AsyncStorage.getItem('@auth_token');
        axiosconfig
            .post('other-people-add', data, {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            })
            .then((res: any) => {
                console.log(res);
                setLoader2(false)
                alert("User delete Successfully")
                setrefresher(!refresher)
                // props.navigation.navigate('home');
            })
            .catch(err => {
                console.log(err);
                setLoader2(false)
            });
    }

    const CoupleCard = ({ navigation, otherpersons, con }) => {
        return (
            <View style={{ marginTop: 30 }}>
                <FlatList
                    horizontal={true}
                    data={otherpersons}
                    renderItem={({ item, i }) => {
                        return (
                            <View style={styles.dpcontainer2} >
                                <LinearGradient style={styles.dpwithBorder}
                                    colors={[item?.color1, item?.color2]}
                                    title="Welcome">
                                    <View style={styles.dpflex1}>
                                        <Image style={styles.dppicSize} source={{ uri: item.image }}></Image>
                                    </View>
                                    <View style={styles.dpflex2}>
                                        <View style={{ flexDirection: 'column', marginTop: 20, }}>
                                            <Text style={styles.dpcardTextHead}>{item.name} </Text>
                                            <Text style={styles.dpcardText}>Phone:  {item.phone}</Text>
                                            <Text style={styles.dpcardText}>Email:  {item.email}</Text>
                                            <Text style={styles.dpcardText}>Date of Birth: {item.dob}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dpflex3}>
                                        <TouchableOpacity onPress={() => setDateChosen(item, con)}
                                            style={{ marginTop: moderateScale(13, 0.1), height: moderateScale(35), width: moderateScale(35), borderRadius: moderateScale(20), backgroundColor: item.check ? '#00B712' : 'white', borderWidth: 5.2, borderColor: 'white' }} >
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("choosedate", { type: 'Add Date Info', con: con, data: item})}
                                        >

                                            <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='mode-edit' size={hp('4%')} color="white" />

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => OnRemove(item.id)}>
                                            <MaterialIcons style={{ marginLeft: 7, marginBottom: 25 }} name='delete-outline' size={hp('4%')} color="white" />
                                        </TouchableOpacity>
                                    </View>

                                </LinearGradient>
                            </View>
                        )
                    }}
                />
            </View>

        );
    }


    const [payurl, setUrl] = useState('')




    const getPaypal = async () => {

        var data = {

            user_id: myContext.myData.id,
            type_id: pingsid,
            type: 'ping',
            price: Pricestate,

        }
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.post(`get-paypal-url`,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            setUrl(res.data.url, "url here");
            console.log(payurl, "here url set");
            console.log(data)
            props.navigation.navigate('webview', {
                data: res.data.url,
            })

        }).catch((err) => {
            console.log('error hai ', err.response);
        })


    }
    const getPaypal2 = async () => {

        var data = {

            user_id: myContext.myData.id,
            type_id: pingsid,
            type: 'date',
            price: Pricestate2,

        }
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.post(`get-paypal-url`,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            setUrl(res.data.url, "url here");
            console.log(payurl, "here url set");
            console.log(data)
            props.navigation.navigate('webview', {
                data: res.data.url,
            })

        }).catch((err) => {
            console.log('error hai ', err.response);
        })


    }




    const getSkrill = async () => {

        var data = {

            user_id: myContext.myData.id,
            email: myContext.myData.email,
            type_id: pingsid,
            type: 'ping',
            price: Pricestate,

        }
        const value = await AsyncStorage.getItem('@auth_token');
        await axiosconfig.post(`get-skrill-url`,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + value //the token is a variable which holds the token
                }
            }
        ).then((res: any) => {

            setUrl(res.data.url, "url here");
            console.log(payurl, "here url skrill");
            console.log(data)
            props.navigation.navigate('webview', {
                data: res.data.url,
            })

        }).catch((err) => {
            console.log('error hai ', err.response);
        })


    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            {Loader22 ? (
                <>
                    <Loader2 />
                </>
            ) : null}
            <View style={styles.container}>
                {/* top header */}
                <View style={styles.TopHeader}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('faqscreen')}>
                        <Text style={{ fontSize: 20, fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular", color: "white", alignSelf: "flex-start", margin: 20, }}> FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => props.navigation.navigate('personalprofiledetails')}>
                        <Image style={styles.imgSetting}
                            source={require("../assets/setting.png")}
                        ></Image>
                    </TouchableOpacity>
                </View>

                {/* scroller */}

                <ScrollView>

                    {/* choose mode */}
                    <View >
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={{ alignItems: 'center', }}>
                                <View>

                                    <Text style={styles.ModeHeading}>Choose Your Mode</Text>
                                </View>
                                <ScrollView style={{ width: '94%' }}>
                                    {
                                        modedataa ? (
                                            <>
                                                {
                                                    modedataa.map((item, index) => {
                                                        return (
                                                            <Pressable
                                                                onPress={() => { LayoutAnimation.easeInEaseOut(); questionPick(item) }}
                                                                style={{ marginTop: 20, width: '100%', padding: 0, }}

                                                            >
                                                                {press === item.id ?

                                                                    <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }}  >

                                                                        <LinearGradient
                                                                            colors={['#0883FB', '#0883FB']}
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
                                                                                fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
                                                                                fontSize: 16,
                                                                                width: moderateScale(180)
                                                                            }}>{item.name}</Text>


                                                                            <TouchableOpacity>
                                                                                <View style={styles.RadioView2}>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </LinearGradient>
                                                                    </Pressable>

                                                                    :
                                                                    <LinearGradient
                                                                        colors={['#0883FB', '#0883FB']}
                                                                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0883FB', paddingHorizontal: 10, paddingVertical: 10, height: 76, borderRadius: 18, color: "White", }}>
                                                                        <MaterialIcons name='expand-more' size={hp('5%')} color="white" />
                                                                        <View >
                                                                            <Text style={{
                                                                                padding: 5, marginLeft: -20,
                                                                                fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
                                                                                color: "white",
                                                                                fontSize: 16,
                                                                                width: moderateScale(180),
                                                                            }}>{item.name}</Text>
                                                                        </View>
                                                                        <TouchableOpacity>
                                                                            <View style={styles.RadioView2}>
                                                                                <TouchableOpacity
                                                                                    onPress={() => setModeMain(item)}
                                                                                    style={{
                                                                                        marginTop: moderateScale(4, 0.1),
                                                                                        width: moderateScale(35),
                                                                                        height: moderateScale(35),
                                                                                        backgroundColor: '#00B712',
                                                                                        borderRadius: 120,
                                                                                        alignSelf: "center",
                                                                                        borderRadius: moderateScale(20),
                                                                                        backgroundColor: item.check ? '#00B712' : 'white',
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
                                                        )
                                                    })
                                                }
                                            </>
                                        ) : null
                                    }
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    </View>

                    {/* pre plane date */}
                    <View style={styles.PrePlainDate}>
                        <Text style={styles.PrePlanText}> Pre-Planned Dates</Text>
                        <ScrollView horizontal={true}>
                            {rendenPlanPing()}
                        </ScrollView>
                    </View>

                    {/* Another Couple */}
                    <View style={{ marginBottom: 20 }}>
                        {
                            datepersons && datepersons.length > 0 ? (
                                <>
                                    <View style={styles.AddPersonView}>
                                        <Text style={styles.chooseYourDateText}> Choose Your Date</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate("choosedate", { type: 'Add Date Info', con: 'date' })} style={{ marginRight: 45, top: 14, }}>
                                            <Text style={{ fontSize: 12, color: 'white', alignSelf: 'flex-end', fontFamily: 'Poppins-Regular', }}>Add New +</Text>
                                        </TouchableOpacity>
                                        <CoupleCard navigation={props.navigation} otherpersons={datepersons} con={'datepersons'}></CoupleCard>
                                    </View>
                                </>
                            ) :
                                <View style={styles.AddPersonView5}>
                                    <Text style={styles.chooseYourDateText}> Choose Your Date</Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate("choosedate", { type: 'Add Date Info', con: 'date' })} style={{ top: 14, }}>
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
                    </View>

                    <View style={styles.AddCouple}>
                        <Text style={styles.choosePersonText}>   Add Another Couple</Text>

                        <View>
                            {
                                otherpersons1 && otherpersons1.length > 0 ? (
                                    <>
                                        <TouchableOpacity onPress={() => props.navigation.navigate("choosedate", { type: `Add Person's Info`, con: 'other' })} style={{ marginRight: 45, top: 14, }}>
                                            <Text style={{ fontSize: 12, color: 'white', alignSelf: 'flex-end', fontFamily: 'Poppins-Regular', }}>Add New +</Text>
                                        </TouchableOpacity>
                                        <CoupleCard navigation={props.navigation} otherpersons={otherpersons1} con={'otherpersons1'}></CoupleCard>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => props.navigation.navigate("choosedate", { type: `Add Person's Info`, con: 'other' })}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={['#FF7474', '#E20303']}
                                                style={styles.linearGradient} >
                                                <Text style={styles.AddButtonText}>
                                                    Add Person 1
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </>
                                )
                            }
                        </View>
                        <View>
                            {
                                otherpersons2 && otherpersons2.length > 0 ? (
                                    <>
                                        <CoupleCard navigation={props.navigation} otherpersons={otherpersons2} con={'otherpersons2'}></CoupleCard>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => props.navigation.navigate("choosedate", { type: `Add Person's Info`, con: 'other' })}>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={['#FF7474', '#E20303']}
                                                style={styles.linearGradient} >
                                                <Text style={styles.AddButtonText}>
                                                    Add Person 2
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </>
                                )
                            }
                        </View>

                    </View>

                    {/* events */}
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
                                                    console.log(data, details);
                                                }}
                                                query={{
                                                    key: 'AIzaSyCpU6PeHUpZfoFjntHvJUQ0IGf2M2prSto',
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
                                            <Text style={{ color: !toggleActive ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(2, 0) : moderateScale(-0.5, 0), right: Platform.OS === 'ios' ? moderateScale(7.2, 0) : moderateScale(7.5, 0) }}>N</Text>
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

                    {/* pings */}
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

                    {/* schedule date */}
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

                                >  {time}</Text>

                                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(45), width: moderateScale(45), borderRadius: 55 }}>
                                    <Image
                                        source={require('../assets/time.png')}
                                        style={styles.imageStyle}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => saveDate()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient2} >
                                <Text style={styles.AddButtonText2}>
                                    Send Invitation
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* modals */}
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
                                    <TouchableOpacity
                                        style={styles.buttonH}
                                        onPress={() => refRBSheet2.current.open()}
                                    >
                                        <Text style={styles.textStyleNo1}>Yes</Text>
                                    </TouchableOpacity>

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

                    <RBSheet
                        ref={refRBSheet2}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={280}
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

                        <TouchableOpacity onPress={() => { getPaypal() }}>
                            {/* , props.navigation.navigate('webview') */}
                            <View style={styles.sectionStyle2}>
                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}
                                >PayPal
                                </Text>

                                <Image
                                    source={require('../assets/p1.png')}
                                    style={styles.imageStyle22}
                                />

                            </View>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => { getSkrill() }}>
                            <View style={styles.sectionStyle2}>
                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}
                                >Skrill</Text>

                                <Image
                                    source={require('../assets/p2.png')}
                                    style={styles.imageStyle22}
                                />

                            </View>
                        </TouchableOpacity>


                    </RBSheet>

                </ScrollView>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={280}
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

                    <TouchableOpacity onPress={() => { getPaypal2() }}>
                        {/* , props.navigation.navigate('webview') */}
                        <View style={styles.sectionStyle2}>
                            <Text
                                style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}
                            >PayPal 1
                            </Text>

                            <Image
                                source={require('../assets/p1.png')}
                                style={styles.imageStyle22}
                            />

                        </View>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { getSkrill() }}>
                        <View style={styles.sectionStyle2}>
                            <Text
                                style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}
                            >Skrill 1</Text>

                            <Image
                                source={require('../assets/p2.png')}
                                style={styles.imageStyle22}
                            />

                        </View>
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
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({


    bottomTab: {
        height: 70,
        margin: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 19,
    },
    toggleContainer2: {
        top: moderateScale(-20), marginLeft: 20,
        height: 22,
        width: 43,
        borderRadius: 20,
        borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: '#24202F',
        padding: 2,
        position: 'relative',

    },
    toggleBtn2: { height: '100%', width: '50%' },

    chooseContaine: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 20,
        height: moderateScale(70),
        width: moderateScale(windowWidth - 61, 0.1),
    },
    InnerContain: {
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: '#363143'
    },
    Contain: {

        backgroundColor: 'black'
    },
    placeView2: {

        borderRadius: 18,
        height: moderateScale(60),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        marginBottom: 10,
        alignSelf: 'center'

    },
    yellowView: {
        height: moderateScale(24),
        width: moderateScale(270),
        backgroundColor: '#FFD500',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        alignSelf: 'center', justifyContent: 'center'
    },
    placeViewc: {
        borderRadius: 18,
        // height: moderateScale(182),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        alignSelf: 'center',
        marginVertical: 20,
    },
    placeView: {
        margin: 15,
        borderRadius: 18,
        height: moderateScale(152),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        alignSelf: 'center',
    },
    Baap: {
        alignSelf: 'center'
    },

    MainBack: {
        backgroundColor: '#4D4D4D',
        padding: moderateScale(40),

    },
    BtnViews: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "red",
        position: "absolute",
        zIndex: 999,
        top: 500,
        width: '100%',
        height: 100,

    },
    container: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row'
    },
    title2: {
        fontSize: 16,
        color: "white",
        fontFamily: 'Poppins-Regular',
        left: 100,
        marginTop: moderateScale(0),
        transform: [{ translateY: 5 }]
    },
    item: {
        marginLeft: 70,
        padding: 0,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        height: 60,
        color: "white",
        top: 20,
    },
    container2: {
        flexDirection: 'column',
    },
    radiosView: {
        backgroundColor: "#363143",
        height: moderateScale(650),
        width: moderateScale(291),
        flexDirection: "column",
    },
    RadioInnerView: {
        width: 30,
        height: 30,
        backgroundColor: '#00B712',
        borderRadius: 120,
        alignSelf: "center",
        margin: 6,
    },

    RadioView: {
        marginHorizontal: moderateScale(120),
        flexDirection: "row",
        width: 42,
        height: 42,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 120,
        marginTop: 13,
    },
    ChooseMeal: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'white',
        textTransform: 'capitalize',
        marginTop: 22,

    },
    MainView: {
        backgroundColor: "#534C64",
        height: moderateScale(76),
        borderRadius: 20,
        zIndex: 99,
        alignSelf: 'center'
    },
    InnerView: {
        width: moderateScale(293),
        flexDirection: "row",

    },



    // tabs card style up 



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
        fontSize: 18,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
    textStyleNo: {
        color: 'white',
        margin: 20,
        fontFamily: 'Poppins-Regular',
        fontSize: 16
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
        fontFamily: Platform.OS === 'ios' ? Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular" : "Gazpacho Regular",
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
    imageStyle22: {

        height: 60,
        width: 120,
        alignSelf: 'center',
        resizeMode: 'contain'

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


        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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

        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },
    PingUnlock: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#FF2B25",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },
    PingLock: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#C5C5C5",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    PingPlayed2: {
        width: 90,
        height: moderateScale(85),
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#C5C5C5",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    PingPlayed: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#1AC72B",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    PingText1: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Regular',
        textAlign: "center",
        marginTop: 22,
        lineHeight: 25,
        marginHorizontal: 6

    },
    PingText: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        textAlign: "center",
        marginTop: 27,
        marginHorizontal: 4,
    },
    PingText11: {
        fontSize: 11.5,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Regular',
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
    pinLockPicback2: {
        height: 17,
        width: 17,
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 2,
        marginHorizontal: 65
    },
    pinLockUnclock2: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Regular',
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",


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

        width: (windowWidth - 70),
        alignSelf: 'center'
    },
    AddMeal: {
        color: "white",
        alignSelf: "flex-start",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 25,
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

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
        // height: 372,
        backgroundColor: '#4D4D4D',
        paddingBottom: 30

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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",


    },
    chooseYourDateText: {
        marginTop: 10,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    PrePlanText: {
        marginTop: 30,


        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

    },
    SelectYourPingText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },
    choosePersonText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        // paddingBottom:60
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
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
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
    },

    // datePerson
    dpcontainer2: {
        flex: 1,
        height: moderateScale(185),
        width: moderateScale(324),
        // marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),
    },

    dpwithOutBorder:
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

    dpwithBorder:
    {
        borderRadius: moderateScale(18),
        height: moderateScale(185),
        width: moderateScale(324),
        alignSelf: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,

    },

    dpinput: {
        height: 50,
        alignSelf: "center",
        backgroundColor: 'white',
        width: '80%',
        margin: 10,

    },

    dppicSize: {

        marginLeft: 3,

        height: 140,
        width: 100,
        borderRadius: 14,

    },
    dpflex3: {
        flex: .9,

        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dpflex2: {
        flex: 3,

    },
    dpflex1: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(18),
    },

    dpcontainer: {
        flex: 1,
        backgroundColor: '#F11775',
        height: moderateScale(185),
        width: moderateScale(324),
        marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),
    },

    dpcardTextHead: {
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        fontSize: 18,
        marginLeft: moderateScale(3),
        alignSelf: 'center'

    },
    dpcardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginLeft: 2,
        marginTop: 16,
    },
});