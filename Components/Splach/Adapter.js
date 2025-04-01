import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplachComp from './SplachComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../HomeComp/Home';
import SignIn from '../SignIn';

const Adapter = () => {
    const [spla, setSpla] = useState(true);
    const [userTest, setUserTest] = useState(null);
    const [loading, setLoading] = useState(true); // To wait for AsyncStorage

  const userId = AsyncStorage.getItem("userID");
  useEffect(() => {
    // Fetch userID from AsyncStorage
    const fetchUserID = async () => {
      try {
        const userID = await AsyncStorage.getItem("userID");
        setUserTest(userID); // Store userID in state
      } catch (error) {
        console.log("Error fetching userID:", error);
      }
      setLoading(false); // Stop loading once we get the userID
    };

    fetchUserID();

    // Hide splash after 1.5s
    const timer = setTimeout(() => {
      setSpla(false);
    }, 2500);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const handleSwitch = () => {
    if (loading || spla) {
      return <SplachComp />; // Show splash while loading
    } else if (userTest) {
      return <Home />; // If user is signed in, go to Home
    } else {
      return <SignIn />; // Otherwise, show Sign-in
    }
  };

  return <View style={{ flex: 1 }}>{handleSwitch()}</View>;
}

export default Adapter