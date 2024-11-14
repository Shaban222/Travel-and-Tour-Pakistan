import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userRole: String;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  console.log("Token",token)
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    
    // Ensure decoded is an object (JwtPayload) and has userId and role
    if (typeof decoded === "object" && decoded.userId && decoded.role) {
      req.userId = decoded.userId;
      req.userRole = decoded.role;  // Assuming role is part of the token
    //req.userId = (decoded as JwtPayload).userId;
    next();
  }else{

    return res.status(401).json({ message: "unauthorized" });
  } 
   
  
 } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
