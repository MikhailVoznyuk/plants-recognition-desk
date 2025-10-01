import React from 'react'

import {saveReport} from "@/lib/storage/reports";
import createReport from "@/lib/dev/createReport";

import type PickedImage from "@/types/PickedImage";
import Report from "@/types/Report";



export default async function process(image: PickedImage): Promise<unknown> {
    try {
            const report = await createReport(image);
        await saveReport(report);

    } catch (err) {
        return err
    }
}
