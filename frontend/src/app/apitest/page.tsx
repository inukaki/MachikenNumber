import React, { useEffect, useState } from 'react';

import { NextResponse } from "next/server"

interface PatchDataT {
    name: string
    start_at: string
    end_at: string
    description :string
}

interface GetDataBackT {
    event_id: string
    name: string
    shops:{
        shop_id: string
        name: string
        start_at: string
        end_at: string
        description: string
        status: boolean
    }[]
    start_at: string
    end_at: string
    description: string
}

export async function GET(
    // request: Request,
    // { params }: { params: { id: string } },
) { 
    const apiUrl = "nya2:3306";
    const event_id = "cm4s1co3j0000bm6pt1zlj8hh"
    const reqUrl = `${apiUrl}/events/${event_id}`;
    try {
        const response = await fetch(reqUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data:GetDataBackT = await response.json();
        return data;
    } catch (error) {
        return null
    }
}

export async function PATCH(
    request: Request,
    updateData: PatchDataT,
    { params }: { params: { id: string } },
) {
    const apiUrl = "";
    const event_id = Number(params.id)
    const reqUrl = `${apiUrl}/events/${event_id}`;
    try {
        const response = await fetch(reqUrl,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data:GetDataBackT = await response.json();
        return data;
    } catch (error) {
        return {error:error}
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    const apiUrl = "";
    const event_id = Number(params.id)
    const reqUrl = `${apiUrl}/events/${event_id}`;
    try {
        const response = await fetch(reqUrl,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.status;
        return data;
    } catch (error) {
        return {status:500,error:error}
    }
}



const EventPage: React.FC = () => {
    const [eventData, setEventData] = useState<GetDataBackT | null >(null);
    const [error, setError] = useState<string | string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await GET(); // APIからデータを取得
            if (data) {
                setEventData(data); // データが取得できたらステートに保存
            } else {
                setError('Failed to fetch event data'); // データ取得に失敗した場合
            }
        };

        getData(); // データ取得関数を呼び出す
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // エラーがあれば表示
    }

    if (!eventData) {
        return <div>Loading...</div>; // データがまだ取得できていない場合
    }

    return (
        <div>
            <h1>{eventData.name}</h1>
            <p>{eventData.description}</p>
            <p>Start: {eventData.start_at}</p>
            <p>End: {eventData.end_at}</p>
            <h2>Shops</h2>
            <ul>
                {eventData.shops.map((shop) => (
                    <li key={shop.shop_id}>
                        <h3>{shop.name}</h3>
                        <p>{shop.description}</p>
                        <p>Start: {shop.start_at}</p>
                        <p>End: {shop.end_at}</p>
                        <p>Status: {shop.status ? 'Open' : 'Closed'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventPage;