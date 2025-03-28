import { View, Text, SafeAreaView, StyleSheet, Dimensions, TextInput, Alert, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../FireBaseDB/firebaseConfig';
const {width,height} = Dimensions.get('window');
import AntDesign from '@expo/vector-icons/AntDesign';
const Home = () => {

const [search,setSearch] = useState("");
const [allusers,setAllUsers] = useState([]);

const handleGetUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users")); 
      let usersList = [];
  
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() }); 
      });
  
      setAllUsers(usersList);
      console.log("All Users: ", usersList);
    } catch (error) {
      Alert.alert("Failed to get users, check your connection!");
      console.error("Error fetching users:", error);
    }
  };
  
useEffect(()=>{
    handleGetUsers();
},[])




  return (
    <SafeAreaView style={styles.container}>
<View style={{marginLeft:width*0.05,marginTop:height*0.065}}>
<Text style={{fontSize:27,fontWeight:"700",color:"#262626"}}>Messages</Text>

<View style={{marginTop:height*0.035}}>
<TextInput placeholder='Search' onChangeText={(e)=>setSearch(e)} keyboardType='default' style={styles.inputField}/>
<FlatList 
data={allusers}
style={{marginTop:25}}
renderItem={({item})=>(
    <TouchableOpacity style={{marginBottom:20}}>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
    <Image source={{uri:item.ProfilePic}} style={{width:width*0.18,height:height*0.09 , resizeMode:"cover",borderRadius:55}} />
        <Text style={{bottom:10,marginLeft:width*0.05,fontWeight:"500"}}>{item.fname}</Text>
    </View>
    </TouchableOpacity>
)}


/>

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
inputField:{
width:width*0.9,
height:height*0.07,
backgroundColor:"#d4d6d5",
borderRadius:10,
paddingHorizontal:10,
}
})
export default Home