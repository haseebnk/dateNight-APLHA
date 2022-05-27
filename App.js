import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import LoginScreen2 from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import Slider from './src/screens/Slider';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import ChangePassword from './src/screens/ChangePassword';
import AddAnotherCouple from './src/screens/AddAnotherCouple';
import FAQScreen from './src/screens/FaqScreen';
import PersonalProfileDetails from './src/screens/PersonalProfilesDetails';
import chooseYourDate from './src/screens/chooseyourdate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoneForNow from './src/screens/DoneForNow';
import DateMode from './src/screens/DateMode';
import CoupleCard from './src/components/CoupleCard';
import SplashScreen from "react-native-splash-screen"
import { NotesProvider } from "./src/context/NotesContext"
import AppContext from './src/components/appcontext';
const Stack = createNativeStackNavigator();


const App = () => {

  const [userToken, setuserToken] = useState(null);


  const userSettings = {
    userToken: userToken,
  }
  const [user, setUser] = useState(null)

  useEffect(() => {
    getToken()

  }, [])

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@auth_token')
      if (value !== null) {
        setUser(true)
        console.log("I am in ", value)
        // value previously stored
      }

    } catch (e) {
      setUser("Not user", false)
      // error reading value
    }
  }

  function MyStack(intialRoute) {
    console.log("Got is : ", intialRoute.intialRoute)
    return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName={intialRoute.intialRoute}>
          {/* <Stack.Screen name="splash" options={{ headerShown: false }} component={Splash} /> */}
          <Stack.Screen name="login" options={{ headerShown: false }} component={LoginScreen2} />
          <Stack.Screen name="signup" options={{ headerShown: false }} component={SignupScreen} />
          <Stack.Screen name="slider" options={{ headerShown: false }} component={Slider} />
          <Stack.Screen name="forgotpassword" options={{ headerShown: false }} component={ForgotPassword} />
          <Stack.Screen name="changepassword" options={{ headerShown: false }} component={ChangePassword} />
          <Stack.Screen name="home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="splash" options={{ headerShown: false }} component={Splash} />
          <Stack.Screen name="addcouple" options={{ headerShown: false }} component={AddAnotherCouple} />
          <Stack.Screen name="faqscreen" options={{ headerShown: false }} component={FAQScreen} />
          <Stack.Screen name="personalprofiledetails" options={{ headerShown: false }} component={PersonalProfileDetails} />
          <Stack.Screen name="choosedate" options={{ headerShown: false }} component={chooseYourDate} />
          <Stack.Screen name="donefornow" options={{ headerShown: false }} component={DoneForNow} />
          <Stack.Screen name="datemode" options={{ headerShown: false }} component={DateMode} />
          <Stack.Screen name="couplecard" options={{ headerShown: false }} component={CoupleCard} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }

  return (
    <AppContext.Provider value={userSettings}>
      <NotesProvider>
        <MyStack intialRoute={user ? 'home' : 'splash'} />
      </NotesProvider>
    </AppContext.Provider>
  )
}

export default App;