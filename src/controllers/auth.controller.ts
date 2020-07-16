import { Request, Response } from "express"
import User, { IUser } from "../models/user"
import jwt from "jsonwebtoken"
export const Signup = async (req: Request, res: Response) => {
    let user: IUser = new User({ username: req.body.username, email: req.body.email, password: req.body.password })
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    const token: string = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "token_test")
    res.header('auth-token', token).json(savedUser);
}

export const Signinn = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "error" })
    const validateResult: boolean = await user.validatePassword(req.body.password);
    if (!validateResult) return res.status(404).json({ message: "Invalid Password" })
    //I save in a variable constant the token to return in header response
    const token: string = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || "token_test", { expiresIn: 60 * 60 * 24 })//vencer dentro 1 dia
    //Sending the header auth-token slot with token and body the user with all variables
    res.header("auth-token", token).json(user)
}

export const Profile = async(req: Request, res: Response) => {
    let usuarioResponse:IUser = await User.findOne({_id:req.userID},{password:0}) as IUser;
    res.status(200).json(usuarioResponse);
}