import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../FireBaseDB/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ChoosePic = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null); // Set null instead of empty string

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure only images are picked
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri); // Set the image state first

      const userID = await AsyncStorage.getItem("userID");

      try {
        const userRef = doc(db, "Users", userID);
        const user = await getDoc(userRef);

        if (user.exists()) {
          await updateDoc(userRef, {
            ProfilePic: selectedImageUri, // Use the correct variable here
          });
          console.log("Profile picture updated successfully for ID:", userID);
          navigation.navigate("home");
        }
        console.log("Sent to ID:", userID);
      } catch (error) {
        Alert.alert("There was an error. Check your connection!");
        console.error("Firestore update error:", error);
      }
    } else {
      console.log("Image picking was canceled.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/012/958/124/non_2x/error-application-message-problem-server-flat-line-filled-icon-beautiful-logo-button-over-yellow-background-for-ui-and-ux-website-or-mobile-application-free-vector.jpg",
          }} // Default image if `image` is null
        />

        <View style={styles.main}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#262626" }}>#Profile Picture</Text>

          <View style={{ marginTop: height * 0.03 }}>
            <Text style={{ width: width * 0.9, color: "#262626" }}>
              Choose your profile picture to identify yourself on Talkeria!
            </Text>

            <TouchableOpacity
              style={{ marginTop: height * 0.06, width: width * 0.87, height: height * 0.08, backgroundColor: "#262626", borderRadius: 15 }}
              onPress={pickImage}
            >
              <Text style={{ textAlign: "center", marginTop: height * 0.02, color: "white", fontWeight: "800" }}>
                Select a Picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  img: {
    width: width,
    height: height * 0.6,
  },
  main: {
    marginTop: height * 0.06,
    marginLeft: width * 0.05,
  },
});

export default ChoosePic;
