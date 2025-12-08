# 🔧 Environment Variables Kurulum Rehberi

## Gerekli Environment Variables

`.env.local` dosyanıza aşağıdaki değişkenleri ekleyin:

```env
# ===========================================
# FIREBASE CONFIGURATION
# ===========================================
# (Mevcut Firebase ayarlarınız buraya)

# ===========================================
# GOOGLE ADSENSE
# ===========================================
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1334433458655438
NEXT_PUBLIC_ADSENSE_TOP_BANNER_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT=2345678901
NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT=3456789012
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=4567890123

# ===========================================
# GOOGLE ANALYTICS
# ===========================================
# Google Analytics 4 Measurement ID
# Format: G-XXXXXXXXXX
# Nasıl alınır: https://analytics.google.com > Admin > Data Streams
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ===========================================
# GELECEK ENTEGRASYONLAR (Opsiyonel)
# ===========================================

# OpenAI API (AI Öneriler için)
# OPENAI_API_KEY=sk-...

# Stripe (Ödeme sistemi için)
# STRIPE_PUBLIC_KEY=pk_...
# STRIPE_SECRET_KEY=sk_...

# NFT/Web3 (Gelecekte)
# ALCHEMY_API_KEY=...
# WALLET_CONNECT_PROJECT_ID=...
```

## 📋 Nasıl Alınır?

### Google Analytics Measurement ID

1. [Google Analytics](https://analytics.google.com) hesabınıza gidin
2. **Admin** (Sol altta dişli ikonu) tıklayın
3. **Data Streams** seçin
4. **Add stream** > **Web** seçin
5. Website URL'inizi girin
6. **Measurement ID** (G-XXXXXXXXXX) kopyalayın

### Google AdSense Slot IDs

1. [Google AdSense](https://www.google.com/adsense) hesabınıza gidin
2. **Ads** > **Ad units** seçin
3. Her reklam birimi için **Get code** tıklayın
4. `data-ad-slot="XXXXXXXXXX"` kısmındaki sayıyı kopyalayın

## ✅ Kurulum Sonrası

1. `.env.local` dosyasını kaydedin
2. Uygulamayı yeniden başlatın:
   ```bash
   # Ctrl+C ile durdurun
   npm run dev
   ```
3. Tarayıcıda test edin

## 🔒 Güvenlik

- `.env.local` dosyasını **asla** Git'e commit etmeyin
- `.gitignore` dosyasında `.env.local` olduğundan emin olun
- Production'da environment variables'ları hosting platformundan ekleyin

## 📝 Notlar

- `NEXT_PUBLIC_` ile başlayan değişkenler client-side'da kullanılabilir
- Diğer değişkenler sadece server-side'da kullanılabilir
- Değişikliklerden sonra mutlaka restart edin
