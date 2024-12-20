interface PatchDataT {
    shop_id: string
    status: boolean
}[]

interface PatchDataBackT {
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

export async function PATCH(
    request: Request,
    updateData: PatchDataT,
    { params }: { params: { id: string } },
) {
    const apiUrl = "";
    const event_id = Number(params.id)
    const reqUrl = `${apiUrl}/${event_id}`;
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
        const data:PatchDataBackT = await response.json();
        return data;
    } catch (error) {
        return {error:error}
    }
}