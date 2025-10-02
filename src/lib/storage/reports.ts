
import type Report from '@/types/Report';

export async function getAllReports(): Promise<object[]> {
  /*
    try {
        const storageValue: string | null = await AsyncStorage.getItem('reports');
        let reports: Report[];
        if (storageValue) {
            reports = JSON.parse(storageValue);
        } else {
            reports = [];
        }
        return reports;
    }
    catch (error) {
        return [];
    } */
  return [{}];
}

export async function getReport(reportId: string) {
  /*
    const reports = await getAllReports();
    for (let report of reports) {
        if (report.id === reportId) {
            return report;
        }
    }
    return null;

   */
  return {};
}

export async function saveReport(report: Report): Promise<boolean> {
  /*
    const reports: Report[] = await getAllReports();
    reports.push(report);

    try {
        await AsyncStorage.setItem('reports', JSON.stringify(reports));
        return true;
    }
    catch (error) {
        return false;
    }

   */
  return true;
}
