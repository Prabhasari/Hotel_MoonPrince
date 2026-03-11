import { contactNumberValidator, emailValidator, passwordValidator, textValidator } from '../helpers/validator.js';
import user from '../models/userModel.js';
import { comparePassword, generateToken, hashPassword } from '../helpers/authHelper.js';

//register new user
export const register = async (req, res) => {
    try {
        const { name, email, password, contactNumber, role } = req.body;
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        //input validation part
        if(!textValidator(name)) return res.status(400).json({
            success: false,
            message: "Name should only contain letters and spaces."
        })
        if(!emailValidator(email)) return res.status(400).json({
            success: false,
            message: "Invalid email format."
        })
        if(!passwordValidator(password)) return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
        })
        if(!contactNumberValidator(contactNumber)) return res.status(400).json({
            success: false,
            message: "Invalid contact number format. It should be in the format +947XXXXXXXXX."
        })

        //password hashing part
        const hashedPassword = await hashPassword(password);

        
        const newUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword,
            contactNumber: contactNumber,
            role: role,
            photo: req.file ? req.file.filename : null
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Side Error."
        })
    }
}

//login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            })
        }

        const isPasswordMatch = await comparePassword(password, existingUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }

        const token = await generateToken({ id: existingUser._id, role: existingUser.role });

         res.cookie('access_token',token,{
            httpOnly: true
        }).status(200).json({
            success: true,
            message: "Login successful.",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Side Error."
        });
    }
}