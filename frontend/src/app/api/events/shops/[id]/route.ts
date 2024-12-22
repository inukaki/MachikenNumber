// クライアントサイドからNESTのエンドポイントにfetchできないので、ここ経由で

interface fetchType {
    params: {id:string};
    method?: 'GET';
    headers?:{
        [key: string]: string;
    }
}
export default async function api({
    params,
    method='GET',
    headers={'Content-Type': 'application/json',}
}:fetchType) {
    const id = params.id;
    const res = await fetch(`${process.env.NEST_URL}/events/shops/${id}`, {
        method: method,
        headers: headers,
    });
    return res
}