import { NextFunction, Request, Response } from "express";

// Middleware to check if the user has one of the required roles
const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure req.userRole is a string
    const userRole: string = req.userRole as string; // Type assertion

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default checkRole;
