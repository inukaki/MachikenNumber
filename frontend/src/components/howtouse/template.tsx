'use-client';

import HWTitle from '@/components/howtouse/HWTitle';

export default function template({ no }: { no: number }) {
  return (
    <div>
      <HWTitle no={no}>title</HWTitle>
      <div className="mx-6"></div>
    </div>
  );
}
