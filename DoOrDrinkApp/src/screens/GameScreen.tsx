import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

// Örnek kart verileri
const exampleCards = [
  { 
    id: '1', 
    category: 'Arkadaşlar', 
    content: 'Gruptaki en başarılı kişiye içki ısmarla veya bir shot iç',
    difficulty: 'Kolay'
  },
  { 
    id: '2', 
    category: 'Arkadaşlar', 
    content: 'En son telefon mesajını yüksek sesle oku veya bir shot iç',
    difficulty: 'Orta'
  },
  { 
    id: '3', 
    category: 'Parti', 
    content: 'Hayatında yaptığın en çılgın şeyi anlat veya iki shot iç',
    difficulty: 'Zor'
  },
];

const GameScreen = () => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Kart animasyonu için
  const flipAnim = useRef(new Animated.Value(0)).current;
  
  const currentCard = exampleCards[currentCardIndex];
  
  // Kartı çevirme animasyonu
  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(false));
    } else {
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(true));
    }
  };
  
  // Sonraki karta geçme
  const nextCard = () => {
    // Eğer kart çevrilmişse önce düz çevir
    if (isFlipped) {
      flipCard();
    }
    
    // Sonraki karta geç
    if (currentCardIndex < exampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Son karttaysak ilk karta dön
      setCurrentCardIndex(0);
    }
  };
  
  // Kart ön ve arka yüz dönüşümleri
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  
  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.exitButton}>Çıkış</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Do or Drink</Text>
        <View style={{width: 50}} />
      </View>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={1} onPress={flipCard}>
          {/* Ön yüz - Kategori bilgisi */}
          <Animated.View style={[styles.card, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
            <View style={[styles.cardHeader, { backgroundColor: '#FC6C57' }]}>
              <Text style={styles.categoryName}>{currentCard.category}</Text>
              <Text style={styles.cardDifficulty}>{currentCard.difficulty}</Text>
            </View>
            <View style={styles.cardFront}>
              <Text style={styles.tapToFlip}>Kartı çevirmek için dokun</Text>
            </View>
          </Animated.View>
          
          {/* Arka yüz - Kart içeriği */}
          <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
            <View style={[styles.cardHeader, { backgroundColor: '#FC6C57' }]}>
              <Text style={styles.categoryName}>{currentCard.category}</Text>
              <Text style={styles.cardDifficulty}>{currentCard.difficulty}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>{currentCard.content}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
          <Text style={styles.nextButtonText}>Sonraki Kart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  exitButton: {
    fontSize: 16,
    color: '#FC6C57',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    height: cardWidth * 1.5,
    backgroundColor: '#2A2A3A',
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  cardHeader: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardDifficulty: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 4,
  },
  cardFront: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tapToFlip: {
    fontSize: 18,
    color: '#AAA',
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#FC6C57',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen; 