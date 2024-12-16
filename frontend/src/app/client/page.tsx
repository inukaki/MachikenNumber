import Link from 'next/link';

export default async function Client() {
  return (
    <div>
      <h1>Client</h1>
      <p>Client page</p>
      <Link href="/client/events" as="/client/events">
        <p>イベントを選ぶ</p>
      </Link>
    </div>
  );
}
