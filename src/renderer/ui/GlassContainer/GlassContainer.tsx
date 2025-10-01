import React from 'react';
import BlurLayer from '@ui/BlurContainer/BlurLayer';
import * as styles from './styles.module.css';

type GlassContainerProps = {
  className?: string;
  contentContainerClassName?: string;
  children: React.ReactNode;
};

export default function GlassContainer({
  children,
  ...props
}: GlassContainerProps) {
  return (
    <div className={[styles.glassContainer, props.className ?? ''].join(' ')}>
      <BlurLayer />

      <div
        className={[
          styles.contentContainer,
          props.contentContainerClassName ?? '',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}
