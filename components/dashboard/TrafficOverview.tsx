"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TrafficOverview({ data, className }) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Active Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    )
  }

  const totalClicks = data.reduce((sum, source) => sum + source.count, 0)

  const calculatePercentage = (value: number) => {
    return ((value / totalClicks) * 100).toFixed(2)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Active Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((source) => (
            <div key={source.source_type} className="flex items-center">
              <div className="w-36 font-medium">{source.source_type}</div>
              <div className="w-full">
                <Progress value={parseFloat(calculatePercentage(source.count))} className="h-2" />
              </div>
              <div className="w-20 text-right text-sm text-muted-foreground">{source.count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}