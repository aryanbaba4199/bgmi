import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getterFunction, userApi } from '../../Api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const getMyDetails = async () => {
    try {
      const res = await getterFunction(userApi.myProfile);
      setProfile(res);
    } catch (e) {
      console.error('Error in getting my profile', e);
    }
  };

  useEffect(() => {
    getMyDetails();
  }, []);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.goBack();
    } catch (e) {
      console.error('Error in log out', e);
    }
  };

  // Options for the profile actions
  const profileOptions = [
    { id: 1, title: 'Update Profile', icon: 'account-edit', screen: 'UpdateProfile' },
    { id: 2, title: 'Transactions', icon: 'cash', screen: 'Transactions' },
    { id: 3, title: 'Raise a Ticket', icon: 'ticket', screen: 'RaiseTicket' },
    { id: 4, title: 'About Us', icon: 'information', screen: 'Aboutus' },
    { id: 5, title: 'Privacy Policy', icon: 'shield', screen: 'Privacy' },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getMyDetails} />
      }
      style={styles.container}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/8a/c4/89/8ac48944090da5fa9bd6964711addcf7.jpg',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileTitle}>BGMI Tournament</Text>
      </View>

      {/* Profile Stats */}
      <Card style={styles.card}>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statLabel}>Name</Text>
            <Text style={styles.statValue}>{profile?.name || 'Loading...'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statLabel}>BGMI ID</Text>
            <Text style={styles.statValue}>{profile?.bgmiId || 'Loading...'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statLabel}>Participated</Text>
            <Text style={styles.statValue}>{profile?.participated || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statLabel}>Wins</Text>
            <Text style={styles.statValue}>{profile?.wins || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statLabel}>Ranked</Text>
            <Text style={styles.statValue}>{profile?.mom || 0}</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Profile Actions */}
      <View style={styles.actionsContainer}>
        {profileOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.actionButton}
            onPress={() => navigation.navigate(option.screen)}
          >
            <Icon name={option.icon} size={24} color="red" style={styles.actionIcon} />
            <Text style={styles.actionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <Button
        onPress={handleLogOut}
        mode="contained"
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      >
        Log Out
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#001F3F',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#002A4D',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  statLabel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionIcon: {
    marginRight: 15,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom : 50,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;