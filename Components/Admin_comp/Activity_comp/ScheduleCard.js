import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import { useTheme } from '../../../Styles/theme'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import DateFormatter from '../../../Utilities/Helper/DateFormatter'

const ScheduleCard = ({ schedule, onDelete, index }) => {
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  return (
    <View style={[styles.cardContainer, { borderColor: theme.colors.primary }]}>
      <View style={styles.header}>
        {schedule.frequency === 'once' ? (
          <MaterialIcons
            name='calendar-month'
            size={24}
            color={theme.colors.text}
          />
        ) : (
          <MaterialIcons
            name='rotate-right'
            size={24}
            color={theme.colors.text}
          />
        )}

        <Text style={styles.dayText}>
          {schedule.frequency === 'once'
            ? schedule.date.toDateString()
            : `${DateFormatter.getWeekday(schedule.date, 'full')}s`}
        </Text>
        <Pressable onPress={() => setShowTimeSlots(!showTimeSlots)}>
          {!showTimeSlots ? (
            <Entypo name='chevron-down' size={24} color={theme.colors.text} />
          ) : (
            <Entypo name='chevron-up' size={24} color={theme.colors.text} />
          )}
        </Pressable>
      </View>
      {/* Display Interval and Occurrences if frequency is recurring */}
      {showTimeSlots && (
        <>
          {schedule.frequency === 'recurring' && (
            <View style={styles.recurringInfo}>
              <Text style={styles.recurringText}>
                <Text
                  style={[
                    styles.recurringText,
                    { fontFamily: 'Inter-SemiBold' },
                  ]}
                >
                  Interval:
                </Text>{' '}
                Every {schedule.interval} week(s)
              </Text>
              <Text style={styles.recurringText}>
                <Text
                  style={[
                    styles.recurringText,
                    { fontFamily: 'Inter-SemiBold' },
                  ]}
                >
                  Schedule starts:
                </Text>{' '}
                {DateFormatter.formatDate(schedule.date)}
              </Text>
              <Text style={styles.recurringText}>
                <Text
                  style={[
                    styles.recurringText,
                    { fontFamily: 'Inter-SemiBold' },
                  ]}
                >
                  Schedule ends:
                </Text>{' '}
                after {schedule.occurrences} week(s)
              </Text>
            </View>
          )}

          {/* Display Time Slots */}
          {schedule.timeSlots.map((timeSlot, timeIndex) => (
            <View key={timeIndex} style={styles.timeRow}>
              {/*  <Text style={styles.timeText}>from</Text> */}
              <Text style={styles.timeText}>
                {DateFormatter.formatTime(timeSlot.start)}
              </Text>
              <Text style={styles.timeText}>to</Text>
              <Text style={styles.timeText}>
                {DateFormatter.formatTime(timeSlot.end)}
              </Text>
            </View>
          ))}

          {/* Delete Button */}

          <Pressable
            onPress={() => onDelete(index)}
            style={styles.deleteContainer}
          >
            {/*  <Text style={styles.deleteText}>Delete Schedule</Text> */}
            <MaterialIcons name='delete' size={24} color={theme.colors.error} />
          </Pressable>
        </>
      )}
    </View>
  )
}

const getStyles = theme => {
  return StyleSheet.create({
    cardContainer: {
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 10,
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    dayText: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: 'Inter-Bold',
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    timeText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.text,
      marginHorizontal: 5,
    },
    recurringInfo: {
      marginBottom: 10,
    },
    recurringText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    deleteContainer: {
      marginTop: 10,
      flexDirection: 'row',
    },
    deleteText: {
      color: theme.colors.error,
      fontFamily: 'Inter-Medium',
    },
  })
}

export default ScheduleCard
