import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const MyMatchCard = ({ match, booking }) => {
  
  const {
    title,
    matchType,
    startTime,
    prizePool,
    perKill,
    fee,
    participants,
    rplayer,
    cPlayer,
    status,
    endTime,
    winner,
    mom,
  } = match;
  

  // Memoized calculateTimeLeft function
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(startTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [startTime]); // Add startTime as a dependency

  // State for countdown
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());



  // Calculate slots left
  const slotsLeft = parseInt(rplayer-cPlayer);
  const slotsText = status==='ongoing' ? 'Room Started' : status==='finished' ? 'Match Ended' : 
    slotsLeft <= 0 ? 'Housefull' : `Only ${slotsLeft} slots left out of ${rplayer}`;

  // Update timeLeft every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [calculateTimeLeft]); // Add calculateTimeLeft as a dependency

  // Format the countdown time
  const countdownText =status==='upcoming' ?  `${timeLeft.days}Days ${timeLeft.hours}Hr ${timeLeft.minutes}Min ${timeLeft.seconds}Sec` : status==='ongoing' ? 'Live' : 'Fineshed';

  return (
    <>
      
        <Pressable style={styles.card}>
          {/* Game Type and Map */}
          <View style={styles.header}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>BGMI</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{matchType}</Text>
            </View>

            <View style={styles.timeLeft}>
              <Text style={styles.timeText}>{countdownText}</Text>
            </View>
          </View>

          {/* Tournament Name */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <Icon name="money-bill-wave" size={16} color="#FFD700" />
          </View>

          {/* Match Info */}
          <Text style={styles.matchInfo}>
            Start Time : {new Date(startTime).toLocaleString()}
          </Text>
          {status==='finished' && 
          <Text style={styles.matchInfo}>
          End Time : {new Date(endTime).toLocaleString()}
        </Text>
          }

          {/* Price Pool and Per Kill */}
          <View style={styles.prizeRow}>
            <View style={styles.prizeBox}>
              <Text style={styles.prizeText}>Price Pool</Text>
              <Text style={styles.amount}>₹{prizePool}</Text>
            </View>
            <View style={styles.prizeBox}>
              <Text style={styles.prizeText}>Per Kill</Text>
              <Text style={styles.amount}>₹{perKill}</Text>
            </View>
          </View>

          <Text style={styles.slots}>{slotsText}</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.joinText}>Slots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Room ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinText}>{booking.slotsCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>{match.roomId??'Not Created'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>{match.password??'Not Created'}</Text>
            </TouchableOpacity>
          </View>
          {booking.bgmiDetails.map((item, index)=>(
            <View style={{
              display : 'flex',
              flexDirection : 'row',
              gap :4,
              marginTop : 10,
            }}>
              
            
            <TouchableOpacity style={{...styles.detailButton, width : '32%'}}>
              <Text style={styles.detailText}>Player {index+1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.detailButton, width : '32%'}}>
              <Text style={styles.detailText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.detailButton, width : '32%'}}>
              <Text style={styles.detailText}>{item.id}</Text>
            </TouchableOpacity>
          </View>
          ))}
          
          {status==='finished' && 
          <>
             <View style={styles.buttonRow}>
            
             <TouchableOpacity style={styles.detailButton}>
               <Text style={styles.detailText}>Winner : {winner??'Rawanisalive'} </Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.detailButton}>
               <Text style={styles.detailText}>Man of the Match : {mom??'op-thomas'}</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.buttonRow}>
            
           <TouchableOpacity style={styles.detailButton}>
             <Text style={styles.detailText}>Winning Price : </Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.joinButton}>
             <Text style={styles.detailText}>{prizePool}</Text>
           </TouchableOpacity>
         </View>
         </>
      
          }
        </Pressable>
        
      
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: '#001F3F',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  timeLeft: {
    backgroundColor: '#001F3F',
    padding: 6,
    borderRadius: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
    marginRight: 5,
  },
  matchInfo: {
    fontSize: 12,
    color: '#B0B0B0',
    marginVertical: 4,
  },
  prizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  prizeBox: {
    alignItems: 'center',
    backgroundColor: '#001F3F',
    padding: 6,
    borderRadius: 8,
    width: '45%',
  },
  prizeText: {
    color: 'white',
    fontSize: 12,
  },
  amount: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  slots: {
    color: '#FF5733',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    display : 'flex'
  },
  joinButton: {
    backgroundColor: '#15892e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  joinText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#001F3F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  detailText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MyMatchCard;