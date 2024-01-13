import {getAuth} from "firebase-admin/auth";
import {getBearerToken} from "../utils/Utils";
import {Response, Request} from "express";

export function authMiddleware(
    req: Request,
    res: Response,
    next: (err?: any) => any,
) {
    const token = getBearerToken(req);
    if (token) {
        getAuth()
            .verifyIdToken(token)
            .then(() => {
                next();
            })
            .catch(() => {
                res.status(401).send("Unauthorized");
            });
    } else {
        res.status(401).send("Unauthorized");
    }
}
