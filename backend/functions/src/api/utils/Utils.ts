import {Request} from "express";

export function getBearerToken(req: Request): string | null {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.split("Bearer ")[1];
    }
    return null;
}
