# 🤝 Katkıda Bulunma Rehberi

Fabula projesine katkıda bulunmak istediğiniz için teşekkürler! 🎉

## 📋 İçindekiler

- [Davranış Kuralları](#davranış-kuralları)
- [Nasıl Katkıda Bulunurum](#nasıl-katkıda-bulunurum)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Pull Request Süreci](#pull-request-süreci)
- [Commit Mesaj Formatı](#commit-mesaj-formatı)
- [Code Style](#code-style)

## 📜 Davranış Kuralları

Bu proje [Contributor Covenant](https://www.contributor-covenant.org/) davranış kurallarını benimser. Katılarak bu kuralları kabul etmiş olursunuz.

## 🚀 Nasıl Katkıda Bulunurum?

### 1. Issue Açın

Aşağıdaki durumlarda issue açabilirsiniz:
- 🐛 **Bug bulduysanız**
- ✨ **Yeni özellik öneriyorsanız**
- 📖 **Dokümantasyon iyileştirmesi öneriyorsanız**
- ❓ **Soru sormak istiyorsanız**

### 2. Pull Request Gönderin

1. **Repository'yi fork edin**
   ```bash
   # GitHub'da "Fork" butonuna tıklayın
   ```

2. **Clone edin**
   ```bash
   git clone https://github.com/YOUR_USERNAME/fabula_evreni.git
   cd fabula_evreni
   ```

3. **Feature branch oluşturun**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Değişikliklerinizi yapın**
   - Kod yazın
   - Test ekleyin
   - Dokümantasyon güncelleyin

5. **Commit yapın**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

6. **Push edin**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Pull Request açın**
   - GitHub'da repository'nize gidin
   - "Pull Request" butonuna tıklayın
   - Değişikliklerinizi açıklayın

## 🛠️ Geliştirme Ortamı

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Firebase hesabı

### Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Environment variables'ı ayarlayın
cp .env.example .env.local
# .env.local dosyasını Firebase bilgilerinizle doldurun

# Development server'ı başlatın
npm run dev
```

### Testleri Çalıştırın

```bash
# Unit & Component testleri
npm test

# E2E testleri
npm run test:e2e

# Coverage raporu
npm run test:coverage
```

## 📝 Pull Request Süreci

### PR Checklist

- [ ] Kod değişiklikleri yapıldı
- [ ] Testler eklendi/güncellendi
- [ ] Tüm testler geçiyor
- [ ] Dokümantasyon güncellendi
- [ ] Commit mesajları formatına uygun
- [ ] PR açıklaması detaylı

### PR Açıklaması

```markdown
## Değişiklikler
- Feature X eklendi
- Bug Y düzeltildi

## Test Edildi
- [ ] Unit testler
- [ ] E2E testler
- [ ] Manuel test

## Screenshots
(Varsa ekleyin)

## İlgili Issue
Closes #123
```

## 💬 Commit Mesaj Formatı

[Conventional Commits](https://www.conventionalcommits.org/) standardını kullanıyoruz:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Yeni özellik
- `fix`: Bug düzeltme
- `docs`: Dokümantasyon
- `style`: Kod formatı (kod mantığını değiştirmeyen)
- `refactor`: Kod iyileştirme
- `test`: Test ekleme/düzeltme
- `chore`: Build, CI/CD, dependencies

### Örnekler

```bash
feat: Add user authentication
feat(auth): Implement Google login
fix: Fix story card rendering issue
docs: Update README with new features
test: Add tests for like service
refactor: Improve story loading performance
```

## 🎨 Code Style

### TypeScript

- ✅ TypeScript kullanın
- ✅ Strict mode aktif
- ✅ Type annotations ekleyin
- ❌ `any` kullanmayın (gerekmedikçe)

### ESLint

```bash
# Lint kontrolü
npm run lint

# Auto-fix
npm run lint -- --fix
```

### Prettier

```bash
# Format kontrolü
npm run format:check

# Auto-format
npm run format
```

### Naming Conventions

- **Components**: PascalCase (`StoryCard.tsx`)
- **Functions**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_STORY_LENGTH`)
- **Interfaces**: PascalCase (`UserProfile`)

## 🧪 Test Yazma

### Unit Test Örneği

```typescript
import { describe, it, expect } from 'vitest'
import { calculateReadingTime } from '@/lib/readingTime'

describe('calculateReadingTime', () => {
    it('should calculate reading time correctly', () => {
        const text = 'Test content'
        const result = calculateReadingTime(text)
        expect(result).toBeGreaterThan(0)
    })
})
```

### Component Test Örneği

```typescript
import { render, screen } from '@testing-library/react'
import StoryCard from '@/app/components/StoryCard'

it('should render story title', () => {
    const story = createMockStory()
    render(<StoryCard story={story} />)
    expect(screen.getByText(story.title)).toBeInTheDocument()
})
```

## 📚 Dokümantasyon

### README Güncellemeleri

Yeni özellik eklerseniz README.md'yi güncelleyin:
- Özellikler listesine ekleyin
- Kullanım örneği ekleyin
- Screenshots ekleyin (gerekirse)

### Code Comments

```typescript
/**
 * Calculates reading time for given text
 * @param text - The text to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
    // Implementation
}
```

## 🏷️ Issue Labels

- `bug`: Hata bildirimi
- `enhancement`: Yeni özellik
- `documentation`: Dokümantasyon
- `good first issue`: Yeni başlayanlar için
- `help wanted`: Yardım gerekli
- `question`: Soru

## 💡 İpuçları

1. **Küçük PR'lar gönderin** - Büyük değişiklikleri parçalara bölün
2. **Test yazın** - Her değişiklik için test ekleyin
3. **Dokümantasyon** - Kod kadar önemli
4. **Sorular sorun** - GitHub Discussions kullanın
5. **Sabırlı olun** - Review süreci zaman alabilir

## 🆘 Yardım

### Sorularınız mı var?

- 💬 [GitHub Discussions](https://github.com/ufukkartaldev-tech/fabula_evreni/discussions)
- 🐛 [GitHub Issues](https://github.com/ufukkartaldev-tech/fabula_evreni/issues)

### Kaynaklar

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 🙏 Teşekkürler

Katkılarınız için teşekkür ederiz! Her katkı, Fabula'yı daha iyi yapar. 💙

---

**Happy Coding!** 🚀
