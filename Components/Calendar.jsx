import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../Styles/theme'

const Calendar = ({ startDate }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const firstDayOfWeek = new Date(startDate)
  firstDayOfWeek.setDate(startDate.getDate() - startDate.getDay())

  const nextTwoWeeks = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDayOfWeek)
    date.setDate(firstDayOfWeek.getDate() + index)
    return date
  })

  const formatDate = date => {
    const options = { weekday: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-SE', options).slice(0, 3)
  }

  return (
    <View style={styles.picker}>
      <View style={styles.itemRow}>
        {nextTwoWeeks.map((item, dateIndex) => (
          <View
            style={[
              styles.item,
              new Date().toDateString() === item.toDateString() &&
                styles.todayItem,
              new Date().toDateString() === item.toDateString() &&
                styles.activeItem,
            ]}
            key={dateIndex}
          >
            <Text style={styles.itemWeekday}>{formatDate(item)}</Text>
            <Text style={styles.itemDate}>{item.getDate()}</Text>
          </View>
        ))}
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
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    todayItem: {
      backgroundColor: 'grey',
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
      color: '#fff',
    },
  })

export default Calendar
