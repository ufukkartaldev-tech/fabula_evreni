# 🔒 Security Policy

## 🛡️ Supported Versions

Aşağıdaki versiyonlar için güvenlik güncellemeleri sağlanmaktadır:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🐛 Reporting a Vulnerability

Güvenlik açığı bulduysanız, lütfen aşağıdaki adımları izleyin:

### 1. **Public Issue Açmayın**

Güvenlik açıklarını public issue olarak **AÇMAYIN**. Bu, kötü niyetli kişilerin açığı kullanmasına neden olabilir.

### 2. **Private Olarak Bildirin**

Güvenlik açığını private olarak bildirmek için:

- **GitHub Security Advisory** kullanın:
  - Repository → Security → Advisories → New draft security advisory
  
- **Veya Email gönderin**:
  - Email: your.email@example.com
  - Konu: [SECURITY] Güvenlik Açığı Bildirimi

### 3. **Bildirimde Bulunması Gerekenler**

Lütfen aşağıdaki bilgileri ekleyin:

- **Açığın Açıklaması**: Ne tür bir güvenlik açığı?
- **Etkilenen Bileşenler**: Hangi dosyalar/fonksiyonlar etkileniyor?
- **Saldırı Senaryosu**: Açık nasıl kullanılabilir?
- **Çözüm Önerisi**: Varsa çözüm öneriniz
- **PoC (Proof of Concept)**: Varsa örnek kod

### 4. **Yanıt Süresi**

- **İlk Yanıt**: 48 saat içinde
- **Durum Güncellemesi**: 7 gün içinde
- **Çözüm**: Kritikliğe göre 30-90 gün

## 🔐 Security Best Practices

### Kullanıcılar İçin

1. **Environment Variables**
   - `.env.local` dosyasını asla commit etmeyin
   - API key'leri güvenli tutun
   - Production'da farklı credentials kullanın

2. **Authentication**
   - Güçlü şifreler kullanın
   - 2FA aktif edin (Firebase)
   - Session timeout ayarlayın

3. **Data Privacy**
   - Kişisel bilgileri paylaşmayın
   - GDPR kurallarına uyun
   - Kullanıcı verilerini şifreleyin

### Geliştiriciler İçin

1. **Dependencies**
   - Düzenli olarak güncelleyin
   - `npm audit` çalıştırın
   - Dependabot uyarılarını takip edin

2. **Code Security**
   - Input validation yapın
   - XSS koruması kullanın
   - SQL injection'a karşı korunun
   - CSRF token kullanın

3. **Firebase Security**
   - Firestore rules güncel tutun
   - Storage rules kontrol edin
   - Auth rules doğrulayın

## 🚨 Known Security Issues

Şu anda bilinen kritik güvenlik açığı **yoktur**.

## 📜 Security Disclosure Policy

1. **Responsible Disclosure**: Açığı bildirdikten sonra 90 gün bekleyin
2. **Coordination**: Bizimle koordineli çalışın
3. **Credit**: Çözümden sonra adınız credits'te yer alacak

## 🏆 Hall of Fame

Güvenlik açığı bildiren kişiler:

- *Henüz kimse yok - ilk siz olun!*

## 📞 Contact

Güvenlik ile ilgili sorularınız için:

- **Email**: your.email@example.com
- **GitHub Security**: [Security Advisories](https://github.com/ufukkartaldev-tech/fabula_evreni/security/advisories)

## 🔗 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)

---

**Son Güncelleme**: 2025-12-08

Güvenliğimizi iyileştirmeye yardımcı olduğunuz için teşekkürler! 🙏
