import React from 'react';
import * as styles from './styles.module.css'
type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  callback: (...args: unknown[]) => unknown;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={[styles.btnPrimary, props.className ?? ''].join(' ')}
      onClick={props.callback}
    >
      {children}
    </button>
  );
}
