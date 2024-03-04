import httpStatus from 'http-status'
import tokenService from '../services/token.service';
// import { User } from "../entity";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';

const createUser = async (req, res) => {
    try {
        const info = req.body;
        const hashedPassword = await bcrypt.hash(info.password, 10);
        info.password = hashedPassword;
        const newuser = new User(info);
        let data = await newuser.save();
        return res.status(httpStatus.CREATED).json({
            status: true,
            data: data
        })    
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: false,
            data: 'Something went wrong'
        }) 
    }
    
};

const logout = async (req, res) => {
    const {id, token} = req.body;
    let data = await User.findOne({ _id: id, refreshToken: token });
    if(!data) {
        return res.json({
            status: false,
            message: 'User not found'
        })
    }
    let updateUser = await User.updateOne({ _id : id }, {$set : { refreshToken: '', isLogin: false }}, { new:true });

    if(updateUser) {
        return res.json({
            status: true,
            message: 'User logout successfully'
        });    
    }
    else {
        return res.json({
            status: false,
            message: 'Failed to update',
        })
    }
    
};


const getUsers = async (req, res) => {
    const data = await User.find({});
    return res.json({
        status: true,
        data: data
    })
}

const updateUsers = async (req, res) => {
    let info = req.body;
    let { id } = info;
    delete info.id;
    let updateuser = await User.updateOne({_id : id}, { $set:{ ...info } }, { new: true } );
    


    if(updateuser) {
        return res.json({
            status: true,
            data: updateuser
        })
    }
}

const deleteUser = async (req, res) => {
    let id = req.body.id;
    let result = await User.deleteOne({_id:id});
    if(result) {
        return res.json({
            status: true,
            message: 'user data deleted successfully'
        })
    }
}

const login = async (req, res) => {
    const info = req.body;

    const user: any = await User.findOne({ email: info.email });
    
    
    if (user && await bcrypt.compare(info.password, user.password)) {
        console.log('info.password');
        console.log(info.password);
        const tokens = await tokenService.generateAuthTokens(user);
        return res.json({
            ...tokens,
            user,
            status: true,
            message: 'Login success'
        })
    }
    return res.status(httpStatus.ACCEPTED).json({
        status: false,
        message: 'Invalid Email/Password'
    })
}

const generateRefreshToken = async (req, res) => {
    try {
        const info: any = req.body;
        const user: any = await User.findOne({ _id: info.id, refreshToken: info.token });
        console.log('useruseruseruser');
        console.log(user);
        
        if (user) {
            const tokens = await tokenService.generateRefreshTokens(user);
            return res.json({
                ...tokens,
                status: true,
                message: 'Token generate successfully'
            })
        }
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false,
            message: 'Invalid Token'
        })    
    } catch (error) {
        console.log('new page is here');
        console.log(error);
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: false,
            message: 'Something went wrong'
        }) 
        
        
    }
    
}

export = {
    createUser,
    getUsers,
    updateUsers,
    deleteUser,
    login,
    generateRefreshToken,
    logout
};