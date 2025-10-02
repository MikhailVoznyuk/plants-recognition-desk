import React from 'react';

import type { Report } from '@/types/Report';
import ReportPreview from '@components/ReportPreview/ReportPreview';
import * as styles from './styles.module.css';

export default function ReportsContainer({ reports }: { reports: Report[] }) {
  return (
    <div className={[styles.container].join(' ')}>
      {reports.map((report) => (
        <ReportPreview key={report.id} reportData={report} />
      ))}
    </div>
  );
}
