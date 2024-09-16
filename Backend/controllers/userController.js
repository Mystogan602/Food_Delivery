import userModal from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModal.findOne({email: email});

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success: false, message: "invalid credentials"});
        }

        const token = createToken(user._id);
        res.json({success: true, token}); 

    } catch (error) {
        
    }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        //check if user already registered
        const exists = await userModal.findOne({email});
        if(exists) {
            return res.json({success: false, message:'Already registered'});
        }

        // validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message:'Invalid email'});
        }

        if (password.length < 8) {
            return res.json({success: false, message: 'Please enter a strong password'});
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModal({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, token});
    }
    catch (err) {
        console.log(err);
        res.json({success: false, message: err.message});
    }
};

export { loginUser, registerUser };
