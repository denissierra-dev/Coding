import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JwtPayload } from "./jwt.js";

export interface AuthedRequest extends Request {
  user?: JwtPayload;
}

export function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const token = header.slice(7);
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
