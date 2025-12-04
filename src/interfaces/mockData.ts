import { Story } from './Story';
import { Comment } from './Comment';

export const mockStories: Story[] = [
    {
        id: '1',
        title: 'Kayıp Şehrin Sırları',
        excerpt: 'Antik bir haritanın peşinde koşan genç arkeolog Maya, Amazon ormanlarının derinliklerinde inanılmaz bir keşif yapar...',
        content: `Antik bir haritanın peşinde koşan genç arkeolog Maya, Amazon ormanlarının derinliklerinde inanılmaz bir keşif yapar. Yüzyıllardır kayıp olan bir medeniyetin izlerini takip ederken, modern dünyadan tamamen kopuk yaşayan bir toplulukla karşılaşır.

Bu topluluk, altın şehir El Dorado'nun gerçek koruyucularıdır. Maya'nın keşfi, sadece tarihi değil, insanlığın geleceğini de değiştirecek sırları barındırmaktadır. Ancak bu bilginin dünyaya açıklanması, hem bu kadim medeniyeti hem de modern dünyayı tehlikeye atacaktır.

Maya, bilim insanı olarak gerçeği ortaya çıkarma sorumluluğu ile bu insanların yaşam tarzını koruma arasında zor bir seçim yapmak zorunda kalır. Zamanla, belki de bazı sırların gizli kalmasının daha iyi olduğunu anlar.`,
        author: {
            name: 'Ayşe Yılmaz',
            avatar: '👩‍🔬'
        },
        category: 'Macera',
        createdAt: new Date('2024-11-28'),
        stats: {
            views: 1234,
            comments: 23,
            likes: 156
        }
    },
    {
        id: '2',
        title: 'Zaman Yolcusunun Günlüğü',
        excerpt: 'Fizikçi Dr. Kerem, bir deney sırasında kendini 1920\'lerin İstanbul\'unda bulur. Geri dönüş yolu ise beklenmedik bir aşk hikayesinden geçmektedir...',
        content: `Fizikçi Dr. Kerem, kuantum fiziği üzerine yaptığı bir deney sırasında beklenmedik bir şekilde zaman yolculuğu yapar. Kendini 1920'lerin İstanbul'unda, Cumhuriyet'in ilk yıllarında bulur.

Bu dönemde tanıştığı genç ressam Leyla, onun hayatını tamamen değiştirir. Leyla'nın sanatı ve hayata bakış açısı, Kerem'in modern dünyada kaybettiği şeyleri ona hatırlatır. Ancak Kerem, geri dönmek için bir yol bulmalıdır.

Zamanın akışını değiştirmenin tehlikelerini bilen Kerem, Leyla ile yaşadığı aşkın tarih üzerinde nasıl bir etki yaratacağını hesaplamaya çalışır. Sonunda, sevginin tüm zaman çizgilerinde var olabileceğini keşfeder.`,
        author: {
            name: 'Kerem Öztürk',
            avatar: '👨‍🔬'
        },
        category: 'Bilim Kurgu',
        createdAt: new Date('2024-11-25'),
        stats: {
            views: 2341,
            comments: 45,
            likes: 289
        }
    },
    {
        id: '3',
        title: 'Kahve Dükkanındaki Tesadüf',
        excerpt: 'Her sabah aynı kahve dükkanına giden Elif ve Can, aylar boyunca birbirlerini fark etmeden yan masalarda oturmuşlardır...',
        content: `Her sabah aynı kahve dükkanına giden Elif ve Can, aylar boyunca birbirlerini fark etmeden yan masalarda oturmuşlardır. İkisi de yazardır ve her sabah dizüstü bilgisayarlarının başında saatlerce çalışırlar.

Bir gün, elektrik kesintisi olur ve kahve dükkanındaki herkes dışarı çıkmak zorunda kalır. İlk kez göz göze gelen Elif ve Can, birbirlerinin favori yazarları olduğunu keşfederler. Elif, Can'ın takma adıyla yazdığı romanların hayranıdır; Can ise Elif'in şiirlerini her gün okumaktadır.

Bu tesadüf, ikisinin hayatında yeni bir sayfa açar. Sanat ve aşkın iç içe geçtiği bir yolculuğa birlikte çıkarlar. Belki de en güzel hikayeler, yaşananlardan doğar.`,
        author: {
            name: 'Zeynep Kaya',
            avatar: '👩‍💼'
        },
        category: 'Romantik',
        createdAt: new Date('2024-11-30'),
        stats: {
            views: 3456,
            comments: 67,
            likes: 421
        }
    }
];

export const mockComments: { [storyId: string]: Comment[] } = {
    '1': [
        {
            id: 'c1',
            storyId: '1',
            author: {
                name: 'Mehmet Demir',
                avatar: '👨'
            },
            content: 'Harika bir hikaye! Maya\'nın karşılaştığı ikilem çok gerçekçi. Bilim ve etik arasındaki çatışmayı çok iyi işlemişsiniz.',
            createdAt: new Date('2024-11-29T10:30:00'),
            replies: [
                {
                    id: 'c1-r1',
                    storyId: '1',
                    author: {
                        name: 'Ayşe Yılmaz',
                        avatar: '👩‍🔬'
                    },
                    content: 'Teşekkür ederim! Bu tür etik ikilemleri keşfetmeyi seviyorum.',
                    createdAt: new Date('2024-11-29T14:20:00')
                }
            ]
        },
        {
            id: 'c2',
            storyId: '1',
            author: {
                name: 'Fatma Şahin',
                avatar: '👩'
            },
            content: 'Devamı gelecek mi? Sonun nasıl olacağını çok merak ediyorum!',
            createdAt: new Date('2024-11-30T09:15:00')
        }
    ],
    '2': [
        {
            id: 'c3',
            storyId: '2',
            author: {
                name: 'Ali Yıldız',
                avatar: '👨‍💻'
            },
            content: 'Zaman yolculuğu teması çok iyi işlenmiş. Özellikle 1920\'lerin İstanbul\'u betimlemesi muhteşem!',
            createdAt: new Date('2024-11-26T16:45:00'),
            replies: [
                {
                    id: 'c3-r1',
                    storyId: '2',
                    author: {
                        name: 'Kerem Öztürk',
                        avatar: '👨‍🔬'
                    },
                    content: 'Çok teşekkürler! O dönemi araştırmak gerçekten keyifliydi.',
                    createdAt: new Date('2024-11-26T18:30:00')
                },
                {
                    id: 'c3-r2',
                    storyId: '2',
                    author: {
                        name: 'Selin Arslan',
                        avatar: '👩‍🎨'
                    },
                    content: 'Bence de! Tarihi detaylar çok başarılı.',
                    createdAt: new Date('2024-11-27T11:20:00')
                }
            ]
        }
    ],
    '3': [
        {
            id: 'c4',
            storyId: '3',
            author: {
                name: 'Burak Çelik',
                avatar: '👨‍🎨'
            },
            content: 'Çok romantik ve samimi bir hikaye. Günlük hayattan kesitler içermesi çok hoş.',
            createdAt: new Date('2024-12-01T08:30:00')
        },
        {
            id: 'c5',
            storyId: '3',
            author: {
                name: 'Deniz Aydın',
                avatar: '👩‍💼'
            },
            content: 'Tesadüflerin gücü! Gerçek hayatta da böyle şeyler oluyor mu acaba? 😊',
            createdAt: new Date('2024-12-01T12:15:00'),
            replies: [
                {
                    id: 'c5-r1',
                    storyId: '3',
                    author: {
                        name: 'Zeynep Kaya',
                        avatar: '👩‍💼'
                    },
                    content: 'Aslında bu hikaye gerçek bir olaydan esinlenildi! 😉',
                    createdAt: new Date('2024-12-01T14:00:00')
                }
            ]
        }
    ]
};
