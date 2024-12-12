import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <Link href="/shop">
        <p>Shop</p>
      </Link>
      <Link href="client">
        <p>Customer</p>
      </Link>
    </div>
  );
}
