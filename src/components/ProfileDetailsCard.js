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
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const [Mystate, NewState] = useState(0);


const Data = [{
    id: 1,
    name: 'Plan Your Next Date',
    date: 'Date :  MM | DD | YYYY:',
    day: 'Day:  Wednesday:',
    time: 'Time:  12:56 Am',
    Frequency: 'Frequency:  Daily'
}]


const Gift = [{
    id: 1,
    name: 'New Reminder',
    date: 'Date:',
    time: 'Time:',
    Repeat: 'Repeat:',

}]



const radio_props = [
    { label: 'Buy Flowers', value: 0 },
    { label: 'Plan Anniversary', value: 1 },
    { label: 'Plan Birthday', value: 2 },
    { label: 'Act of Service', value: 3 },
    { label: 'Custom Reminder', value: 4 },

];




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
                    <Text style={styles.cardText2}>{v.date}</Text>
                    <Text style={styles.cardText2}>{v.time}</Text>
                    <Text style={styles.cardText2}>{v.Repeat}</Text>

                </View>

            )
        })

    )
}


function ProfileDetailsCard() {

    const [checked, setChecked] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);
    const [modalOpenn, setModalOpenn] = useState(false);
    const [reminder, setReminder] = useState();



    return (
        <ScrollView horizontal={true}>
            <Modal
                transparent={true}
                visible={modalOpenn}
                animationType='fade'
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -5,
                    backgroundColor: '#000000b8',
                }} >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#24202ff7', '#24202ff7']}
                        style={styles.modalViewH}> 
                        <View style={{ alignSelf: 'flex-start', top: 5, left: -20 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => { ({ value: value }) }}
                                labelColor={'#fff'}
                                buttonColor={'white'}
                                selectedButtonColor={'#00B712'}
                                selectedLabelColor={'white'}
                                buttonInnerColor={'#e74c3c'}
                                buttonSize={9}
                                buttonOuterSize={18}
                                labelStyle={{ fontSize: 13, top: -7, marginVertical: 5, fontFamily: 'Poppins-Regular' }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setModalOpenn(false)}>
                            <Text style={styles.DoneText}>
                                Done
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>
            <TouchableOpacity activeOpacity={.9} >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    colors={checked ? ['#00B712', '#00B712'] : ['#FF2B25', '#FF2B25'] }
                    style={styles.container}>
                    <View style={styles.flex2}>
                        {renderData()}
                    </View>                   
                    <View style={styles.flex3}>
                    <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>
                        <Text style={{
                            fontFamily: 'Poppins-Regular',
                            color: 'white',
                            fontSize: 15,
                            marginTop: 20,
                            marginHorizontal:10

                        }}> {checked ? 'Active' : 'Inactive'} </Text>
                     </TouchableOpacity>
                        <MaterialIcons style={{ marginLeft:40, marginBottom: 0 }} name='mode-edit' size={hp('3.1%')} color="white" />
                        <MaterialIcons style={{ marginLeft: 40, marginBottom: 25 }} name='delete-outline' size={hp('3.5%')} color="white" />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <Pressable activeOpacity={.9}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#534C64', '#534C64']}
                    style={styles.container2}>
                    <View style={styles.flex22}>
                        {renderGift()}
                    </View>
                    <View style={styles.flex11}>
                        <TouchableOpacity onPress={() => setModalOpenn(true)}>
                            <View style={{}}>
                                <MaterialIcons name='expand-more' size={hp('3%')} color="white" />
                            </View>
                        </TouchableOpacity>
                        <MaterialIcons style={{}} name='expand-more' size={hp('3%')} color="white" />
                    </View>
                    <View style={styles.flex33}>
                       
                        <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='mode-edit' size={hp('3.1%')} color="white" />
                        <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='delete-outline' size={hp('3.5%')} color="white" />
                    </View>
                </LinearGradient>
            </Pressable >
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    DoneText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#fafafa',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    modalViewH: {
        width: 310,
        height: 270,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "red",
        shadowOffset: {
            width: 310,
            height: 209
        },
        shadowOpacity: 0.25,
        shadowRadius: 0,
        elevation: 0
    },
    picSize: {

        marginLeft: 10,
        marginTop: 20,
        height: 150,
        width: 110,
        borderRadius: 14,
        alignItems: 'center'

    },
    flex33: {
        flex: .9,
        marginVertical:25,
        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    flex22: {
        flex: 3.5,
    },
    flex11: {
        marginRight: 20,
        marginVertical: 20,
        flex: .5,
        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    flex3: {
        flex: 1.5,
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
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    container: {
        flex: 1,
        height: moderateScale(165),
        width: moderateScale(318),
        marginVertical: 30,
        marginRight: 0,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,
    },
    container2: {
        flex: 1,
        height: moderateScale(165),
        width: moderateScale(318),
        marginVertical: 30,
        marginRight: 30,
        flexDirection: "row",
        borderRadius: moderateScale(18),
        marginLeft: 20,
    },
    cardTextHead: {
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",

        fontSize: 18,
        marginLeft: 25,
        marginTop: moderateScale(18, 0.1)
    },
    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: 7,
        marginLeft: 25
    },
    cardText2: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 25
    },
});

export default ProfileDetailsCard;