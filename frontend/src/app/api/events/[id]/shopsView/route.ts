// クライアントサイドからNESTのエンドポイントにfetchできないので、ここ経由で

interface fetchType {
    params: {id:string};
    method: 'PATCH';
    headers?:{
        [key: string]: string;
    }
    body?: string | object | null | undefined;
}
export default async function api({
    params,
    method,
    headers={'Content-Type': 'application/json',},
    body=null
}:fetchType) {
    const id = params.id
    if (typeof body === 'object') {
        body = JSON.stringify(body);
    }
    const res = await fetch(`${process.env.NEST_URL}/events/${id}/shopsView`, {
        method: method,
        headers: headers,
        body: body,
    });
    return res
}