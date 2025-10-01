import { Link } from 'react-router';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import * as styles from './styles.module.css';

export default function LoadingBlock({
  reportsCounter,
}: {
  reportsCounter: number[];
}) {
  return (
    <GlassContainer
      className={styles.loadingContainer}
      contentContainerClassName={styles.loadingBlock}
    >
      <span>{`Обработано ${reportsCounter[1]} из ${reportsCounter[0]}`}</span>
      {reportsCounter[1] > 0 ? (
        <Link className={styles.linkButton} to="/reports">
          Открыть отчеты
        </Link>
      ) : null}
    </GlassContainer>
  );
}
