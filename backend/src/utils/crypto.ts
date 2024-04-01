import { createHash, createHmac } from "crypto";
import DTO from "../models/auth/user-dto";
import { sign } from "jsonwebtoken";

export function hashPassword(plainTextPassword: string, salt: string): string {
    return createHmac('md5', salt)
        .update(`${plainTextPassword}`)
        .digest('hex');
}

export function generateJWT(user: DTO, secret: string, expiresIn: string): string {
    return sign({ user }, secret, { expiresIn })
}