module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/components/StoryCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
function StoryCard({ story }) {
    const formatDate = (date)=>{
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatNumber = (num)=>{
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: `/story/${story.id}`,
        className: "story-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "story-card-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "category-badge",
                        children: story.category
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/StoryCard.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "story-date",
                        children: formatDate(story.createdAt)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/StoryCard.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/StoryCard.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "story-title",
                children: story.title
            }, void 0, false, {
                fileName: "[project]/src/app/components/StoryCard.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "story-excerpt",
                children: story.excerpt
            }, void 0, false, {
                fileName: "[project]/src/app/components/StoryCard.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "story-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "author-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "author-avatar",
                                children: story.author.avatar
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/StoryCard.tsx",
                                lineNumber: 36,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "author-name",
                                children: story.author.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/StoryCard.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/StoryCard.tsx",
                        lineNumber: 35,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "story-stats",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "stat-icon",
                                        children: "👁️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/StoryCard.tsx",
                                        lineNumber: 42,
                                        columnNumber: 25
                                    }, this),
                                    formatNumber(story.stats.views)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/StoryCard.tsx",
                                lineNumber: 41,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "stat-icon",
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/StoryCard.tsx",
                                        lineNumber: 46,
                                        columnNumber: 25
                                    }, this),
                                    formatNumber(story.stats.comments)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/StoryCard.tsx",
                                lineNumber: 45,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "stat",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "stat-icon",
                                        children: "❤️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/StoryCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 25
                                    }, this),
                                    formatNumber(story.stats.likes)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/StoryCard.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/StoryCard.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/StoryCard.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/StoryCard.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/interfaces/mockData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockComments",
    ()=>mockComments,
    "mockStories",
    ()=>mockStories
]);
const mockStories = [
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
const mockComments = {
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
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StoryCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/StoryCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interfaces$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interfaces/mockData.ts [app-rsc] (ecmascript)");
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "home-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "hero-title",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "gradient-text",
                                children: "Fabula"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "hero-subtitle",
                            children: "Hikayelerin buluşma noktası. Oku, yorum yap, paylaş."
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stories-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "✨ Popüler Hikayeler"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Topluluk tarafından en çok okunan ve beğenilen hikayeler"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stories-grid",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interfaces$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockStories"].map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StoryCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                story: story
                            }, story.id, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__70e37451._.js.map