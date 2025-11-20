import userSchema from "../schemas/userschema.js";

export default async function (req, res, next) {
    try {
        const body = req.body;
        await userSchema.validate(body)
        next()
    } catch (error) {
        return res.status(400).json({message: 'Nice Try Hacker'})
    }
}