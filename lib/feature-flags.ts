type FeatureFlag = {
  name: string;
  enabled: boolean;
  rolloutPercentage?: number;
};

const features: FeatureFlag[] = [
  {
    name: 'newBookingSystem',
    enabled: process.env.NEXT_PUBLIC_ENABLE_NEW_BOOKING === 'true',
    rolloutPercentage: 50,
  },
  {
    name: 'enhancedAnalytics',
    enabled: process.env.NEXT_PUBLIC_ENABLE_ENHANCED_ANALYTICS === 'true',
    rolloutPercentage: 25,
  }
];

export function isFeatureEnabled(featureName: string, userId?: string): boolean {
  const feature = features.find(f => f.name === featureName);
  
  if (!feature) return false;
  if (!feature.enabled) return false;
  
  if (feature.rolloutPercentage && userId) {
    const hash = hashString(userId);
    return (hash % 100) < feature.rolloutPercentage;
  }
  
  return feature.enabled;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}