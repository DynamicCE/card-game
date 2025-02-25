import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../utils/Colors';
import Header from '../components/Header';
import PlayCard from '../components/PlayCard';
import Button from '../components/Button';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

// Örnek kart verileri
const exampleCards = [
  { 
    id: '1', 
    content: 'Gruptaki en başarılı kişiye içki ısmarla veya bir shot iç',
    deckId: 'friends_fun',
    deckIcon: '🎉'
  },
  { 
    id: '2', 
    content: 'En son telefon mesajını yüksek sesle oku veya bir shot iç',
    deckId: 'friends_flirty',
    deckIcon: '💫'
  },
  { 
    id: '3', 
    content: 'Hayatında yaptığın en çılgın şeyi anlat veya iki shot iç',
    deckId: 'couples_fun',
    deckIcon: '💝'
  },
  { 
    id: '4', 
    content: 'Telefonunu yanındaki kişiye ver ve 2 dakika boyunca istediği bir uygulamaya bakmasına izin ver veya 2 shot iç',
    deckId: 'couples_spicy',
    deckIcon: '💋'
  },
];

const GameScreen = () => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const route = useRoute<GameScreenRouteProp>();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardsPlayed, setCardsPlayed] = useState(0);
  
  // Kartları karıştır
  const [shuffledCards, setShuffledCards] = useState([...exampleCards]);
  
  useEffect(() => {
    // Oyun başladığında kartları karıştır
    const shuffleCards = () => {
      const cards = [...exampleCards];
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      setShuffledCards(cards);
    };
    
    shuffleCards();
  }, []);
  
  const currentCard = shuffledCards[currentCardIndex];
  
  // Sonraki karta geçme
  const nextCard = () => {    
    // Oynanan kart sayısını artır
    setCardsPlayed(cardsPlayed + 1);
    
    // Sonraki karta geç
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Son karttaysak kartları yeniden karıştır ve başa dön
      const cards = [...shuffledCards];
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      setShuffledCards(cards);
      setCurrentCardIndex(0);
    }
  };

  const handleExit = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Do or Drink" 
        showBackButton={false}
        rightComponent={
          <Button 
            title="Çıkış" 
            onPress={handleExit} 
            type="outline" 
            size="small" 
          />
        }
      />
      
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>Oynanan: {cardsPlayed}</Text>
      </View>
      
      <View style={styles.cardContainer}>
        <PlayCard
          content={currentCard.content}
          deckIcon={currentCard.deckIcon}
        />
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Sonraki Kart" 
          onPress={nextCard} 
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statsText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
  },
});

export default GameScreen; 