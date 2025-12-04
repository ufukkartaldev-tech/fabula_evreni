# Fabula Platform - Hızlı Başlangıç Kılavuzu

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Firebase Güvenlik Kurallarını Deploy Et
```bash
# Firebase CLI kurulumu (eğer yoksa)
npm install -g firebase-tools

# Firebase'e giriş
firebase login

# Güvenlik kurallarını deploy et
firebase deploy --only firestore:rules,storage:rules
```

### 3. Demo Verileri Yükle
```bash
npm run seed
```

### 4. Development Server'ı Başlat
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

---

## 📁 Proje Yapısı

```
benim-hikaye-uygulamasi/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── components/               # React Components
│   │   │   ├── AvatarUpload.tsx     # Avatar yükleme
│   │   │   ├── ErrorBoundary.tsx    # Hata yakalama
│   │   │   ├── StoryCard.tsx        # Hikaye kartı
│   │   │   └── ...
│   │   ├── favorites/               # Favoriler sayfası
│   │   ├── leaderboard/             # Liderlik tablosu
│   │   ├── profile/                 # Profil sayfası
│   │   ├── story/                   # Hikaye detay sayfası
│   │   ├── globals.css              # Global stiller
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Ana sayfa
│   │   └── sitemap.ts               # SEO sitemap
│   ├── contexts/                    # React Contexts
│   │   ├── AuthContext.tsx          # Kimlik doğrulama
│   │   └── ThemeContext.tsx         # Tema yönetimi
│   ├── interfaces/                  # TypeScript interfaces
│   │   ├── Story.ts
│   │   ├── Comment.ts
│   │   ├── User.ts
│   │   └── ...
│   └── lib/                         # Utility functions & services
│       ├── firebase.ts              # Firebase config
│       ├── firestore.ts             # Firestore operations
│       ├── storageService.ts        # File upload/download
│       ├── analytics.ts             # Analytics tracking
│       ├── expandedSeedData.ts      # Demo data
│       ├── seedDatabase.ts          # Seed script
│       └── ...
├── public/
│   └── robots.txt                   # SEO robots file
├── firestore.rules                  # Firestore security rules
├── storage.rules                    # Storage security rules
├── firebase.json                    # Firebase config
└── package.json

```

---

## 🔑 Temel Özellikler

### Güvenlik
- ✅ Firestore güvenlik kuralları
- ✅ Storage güvenlik kuralları
- ✅ Kullanıcı yetkilendirme
- ✅ Veri validasyonu

### Veri Yönetimi
- ✅ Realtime güncellemeler (onSnapshot)
- ✅ Pagination desteği
- ✅ Demo içerik (8 hikaye, 8 kullanıcı)
- ✅ Seed script

### Medya
- ✅ Avatar yükleme
- ✅ Hikaye görseli yükleme
- ✅ Resim sıkıştırma
- ✅ Progress tracking

### SEO
- ✅ Dynamic sitemap
- ✅ robots.txt
- ✅ Metadata

### Analytics & Monitoring
- ✅ Event tracking
- ✅ Error boundary
- ✅ User properties

---

## 🛠️ Kullanılabilir Komutlar

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint

# Demo verileri yükle
npm run seed
```

---

## 📊 Demo İçerik

### Hikayeler (8 adet)
- Kayıp Şehrin Sırları (Bilim Kurgu)
- Zamana Mektup (Gizem)
- Kahve Dükkanındaki Tesadüf (Romantik)
- Dijital Rüyalar (Bilim Kurgu)
- Ormanın Koruyucusu (Fantastik)
- Son Tren (Fantastik)
- Kitapçının Sırrı (Fantastik)
- Yıldızlararası Mektup (Bilim Kurgu)

### Kullanıcılar (8 adet)
- Farklı badge seviyeleri (Acemi → Hikaye Ustası)
- Gerçekçi profil bilgileri
- Avatar görselleri

### Yorumlar (12+ adet)
- Nested yapıda
- Gerçekçi içerik
- Beğeni sayıları

---

## 🔧 Servisler ve Fonksiyonlar

### Firestore (`firestore.ts`)
```typescript
// Temel CRUD
getStories()
getStoryById(id)
addStory(story)
addComment(comment)

// Realtime
subscribeToStories(callback, limit?)
subscribeToStory(storyId, callback)
subscribeToComments(storyId, callback)

// Pagination
getStoriesPaginated(limit, lastDoc?)
```

### Storage (`storageService.ts`)
```typescript
uploadAvatar(userId, file, onProgress?)
uploadStoryImage(storyId, file, onProgress?)
deleteImage(path)
getImageUrl(path)
compressImage(file, maxWidth?, quality?)
```

### Analytics (`analytics.ts`)
```typescript
trackPageView(path, title?)
trackStoryView(id, title, category)
trackStoryLike(id, title)
trackComment(storyId, length)
trackStoryCreation(id, category, wordCount)
trackSearch(term, resultCount)
trackShare(id, method)
```

---

## 🎯 Sonraki Adımlar

### Opsiyonel İyileştirmeler
1. ErrorBoundary'yi `layout.tsx`'e ekle
2. Realtime listeners'ı UI componentlerinde kullan
3. Infinite scroll component'i ekle
4. Story sayfalarına dynamic metadata ekle
5. Analytics event'lerini UI'da tetikle

### Production Deployment
1. Environment variables ayarla
2. Firebase hosting veya Vercel'e deploy et
3. Custom domain bağla
4. Analytics dashboard'u izle

---

## 📝 Notlar

- TypeScript strict mode aktif
- Next.js 16.0.3 (Turbopack)
- Firebase SDK v12.6.0
- Tüm lint hataları düzeltildi
- Türkçe UI ve hata mesajları

---

## 🆘 Sorun Giderme

### "Cannot find module" hatası
```bash
npm install
```

### Firebase bağlantı hatası
- Firebase config'i kontrol edin (`src/lib/firebase.ts`)
- Güvenlik kurallarının deploy edildiğinden emin olun

### Seed data yüklenmiyor
- Firebase Authentication'ın aktif olduğundan emin olun
- Console'da hata mesajlarını kontrol edin

---

**Proje başarıyla kuruldu ve kullanıma hazır! 🎉**
