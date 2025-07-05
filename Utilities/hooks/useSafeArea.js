import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

/**
 * Custom hook for flexible safe area handling
 * @param {Object} options Configuration options for safe area
 * @param {boolean} options.top Whether to apply top safe area inset
 * @param {boolean} options.bottom Whether to apply bottom safe area inset
 * @param {string} options.backgroundColor Background color for the safe area
 * @returns {Object} Object containing style objects and inset values
 */
export const useSafeArea = ({ 
  top = true, 
  bottom = true, 
  backgroundColor = 'white' 
} = {}) => {
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => ({
    container: {
      flex: 1,
      paddingTop: top ? insets.top : 0,
      paddingBottom: bottom ? insets.bottom : 0,
    },
    // Style for content that should ignore safe area
    noSafeArea: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    // Individual padding styles for more granular control
    topInset: {
      paddingTop: insets.top,
    },
    bottomInset: {
      paddingBottom: insets.bottom,
    },
  }), [insets.top, insets.bottom, top, bottom, backgroundColor]);

  // Return both styles and raw inset values for flexibility
  return {
    styles,
    topInset: insets.top,
    bottomInset: insets.bottom,
    leftInset: insets.left,
    rightInset: insets.right,
  };
}; 