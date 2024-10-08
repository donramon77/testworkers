"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PlatformClickTraffic({ data, className }) {
  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Platform Click Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Platform Click Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((platform) => {
            const total = platform.invalid + platform.suspicious + platform.legitimate
            const invalidPercentage = total > 0 ? ((platform.invalid / total) * 100).toFixed(2) : "0.00"
            return (
              <div key={platform.platform} className="flex items-center">
                <div className="w-24 font-medium">{platform.platform}</div>
                <div className="flex-1 space-x-2">
                  <span className="inline-block w-12 text-right text-red-500">{(platform.invalid / 1000).toFixed(1)}K</span>
                  <span className="inline-block w-12 text-right text-yellow-500">{(platform.suspicious / 1000).toFixed(1)}K</span>
                  <span className="inline-block w-12 text-right text-green-500">{(platform.legitimate / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-16 text-right text-sm text-muted-foreground">{invalidPercentage}%</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}