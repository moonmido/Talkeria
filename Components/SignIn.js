import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {auth, db, signInWithEmailAndPassword} from '../FireBaseDB/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';

const {width,height} = Dimensions.get("window");

const SignIn = () => {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigation = useNavigation();

const handleSignin = async()=>{
    try {
        const userCre = signInWithEmailAndPassword(auth,email,password);
        const user = (await userCre).user;
        await AsyncStorage.setItem("userID",user.uid)
        const userref = await getDoc(doc(db,"Users",user.uid));
        if (userref.data().ProfilePic !=null) navigation.navigate("home");
        else  navigation.navigate("choosepic");
    } catch (error) {
        console.error(error);
        Alert.alert("Email or Password Are Wrong !")
    }


}



  return (
<SafeAreaView style={Styles.container}>
<View>
    <Image style={Styles.img} source={{uri:"https://i.pinimg.com/736x/2b/76/fb/2b76fb6d084eafc664b57f3658e12ffa.jpg"}}/>

<View style={Styles.main_signin}>
<Text style={{fontSize:25,fontWeight:"700"}}>Sign in</Text>

<View style={Styles.main_inputFields}>
<Text style={Styles.labels}>Email</Text>
<TextInput placeholder='Enter Email' onChangeText={(e)=>setEmail(e)}  keyboardType='email-address' style={Styles.inpFields}/>
<Text style={Styles.labels}>Password</Text>
<TextInput placeholder='Enter Password' onChangeText={(e)=>setPassword(e)}  keyboardType='visible-password' style={Styles.inpFields}/>

<TouchableOpacity style={Styles.SignInBtn} onPress={handleSignin}>
    <Text style={Styles.TextBtn}>Sign in</Text>
</TouchableOpacity>

<TouchableWithoutFeedback style={{marginTop:10}} onPress={()=>navigation.navigate("signup")}>
    <Text style={{color:"#262626",fontWeight:"700"}}>Don't have an account? Sign up here</Text>
</TouchableWithoutFeedback>

</View>



</View>

</View>


</SafeAreaView>

)
}



const Styles = StyleSheet.create({
container:{
    flex:1,
    width:width,
    height:height
},
img:{
    height:height*0.4,
    width:"100%",
    borderBottomRightRadius:45,
    borderBottomLeftRadius:45,

},
main_signin:{
    margin:20
},
main_inputFields:{
    marginTop:height*0.03,
},
labels:{
    fontWeight:"500",
    paddingBottom:10
},
inpFields:{
    borderWidth:0.15,
    borderColor:"gray",
    borderRadius:10,
    width:width*0.85,
    height:height*0.07,
    marginBottom:10,
    paddingHorizontal:15,
},
SignInBtn:{
    width:width*0.85,
    height:height*0.08,
    borderRadius:15,
    backgroundColor:"#262626",
    marginTop:height*0.03
},
TextBtn:{
    textAlign:"center",
  color:"white",
  fontWeight:"700",
  marginTop:height*0.02
}
})
export default SignIn