import { User } from "../interfaces/user";
import { API_URL } from "./../config/api";

const USER_URL = `${API_URL}/user`;

export const getUsers = async (search?: Record<string, string>) => {
    const params = new URLSearchParams(search);
    const response = await fetch(`${USER_URL}/${params ? "?" + params : ""}`);
    return response;
};

export const postUser = async (data: User) => {
    const response = await fetch(`${USER_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};

export const patchUser = async (data: User) => {
    const response = await fetch(`${USER_URL}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};

export const deleteUser = async (id: string) => {
    const response = await fetch(`${USER_URL}`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};
