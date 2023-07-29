export function formatWeight(weight: string | undefined) {
  return weight || 24
}

export function formatTemperature(temp: string | undefined) {
  return temp ? temp.replace(".00", "") : '-'
}

export function formatHumidity(humidity: string | undefined) {
  return humidity ? humidity.replace(".00", "") : '-'
}

export function formatBattery(batteryLevel: string | undefined) {
  return batteryLevel || 89
}

export function diffTime(date: Date | string | undefined): number {
  if (!date) return new Date().getTime()
  if (typeof date === 'string') date = new Date(date)

  const seconds = (new Date().getTime() - date.getTime()) / 1000
  return Math.floor(seconds)
  // return Math.round(seconds / 10) * 10
}