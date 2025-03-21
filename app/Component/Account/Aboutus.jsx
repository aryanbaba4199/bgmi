import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For icons

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/8a/c4/89/8ac48944090da5fa9bd6964711addcf7.jpg',
          }}
          style={styles.logo}
        />
        <Title style={styles.title}>BGMI Tournament</Title>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to BGMI Tournament!</Text>
        <Paragraph style={styles.sectionText}>
          BGMI Tournament is a platform where players can compete in thrilling
          Battlegrounds Mobile India (BGMI) tournaments. Whether you're a solo
          player or part of a team, we provide a fair and exciting environment
          for everyone to showcase their skills.
        </Paragraph>
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Paragraph style={styles.sectionText}>
          Our mission is to create a competitive and fun gaming experience for
          BGMI players. We aim to bring together the best players and teams,
          providing them with a platform to compete, grow, and win amazing
          prizes.
        </Paragraph>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <Icon name="account-plus" size={24} color="#FF5733" />
            <Text style={styles.stepText}>1. Register on the platform.</Text>
          </View>
          <View style={styles.step}>
            <Icon name="tournament" size={24} color="#FF5733" />
            <Text style={styles.stepText}>2. Join a tournament.</Text>
          </View>
          <View style={styles.step}>
            <Icon name="gamepad-variant" size={24} color="#FF5733" />
            <Text style={styles.stepText}>3. Play and compete.</Text>
          </View>
          <View style={styles.step}>
            <Icon name="trophy" size={24} color="#FF5733" />
            <Text style={styles.stepText}>4. Win amazing prizes!</Text>
          </View>
        </View>
      </View>

      {/* Prizes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prizes</Text>
        <Paragraph style={styles.sectionText}>
          The winning team of each tournament will receive a cash prize. The
          prize amount varies depending on the tournament. Stay tuned for
          exciting rewards and giveaways!
        </Paragraph>
      </View>

      {/* Contact Us */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactItem}>
            <Icon name="email" size={20} color="#FF5733" />
            <Text style={styles.contactText}>support@bgmitournament.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="phone" size={20} color="#FF5733" />
            <Text style={styles.contactText}>+91-9835776768</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010221',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FF5733',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  stepsContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  contactContainer: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AboutUs;