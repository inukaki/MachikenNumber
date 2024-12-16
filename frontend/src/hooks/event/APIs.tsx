'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { type EventId, type DataProps, type PostProps, type BackData } from "@/components/type/Apis";
import { eventIdSchema } from '@/schema/eventIdSchema';

// const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseUrl = 'nya2:3000';
const Unauthorized:BackData = {
  status:401,
  data:'Unauthorized'
}
const Forbidden:BackData = {
  status:403,
  data:'Forbidden'
}
const OK:BackData = {
  status:200
}
interface GetDeleteProps {
  event_id: string;
  children?: React.ReactNode; // childrenをオプショナルに追加
}
interface PostPatchProps {
  event_id: string;
  data: PostProps;
  children?: React.ReactNode; // childrenをオプショナルに追加
}

const defaultResponse:DataProps = {
  event_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  name: "string",
  shops: [
    {
      shop_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      start_at: "2024-12-10T05:32:05.681Z",
      end_at: "2024-12-10T05:32:05.681Z",
      description: "string"
    },
    {
      shop_id: "no2",
      name: "string",
      start_at: "2024-12-10T05:32:05.681Z",
      end_at: "2024-12-10T05:32:05.681Z",
      description: "string"
    }
  ],
  start_at: "2024-12-10T05:32:05.681Z",
  end_at: "2024-12-10T05:32:05.681Z",
  description: "string"
}
// POST リクエストを送信する関数
async function POSTf({event_id}:EventId, newData:PostProps){
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

async function GETf({event_id}:EventId){
  return await {status:200, data:defaultResponse} ;
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
async function PATCHf({event_id}:EventId, updateData:PostProps){
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
async function DELETEf({event_id}:EventId){
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
const LoadingMsg = () => {
  return(
    <>Nowloading...</>
  )
}
const ErrorMsg = ({error}:{error:string}) => {
  return(
    <>error occured : {error}</>
  )
}
const GET: React.FC<GetDeleteProps> = ({ event_id, children }) => {
  const [shopList, setShopList] = useState<DataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/events/${event_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // const result: DataProps = await response.json();
        const result = {
          "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "shops": [
            {
              "shop_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "name": "string",
              "start_at": "2024-12-13T12:50:44.646Z",
              "end_at": "2024-12-13T12:50:44.646Z",
              "description": "string"
            }
          ],
          "start_at": "2024-12-13T12:50:44.646Z",
          "end_at": "2024-12-13T12:50:44.646Z",
          "description": "string"
        }
        setShopList(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (<></>);
  if (error) return (<></>);
  return (<>{children}</>);
};

const POST: React.FC<PostPatchProps> = ({ event_id, data, children }) => {
  const [shopList, setShopList] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopList = async () => {
      const result = await POSTf({ event_id },data);
      if (result.status !== 200) {
        setError(result.data);
      } else {
        setShopList(result.data);
      }
    };
    fetchShopList();
  }, [event_id]);

  if (error) {
    return(
      <ErrorMsg
        error={error}
      />
    );
  }

  if (!shopList) {
    return <LoadingMsg />;
  }

  return (<>{children}</>);
};

const PATCH: React.FC<PostPatchProps> = ({ event_id, data, children }) => {
  const [shopList, setShopList] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopList = async () => {
      const result = await PATCHf({ event_id },data);
      if (result.status !== 200) {
        setError(result.data);
      } else {
        setShopList(result.data);
      }
    };
    fetchShopList();
  }, [event_id]);

  if (error) {
    return(
      <ErrorMsg
        error={error}
      />
    );
  }

  if (!shopList) {
    return <LoadingMsg />;
  }

  return (<>{children}</>);
};

const DELETE: React.FC<GetDeleteProps> = ({ event_id, children }) => {
  const [shopList, setShopList] = useState<DataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/events/${event_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: DataProps = await response.json();
        setShopList(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (<></>);
  if (error) return (<></>);
  return (<>{children}</>);
};
export { GET, POST, PATCH, DELETE };

// const shopListGet = await GET({event_id}).then((response) => {
//   return { status: response.status, data: response.data.json()};
// });