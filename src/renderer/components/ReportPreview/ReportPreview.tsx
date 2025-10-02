import { Link } from 'react-router';

import GlassContainer from '@ui/GlassContainer/GlassContainer';
import type { Report } from '@/types/Report';
import * as styles from './styles.module.css';

export default function ReportPreview({ reportData }: { reportData: Report }) {
  return (
    <GlassContainer
      className={styles.container}
      contentContainerClassName={styles.contentContainer}
    >
      <div className={styles.header}>
        <h5
          className={styles.headerText}
        >{`Отчет - ${reportData.id.slice(0, 5)}`}</h5>
      </div>
      <div className={styles.content}>
        <img
          className={styles.contentImage}
          alt="report"
          src={reportData.imageFile}
        />
        <div className={styles.textContainer}>
          <span
            className={styles.contentText}
          >{`Дата: ${reportData.date}`}</span>
          <span
            className={styles.contentText}
          >{`Объектов на фото: ${reportData.objects.length}`}</span>
        </div>
      </div>
      <Link className={styles.button} to={`../reports/${reportData.id}`}>
        Открыть
      </Link>
    </GlassContainer>
  );
}
