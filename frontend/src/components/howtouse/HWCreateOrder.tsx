'use-client';

import HWTitle from '@/components/howtouse/HWTitle';

export default function HWCreateOrder({ no }: { no: number }) {
  return (
    <div>
      <HWTitle no={no}>メニューを作る</HWTitle>
      <div className="mx-6">
        <p>販売するメニューを登録します。</p>
        <p>販売する物の「名前」「完成までにかかる時間」を入力し、登録してください。</p>
      </div>
    </div>
  );
}
