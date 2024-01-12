import {Router} from "express";
import {RegisterTokenDto} from "../../data/dto/RegisterTokenDto";
import {getCurrentUser} from "../../services/UserService";
import UserRepository from "../../data/repositories/UserRepository";
import {ApiResponse} from "../../data/models/ApiResponse";

const router = Router();

router.post("/token", async (req, res) => {
    const token = (req.body as RegisterTokenDto).token;
    try {
        const currentUser = await getCurrentUser(req);
        await UserRepository.getInstance().saveFcmToken(currentUser.uid, token);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

export default router;
