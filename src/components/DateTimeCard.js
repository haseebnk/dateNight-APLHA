import React, { Component, useState } from "react";
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
    TouchableWithoutFeedback
} from "react-native";



import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Data = [{
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



function DateTimeCard() {


    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);

    return (
        Data.map((v, i) => {
            return (

                <ScrollView horizontal={true}>          
                    <TouchableOpacity activeOpacity={.9} onPress={() => checked ? setChecked(false) : setChecked(true)}>
                        <LinearGradient

                            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                            colors={['#7AC9FD', '#0071BC']}
                            style={styles.container2}>
                            <View style={styles.flex2}>


                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.cardTextHead}>{v.name}</Text>

                                    <View style={{ top: 15 }}>
                                        <Text style={styles.cardText}>{v.Gname}</Text>
                                        <Text style={styles.cardText}>{v.date}</Text>

                                        <Text style={styles.cardText}>{v.time}</Text>
                                        {/* <Text style={styles.cardText}>{v.Frequency}</Text> */}
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
                </ScrollView>

            )
        })
    );

}

const styles = StyleSheet.create({
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

});

export default DateTimeCard;