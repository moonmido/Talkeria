import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ChoosePic from './Components/HomeComp/ChoosePic';
import Home from './Components/HomeComp/Home';
import Messaging from './Components/HomeComp/Messaging';
import Adapter from './Components/Splach/Adapter';

export default function App() {

const Stack = createStackNavigator();

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName='splach'>
  <Stack.Screen name='signin' component={SignIn} options={{headerShown:false}}/>
  <Stack.Screen name='signup' component={SignUp} options={{headerShown:false}}/>
  <Stack.Screen name='choosepic' component={ChoosePic} options={{headerShown:false}}/>
  <Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
  <Stack.Screen name='messaging' component={Messaging} options={{headerShown:false}}/>
  <Stack.Screen name='splach' component={Adapter} options={{headerShown:false}}/>



</Stack.Navigator>

</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
