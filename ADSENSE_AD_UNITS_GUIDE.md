# 🎯 AdSense Reklam Birimleri Oluşturma Rehberi

## Mevcut Bilgileriniz
- **Publisher ID**: ca-pub-1334433458655438
- **Customer ID**: 5313592969

## Adım 1: Google AdSense'e Giriş Yapın

1. [Google AdSense](https://www.google.com/adsense) adresine gidin
2. Hesabınızla giriş yapın (Customer ID: 5313592969)

## Adım 2: Reklam Birimleri Oluşturun

### A) Top Banner (Ana Sayfa Üst Banner)

1. Sol menüden **Reklamlar** > **Reklam Birimleri** seçin
2. **Yeni Reklam Birimi** butonuna tıklayın
3. **Display Ads** seçin
4. Ayarlar:
   - **Ad**: "Fabula Top Banner"
   - **Ad Size**: "Responsive" veya "728 x 90 (Leaderboard)"
   - **Ad Type**: "Display ads"
5. **Oluştur** butonuna tıklayın
6. Çıkan **data-ad-slot** kodunu kopyalayın (örn: 1234567890)

### B) In-Feed Banner (Hikaye Listesi Arası)

1. **Yeni Reklam Birimi** > **In-feed ads** seçin
2. Ayarlar:
   - **Ad**: "Fabula In-Feed Banner"
   - **Layout**: Hikaye kartlarınıza uygun bir layout seçin
3. **Oluştur** butonuna tıklayın
4. **data-ad-slot** kodunu kopyalayın

### C) In-Article Banner (Hikaye İçeriği Arası)

1. **Yeni Reklam Birimi** > **In-article ads** seçin
2. Ayarlar:
   - **Ad**: "Fabula In-Article Banner"
3. **Oluştur** butonuna tıklayın
4. **data-ad-slot** kodunu kopyalayın

### D) Sidebar Banner (Opsiyonel - Gelecekte Kullanım İçin)

1. **Yeni Reklam Birimi** > **Display ads** seçin
2. Ayarlar:
   - **Ad**: "Fabula Sidebar Banner"
   - **Ad Size**: "300 x 250 (Medium Rectangle)" veya "300 x 600 (Half Page)"
3. **Oluştur** butonuna tıklayın
4. **data-ad-slot** kodunu kopyalayın

## Adım 3: .env.local Dosyasını Güncelleyin

`.env.local` dosyanıza aşağıdaki satırları ekleyin (mevcut Firebase ayarlarınızın altına):

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1334433458655438

# AdSense Ad Slot IDs (Yukarıda oluşturduğunuz reklam birimlerinin slot ID'leri)
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=BURAYA_TOP_BANNER_SLOT_ID
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=BURAYA_SIDEBAR_SLOT_ID
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=BURAYA_IN_ARTICLE_SLOT_ID
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=BURAYA_IN_FEED_SLOT_ID
```

**Örnek:**
```env
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1334433458655438
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=2345678901
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=3456789012
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=4567890123
```

## Adım 4: Uygulamayı Yeniden Başlatın

Terminal'de:
```bash
# Ctrl+C ile mevcut dev server'ı durdurun
# Sonra yeniden başlatın:
npm run dev
```

## Adım 5: Test Edin

1. `http://localhost:3000` adresini açın
2. Reklam alanlarının göründüğünü kontrol edin
3. Tarayıcı konsolunda hata olup olmadığını kontrol edin

## ⚠️ Önemli Notlar

### Development Modunda:
- Reklamlar boş veya placeholder olarak görünebilir
- Google AdSense test modunda çalışmayabilir
- Bu normaldir, production'da gerçek reklamlar görünecektir

### Production'da:
1. Sitenizi deploy edin (Vercel, Netlify, vb.)
2. AdSense'de sitenizin URL'ini ekleyin ve doğrulayın
3. Onay bekleyin (birkaç gün sürebilir)
4. Onaylandıktan sonra reklamlar otomatik olarak görünmeye başlar

### AdSense Politikaları:
- ✅ Orijinal içerik oluşturun
- ✅ Kullanıcı deneyimini ön planda tutun
- ❌ Kendi reklamlarınıza tıklamayın
- ❌ Kullanıcıları reklam tıklamaya zorlamayın
- ❌ Telif hakkı ihlali içerik paylaşmayın

## 🎉 Tamamlandı!

Reklam birimlerini oluşturduktan ve `.env.local` dosyasını güncelledikten sonra, uygulamanız Google AdSense ile tam entegre olacaktır!

## 📞 Yardım

Sorun yaşarsanız:
1. Tarayıcı konsolunu kontrol edin
2. `.env.local` dosyasındaki değerleri kontrol edin
3. AdSense hesabınızın aktif olduğundan emin olun
4. `ADSENSE_SETUP.md` dosyasına bakın
