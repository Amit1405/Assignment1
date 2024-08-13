/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import ActionListScreen from './components/ActionListScreen';

function App(){
  const Stack = createNativeStackNavigator();

  const callActions=(navigation)=>{
    navigation.navigate("Home")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}
        options={({ route, navigation }) => ({
          title: "SCRATCH",
          headerStyle: {
            backgroundColor: "dodgerblue"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
        })}
        />
        <Stack.Screen name='action-list' component={ActionListScreen}
        options={({ route, navigation }) => ({
          title: "SCRATCH",
          headerStyle: {
            backgroundColor: "dodgerblue"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerRight: () => (
            <TouchableOpacity onPress={()=>callActions(navigation)}>
              <Text style={{color:"white"}}>Done</Text>
            </TouchableOpacity>
          )
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
