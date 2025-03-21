import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For icons
import { getterFunction, posterFunction, updaterFunction, userApi } from '../../Api';
import { useNavigation } from '@react-navigation/native';
const UpdateProfile = () => {
    const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bgmiId, setBgmiId] = useState('');
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();

  useEffect(()=>{
    getMyDetails();
  }, [])

  const getMyDetails = async () => {
      try {
        const res = await getterFunction(userApi.myProfile);
        setName(res.name);
        setEmail(res.email);
        setBgmiId(res.bgmiId);
        setMobile(res.mobile);
      } catch (e) {
        console.error('Error in getting my profile', e);
      }
    };

  const handleUpdateProfile = async() => {
    const formData = {name, email, bgmiId, mobile}
    try{
        const res = await updaterFunction(userApi.updateProfile, formData)
        Alert.alert('Profile Updated')
        navigation.goBack()
    }catch(e){
        Alert.alert(JSON.stringify(e))
        console.error('Error in upding profile', e)
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Title style={styles.title}>Update Profile</Title>

      {/* Name Input */}
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon name={() => <Icon name="account" size={20} color="#001F3F" />} />}
      />

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        left={<TextInput.Icon name={() => <Icon name="email" size={20} color="#001F3F" />} />}
      />

      {/* BGMI ID Input */}
      <TextInput
        label="BGMI ID"
        value={bgmiId}
        onChangeText={setBgmiId}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        left={<TextInput.Icon name={() => <Icon name="gamepad-variant" size={20} color="#001F3F" />} />}
      />

      {/* Mobile Input */}
      <TextInput
        label="Mobile"
        value={mobile}
        onChangeText={setMobile}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
        left={<TextInput.Icon name={() => <Icon name="phone" size={20} color="#001F3F" />} />}
      />

      {/* Update Button */}
      <Button
        mode="contained"
        onPress={handleUpdateProfile}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Update Profile
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010221',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    color : 'white',
    paddingVertical : 5,
  },
  button: {
    backgroundColor: '#FF5733',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateProfile;