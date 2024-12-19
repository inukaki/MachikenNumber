import { DataTable } from '@/components/menu/dataTable/dataTable';
import CreateMenu from '@/app/shop/[id]/createMenu/newMenuForm';
import type { Payment } from '@/components/menu/dataTable/columns';
import { columns } from '@/components/menu/dataTable/columns';

async function getData(id: string): Promise<Payment[]> {
  const res = await fetch(`http://localhost:3001/items/${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

export default async function CreateMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const data = await getData(id);
  console.log(data);

  return (
    <div>
      <CreateMenu id={id} />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
