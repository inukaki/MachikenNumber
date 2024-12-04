export default async function ClientShop({ params }: { params: Promise<{ shop_id: string }> }) {
    const shopId = (await params).shop_id;
    return (
        <div>
            <h1>Client Shop</h1>
            <p>Client shop page: {shopId}</p>
        </div>
    );
}
