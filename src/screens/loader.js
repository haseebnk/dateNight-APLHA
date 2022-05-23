import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Dimensions  } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loader = ({navigation}) => {
    return(
        <View style={styles.cont}>
            <Image
                style={styles.logo}
                source={require('../assets/gif/loader.gif')}
            />
            {/* <LoaderImg/> */}
        </View>
    )
} 

export default Loader;

const styles = StyleSheet.create({
    logo: {
      width: moderateScale(140,0.1),
      height: moderateScale(148,0.1),
    },
    cont:{
        backgroundColor:'#000000d1',
        position:'absolute',
        zIndex:111,
        top:0,
        left:0,
        bottom:0,
        right:0,
        height:windowHeight,
        width:windowWidth,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    }
  });