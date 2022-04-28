import React, { useEffect, useState } from 'react';
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
    ListViewComponent,
    Dimensions,
    ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DoneForNow(props) {

    return (
       
            <LinearGradient
                colors={['#24202f', '#24202f', '#24202f']}
                style={styles.container}
            >
                 <ScrollView>
                <View style={{  }}>
                    <View>


                        <Image
                            style={styles.imgLogo}
                            source={(require('../assets/imglogo.png'))}
                        ></Image>

                        <Image
                            style={styles.winePic}
                            source={(require('../assets/wine.png'))}
                        ></Image>

                        <Text style={styles.YouAre}>You're all set!</Text>
                        <Text style={styles.YourDate}>Your date is all planned out! We’ll send you a reminder 30 minutes before its time for your date to start.</Text>
                    </View>
                    <View style={{marginTop:40}}>

                        <TouchableOpacity onPress={() => props.navigation.navigate("home")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FFFF', '#FFFF']}
                                style={styles.linearGradient} >
                                <Text style={styles.DoneButton}>
                                    Done For Now
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("datemode")}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#FF7474', '#E20303']}
                                style={styles.linearGradient} >
                                <Text style={styles.saveButtonText}>
                                    Let's Start the Date Now
                                </Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

                </View>
                </ScrollView>
            </LinearGradient>
       
    )
}


const styles = StyleSheet.create({
    DoneButton: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#E71717',
        alignSelf: 'center',
        marginTop: 6
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 6,


    },
    linearGradient: {

        marginTop: 26,

        width: 300,
        paddingVertical: 12,
        borderRadius: 11,
       
        alignSelf: 'center',
        height: moderateScale(60),
    },
    YourDate: {
        alignSelf: "center",
        fontSize: 14,
        color: "#B7B7B7",
        fontFamily: 'Poppins-ExtraLight',
       marginHorizontal:30,
        textAlign: "center",
     
       
    },
    YouAre: {
        alignSelf: "center",
        fontSize: 40,
        color: "white",
        fontFamily: "buttershine-serif",
        fontWeight:'700',
        marginTop: 30,
    },
    winePic: {
        marginTop: 30,
        height: moderateScale(131.79),
        width: 85.03,
        alignSelf: "center",
        resizeMode:'contain'
    },

    imgLogo: {
        marginTop:30,
        height: moderateScale(105),
        width: 124,
        alignSelf: "center"
    },
    container: {
        flex: 1,
      
       
       
     

    },
})

