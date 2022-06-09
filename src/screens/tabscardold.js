import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { delay, entries, filter } from 'lodash';
import React, { useEffect, useState, Component } from "react";
import {
    View, Image, Text, StyleSheet, TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    FlatList,
    SafeAreaView,
    StatusBar,
    Switch,
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,

} from "react-native";
import { Badge } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { scale } from 'react-native-size-matters';
import { moderateScale } from 'react-native-size-matters';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const inActiveColor = 'white';
const activeColor = '#00B712';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const PlaceData = [
    {
        Id: 1,
        title: 'Place A',

    },
]

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

const ReactNavigationBottomTabs = ({ item }) => {

    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);
    const [mainData, setMainData] = useState(DATA);
    const [isEnabled, setIsEnabled] = useState(false);
    const [checkes, setCheckes] = React.useState(false);
    const [checkei, setCheckei] = React.useState(false);

    const [Place, setPlace] = useState(false)
    const [Recommended, setRecommended] = useState(false)
    const [Filters, setFilters] = useState(false)

    const [tabState, setTabstate] = useState('yes')


    const setToggle = (item, id) => {
        mainData.map((v, i) => {
            if (v.Id == id) {
                console.log(mainData[i].check)
                mainData[i].check = !mainData[i].check;
                setMainData([...mainData])
            }
        })
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

    const Item = ({ title, drink, isEnabled, setIsEnabled, Id, index }) => {


        return (
            <View >
                <View style={{marginTop:moderateScale(0)}}>
                <TouchableOpacity  >

                    <Text style={styles.title}>{title}</Text>

                </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[
                        styles.toggleContainer,
                        { borderColor: null ? activeColor : null, },
                    ]}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setToggle(isEnabled, Id);
                    }}
                    activeOpacity={1}>
                    <View
                        style={[
                            styles.toggleBtn,
                            isEnabled
                                ? { backgroundColor: inActiveColor, borderRadius: 25, alignSelf: 'flex-end' }
                                : { backgroundColor: activeColor, borderRadius: 25, },
                        ]}

                    />
                    <Text style={{ color: 'white', fontSize: 12, position: 'absolute', fontFamily: 'Poppins-Regular', bottom: moderateScale(0, 0), left: Platform.OS === 'ios' ? moderateScale(4.8, 0) : moderateScale(4.8, 0) }}> Y</Text>
                    <Text style={{ color: !isEnabled ? 'white' : 'black', fontSize: 12, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: Platform.OS === 'ios' ? moderateScale(1, 0) : moderateScale(1, 0), right: Platform.OS === 'ios' ? moderateScale(8.2, 0) : moderateScale(8.2, 0) }}>N</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const renderItem = ({ item, i }) => (
        <Item title={item.title} isEnabled={item.check} setIsEnabled={setIsEnabled} Id={item.Id} index={i} />
    );

    const renderPlace = () => {
        return (
            PlaceData.map((v, i) => {
                return (
                    <View
                        key={i}
                    >

                        <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular',}}>
                            {v.title}
                        </Text>

                    </View>
                )
            })
        )

    }

    return (
        <View style={styles.Contain}>
            <View style={styles.InnerContain}>
                <View>

                    <View style={styles.chooseContaine}>
                        <TouchableOpacity  >
                            <MaterialIcons style={{ marginLeft: 10, marginTop: 15 }} name='delete-outline' size={hp('5.5%')} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.ChooseMeal}>
                            {item.type + ' Filter'}
                        </Text>
                        <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
                            style={{ marginRight: 15, marginTop: moderateScale(15), height: moderateScale(40), width: moderateScale(40), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >
                        </TouchableOpacity>

                    </View>
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={{ marginTop: 20, }}>

                            {tabState == 'yes' ? (
                                <>
                                    <SafeAreaView style={{ flex: 1 }}>
                                        <FlatList
                                            nestedScrollEnabled={true}
                                            data={mainData}
                                            renderItem={(item, i) => renderItem(item, i)}
                                            keyExtractor={items => items.Id}
                                        />
                                    </SafeAreaView>
                                </>) : tabState == 'place' ? (
                                    <>
                                        < ScrollView >

                                            <View style={styles.placeView2}>
                                                <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>




                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5 }}>

                                                        <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                                                            style={{ top: 30, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checked ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                                        </TouchableOpacity>

                                                        <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                            <View style={{ top: 4 }}>{renderPlace()}</View>
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
                                    </>
                                ) : tabState == 'recomended' ?

                                (
                                    <>
                                        <ScrollView nestedScrollEnabled={true} >
                                            <View >
                                                <TouchableOpacity onPress={() => checkes ? setCheckes(false) : setCheckes(true)}>
                                                    <View style={styles.placeViewc}>
                                                        <View style={styles.yellowView}>
                                                            <Text style={{ color: '#000000', fontSize: 9, fontFamily: 'Poppins-Regular', alignSelf: 'flex-start', margin: 5, marginLeft: 10, }}>Recommended</Text>
                                                        </View>
                                                        <Text style={{ fontSize: 10, color: '#BBBBBB', fontFamily: 'Poppins-Regular', top: 20, left: 45 }}>Don`t eat anywhere else</Text>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                            <TouchableOpacity onPress={() => checkes ? setCheckes(false) : setCheckes(true)}
                                                                style={{ top: 25, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checkes ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                                            </TouchableOpacity>

                                                            <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                                <View>{renderPlace()}</View>
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
                                                <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>
                                                    <View style={styles.placeView2}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5 }}>
                                                            <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                                                                style={{ top: 30, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checked ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >
                                                            </TouchableOpacity>
                                                            <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                                <View style={{ top: 4 }}>{renderPlace()}</View>
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
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ marginTop: 5, }} onPress={() => checkei ? setCheckei(false) : setCheckei(true)}>
                                                    <View style={styles.placeView2}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5, }}>

                                                            <TouchableOpacity onPress={() => checkei ? setCheckei(false) : setCheckei(true)}
                                                                style={{ top: 30, left: 20, height: 25, width: 25, borderRadius: 20, backgroundColor: checkei ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                                            </TouchableOpacity>

                                                            <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-between', marginTop: 25, marginRight: 20 }} >
                                                                <View style={{ top: 4 }}>{renderPlace()}</View>
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

                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </>
                                ) : null
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.bottomTab}>
                        <TouchableOpacity onPress={() => setTabstate('yes')} onPressIn={() => toggleInvert()}  >
                            <Image style={{ width: 60, height: 60 }} source={require('../assets/card1.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTabstate('place')}>
                            <Image style={{ width: 60, height: 60 }} source={require('../assets/card2.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTabstate('recomended')}>
                            <Image style={{ width: 60, height: 60 }} source={require('../assets/card3.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </View >

    );
}


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
    toggleContainer: {
        top: moderateScale(-23), marginLeft: 20,
        
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

    chooseContaine: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 20,
        height: moderateScale(70),
        width: moderateScale(windowWidth - 61, 0.1),
        backgroundColor: '#534C64',


    },
    InnerContain: {
        borderRadius: 20,
        // width: moderateScale(windowWidth - 61, 0.1),
        // top: 80,
        alignSelf: 'center',
        // height: moderateScale(700),
        backgroundColor: '#363143'


    },
    Contain: {
        // width: moderateScale(windowWidth, 0.1),
        // height: moderateScale(700),
        backgroundColor: 'black'


    },
    placeView2: {

        borderRadius: 18,
        height: moderateScale(70),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        // marginHorizontal: moderateScale(23),
        marginBottom: 10,
        // alignSelf: 'center',
        alignSelf: 'center'

    },
    yellowView: {
        height: moderateScale(24),
        width: moderateScale(270),
        backgroundColor: '#FFD500',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,

    },
    placeViewc: {

        borderRadius: 18,
        height: moderateScale(152),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        alignSelf: 'center',
        marginBottom: 10,


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

    title: {
        fontSize: 16,
        color: "white",
        fontFamily: 'Poppins-Regular',
        left: 100,
        marginTop:moderateScale(1)
  
    },
    item: {
        marginLeft: 70,
        padding: 0,
        fontSize: 16,
        fontFamily: "Gazpacho Regular",
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

});

export default ReactNavigationBottomTabs