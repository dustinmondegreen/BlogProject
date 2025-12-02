import userSchema from "../schemas/userschema.js"

export const validateUser = async (req, res, next) => {
    const {email, username, password} = req.body;

    const userInfo = {
        email: email,
        username: username, 
        password: password 
    };

    try{
        await userSchema.validate(userInfo);
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid user data",
            error: `${error.errors}`
        });
    }
}

