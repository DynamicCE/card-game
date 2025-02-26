# Do or Drink Kart Oyunu - Geliştirici Dokümanı

Bu doküman, "Do or Drink" kart oyunu uygulamasının yalnızca geliştiriciler ve yapay zeka asistanlar için hazırlanmıştır.

## Proje Özeti

"Do or Drink", arkadaşlarla parti ortamında oynanan bir kart oyunu uygulamasıdır. Oyuncular sırayla kartları çeker ve kartta yazan görevi ya yapar ya da bir shot içki içmeyi tercih ederler. Oyunun amacı, sosyalleşme ve eğlenceli bir ortam yaratmaktır.

## Geliştirme Süreci ve Teknoloji Seçimleri

### Başlangıç ve Mimari Gelişimi

1. Proje başlangıçta TypeScript ile vanilla React Native olarak planlandı.
2. Daha sonra geliştirme sürecini hızlandırmak için Expo platformuna geçiş yapıldı.
3. Type-safety için baştan beri TypeScript kullanıldı.

### Kullanılan Teknolojiler

- **Framework**: React Native + Expo
- **Dil**: TypeScript
- **Navigasyon**: React Navigation (createNativeStackNavigator)
- **Animasyon**: React Native Reanimated
- **State Management**: Şu an için React hooks (useState, useEffect), ileride Redux veya Context API eklenebilir
- **UI/UX**: Tamamen custom bileşenler, UI kütüphanesi kullanılmadı
- **Tema/Tasarım**: Koyu tema üzerine kurulu, src/utils/Colors.ts dosyasında tanımlı renk paleti

## Proje Yapısı

```
DoOrDrinkApp/
  ├── App.tsx              # Ana uygulama bileşeni ve navigasyon yapısı
  ├── src/
  │   ├── components/      # Yeniden kullanılabilir UI bileşenleri
  │   │   ├── Avatar.tsx
  │   │   ├── Button.tsx
  │   │   ├── Card.tsx
  │   │   ├── Header.tsx
  │   │   └── PlayCard.tsx # Oyun kartı bileşeni (flip animasyonu içerir)
  │   │
  │   ├── screens/         # Uygulama ekranları
  │   │   ├── HomeScreen.tsx       # Ana sayfa
  │   │   ├── ProfileScreen.tsx    # Kullanıcı profili
  │   │   ├── GameSetupScreen.tsx  # Oyun ayarları (deste seçimi)
  │   │   ├── GameScreen.tsx       # Aktif oyun ekranı
  │   │   └── NotFoundScreen.tsx   # 404 ekranı
  │   │
  │   ├── utils/           # Yardımcı fonksiyonlar ve sabitler
  │   │   └── Colors.ts    # Renk paleti tanımları
  │   │
  │   ├── hooks/           # Özel React hooks
  │   │
  │   ├── types/           # TypeScript tip tanımlamaları
  │   │
  │   └── assets/          # Statik varlıklar (resimler, ikonlar vb.)
  │
  ├── babel.config.js      # Babel yapılandırması (Reanimated için plugin içerir)
  ├── app.json             # Expo yapılandırması
  ├── tsconfig.json        # TypeScript yapılandırması
  └── package.json         # Bağımlılıklar ve scriptler
```

## Ana Bileşenler ve İş Mantığı

### Navigasyon Yapısı

Uygulama, stack navigator kullanarak ekranlar arasında gezinme sağlar. `App.tsx` dosyasında tanımlanan navigasyon yapısı şu şekildedir:

```typescript
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  GameSetup: undefined;
  Game: undefined;
  NotFound: undefined;
};
```

### Kart Sistemi

- `PlayCard.tsx`: Çift taraflı kart bileşeni, kartın ön yüzü (Do or Drink logosu + deste ikonu) ve arka yüzü (görev metni) içerir.
- Kartlar flip animasyonu ile çevrilir (React Native Reanimated kullanılır).
- Kartın render edilmesi `GameScreen.tsx` içinde gerçekleşir.

### Oyun Akışı

1. Kullanıcı ana ekrandan "Yeni Oyun Başlat" butonuyla başlar.
2. `GameSetupScreen`'de oyun desteleri seçilir (şu anda sadece bir deste seçilebilir).
3. `GameScreen`'de kartlar gösterilir ve "Sonraki Kart" butonuyla yeni kartlara geçilir.
4. Kartlar oyun başlangıcında ve destenin sonuna gelindiğinde otomatik olarak karıştırılır.

## Son Güncellemeler ve Devam Eden İşler

### Son Yapılan Değişiklikler (v1.1.0)

- Kart tasarımı baştan yenilendi
- Kategori ve zorluk bilgileri kaldırıldı
- Oyun ekranına kart sayacı eklendi
- Kartların ön yüzüne logo ve deste ikonu eklendi
- Kartlar otomatik olarak karıştırılıyor

### Planlanan İşler

- AsyncStorage ile yerel veri depolama
- Yeni kart desteleri ekleme
- Kullanıcı profil sayfası iyileştirmeleri
- Çark komponenti eklenmesi
- Satın alma sistemi entegrasyonu

## Geliştirme Notları

- Projenin sürüm kontrolü Git ile yapılmaktadır. Her önemli özellik için feature branch oluşturulur.
- Semantik Versiyonlama (SemVer) kullanılıyor: MAJOR.MINOR.PATCH formatında.
- Şu anda proje `feature/react-native-migration` branch'inde geliştirilmektedir.
- Uygulama tasarımı mobile-first yaklaşımıyla, öncelikle telefon ekranları için optimize edilmiştir.

## Dependency Notları

Projeyi çalıştırmak için gerekli bağımlılıklar:

- `expo`
- `react-native`
- `react-navigation/native` ve `react-navigation/native-stack`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`

## Çalıştırma Komutları

```bash
# Geliştirme modunda başlatmak için
npm start

# Android için
npm run android

# iOS için
npm run ios

# Web için
npm run web
```

Bu doküman, proje geliştiricileri ve yapay zeka asistanları için referans olarak hazırlanmıştır.
