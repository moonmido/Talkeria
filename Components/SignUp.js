import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {auth,createUserWithEmailAndPassword,db,doc,setDoc} from '../FireBaseDB/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get("window");

const SignUp = () => {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [fname,setFname] = useState("");

const navigation = useNavigation();

const handleSignUp = async () => {
    try {
      const userCre = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCre.user;
  
      
      await setDoc(doc(db, "Users", user.uid), {
        email: email,
        fname: fname,
      });
  
      Alert.alert("Sign-up Successful!");
      navigation.navigate("signin");
  
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Account Already Exist");
    }
  };
  












  return (
<SafeAreaView style={Styles.container}>
<View>
    <Image style={Styles.img} source={{uri:"https://i.pinimg.com/736x/2b/76/fb/2b76fb6d084eafc664b57f3658e12ffa.jpg"}}/>

<View style={Styles.main_signin}>
<Text style={{fontSize:25,fontWeight:"700"}}>Sign up</Text>

<View style={Styles.main_inputFields}>
<Text style={Styles.labels}>Full Name</Text>
<TextInput placeholder='Enter Full Name' onChangeText={(e)=>setFname(e)}  keyboardType='name-phone-pad' style={Styles.inpFields}/>

<Text style={Styles.labels}>Email</Text>
<TextInput placeholder='Enter Email' onChangeText={(e)=>setEmail(e)}  keyboardType='email-address' style={Styles.inpFields}/>
<Text style={Styles.labels}>Password</Text>
<TextInput placeholder='Enter Password' onChangeText={(e)=>setPassword(e)}  keyboardType='visible-password' style={Styles.inpFields}/>

<TouchableOpacity style={Styles.SignInBtn} onPress={handleSignUp}>
    <Text style={Styles.TextBtn}>Sign up</Text>
</TouchableOpacity>

<TouchableWithoutFeedback style={{marginTop:10}} onPress={()=>navigation.navigate("signin")}>
    <Text style={{color:"#262626",fontWeight:"700"}}>You have an account? Sign in here</Text>
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
    height:height*0.25,
    width:"100%",
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,

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
export default SignUp