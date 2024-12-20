import HowtouseButton from '@/components/HowtouseButton';
import Top from '@/components/page/Top';
import Contents from '@/components/page/Contents';
import AOSInitializer from '@/components/AOSInitializer';

export default function Home() {
  return (
    <>
      <AOSInitializer />
      <Top />
      <Contents />
      {/* <Footer /> */}
      <HowtouseButton />
    </>
  );
}
