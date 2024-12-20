import ShopList from '@/components/event/ShopList';

export default function EventShopsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4">
      <ShopList event_id={params.id} />
    </div>
  );
}
