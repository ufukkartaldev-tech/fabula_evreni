# 📚 Fabula - İnteraktif Hikaye Platformu

<div align="center">

![Fabula Logo](https://via.placeholder.com/200x200?text=Fabula)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-136%2B-brightgreen)](./TEST_SUMMARY.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

**Kullanıcıların birlikte hikayeler oluşturabildiği, okuyabildiği ve hikayelerin gidişatına yön verebildiği modern bir hikaye platformu**

[🚀 Canlı Demo](https://fabula-evreni.vercel.app) • 
[📖 Dokümantasyon](./docs) • 
[🐛 Sorun Bildir](https://github.com/ufukkartaldev-tech/fabula_evreni/issues) • 
[💬 Tartışmalar](https://github.com/ufukkartaldev-tech/fabula_evreni/discussions)

</div>

---

## ✨ Özellikler

<table>
<tr>
<td width="50%">

### 🌳 İnteraktif Hikayeler
Okuyucuların seçim yaparak gidişatı değiştirebildiği dallanan hikaye yapısı

### ⚡ Hızlı Dallanma
Kullanıcılar hikayelere yeni yollar önerebilir ve anında katkıda bulunabilir

### 🏆 Oyunlaştırma
XP kazanın, seviye atlayın ve rozetler toplayın

</td>
<td width="50%">

### 👥 Sosyal Özellikler
Takip, beğeni, yorum ve paylaşım sistemi

### 📱 Responsive Tasarım
Mobil, tablet ve desktop uyumlu modern arayüz

### 🧪 Test Edilmiş
136+ test ile %80+ code coverage

</td>
</tr>
</table>

---

## 🎬 Önizleme

<div align="center">

### Ana Sayfa
![Home Page](https://via.placeholder.com/800x450?text=Ana+Sayfa)

### İnteraktif Hikaye Oynatıcı
![Story Player](https://via.placeholder.com/800x450?text=Hikaye+Oynatıcı)

</div>

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18 veya üzeri
- npm veya yarn
- Firebase hesabı

### Kurulum

```bash
# 1. Repository'yi klonlayın
git clone https://github.com/ufukkartaldev-tech/fabula_evreni.git
cd fabula_evreni

# 2. Bağımlılıkları yükleyin
npm install

# 3. Environment variables'ı ayarlayın
cp .env.example .env.local

# .env.local dosyasını Firebase bilgilerinizle doldurun:
# NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
# NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# 4. Development server'ı başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

---

## 🏗️ Proje Yapısı

```
fabula/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # React bileşenleri
│   │   ├── api/                # API routes
│   │   ├── (pages)/            # Sayfa bileşenleri
│   │   └── globals.css         # Global stiller
│   ├── lib/                    # Utility fonksiyonlar ve servisler
│   │   ├── firebase.ts         # Firebase config
│   │   ├── firestore.ts        # Firestore işlemleri
│   │   ├── userService.ts      # Kullanıcı servisi
│   │   └── ...                 # Diğer servisler
│   ├── contexts/               # React Context providers
│   ├── interfaces/             # TypeScript interfaces
│   ├── hooks/                  # Custom React hooks
│   └── __tests__/              # Test dosyaları
│       ├── components/         # Component testleri
│       ├── services/           # Service testleri
│       └── helpers/            # Test utilities
├── e2e/                        # End-to-end testler
├── public/                     # Static dosyalar
├── docs/                       # Dokümantasyon
└── ...
```

---

## 🧪 Testler

```bash
# Unit & Component testleri çalıştır
npm test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui

# Coverage raporu
npm run test:coverage

# E2E testleri
npm run test:e2e

# E2E UI mode
npm run test:e2e:ui

# Tüm testler
npm run test:all
```

### Test Coverage

- **Service Tests**: ~75 test
- **Component Tests**: ~27 test
- **E2E Tests**: ~30 test
- **Toplam**: **136+ test**
- **Coverage**: **%80+**

Detaylı test raporu için: [TEST_SUMMARY.md](./TEST_SUMMARY.md)

---

## 🛠️ Teknolojiler

### Frontend

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| [Next.js](https://nextjs.org/) | 16 | React framework (App Router) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS |

### Backend

| Teknoloji | Açıklama |
|-----------|----------|
| [Firebase Firestore](https://firebase.google.com/docs/firestore) | NoSQL database |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Authentication |
| [Firebase Storage](https://firebase.google.com/docs/storage) | File storage |

### Testing

| Teknoloji | Açıklama |
|-----------|----------|
| [Vitest](https://vitest.dev/) | Unit & Component testing |
| [Playwright](https://playwright.dev/) | E2E testing |
| [Testing Library](https://testing-library.com/) | React testing utilities |
| [MSW](https://mswjs.io/) | API mocking |

### DevOps

| Teknoloji | Açıklama |
|-----------|----------|
| [Vercel](https://vercel.com/) | Hosting & Deployment |
| [GitHub Actions](https://github.com/features/actions) | CI/CD (yakında) |
| [ESLint](https://eslint.org/) | Code linting |
| [Prettier](https://prettier.io/) | Code formatting |

---

## 📊 Performans

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: <1.5s
- 📱 **Mobile-First Design**: Responsive
- ♿ **Accessibility Score**: 90+
- 🎨 **Modern UI/UX**: Glassmorphism & Animations

---

## 🎯 Özellikler Detayı

### 🌳 İnteraktif Hikaye Sistemi

- **Dallanma Yapısı**: Hikayeler ağaç yapısında dallanır
- **Kullanıcı Seçimleri**: Okuyucular hikayenin gidişatını belirler
- **Topluluk Katkısı**: Kullanıcılar yeni dallar önerebilir
- **Oylama Sistemi**: En popüler dallar öne çıkar

### 🏆 Oyunlaştırma

- **XP Sistemi**: Okuma ve yazma ile XP kazanın
- **Seviye Sistemi**: 10 seviye ve rozet
- **Liderlik Tablosu**: En aktif kullanıcılar
- **Başarımlar**: Özel rozetler ve ödüller

### 👥 Sosyal Özellikler

- **Takip Sistemi**: Favori yazarları takip edin
- **Beğeni & Yorum**: Hikayelere etkileşim
- **Paylaşım**: Sosyal medyada paylaşın
- **Bildirimler**: Gerçek zamanlı bildirimler

### 📝 Editör Özellikleri

- **Rich Text Editor**: React Quill ile güçlü editör
- **Taslak Sistemi**: Otomatik kaydetme
- **Önizleme**: Yayınlamadan önce önizleme
- **Kategori Sistemi**: Hikayelerinizi kategorilere ayırın

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! 🎉

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'feat: Add amazing feature'`)
4. **Push** edin (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

Detaylı bilgi için: [CONTRIBUTING.md](./CONTRIBUTING.md)

### Good First Issues

Yeni başlayanlar için uygun issue'lar:
- [Good First Issue](https://github.com/ufukkartaldev-tech/fabula_evreni/labels/good%20first%20issue)

---

## 📄 Lisans

Bu proje [MIT](./LICENSE) lisansı altında lisanslanmıştır.

---

## 👨‍💻 Geliştirici

**Ufuk Kartal**

- 🌐 GitHub: [@ufukkartaldev-tech](https://github.com/ufukkartaldev-tech)
- 💼 LinkedIn: [Profiliniz](https://linkedin.com/in/...)
- 📧 Email: your.email@example.com

---

## 🙏 Teşekkürler

Bu projeyi mümkün kılan harika teknolojilere teşekkürler:

- [Next.js](https://nextjs.org/) ekibine
- [React](https://react.dev/) ekibine
- [Firebase](https://firebase.google.com/) ekibine
- [Vercel](https://vercel.com/) ekibine
- Tüm açık kaynak katkıda bulunanlara

---

## 📞 İletişim & Destek

### Sorularınız mı var?

- 💬 [GitHub Discussions](https://github.com/ufukkartaldev-tech/fabula_evreni/discussions) - Genel sorular ve tartışmalar
- 🐛 [GitHub Issues](https://github.com/ufukkartaldev-tech/fabula_evreni/issues) - Bug raporları ve özellik istekleri
- 📧 Email: your.email@example.com

### Dokümantasyon

- 📖 [Proje Analizi](./PROJE_ANALIZI.md)
- 🧪 [Test Dokümantasyonu](./TEST_DOCUMENTATION.md)
- 📊 [Test Özeti](./TEST_SUMMARY.md)
- 🚀 [Vercel Deployment](./VERCEL_DEPLOYMENT_GUIDE.md)
- 🌟 [GitHub Promotion](./GITHUB_PROMOTION_GUIDE.md)

---

## 🗺️ Roadmap

### v1.0 (Mevcut)
- ✅ İnteraktif hikaye sistemi
- ✅ Kullanıcı authentication
- ✅ Oyunlaştırma
- ✅ Sosyal özellikler
- ✅ Responsive tasarım

### v1.1 (Yakında)
- ⏳ PWA desteği
- ⏳ Offline mode
- ⏳ Push notifications
- ⏳ Dark mode

### v2.0 (Gelecek)
- 📋 AI hikaye önerileri
- 📋 Sesli okuma
- 📋 Çoklu dil desteği
- 📋 NFT entegrasyonu

---

## 📈 İstatistikler

![GitHub stars](https://img.shields.io/github/stars/ufukkartaldev-tech/fabula_evreni?style=social)
![GitHub forks](https://img.shields.io/github/forks/ufukkartaldev-tech/fabula_evreni?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/ufukkartaldev-tech/fabula_evreni?style=social)
![GitHub issues](https://img.shields.io/github/issues/ufukkartaldev-tech/fabula_evreni)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ufukkartaldev-tech/fabula_evreni)
![GitHub last commit](https://img.shields.io/github/last-commit/ufukkartaldev-tech/fabula_evreni)

---

<div align="center">

### ⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Made with ❤️ by [Ufuk Kartal](https://github.com/ufukkartaldev-tech)**

[⬆ Başa Dön](#-fabula---i̇nteraktif-hikaye-platformu)

</div>
