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


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const [Mystate, NewState] = useState(0);


const Data = [{
    id: 1,
    name: 'Plan Your Next Date',
    date: 'Date :  MM | DD | YYYY:',
    day: 'Day:  Wednesday:',
    time: 'Time:  12:56 Am',
    Frequency:'Frequency:  Daily'
}]


const Gift = [{
    id: 1,
    name: 'New Reminder',
    date: 'Date:',
    time: 'Time:',
    Repeat: 'Repeat:',
  
}]


const renderData = () => {
    return (
        Data.map((v, i) => {
            return (
                <View key={i} style={{ flexDirection: 'column' }}>
                    <Text style={styles.cardTextHead}>{v.name}</Text>
                    <Text style={styles.cardText}>{v.date}</Text>
                    <Text style={styles.cardText}>{v.day}</Text>
                    <Text style={styles.cardText}>{v.time}</Text>
                    <Text style={styles.cardText}>{v.Frequency}</Text>
                </View>

            )
        })

    )
}



const renderGift = () => {
    return (
        Gift.map((v, i) => {
            return (
                <View key={i} style={{ flexDirection: 'column' }}>
                    <Text style={styles.cardTextHead}>{v.name}</Text>
                    <Text style={styles.cardText}>{v.date}</Text>
                    <Text style={styles.cardText}>{v.time}</Text>
                    <Text style={styles.cardText}>{v.Repeat}</Text>
                   
                </View>

            )
        })

    )
}


function ProfileDetailsCard() {






    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);

    return (
        <ScrollView horizontal={true}>




            <TouchableOpacity activeOpacity={.9} onPress={() => checked ? setChecked(false) : setChecked(true)}>


                <LinearGradient 
                
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#0071BC', '#7AC9FD']}
                
                style={styles.container}>
                    {/* <View style={styles.flex1}>
                        <Image style={styles.picSize} source={require('../assets/girl.png')}></Image>
                    </View> */}
                    <View style={styles.flex2}>
                        {renderData()}
                    </View>
                    <View style={styles.flex3}>
                        <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}
                            style={{ margin: 3, marginRight: 1, marginTop: 6, height: moderateScale(35), width: moderateScale(35), borderRadius: moderateScale(20), backgroundColor: checked ? '#00B712' : 'white', borderWidth: 5.2, borderColor: 'white' }} >

                        </TouchableOpacity>

                        <MaterialIcons style={{ marginBottom: 5 , marginLeft:12 }} name='more-vert' size={hp('4%')} color="white" />
                    </View>
                </LinearGradient>

            </TouchableOpacity>






            <TouchableOpacity activeOpacity={.9} onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}>


                <LinearGradient

                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#534C64', '#534C64']}

                    style={styles.container}>
                    {/* <View style={styles.flex1}>
                        <Image style={styles.picSize} source={require('../assets/girl.png')}></Image>
                    </View> */}
                    <View style={styles.flex2}>
                        {renderGift()}
                    </View>
                    <View style={styles.flex1}>
                        <MaterialIcons style={{ marginLeft: -45, marginTop: 15 }} name='expand-more' size={hp('3%')} color="white" />

                        <MaterialIcons style={{ marginLeft: -45, marginBottom: 40 }} name='expand-more' size={hp('3%')} color="white" />
                    </View>
                    <View style={styles.flex3}>
                        <TouchableOpacity onPress={() => checkedd ? setCheckedd(false) : setCheckedd(true)}
                            style={{ margin: 3, marginRight: 1, marginTop: 6, height: moderateScale(35), width: moderateScale(35), borderRadius: moderateScale(20), backgroundColor: checkedd ? '#00B712' : 'white', borderWidth: 5.2, borderColor: 'white' }} >

                        </TouchableOpacity>
                        <MaterialIcons style={{ marginLeft:15, marginBottom: 0 }} name='mode-edit' size={hp('3%')} color="white" />

                        <MaterialIcons style={{ marginLeft: 15, marginBottom: 25 }} name='delete-outline' size={hp('3%')} color="white" />
                    </View>
                </LinearGradient>

            </TouchableOpacity >





          

        </ScrollView>

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
        // backgroundColor:'red',
        flexDirection:'column',
        justifyContent:'space-between'
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









    cardTextHead: {
        color: 'white',
        fontFamily: "Poppins-Regular",
        fontWeight:'700',
        fontSize: 18,
        marginLeft: 25,
        marginTop:10



       

    },
    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
       marginTop:7,
       marginLeft:25


    },





});

export default ProfileDetailsCard;