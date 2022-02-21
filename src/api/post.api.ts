import { Post } from "../interfaces/post";
import { API_URL } from "./../config/api";

const POST_URL = `${API_URL}/post`;

export const getPosts = async (search?: Record<string, string>) => {
    const params = new URLSearchParams(search);
    const response = await fetch(`${POST_URL}/${params ? "?" + params : ""}`);
    return response;
};

export const postPost = async (data: Post) => {
    const response = await fetch(`${POST_URL}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};

export const patchPost = async (data: Post) => {
    const response = await fetch(`${POST_URL}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};

export const deletePost = async (id: string) => {
    const response = await fetch(`${POST_URL}`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-Type": "application/json" },
    });
    return response;
};
