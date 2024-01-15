import {InviteDto} from "../dto/InviteDto";

export type InviteModel = {
    title : string;
    userName : string;
}

export function toInviteDto(model: InviteModel): InviteDto {
    console.log("Converting invite model to dto: " + JSON.stringify(model));
    return {
        title: model.title,
        userName: model.userName
    }
}