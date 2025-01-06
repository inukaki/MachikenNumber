import axios, { AxiosInstance } from 'axios';   
import { NextResponse } from 'next/server';

const axiosReq: AxiosInstance = axios.create({
    baseURL: `${process.env.NEST_URL}`,
    timeout: 5000,
    responseType: 'json',
});

const decoderToJson = async (body:ReadableStream<Uint8Array<ArrayBufferLike>> | null) => {
    if (!body) {
        throw new Error('Request body is null');
    }
    const reader = body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
    }
    result += decoder.decode();

    return result;
}

export async function GET(request: Request) {
    const headers = new Headers(request.headers);
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.get(`/events`, { headers: axiosHeaders });
        return NextResponse.json(response.data)
    } catch (error: any) {
        if (error.response) {
            console.error("Axios error:", error.response.data);
        } else {
            console.error("Unexpected error:", error.message);
        }
        throw new Error('イベント詳細の取得に失敗しました',error);
    }
}

export async function POST(request: Request) {
    const headers = new Headers(request.headers);
    const body = await decoderToJson(request.body);
    const axiosHeaders: { [key: string]: string } = {"Content-Type": "application/json"};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });
    
    try {
        const response = await axiosReq.post(`/events`, body, { headers: axiosHeaders });
        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response) {
            console.error("Axios error:", error.response.data);
            return NextResponse.json(error.response);
        } else {
            console.error("Unexpected error:", error.message);
        }
        throw new Error('イベント詳細の取得に失敗しました',error); // エラーメッセージのカスタマイズ
    }
}