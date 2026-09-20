import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface DecodeStrucutre {
   id: string,
   email: string,
   iat: number,
   exp: number
}

interface UserStrucuter {
    id: string,
    email: string   
}
const TokenChecker = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
 try{
     const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodeStrucutre

  req.user = { id: decoded.id, email: decoded.email} as UserStrucuter
  next()
 }catch(err){
    return res.status(409).json({
        message: "Token is not avialable!",
        Error: err instanceof Error ? err.message : ""
    })
 }
};

export default TokenChecker