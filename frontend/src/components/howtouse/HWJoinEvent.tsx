'use-client';

import HWTitle from '@/components/howtouse/HWTitle';
import Tips from '@/components/ui/tips';
export default function HWJoinEvent({ no }: { no: number }) {
  return (
    <div>
      <HWTitle no={no}>イベントに参加する</HWTitle>
      <div className="mx-6">
        <p>
          「イベントの登録」を押すとイベントに参加するために必要なIDを入力する画面になります。
          <br />
          イベント管理者から発行されるイベントIDを入力し、「submit」を押してください。
        </p>
        <Tips title="参加しているイベントを確認するには？">ここに記載</Tips>
      </div>
    </div>
  );
}
