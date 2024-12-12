import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
type PostType = {
  name:string
  start_at:string
  end_at:string
  description:string
}
type DataType = {
  "event_id": string
  "name": string
  "shops": shopType[]
  "start_at": string
  "end_at": string
  "description":string
}
interface shopType {
  "shop_id": string
  "name": string
  "start_at": string
  "end_at": string
  "description": string
}
type backData = {
  status:number
  data?:string[] | string
}
const Unauthorized = {
  status:'401',
  data:'Unauthorized'
}
const Forbidden = {
  status:'403',
  data:'Forbidden'
}
const OK = {
  status:'200'
}

// 認証関係のチェック（イベントIDとユーザーの確認もする。）
const checkSession = async(event_id:string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return(Unauthorized);
  }
  const loggedInUserId = session.user.id;
  if (loggedInUserId !== event_id) {
    return(Forbidden);
  }
  return(OK)
}


const defaultResponse:DataType = {
  "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "shops": [
    {
      "shop_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "start_at": "2024-12-10T05:32:05.681Z",
      "end_at": "2024-12-10T05:32:05.681Z",
      "description": "string"
    },
    {
      "shop_id": "no2",
      "name": "string",
      "start_at": "2024-12-10T05:32:05.681Z",
      "end_at": "2024-12-10T05:32:05.681Z",
      "description": "string"
    }
  ],
  "start_at": "2024-12-10T05:32:05.681Z",
  "end_at": "2024-12-10T05:32:05.681Z",
  "description": "string"
}




// POST リクエストを送信する関数
//const POST = async (id:string, newData:PostType) => {
export async function POST(id:string, newData:PostType){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    const result = await response.json();
    return { status: response.status, data: result }; // 結果を返す
  } catch (error) {
    console.error(error);
    return { status: 500 , data: `Error: ${error}` };
  }
};

// GET リクエストを送信する関数
export async function GET(id:string){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event data');
    }
    const data = await response.json();
    return { status: response.status, data: data }; // 結果を返す
  } catch (error) {
    console.error(error);
    return { status: 500 , data: `Error: ${error}` };
  }
};

// PATCH リクエストを送信する関数
export async function PATCH(id:string, updateData:PostType){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error('Failed to update event');
    }
    const result = await response.json();
    return { status: response.status, data: result }; // 結果を返す
  } catch (error) {
    console.error(error);
    return { status: 500 , data: `Error: ${error}` };
  }
};

// DELETE リクエストを送信する関数
export async function DELETE(id:string){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    const result = await response.json();
    return { status: response.status, data: result }; // 結果を返す
  } catch (error) {
    console.error(error);
    return { status: 500 , data: `Error: ${error}` };
  }
};

export { type DataType }