# Google AdSense Entegrasyon Rehberi

Bu uygulama Google AdSense ile entegre edilmiştir. Reklamları aktif hale getirmek için aşağıdaki adımları izleyin.

## 1. Google AdSense Hesabı Oluşturma

1. [Google AdSense](https://www.google.com/adsense) sitesine gidin
2. Hesap oluşturun veya mevcut hesabınızla giriş yapın
3. Web sitenizi ekleyin ve onay bekleyin

## 2. Publisher ID ve Ad Slot ID'lerini Alma

### Publisher ID:
1. AdSense hesabınıza giriş yapın
2. **Hesap** > **Hesap Bilgileri** bölümüne gidin
3. Publisher ID'nizi kopyalayın (ca-pub-XXXXXXXXXXXXXXXX formatında)

### Ad Slot ID'leri:
1. AdSense'de **Reklamlar** > **Reklam Birimleri** bölümüne gidin
2. **Yeni Reklam Birimi** oluşturun:
   - **Top Banner**: 728x90 veya Responsive Display Ad
   - **Sidebar Banner**: 300x250 veya 300x600
   - **In-Article**: In-article Ad
   - **In-Feed**: In-feed Ad
3. Her reklam birimi için verilen Slot ID'yi kopyalayın

## 3. Environment Variables Ayarlama

`.env.local` dosyanıza aşağıdaki değişkenleri ekleyin:

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX

# AdSense Ad Slot IDs
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=1234567891
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=1234567892
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=1234567893
```

**Önemli**: Gerçek değerlerinizi yukarıdaki placeholder'ların yerine yazın.

## 4. Reklam Yerleşimleri

Reklamlar şu konumlara yerleştirilmiştir:

### Ana Sayfa (`/`)
- **Top Banner**: Arama/filtre bölümünün hemen altında
- **In-Feed Banners**: Her 6 hikayede bir, hikaye listesi içinde

### Hikaye Detay Sayfası (`/story/[id]`)
- **In-Article Banner**: Hikaye içeriği ile yorumlar arasında

### Gelecekte Eklenebilecek Yerler
- Profil sayfaları
- Koleksiyonlar sayfası
- Liderlik tablosu

## 5. Test Etme

### Development Modunda Test:
```bash
npm run dev
```

Tarayıcınızda sayfaları açın ve reklam alanlarının göründüğünü kontrol edin.

**Not**: İlk başta reklamlar boş görünebilir. Google AdSense'in reklamları göstermesi için:
1. Sitenizin onaylanmış olması gerekir
2. Yeterli trafik olmalıdır
3. AdSense politikalarına uygun içerik olmalıdır

### Production'da Test:
```bash
npm run build
npm start
```

## 6. AdSense Politikaları

Reklamların düzgün çalışması için:

✅ **Yapılması Gerekenler**:
- Orijinal ve değerli içerik oluşturun
- Kullanıcı deneyimini ön planda tutun
- Reklam yerleşimlerini doğal tutun

❌ **Yapılmaması Gerekenler**:
- Kendi reklamlarınıza tıklamayın
- Kullanıcıları reklam tıklamaya zorlamayın
- Telif hakkı ihlali içerik paylaşmayın
- Aşırı reklam kullanmayın

## 7. Performans İzleme

AdSense Dashboard'dan şunları izleyebilirsiniz:
- Görüntüleme sayıları
- Tıklama oranları (CTR)
- Kazançlar
- En iyi performans gösteren sayfalar

## 8. Özelleştirme

### Reklam Sıklığını Değiştirme

`src/app/page.tsx` dosyasında, in-feed reklamların sıklığını değiştirebilirsiniz:

```tsx
{/* Her 6 hikayede bir reklam göster */}
{(index + 1) % 6 === 0 && ...}
```

`% 6` değerini değiştirerek sıklığı ayarlayın (örn: `% 4` = her 4 hikayede bir)

### Yeni Reklam Yerleri Ekleme

```tsx
import { TopBanner, SidebarBanner, InArticleBanner, InFeedBanner } from '@/app/components/AdBanner';

// Kullanım:
<div className="top-banner-wrapper">
  <TopBanner />
</div>
```

## 9. Sorun Giderme

### Reklamlar Görünmüyor:
1. Environment variables'ları kontrol edin
2. Publisher ID ve Slot ID'lerin doğru olduğundan emin olun
3. AdSense hesabınızın onaylandığından emin olun
4. Tarayıcı konsolunda hata olup olmadığını kontrol edin
5. Ad blocker kapalı olduğundan emin olun

### "AdSense script failed to load":
1. İnternet bağlantınızı kontrol edin
2. Firewall/proxy ayarlarını kontrol edin
3. HTTPS kullandığınızdan emin olun (production'da)

## 10. Deployment

Vercel, Netlify veya başka bir platforma deploy ederken:

1. Environment variables'ları platform dashboard'undan ekleyin
2. Build ve deploy edin
3. AdSense'de sitenizin URL'ini doğrulayın

## Destek

Daha fazla bilgi için:
- [Google AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
