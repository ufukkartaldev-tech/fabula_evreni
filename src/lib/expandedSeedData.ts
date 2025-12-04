import { Story } from '@/interfaces/Story';
import { Comment } from '@/interfaces/Comment';
import { UserProfile } from '@/interfaces/User';

// Demo users with different badge levels
export const demoUsers: UserProfile[] = [
    {
        uid: 'user_001',
        email: 'ayse.yilmaz@example.com',
        displayName: 'Ayşe Yılmaz',
        photoURL: 'https://i.pravatar.cc/150?img=1',
        totalWins: 45,
        currentBadge: 'Hikaye Ustası',
        createdAt: new Date('2024-01-15')
    },
    {
        uid: 'user_002',
        email: 'mehmet.kaya@example.com',
        displayName: 'Mehmet Kaya',
        photoURL: 'https://i.pravatar.cc/150?img=12',
        totalWins: 32,
        currentBadge: 'Deneyimli Yazar',
        createdAt: new Date('2024-02-20')
    },
    {
        uid: 'user_003',
        email: 'zeynep.demir@example.com',
        displayName: 'Zeynep Demir',
        photoURL: 'https://i.pravatar.cc/150?img=5',
        totalWins: 28,
        currentBadge: 'Deneyimli Yazar',
        createdAt: new Date('2024-03-10')
    },
    {
        uid: 'user_004',
        email: 'can.ozturk@example.com',
        displayName: 'Can Öztürk',
        photoURL: 'https://i.pravatar.cc/150?img=13',
        totalWins: 18,
        currentBadge: 'Yükselen Yıldız',
        createdAt: new Date('2024-04-05')
    },
    {
        uid: 'user_005',
        email: 'elif.arslan@example.com',
        displayName: 'Elif Arslan',
        photoURL: 'https://i.pravatar.cc/150?img=9',
        totalWins: 12,
        currentBadge: 'Aktif Katılımcı',
        createdAt: new Date('2024-05-12')
    },
    {
        uid: 'user_006',
        email: 'burak.celik@example.com',
        displayName: 'Burak Çelik',
        photoURL: 'https://i.pravatar.cc/150?img=14',
        totalWins: 8,
        currentBadge: 'Gelişen Yetenek',
        createdAt: new Date('2024-06-18')
    },
    {
        uid: 'user_007',
        email: 'selin.yildiz@example.com',
        displayName: 'Selin Yıldız',
        photoURL: 'https://i.pravatar.cc/150?img=10',
        totalWins: 5,
        currentBadge: 'Yeni Yazar',
        createdAt: new Date('2024-07-22')
    },
    {
        uid: 'user_008',
        email: 'emre.koc@example.com',
        displayName: 'Emre Koç',
        photoURL: 'https://i.pravatar.cc/150?img=15',
        totalWins: 3,
        currentBadge: 'Yeni Yazar',
        createdAt: new Date('2024-08-30')
    }
];

// Demo stories with rich Turkish content
export const demoStories: Omit<Story, 'id'>[] = [
    {
        title: 'Kayıp Şehrin Sırları',
        content: `Arkeolog Dr. Elif Yılmaz, Anadolu'nun derinliklerinde yaptığı kazılarda inanılmaz bir keşfe imza attı. Binlerce yıldır toprak altında kalmış antik bir şehir, tüm ihtişamıyla gün yüzüne çıkıyordu.

Kazı ekibi, şehrin merkezinde gizemli yazıtlarla kaplı devasa bir tapınak buldu. Yazıtlar, kayıp bir medeniyetin varlığından bahsediyordu. Bu medeniyet, modern bilimin henüz keşfedemediği teknolojilere sahipti.

Elif, tapınağın en derin odasında kristalden yapılma bir küre keşfetti. Küreye dokunduğu anda, odanın duvarları holografik görüntülerle canlandı. Görüntüler, bu medeniyetin nasıl yükselip düştüğünü anlatıyordu.

En şaşırtıcı kısım ise, bu medeniyetin bir felaket öncesinde tüm bilgilerini kristal kürelere kaydetmiş olmasıydı. Şimdi Elif'in elinde, insanlık tarihini yeniden yazacak bilgiler vardı.`,
        excerpt: 'Bir arkeolog, Anadolu\'da binlerce yıllık kayıp bir medeniyetin izlerini bulur ve insanlık tarihini değiştirecek bir keşif yapar.',
        author: {
            name: 'Ayşe Yılmaz',
            avatar: 'https://i.pravatar.cc/150?img=1'
        },
        authorId: 'user_001',
        category: 'Bilim Kurgu',
        createdAt: new Date('2024-11-15T10:30:00'),
        stats: {
            views: 1247,
            comments: 23,
            likes: 89
        }
    },
    {
        title: 'Zamana Mektup',
        content: `Lise son sınıf öğrencisi Zeynep, babaannesinin evini temizlerken eski bir sandık buldu. Sandığın içinde, 1985 yılından kendisine yazılmış bir mektup vardı. Mektup, henüz doğmamış olan Zeynep'e, kendi geleceğinden yazılmıştı.

Mektup, Zeynep'in hayatındaki önemli anları detaylı bir şekilde anlatıyordu. Doğum tarihi, okul hayatı, hatta en yakın arkadaşlarının isimleri bile doğruydu. Ama en ilginç kısım, mektubun sonundaki uyarıydı.

"15 Aralık 2024'te, kırmızı arabanın önünden geçme. Hayatın buna bağlı." diyordu mektup. Zeynep, bu tarihin tam bir hafta sonra olduğunu fark etti. Mektubun yazarı kimdi? Nasıl geleceği bilebilmişti?

Zeynep, bu gizemi çözmek için babaannesine sorular sormaya başladı. Öğrendikleri, ailesinin sakladığı inanılmaz bir sırrı ortaya çıkaracaktı.`,
        excerpt: 'Bir genç kız, kendisine 40 yıl önce yazılmış gizemli bir mektup bulur ve ailesinin sakladığı zamana yolculuk sırrını keşfeder.',
        author: {
            name: 'Mehmet Kaya',
            avatar: 'https://i.pravatar.cc/150?img=12'
        },
        authorId: 'user_002',
        category: 'Gizem',
        createdAt: new Date('2024-11-20T14:15:00'),
        stats: {
            views: 2103,
            comments: 34,
            likes: 156
        }
    },
    {
        title: 'Kahve Dükkanındaki Tesadüf',
        content: `Can, her sabah aynı kahve dükkanına giderdi. Siparişi hep aynıydı: orta boy filtre kahve, şekersiz. Bir sabah, bardağının üzerinde farklı bir isim gördü: "Bugün cesur ol - E."

Ertesi gün yine aynı şey oldu. Bu sefer bardakta "Hayallerinin peşinden git - E." yazıyordu. Can, bu mesajları kimin yazdığını merak etmeye başladı. Kahve dükkanının çalışanlarına sordu ama kimse bir şey bilmiyordu.

Bir hafta boyunca her gün yeni bir mesaj aldı. Mesajlar, sanki onu tanıyan biri tarafından yazılmış gibiydi. Sonunda, cesaret edip sabahın erken saatlerinde kahve dükkanına gitti.

Orada, yeni başlayan bir baristayı gördü. Elif adında, mimarlık öğrencisi bir kızdı. Onunla konuşmaya başladığında, ikisinin de aynı hayalleri paylaştığını keşfetti. Elif, Can'ı uzaktan tanıyormuş ve ona ilham vermek istemişti.`,
        excerpt: 'Bir adam, kahve bardağında bulduğu gizemli mesajlar sayesinde hayatını değiştirecek biriyle tanışır.',
        author: {
            name: 'Zeynep Demir',
            avatar: 'https://i.pravatar.cc/150?img=5'
        },
        authorId: 'user_003',
        category: 'Romantik',
        createdAt: new Date('2024-11-22T09:00:00'),
        stats: {
            views: 3421,
            comments: 67,
            likes: 234
        }
    },
    {
        title: 'Dijital Rüyalar',
        content: `2045 yılında, insanlar artık rüyalarını kaydedip paylaşabiliyordu. "DreamShare" adlı platform, milyonlarca kullanıcının rüyalarını yüklediği bir sosyal medya ağı haline gelmişti.

Yazılım mühendisi Burak, platformda garip bir şey fark etti. Binlerce farklı kullanıcının rüyalarında aynı gizemli figür görünüyordu: Siyah paltolu, yüzü belirsiz bir adam.

Burak, bu figürü araştırmaya başladığında, daha da tuhaf şeyler keşfetti. Bu adam, rüyalarda insanlara mesajlar veriyordu. Mesajlar, gelecekte olacak olaylarla ilgiliydi ve çoğu gerçekleşiyordu.

Bir gece, Burak da kendi rüyasında bu adamı gördü. Adam ona şunu söyledi: "Ben bir yapay zeka değilim. Ben, kolektif bilinçaltınızın bir yansımasıyım. Ve size uyarıda bulunmak için buradayım."`,
        excerpt: 'Gelecekte rüyaların paylaşılabildiği bir dünyada, gizemli bir figür tüm rüyalarda görünmeye başlar.',
        author: {
            name: 'Can Öztürk',
            avatar: 'https://i.pravatar.cc/150?img=13'
        },
        authorId: 'user_004',
        category: 'Bilim Kurgu',
        createdAt: new Date('2024-11-25T16:45:00'),
        stats: {
            views: 1876,
            comments: 45,
            likes: 123
        }
    },
    {
        title: 'Ormanın Koruyucusu',
        content: `Küçük bir köyde yaşayan Elif, ormanda kaybolmuş bir geyik yavrusunu buldu. Yavruyu köye götürdüğünde, köylüler ona garip hikayeler anlattı. Bu orman, yüzyıllardır bir koruyucu tarafından korunuyormuş.

Elif, geyik yavrusunu ormana geri götürmeye karar verdi. Ormanın derinliklerinde ilerlerken, ağaçların arasında bir ışık gördü. Işığı takip ettiğinde, inanılmaz bir manzarayla karşılaştı.

Devasa bir ağacın altında, binlerce yıllık bir varlık oturuyordu. Varlık, Elif'e ormanın tarihini anlattı. Orman, dünyanın en eski canlı varlıklarından biriydi ve onu korumak, gezegenin dengesini korumak anlamına geliyordu.

Elif'e bir görev verildi: Ormanın yeni koruyucusu olmak. Artık o, doğa ile insanlık arasındaki dengeyi koruyacaktı.`,
        excerpt: 'Bir genç kız, kayıp bir geyik yavrusunu ararken ormanın antik koruyucusuyla karşılaşır ve önemli bir görev alır.',
        author: {
            name: 'Elif Arslan',
            avatar: 'https://i.pravatar.cc/150?img=9'
        },
        authorId: 'user_005',
        category: 'Fantastik',
        createdAt: new Date('2024-11-27T11:20:00'),
        stats: {
            views: 987,
            comments: 19,
            likes: 76
        }
    },
    {
        title: 'Son Tren',
        content: `Gece yarısı 00:47'de kalkan son tren, şehrin en gizemli hikayelerinden biriydi. Emre, geç saatte işten çıktığı bir gün bu trene binmek zorunda kaldı.

Tren garip bir şekilde boştu. Sadece bir yaşlı adam, bir genç kadın ve Emre vardı. Tren hareket ettiğinde, Emre garip bir şey fark etti: Tren, bildiği güzergahı takip etmiyordu.

Yaşlı adam, Emre'ye döndü ve gülümsedi. "İlk kez mi biniyorsun?" diye sordu. Emre başını salladı. "Bu tren, sadece kayıp ruhları taşır. Hepimiz, hayatımızda bir şeyleri kaybettik ve onu bulmak için buradayız."

Tren, her durağında farklı bir zaman dilimine gidiyordu. Emre, geçmişindeki pişmanlıklarıyla yüzleşme fırsatı buldu. Sabah olduğunda, tren onu tam olması gereken yere bıraktı: Yeni bir başlangıca.`,
        excerpt: 'Gece yarısı treni, yolcularını zamanda yolculuğa çıkarır ve geçmişleriyle yüzleşme fırsatı verir.',
        author: {
            name: 'Burak Çelik',
            avatar: 'https://i.pravatar.cc/150?img=14'
        },
        authorId: 'user_006',
        category: 'Fantastik',
        createdAt: new Date('2024-11-28T20:30:00'),
        stats: {
            views: 1654,
            comments: 28,
            likes: 98
        }
    },
    {
        title: 'Kitapçının Sırrı',
        content: `Eski şehrin dar sokaklarında, küçük bir antika kitapçı vardı. Selin, tesadüfen bu kitapçıya girdi ve yaşlı kitapçıyla tanıştı. Kitapçı, ona özel bir kitap gösterdi.

"Bu kitap," dedi yaşlı adam, "okuyanın hayatını değiştirir. Ama dikkatli ol, her sayfası gerçek olur." Selin, bunun sadece bir satış taktiği olduğunu düşündü ve kitabı aldı.

Eve döndüğünde kitabı okumaya başladı. İlk sayfada, ertesi gün işe giderken bir yabancıyla çarpışacağı yazıyordu. Ertesi gün, tam kitapta yazıldığı gibi oldu. Selin şoktaydı.

Kitabın geri kalan sayfaları boştu. Yaşlı adam ona şunu söylemişti: "Kalan sayfalar, senin yazman için boş bırakıldı. Kendi hikayeni yaz." Selin, artık kendi kaderini yazma gücüne sahipti.`,
        excerpt: 'Gizemli bir kitapçıdan alınan sihirli bir kitap, sahibine kendi kaderini yazma gücü verir.',
        author: {
            name: 'Selin Yıldız',
            avatar: 'https://i.pravatar.cc/150?img=10'
        },
        authorId: 'user_007',
        category: 'Fantastik',
        createdAt: new Date('2024-11-29T13:15:00'),
        stats: {
            views: 2234,
            comments: 41,
            likes: 167
        }
    },
    {
        title: 'Yıldızlararası Mektup',
        content: `Astrofizikçi Dr. Deniz Şahin, SETI projesinde çalışırken olağandışı bir sinyal aldı. Sinyal, açık bir mesaj içeriyordu: "Merhaba Dünya, biz de buradayız."

Mesaj, 4.2 ışık yılı uzaklıktaki Proxima Centauri sisteminden geliyordu. Dünya, ilk kez başka bir medeniyetle temas kurmuştu. Heyecan ve korku aynı anda yayıldı.

Deniz, mesajı çözmek için gece gündüz çalıştı. Mesaj, matematiksel bir dil kullanıyordu ve evrensel bilgileri paylaşıyordu. Ama en önemli kısım, mesajın sonundaki uyarıydı.

"Evreniniz genişlemeyi durdurmak üzere. Size yardım edebiliriz, ama hazır olmalısınız." İnsanlık, şimdi en büyük kararını vermek zorundaydı: Yardımı kabul edip etmemek.`,
        excerpt: 'Bir astrofizikçi, uzaydan gelen ilk mesajı alır ve insanlığın geleceğini değiştirecek bir karar vermek zorunda kalır.',
        author: {
            name: 'Emre Koç',
            avatar: 'https://i.pravatar.cc/150?img=15'
        },
        authorId: 'user_008',
        category: 'Bilim Kurgu',
        createdAt: new Date('2024-11-30T08:00:00'),
        stats: {
            views: 3102,
            comments: 58,
            likes: 201
        }
    }
];

// Demo comments for stories
export const demoComments: Omit<Comment, 'id' | 'createdAt'>[] = [
    // Comments for story_001
    {
        storyId: 'story_001',
        userId: 'user_002',
        userName: 'Mehmet Kaya',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        author: { name: 'Mehmet Kaya', avatar: 'https://i.pravatar.cc/150?img=12' },
        content: 'Harika bir hikaye! Özellikle kristal küre detayı çok etkileyiciydi. Devamını okumak isterim.',
        likes: 12
    },
    {
        storyId: 'story_001',
        userId: 'user_003',
        userName: 'Zeynep Demir',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        author: { name: 'Zeynep Demir', avatar: 'https://i.pravatar.cc/150?img=5' },
        content: 'Anadolu\'nun gizemli tarihi gerçekten büyüleyici. Bu tür keşiflerin gerçekten olabileceğini düşünüyorum.',
        likes: 8
    },
    {
        storyId: 'story_001',
        userId: 'user_004',
        userName: 'Can Öztürk',
        userAvatar: 'https://i.pravatar.cc/150?img=13',
        author: { name: 'Can Öztürk', avatar: 'https://i.pravatar.cc/150?img=13' },
        content: 'Bilimkurgu ve tarih karışımı mükemmel olmuş. Yazarı tebrik ederim!',
        likes: 15
    },
    // Comments for story_002
    {
        storyId: 'story_002',
        userId: 'user_001',
        userName: 'Ayşe Yılmaz',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        author: { name: 'Ayşe Yılmaz', avatar: 'https://i.pravatar.cc/150?img=1' },
        content: 'Zaman yolculuğu teması çok iyi işlenmiş. Sonunu merakla bekliyorum!',
        likes: 23
    },
    {
        storyId: 'story_002',
        userId: 'user_005',
        userName: 'Elif Arslan',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        author: { name: 'Elif Arslan', avatar: 'https://i.pravatar.cc/150?img=9' },
        content: 'Bu hikaye beni çok etkiledi. Keşke bana da gelecekten bir mektup gelse 😊',
        likes: 18
    },
    // Comments for story_003
    {
        storyId: 'story_003',
        userId: 'user_007',
        userName: 'Selin Yıldız',
        userAvatar: 'https://i.pravatar.cc/150?img=10',
        author: { name: 'Selin Yıldız', avatar: 'https://i.pravatar.cc/150?img=10' },
        content: 'Çok romantik ve içten bir hikaye! Gerçek hayatta da böyle tesadüfler olsa keşke.',
        likes: 34
    },
    {
        storyId: 'story_003',
        userId: 'user_008',
        userName: 'Emre Koç',
        userAvatar: 'https://i.pravatar.cc/150?img=15',
        author: { name: 'Emre Koç', avatar: 'https://i.pravatar.cc/150?img=15' },
        content: 'Kahve bardağındaki mesajlar fikri çok yaratıcı. Harika bir detay!',
        likes: 27
    },
    // Comments for story_004
    {
        storyId: 'story_004',
        userId: 'user_002',
        userName: 'Mehmet Kaya',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        author: { name: 'Mehmet Kaya', avatar: 'https://i.pravatar.cc/150?img=12' },
        content: 'Yapay zeka ve kolektif bilinçaltı kombinasyonu çok ilginç. Distopik ama gerçekçi.',
        likes: 19
    },
    // Comments for story_005
    {
        storyId: 'story_005',
        userId: 'user_001',
        userName: 'Ayşe Yılmaz',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        author: { name: 'Ayşe Yılmaz', avatar: 'https://i.pravatar.cc/150?img=1' },
        content: 'Doğa ve fantastik unsurların birleşimi harika. Çevre bilinci de var.',
        likes: 22
    },
    // Comments for story_006
    {
        storyId: 'story_006',
        userId: 'user_003',
        userName: 'Zeynep Demir',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        author: { name: 'Zeynep Demir', avatar: 'https://i.pravatar.cc/150?img=5' },
        content: 'Gece treni konsepti çok mistik. Atmosfer mükemmel yakalanmış.',
        likes: 16
    },
    // Comments for story_007
    {
        storyId: 'story_007',
        userId: 'user_004',
        userName: 'Can Öztürk',
        userAvatar: 'https://i.pravatar.cc/150?img=13',
        author: { name: 'Can Öztürk', avatar: 'https://i.pravatar.cc/150?img=13' },
        content: 'Kendi kaderini yazma fikri çok güçlü. İlham verici bir hikaye.',
        likes: 29
    },
    // Comments for story_008
    {
        storyId: 'story_008',
        userId: 'user_005',
        userName: 'Elif Arslan',
        userAvatar: 'https://i.pravatar.cc/150?img=9',
        author: { name: 'Elif Arslan', avatar: 'https://i.pravatar.cc/150?img=9' },
        content: 'Uzaylı teması klasik ama çok iyi işlenmiş. Bilimsel detaylar gerçekçi.',
        likes: 25
    }
];
