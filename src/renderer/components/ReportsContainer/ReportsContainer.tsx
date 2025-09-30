import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import ReportPreview from "@/components/ReportPreview/ReportPreview";

import type Report from "@/types/Report";

export default function ReportsContainer({reports}: {reports: Report[]}) {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.reportsContainer, {paddingTop: insets.top + 40, paddingBottom: insets.bottom + 100}]}>
            {reports.map((report) => (
                <ReportPreview key={report.id} reportData={report} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    reportsContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 16
    }
})