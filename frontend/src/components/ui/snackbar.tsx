import type { ReactNode, FC } from 'react';
import { useState, useEffect } from 'react';
type T = {
  type: string;
  msg: string;
  delay?: number;
  children?: ReactNode;
};
interface bgt {
  [key: string]: string;
}
// const sleep = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000));
const Snackbar: FC<T> = ({ type, msg, delay = -1, children }) => {
  delay *= 1000;
  // const animationStyle = { animation: `line 3s linear` };
  const [isVisible, setIsVisible] = useState(false);
  const showSnackbar = () => {
    scale = '0';
    setIsVisible(true);
  };
  useEffect(() => {
    if (isVisible && delay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);
  const typeS = type !== 'info' ? type + ':' : '';
  const bg: bgt = {
    warn: 'bg-red-500 text-white',
    info: 'bg-green-500 text-white',
    alart: 'bg-yellow-500 text-white',
  };
  let scale = `-100%`;
  const snackStyle = `relative h-12 w-full p-2 box-border rounded item-center overflow-hidden ${bg[type]}`;
  const barStyle = `absolute h-1 w-full bottom-0 left-0 box-border bg-gray-500 opacity-50`;
  const output: JSX.Element = (
    <div className="pointer-events-auto fixed bottom-0 left-0 flex h-fit w-screen p-6">
      <div className={snackStyle}>
        {typeS}
        {msg}
        <div
          className={barStyle}
          style={{
            transform: `translateX(${scale})`,
            transition: `translate ${delay}ms linear`,
          }}></div>
      </div>
      <button
        className="absolute right-12 top-1/2 h-full w-fit -translate-y-1/2 text-xl text-white"
        onClick={() => setIsVisible(false)}>
        X
      </button>
    </div>
  );
  return (
    <div>
      <button className="bg-red-500" onClick={showSnackbar}>
        {children}
      </button>
      {isVisible ? output : null}
    </div>
  );
};

export default Snackbar;
