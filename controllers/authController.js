import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword,comparePassword } from '../utils/passwordUtils.js';


export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
};
  export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError('invalid credentials');
    res.send('register');
};