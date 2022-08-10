import React from 'react'
import { View , Text } from 'react-native';
import WebView from 'react-native-webview';

export default function Webview({route , navigation}) {

console.log(route.params.data,"rrr");

const passValues =()=>{
console.log("khataam");
}
 
const handleMessage =(event)=>{
 

  console.log(event ,"hereeee");

  if(event.title.includes('https://buybestthemes.com/date_night_api/api/paypal') && event.canGoBack == true){
     navigation.navigate('home' , {paidd:true})
  } 

  
}

 const onloadFun =(e)=>{

  console.log(e , "onloaddd")

 }


  return (
    <WebView
    onNavigationStateChange={(event) => handleMessage(event)}
   onLoadEnd={(e) => onloadFun(e)}
    source={{
      uri: route.params.data
    }}
    style={{ marginTop: 20 }}
  />
 
  )
}
