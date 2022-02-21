import { API_URL } from "./../config/api";

const LOGOUT_URL = `${API_URL}/logout`;

export const postLogout = async (id: string) => {
    const response = await fetch(`${LOGOUT_URL}`, {
        method: "POST",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};
