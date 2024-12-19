interface PostDataT {
    shop_id: string
}

interface PostDataBackT {
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

export async function POST(
    request: Request,
    updateData: PostDataT,
    { params }: { params: { id: string } },
) {
    const apiUrl = "";
    const event_id = Number(params.id)
    const reqUrl = `${apiUrl}/events/${event_id}`;
    try {
        const response = await fetch(reqUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data:PostDataBackT = await response.json();
        return data;
    } catch (error) {
        return {error:error}
    }
}

export async function DELETE(
    request: Request,
    updateData: PostDataT,
    { params }: { params: { id: string } },
) {
    const apiUrl = "";
    const event_id = Number(params.id)
    const reqUrl = `${apiUrl}/${event_id}`;
    try {
        const response = await fetch(reqUrl,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.status;
        return data;
    } catch (error) {
        return {error:error}
    }
}