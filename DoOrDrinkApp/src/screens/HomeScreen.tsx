import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../utils/Colors';
import Button from '../components/Button';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View />
        <Text style={styles.title}>Do or Drink</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={32} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>Parti Kart Oyunu</Text>
        
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Yeni Güncelleme!</Text>
          <Text style={styles.infoText}>
            Artık yeni kart kategorileri ve daha fazla görev kartı var!
          </Text>
        </Card>

        <View style={styles.buttonContainer}>
          <Button 
            title="Yeni Oyun Başlat" 
            onPress={() => navigation.navigate('GameSetup')}
            size="large"
          />
          
          <View style={styles.secondaryButtons}>
            <Button 
              title="Profil" 
              onPress={() => navigation.navigate('Profile')}
              type="secondary"
              style={styles.secondaryButton}
            />
            
            <Button 
              title="Kategoriler" 
              onPress={() => navigation.navigate('Profile')}
              type="outline"
              style={styles.secondaryButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 20,
  },
  infoCard: {
    marginVertical: 20,
    backgroundColor: Colors.card,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 20,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
  },
});

export default HomeScreen; 