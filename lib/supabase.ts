import { createClient } from '@supabase/supabase-js'
import { DateRange } from 'react-day-picker'

const supabaseUrl = 'https://rzwdpjoiaviqfhhfttps.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6d2Rwam9pYXZpcWZoaGZ0dHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwNTc4MDUsImV4cCI6MjA0MzYzMzgwNX0.US1ySwdQ-XTpUQ75XRmAoE0_rzJRVd0etxSwJNkc3l4'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getRevenue(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('revenue')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
    .order('date', { ascending: false })
    .limit(1)
  
  if (error) throw error
  return data[0]
}

export async function getSubscriptions(userId: string, dateRange: DateRange) {
  const { count, error } = await supabase
    .from('subscriptions')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
  
  if (error) throw error
  return count
}

export async function getSales(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('sales')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
    .order('date', { ascending: false })
    .limit(1)
  
  if (error) throw error
  return data[0]
}

export async function getActiveUsers(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('active_users')
    .select('count, date')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
    .order('date', { ascending: false })
    .limit(1)
  
  if (error) throw error
  return data[0]
}

export async function getTrafficSources(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('traffic_sources')
    .select('source_type, count')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
  
  if (error) throw error
  return data
}

export async function getPlatformClicks(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('platform_clicks')
    .select('platform, invalid, suspicious, legitimate')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
  
  if (error) throw error
  return data
}

export async function getMonthlyRevenue(userId: string, dateRange: DateRange) {
  const { data, error } = await supabase
    .from('revenue')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', dateRange.from?.toISOString())
    .lte('date', dateRange.to?.toISOString())
    .order('date', { ascending: true })
  
  if (error) throw error
  return data
}