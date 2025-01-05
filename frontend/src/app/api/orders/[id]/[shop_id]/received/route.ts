import axios, { AxiosInstance } from 'axios';   
import { NextResponse } from 'next/server';

const axiosReq: AxiosInstance = axios.create({
    baseURL: `${process.env.NEST_URL}`,
    timeout: 20000,
    responseType: 'json',
});

export async function PATCH(request: Request, { params }: { params: { id: string, shop_id: string  } }) {
    const order_id = params.id;
    const shop_id = params.shop_id;
    const headers = new Headers(request.headers);
    const body = request.body;
    const axiosHeaders: { [key: string]: string } = {};

    headers.forEach((value, key) => {
        axiosHeaders[key] = value;
    });

    try {
        const response = await axiosReq.patch(`/orders/${order_id}/${shop_id}/received`, body, { headers: axiosHeaders });
        return NextResponse.json(response.data)
    } catch (error: any) {
        if (error.response) {
            console.error("Axios error:", error.response.data);
        } else {
            console.error("Unexpected error:", error.message);
        }
        throw new Error('注文の状態変更に失敗しました',error);
    }
}
