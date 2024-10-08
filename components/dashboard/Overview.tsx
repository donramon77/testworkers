"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function Overview({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  const chartData = data.map(item => ({
    name: new Date(item.date).toLocaleDateString('default', { month: 'short' }),
    total: item.amount
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{ background: '#333', border: 'none' }}
          labelStyle={{ color: '#fff' }}
          formatter={(value) => [`$${value}`, 'Revenue']}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}