'use server';

export const submitOrder = async (orderData: any) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error('注文送信に失敗しました');
  }

  return response.json();
};

export const fetchOrders = async () => {
  // const data = await fetch('/api/orders');
  const data = [
    {
      id: '1',
      status: '受付中',
      createdAt: new Date().toISOString(),
      items: [
        {
          id: '1',
          name: '焼きそば',
          quantity: 2,
          price: 100,
        },
        {
          id: '2',
          name: '唐揚げ',
          quantity: 1,
          price: 80,
        },
      ],
    },
    {
      id: '2',
      status: '受付中',
      createdAt: new Date().toISOString(),
      items: [
        {
          id: '1',
          name: '焼きそば',
          quantity: 1,
          price: 100,
        },
        {
          id: '2',
          name: '唐揚げ',
          quantity: 3,
          price: 80,
        },
      ],
    },
  ];

  if (!data) {
    throw new Error('注文リストの取得に失敗しました');
  }
  console.log('data', data);

  return data.map((order) => ({
    ...order,
    createdAt: new Date(order.createdAt).toISOString(),
  }));
};
