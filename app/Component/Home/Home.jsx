import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Results from './Results';


const Home = () => {
  const [tab, setTab] = useState(0); // Default to tab 0 (Upcoming)

  const renderComponent = () => {
    switch (tab) {
      case 0:
        return <Upcoming />;
      case 1:
        return <Ongoing />;
      case 2:
        return <Results />;
      default:
        return null;
    }
  };

  return (
    <>

      <View style={styles.tabContainer}>
        <Text
          onPress={() => setTab(0)}
          style={[styles.tab, tab === 0 ? styles.activeTab : styles.inactiveTab]}
        >
          Up Coming
        </Text>
        <Text
          onPress={() => setTab(1)}
          style={[styles.tab, tab === 1 ? styles.activeTab : styles.inactiveTab]}
        >
          On Going
        </Text>
        <Text
          onPress={() => setTab(2)}
          style={[styles.tab, tab === 2 ? styles.activeTab : styles.inactiveTab]}
        >
          Results
        </Text>
      </View>
      <View style={styles.contentContainer}>
        {renderComponent()}
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  activeTab: {
    backgroundColor: '#010221',
  },
  inactiveTab: {
    backgroundColor: '#09023b',
  },
  contentContainer: {
    backgroundColor: '#010221',
    minHeight: '100%',
  },
});

export default Home;