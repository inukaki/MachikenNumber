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
    request: Request,
    { params }: { params: { id: string } },
) {
    const apiUrl = "nya2:3306";
    const event_id = Number(params.id)
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
        return {error:error}
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