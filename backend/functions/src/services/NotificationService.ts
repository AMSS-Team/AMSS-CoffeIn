import {CheckInModel} from "../data/models/CheckInModel";
import {messaging} from "firebase-admin";
import UserRepository from "../data/repositories/UserRepository";

export async function sendCheckInNotification(
    checkIn: CheckInModel,
    userIds: string[],
) {
    const userTokens = await UserRepository.getInstance().getFcmTokens(userIds);

    const messages = userTokens
        .map((userToken) => {
            if (userToken.token == undefined) {
                return null;
            }
            const message: messaging.Message = {
                notification: {
                    title: "Pst! Someone checked in!",
                    body: `${userToken.displayName} checked in at ${checkIn.title}`,
                },
                data: {
                    checkIn: JSON.stringify(checkIn),
                },
                token: userToken.token,
            };
            return message;
        })
        .filter((message) => message != null);

    const res = await messaging().sendAll(messages as messaging.Message[]);

    // Invalidate all the tokens with errors
    for (let i = 0; i < res.responses.length; i++) {
        const result = res.responses[i];
        const message = messages[i];
        if (result.error && message) {
            await UserRepository.getInstance().invalidateFcmToken(
                message.token as string,
            );
        }
    }
}
