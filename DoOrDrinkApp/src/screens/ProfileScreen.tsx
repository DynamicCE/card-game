import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

type CategoryItem = {
  id: string;
  name: string;
  isLocked: boolean;
  description: string;
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Örnek kategori verisi
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: '1', name: 'Arkadaşlar', isLocked: false, description: 'Arkadaşlarla eğlenceli kartlar' },
    { id: '2', name: 'Çiftler', isLocked: false, description: 'Çiftler için romantik kartlar' },
    { id: '3', name: 'Parti', isLocked: false, description: 'Parti zamanı kartları' },
    { id: '4', name: 'Premium', isLocked: true, description: 'Premium kartlar paketi' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButton}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profil</Text>
        <View style={{width: 50}} />
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DD</Text>
        </View>
        <Text style={styles.username}>Kullanıcı</Text>
      </View>

      <Text style={styles.sectionTitle}>Kategorilerim</Text>
      
      <ScrollView style={styles.categoriesList}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </View>
            <View style={[styles.statusBadge, category.isLocked ? styles.lockedBadge : styles.unlockedBadge]}>
              <Text style={styles.statusText}>{category.isLocked ? 'Kilitli' : 'Açık'}</Text>
            </View>
          </View>
        ))}
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
  profileInfo: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FC6C57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  username: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 16,
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
  categoryDescription: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  unlockedBadge: {
    backgroundColor: '#4CAF50',
  },
  lockedBadge: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 