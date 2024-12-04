export default async function OrderList({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div>
            <h1>Order List</h1>
            <p>Order list page: {id}</p>
        </div>
    );
}
