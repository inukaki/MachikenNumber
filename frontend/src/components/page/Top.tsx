'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Top() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.refresh();
    }
  }, []);

  return (
    <div className="relative h-[50vh]">
      <div className="absolute left-0 size-full overflow-hidden">
        <div>
          <Image
            src="/top.webp"
            alt="マチケンナンバ"
            layout="fill"
            className="absolute left-0 top-0 object-cover blur-sm"
          />
          <div className="absolute top-1/2 size-full -translate-y-1/2 bg-white/50"></div>
          <Image
            src="/logos/textonly/bg-no.svg"
            alt="マチケンナンバ"
            width={1280}
            height={256}
            layout="responsive"
            className="absolute top-1/3 -translate-y-1/2"
            data-aos="zoom-in"
          />
        </div>
      </div>
    </div>
  );
}
