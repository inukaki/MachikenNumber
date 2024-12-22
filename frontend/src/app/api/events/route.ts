// クライアントサイドからNESTのエンドポイントにfetchできないので、ここ経由で


const axiosBase = require('axios');
const axios = axiosBase.create({
    baseUrl: 'https://nya2:3002',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
});

interface fetchType {
    method?: 'GET' | 'POST';
    headers?:{
        [key: string]: string;
    }
    body?: string | object | null | undefined;
}

export default async function api({
    method='GET',
    headers={'Content-Type': 'application/json',},
    body=null
}:fetchType) {
    if (typeof body === 'object') {
        body = JSON.stringify(body);
    }
    const res = await axios.get('/events')
    return res
}


// export default async function api({
//     method='GET',
//     headers={'Content-Type': 'application/json',},
//     body=null
// }:fetchType) {
//     if (typeof body === 'object') {
//         body = JSON.stringify(body);
//     }
//     const res = await fetch(`https://nya2:3002/events`, {
//         method: method,
//         headers: headers,
//         body: body,
//     });
//     return res
// }

// export async function GET({
//     method='GET',
//     headers={'Content-Type': 'application/json',},
//     body=null
// }:fetchType){
//     if (typeof body === 'object') {
//         body = JSON.stringify(body);
//     }
//     const res = await fetch(`https://nya2:3002/events`, {
//         method: 'GET',
//         headers: headers,
//         body: body,
//     });
//     return res 
// }