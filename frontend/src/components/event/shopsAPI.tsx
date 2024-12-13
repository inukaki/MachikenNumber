import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { type EventId, type DataProps, type PostProps } from "@/components/type/Apis";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
const checkSession = async({event_id}:EventId) => {
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


const defaultResponse:DataProps = {
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
// const POST = async (id:string, newData:PostProps) => {
async function POST({event_id}:EventId, newData:PostProps){
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
async function GET({event_id}:EventId){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${event_id}`);
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
async function PATCH({event_id}:EventId, updateData:PostProps){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${event_id}`, {
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
async function DELETE({event_id}:EventId){
  return {status:200, data:{defaultResponse}};
  try {
    const response = await fetch(`${baseUrl}/api/events/${event_id}`, {
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

export { POST, GET, DELETE, PATCH }