import React, { Component, useState, useContext } from "react";
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
    FlatList
} from "react-native";


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NotesContext } from "../context/NotesContext";




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const [Mystate, NewState] = useState(0);


// const Data = [{
//     id: 1,
//     name: "",
//     phone: "Phone:",
//     email: "Email:",
//     Number: 'Number:'
// }]


// const renderData = () => {
//     return (
//         Data.map((v, i ) => {

//             const { state } = useContext(NotesContext)

//             return (
//                 // <View key={i} style={{ flexDirection: 'column', marginTop: 20, }}>
//                 //     <Text style={styles.cardTextHead}>{v.name} </Text>
//                 //     <Text style={styles.cardText}>{v.phone}</Text>
//                 //     <Text style={styles.cardText}>{v.email}</Text>
//                 //     <Text style={styles.cardText}>{v.Number}</Text>
//                 // </View>

//             )
//         })

//     )
// }


function CoupleCard() {


    














    const { state } = useContext(NotesContext)


    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);

    return (
        <View >
            <FlatList
                horizontal={true}
                data={state}
                keyExtractor={item => item.name}
                renderItem={({ item }) => {
                    return (


                        <View style={styles.container2} >

                            {console.log(item)}


                            <LinearGradient style={styles.withBorder} colors={[item.color[0], item.color[1]]} title="Welcome">

                                {/* <Text style={{ alignSelf: 'center', fontSize: 22, color: 'white', }} >{item.name}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 22, color: 'white', }} >{item.number}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 22, color: 'white', }} >{item.email}</Text> */}
                                <View style={styles.flex1}>
                                    <Image style={styles.picSize} source={require('../assets/girl.png')}></Image>
                                </View>
                                <View style={styles.flex2}>
                                <View  style={{ flexDirection: 'column', marginTop: 20, }}>
                    <Text style={styles.cardTextHead}>{item.name} </Text>
                    <Text style={styles.cardText}>Phone:  {item.number}</Text>
                    <Text style={styles.cardText}>Email:  {item.email}</Text>
                    <Text style={styles.cardText}>Date 0f birth:  {item.dateb}</Text>
                    {/* <Text style={styles.cardText}>{v.Number}</Text> */}
                </View>
                                </View>
                                <View style={styles.flex3}>
                                    <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                                        style={{ margin: 3, marginRight: 1, marginTop: 6, height: moderateScale(25), width: moderateScale(25), borderRadius: moderateScale(20), backgroundColor: checked ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

                                    </TouchableOpacity>

                                    <MaterialIcons style={{ marginBottom: 5 }} name='more-vert' size={hp('5%')} color="white" />
                                </View>

                            </LinearGradient>


                        </View>


                    )
                }}
            />
        </View>
        // <ScrollView horizontal={true}>




        //     <TouchableHighlight activeOpacity={.9} onPress={() => checked ? setChecked(false) : setChecked(true)}>


        //         <LinearGradient
        //             start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}
        //             colors={['#F11775', '#FB6580']}


        //             style={styles.container}>
        //             <View style={styles.flex1}>
        //                 <Image style={styles.picSize} source={require('../assets/girl.png')}></Image>
        //             </View>
        //             <View style={styles.flex2}>
        //                 {renderData()}
        //             </View>
        //             <View style={styles.flex3}>
        //                 <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
        //                     style={{ margin: 3, marginRight: 1, marginTop: 6, height: moderateScale(25), width: moderateScale(25), borderRadius: moderateScale(20), backgroundColor: checked ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

        //                 </TouchableOpacity>

        //                 <MaterialIcons style={{ marginBottom: 5 }} name='more-vert' size={hp('5%')} color="white" />
        //             </View>
        //         </LinearGradient>

        //     </TouchableHighlight>






        //     <TouchableHighlight activeOpacity={.9} onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}>


        //         <LinearGradient
        //             start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
        //             colors={['#7AC9FD', '#0071BC']}


        //             style={styles.container}>
        //             <View style={styles.flex1}>
        //                 <Image style={styles.picSize} source={require('../assets/girl.png')}></Image>
        //             </View>
        //             <View style={styles.flex2}>
        //                 {renderData()}
        //             </View>
        //             <View style={styles.flex3}>
        //                 <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
        //                     style={{ margin: 3, marginRight: 1, marginTop: 6, height: moderateScale(25), width: moderateScale(25), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 4, borderColor: 'white' }} >

        //                 </TouchableOpacity>

        //                 <MaterialIcons style={{ marginBottom: 5 }} name='more-vert' size={hp('5%')} color="white" />
        //             </View>
        //         </LinearGradient>

        //     </TouchableHighlight>





        //     {/* <TouchableHighlight activeOpacity={.9} onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}>
        //         <View style={styles.MainView}>
        //             <View style={styles.picStyle}>

        //                 <Image style={styles.dpStyle} source={require('../assets/girl.png')}></Image>

        //                 {renderData()}

        //                 <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
        //                     style={{ marginTop: moderateScale(-10), height: moderateScale(30), width: moderateScale(30), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5, borderColor: 'white' }} >

        //                 </TouchableOpacity>
        //             </View>


        //         </View>

        //     </TouchableHighlight> */}




        // </ScrollView>

    );

}

const styles = StyleSheet.create({
    container2: {
        flex: 1,

        height: moderateScale(185),
        width: moderateScale(324),
        marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),



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
        borderRadius: moderateScale(18),


        height: moderateScale(185),
        width: moderateScale(324),
        alignSelf: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,

    },

    input: {
        height: 50,
        alignSelf: "center",
        backgroundColor: 'white',
        width: '80%',
        margin: 10,

    },























    picSize: {

        marginLeft: 10,
        marginTop: 22,
        height: 150,
        width: 110,
        borderRadius: 14,
        alignItems: 'center'







    },
    flex3: {
        flex: .6,

        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    flex2: {
        flex: 2.8,



    },
    flex1: {
        flex: 2,

        borderRadius: moderateScale(18),
    },

    container: {
        flex: 1,
        backgroundColor: '#F11775',
        height: moderateScale(185),
        width: moderateScale(324),
        marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),


    },









    cardTextHead: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginLeft: moderateScale(3),



        alignSelf: 'center'

    },
    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginLeft: 4,
        marginTop: 16,



    },






















    // RadioInnerViewNormal: {


    //     height: 18,
    //     width: 18,
    //     backgroundColor: 'white',
    //     borderRadius: 50,
    //     alignSelf: 'center',
    //     top: 3.5



    // },
    // RadioInnerView: {

    //     height: 18,
    //     width: 18,
    //     backgroundColor: '#00b611',
    //     borderRadius: 50,
    //     alignSelf: 'center',
    //     top: 3.5


    // },
    // RadioView: {

    //     height: 25,
    //     width: 25,
    //     backgroundColor: 'white',
    //     borderRadius: 50,
    //     margin: 10,
    //     alignSelf: 'flex-end'

    // },

    // DataView: {

    //     flexDirection: 'column',
    //     marginLeft: moderateScale(10),
    //     width: moderateScale(130),

    // },
    // dpStyle: {

    //     width: moderateScale(126),
    //     height: moderateScale(152),
    //     backgroundColor: '#F11775'



    // },
    // picStyle: {

    //     width: moderateScale(windowWidth - 70),
    //     height: moderateScale(152),
    //     borderRadius: 18,
    //     flexDirection: 'row',
    //     backgroundColor: 'white',
    //     alignSelf: 'center',
    //     justifyContent: 'space-between',
    //     backgroundColor: '#F11775',
    //     marginTop: 16


    // },

    // MainView: {
    //     height: moderateScale(185),
    //     width:moderateScale(windowWidth - 50),
    //     backgroundColor: '#F11775',
    //     alignSelf: 'center',
    //     borderRadius: moderateScale(18),
    //     margin: 10,
    //     marginBottom: 20,
    //     justifyContent: 'space-between',




    // }

});

export default CoupleCard;