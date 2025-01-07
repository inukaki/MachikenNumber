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
    const response = await axiosReq.get(`/orders/${shop_id}/unready`, { headers: axiosHeaders });
    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('Axios error:', error.response.data);
    } else {
      console.error('Unexpected error:', error.message);
    }
    throw new Error('注文情報の取得に失敗しました', error);
  }
}
