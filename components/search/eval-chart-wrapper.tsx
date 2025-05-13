"use client";

import { useEffect, useState } from "react";
import { EvalChart } from "./eval-chart";
import { EvalChartSkeleton } from "./eval-chart-skeleton";
import { classify } from "@/app/actions";
import { doc } from "../types";

export default function EvalChartWrapper({ doc, q }: { doc: doc; q: string }) {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    classify(q, doc.url).then((stance) => {
      if (!cancelled) {
        const newScore =
          stance.classification === -1
            ? 0
            : stance.classification === 0
            ? 50
            : 100;
        setScore(newScore);
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
