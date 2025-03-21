import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PaperProvider, TextInput, Button, Snackbar, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'react-native-jwt-io';

// Import screens
import Home from './Component/Home/Home';
import Wallet from './Component/Wallet/MyMatches';
import AccountRoute from './Component/Account/AccountRoute';
import { Image, View } from 'react-native';
import { posterFunction, userApi } from './Api';
import Toast from 'react-native-toast-message';
import { useApp } from './Context/AppContext';


// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Login/Signup Component
const LoginSignup = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bgmiId: '',
    mobile: '',
    bgmiName : '',
  });
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const {setUser} = useApp()

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = isSignUp ? formData : { email: formData.email, password: formData.password };
      // Replace with your API call
      const token = await posterFunction(isSignUp ? userApi.signUp : userApi.logIn, data)
      await AsyncStorage.setItem('token', token);
     
      setIsAuthenticated(true);
      setSnackbarMessage('Authentication Successful');
      setSnackbarVisible(true);
    } catch (e) {
      setSnackbarMessage('Authentication Failed');
      setSnackbarVisible(true);
      console.error('Error in submission:', e);
    }
  };

  return (
    <PaperProvider>
      
        <View style={styles.container}>
          <Image
          width={200}
          height={200}
          style={{
            borderRadius : 100,
            alignSelf : 'center',
            marginBottom : 20,
          }}
          source={{uri : 'https://i.pinimg.com/736x/8a/c4/89/8ac48944090da5fa9bd6964711addcf7.jpg'}}
          />
          {/* <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text> */}
          <Text style={styles.title}>BGMI Tournaments
            
          </Text>
          {isSignUp && (
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
              left={<TextInput.Icon name="account" />}
            />
          )}
          {isSignUp && (
            <TextInput
              label="BGMI ID"
              value={formData.bgmiId}
              onChangeText={(text) => handleChange('bgmiId', text)}
              style={styles.input}
              left={<TextInput.Icon name="id-card" />}
            />
          )}
          {isSignUp && (
            <TextInput
              label="BGMI Name"
              value={formData.bgmiName}
              onChangeText={(text) => handleChange('bgmiName', text)}
              style={styles.input}
              left={<TextInput.Icon name="id-card" />}
            />
          )}
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            style={styles.input}
            left={<TextInput.Icon name="email" />}
            keyboardType="email-address"
          />
          {isSignUp && (
            <TextInput
              label="Mobile Number"
              value={formData.mobile}
              onChangeText={(text) => handleChange('mobile', text)}
              style={styles.input}
              left={<TextInput.Icon name="phone" />}
              keyboardType="phone-pad"
            />
          )}
          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            style={styles.input}
            secureTextEntry
            left={<TextInput.Icon name="lock" />}
          />
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
            <Text
              style={styles.switchLink}
              onPress={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? ' Login' : ' Sign Up'}
            </Text>
          </Text>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      
    </PaperProvider>
  );
};

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useFocusEffect(
    React.useCallback(  () => {
    verifyUser('Aryan@7277984199');
  }, [])
)

  const verifyUser = async (secret) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwt.decode(token, secret);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error('Error in verification:', e);
      setIsAuthenticated(false);
    }
  };

  return (
    <PaperProvider>
      <Toast/>
        {isAuthenticated ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'My Matches') iconName = 'wallet';
                else if (route.name === 'Account') iconName = 'user-circle';
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FF5733',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: { backgroundColor: '#010221', paddingBottom: 5 },
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="My Matches" component={Wallet} />
            <Tab.Screen name="Account" component={AccountRoute} />
          </Tab.Navigator>
        ) : (
          <LoginSignup setIsAuthenticated={setIsAuthenticated} />
        )}
    
    </PaperProvider>
  );
};

// Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop : 5,
    backgroundColor: '#010221',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FF5733',
  },
  switchText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  switchLink: {
    color: '#FF5733',
    fontWeight: 'bold',
  },
};

export default App;