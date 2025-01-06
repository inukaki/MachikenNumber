import axios, { AxiosInstance } from 'axios';   
import { NextResponse } from 'next/server';

const axiosReq: AxiosInstance = axios.create({
    baseURL: `${process.env.NEST_URL}`,
    timeout: 20000,
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const event_id = params.id;
    const headers = new Headers(request.headers);
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.get(`/events/${event_id}`, { headers: axiosHeaders });
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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const event_id = params.id;
    const headers = new Headers(request.headers);
    const body = await decoderToJson(request.body);
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.patch(`/events/${event_id}`, body, { headers: axiosHeaders });
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const event_id = params.id;
    const headers = new Headers(request.headers);
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.delete(`/events/${event_id}`, { headers: axiosHeaders });
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