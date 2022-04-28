import React , { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


const ActiveIndicator = (props) => {

    useEffect(() => {
        setTimeout(() => props.navigation.navigate("home") , 100);
      }, []);


      return(
        <View style={[styles.container]}>
   
 
  
        <ActivityIndicator size="35%"  color="white"  useEffect = {useEffect}  />
      </View>
    );
    

      }

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"#24202F"
    
  },
 
});

export default ActiveIndicator;