import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import {Importance} from 'react-native-push-notification';
import {FloatingAction} from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './loader';
import axiosconfig from '../Providers/axios';
import Notifications from './Notifications';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// const Pings = [
//   {
//     id: 'Item 1',
//     type: 'unlock',
//     text: 'Selfie challenge',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: true,
//   },
//   {
//     id: 'Item 1',
//     type: 'unlock',
//     text: ' Compliment your date ',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: true,
//   },
//   {
//     id: 'Item 2',
//     type: 'unlock',
//     text: 'Truth or Dare',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: false,
//   },
//   {
//     id: 'Item 1',
//     type: 'unlock',
//     text: ' Compliment your date ',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: false,
//   },
//   {
//     id: 'Item 2',
//     type: 'lock',
//     text: ' Compliment your date ',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: false,
//   },
//   {
//     id: 'Item 1',
//     type: 'lock',
//     text: ' Compliment your date ',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: false,
//   },
//   {
//     id: 'Item 2',
//     type: 'lock',
//     text: ' Compliment your date ',
//     Description:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
//     selected: false,
//   },
// ];

const actions = [
  {
    text: 'Accessibility',
    icon: require('../assets/lock.png'),
    name: 'bt_accessibility',
    position: 2,
  },
  {
    text: 'Language',
    icon: require('../assets/lock.png'),
    name: 'bt_language',
    position: 1,
  },
  {
    text: 'Location',
    icon: require('../assets/lock.png'),
    name: 'bt_room',
    position: 3,
  },
  {
    text: 'Video',
    icon: require('../assets/lock.png'),
    name: 'bt_videocam',
    position: 4,
  },
];

export default function DateMode(props) {
  const [PauseActive, setPause] = useState(false);
  const [onHeaderc, setHeader] = useState(false);

  const onPause = () => {
    setPause(true);
    console.log('stop');
    clearInterval(intervalVar);
  };
  const onHeader = () => setHeader(true);
  const onHeaderF = () => setHeader(false);
  const onPause2 = () => {
    setPause(false);
    console.log('start');
    doneNow(Pings, count);
  };

  const [token, setToken] = useState('');
  const [pingData, setPingData] = useState({});
  const [Pings, setPings] = useState([
    {
      id: null,
      mode_id: '',
      name: '',
      description: '',
      paid_or_free: '',
      price: '',
      active_status: '1',
    },
  ]);
  const [count, setCount] = useState(0);
  const [myArray, setMyArray] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenn, setModalOpenn] = useState(false);
  const [modalStart, setModalStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [intervalVar, setIntervalVar] = useState(0);
  const [loader, setLoader] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const xyz = type => {
    console.log(type);
    type == 'paid' ? setModalOpenn(true) : null;
  };

  useEffect(() => {
    // Notifications.cancelNotification();
    clearInterval(intervalVar);
    setLoader(true);
    getToken();
  }, []);

  const getToken = async value => {
    try {
      const token = await AsyncStorage.getItem('@auth_token', value);
      setToken(token);
      getDates(token);
    } catch (e) {}
  };
  const getDates = async token => {
    axiosconfig
      .get('dates/21', {
        headers: {
          Authorization: 'Bearer ' + token, //the token is a variable which holds the token
        },
      })
      .then(res => {
        setPingData(res.data);
        console.log(res.data?.pings);
        setPings(res.data?.pings);
        setCount(res.data?.ping_duration);
        setLoader(false);
        doneNow(res.data?.pings, res.data?.ping_duration);
      })
      .catch(err => {
        console.log(err.response);
        setLoader(false);
      });
  };

  const saveDuration = () => {
    setLoader(true);
    axiosconfig
      .post(
        'change-duration',
        {id: pingData.id, duration: count},
        {
          headers: {
            Authorization: 'Bearer ' + token, //the token is a variable which holds the token
          },
        },
      )
      .then(res => {
        console.log('data', res.data);
        clearInterval(intervalVar);
        doneNow(Pings, count);
        setLoader(false);
      })
      .catch(err => {
        console.log(err.response);
        setLoader(false);
      });
  };

  const doneNow = (Pings, count) => {
    console.log('notify');
    let localInterval;
    localInterval = setInterval(() => {
      if (Pings.length - 1) {
        Notifications.pushNotification(Pings[index + 1].name);
        Pings.splice(0, 1);
        {
          Pings[index].paid_or_free == 'paid' ? setModalOpenn(true) : null;
        }
        setIndex(index + 1);
      } else {
        clearInterval(intervalVar);
      }
    }, Number(count) * 60 * 1000);
    setIntervalVar(localInterval);
  };

  const rendenPing = props => {
    const [modalOpenn, setModalOpenn] = useState(false);

    return Pings.map((v, i) => {
      return (
        <View style={styles.ping} >
          <TouchableOpacity
            onPress={() => xyz(v.paid_or_free)}
            // style={
            //   v.paid_or_free == 'free' && v.selected == true
            //     ? styles.PingPlayed
            //     : styles.PingUnlock && v.paid_or_free == 'paid'
            //     ? styles.PingLock
            //     : styles.PingUnlock
            // }
            style={
              v.paid_or_free == 'free'
                ? styles.PingPlayed
                : styles.PingUnlock && v.paid_or_free == 'paid'
                ? styles.PingLock
                : styles.PingUnlock
            }
            type={Pings}>
            <Text style={styles.PingText}>{v.name}</Text>
            {v.paid_or_free == 'paid' ? (
              <>
                <View style={styles.pinLockPicback}>
                  {/* {v.type} */}
                  <Image
                    style={styles.pinLockPic}
                    source={require('../assets/lock.png')}></Image>
                </View>
              </>
            ) : null}
          </TouchableOpacity>
        </View>
      );
    });
  };

  function onlclick() {
    if (Pings.length - 1) {
      clearInterval(intervalVar);

      Pings.splice(0, 1);
      {
        Pings[index].paid_or_free == 'paid' ? setModalOpenn(true) : null;
      }
      setIndex(index + 1);
      setTimeout(() => {
        doneNow(Pings, count);
      }, 100);
    } else {
      clearInterval(intervalVar);
    }
  }

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
  const onPress = () => setCount(count < 60 ? Number(count) + 5 : 0);
  const onPree = () =>
    setCount(
      count <= 60 && count > 0 ? Number(count) - 5 : count == 0 ? 60 : 0,
    );

  useEffect(() => {
    setTimeout(() => {
      fadeIn();
    }, 1000);
    setTimeout(() => {
      fadeInUp();
    }, 1000);
  }, []);

  const fadeAnim = useRef(new Animated.Value(-430)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeAnimUp = useRef(new Animated.Value(-130)).current;
  const fadeInUp = () => {
    Animated.timing(fadeAnimUp, {
      toValue: -2,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {loader ? (
        <>
          <Loader />
        </>
      ) : null}
      <ScrollView>
        <Modal transparent={true} visible={modalOpenn} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -5,
              backgroundColor: '#000000e0',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF7474', '#E20303']}
              style={styles.modalView}>
              <Text style={styles.modalText2}>
                This Ping is currently locked. Would you like to permanently
                unlock it for just $0.99 ?
              </Text>

              <View style={styles.modalButtons2}>
                <Pressable style={styles.button} onPress={() => ''}>
                  <Text style={styles.textStyleNo1}>Yes</Text>
                </Pressable>

                <Pressable
                  style={styles.button}
                  onPress={() => setModalOpenn(false)}>
                  <Text style={styles.textStyleNo1}>No Thanks</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </Modal>
        <LinearGradient
          colors={['#24202f', '#24202f', '#24202f']}
          style={styles.container}>
          {
            //     onHeaderc == false ? (
            //         <>
            //             <View >
            //                 <TouchableOpacity onPress={() => { LayoutAnimation.easeInEaseOut() , 200; onHeader() }}>
            //                     <MaterialIcons style={{ marginTop: 9 }} name='share' size={hp('5.5%')} color="#5a5761" />
            //                 </TouchableOpacity>
            //             </View>
            //         </>
            //     ) :
            //     <View >
            //     <TouchableOpacity onPress={() => { LayoutAnimation.easeInEaseOut() , 200; onHeader() }}>
            //         <MaterialIcons style={{ marginTop: 9 }} name='share' size={hp('5.5%')} color="#5a5761" />
            //     </TouchableOpacity>
            // </View>
            // <Animated.View style={{ translateX: fadeAnim }} >
            //     <View style={styles.TopHeader}>
            //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 10 }}>
            //             <TouchableOpacity onPress={() => { LayoutAnimation.easeInEaseOut(); onHeaderF() }}>
            //                 <MaterialIcons name='share' size={hp('5%')} color="#5a5761" />
            //             </TouchableOpacity>
            //             <AntDesign name='facebook-square' size={hp('4.5%')} color="#fefefe" />
            //             <FontAwesome5 name='facebook-messenger' size={hp('4.5%')} color="#0084fe" />
            //             <AntDesign style={{ marginTop: 1 }} name='instagram' size={hp('4.8%')} color="#d0a800" />
            //             <AntDesign name='twitter' size={hp('4.5%')} color="#1da1f3" />
            //             <Ionicons name='chatbubble-sharp' size={hp('4.5%')} color="#34e228" />
            //         </View>
            //     </View>
            // </Animated.View>
          }

          <View>
            <Text style={styles.CasualModeText}>Casual Date Mode</Text>
          </View>
          <View style={styles.ChallengeContainer}>
            <Text style={styles.firstText}>Ohhh..</Text>

            <View style={styles.secondText}>
              <View style={styles.ping}>
                <View style={{alignSelf: 'center'}}>
                  <Text style={styles.secondText}>{Pings[0].name}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.thirdText}>Are You Ready?</Text>
            <View style={styles.InnerContainer}>
              <ScrollView nestedScrollEnabled={true}>
                <Text style={styles.dareText}>{Pings[0].description}</Text>
              </ScrollView>
            </View>
          </View>
          <Modal
            transparent={true}
            visible={modalOpen}
            animationType="fade"
            navigation={props.navigation}>
            <View style={styles.centeredView}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF7474', '#E20303']}
                style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to quit your date?
                </Text>

                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.button, styles.buttonYes]}
                    onPress={() => props.navigation.navigate('home')}>
                    <Text style={styles.textStyleYes}>Yes</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonNo]}
                    onPress={() => setModalOpen(false)}>
                    <Text style={styles.textStyleNo}>No</Text>
                  </Pressable>
                </View>
              </LinearGradient>
            </View>
          </Modal>
          <ScrollView nestedScrollEnabled={true} horizontal={true}>
            {rendenPing()}
          </ScrollView>
          <View style={styles.BottomHeader}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('faqscreen')}>
              <Text
                style={{
                  fontSize: 23,
                  color: 'white',
                  alignSelf: 'flex-start',
                  margin: 20,
                  fontFamily:
                    Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
                  marginLeft: 25,
                  top: -5,
                }}>
                {' '}
                FAQ
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: moderateScale(50),
                marginRight: 110,
              }}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <MaterialIcons
                  style={{margin: 10}}
                  name="stop"
                  size={hp('5%')}
                  color="#E20303"
                />
              </TouchableOpacity>

              {PauseActive == false ? (
                <TouchableOpacity onPress={onPause}>
                  <MaterialIcons
                    style={{margin: 10}}
                    name="pause"
                    size={hp('5%')}
                    color="yellow"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onPause2}>
                  <MaterialIcons
                    style={{margin: 10}}
                    name="play-arrow"
                    size={hp('5%')}
                    color="#74FF82"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onlclick}>
                <MaterialIcons
                  style={{margin: 10, top: 3}}
                  name="double-arrow"
                  size={hp('4%')}
                  color="#0379FF"
                />
              </TouchableOpacity>
            </View>
            <Modal transparent={true} visible={modalStart} animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -5,
                  backgroundColor: '#000000e0',
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#FF7474', '#E20303']}
                  style={styles.modalView3}>
                  <Text style={styles.modalText3}>Set Ping Frequency</Text>
                  <View style={styles.ping3}>
                    <View style={{width: 100}}>
                      <TouchableOpacity
                        onPressIn={onPressMius}
                        onPress={onPree}
                        onPressOut={onPree}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['white', 'white']}
                          style={styles.btn1}>
                          <Text style={styles.btn1Text}>-</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    <View style={{width: 100}}>
                      <Text style={styles.count1}>{count}</Text>
                    </View>
                    <View style={{width: 100}}>
                      <TouchableOpacity
                        onPressIn={onPressIn}
                        onPress={onPress}
                        onPressOut={onPressOut}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['white', 'white']}
                          style={styles.btn2}>
                          <Text style={styles.btn2Text}>+</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalButtons3}>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        setModalStart(false);
                        saveDuration();
                      }}>
                      <Text style={styles.textStyleNo1}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={styles.button}
                      onPress={() => setModalStart(false)}>
                      <Text style={styles.textStyleNo1}>Cancel</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            </Modal>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPress={() => setModalStart(true)}
              onPressOut={onPressOut}>
              <View
                style={{
                  width: 30,
                  marginRight: 28,
                  margin: 13,
                }}>
                <Text style={styles.count}>{count}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 30,
              alignSelf: 'flex-end',
              marginRight: 28,
              bottom: 23,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
              }}>
              min
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  TopHeader: {
    height: moderateScale(60),
    backgroundColor: 'black',

    borderBottomLeftRadius: 36,
    zIndex: 999,
    borderBottomRightRadius: 36,
  },

  count1: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    marginTop: moderateScale(30),
  },

  modalButtons3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalText3: {
    marginBottom: -50,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
  },
  btn1Text: {
    textAlign: 'center', // <-- the magic
    fontSize: 38,

    marginTop: moderateScale(4),

    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  btn1: {
    width: 58,
    height: 58,
    margin: 25,
    borderRadius: 18,
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
  },
  btn2Text: {
    textAlign: 'center', // <-- the magic
    fontSize: 38,

    marginTop: moderateScale(4),

    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  btn2: {
    width: 58,
    height: 58,
    margin: 25,
    borderRadius: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ping: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  modalView3: {
    width: 310,
    height: 249,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 310,
      height: 209,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonNo: {
    backgroundColor: 'white',
    margin: 20,
    width: 74,
    height: 44,
  },
  buttonYes: {
    backgroundColor: null,
    margin: 20,
    width: 74,
    height: 44,
  },
  modalButtons2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    backgroundColor: '#000000e0',
  },
  modalView: {
    width: 310,
    height: 209,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'red',
    shadowOffset: {
      width: 310,
      height: 209,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  textStyleYes1: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  textStyleNo1: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },

  textStyleYes: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  textStyleNo: {
    color: '#E20303',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  modalText2: {
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 18,
  },
  // modalText: {
  //     marginBottom: 15,
  //     textAlign: "center",
  //     fontFamily: 'Poppins-Regular',
  //     color: 'white',
  //     fontSize: 18
  // },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000e0',
  },
  pinLockPic: {
    height: 12,
    width: 12,
    alignSelf: 'center',
    top: 3,
  },
  pinLockPicback: {
    height: 17,
    width: 17,
    borderRadius: 20,
    backgroundColor: 'white',
    top: 3,
    marginHorizontal: 65,
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  dareText: {
    fontSize: 12.7,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    lineHeight: 18,
    margin: 18,
    color: '#24202F',
  },
  InnerContainer: {
    height: scale(280),
    width: scale(250),
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    alignSelf: 'center',
  },
  thirdText: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
    alignSelf: 'center',
    color: '#74FF82',
    marginBottom: 10,
  },
  secondText: {
    fontSize: 25,
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
    alignSelf: 'center',
    color: '#74FF82',
    marginTop: -5,
    marginBottom: 5,
    justifyContent: 'center',
    textAlign: 'center',
  },
  firstText: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
    alignSelf: 'center',
    color: '#74FF82',
    marginTop: 0,
  },
  count: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  BottomHeader: {
    alignSelf: 'center',
    height: scale(68.7),
    backgroundColor: 'black',
    width: scale(350),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    bottom: Platform.OS === 'ios' ? -14 : -18,
  },
  PingUnlock: {
    width: 90,
    height: 90,
    borderRadius: 12,
    margin: 15,
    backgroundColor: '#FF2B25',
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
  },
  PingLock: {
    width: 90,
    height: 90,
    borderRadius: 12,
    margin: 15,
    backgroundColor: '#C5C5C5',
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
  },
  PingPlayed: {
    width: 90,
    height: 90,
    borderRadius: 12,
    margin: 15,
    fontSize: 12,
    backgroundColor: '#1AC72B',
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
  },
  ping3: {
    flexDirection: 'row',
    marginTop: 45,
    alignSelf: 'center',
  },

  PingText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 27,
    marginHorizontal: 5,
  },
  ChallengeContainer: {
    alignSelf: 'center',
    width: scale(300),
    paddingVertical: 20,
    backgroundColor: '#363143',
    borderColor: '#00B712',
    borderWidth: 2.5,
    borderRadius: 20,
    marginTop: 20,
  },
  CasualModeText: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Gazpacho' : 'Gazpacho Regular',
    marginTop: Platform.OS === 'ios' ? 30 : 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#ffff',
  },
});
