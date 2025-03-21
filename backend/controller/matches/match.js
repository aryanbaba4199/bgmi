const Match = require("../../models/Matches/matches");
const Booking = require("../../models/Matches/register");
const User = require("../../models/users/users");
const jwt = require("jsonwebtoken");

exports.creatematch = async (req, res) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error("Error in creating", err);
    res.status(500).json({ message: "error" });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const matches = await Match.find({}).sort({ startTime: 1 }); // Sort by nearest start time (ascending order)

    res.status(200).json(matches);
  } catch (err) {
    console.error("Error in getting matches:", err);
    res.status(500).json({ message: "error" });
  }
};

exports.updateMatch = async (req, res, next) => {
  const formData = req.body;
  try {
    await Match.findByIdAndUpdate(formData._id, formData, { new: true });
    const users = await User.find({ bgmiId: { $in: formData.winner } });

    await Promise.all(
      users.map((user) =>
        User.findByIdAndUpdate(user._id, { wins: user.wins + 1 }, { new: true })
      )
    );
    const momUser = await User.findOne({ bgmiId: formData.mom });
    if (momUser) {
      await User.findByIdAndUpdate(
        momUser._id,
        { mom: momUser.mom + 1 },
        { new: true }
      );
    } else {
      console.log("User not found", formData.bgmiId);
    }

    return res.status(200).json({ message: "Match Updated Successfully" });
  } catch (e) {
    console.error("Error in updating match", e);
    next(e);
  }
};

exports.upcoming = async (req, res, next) => {
  const { status } = req.params;
  try {
    const matches = await Match.find({ status: status });
    return res.status(200).json(matches);
  } catch (e) {
    console.error("Error in getting matches type", e);
    next(e);
  }
};

exports.removeMatch = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Match.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted" });
  } catch (e) {
    next(e);
    console.error("Error in deleting match ", e);
  }
};

exports.bookingsData = async (req, res, next) => {
  try {
    const { matchId } = req.params;
    const bookings = await Booking.find({ matchId });
    return res.status(200).json(bookings);
  } catch (e) {
    console.error("Error in getting booking ", e);
    next(e);
  }
};

// POST /api/match-registrations
// exports.createMatchRegistration = async (req, res) => {
//   const {
//     matchId,
//     bgmiName,
//     bgmiID,
//     whatsappNumber,
//     teamName,
//     teamMembers,
//     selectedSlots,
//     fee,
//     paymentId,
//   } = req.body;

//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const match = await Match.findById(matchId);
//     if (!match) {
//       return res.status(404).json({ message: "Match not found" });
//     }

//     const allSelectedSlots = Object.values(selectedSlots).flat();
//     if (allSelectedSlots.length > 4) {
//       return res
//         .status(400)
//         .json({ message: "You can select a maximum of 4 slots" });
//     }

//     const existingRegistrations = await Booking.find({ matchId });
//     const occupiedSlots = existingRegistrations.reduce((acc, reg) => {
//       Object.entries(reg.selectedSlots).forEach(([teamIndex, slots]) => {
//         acc[teamIndex] = slots;
//       });
//       return acc;
//     }, {});

//     for (const [teamIndex, slots] of Object.entries(selectedSlots)) {
//       if (
//         occupiedSlots[teamIndex] &&
//         occupiedSlots[teamIndex].some((slot) => slots.includes(slot))
//       ) {
//         return res
//           .status(400)
//           .json({ message: "Some selected slots are already occupied" });
//       }
//     }

//     const newRegistration = new Booking({
//       matchId,
//       joinType,
//       bgmiName,
//       bgmiID,
//       whatsappNumber,
//       teamName,
//       teamMembers,
//       selectedSlots,
//       fee,
//       paymentId,
//       userId: user.id,
//     });

//     await newRegistration.save();
//     const currUser = await User.findById(user.id);
//     await User.findByIdAndUpdate(
//       currUser._id,
//       { participated: currUser.participated + 1,
//         bgmiName : bgmiName,
//         teamMembers : teamMembers,
//        },
//       { new: true }
//     );
//     const incBy = Object.keys(selectedSlots).length;

//     const m = await Match.findByIdAndUpdate(
//       match._id,
//       { cPlayer: (match.cPlayer ?? 0) + incBy },
//       { new: true }
//     );

//     res.status(200).json(newRegistration._id);
//   } catch (error) {
//     console.error("Error creating match registration:", error);
//     res.status(500).json({ message: "Failed to create match registration" });
//   }
// };

exports.createMatchRegistration = async (req, res, next) => {
  console.log("createMatchRegistration", req.body);
  try {
    const {matchId, bgmiDetails, email, mobile, slotsCount, paymentId, fee } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('user: ',  user)
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
   
    const newBooking = new Booking({
      matchId : matchId, 
      bgmiDetails : bgmiDetails, 
      emailId : email, 
      mobile : mobile, 
      slotsCount : slotsCount, 
      paymentId : paymentId,
      fee : fee,
      userId : user.id,
    });
    await newBooking.save();
    
    const currUser = await User.findById(user.id);
    console.log('current user', currUser)
    await User.findByIdAndUpdate(
      currUser._id,
      { participated: currUser.participated + 1 },
      { new: true }
    );
    
    const m = await Match.findByIdAndUpdate(
      match._id,
      { cPlayer: (match.cPlayer ?? 0) + slotsCount },
      { new: true }
    );
    return res.status(200).json({ message: "Success" });
  } catch (e) {
    console.error("Error in booking", e);
    next(e);
  }
};

exports.updateRoom = async (req, res, next) => {
  const { roomId, id, password } = req.body;

  try {
    const match = await Match.findByIdAndUpdate(
      id,
      { roomId: roomId, password: password },
      { new: true }
    );

    res.status(200).json({ message: "Room ID & Password updated" });
  } catch (e) {
    console.error("Error in updating room ", e);
    next(e);
  }
};
