# 📚 Fabula - İnteraktif Hikaye Platformu

Fabula, kullanıcıların birlikte hikayeler oluşturabildiği, okuyabildiği ve hikayelerin gidişatına yön verebildiği modern bir hikaye anlatıcılığı platformudur.

![Fabula Banner](https://via.placeholder.com/1200x400?text=Fabula+Storytelling+Platform)

## 🌟 Özellikler

- **✍️ İnteraktif Hikayeler:** Okuyucuların seçim yaparak gidişatı değiştirebildiği dallanan hikaye yapısı.
- **🌳 Hızlı Dallanma:** Kullanıcılar hikayelere yeni yollar önerebilir ve anında katkıda bulunabilir.
- **🏆 Oyunlaştırma:** Okudukça ve yazdıkça XP kazanın, seviye atlayın ve rozetler toplayın.
- **👤 Kullanıcı Profilleri:** Okuma geçmişi, kazanılan rozetler ve istatistikler.
- **📂 Koleksiyonlar:** Favori hikayelerinizi kişisel listelerde toplayın.
- **🛡️ Moderasyon:** Topluluk odaklı raporlama sistemi ve gelişmiş Admin paneli.
- **💬 Yorum ve Etkileşim:** Hikayelere yorum yapın, beğenin ve tartışmalara katılın.

## 🛠️ Teknolojiler

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), React 19
- **Stil:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Veritabanı:** [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)
- **Deploy:** [Vercel](https://vercel.com/)

## 🚀 Kurulum

Projeyi yerel ortamınızda çalıştırmak için adımları izleyin:

1. **Repoyu klonlayın:**
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/fabula.git
   cd fabula
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın:**
   `.env.local` dosyası oluşturun ve Firebase ayarlarınızı ekleyin:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   
   # Admin işlemleri için (Sadece sunucu tarafında kullanılır)
   FIREBASE_SERVICE_ACCOUNT_KEY={...json_icerigi...}
   ```

4. **Projeyi Başlatın:**
   ```bash
   npm run dev
   ```

## 🤝 Katkıda Bulunma

1. Forklayın
2. Yeni bir dal (branch) oluşturun (`git checkout -b ozellik/yeni-ozellik`)
3. Değişikliklerinizi commit yapın (`git commit -m 'Yeni özellik eklendi'`)
4. Dalınıza push yapın (`git push origin ozellik/yeni-ozellik`)
5. Bir Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
