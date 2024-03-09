class DateFormatter {
  static daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  static getWeekNumber = date => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    const yearStart = new Date(d.getFullYear(), 0, 1)
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    return weekNumber
  }

  static getWeeksArray = len => {
    return Array.from({ length: len }, (_, index) => {
      const date = new Date(new Date())
      date.setDate(new Date().getDate() + index * 7)
      return date
    })
  }

  static getDaysOfWeek = startDate => {
    const firstDayOfWeek = new Date(startDate)
    firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay())
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(firstDayOfWeek)
      date.setDate(firstDayOfWeek.getDate() + index)
      return date
    })
  }

  static getWeekday = (date, type) => {
    const weekday = this.daysOfWeek[date.getDay()]
    return type === 'short' ? weekday.substring(0, 3) : weekday
  }

  static formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Europe/Stockholm',
    })
  }

  static formatTime = dataString => {
    return new Date(dataString).toLocaleTimeString('en-SE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Stockholm',
    })
  }
}

export default DateFormatter
