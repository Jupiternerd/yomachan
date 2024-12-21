import { ObjectId } from "mongodb";

export interface UserType {
    _id: ObjectId;
    name: string | null;
    email: string | null;
    image: string | null;
    discordId: string;
    isAdmin: boolean;
}

