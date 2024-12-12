//消してもいいかな？from shimayuu
export default async function WaitList({
  params,
}: {
  params: Promise<{ shop_id: string; id: string }>;
}) {
  const { shop_id: shopId, id } = await params;
  return (
    <div>
      <h1>Wait List</h1>
      <p>
        Wait list page: {shopId}, {id}
      </p>
    </div>
  );
}
