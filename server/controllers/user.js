import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';


export const signin = async (req, res) => { 
    console.log(req.body)
    try {
    
        const { email, password } = req.body;

        const existUser = await User.findOne({ email }) 

        if (!existUser) return res.status(404).json({ message: 'User not exist' });
        
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Password incorrect' });
        
        const token = jwt.sign({ email: existUser.email, id: existUser._id }, 'secret-key', { expiresIn: "1h" });
        
        res.status(200).json({result: existUser, token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }

}


export const signup = async (req, res) => { 
    console.log(req.body)
    try {
        const { email, password, confirmPassword, firstName, lastName } = req.body

        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        
        if (password !== confirmPassword) return res.status(400).json({ message: "Password is not match" });

        const hashedPassword = await bcrypt.hash(password, 12)
        
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'secret-key', { expiresIn: "1h" })
        
        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}