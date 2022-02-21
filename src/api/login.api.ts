import { User } from "../interfaces/user";
import { API_URL } from "./../config/api";

const LOGIN_URL = `${API_URL}/login`;

export const getSession = async () => {
    const response = await fetch(`${LOGIN_URL}/session`);
    return response;
};

export const postLogin = async (data: Record<string, string>) => {
    const response = await fetch(`${LOGIN_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};
