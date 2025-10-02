import React from 'react';
import BlurLayer from '@ui/BlurContainer/BlurLayer';
import * as styles from './styles.module.css';

type GlassContainerProps = {
  className?: string;
  contentContainerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function GlassContainer({
  children,
  ...props
}: GlassContainerProps) {
  return (
    <div
      style={props.style ?? {}}
      className={[styles.glassContainer, props.className ?? ''].join(' ')}
    >
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
