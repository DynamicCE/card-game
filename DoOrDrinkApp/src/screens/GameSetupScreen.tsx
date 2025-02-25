import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type GameSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSetup'>;

type Category = {
  id: string;
  name: string;
  isSelected: boolean;
};

const GameSetupScreen = () => {
  const navigation = useNavigation<GameSetupScreenNavigationProp>();
  
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Arkadaşlar', isSelected: true },
    { id: '2', name: 'Çiftler', isSelected: false },
    { id: '3', name: 'Parti', isSelected: true },
  ]);

  const toggleCategory = (id: string) => {
    setCategories(
      categories.map((category) => 
        category.id === id 
          ? { ...category, isSelected: !category.isSelected } 
          : category
      )
    );
  };

  const startGame = () => {
    // Seçilen kategorileri oyun ekranına geçerken parametre olarak iletebiliriz
    const selectedCategories = categories.filter(cat => cat.isSelected);
    
    // Şimdilik sadece oyun ekranına geçiyoruz
    navigation.navigate('Game');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Oyun Kurulumu</Text>
        <View style={{width: 50}} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <Text style={styles.sectionDescription}>
          Oyunda kullanmak istediğiniz kategorileri seçin
        </Text>
        
        <View style={styles.categoriesList}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Switch
                value={category.isSelected}
                onValueChange={() => toggleCategory(category.id)}
                trackColor={{ false: '#767577', true: '#FC6C57' }}
                thumbColor={category.isSelected ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={startGame}
          >
            <Text style={styles.startButtonText}>Oyunu Başlat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  backButton: {
    fontSize: 18,
    color: '#FC6C57',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 24,
  },
  categoriesList: {
    marginBottom: 32,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A3A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    marginTop: 24,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: '#FC6C57',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameSetupScreen; 