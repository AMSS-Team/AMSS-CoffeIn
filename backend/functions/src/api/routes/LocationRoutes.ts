import {Router} from "express";
import {getCurrentUser} from "../../services/UserService";
import {CheckInDto, toCheckInModel} from "../../data/dto/CheckInDto";
import LocationRepository from "../../data/repositories/LocationRepository";
import {ApiResponse} from "../../data/models/ApiResponse";
import {fromCheckInModel} from "../../data/dto/ResultCheckinDto";
import {ListCheckinsDto} from "../../data/dto/ListCheckinsDto";
import {ResultListCheckinsDto} from "../../data/dto/ResultListCheckinsDto";
import UserRepository from "../../data/repositories/UserRepository";
import {toInviteDto} from "../../data/models/InviteModdel";

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
        res.status(200).send({message: "Joined checkin"} as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.post("/invite/:userId", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    const userIdToInvite = req.params.userId;

    try {
        await UserRepository.getInstance().inviteUser(
            userIdToInvite,
            currentUser,
        );
        res.status(200).send({message: "OK"});
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
})

router.get("/invite/list", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    try {
        const invites = (await UserRepository.getInstance().getInvites(currentUser.uid)).map((invite) => toInviteDto(invite))
        console.log(invites);
        UserRepository.getInstance().clearInvites(currentUser.uid);

        res.send({data: invites} as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
})

export default router;
