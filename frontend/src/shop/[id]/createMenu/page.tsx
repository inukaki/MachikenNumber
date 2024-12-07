import { DataTable } from '@/components/dataTable/dataTable';
import CreateMenu from '@/app/shop/[id]/createMenu/newMenuForm';
import type { Payment } from '@/components/dataTable/columns';
import { columns } from '@/components/dataTable/columns';

async function getData(): Promise<Payment[]> {
    return [
        {
            id: '728ed52f',
            price: 100,
            name: '焼きそば',
            time: 10,
        },
        {
            id: '7ased52f',
            price: 80,
            name: '唐揚げ',
            time: 5,
        },
    ];
}

export default async function CreateMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const data = await getData();

    return (
        <div>
            <CreateMenu id={id} />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
