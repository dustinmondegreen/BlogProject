import {object, string} from 'yup';
import testUserData from './testuserdata.js';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const userSchema = object({
        email: string()
                .email('Not a valid email')
                .required('Email is required')
                .max(255, 'Email is too long (255 characters max)')
                ,
        username: string()
                .required('Username is required')
                .min(3, 'Username is too short')
                .max(32, 'Username is too long (32 characters max)')
                ,
        password: string()
                .required('Password is required')
                .min(8, 'password must be at least 8 characters')
                .matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
});

export default userSchema;