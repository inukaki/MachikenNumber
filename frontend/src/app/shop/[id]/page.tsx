'use server';

export default async function ShopDetail({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    return (
        <div>
            <h1>Shop Detail</h1>
            <p>Shop detail page: {id}</p>
        </div>
    );
}
