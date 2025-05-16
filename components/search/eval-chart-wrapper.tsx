"use client";

import { useEffect, useState } from "react";
import { EvalChart } from "./eval-chart";
import { EvalChartSkeleton } from "./eval-chart-skeleton";
import { classify } from "@/app/actions";
import { doc } from "../types";

export default function EvalChartWrapper({ doc, q, scoreCache, setScoreCache }: { doc: doc; q: string; scoreCache: Record<string, [number, number]>; setScoreCache: React.Dispatch<React.SetStateAction<Record<string, [number, number]>>>; }) {
    const [score, setScore] = useState<[number, number] | null>(scoreCache[doc.url] ?? null);


    useEffect(() => {
        if (score !== null) {
            console.log("Already cached");
            return; // Already cached
        }

        let cancelled = false;

        classify(q, doc.url).then((stance) => {
            if (!cancelled) {
                const newScore =
                    stance.classification === -1
                        ? 0
                        : stance.classification === 0
                            ? 50
                            : 100;
                
                setScore([newScore, stance.agreementscore]);
                setScoreCache((prev) => ({
                    ...prev,
                    [doc.url]: [newScore, stance.agreementscore]
                }));
            }
        });

        return () => {
            cancelled = true;
        };
    }, [q, doc.url]);

    if (score === null) {
        return <EvalChartSkeleton />;
    }

    return <EvalChart score={score} />;
}
