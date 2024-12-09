import Link from 'next/link';

export default async function Client() {
  return (
    <div>
      <h1>Client</h1>
      <p>Client page</p>
      <Link href="/client/1" as="/client/1">
        <p>Client Shop</p>
      </Link>
    </div>
  );
}
