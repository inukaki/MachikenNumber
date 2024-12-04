export default async function OrderMenu({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div>
            <h1>Order Menu</h1>
            <p>Order menu page: {id}</p>
        </div>
    );
}
