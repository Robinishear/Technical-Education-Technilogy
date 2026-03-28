export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<TData = unknown> {
    success: true;
    message: string;
    data: TData;
    meta?: PaginationMeta;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    image?: string;
    createdAt: string;
}