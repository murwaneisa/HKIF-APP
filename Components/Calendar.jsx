import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../Styles/theme'

const Calendar = ({ startDate, schedules }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const firstDayOfWeek = new Date(startDate)
  firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay())

  const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDayOfWeek)
    date.setDate(firstDayOfWeek.getDate() + index)
    return date
  })

  const getWeekday = (date, type) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const weekday = daysOfWeek[date.getDay()]
    return type === 'short' ? weekday.substring(0, 3) : weekday
  }

  return (
    <View style={styles.picker}>
      <View style={styles.itemRow}>
        {daysOfWeek.map((item, dateIndex) => {
          const hasSchedule = schedules.some(
            schedule => schedule.day === getWeekday(item)
          )
          return (
            <View
              style={[styles.item, hasSchedule && styles.activeItem]}
              key={dateIndex}
            >
              <Text
                style={[
                  styles.itemWeekday,
                  !hasSchedule &&
                    new Date().toDateString() === item.toDateString() &&
                    styles.todayItem,
                ]}
              >
                {getWeekday(item, 'short')}
              </Text>
              <Text
                style={[
                  styles.itemDate,
                  !hasSchedule &&
                    new Date().toDateString() === item.toDateString() &&
                    styles.todayItem,
                ]}
              >
                {item.getDate()}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const getStyles = theme =>
  StyleSheet.create({
    picker: {
      flexDirection: 'row',
    },
    itemRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    item: {
      flex: 1,
      height: 50,
      marginHorizontal: 2,
      paddingVertical: 6,
      borderRadius: 8,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    },
    activeItem: {
      backgroundColor: theme.colors.primary,
    },
    itemWeekday: {
      fontSize: 12,
      fontWeight: '500',
      color: 'rgba(255,255,255,0.85)',
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },
    todayItem: {
      color: theme.colors.primary200,
    },
  })

export default Calendar
