'use-client';

import HWTitle from '@/components/howtouse/HWTitle';

export default function HWCreateShop({ no }: { no: number }) {
  return (
    <div>
      <HWTitle no={no}>ショップの初期設定をする</HWTitle>
      <div className="mx-6">ショップの名前や説明を入力してください。</div>
    </div>
  );
}
