import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated';

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

export default function ProgressBar({ label, value, color, icon }: ProgressBarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value / 100, { duration: 800 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#EF4444', '#F59E0B', color]
    );

    return {
      width: `${progress.value * 100}%`,
      backgroundColor,
    };
  });

  const getStatusColor = () => {
    if (value < 30) return '#EF4444';
    if (value < 60) return '#F59E0B';
    return color;
  };

  const getStatusText = () => {
    if (value < 30) return 'Scăzut';
    if (value < 60) return 'Moderat';
    return 'Ridicat';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {icon}
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: getStatusColor() }]}>
            {value}%
          </Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>
            ({getStatusText()})
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View style={[styles.progressFill, animatedStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginLeft: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBackground: {
    height: '100%',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});