import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import AboutUs from './Aboutus'
import Privacy from './Privacy'
import Transaction from './Transaction'

const AccountRoute = () => {
  const [token, setToken] = useState()
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} options={{headerShown : false}}/>
      <Stack.Screen name='UpdateProfile' component={UpdateProfile} options={{headerShown : false}}/>
      <Stack.Screen name='Transaction' component={Transaction} options={{headerShown : false}}/>
      <Stack.Screen name='Aboutus' component={AboutUs} options={{headerShown : false}}/>
      <Stack.Screen name='Privacy' component={Privacy} options={{headerShown : false}}/>
    </Stack.Navigator>
  )
}

export default AccountRoute