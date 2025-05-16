"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  score: {
    label: "Agreeness",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type EvalChartProps = {
  score: [number, number]
}

function getScoreColor(score: [number, number]) {
  const [classification, confidence] = score
  let dynamicColor = ""
  const displayedScore = classification === 0 ? 0.0001 : classification

  if (classification < 50) {
    const percent = classification / 50
    const hue = 0 // red
    const saturation = 50 * (1 - percent) * (confidence < 0.6 ? 0.8 : 1) // reduce saturation if confidence is low
    const lightness = 55 * (confidence < 0.6 ? 1.4 : 1) // reduce lightness if confidence is low
    // const lightness = 55 // softer brightness
    dynamicColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  } else {
    const percent = (classification - 50) / 50
    const hue = 120 // green
    const saturation = 30 * percent * (confidence < 0.6 ? 0.8 : 1) // reduce saturation if confidence is low
    const lightness = 55 * (confidence < 0.6 ? 1.4 : 1) // reduce lightness if confidence is low
    dynamicColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  return { displayedScore, dynamicColor }
}

export function EvalChart({ score  }: EvalChartProps) {

  let dynamicColor = ""
  const displayedScore = score[0] === 0 ? 0.0001 : score[0]

  dynamicColor = getScoreColor(score).dynamicColor


  const chartData = [
    {
      score: displayedScore,
      fill: dynamicColor,
    },
  ]

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={chartData[0].score * 3.6 - 180}
        startAngle={0}
        innerRadius={55}
        outerRadius={100}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[60, 50]}
          
        />
        <RadialBar dataKey="score" background />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {/* {score.toLocaleString()}% */}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
