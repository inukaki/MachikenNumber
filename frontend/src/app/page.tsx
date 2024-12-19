import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HowtouseButton from '@/components/HowtouseButton';
import Image from "next/image";
import Top from '@/components/page/Top';
import Contents from '@/components/page/Contents';
// import Footer from '@/components/auth/Footer';

export default function Home() {
  return (
    <>
    <Top />
    <Contents />

      {/* <Footer /> */}
      <HowtouseButton/>
    </>
  );
}
