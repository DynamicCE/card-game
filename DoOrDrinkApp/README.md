# Do or Drink Kart Oyunu - React Native

Bu proje, Do or Drink kart oyununun React Native ile geliştirilmiş versiyonudur.

## Proje Hakkında

Do or Drink, sosyalleşmeyi teşvik eden bir parti kart oyunudur. Oyuncular kartları çeker ve ya kartta yazan görevleri yapar ya da içki içmeyi tercih ederler. Oyun farklı kategorilerdeki kartlarla oynanır.

## Özellikler

- Farklı kategorilerdeki kart içerikleri
- Kart çevirme animasyonları
- Kategori seçim ekranı
- Kullanıcı profili ve satın alınan kategorilerin takibi
- Çark çevirme özelliği (yakında)

## Teknoloji Stack'i

- **Core**: React Native + TypeScript
- **UI/UX**: React Native Reanimated, Gesture Handler, React Native SVG
- **Navigasyon**: React Navigation
- **State Management**: React Context API
- **Offline Depolama**: AsyncStorage (yakında)

## Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/kullanici-adi/do-or-drink-card-game.git

# Proje klasörüne gidin
cd DoOrDrinkApp

# Bağımlılıkları yükleyin
npm install

# iOS için pod bağımlılıklarını yükleyin (iOS geliştirmesi yapıyorsanız)
npx pod-install

# Uygulamayı başlatın
npm start

# Android için
npm run android

# iOS için
npm run ios

# Web için
npm run web
```

## Proje Yapısı

```
src/
  ├── components/     # Yeniden kullanılabilir UI bileşenleri
  ├── screens/        # Uygulama ekranları
  ├── hooks/          # Özel React Hooks
  ├── utils/          # Yardımcı fonksiyonlar
  ├── types/          # TypeScript tip tanımlamaları
  └── assets/         # Resimler, fontlar vs.
```

## MVP Özellikleri

- [x] Kategori seçim ekranı
- [x] Kart çekme ve gösterme
- [x] Temel animasyonlar (kart çevirme)
- [ ] Çark komponenti
- [ ] Offline mod desteği
- [x] Ana oyun döngüsü

## Yapılacaklar

- [ ] AsyncStorage ile offline veri depolama
- [ ] Kategori satın alma sistemi
- [ ] Çark komponenti eklenmesi
- [ ] Ses efektleri
- [ ] Haptic feedback

## Katkıda Bulunma

Katkıda bulunmak istiyorsanız, lütfen bir issue açın veya pull request gönderin.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
