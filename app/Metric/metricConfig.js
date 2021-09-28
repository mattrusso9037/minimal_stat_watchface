export const MetricId = {
  Bpm: 'bpm',
  Steps: 'steps',
  Calories: 'calories',
  ZoneMinutes: 'zone_minutes',
  Distance: 'distance',
}

export const metricConfig = [
  {
    id: MetricId.Bpm,
    icon: 'heart_rate.png',
    label: 'BPM',
    containerWidth: 0,
    maxTextLength: 3,
  },
  {
    id: MetricId.Steps,
    icon: 'steps.png',
    label: 'Steps',
    containerWidth: 0,
    maxTextLength: 3,
  },
  {
    id: MetricId.Calories,
    icon: 'calories.png',
    label: 'Calories',
    containerWidth: 0,
    maxTextLength: 3,
  },
  {
    id: MetricId.ZoneMinutes,
    icon: 'zone_minutes.png',
    label: 'Zone Minutes',
    containerWidth: 0,
    maxTextLength: 3,
  },
  {
    id: MetricId.Distance,
    icon: 'distance.png',
    label: 'Miles',
    containerWidth: 0,
    maxTextLength: 3,
  }
];