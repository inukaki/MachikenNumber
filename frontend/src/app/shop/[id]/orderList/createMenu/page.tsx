export default async function CreateMenu({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div>
            <h1>Create Menu</h1>
            <p>Create menu page: {id}</p>
        </div>
    );
}
