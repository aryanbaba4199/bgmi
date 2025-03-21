import { View, ScrollView, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Title, Paragraph } from 'react-native-paper';

const Privacy = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Title style={styles.title}>Privacy and Policy</Title>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Paragraph style={styles.sectionText}>
          At BGMI Tournament, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy Policy
          outlines how we collect, use, and safeguard your data when you use our
          platform.
        </Paragraph>
      </View>

      {/* Data Collection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Collection</Text>
        <Paragraph style={styles.sectionText}>
          We collect the following information from our users:
        </Paragraph>
        <Paragraph style={styles.sectionText}>
          - Name
          {'\n'}- Email Address
          {'\n'}- BGMI ID
          {'\n'}- Mobile Number
          {'\n'}- Tournament Participation Details
        </Paragraph>
      </View>

      {/* Data Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Usage</Text>
        <Paragraph style={styles.sectionText}>
          The data we collect is used for the following purposes:
        </Paragraph>
        <Paragraph style={styles.sectionText}>
          - To create and manage your account.
          {'\n'}- To facilitate tournament participation.
          {'\n'}- To communicate with you regarding updates, rewards, and support.
          {'\n'}- To improve our platform and services.
        </Paragraph>
      </View>

      {/* Data Protection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Protection</Text>
        <Paragraph style={styles.sectionText}>
          We take the following measures to protect your data:
        </Paragraph>
        <Paragraph style={styles.sectionText}>
          - Encryption of sensitive data.
          {'\n'}- Regular security audits.
          {'\n'}- Restricted access to personal information.
          {'\n'}- Compliance with Indian data protection laws.
        </Paragraph>
      </View>

      {/* User Rights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Rights</Text>
        <Paragraph style={styles.sectionText}>
          As a user, you have the following rights:
        </Paragraph>
        <Paragraph style={styles.sectionText}>
          - Access your personal data.
          {'\n'}- Request correction of inaccurate data.
          {'\n'}- Request deletion of your data.
          {'\n'}- Withdraw consent for data processing.
        </Paragraph>
      </View>

      {/* No Discrimination */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Discrimination</Text>
        <Paragraph style={styles.sectionText}>
          At BGMI Tournament, we believe in playing with talent, not distinction.
          We comply with Indian laws, including the Constitution of India, which
          prohibits discrimination based on caste, religion, gender, or any other
          grounds. Our platform is open to all players who wish to showcase their
          skills in a fair and competitive environment.
        </Paragraph>
      </View>

      {/* No Spam or Data Sharing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Spam or Data Sharing</Text>
        <Paragraph style={styles.sectionText}>
          We respect your privacy and will never share your personal data with
          third parties without your consent. Additionally, we do not engage in
          spam activities. Any communication from us will be relevant to your
          participation in tournaments or platform updates.
        </Paragraph>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Paragraph style={styles.sectionText}>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at:
        </Paragraph>
        <Paragraph style={styles.sectionText}>
          Email: support@bgmitournament.com
          {'\n'}Phone: +91-9835776768
        </Paragraph>
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
  title: {
    color: '#FF5733',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
});

export default Privacy;