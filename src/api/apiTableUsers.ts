import {axiosInstance} from "./apiInstance.ts";
import {type MetaResponse, type Profile, Roles, type User, type UserFilters, type UserRequest} from "../type";

export async function getUsers({search, page, sortBy, sortOrder, limit, isBlocked}: UserFilters) {
    const response = await axiosInstance.get<MetaResponse<User>>('/admin/users', {
        params: {
            search: search,
            sortBy: sortBy,
            sortOrder: sortOrder,
            isBlocked: isBlocked,
            limit: limit,
            page: page,
        }
    });
    return response.data;
}

export async function getUser(id: number) {
    const response = await axiosInstance.get<Profile>(`/admin/users/${id}`);
    return response.data;
}

export async function deleteUser(id: number) {
    const response = await axiosInstance.delete<string>(`/admin/users/${id}`)
    return response.data;
}

export async function blockUser(id: number) {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/block`);
    return response.data;
}

export async function unblockUser(id: number) {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/unblock`)
    return response.data;
}

export async function updateRolesUser(id: number, roles: Roles[]) {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/rights`, {roles});
    return response.data;
}

export async function updateProfileUser(id: number, profile: UserRequest)  {
    const  response = await axiosInstance.put<User>(`/admin/users/${id}`, profile);
    return response.data;
}
