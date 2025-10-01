import { Link } from 'react-router';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import * as styles from './styles.module.css';

type ToggleBarProps = {
  pageId: number;
};

const POS = [
  { x: 0, width: 120 },
  { x: 140, width: 120 },
  { x: 280, width: 120 },
];

export default function ToggleBar({ pageId }: ToggleBarProps) {
  return (
    <GlassContainer
      className={styles.headerToggle}
      contentContainerClassName={styles.toggleBar}
    >
      <div
        className={styles.barTab}
        style={{
          width: POS[pageId].width,
          transform: `translateX(${POS[pageId].x}px)`,
        }}
      />
      <Link
        to="/"
        className={styles.toggleTab}
        style={pageId === 0 ? { pointerEvents: 'none', color: '#FFF' } : {}}
      >
        Анализ
      </Link>
      <Link
        to="/reports"
        className={styles.toggleTab}
        style={pageId === 1 ? { pointerEvents: 'none', color: '#FFF' } : {}}
      >
        Отчеты
      </Link>
      <Link
        to="/about"
        className={styles.toggleTab}
        style={pageId === 2 ? { pointerEvents: 'none', color: '#FFF' } : {}}
      >
        Инфо
      </Link>
    </GlassContainer>
  );
}
