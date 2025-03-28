import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../FireBaseDB/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

const ChoosePic = () => {

  const navigation = useNavigation();

    const [image, setImage] = useState("");

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }


const userID = await AsyncStorage.getItem("userID");

try {
const user = await getDoc(doc(db,"Users",userID));
if(user.exists()){
   await updateDoc(doc(db,"Users",userID),{
        ProfilePic:image
    });
    console.log("Profile picture updated successfully for ID:", userID);
navigation.navigate("home")
}
console.log("sended to ID : ",userID);
} catch (error) {
   Alert.alert("There Are an Error , Check Your Connection !") 
}


      console.log(result);
  
    };
  

  return (
    <SafeAreaView style={styles.container}>

<View>
    <Image style={styles.img} source={{uri:"https://static.vecteezy.com/system/resources/previews/012/958/124/non_2x/error-application-message-problem-server-flat-line-filled-icon-beautiful-logo-button-over-yellow-background-for-ui-and-ux-website-or-mobile-application-free-vector.jpg"}}/>

<View style={styles.main}>
<Text style={{fontSize:22,fontWeight:"700",color:"#262626"}}>#Profile Picture</Text>

<View style={{marginTop:height*0.03}}>
<Text style={{width:width*0.9,color:"#262626"}}>Choose your profile picture for identify your self on Talkeria !</Text>

<TouchableOpacity style={{marginTop:height*0.06,width:width*0.87,height:height*0.08,backgroundColor:"#262626",borderRadius:15}} onPress={pickImage}>
    <Text style={{textAlign:"center",marginTop:height*0.02,color:"white",fontWeight:"800"}}>Take a Picture</Text>
</TouchableOpacity>

</View>
</View>

</View>


    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
container:{
    flex:1,
    width:width,
    height:height
},
img:{
    width:width,
    height:height*0.6
},
main:{
    marginTop:height*0.06,
    marginLeft:width*0.05
}


})


export default ChoosePic