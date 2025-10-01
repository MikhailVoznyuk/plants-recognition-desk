import React from 'react';
import type { Report } from '@/types/Report';

import ReportsContainer from '@components/ReportsContainer/ReportsContainer';

export default function ReportPage() {
  const [reports, setReports] = React.useState<Report[]>([]);
  React.useEffect(() => {
    window.electron.reports
      .list()
      .then(async (reps) => {
        const loadedReps: Report[] = [];
        for (let rep of reps) {
          loadedReps.push({
            ...rep,
            imageFile: await window.electron.files.readAsDataUrl(rep.imageFile)
          });
        }
        setReports(loadedReps);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container">
      <ReportsContainer reports={reports} />
    </div>
  );
}
