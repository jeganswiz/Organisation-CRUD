import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config';
import { User } from '../models/User';

const generateToken = (userId: string, expires: any, type: string, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token: string, userId: any) => {
  await User.updateOne({ _id: userId }, { refreshToken: token, isLogin: true });
};


const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user._id, accessTokenExpires, 'accessToken');

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user._id, refreshTokenExpires, 'refreshToken');
  await saveToken(refreshToken, user._id);
  return {
    access: accessToken,
    refresh: refreshToken,
  };
};

const generateRefreshTokens = async (user: any) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user._id, accessTokenExpires, 'accessToken');
  return {
    access: accessToken
  };
};

export = {
  generateToken,
  saveToken,
  generateAuthTokens,
  generateRefreshTokens
};
