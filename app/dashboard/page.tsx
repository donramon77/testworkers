"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '@/components/dashboard/Overview'
import { RecentSales } from '@/components/dashboard/RecentSales'
import { Search } from '@/components/dashboard/Search'
import { UserNav } from '@/components/dashboard/UserNav'
import { MainNav } from '@/components/dashboard/MainNav'
import { CalendarDateRangePicker } from '@/components/dashboard/DateRangePicker'
import { TrafficOverview } from '@/components/dashboard/TrafficOverview'
import { PlatformClickTraffic } from '@/components/dashboard/PlatformClickTraffic'
import { RoleBasedAccess } from '@/components/RoleBasedAccess'
import { useUser } from '@/hooks/useUser'
import { getRevenue, getSubscriptions, getSales, getActiveUsers, getTrafficSources, getPlatformClicks, getMonthlyRevenue } from '@/lib/supabase'
import { ArrowUpIcon, ArrowDownIcon, DollarSignIcon, UsersIcon, CreditCardIcon, ActivityIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

export default function DashboardPage() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState({
    revenue: null,
    subscriptions: null,
    sales: null,
    activeUsers: null,
    trafficSources: null,
    platformClicks: null,
    monthlyRevenue: null,
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1), // Start of current year
    to: new Date(),
  })

  const fetchDashboardData = useCallback(async (userId: string, range: DateRange | undefined) => {
    if (!userId || !range || !range.from || !range.to) return

    try {
      const [revenue, subscriptions, sales, activeUsers, trafficSources, platformClicks, monthlyRevenue] = await Promise.all([
        getRevenue(userId, range),
        getSubscriptions(userId, range),
        getSales(userId, range),
        getActiveUsers(userId, range),
        getTrafficSources(userId, range),
        getPlatformClicks(userId, range),
        getMonthlyRevenue(userId, range),
      ])

      setDashboardData({
        revenue,
        subscriptions,
        sales,
        activeUsers,
        trafficSources,
        platformClicks,
        monthlyRevenue,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user && dateRange) {
      fetchDashboardData(user.id, dateRange)
    }
  }, [user, loading, router, dateRange, fetchDashboardData])

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return null // The useEffect will redirect to login page
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker onDateRangeChange={handleDateRangeChange} />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData.revenue?.amount.toFixed(2) || '0.00'}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{dashboardData.subscriptions || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardData.sales?.amount.toFixed(2) || '0.00'}</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.activeUsers?.count || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={dashboardData.monthlyRevenue || []} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <TrafficOverview data={dashboardData.trafficSources || []} className="col-span-4" />
              <PlatformClickTraffic data={dashboardData.platformClicks || []} className="col-span-3" />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}