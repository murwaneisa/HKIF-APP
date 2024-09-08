class ActivitySession {
  static getNextSession = schedules => {
    const currentDate = new Date()
    const currentDayIndex = currentDate.getDay()
    for (let i = 0; i < 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7
      const nextSession = schedules.find(
        session => session.day === nextDayIndex
      )

      if (nextSession) {
        if (
          nextDayIndex === currentDayIndex &&
          this.#isLaterThanCurrentTime(currentDate, nextSession.startTime)
        ) {
          continue
        }

        const daysUntilNextSession = (nextDayIndex - currentDayIndex + 7) % 7
        const nextSessionDate = new Date(currentDate)
        nextSessionDate.setDate(currentDate.getDate() + daysUntilNextSession)

        return {
          session: nextSession,
          date: nextSessionDate,
        }
      }
    }
    return null
  }

  static #isLaterThanCurrentTime = (currentDate, time) => {
    const [hours, minutes] = time.split(':').map(Number)
    const sessionTime = new Date(currentDate)
    sessionTime.setHours(hours, minutes, 0, 0)
    return sessionTime > currentDate
  }
}

export default ActivitySession
