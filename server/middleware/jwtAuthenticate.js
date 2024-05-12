import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const jwtAuthMiddleware = (req, res, next) => {
  try {
    // Check if request headers contain authorization
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: 'Token Not Found' });
    }

    // Extract the JWT token from the request headers
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded.user; // Assuming the user information is stored under 'user' key in the decoded token
    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
