import axios, { AxiosInstance } from 'axios';   
import { NextResponse } from 'next/server';

const axiosReq: AxiosInstance = axios.create({
    baseURL: `${process.env.NEST_URL}`,
    timeout: 20000,
    responseType: 'json',
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const shop_id = params.id;
    const headers = new Headers(request.headers);
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.get(`/shops/${shop_id}`, { headers: axiosHeaders });
        return NextResponse.json(response.data)
    } catch (error: any) {
        if (error.response) {
            console.error("Axios error:", error.response.data);
        } else {
            console.error("Unexpected error:", error.message);
        }
        throw new Error('ショップ詳細の取得に失敗しました',error);
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const shop_id = params.id;
    const headers = new Headers(request.headers);
    const body = request.body;
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.patch(`/shops/${shop_id}`, body, { headers: axiosHeaders });
        return NextResponse.json(response.data)
    } catch (error: any) {
        if (error.response) {
            console.error("Axios error:", error.response.data);
        } else {
            console.error("Unexpected error:", error.message);
        }
        throw new Error('ショップ詳細の取得に失敗しました',error);
    }
}
