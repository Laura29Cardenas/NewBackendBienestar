import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
 
export const verifyResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.email;
  } catch (error) {
    return null;
  }
};
