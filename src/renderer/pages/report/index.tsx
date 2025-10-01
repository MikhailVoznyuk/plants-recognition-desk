import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import ReportObjectBlock from '@components/ReportObjectBlock/ReportObjectBlock';
import MainBackground from '@ui/MainBackground/MainBackground';
import BlurLayer from '@ui/BlurContainer/BlurLayer';
import SectionLabel from '@ui/SectionLabel/SectionLabel';

import type { Report } from '@/types/Report';
import * as styles from './style.module.css';



export default function ReportScreen() {
  const [report, setReport] = useState<Report | null>(null);
  const id = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.reports.get(id).then((res) => setReport(res));
  }, []);

  return (
    <MainBackground>
      <BlurLayer />
      <div className={styles.container}>
        <SectionLabel text={`Отчет от ${report?.date}`} />
        <div className={styles.contentSection}>
          <div>
            <img
              className={styles.reportImage}
              alt="analysed image"
              src={report?.imageFile}
            />
          </div>
        </div>
        <SectionLabel text="Обнаруженные объекты" />
        <div className={[styles.contentSection, styles.centerContainer]}>
          {report?.objects?.map((obj, index) => (
            <ReportObjectBlock key={index} data={obj} id={index + 1} />
          ))}
        </div>
      </div>
    </MainBackground>
  );
}
