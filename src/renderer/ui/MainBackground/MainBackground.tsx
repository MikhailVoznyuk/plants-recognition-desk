import React from 'react';
import * as styles from './styles.module.css';

export default function MainBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />
      <div className={styles.backgroundBlur} />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
}
