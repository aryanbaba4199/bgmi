import {View, Text, Alert, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getterFunction, userApi} from '../../Api';
import MyMatchCard from './MyMatchCard';
import {ActivityIndicator} from 'react-native-paper';

const MyMatches = () => {
  const [myData, setMyData] = useState({matches: [], bookings: []});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMyMatches();
  }, []);

  const getMyMatches = async () => {
    setLoading(true);
    try {
      const res = await getterFunction(userApi.mymatch);
      setMyData(res);
      console.log('My matches:', res);
    } catch (e) {
      console.error('Error in getting my matches:', e);
      Alert.alert('Error', 'Failed to fetch matches. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <ActivityIndicator animating color="#15892e" size={60} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getMyMatches} />
          }>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
            }}>
            <Text
              onPress={getMyMatches}
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginVertical: 10,
                backgroundColor: '#001F3F',
                width: 200,
                color: 'white',
                paddingVertical: 2,
                borderRadius: 20,
              }}>
              My Matches
            </Text>
          </View>
          {myData.matches.map((match, index) => {
            const booking = myData.bookings[index]; // Get the corresponding booking
            return (
              <MyMatchCard
                key={match._id} // Use match ID as the key
                match={match}
                booking={booking}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default MyMatches;
