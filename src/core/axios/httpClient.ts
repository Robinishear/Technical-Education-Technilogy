/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { cookies, headers } from 'next/headers';
import { isTokenExpiringSoon } from '../utils/tokenUtils';
import { ApiResponse } from './api.types';
import { getNewTokensWithRefreshToken } from './auth.services';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}

async function tryRefreshToken(
    accessToken: string,
    refreshToken: string
): Promise<void>
{
    if(!(await isTokenExpiringSoon(accessToken))) {
        return;
    }

    const requestHeader = await headers();

    if (requestHeader.get("x-token-refreshed") === "1") {
        return; // avoid multiple refresh attempts in the same request lifecycle
    }

    try {
        await getNewTokensWithRefreshToken(refreshToken);
    } catch (error : any) {
        console.error("Error refreshing token in http client:", error);
    }
}

const axiosInstance = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if(accessToken && refreshToken){
        await tryRefreshToken(accessToken, refreshToken);
    }

    const cookieHeader = cookieStore
                                .getAll()
                                .map((cookie) => `${cookie.name}=${cookie.value}`)
                                .join("; ");    
    // eg Cookie: "accessToken=abc123; refreshToken=def456"

    const instance = axios.create({
        baseURL : API_BASE_URL,
        timeout : 30000,
        headers:{
            'Content-Type' : 'application/json',
            Cookie : cookieHeader
        }
    })

    return instance;
}

export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
    try {     
        const instance = await axiosInstance();   
        const response = await instance.get<ApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {       
        console.error(`GET request to ${endpoint} failed:`, error);
        throw error;
    }
}

const httpPost = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.post<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`POST request to ${endpoint} failed:`, error);
        throw error;
    }
}

const httpPut = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.put<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`PUT request to ${endpoint} failed:`, error);
        throw error;
    }
}

const httpPatch = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.patch<ApiResponse<TData>>(endpoint, data, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    }
    catch (error) {
        console.error(`PATCH request to ${endpoint} failed:`, error);
        throw error;
    }
}

const httpDelete =  async <TData>(endpoint: string, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.delete<ApiResponse<TData>>(endpoint, {
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error) {
        console.error(`DELETE request to ${endpoint} failed:`, error);
        throw error;
    }
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete,
}