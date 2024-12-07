export default async function WaitList({ params }: { params: Promise<{ shop_id: string }> }) {
    const shopId = (await params).shop_id;
    return (
        <div>
            <h1>Wait List</h1>
            <p>Wait list page: {shopId}</p>
        </div>
    );
}
