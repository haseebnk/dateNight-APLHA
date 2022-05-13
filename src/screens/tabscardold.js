import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState, Component } from "react";
import {
    View, Image, Text, StyleSheet, TouchableOpacity,
    TouchableHighlight, ScrollView, FlatList, SafeAreaView, StatusBar, Switch, ImageBackground,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager,


} from "react-native";
import { Badge } from 'react-native-paper';

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






var radio_props = [
    { label: 'Place A', value: 0 },

];


var radio_props2 = [
    { label: 'Place A', value: 0 },
    // { label: 'Place b', value: 1 },
    // { label: 'Place c', value: 2 },
    // { label: 'Place d', value: 3 },
    // { label: 'Place e', value: 4 },
    // { label: 'Place f', value: 5 },
    // { label: 'Place g', value: 6 },


];



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
        title: 'Barbeque',
        check: false
    },
    {
        Id: 2,
        title: 'Breakfast food',
        check: false
    },
    {
        Id: 3,
        title: 'Buffets',
        check: false
    },
    {
        Id: 4,
        title: 'Burgers & Fries',
        check: false
    },
    {
        Id: 5,
        title: 'Chinese Food',
        check: false
    },
    {

        Id: 6,
        title: 'Fast Food',
        check: false
    },
    {
        Id: 7,
        title: 'Fine Dining',
        check: false
    },
    {
        Id: 8,
        title: 'Fondue',
        check: false
    },
    {
        Id: 9,
        title: 'Greek food',
        check: false
    },
    {
        Id: 10,
        title: 'Hot Dogs ',
        check: false
    },
    {
        Id: 11,
        title: 'Itlian Foods',
        check: false
    },
    {
        Id: 12,
        title: 'Chinese Food',
        check: false

    }
]





// const radioData = [
//     { value: 'Apple' },
//     { value: 'Samsung' },
//     { value: 'Blackberry' },
// ];

// const Switches = () => {
//     const [isEnabled, setIsEnabled] = useState(false);
//     const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//     return (
//         DATA.map((v,i) => {
//             return (
//                 <Switch
//                    style={{top:-60}}
//                     trackColor={{ false: "#24202F", true: "#24202F" }}
//                     thumbColor={isEnabled ? "white" : "#00B712"}
//                     ios_backgroundColor="#3e3e3e"
//                     onValueChange={toggleSwitch}
//                     value={isEnabled}


//                 />

//             )
//         })
//     )

// }


const renderPlace = () => {
    return (
        PlaceData.map((v, i) => {
            return (
                <View
                    key={i}
                >

                    <Text style={{ marginLeft: -50, top: 2, color: '#FFD500', fontSize: 16, fontFamily: 'Poppins-Regular' }}>
                        {v.title}
                    </Text>



                </View>
            )
        })
    )

}





function TabA() {



    // const [toggleActive, setToggle] = useState(false);



    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);


    const [mainData, setMainData] = useState(DATA);



    const setToggle = (item, id) => {
        mainData.map((v, i) => {
            if (v.Id == id) {
                console.log(mainData[i].check)
                mainData[i].check = !mainData[i].check;
                setMainData([...mainData])
            }
        })
    }





    const Item = ({ title, isEnabled, setIsEnabled, Id, index }) => {

        //    const toggleSwitch = () => {
        //         console.log('check')
        //         setMainData(
        //             mainData.map(item =>
        //                 item.Id === Id
        //                     ? { ...item, check: isEnabled ? false : true }
        //                     : item
        //             ))
        //     }





        // const toggleSwitch = () => console.log('hello')


        return (


            <View >

                <TouchableOpacity  >
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>



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

                    <Text style={{ color: 'white', fontSize: 15, position: 'absolute', bottom: 2, left: 4 }}> Y</Text>
                    <Text style={{ color: !isEnabled ? 'white' : 'black', fontSize: 15, fontFamily: 'Poppins-Regular', position: 'absolute', bottom: -1, right: 7 }}>N</Text>
                </TouchableOpacity>


                {/* <Switch
                    style={{ top: moderateScale(-27) , left: moderateScale(-290) }}
                    trackColor={{ false: "#24202F", true: "#24202F" }}
                    thumbColor={isEnabled ? "white" : "#00B712"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}

                /> */}
            </View>


        )
    }



    const [isEnabled, setIsEnabled] = useState(false);


    const renderItem = ({ item, i }) => (
        <Item title={item.title} isEnabled={item.check} setIsEnabled={setIsEnabled} Id={item.Id} index={i} />

    );


    return (
        <View style={styles.Contain}>
            <View style={styles.InnerContain}>
                <View style={styles.chooseContaine}>
                    <Text style={styles.ChooseMeal}>
                        Choose Meal

                    </Text>

                    <TouchableOpacity>


                        <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
                            style={{ marginRight: 10, top: moderateScale(15), height: moderateScale(40), width: moderateScale(40), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >

                        </TouchableOpacity>

                    </TouchableOpacity>

                </View>

                <ScrollView nestedScrollEnabled={true}>

                    <View style={{ height: 1000, width: windowWidth, marginTop: 30, }}>


                    <SafeAreaView style={{flex: 1}}>
                        <FlatList
                            nestedScrollEnabled={true}
                            data={mainData}
                            renderItem={(item, i) => renderItem(item, i)}
                            keyExtractor={items => items.Id}
                        />
                        </SafeAreaView>
                    </View>

                </ScrollView>

            </View>
        </View>

    )
}
function TabB() {

    // const radioData = [
    //     { value: 'Place A' }, ];


    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);



    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);






    // const Item = ({ title }) => (





    // <View style={styles.item}>


    //     <Text style={styles.title}>{title}</Text>

    //     <Switch
    //         style={{ top: -27, right: 340 }}
    //         trackColor={{ false: "#24202F", true: "#24202F" }}
    //         thumbColor={isEnabled ? "white" : "#00B712"}
    //         ios_backgroundColor="#3e3e3e"
    //         onValueChange={toggleSwitch}
    //         value={isEnabled}

    //     />
    // </View>
    // );



    // const renderItem = ({ item }) => (
    //     <Item title={item.title} />
    // );


    return (
        <View style={styles.Contain}>
            <View style={styles.InnerContain}>
                <View style={styles.chooseContaine}>
                    <Text style={styles.ChooseMeal}>
                        Choose Place

                    </Text>

                    <TouchableOpacity>


                        <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
                            style={{ marginRight: 10, top: moderateScale(15), height: moderateScale(40), width: moderateScale(40), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >

                        </TouchableOpacity>

                    </TouchableOpacity>

                </View>
                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        {/* 
                        <FlatList

                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={items => items.id}


                        /> */}
                    </SafeAreaView>

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
                </ScrollView>

            </View>
        </View>

    )
}
function TabC() {











    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);
    const [checkei, setCheckei] = React.useState(false);
    const [checkes, setCheckes] = React.useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);






    // const Item = ({ title }) => (






    //     <View style={styles.item}>


    //         <Text style={styles.title}>{title}</Text>

    //         <Switch
    //             style={{ top: -27, right: 340 }}
    //             trackColor={{ false: "#24202F", true: "#24202F" }}
    //             thumbColor={isEnabled ? "white" : "#00B712"}
    //             ios_backgroundColor="#3e3e3e"
    //             onValueChange={toggleSwitch}
    //             value={isEnabled}

    //         />
    // //     </View>
    // );



    // const renderItem = ({ item }) => (
    //     <Item title={item.title} />
    // );


    return (
        <View style={styles.Contain}>
            <View style={styles.InnerContain}>
                <View style={styles.chooseContaine}>
                    <Text style={styles.ChooseMeal}>
                        Choose Place

                    </Text>

                    <TouchableOpacity>

                        <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
                            style={{ marginRight: 10, top: moderateScale(15), height: moderateScale(40), width: moderateScale(40), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >

                        </TouchableOpacity>
                    </TouchableOpacity>

                </View>


                <SafeAreaView style={styles.container}>
                    {/* 
                        <FlatList

                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={items => items.id}


                        /> */}
                </SafeAreaView>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ height: 800, }}>
                        <TouchableOpacity onPress={() => checkes ? setCheckes(false) : setCheckes(true)}>
                            <View style={styles.placeViewc}>
                                <View style={styles.yellowView}>
                                    <Text style={{ color: '#000000', fontSize: 9, fontFamily: 'Poppins-Regular', alignSelf: 'flex-start', margin: 5, marginLeft: 10, }}>Sponsored</Text>
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
                        <View style={{ height: 1, width: 270, borderColor: 'white', borderWidth: .2, borderRadius: .1, marginVertical: 5, alignSelf: 'center' }}></View>
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

                        <TouchableOpacity onPress={() => checkei ? setCheckei(false) : setCheckei(true)}>
                            <View style={styles.placeView2}>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -5 }}>

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


            </View>
        </View>
    )
}

const Tab = createBottomTabNavigator();

class ReactNavigationBottomTabs extends Component {

    render() {
        return (
            <Tab.Navigator

            
                screenOptions={
                    {

                        tabBarActiveTintColor:  '#363143',
                        tabBarInactiveTintColor: '#363143',

                        tabBarStyle: {
                            marginBottom: 50, width: moderateScale(windowWidth - 61, 0.1), height: 100, marginHorizontal: 30, backgroundColor: '#363143',

                            borderBottomLeftRadius: 16,
                            borderBottomRightRadius: 16,
                        }
                    }
                }

               
                // tabBarOptions={



                //     {


                //         // Default Color is blue you can change it by following props
                //         activeTintColor: '#363143',
                //         inactiveTintColor: '#363143',
                //         // Default Background Color is white you can change it by following props

                //     }

                // }


            >

                <Tab.Screen


                    name="TaB A"
                    component={TabA}


                    options={{



                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <Image
                                    style={{ width: 60, height: 60, }}
                                    source={(require('../assets/card1.png'))}
                                />
                            );
                        },
                    }}
                />

                {/* 
            <Tab.Screen
                
                name='Tab A'
                component={TabA}
                options={{
                    headerShown: false
            
                   
                }}

                
            /> */}
                <Tab.Screen
                    name="TaB B"
                    component={TabB}


                    options={{



                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <Image
                                    style={{ width: 60, height: 60, }}
                                    source={(require('../assets/card2.png'))}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="TaB C"
                    component={TabC}


                    options={{



                        headerShown: false,

                        tabBarIcon: ({ focused, color }) => {
                            return (
                                <Image
                                    style={{ width: 60, height: 60, }}
                                    source={(require('../assets/card3.png'))}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({

    status: {
        width: 100,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        borderRadius: 19,

    },
    toggleContainer: {
        top: moderateScale(-23), marginLeft: 20,
        height: 25,
        width: 49,
        borderRadius: 19,
        borderWidth: 0,
        overflow: 'hidden',
        backgroundColor: '#24202F',
        padding: 1,
        position: 'relative',

    },
    toggleBtn: { height: '100%', width: '50%' },









    chooseContaine: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        height: moderateScale(70),
        width: moderateScale(windowWidth - 61, 0.1),
        backgroundColor: '#534C64',
        alignSelf: 'center'

    },
    InnerContain: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: moderateScale(windowWidth - 61, 0.1),
        top: 80,
        alignSelf: 'center',
        height: moderateScale(700),
        backgroundColor: '#363143'


    },
    Contain: {
        width: moderateScale(windowWidth, 0.1),
        height: moderateScale(700),
        backgroundColor: 'black'


    },
    placeView2: {
        margin: 8,
        borderRadius: 18,
        height: moderateScale(70),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        alignSelf: 'center',
    },
    yellowView: {
        height: moderateScale(24),
        width: moderateScale(270),
        backgroundColor: '#FFD500',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,

    },
    placeViewc: {
        margin: 8,
        borderRadius: 18,
        height: moderateScale(152),
        width: moderateScale(270),
        backgroundColor: '#24202F',
        alignSelf: 'center',

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
    },
    item: {
        marginLeft: 70,
        padding: 0,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
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
        fontFamily: "Poppins-Regular",
        color: 'white',

        marginLeft: 30,
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