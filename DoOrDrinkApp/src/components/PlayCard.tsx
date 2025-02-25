import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from '../utils/Colors';

interface PlayCardProps {
  content: string;
  onPress?: () => void;
  deckIcon?: string;
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

const PlayCard: React.FC<PlayCardProps> = ({
  content,
  onPress,
  deckIcon = '🎮',
}) => {
  const flipValue = useSharedValue(0);
  const isFlipped = useSharedValue(false);

  const handleFlip = () => {
    const newValue = isFlipped.value ? 0 : 1;
    flipValue.value = withTiming(newValue, { duration: 300 });
    isFlipped.value = !isFlipped.value;
    
    if (onPress) {
      onPress();
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      flipValue.value,
      [0, 1],
      [0, 180]
    );
    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      flipValue.value,
      [0, 1],
      [180, 360]
    );
    return {
      transform: [{ rotateY: `${rotateValue}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  return (
    <View style={{
      width: cardWidth,
      height: cardWidth * 1.5,
    }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleFlip}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Ön Yüz */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <View style={styles.cardFront}>
            <View style={styles.cardLogo}>
              <Text style={styles.logoText}>D|D</Text>
            </View>
            <Text style={styles.deckIcon}>{deckIcon}</Text>
            <Text style={styles.tapToFlip}>Kartı çevirmek için dokun</Text>
            <View style={styles.cardPattern}>
              <View style={styles.patternCircle} />
              <View style={styles.patternCircle} />
              <View style={styles.patternCircle} />
            </View>
          </View>
        </Animated.View>

        {/* Arka Yüz */}
        <Animated.View style={[styles.card, backAnimatedStyle]}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{content}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>Do or Drink</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.card,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardLogo: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  deckIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  tapToFlip: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardPattern: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
  },
  patternCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 3,
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    position: 'relative',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 32,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default PlayCard; 