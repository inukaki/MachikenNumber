export default async function CreateMenu({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <>
            <h1>Create Menu</h1>
            <p>Create menu page: {id}</p>
        </>
    );
}
