# Google AdSense Kurulum Talimatları

## ⚠️ AdSense'de Sorun mu Var?

Eğer Google AdSense'de "Rahatsızlıktan dolayı özür dileriz" hatası alıyorsanız:

### Neden Oluyor?
- Yeni AdSense hesapları için bazı özellikler hemen aktif olmayabilir
- Hesap onay sürecinde olabilirsiniz
- Geçici teknik sorun olabilir
- Bölge kısıtlamaları olabilir

### Ne Yapmalısınız?

#### Seçenek 1: Bekleyin ve Tekrar Deneyin (Önerilen)
1. 24-48 saat bekleyin
2. AdSense hesabınızın onaylandığından emin olun
3. Tekrar reklam birimi oluşturmayı deneyin

#### Seçenek 2: Test Modunda Devam Edin
Şimdilik test Slot ID'leri ile devam edin:

**`.env.local` dosyanıza ekleyin:**

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1334433458655438

# Test Slot IDs (AdSense düzelince gerçek ID'lerle değiştirin)
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=2345678901
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=3456789012
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=4567890123
```

#### Seçenek 3: Auto Ads Kullanın
1. AdSense'de **"Ads"** > **"Auto ads"** bölümüne gidin
2. Sitenizi ekleyin
3. Auto ads kodunu alın
4. Otomatik reklam yerleşimi kullanın

## 🎯 Şu Anki Durum

Uygulamanızda AdSense entegrasyonu **%95 tamamlandı**:

✅ **Tamamlanan:**
- Publisher ID entegre edildi (ca-pub-1334433458655438)
- AdSense script yükleniyor
- Reklam alanları yerleştirildi (3 farklı yerde)
- Responsive tasarım hazır
- Dark mode desteği var

⏳ **Bekleyen:**
- Gerçek Slot ID'lerin eklenmesi

## 📋 Geçici Çözüm: .env.local Dosyasını Manuel Oluşturun

1. Proje klasöründe `.env.local` dosyasını açın (yoksa oluşturun)
2. Aşağıdaki satırları ekleyin:

```env
# Firebase Configuration (mevcut ayarlarınız)
# ... mevcut Firebase ayarlarınız buraya ...

# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1334433458655438
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=2345678901
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=3456789012
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=4567890123
```

3. Dosyayı kaydedin
4. Terminal'de uygulamayı yeniden başlatın:
   ```bash
   # Ctrl+C ile durdurun
   npm run dev
   ```

## 🎉 Test Edin

Tarayıcıda `http://localhost:3000` adresini açın:
- Reklam alanları "Reklam" etiketi ile görünecek
- Placeholder/boş alanlar olacak (normal)
- Gerçek reklamlar için AdSense onayı gerekli

## 🔄 AdSense Düzelince

1. AdSense'de reklam birimleri oluşturun
2. Gerçek Slot ID'leri alın
3. `.env.local` dosyasındaki test ID'leri değiştirin
4. Uygulamayı yeniden başlatın

## 📞 Yardım

AdSense sorunu devam ederse:
- [AdSense Help Center](https://support.google.com/adsense)
- AdSense hesap durumunuzu kontrol edin
- Hesap onayını bekleyin

---

**Önemli:** Kod tamamen hazır! AdSense sorunu çözülünce sadece Slot ID'leri güncelleyeceksiniz. 🚀
