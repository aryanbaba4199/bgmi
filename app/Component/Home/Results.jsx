import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import TournamentCard from './MatchCard';
import {activityApi, getterFunction} from '../../Api';
import {ScrollView, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Upcoming = () => {
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUpcomingMatch();
  }, []);

  const getUpcomingMatch = async () => {
    setRefreshing(true);
    try {
      const res = await getterFunction(`${activityApi.matchesTypes}/finished`);
      console.log('res is ', res);
      setMatches(res);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
      console.error('Error in getting upcoming match', e);
    }
  };

  return (
    <>
      {refreshing ? (
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
            <RefreshControl
              onRefresh={getUpcomingMatch}
              refreshing={refreshing}
            />
          }>
          <View>
            {matches.map((match, index) => (
              <TournamentCard match={match} />
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Upcoming;
