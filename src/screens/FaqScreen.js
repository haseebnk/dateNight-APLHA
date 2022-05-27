import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Animated, Modal, LayoutAnimation,
    Platform,
    UIManager, SafeAreaView, Pressable
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';



if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
const inActiveColor = 'white';
const activeColor = '#00B712';



const data = [
    { id: 1, title: 'FAQ1', description: 'It may, or may not be an actual "first" date, but its certainly one of the first... a "get-to-know" Kind of date. Youll need ice-breakers. ' },
    { id: 2, title: 'FAQ2', description: 'It may, or may not be an actual "first" date, but its certainly one of the first... a "get-to-know" Kind of date. Youll need ice-breakers. ' },
    { id: 3, title: 'FAQ3', description: 'It may, or may not be an actual "first" date, but its certainly one of the first... a "get-to-know" Kind of date. Youll need ice-breakers. ' },
    { id: 4, title: 'FAQ2', description: 'It may, or may not be an actual "first" date, but its certainly one of the first... a "get-to-know" Kind of date. Youll need ice-breakers. ' },


]

const FAQScreen = (props) => {

    const [press, setPress] = useState('');

    function questionPick(item) {
        setPress(item.id)
    }

    function questionClose(item) {
        setPress(item.id)
    }

    return (

        <LinearGradient
            colors={['#24202f', '#24202f', '#24202f']}
            style={styles.container}
        >
            <SafeAreaView>
                <View >
                    <View style={{ alignItems: 'center', }}>


                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>

                                <Image style={styles.imgClose}
                                    source={require("../assets/close.png")}
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.faqHeading}>FAQ</Text>
                        </View>

                        <SafeAreaView style={{ width: '90%', alignSelf: 'center' }}>
                            <FlatList

                                nestedScrollEnabled

                                ListEmptyComponent={null}
                                ListFooterComponent={null}
                                ListHeaderComponent={null}
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ width: '100%' }}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => { LayoutAnimation.easeInEaseOut(); questionPick(item) }}
                                        style={{ marginTop: 20, width: '100%', padding: 0 }}
                                    >
                                        {press === item.id ?
                                            <TouchableOpacity onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} >
                                                <View style={{ borderColor: 'white', borderWidth: 0.9, flexDirection: 'row', alignItems: 'center', backgroundColor: '#363143', paddingHorizontal: 10, paddingVertical: 10, height: 76, borderRadius: 18, color: "White" }}>
                                                    <MaterialIcons name='expand-less' size={hp('5%')} color="white" />
                                                    <Text style={{ color: 'white', fontFamily: "Poppins-Regular", fontSize: 16 }}>{item.title}</Text>       
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#363143', paddingHorizontal: 10, paddingVertical: 10, height: 76, borderRadius: 18, color: "White", }}>
                                                <MaterialIcons name='expand-more' size={hp('5%')} color="white" />
                                                <View>
                                                    <Text style={{ padding: 5, fontFamily: "Poppins-Regular", color: "white", fontSize: 16, }}>{item.title}</Text>
                                                </View>


                                            </View>
                                        }

                                        {press === item.id ?

                                            <Pressable onPress={() => { LayoutAnimation.easeInEaseOut(); setPress('') }} style={{ zIndex: -999 }} >
                                                <View style={{ backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, }}>
                                                    <Text style={{ margin: 15, padding: 15, marginHorizontal: 0, marginTop: -10, backgroundColor: "white", color: "#B4B4B4", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, fontSize: 14, fontFamily: "Poppins-Regular", }}>{item.description} </Text>
                                                </View>
                                            </Pressable>

                                            :

                                            null
                                        }
                                    </TouchableOpacity>

                                )}
                            />
                        </SafeAreaView>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default FAQScreen;

const styles = StyleSheet.create({
    faqHeading: {
        color: 'white',
        fontSize: 20,
        marginTop: 0,
        marginHorizontal: 135,
        marginBottom: 20,
        fontFamily: "Poppins-Regular",
        textAlign: 'center',
        marginLeft: 115,


    },
    imgClose: {
        height: 19,
        width: 19,
        marginTop: 5,
        marginLeft: 5,
    },

    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#ffff'
    },
})