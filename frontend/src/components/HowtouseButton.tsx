import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image";

interface type {
  type?:string
}
const HowtouseButton = ({type}:type) => {
  const cn = `block fixed bottom-10 left-10`;
  let link: string;
  switch (type) {
    case 'shop':
      link = "/howtouse/shop";
      break;
    case 'event':
      link = "/howtouse/event";
      break;
    default:
      link = "/howtouse";
  }
  return (
    <div className={cn}>
      <Link href={link}>
        <Image src="/uis/q.svg" alt="" width={50} height={50}/>
      </Link>
    </div>
  )
}

export default HowtouseButton;