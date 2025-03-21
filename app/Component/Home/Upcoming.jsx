import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import TournamentCard from './MatchCard';
import {activityApi, getterFunction} from '../../Api';
import {ScrollView, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import JoinForm from './JoinForm';

const Upcoming = () => {
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false)
  const [showJoinForm, setShowJoinForm] = useState(null)

  useEffect(() => {
    getUpcomingMatch();
  }, []);

  const getUpcomingMatch = async () => {
    setLoader(true);
    try {
      const res = await getterFunction(`${activityApi.matchesTypes}/upcoming`);
      console.log('res is ', res);
      setMatches(res);
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.error('Error in getting upcoming match', e);
    }
  };
  console.log('hi')

  return (
    <>
      {loader ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
           
          }}>
          <ActivityIndicator animating color="#15892e" size={60} />
        </View>
      ) : (
        <>
        {showJoinForm ? 
        <JoinForm match={showJoinForm} handleClose={()=>setShowJoinForm(null)}/>
        :
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={getUpcomingMatch}
              refreshing={refreshing}
            />
          }>
          <View style={{
            marginBottom : 60,
          }}>
            {matches.map((match, index) => (
              <TournamentCard match={match} setShowJoinForm={setShowJoinForm} />
            ))}
          </View>
        </ScrollView>
}
        </>
      )}
    </>
  );
};

export default Upcoming;
