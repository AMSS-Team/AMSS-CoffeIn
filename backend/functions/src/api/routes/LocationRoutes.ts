import {Router} from "express";
import {getCurrentUser} from "../../services/UserService";
import {CheckInDto, toCheckInModel} from "../../data/dto/CheckInDto";
import LocationRepository from "../../data/repositories/LocationRepository";
import {ApiResponse} from "../../data/models/ApiResponse";
import {fromCheckInModel} from "../../data/dto/ResultCheckinDto";
import {ListCheckinsDto} from "../../data/dto/ListCheckinsDto";
import {ResultListCheckinsDto} from "../../data/dto/ResultListCheckinsDto";
import {sendCheckInNotification} from "../../services/NotificationService";
import UserRepository from "../../data/repositories/UserRepository";

const router = Router();

router.post("/checkin", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    const checkIn = req.body as CheckInDto;
    try {
        const checkInModel = toCheckInModel(checkIn);
        const result = await LocationRepository.getInstance().checkInLocation(
            currentUser.uid,
            checkInModel,
        );

        // Send notifications
        sendCheckInNotification(
            result,
            (
                await UserRepository.getInstance().getFollowers(currentUser.uid)
            ).map((user) => user.uid),
        );
        res.send({data: fromCheckInModel(result)} as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.delete("/checkin", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    try {
        await LocationRepository.getInstance().clearCheckIn(currentUser.uid);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.post("/checkin/list", async (req, res) => {
    const ids = (req.body as ListCheckinsDto).userIds;
    try {
        const checkins: ResultListCheckinsDto =
            await LocationRepository.getInstance().getCheckInsForUsers(ids);
        res.send({data: checkins} as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.post("/checkin/join/:userId", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    const targetUserId = req.params.userId;
    try {
        await LocationRepository.getInstance().joinCheckIn(
            currentUser.uid,
            targetUserId,
        );
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

export default router;
