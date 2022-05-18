import React, { useRef, useState, useContext } from 'react';

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
    TouchableHighlight


} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from 'react-native-size-matters';

// import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

// import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

// import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import moment from 'moment';
import TabsCardComponent from '../components/TabsCard';
import ReactNavigationBottomTabs from './tabscardold';
import { scale } from "react-native-size-matters";
import CoupleCard from '../components/CoupleCard';
import { sortBy } from 'lodash';

import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { NotesContext } from "../context/NotesContext";
import { State } from 'react-native-gesture-handler';







if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const inActiveColor = 'white';
const activeColor = '#00B712';








const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;








// import RadioComponent from '../components/RadioButton';

// Dummy content to show
// You can also use dynamic data by calling web service
// const CONTENT = [
//     {
//         title: 'First Date Mode',
//         content:
//             'It may, or may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
//     },
//     {
//         title: 'Casual Date Mode',
//         content:
//             'It may, or may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
//     },
//     {
//         title: 'Exclusive Date Mode',
//         content:
//             'It may, or may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
//     },
//     {
//         title: 'Married Date Mode',
//         content:
//             'It may, or may not be an actual "first" date, but its certainly one of the first...a "get-to-know" Kind of date.You will need ice-breakers. ',
//     },
// ];



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



const Pings = [
    {
        id: "Item 1",
        key: "1",
        type: "unlock",
        text: "Selfie challenge",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: true,
    },
    {
        id: "Item 2",
        key: "2",
        type: "unlock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: true,
    },
    {
        id: "Item 3",
        key: "3",
        type: "unlock",
        text: "Truth and dare",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "Item 4",
        key: "4",
        type: "unlock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "Item 5",
        key: "5",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "Item 6",
        key: "6",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },
    {
        id: "Item 2",
        key: "7",
        type: "lock",
        text: " Compliment your date ",
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        selected: false,
    },

]



const HomeScreen = (props) => {


    const { state } = useContext(NotesContext)

    const [addEvent, setEvent] = useState(false);

    const [toggleActive, setToggle] = useState(false);
    //fahas faq


    const [press, setPress] = useState('');

    function questionPick(item) {
        setPress(item.id)
    }

    function questionClose(item) {
        setPress(item.id)
    }

    //modal


    const xyz = (type) => {
        type == 'lock' ? setModalOpenn(true) : null
    }






    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isTimeSelected, setIsTimeSelected] = useState(false)



    const [date, setDate] = useState(new Date(Date.now()));

    const [time, setTime] = useState(new Date(Date.now()));

    const [mode, setMode] = useState('date');
    const [isDatePickerVisible, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setIsDateSelected(true)
        setDate(currentDate);
        setShow(false)
    };


    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setIsTimeSelected(true)
        setTime(currentDate);
        setShow(false)
    };

    const showMode = (currentMode) => {
        console.log(currentMode,)
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const [count, setCount] = useState(0);


    // const While = () => {
    //     while(count==0)
    //     return (
    //     count-5
    //     );
    // }



    const animation = useRef(new Animated.Value(0)).current;
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

    const hideDatePicker = () => {
        setShow(false)
    };


    const onPress = () => setCount(count + 5);
    const onPree = () => setCount(count > 0 ? count - 5 : count - 0);

    // // Default active selector
    // const [activeSections, setActiveSections] = useState([]);
    // // Collapsed condition for the single collapsible
    // const [collapsed, setCollapsed] = useState(true);
    // // MultipleSelect is for the Multiple Expand allowed
    // // True: Expand multiple at a time
    // // False: One can be expand at a time
    // const [multipleSelect, setMultipleSelect] = useState(false);

    // const toggleExpanded = () => {
    //     // Toggling the state of single Collapsible
    //     setCollapsed(!collapsed);
    // };

    // const setSections = (sections) => {
    //     // Setting up a active section state
    //     setActiveSections(
    //         sections.includes(undefined) ? [] : sections
    //     );
    // };

    // const renderHeader = (section, _, isActive) => {
    //     // Accordion header view
    //     return (

    //         <View style={{ height: 100, }} >
    //             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    //                 colors={['#399ADA', '#0883FB']}
    //                 style={styles.header} >
    //                 <Animatable.View

    //                     duration={400}

    //                     transition="backgroundColor">

    //                     <Text style={styles.headerText}>
    //                         {section.title}
    //                     </Text>


    //                 </Animatable.View>
    //             </LinearGradient >

    //         </View>


    //     );
    // };


    const [modalOpen, setModalOpen] = useState(false);





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
                                style={styles.PingPlayed}
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


    const rendenPing = () => {



        const [myArray, setMyArray] = useState([]);

        function onlclick() {




            let myLocalArray = []
            myLocalArray = Pings.splice(0, 1)
            setMyArray(myLocalArray)
            { Pings[0].type == 'lock' ? setModalOpenn(true) : null }
        }



        return (
            Pings.map((v, i) => {
                return (
                    <View style={styles.ping}
                        key={i}
                    >
                        <TouchableOpacity


                            onPress={() => xyz(v.type)}

                            style={v.type == "unlock" && v.selected == true ? styles.PingPlayed : styles.PingUnlock && v.type == 'lock' ? styles.PingLock : styles.PingUnlock}
                            type={Pings}

                        >


                            <Text style={styles.PingText}>
                                {v.text}

                            </Text>
                            {/* <Text style={styles.pinLockUnclock}></Text> */}
                            {
                                v.type == 'lock' ? (
                                    <>
                                        <View style={styles.pinLockPicback}>
                                            {/* {v.type} */}
                                            <Image style={styles.pinLockPic} source={require('../assets/lock.png')}></Image>
                                        </ View>
                                    </>
                                ) : null
                            }

                        </TouchableOpacity>



                    </View>
                )
            })
        )

    }

    // <View style={styles.ping}>
    //     <TouchableOpacity >
    //         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
    //             colors={['#FF2B25', '#FF2B25']}
    //             style={styles.btn1}
    //             type={Pings}>
    //             <Text style={styles.btn1Text}>

    //             </Text>
    //         </LinearGradient>
    //     </TouchableOpacity>



    // </View>



    // const renderContent = (section, _, isActive) => {
    //     // Accordion Content view
    //     return (

    //         <Animatable.View
    //             duration={400}
    //             style={[
    //                 styles.contentHead,
    //                 isActive ? styles.inactive : styles.inactive
    //             ]}
    //             transition="backgroundColor">



    //             <Animatable.Text
    //                 animation={isActive ? '' : undefined}
    //                 style={{ textAlign: 'center', margin: 8, }}>
    //                 {section.content}
    //             </Animatable.Text>

    //         </Animatable.View>
    //     );
    // };


    // const [menuToggled, setmenuToggled] = (useState())

    //  animation = new Animated.Value(0);
    //  animation = new Animated.Value(menuToggled ? 0 : 1);
    const [modalOpenn, setModalOpenn] = useState(false);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
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
                                <Text style={styles.modalText2}>This Ping is currently locked would you like to permanently unlocked it for just $0.99 ?</Text>

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
                    <View style={styles.TopHeader}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('faqscreen')}>
                            <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", color: "white", alignSelf: "flex-start", margin: 20, }}> FAQ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('personalprofiledetails')}>

                            <Image style={styles.imgSetting}
                                source={require("../assets/setting.png")}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    {/* 
                    <Accordion


                        activeSections={activeSections}
                        // For any default active section
                        sections={CONTENT}
                        // Title and content of accordion
                        touchableComponent={TouchableOpacity}
                        // Which type of touchable component you want
                        // It can be the following Touchables
                        // TouchableHighlight, TouchableNativeFeedback
                        // TouchableOpacity , TouchableWithoutFeedback
                        expandMultiple={multipleSelect}
                        // If you want to expand multiple at a time
                        renderHeader={renderHeader}
                        // Header Component(View) to render
                        renderContent={renderContent}
                        // Content Component(View) to render
                        duration={300}
                        // Duration for Collapse and expand
                        onChange={setSections}
                    // Setting the state of active sections
                    /> */}



                    <View >

                        {/* <NavHeader title="FAQ" /> */}

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

                                    data={data}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ width: (windowWidth - 50), }}
                                    renderItem={({ item, index }) => (
                                        <Pressable
                                            onPress={() => { LayoutAnimation.easeInEaseOut(); questionPick(item) }}
                                            style={{ marginTop: 20, width: '100%', padding: 0 }}
                                        >
                                            {press === item.id ?

                                                <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }}  >
                                                    <LinearGradient
                                                        colors={[item.color[0], item.color[1]]}
                                                        style={{
                                                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0883FB', paddingHorizontal: 10, paddingVertical: 10, height: 76,
                                                            borderColor: 'white', borderWidth: 1.5,
                                                            borderTopLeftRadius: 18, borderTopRightRadius: 18, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, color: "White",
                                                        }}>

                                                        <MaterialIcons name='expand-less' size={hp('5%')} color="white" />
                                                        <Text style={{ padding: 5, color: 'white', marginLeft: -20, fontFamily: "Poppins-Regular", fontSize: 16, width: moderateScale(180) }}>{item.title}</Text>

                                                        {/* <AntDesign name="caretdown" size={16} color="black"/> */}

                                                        <View style={styles.RadioView2}>
                                                            <View style={onPress == item ? styles.RadioInnerViewNormal : styles.RadioInnerView} >
                                                            </View>
                                                        </View>
                                                    </LinearGradient>
                                                </Pressable>
                                                :
                                                <LinearGradient
                                                    colors={[item.color[0], item.color[1]]}
                                                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0883FB', paddingHorizontal: 10, paddingVertical: 10, height: 76, borderRadius: 18, color: "White", }}>
                                                    <MaterialIcons name='expand-more' size={hp('5%')} color="white" />
                                                    <View >
                                                        <Text style={{ padding: 5, marginLeft: -20, fontFamily: "Poppins-Regular", color: "white", fontSize: 16, width: moderateScale(180), }}>{item.title}</Text>
                                                    </View>

                                                    <View style={styles.RadioView2}>
                                                        <View style={onPress == item ? styles.RadioInnerView : styles.RadioInnerViewNormal} >
                                                        </View>
                                                    </View>

                                                </LinearGradient>
                                            }

                                            {press === item.id ?

                                                <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} style={{ zIndex: -999 }} >

                                                    <View style={{ backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, }}>
                                                        <Text style={{ margin: 15, padding: 15, marginHorizontal: 0, marginTop: -10, backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, fontSize: 14, fontFamily: "Poppins-Regular", }}>{item.description} </Text>
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
                        <Text style={styles.PrePlanText}> Pre-plan Dates</Text>



                        <ScrollView horizontal={true}>
                            {rendenPlanPing()}
                        </ScrollView>





                    </View>

                    {
                        state && state.length > 0 ? (
                            <>
                                <View style={styles.AddPersonView}>
                                    <Text style={styles.chooseYourDateText}> Choose Your Date</Text>
                                    {/* <TouchableOpacity onPress={() => props.navigation.navigate("addpartnersdetails")}> */}
                                    {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#FF7474', '#E20303']}
                                    style={styles.linearGradient} >
                                    <Text style={styles.AddButtonText}>
                                        Add New Person
                                    </Text>
                                </LinearGradient> */}
                                    <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                                        <Text style={{ bottom: -7, fontSize: 12, color: 'white', alignSelf: 'flex-end', marginRight: 45, fontFamily: 'Poppins-Regular' }}>Add New +</Text>
                                    </TouchableOpacity>
                                    <CoupleCard></CoupleCard>
                                    {/* </TouchableOpacity> */}
                                </View>
                            </>
                        ) : null
                    }







                    <View style={styles.AddCouple}>

                        <Text style={styles.choosePersonText}>   Add Another Couple</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient} >
                                <Text style={styles.AddButtonText}>
                                    Add New person
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("addcouple")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient} >
                                <Text style={styles.AddButtonText}>
                                    Add New person
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} >


                        <View style={styles.addEvent}>
                            {addEvent ?
                                (
                                    <>
                                        <View style={styles.mealView} >


                                            <ReactNavigationBottomTabs nestedScrollEnabled={true}></ReactNavigationBottomTabs>


                                        </View>
                                    </>
                                ) : null
                            }

                            <View style={styles.mealView} >



                                <Text style={styles.choosePersonText}>  Add An Event</Text>



                                <View>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
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

                                            <Text style={{ color: 'white', fontSize: 15, position: 'absolute', bottom: 2, left: 4 }}> Y</Text>
                                            <Text style={{ color: !toggleActive ? 'white' : 'black', fontSize: 15, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: -2, right: 6 }}>N</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 20, marginTop: 20 }}>


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
                                                            paddingHorizontal: 20,
                                                            marginHorizontal: 0,
                                                            borderRadius: 18,

                                                            height: 42,
                                                            color: '#5d5d5d',
                                                            fontSize: 16,
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
                                                            marginHorizontal: 30,
                                                        },



                                                    }}


                                                />



                                                :
                                                <Text style={styles.zipCode}>  Current Location </Text>

                                        }

                                    </View>
                                    {/* <GooglePlacesAutocomplete

                                        placeholder='Search'
                                        onPress={(data, details = null) => {
                                            // 'details' is provided when fetchDetails = true
                                            console.log(data, details);
                                        }}
                                        query={{
                                            key: 'AIzaSyCab5ahH6KkodUavDwBCigXTL7ZbrkzS94',
                                            language: 'en',
                                        }}
                                    /> */}

                                </View>

                                <TouchableOpacity onPress={() => setEvent(true)}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#80D3FC', '#80D3FC']}
                                        style={styles.addEventButton} >
                                        <Text style={styles.AddMeal}>
                                            Add a meal
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setEvent(true)}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#44BEFB', '#44BEFB']}
                                        style={styles.addEventButton} >
                                        <Text style={styles.AddMeal}>
                                            Add An activity
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setEvent(true)}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#0883FB', '#0883FB']}
                                        style={styles.addEventButton} >
                                        <Text style={styles.AddMeal}>
                                            Add Desert
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setEvent(true)}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={['#0149FF', '#0149FF']}
                                        style={styles.addEventButton} >
                                        <Text style={styles.AddMeal}>
                                            Add Drink
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>

                    <View style={{ height: moderateScale(430), backgroundColor: '#4D4D4D' }}>
                        <Text style={styles.SelectYourPingText}>   Select Your Ping Frequency</Text>
                        <View style={styles.ping}>
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
                            <Text style={styles.count}>{count}</Text>

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

                        {/* <Pressable onPress={showDatepicker} >
                            
                        </Pressable> */}
                        <TouchableOpacity onPress={() => showDatepicker()}>
                            <View style={styles.sectionStyle2}>

                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: "Poppins-Regular", marginHorizontal: 20, }}

                                >
                                    {isDateSelected ? `${date.getDate() + ' | ' + date.getMonth() + ' | ' + date.getFullYear()}` : "Select Date"}
                                </Text>
                                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(45), width: moderateScale(45), borderRadius: 55 }}>
                                    <Image
                                        source={require('../assets/calendar.png')} //Change your icon image here
                                        style={styles.imageStyle}
                                    />
                                </View>



                            </View>
                        </TouchableOpacity>

                        <Pressable onPress={showTimepicker} >
                            <View style={styles.sectionStyle2}>

                                <Text
                                    style={{ color: 'white', fontSize: 16, fontFamily: "Poppins-Regular", marginHorizontal: 10, }}

                                    onPress={showTimepicker}


                                >  {isTimeSelected ? `${time.getHours() + ' : ' + time.getMinutes()} ${time.getHours() > 11 ? 'PM' : 'AM'}  ` : "Select Time"} </Text>


                                <View style={{ marginHorizontal: 20, backgroundColor: 'white', height: moderateScale(45), width: moderateScale(45), borderRadius: 55 }}>
                                    <Image
                                        source={require('../assets/time.png')} //Change your icon image here
                                        style={styles.imageStyle}
                                    />
                                </View>


                            </View>
                        </Pressable>



                        <TouchableOpacity onPress={() => props.navigation.navigate('donefornow')}>
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
                {/* <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    isVisible={show}
                    is24Hour={true}
                    display="default"
                    onChange={mode == 'date' ? onChange : onChangeTime}
                /> */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={mode}
                    onConfirm={mode == 'date' ? onChange : onChangeTime}
                    onCancel={hideDatePicker}
                    display="default"
                    is24Hour={true}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
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

        // backgroundColor: "red",
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
        marginTop: 20,
        height: 23,
        width: 45,
        borderRadius: 19,

        overflow: 'hidden',
        backgroundColor: '#363143',
        padding: 1,
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




    },
    ModeHeading: {
        color: 'white',
        fontSize: 20,
        marginTop: 30,

        marginBottom: 5,
        fontFamily: "Poppins-Regular",
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


        fontFamily: "Poppins-Regular",
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

        fontFamily: "Poppins-Regular",
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
        fontFamily: "Poppins-Regular",


    },


    PingUnlock: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#FF2B25",
        fontFamily: "Poppins-Regular",


    },
    PingLock: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#C5C5C5",
        fontFamily: "Poppins-Regular",

    },
    PingPlayed: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 15,
        backgroundColor: "#1AC72B",
        fontFamily: "Poppins-Regular",

    },
    PingText1: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        marginTop: 27,
        marginHorizontal: 6

    },
    PingText: {
        fontSize: 12,
        color: "white",
        alignSelf: "center",
        fontFamily: 'Poppins-Bold',
        textAlign: "center",
        marginTop: 27,
        marginHorizontal: 4,


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
        alignSelf: "center",
        fontFamily: "Poppins-Regular",
        textAlign: "center",



    },


    mins: {
        fontSize: 14,
        alignSelf: "center",
        color: "#B8B8B8",
        bottom: 50,
        fontFamily: "Poppins-Regular",

    },
    count: {
        fontSize: 30,
        color: "white",
        alignSelf: "center",
        marginHorizontal: 55,
        fontFamily: "Poppins-Regular",
    },
    ping: {
        flexDirection: "row",
        marginTop: 20,
        alignSelf: "center",
        top: -20,


    },
    btn1Text: {
        fontSize: 41,
        alignSelf: "center",
        color: "white",
        fontFamily: "Poppins-Regular",

    },
    btn1: {
        width: 58,
        height: 58,
        margin: 25,
        borderRadius: 18,
        fontFamily: "Poppins-Regular",

    },
    btn2Text: {
        fontSize: 41,
        alignSelf: "center",
        color: "white",
        fontFamily: "Poppins-Regular",

    },
    btn2: {
        width: 58,
        height: 58,
        margin: 25,
        borderRadius: 18,

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
        fontFamily: "Poppins-Regular",

    },
    zipCode: {
        fontSize: 18,
        alignSelf: "center",

        color: "#9f9f9f",
        fontFamily: "Poppins-Regular",

    },
    addEvent: {
        height: scale(600),
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
        fontFamily: "Poppins-Regular",

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
        height: 392,
        backgroundColor: '#4D4D4D',

    },
    AddButtonText2: {

        fontSize: 16,
        fontFamily: "Poppins-Regular",
        marginTop: 24,
        alignSelf: "center",
        color: '#FFFF',


    },
    AddButtonText: {
        height: 76,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
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
    chooseDateText: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Poppins-Regular",


    },
    chooseYourDateText: {
        marginTop: 10,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Poppins-Regular",

    },
    PrePlanText: {
        marginTop: 30,
        marginBottom: 20,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Poppins-Regular",

    },
    SelectYourPingText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Poppins-Regular",
    },
    choosePersonText: {
        marginTop: 40,

        fontSize: 20,
        color: "#FFFF",
        alignSelf: "center",
        fontFamily: "Poppins-Regular",


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
        fontFamily: "Poppins-Regular",
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
        fontFamily: "Poppins-Regular",
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
        fontFamily: "Poppins-Regular",
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
        fontFamily: "Poppins-Regular",
    },
});