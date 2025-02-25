import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../utils/Colors';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import Button from '../components/Button';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

type SettingItem = {
  id: string;
  title: string;
  icon: string;
  action: () => void;
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  // Kullanıcı istatistikleri
  const stats = {
    gamesPlayed: 24,
    cardsDrawn: 165,
    timeSpent: '5s 32d', // 5 saat 32 dakika
  };
  
  // Ayarlar menüsü
  const settings: SettingItem[] = [
    { 
      id: 'notifications', 
      title: 'Bildirimler', 
      icon: '🔔', 
      action: () => console.log('Bildirimler') 
    },
    { 
      id: 'theme', 
      title: 'Tema', 
      icon: '🎨', 
      action: () => console.log('Tema') 
    },
    { 
      id: 'language', 
      title: 'Dil', 
      icon: '🌐', 
      action: () => console.log('Dil') 
    },
    { 
      id: 'feedback', 
      title: 'Geri Bildirim', 
      icon: '📝', 
      action: () => console.log('Geri Bildirim') 
    },
    { 
      id: 'privacy', 
      title: 'Gizlilik Politikası', 
      icon: '🔒', 
      action: () => Linking.openURL('https://example.com/privacy') 
    },
    { 
      id: 'terms', 
      title: 'Kullanım Koşulları', 
      icon: '📄', 
      action: () => Linking.openURL('https://example.com/terms') 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Profil"
        onBackPress={() => navigation.navigate('Home')}
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileInfo}>
          <Avatar size={100} name="Do Drink" />
          <Text style={styles.username}>Kullanıcı</Text>
          <Text style={styles.userEmail}>kullanici@example.com</Text>
          <Button 
            title="Profili Düzenle" 
            type="outline"
            size="small"
            onPress={() => {}}
            style={styles.editButton}
          />
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
            <Text style={styles.statLabel}>Oyun</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.cardsDrawn}</Text>
            <Text style={styles.statLabel}>Kart</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{stats.timeSpent}</Text>
            <Text style={styles.statLabel}>Süre</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Ayarlar</Text>
        
        <View style={styles.settingsList}>
          {settings.map((setting) => (
            <TouchableOpacity 
              key={setting.id} 
              style={styles.settingItem}
              onPress={setting.action}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <View style={styles.settingIconContainer}>
                  <Text style={styles.settingIcon}>{setting.icon}</Text>
                </View>
                <Text style={styles.settingTitle}>{setting.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Button 
          title="Çıkış Yap" 
          type="outline"
          onPress={() => {}}
          style={styles.logoutButton}
        />
        
        <Text style={styles.versionText}>Versiyon 1.0.0</Text>
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
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  username: {
    fontSize: 22,
    color: Colors.text,
    marginTop: 12,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  editButton: {
    marginTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  settingsList: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIcon: {
    fontSize: 18,
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  chevron: {
    fontSize: 22,
    color: Colors.textSecondary,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 30,
  },
});

export default ProfileScreen; 