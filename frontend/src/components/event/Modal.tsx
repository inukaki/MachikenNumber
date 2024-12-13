import React, { useState, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
type ModalProps = {
  msg:string
  children: ReactNode
  custom?: btninfo[]
}
interface btninfo {
  cont: string;
  func?: () => void;
}

const Modal = ({msg,children,custom}: ModalProps) => {
  const buttonStyle = ``;
  const overlayStyle = `fixed w-screen h-screen bg-gray-500/50 inset-0`;
  const modalStyle = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[350px] items-center p-3`;
  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  } // 表示非表示
  const defaultCustom:btninfo[] = [
    {cont:"OK",func:() => {}}
  ] // デフォ指定
  custom = custom || defaultCustom;
  const checkType = () => {
    try{
      return(
        <div className='flex row justify-between gap-2'>
          {custom.map((elm) => (
            <Button className="flex-1" variant="outline" onClick={() => {elm['func']?.();toggleModal()}}>{elm['cont']}</Button>
          ))}
        </div>
      );
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div>
      <Button
        className={buttonStyle}
        onClick={toggleModal}
      >
        {msg}
      </Button>
      {isOpen && (
        <div className={overlayStyle}>
          <Card className={modalStyle}>
            {children}
            {checkType()}
          </Card>
        </div>
      )}
    </div>
  )
}

export default Modal;