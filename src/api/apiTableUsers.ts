import {axiosInstance} from "./apiInstance.ts";
import type {MetaResponse, Profile} from "../type";

export async function getUsers() {
    const response = await axiosInstance.get<MetaResponse<Profile>>('/admin/users');
    return response.data;
}

export async function deleteUser(id: number) {
    const response = await axiosInstance.delete(`/admin/users/${id}`)
    return response.data;
}

export async function blockUser(id: number) {
    const response = await axiosInstance.post(`/admin/users/${id}/block`);
    return response.data;
}

export async function unblockUser(id: number) {
    const response = await axiosInstance.post(`/admin/users/${id}/unblock`)
    return response.data;
}