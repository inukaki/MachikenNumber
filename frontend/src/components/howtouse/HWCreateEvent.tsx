'use-client';

import HWTitle from '@/components/howtouse/HWTitle';

export default function HWCreateEvent({ no }: { no: number }) {
  return (
    <div>
      <HWTitle no={no}>イベントの初期設定をする</HWTitle>
      <div className="mx-6">イベントの名前や説明を入力してください。</div>
    </div>
  );
}
