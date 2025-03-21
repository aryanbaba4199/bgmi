const mongoose = require('mongoose');

const MatchRegSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  userId : {
    type : String, 
    require : true,
  },
  emailId : {
    type : String, 
  },
  slotsCount : {
    type : Number, 
    require : true,
  }, 
  bgmiDetails : {
    type : [], 
    required : true,
  },
  
  // joinType: {
  //   type: String,
  //   enum: ['solo', 'team'],
  //   required: true,
  // },
  // bgmiID: {
  //   type: String,
  //   required: function () {
  //     return this.joinType === 'solo';
  //   },
  // },
  // bgmiName: {
  //   type: String,
  //   required: function () {
  //     return this.joinType === 'solo';
  //   },
  // },
  // teamName: {
  //   type: String,
  //   required: function () {
  //     return this.joinType === 'team';
  //   },
  // },
  // teamMembers: [
  //   {
  //     bgmiName: {
  //       type: String,
  //       required: function () {
  //         return this.joinType === 'team';
  //       },
  //     },
  //     bgmiID: {
  //       type: String,
  //       required: function () {
  //         return this.joinType === 'team';
  //       },
  //     },
  //   },
  // ],
  mobile: {
    type: String,
    required: true,
  },
  // selectedSlots: {
  //   type: Map,
  //   of: [Number],
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  payment_id : {
    type : String, 
    default : 'null'
  }, 
  fee : {
    type : Number,
    // require : true
  }, 

});

const MatchReg = mongoose.model('Bookings', MatchRegSchema);

module.exports = MatchReg;