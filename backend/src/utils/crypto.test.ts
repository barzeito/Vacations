import { v4 } from "uuid";
import { generateJWT, hashPassword } from "./crypto";
import DTO from "../models/users/dto";

describe('Crypto functions testing', () => {
    describe('hashPassword function tests', () => {
        test('Check if generate a valid md5 model', () => {
            const password = hashPassword(v4(), v4());
            expect(password).toBeDefined();
            expect(password.length).toBe(32);
            expect(password).toMatch(/^[a-f0-9]{32}$/gi);
        })
        test('Check if the same hash for the same password and salt', () => {
            const password = v4();
            const salt = v4();
            const hash1 = hashPassword(password, salt);
            const hash2 = hashPassword(password, salt);
            expect(hash1).toEqual(hash2);
        })
        test('Check if the different hash for different password and salt', () => {
            const salt = v4();
            const password1 = v4();
            const password2 = v4();
            const hash1 = hashPassword(password1, salt);
            const hash2 = hashPassword(password2, salt);
            expect(hash1).not.toEqual(hash2);
        })
    })
    describe('generateJWT function tests', () => {
        const user: DTO = {
            userId: '1',
            firstName: 'test',
            lastName: 'tester',
            email: 'test@gmail.com',
            password: v4(),
            roleId: 1,
        };
        const secret = 'aurora-secret';
        const expiresIn = '3h';

        test('Check if generate valid JWT token', () => {
            const token = generateJWT(user, secret, expiresIn);
            expect(token).toBeDefined();
        })
    })
})