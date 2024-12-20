import Link from 'next/link';
import Image from 'next/image';

interface type {
  type?: string | null;
}
const HowtouseButton = ({ type }: type) => {
  const cnDef = `block fixed bottom-10 left-10 bg-white bg-opacity-50 z-50 rounded-full`;
  const cnLoggin = 'block mr-3';
  let cn: string;
  let link: string;
  switch (type) {
    case 'shop':
      link = '/howtouse/shop';
      cn = cnLoggin;
      break;
    case 'event':
      link = '/howtouse/event';
      cn = cnLoggin;
      break;
    default:
      link = '/howtouse';
      cn = cnDef;
  }
  return (
    <div className={cn}>
      <Link href={link} target="_blank">
        <Image src="/uis/q.svg" alt="" width={50} height={50} />
      </Link>
    </div>
  );
};

export default HowtouseButton;
