import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  UIManager,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import Notifications from './Notifications';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function DoneForNow(props) {
  const doneNow = () => {
    props.navigation.navigate('datemode');

    // setNotification()
  };

  const setNotification = () => {
    // Notifications.schduleNotification(date);
    Notifications.schduleNotification(new Date(Date.now() + 5 * 1000));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <LinearGradient
        colors={['#24202f', '#24202f', '#24202f']}
        style={styles.container}>
        <ScrollView>
          <View style={{marginBottom: 10}}>
            <View>
              <Image
                style={styles.imgLogo}
                source={require('../assets/imglogo.png')}></Image>

              <Image
                style={styles.winePic}
                source={require('../assets/wine.png')}></Image>

              <Text style={styles.YouAre}>You're all set!</Text>
              <Text style={styles.YourDate}>
                Your date is all planned out, and an invitation has been sent to
                your partner. We’ll send you a reminder 30 minutes before it’s
                time for your date to start
              </Text>
            </View>
            <View style={{marginTop: 40}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('home')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FFFF', '#FFFF']}
                  style={styles.linearGradient2}>
                  <Text style={styles.DoneButton}>Done For Now</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => doneNow()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FF7474', '#E20303']}
                  style={styles.linearGradient}>
                  <Text style={styles.saveButtonText}>
                    Let's Start the Date Now
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  DoneButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#E71717',
    alignSelf: 'center',
    marginTop: 9,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fafafa',
    alignSelf: 'center',
    marginTop: 9,
  },
  linearGradient: {
    marginTop: 26,

    width: 300,
    paddingVertical: 12,
    borderRadius: 11,

    alignSelf: 'center',
    height: moderateScale(60),
  },
  linearGradient2: {
    marginTop: 5,

    width: 300,
    paddingVertical: 12,
    borderRadius: 11,

    alignSelf: 'center',
    height: moderateScale(60),
  },
  YourDate: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#B7B7B7',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 30,
    textAlign: 'center',
    marginTop: 5,
  },
  YouAre: {
    alignSelf: 'center',
    fontSize: 40,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',

    marginTop: 30,
  },
  winePic: {
    marginTop: 30,
    height: moderateScale(131.79),
    width: 85.03,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  imgLogo: {
    marginTop: 30,
    height: moderateScale(105),
    width: 124,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
});
