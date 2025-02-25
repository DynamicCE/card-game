import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../utils/Colors';
import Header from '../components/Header';
import Button from '../components/Button';

type GameSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSetup'>;

type Deck = {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  isSelected: boolean;
  icon: string;
};

const GameSetupScreen = () => {
  const navigation = useNavigation<GameSetupScreenNavigationProp>();
  
  const [decks, setDecks] = useState<Deck[]>([
    { 
      id: 'friends_fun', 
      name: 'Arkadaş Eğlence', 
      description: 'Arkadaşlarla eğlenceli kartlar', 
      cardCount: 50, 
      isSelected: true,
      icon: '🎉'
    },
    { 
      id: 'friends_flirty', 
      name: 'Arkadaş Flört', 
      description: 'Arkadaşlar arasında flörtöz kartlar', 
      cardCount: 40, 
      isSelected: false,
      icon: '💫'
    },
    { 
      id: 'couples_fun', 
      name: 'Çiftler Eğlence', 
      description: 'Çiftler için eğlenceli kartlar', 
      cardCount: 30, 
      isSelected: false,
      icon: '💝'
    },
    { 
      id: 'couples_spicy', 
      name: 'Çiftler Ateşli', 
      description: 'Çiftler için ateşli kartlar', 
      cardCount: 35, 
      isSelected: false,
      icon: '💋'
    },
  ]);

  const toggleDeck = (id: string) => {
    setDecks(
      decks.map((deck) => ({
        ...deck,
        isSelected: deck.id === id
      }))
    );
  };

  const startGame = () => {
    // Seçilen desteleri oyun ekranına geçerken parametre olarak iletebiliriz
    const selectedDecks = decks.filter(deck => deck.isSelected);
    
    // Şimdilik sadece oyun ekranına geçiyoruz
    navigation.navigate('Game');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Oyun Kurulumu"
        onBackPress={() => navigation.navigate('Home')}
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kart Desteleri</Text>
          <Text style={styles.sectionDescription}>
            Kullanmak istediğiniz kart destelerini seçin
          </Text>
          
          <View style={styles.decksList}>
            {decks.map((deck) => (
              <TouchableOpacity 
                key={deck.id} 
                style={[
                  styles.deckButton,
                  deck.isSelected && styles.selectedDeckButton
                ]}
                onPress={() => toggleDeck(deck.id)}
                activeOpacity={0.8}
              >
                <View style={styles.deckContent}>
                  <View style={styles.deckInfo}>
                    <View style={styles.deckNameContainer}>
                      <Text style={[
                        styles.deckIcon
                      ]}>
                        {deck.icon}
                      </Text>
                      <Text style={[
                        styles.deckName,
                        deck.isSelected && styles.selectedDeckText
                      ]}>
                        {deck.name}
                      </Text>
                    </View>
                    <Text style={[
                      styles.deckDescription,
                      deck.isSelected && styles.selectedDeckText
                    ]}>
                      {deck.description}
                    </Text>
                    <Text style={[
                      styles.deckCardCount,
                      deck.isSelected && styles.selectedDeckText
                    ]}>
                      {deck.cardCount} kart
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.deckStatusIndicator,
                    deck.isSelected ? styles.selectedIndicator : styles.unselectedIndicator
                  ]}>
                    <Text style={styles.deckStatusText}>
                      {deck.isSelected ? 'Seçildi' : 'Seç'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <Button 
          title="Oyunu Başlat" 
          onPress={startGame}
          size="large"
          style={styles.startButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  decksList: {
    gap: 12,
  },
  deckButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  selectedDeckButton: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  deckContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckInfo: {
    flex: 1,
  },
  deckNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deckIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  deckName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  deckDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  deckCardCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    fontWeight: 'bold',
  },
  selectedDeckText: {
    color: Colors.white,
  },
  deckStatusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
  },
  selectedIndicator: {
    backgroundColor: Colors.white,
  },
  unselectedIndicator: {
    backgroundColor: Colors.lightGray,
  },
  deckStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  startButton: {
    marginTop: 10,
    marginBottom: 30,
  },
});

export default GameSetupScreen; 