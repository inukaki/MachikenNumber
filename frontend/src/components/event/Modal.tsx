import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ModalProps {
  msg: string;
  children: ReactNode;
  custom?: { cont: string; func?: () => void }[];
}

const Modal: React.FC<ModalProps> = ({ msg, children, custom }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const defaultCustom = [{ cont: 'OK', func: () => {} }];
  const buttons = custom || defaultCustom;

  return (
    <div>
      <Button onClick={toggleModal}>{msg}</Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <Card className="w-[350px] max-w-[90%]">
            <CardContent className="pt-6">{children}</CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {buttons.map((btn, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => {
                    btn.func?.();
                    toggleModal();
                  }}>
                  {btn.cont}
                </Button>
              ))}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Modal;
