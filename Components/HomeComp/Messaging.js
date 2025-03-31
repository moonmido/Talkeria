import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const {width,height} = Dimensions.get("window");
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRoomId } from '../../CommonsFuncs/Common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../FireBaseDB/firebaseConfig';
const Messaging = ({route}) => {
    const {profilePic} = route.params;
    const {username} = route.params;
    const {userId} = route.params;
const [messages,setMessages] = useState([]);
const [inputMessage, setInputMessage] = useState('');
const [myIdd, setMyIdd] = useState('');

const navigation = useNavigation();




const CreateRoomIdIfNotExist=async()=>{
const myId = await AsyncStorage.getItem("userID");
setMyIdd(myId);
let roomId = getRoomId(myId,userId);

await setDoc(doc( db,"rooms",roomId),{
    roomId,
    CreatedAt : Timestamp.fromDate(new Date())
})

}

useEffect(()=>{
CreateRoomIdIfNotExist();
handleRecieveMsg();
},[])




const handleSendMsg = async() =>{
    const myId = await AsyncStorage.getItem("userID");

    try {
        

    let roomId = getRoomId(myId,userId);
    if(inputMessage.length==0){
        return;
    }
    const msgRef = collection(doc(db,"rooms",roomId),"messages");

    await addDoc(msgRef,{
messages: inputMessage,
        msgFromId : myId,
        msgToId : userId,
        CreatedAt : Timestamp.fromDate(new Date())
    })
console.log("sended correctly")
setInputMessage("");
} catch (error) {
        console.log(error);
}


}


const handleRecieveMsg = async() =>{
const myId = await AsyncStorage.getItem("userID");
const roomId = getRoomId(myId,userId);
try {
    
const MsgRef = collection(doc(db,"rooms",roomId),"messages");
const q = query(MsgRef,orderBy("CreatedAt","asc"));

let uns = onSnapshot(q,(snapshot)=>{
 let AllMsg = snapshot.docs.map((docs)=>{
    return docs.data();
 });
 setMessages([...AllMsg]);
});
return uns;
} catch (error) {
    console.log(error);
}

}






console.log("All Data : ",messages)

  return (
    <SafeAreaView style={{width:width,height:height}}>
<ScrollView>
<View style={{display:"flex",flexDirection:"row",alignItems:"center",padding:15,borderBottomWidth:0.2,elevation:80,shadowColor:"black",marginTop:height*0.05}}>

<TouchableOpacity style={{width:width*0.09}} onPress={()=>navigation.navigate("home")}>
<AntDesign name="back" size={24} color="black" />
</TouchableOpacity>
<Image source={{uri:profilePic}} style={{width:width*0.16,height:height*0.08,borderRadius:55,marginLeft:15}}/>
<Text style={{left:width*0.05,fontWeight:"800"}}>{username.length >12 ? username.slice(0,12)+".." : username }</Text>
<TouchableOpacity style={{width:width*0.09,position:"absolute",right:width*0.05}}>
<MaterialIcons name="call" size={24} color="black" />
</TouchableOpacity>

</View>
{
    Array.isArray(messages) && messages.map((item, index) => {
        if(item.msgFromId==myIdd){
            return (
                <View key={index} style={{marginLeft:width*0.45,marginTop:20,width:width*0.5}}>
    <Text style={{backgroundColor:"#7fdf88",paddingHorizontal:7,borderRadius:70,textAlign:"center",paddingVertical:10}}>{item.messages}</Text>
</View>
            )
        }else {
            return (
                <View  key={index} style={{marginTop:20,width:width*0.5,marginLeft:15}}>
    <Text style={{backgroundColor:"#82d1e0",paddingHorizontal:7,borderRadius:70,textAlign:"center",paddingVertical:10}}>{item.messages}</Text>
</View>

            )
        }
    })
}
</ScrollView>
<View style={{display:"flex",flexDirection:"row",marginBottom:25,alignItems:"center"}}>
<TextInput onSubmitEditing={handleSendMsg} value={inputMessage} onChangeText={setInputMessage} keyboardType='default' placeholder='Enter Message......' style={{marginLeft:width*0.05,width:width*0.88,height:height*0.08,borderRadius:17,paddingHorizontal:18,borderWidth:0.4,position:"absolute"}} />

</View>

    </SafeAreaView>
  )
}

export default Messaging