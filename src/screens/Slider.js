
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const renderNextButton = () => {
  return (
    <>
      <LinearGradient 
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      colors={['#FF7474', '#E20303']}
      style={{borderRadius:12 , marginTop:-30 }}
      >
        <Text style={{textAlign:'center',fontSize: 16, fontFamily: 'Poppins-Regular', width:133, height:50 , paddingTop:14 , color:'white',}}>
          Next
        </Text>
      </LinearGradient>
    </>
  );
}

const SliderScreen = (props) => {


  const renderDoneButton = () => {
    return (
      <>
     <LinearGradient 
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      colors={['#FF7474', '#E20303']}
      style={{borderRadius:12 ,  marginTop:-30 }}
      >
        <Text style={{textAlign:'center',fontSize: 16, fontFamily: 'Poppins-Regular', width:133, height:50 , paddingTop:12 , color:'white',}}>
          Finish
        </Text>
      </LinearGradient>
      </>
    );
  }

  const renderSkipButton =(props)=>{
    return (
    <>
    <Text style={{ marginTop:-30, paddingTop:12, marginLeft:25 ,textAlign:'center',fontSize: 16, fontFamily: 'Poppins-Regular', color:'white' }} >Skip</Text>
    </>
    );
  }

  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
   props.navigation.navigate("login")
  };
  const onSkip = () => {
    props.navigation.navigate("login")
  };

  const RenderItem = ({ item }) => {
    return (
      <View
     
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 150,
        }}>
          <Image
          style={{ height: 123.49, width:123 , resizeMode:'contain'}}
          source={(require("../assets/imglogo.png"))} ></Image>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
       
      </View>

     
    );
  };

  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip
              from any slide or Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
      
            activeDotStyle={{ backgroundColor:'#FF2B25' , marginBottom:240}}
            dotStyle={{ backgroundColor: '#3B3B3B', marginBottom: 240}}
          
          nextLabel='Next' 

        
          data={slides}
          renderItem={RenderItem}
         onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          renderSkipButton={renderSkipButton}
          
        />
        
      )}
    </>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 205 ,
    height: 176,
    resizeMode: 'contain',
    
  },
  introTextStyle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 60,
    marginBottom:20,
    fontFamily: "Gazpacho Regular",
    top:-20,
    
  },
  introTitleStyle: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  
    fontFamily: "Gazpacho Regular"
 
  },
 
});

const slides = [
  {
    key: 's1',
    text: 'Create a profile',
    title: '',
    image: require('../assets/1.png'),
    backgroundColor: 'black',
    
    
  },
  {
    key: 's2',
    title: ' ',
    text: 'Plan the Date',
    image: require('../assets/2.png'),
    backgroundColor: 'black',
    height:300,
  },
  {
    key: 's3',
    title: ' ',
    text: 'Send the Invitation',
    image: require('../assets/3.png'),
    backgroundColor: 'black',
  },
  {
    key: 's4',
    title: ' ',
    text: 'Enjoy the Date',
    image: require('../assets/4.png'),
    backgroundColor: 'black',
  },
  
];