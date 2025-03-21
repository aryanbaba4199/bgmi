import RazorpayCheckout from 'react-native-razorpay';
import { activityApi, updaterFunction } from '../Api';
import { Alert } from 'react-native';
export const handleCheckout = async (match, user, bookingId) => {
  try {
    var options = {
      description: 'Tornaament Fee',
      image:
        'https://i.pinimg.com/736x/74/e3/ee/74e3ee4f660e5f976879b34e07ca34de.jpg',
      currency: 'INR',
      key: 'rzr pay key',
      amount: match.fee * 100,
      name: 'BGMI',
      order_id: bookingId,
      prefill: {
        email: user?.email || 'na@gmail.com',
        contact: user.mobile,
        name: user.name,
      },
      theme: {color: '#15892e'},
    };
    return RazorpayCheckout.open(options)
      .then(async data => {
        console.log('Payment success', data);
        return await handleSuccessTransaction(res.dbTxnId, profile, pkg, data);
      })
      .catch(async error => {
        console.log('Payment failed', error);
        return await handleFailureTransaction(res.dbTxnId, profile, pkg);
      });
  } catch (e) {
    console.error('error in creating order ', e);
    return {success: false, message: pkg};
  }
};

const handleSuccessTransaction = async(booking)=>{
    try{
        const formData = {...booking, payStatus : 'paid'}
        const res = await updaterFunction(activityApi.bookings, data)
        return {pay : true, success : true}
    }catch(e){
        console.error
        return {pay : true, success : false}
    }
}

const handleFailureTransaction = async(booking)=>{
    try{
        const formData = {...booking, payStatus : 'dues'}
        const res = await updaterFunction(activityApi.bookings, data)
        return {pay : false, success : true}
    }catch(e){
        console.error
        return {pay : false, success : failse}
    }
}
