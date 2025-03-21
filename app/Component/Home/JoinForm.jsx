// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, Alert, BackHandler, Dimensions } from 'react-native';
// import { TextInput, RadioButton, Button, Text } from 'react-native-paper';
// import { activityApi, getterFunction, posterFunction, userApi } from '../../Api';
// import { useApp } from '../../Context/AppContext';



// const JoinForm = ({ match, handleClose }) => {
//   const [joinType, setJoinType] = useState('solo');
//   const [bgmiName, setBgmiName] = useState('');
//   const [bgmiID, setBgmiID] = useState('');
//   const [whatsappNumber, setWhatsappNumber] = useState('');
//   const [teamName, setTeamName] = useState('');
//   const [teamMembers, setTeamMembers] = useState([
//     { name: '', id: '' },
//     { name: '', id: '' },
//     { name: '', id: '' },
//     { name: '', id: '' },
//   ]);
//   const [selectedSlots, setSelectedSlots] = useState({}); // Track selected slots
//   const [profile, setProfile] = useState(null)
//   const [occupiedSlots, setOccupiedSlots] = useState({}); // Track occupied slots
//   const [totalSlots, setTotalSlots] = useState(match?.rteam??0 * 4); // Total slots based on rteam
//   const {user} = useApp()


//   useEffect(() => {
//     const backAction = () => {
//       handleClose();
//       return true; // Prevent default back action
//     };
  
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );
  
//     return () => backHandler.remove(); // Remove listener on unmount
//   }, []);

//   useEffect(() => {
  
//     getMyDetails()
    

//     fetchOccupiedSlots();
//   }, [match._id]);


//   const getMyDetails = async () => {
//       try {
//         const res = await getterFunction(userApi.myProfile);
//         setProfile(res);
//         setBgmiID(res?.bgmiId)
//         setWhatsappNumber(res?.mobile)
//         setBgmiName(res?.bgmiName)
//       } catch (e) {
//         console.error('Error in getting my profile', e);
//       }
//     };

//     useEffect(()=>{
//       if(joinType==='solo'){
//         setBgmiID(profile?.bgmiId)
//         setWhatsappNumber(profile?.mobile)
//         setBgmiName(profile?.bgmiName)
//       }
//     }, [joinType])

//   const fetchOccupiedSlots = async () => {
//     try {
//       const response = await getterFunction(`${activityApi.bookings}/${match._id}`);
//       console.log("Full Response:", response);
  
//       const occupied = response.reduce((acc, reg, index) => {
//         console.log(`Processing response[${index}]:`, reg.selectedSlots);
        
//         Object.entries(reg.selectedSlots).forEach(([teamIndex, slots]) => {
//           console.log(`Team Index: ${teamIndex}, Slots:`, slots);
          
//           // Ensure merging instead of overwriting
//           acc[teamIndex] = acc[teamIndex] 
//             ? Array.from(new Set([...acc[teamIndex], ...slots])) // Merge and remove duplicates
//             : [...slots]; 
          
//           console.log(`Updated acc[${teamIndex}]:`, acc[teamIndex]);
//         });
  
//         return acc;
//       }, {});
  
//       console.log("Final occupied slots:", occupied);
//       setOccupiedSlots(occupied);
//     } catch (error) {
//       console.error("Error fetching occupied slots:", error);
//     }
//   };

//   // Handle slot selection
//   const handleSlotSelection = (teamIndex, slotIndex) => {
//     if (joinType === 'team') {
//       // For team joining, select all 4 slots in the row and clear previous selections
//       const newSelectedSlots = {};
//       newSelectedSlots[teamIndex] = [0, 1, 2, 3]; // Select all slots in the row
//       setSelectedSlots(newSelectedSlots);
//     } else {
//       // For solo joining, toggle individual slots (up to 4)
//       const newSelectedSlots = { ...selectedSlots };
//       const teamSlots = newSelectedSlots[teamIndex] || [];

//       if (teamSlots.includes(slotIndex)) {
//         // Deselect the slot if it's already selected
//         newSelectedSlots[teamIndex] = teamSlots.filter((index) => index !== slotIndex);
//       } else {
//         // Select the slot if it's not already selected and the total selected slots are less than 4
//         if (Object.values(newSelectedSlots).flat().length < 4) {
//           newSelectedSlots[teamIndex] = [...teamSlots, slotIndex];
//         }
//       }
//       setSelectedSlots(newSelectedSlots);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const data = {
//       matchId: match._id,
//       joinType,
//       bgmiName,
//       bgmiID,
//       whatsappNumber,
//       teamName,
//       teamMembers,
//       selectedSlots,
//       paymentId : 'null', 
//       fee : 0,
//     };
//     if(!bgmiName || !bgmiID){
//       Alert.alert('All Fields are required')
//       return;
//     }

//     try {
//       const response = await posterFunction(activityApi.bookings, data);
//       console.log('Registration successful:', data);
  
//       Alert.alert('Registration Successful : Please check your email before 10 - 15 minutes of match Start time')
//       handleClose() 
//     } catch (error) {
//       ToastAndroid.show('Something went wrong')
//       Alert.alert('Something went wrong')
//       console.error('Error submitting registration:', error);
//     }
//   };

//   return (
//     <>
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Join Tournament</Text>
//       <RadioButton.Group onValueChange={(value) => {setJoinType(value); 
//         setBgmiID('');
//         setBgmiName('')
//         setTeamMembers('')
//         setSelectedSlots({})
//         setOccupiedSlots({})
//         setTeamMembers([
//           { name: '', id: '' },
//     { name: '', id: '' },
//     { name: '', id: '' },
//     { name: '', id: '' },
//         ])

//       }} value={joinType}>
//         <View style={styles.radioContainer}>
//           <RadioButton.Item labelStyle={{ color: 'white' }} label="Join Solo" value="solo" />
//           <RadioButton.Item labelStyle={{ color: 'white' }} label="Join with Team" value="team" />
//         </View>
//       </RadioButton.Group>

//       {joinType === 'solo' ? (
//         <>
//           <TextInput label="BGMI Name" value={bgmiName} onChangeText={setBgmiName} style={styles.input} />
//           <TextInput label="BGMI ID" value={bgmiID} onChangeText={setBgmiID} keyboardType='number-pad' style={styles.input} />
//         </>
//       ) : (
//         <>
//           <TextInput label="Team Name" value={teamName} onChangeText={setTeamName} style={styles.input} />
//           {teamMembers.map((member, index) => (
//             <View key={index} style={styles.teamMemberContainer}>
//               <TextInput
//                 label={`BGMI Name ${index + 1}`}
//                 value={member.name}
//                 onChangeText={(text) => {
//                   const newMembers = [...teamMembers];
//                   newMembers[index].name = text;
//                   setTeamMembers(newMembers);
//                 }}
//                 style={styles.input}
//               />
//               <TextInput
//                 label={`BGMI ID ${index + 1}`}
//                 value={member.id}
//                 onChangeText={(text) => {
//                   const newMembers = [...teamMembers];
//                   newMembers[index].id = text;
//                   setTeamMembers(newMembers);
//                 }}
//                 keyboardType='number-pad'
//                 style={styles.input}
//               />
//             </View>
//           ))}
//         </>
//       )}

//       <TextInput label="WhatsApp Number" value={whatsappNumber} onChangeText={setWhatsappNumber} keyboardType='number-pad' style={styles.input} />
      
//       <Text style={styles.teamTitle}>Available Teams</Text>
//       <View style={styles.teamGrid}>
//         {Array.from({ length: match.rteam }).map((_, teamIndex) => (
//           <View key={teamIndex} style={styles.teamRow}>
//             {Array.from({ length: 4 }).map((_, slotIndex) => {
//               const isOccupied = occupiedSlots[teamIndex]?.includes(slotIndex);
//               return (
//                 <TouchableOpacity
//                   key={slotIndex}
//                   style={[
//                     styles.slot,
//                     selectedSlots[teamIndex]?.includes(slotIndex) && styles.selectedSlot,
//                     isOccupied && styles.occupiedSlot,
//                   ]}
//                   onPress={() => !isOccupied && handleSlotSelection(teamIndex, slotIndex)}
//                   disabled={isOccupied}
//                 >
//                   <Text style={styles.slotText}>
//                     Team {teamIndex + 1} - Slot {slotIndex + 1}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         ))}
//       </View>
      

//     </ScrollView>
//     <Button mode="contained" onPress={handleSubmit} style={styles.button}>
//     Join
//   </Button>
//   </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#1e1e1e',
//     marginBottom : 60
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'white',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: 15,
//     backgroundColor: 'white',
//   },
//   teamMemberContainer: {
//     marginBottom: 15,
//   },
//   button: {
//     marginTop: 20,
//     marginBottom: 40,
//     position : 'absolute',
//     bottom : 25,
//     alignSelf : 'center',
//     backgroundColor : '#001F3F',
//     paddingHorizontal : 20,
//   },
//   teamTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//     color: 'white',
//   },
//   teamGrid: {
//     flexDirection: 'column',
//     marginBottom : 70,
//   },
//   teamRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   slot: {
//     width: '23%',
//     aspectRatio: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   selectedSlot: {
//     backgroundColor: '#4CAF50',
//     borderColor: '#4CAF50',
//   },
//   occupiedSlot: {
//     backgroundColor: '#FF0000',
//     borderColor: '#FF0000',
//   },
//   slotText: {
//     textAlign: 'center',
//     color: 'black',
//   },
// });

// export default JoinForm;




import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ToastAndroid, Alert, BackHandler } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { activityApi, getterFunction, posterFunction, userApi } from '../../Api';
import { useApp } from '../../Context/AppContext';

const JoinForm = ({ match, handleClose }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [slotsCount, setSlotsCount] = useState(1);
  const [bgmiDetails, setBgmiDetails] = useState([{ name: '', id: '' }]);
  const { user } = useApp();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const backAction = () => {
      handleClose();
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Remove listener on unmount
  }, []);

  useEffect(() => {
    getMyDetails();
  }, [match._id]);

  const getMyDetails = async () => {
    try {
      const res = await getterFunction(userApi.myProfile);
      setProfile(res);
      setMobile(res?.mobile);
      setEmail(res?.email);
      setBgmiDetails([{ name: res?.bgmiName, id: res?.bgmiId }]);
    } catch (e) {
      console.error('Error in getting my profile', e);
    }
  };

  const handleSlotCountChange = (value) => {
    const count = parseInt(value, 10) || 1;
    if(count>4){
      Alert.alert('You can join with 4 players only');
      return;
    }
    setSlotsCount(count);
    setBgmiDetails(Array.from({ length: count }, (_, i) => bgmiDetails[i] || { name: '', id: '' }));
  };

  const handleBgmiDetailChange = (index, field, value) => {
    const newBgmiDetails = [...bgmiDetails];
    newBgmiDetails[index][field] = value;
    setBgmiDetails(newBgmiDetails);
  };

  const handleSubmit = async () => {
    if (!email || !mobile || bgmiDetails.some(detail => !detail.name || !detail.id)) {
      Alert.alert('All fields are required');
      return;
    }

    const data = {
      matchId: match._id,
      email,
      mobile,
      slotsCount,
      bgmiDetails,
      paymentId: 'null',
      fee: 0,
    };

    try {
      console.log(data);
      const response = await posterFunction(activityApi.bookings, data);
      console.log('Registration successful:', data);
      Alert.alert('Registration Successful: Please check your email before 10 - 15 minutes of match start time');
      handleClose();
    } catch (error) {
      ToastAndroid.show('Something went wrong');
      Alert.alert('Something went wrong');
      console.error('Error submitting registration:', error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Join Tournament</Text>

        <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput label="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="number-pad" style={styles.input} />

        <TextInput
          label="Number of Slots"
          value={slotsCount}
          onChangeText={handleSlotCountChange}
          keyboardType="number-pad"
          style={styles.input}
        />

        {bgmiDetails.map((detail, index) => (
          <View key={index} style={styles.teamMemberContainer}>
            <TextInput
              label={`BGMI Name (${index + 1})`}
              value={detail.name}
              onChangeText={(text) => handleBgmiDetailChange(index, 'name', text)}
              style={styles.input}
            />
            <TextInput
              label={`BGMI ID (${index + 1})`}
              value={detail.id}
              onChangeText={(text) => handleBgmiDetailChange(index, 'id', text)}
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Join
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  teamMemberContainer: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: '#001F3F',
    paddingHorizontal: 20,
  },
});

export default JoinForm;