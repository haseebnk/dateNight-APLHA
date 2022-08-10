import React, { useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    Text,
    View, Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesContext } from "../context/NotesContext";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import AppContext from '../components/appcontext';
import axiosconfig from '../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CoupleCard({ navigation, otherpersons }) {

    // const { state } = useContext(NotesContext)
    const [chooseDate, setChooseDate] = React.useState(false);
    const [checkedd, setCheckedd] = React.useState(false);
    const { state, dispatch } = useContext(NotesContext);
    const [rendre, setRende] = useState([])
    const myContext = useContext(AppContext);

    useEffect(() => {

    }, [])


    const OnRemove = () => {

    }

    const setDateChosen = (item) =>{
        console.log(item)
        myContext.setdate_person_id(item.id)
        setChooseDate(item.id)
    }

    return (
        <View style={{ marginTop: 30 }}>
            <FlatList
                horizontal={true}
                data={otherpersons}
                keyExtractor={item => item.id}
                renderItem={({ item, i }) => {
                    return (
                        <View style={styles.container2}>
                            {console.log(item?.color2)}
                            <LinearGradient style={styles.withBorder}
                                colors={[item?.color1, item?.color2]}
                                title="Welcome">
                                <View style={styles.flex1}>
                                    <Image style={styles.picSize} source={{ uri: item.image }}></Image>
                                </View>
                                <View style={styles.flex2}>
                                    <View style={{ flexDirection: 'column', marginTop: 20, }}>
                                        <Text style={styles.cardTextHead}>{item.name} </Text>
                                        <Text style={styles.cardText}>Phone:  {item.phone}</Text>
                                        <Text style={styles.cardText}>Email:  {item.email}</Text>
                                        <Text style={styles.cardText}>Date of Birth: {item.dob}</Text>
                                    </View>
                                </View>
                                <View style={styles.flex3}>
                                    <TouchableOpacity onPress={() => setDateChosen(item)}
                                        style={{ marginTop: moderateScale(13, 0.1), height: moderateScale(35), width: moderateScale(35), borderRadius: moderateScale(20), backgroundColor: myContext.date_person_id == item.id ? '#00B712' : 'white', borderWidth: 5.2, borderColor: 'white' }} >
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("choosedate", { type: 'Add Date Info', con: 'date' })}
                                    >

                                        <MaterialIcons style={{ marginLeft: 7, marginBottom: 0 }} name='mode-edit' size={hp('4%')} color="white" />

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => OnRemove()}>
                                        <MaterialIcons style={{ marginLeft: 7, marginBottom: 25 }} name='delete-outline' size={hp('4%')} color="white" />
                                    </TouchableOpacity>
                                </View>

                            </LinearGradient>
                        </View>
                    )
                }}
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container2: {
        flex: 1,

        height: moderateScale(185),
        width: moderateScale(324),
        // marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),
    },

    withOutBorder:
    {
        marginHorizontal: 4,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 38,
        height: 38,
        color: "White",
    }
    ,

    withBorder:
    {
        borderRadius: moderateScale(18),
        height: moderateScale(185),
        width: moderateScale(324),
        alignSelf: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,

    },

    input: {
        height: 50,
        alignSelf: "center",
        backgroundColor: 'white',
        width: '80%',
        margin: 10,

    },

    picSize: {

        marginLeft: 3,

        height: 140,
        width: 100,
        borderRadius: 14,

    },
    flex3: {
        flex: .9,

        borderRadius: moderateScale(18),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    flex2: {
        flex: 3,

    },
    flex1: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(18),
    },

    container: {
        flex: 1,
        backgroundColor: '#F11775',
        height: moderateScale(185),
        width: moderateScale(324),
        marginVertical: 35,
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: moderateScale(18),


    },


    cardTextHead: {
        color: 'white',
        fontFamily: Platform.OS === 'ios' ? "Gazpacho" : "Gazpacho Regular",
        fontSize: 18,
        marginLeft: moderateScale(3),
        alignSelf: 'center'

    },
    cardText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        marginLeft: 2,
        marginTop: 16,
    },

});

export default CoupleCard;