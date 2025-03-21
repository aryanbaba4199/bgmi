

const User = require('../../models/users/users')
const Booking = require('../../models/Matches/register')
const Match = require('../../models/Matches/matches')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

exports.login = async(req, res, next)=>{
    const {email, password} = req.body;
    console.log('email is ', email)
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : 'User not found'})
        }
        // const decodePassword = Buffer.from(password, 'base64').toString('utf-8');
        if(password!==user.password){
            return res.status(401).json({message : 'Invalid Credential'})
        }
        const token = jwt.sign(
            {email : user.email, bgmiId : user.bgmiId, name: user.name, id:user._id},
            secret, 
            {expiresIn : '30d'}
        )
        return res.status(200).json(token);
    }catch(e){
        console.error('error in login ', e)
        next(e);
    }
}

exports.signUp = async(req, res, next)=>{

    try{
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign(
            {email : user.email, bgmiId : user.bgmiId, name : user.name, id: user._id},
            secret, 
            {expiresIn : '30d'}
        )

        return res.status(200).json(token)
    }catch(e){
        console.error('error in sign up', e)
        next(e);
    }
}



exports.myMatches = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const bookings = await Booking.find({ userId });
        console.log(bookings)

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        const matchIds = bookings.map(item => item.matchId);
        const matches = await Match.find({ _id: { $in: matchIds } });
        return res.status(200).json({ success: true, bookings, matches, user : decoded});
    
    } catch (e) {
        console.error('Error in getting my matches:', e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.myProfile = async(req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await User.findById(decoded.id);
        const data = {
            userId : user._id,
            wins :user.wins,
            participated : user.participated ,
            mom : user.mom,
            name : user.name, 
            bgmiId : user.bgmiId, 
            email : user.email, 
            mobile : user.mobile,
            bgmiName : user.bgmiName,
            teamMembers : user.teamMembers,
        }
        res.status(200).json(data);
    }catch(e){
        console.error('Error in sending profile', e)
        next(e)
    }
}
exports.updateProfile = async(req, res, next)=>{
    const {email, name, bgmiId, mobile} = req.body;
    try{
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         await User.findByIdAndUpdate(
            decoded.id,
            {name : name, email : email, mobile:mobile, bgmiId : bgmiId},
            {new : true}
        )
        return res.status(200).json({message : 'Profile updated'})
    }catch(e){
        console.error('Error in updating profile', e)
        next(e)
    }
}
