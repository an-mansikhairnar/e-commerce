// lib/auth.ts

import jwt from "jsonwebtoken";

export function generateToken(user: {
  id: number;
  name: string;
  email: string;
}) {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}