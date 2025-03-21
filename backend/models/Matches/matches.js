const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  matchType: String,
  roomId : String, 
  password : String,
  prizePool: Number,
  perKill: Number,
  fee: Number,
  description: String,
  startTime : Date, 
  endTime : Date, 
  winner : [], 
  participants : [], 
  status : {
    type : String, 
    default : 'upcoming',
  },
  ytUri : String,
  fbUri : String, 
  team : Number, 
  players : Number, 
  mom : String ,
  rteam : Number, 
  rplayer : Number,
  cPlayer : {
    type : Number, 
    default : 0
  }, 
});


module.exports = mongoose.model("Match", MatchSchema);