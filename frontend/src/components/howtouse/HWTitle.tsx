'use-client';

import React from 'react';
interface HWTitleProps {
  no: number;
  children: React.ReactNode;
}
export default function HWTitle({ no, children }: HWTitleProps) {
  // const noS = no.toString();
  const h2ClassName = `before:content-[attr(attr-cont)] before:mx-3 before:w-4 before:inline-block py-2 my-2 text-xl font-bold border-l-4 border-b-2 border-black`;
  return (
    <h2 attr-cont={no} className={h2ClassName}>
      {children}
    </h2>
  );
}
