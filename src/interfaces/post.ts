import { User } from "./user";

export interface PostPopulated {
    _id: string;
    user: User;
    title: string;
    content: string;
    created: Date;
    edited?: Date;
}

export interface Post {
    _id: string;
    user: string;
    title: string;
    content: string;
    created: Date;
    edited?: Date;
}
