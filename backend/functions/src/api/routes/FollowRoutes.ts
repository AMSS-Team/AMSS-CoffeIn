import {Router} from "express";
import {getCurrentUser} from "../../services/UserService";
import UserRepository from "../../data/repositories/UserRepository";
import {ApiResponse} from "../../data/models/ApiResponse";
import {toUserDto} from "../../data/dto/UserDto";
import {SearchUserDto} from "../../data/dto/SearchUserDto";

const router = Router();

router.get("/following", async (req, res) => {
    const currentUser = await getCurrentUser(req);

    try {
        const followings = await UserRepository.getInstance().getFollowings(
            currentUser.uid,
        );
        const followingsDto = followings.map((friend) => toUserDto(friend));
        res.send({
            data: followingsDto,
        } as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.post("/search", async (req, res) => {
    const currentUser = await getCurrentUser(req);

    try {
        const email = (req.body as SearchUserDto).email;
        const user = await UserRepository.getInstance().findUserByEmail(email);

        if (user.uid === currentUser.uid) {
            res.status(404).send({message: "Not found."});
        }

        res.send({data: toUserDto(user)} as ApiResponse);
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.post("/:userId", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    const userIdToFollow = req.params.userId;
    try {
        await UserRepository.getInstance().followUser(
            currentUser.uid,
            userIdToFollow,
        );
        res.status(200).send({message: "OK"});
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});

router.delete("/:userId", async (req, res) => {
    const currentUser = await getCurrentUser(req);
    const userIdToUnfollow = req.params.userId;
    try {
        await UserRepository.getInstance().unfollowUser(
            currentUser.uid,
            userIdToUnfollow,
        );
        res.status(200).send({message: "OK"});
    } catch (e) {
        res.status(500).send({message: (e as Error).message} as ApiResponse);
    }
});




export default router;
