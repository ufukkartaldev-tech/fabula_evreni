(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/likeService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserLikedComments",
    ()=>getUserLikedComments,
    "getUserLikedStories",
    ()=>getUserLikedStories,
    "isCommentLiked",
    ()=>isCommentLiked,
    "isStoryLiked",
    ()=>isStoryLiked,
    "toggleCommentLike",
    ()=>toggleCommentLike,
    "toggleStoryLike",
    ()=>toggleStoryLike
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript) <locals>");
;
;
// Firestore koleksiyon referansları
const likesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'likes');
async function toggleStoryLike(userId, storyId) {
    try {
        const likeId = `${userId}_story_${storyId}`;
        const likeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'likes', likeId);
        const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', storyId);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runTransaction"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], async (transaction)=>{
            const likeDoc = await transaction.get(likeRef);
            const storyDoc = await transaction.get(storyRef);
            if (!storyDoc.exists()) {
                throw new Error('Story does not exist!');
            }
            if (likeDoc.exists()) {
                // Beğeniyi kaldır
                transaction.delete(likeRef);
                transaction.update(storyRef, {
                    'stats.likes': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(-1)
                });
                return false; // Beğeni kaldırıldı
            } else {
                // Beğeni ekle
                transaction.set(likeRef, {
                    userId,
                    targetId: storyId,
                    targetType: 'story',
                    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
                });
                transaction.update(storyRef, {
                    'stats.likes': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(1)
                });
                return true; // Beğenildi
            }
        });
    } catch (error) {
        console.error('Error toggling story like:', error);
        throw error;
    }
}
async function toggleCommentLike(userId, commentId) {
    try {
        const likeId = `${userId}_comment_${commentId}`;
        const likeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'likes', likeId);
        const commentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'comments', commentId);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runTransaction"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], async (transaction)=>{
            const likeDoc = await transaction.get(likeRef);
            const commentDoc = await transaction.get(commentRef);
            if (!commentDoc.exists()) {
                throw new Error('Comment does not exist!');
            }
            if (likeDoc.exists()) {
                // Beğeniyi kaldır
                transaction.delete(likeRef);
                transaction.update(commentRef, {
                    likes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(-1)
                });
                return false;
            } else {
                // Beğeni ekle
                transaction.set(likeRef, {
                    userId,
                    targetId: commentId,
                    targetType: 'comment',
                    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
                });
                transaction.update(commentRef, {
                    likes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(1)
                });
                return true;
            }
        });
    } catch (error) {
        console.error('Error toggling comment like:', error);
        throw error;
    }
}
async function isStoryLiked(userId, storyId) {
    try {
        const likeId = `${userId}_story_${storyId}`;
        const likeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'likes', likeId);
        const likeDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(likeRef);
        return likeDoc.exists();
    } catch (error) {
        console.error('Error checking story like:', error);
        return false;
    }
}
async function isCommentLiked(userId, commentId) {
    try {
        const likeId = `${userId}_comment_${commentId}`;
        const likeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'likes', likeId);
        const likeDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(likeRef);
        return likeDoc.exists();
    } catch (error) {
        console.error('Error checking comment like:', error);
        return false;
    }
}
async function getUserLikedStories(userId) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(likesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('userId', '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('targetType', '==', 'story'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map((doc)=>doc.data().targetId);
    } catch (error) {
        console.error('Error fetching user liked stories:', error);
        return [];
    }
}
async function getUserLikedComments(userId) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(likesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('userId', '==', userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('targetType', '==', 'comment'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map((doc)=>doc.data().targetId);
    } catch (error) {
        console.error('Error fetching user liked comments:', error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/LikeButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LikeButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$likeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/likeService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notificationService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function LikeButton({ targetId, targetType, initialLikeCount, size = 'medium', storyAuthorId, storyTitle }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialLikeCount);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // ... (useEffect aynı kalacak)
    const handleLike = async ()=>{
        if (!user || isLoading) return;
        setIsLoading(true);
        // Optimistic UI update
        const newIsLiked = !isLiked;
        const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
        setIsLiked(newIsLiked);
        setLikeCount(newLikeCount);
        try {
            const result = targetType === 'story' ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$likeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleStoryLike"])(user.uid, targetId) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$likeService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleCommentLike"])(user.uid, targetId);
            // Sunucudan gelen sonuçla güncelle
            setIsLiked(result);
            // Bildirim gönder (Sadece beğeni eklendiyse ve hikaye ise)
            if (result && targetType === 'story' && storyAuthorId && storyTitle && storyAuthorId !== user.uid) {
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNotification"])({
                        userId: storyAuthorId,
                        type: 'like',
                        actorId: user.uid,
                        actorName: user.displayName || 'Kullanıcı',
                        actorAvatar: user.photoURL || '👤',
                        storyId: targetId,
                        storyTitle: storyTitle,
                        message: 'hikayenizi beğendi'
                    });
                } catch (notifError) {
                    console.error('Error creating notification:', notifError);
                }
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            // Hata durumunda geri al
            setIsLiked(!newIsLiked);
            setLikeCount(likeCount);
        } finally{
            setIsLoading(false);
        }
    };
    if (isChecking) {
        return null; // veya skeleton loader
    }
    const sizeClasses = {
        small: 'like-button-small',
        medium: 'like-button-medium',
        large: 'like-button-large'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `like-button ${sizeClasses[size]} ${isLiked ? 'liked' : ''} ${!user ? 'disabled' : ''}`,
        onClick: handleLike,
        disabled: !user || isLoading,
        title: user ? isLiked ? 'Beğeniyi kaldır' : 'Beğen' : 'Beğenmek için giriş yapın',
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "like-icon",
                children: isLiked ? '❤️' : '🤍'
            }, void 0, false, {
                fileName: "[project]/src/app/components/LikeButton.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "like-count",
                children: likeCount
            }, void 0, false, {
                fileName: "[project]/src/app/components/LikeButton.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/LikeButton.tsx",
        lineNumber: 82,
        columnNumber: 10
    }, this);
}
_s(LikeButton, "xIs1zjjjJWVYYdyeveRM4ZSZXfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = LikeButton;
var _c;
__turbopack_context__.k.register(_c, "LikeButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firestore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addComment",
    ()=>addComment,
    "addStory",
    ()=>addStory,
    "deleteStory",
    ()=>deleteStory,
    "getCommentsByStoryId",
    ()=>getCommentsByStoryId,
    "getStories",
    ()=>getStories,
    "getStoriesPaginated",
    ()=>getStoriesPaginated,
    "getStoryById",
    ()=>getStoryById,
    "incrementStoryViews",
    ()=>incrementStoryViews,
    "subscribeToComments",
    ()=>subscribeToComments,
    "subscribeToStories",
    ()=>subscribeToStories,
    "subscribeToStory",
    ()=>subscribeToStory,
    "updateStory",
    ()=>updateStory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript) <locals>");
;
;
// Firestore koleksiyon referansları
const storiesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories');
const commentsCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'comments');
async function getStories() {
    console.warn('⚠️ getStories() is deprecated. Use getStoriesPaginated() for better performance.');
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}
async function getStoryById(id) {
    try {
        const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', id);
        const storyDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(storyRef);
        if (!storyDoc.exists()) {
            return null;
        }
        const data = storyDoc.data();
        return {
            id: storyDoc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date()
        };
    } catch (error) {
        console.error('Error fetching story:', error);
        return null;
    }
}
async function getCommentsByStoryId(storyId) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(commentsCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('storyId', '==', storyId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const comments = querySnapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
        // Nested yorumları organize et
        return organizeComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}
// Yorumları nested yapıya dönüştür
function organizeComments(comments) {
    const commentMap = new Map();
    const rootComments = [];
    // Tüm yorumları map'e ekle
    comments.forEach((comment)=>{
        commentMap.set(comment.id, {
            ...comment,
            replies: []
        });
    });
    // Nested yapıyı oluştur
    comments.forEach((comment)=>{
        const commentWithReplies = commentMap.get(comment.id);
        if (commentWithReplies) {
            // Eğer parent yoksa root comment
            rootComments.push(commentWithReplies);
        }
    });
    return rootComments;
}
async function addComment(comment) {
    try {
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(commentsCollection, {
            ...comment,
            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}
async function addStory(story) {
    try {
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(storiesCollection, {
            ...story,
            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding story:', error);
        throw error;
    }
}
async function incrementStoryViews(storyId) {
    try {
        const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', storyId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runTransaction"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], async (transaction)=>{
            const storyDoc = await transaction.get(storyRef);
            if (!storyDoc.exists()) {
                throw new Error('Story does not exist!');
            }
            // stats.views değerini 1 artır
            transaction.update(storyRef, {
                'stats.views': (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["increment"])(1)
            });
        });
    } catch (error) {
        console.error('Error incrementing story views:', error);
    // View count artırma hatası uygulamayı durdurmamalı
    // Sadece log'la ve devam et
    }
}
async function updateStory(storyId, updates) {
    try {
        const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', storyId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(storyRef, {
            ...updates,
            updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
        });
    } catch (error) {
        console.error('Error updating story:', error);
        throw error;
    }
}
async function deleteStory(storyId) {
    try {
        const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', storyId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(storyRef);
    } catch (error) {
        console.error('Error deleting story:', error);
        throw error;
    }
}
function subscribeToStories(callback, limitCount) {
    const q = limitCount ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
        const stories = snapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
        callback(stories);
    }, (error)=>{
        console.error('Error in stories subscription:', error);
    });
}
function subscribeToStory(storyId, callback) {
    const storyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories', storyId);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(storyRef, (doc)=>{
        if (doc.exists()) {
            const data = doc.data();
            callback({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            });
        } else {
            callback(null);
        }
    }, (error)=>{
        console.error('Error in story subscription:', error);
    });
}
function subscribeToComments(storyId, callback) {
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(commentsCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('storyId', '==', storyId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (snapshot)=>{
        const comments = snapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
        callback(organizeComments(comments));
    }, (error)=>{
        console.error('Error in comments subscription:', error);
    });
}
async function getStoriesPaginated(limitCount = 12, lastDoc) {
    try {
        let q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        if (lastDoc) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startAfter"])(lastDoc), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        }
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const stories = querySnapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
        const newLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
        return {
            stories,
            lastDoc: newLastDoc
        };
    } catch (error) {
        console.error('Error fetching paginated stories:', error);
        return {
            stories: [],
            lastDoc: null
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/favoriteService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserFavoriteIds",
    ()=>getUserFavoriteIds,
    "getUserFavorites",
    ()=>getUserFavorites,
    "isFavorited",
    ()=>isFavorited,
    "toggleFavorite",
    ()=>toggleFavorite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firestore.ts [app-client] (ecmascript)");
;
;
;
// Firestore koleksiyon referansları
const favoritesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'favorites');
async function toggleFavorite(userId, storyId) {
    try {
        const favoriteId = `${userId}_${storyId}`;
        const favoriteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'favorites', favoriteId);
        const favoriteDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(favoriteRef);
        if (favoriteDoc.exists()) {
            // Favorilerden çıkar
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(favoriteRef);
            return false; // Favorilerden kaldırıldı
        } else {
            // Favorilere ekle
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(favoriteRef, {
                userId,
                storyId,
                createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now()
            });
            return true; // Favorilere eklendi
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
}
async function isFavorited(userId, storyId) {
    try {
        const favoriteId = `${userId}_${storyId}`;
        const favoriteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'favorites', favoriteId);
        const favoriteDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(favoriteRef);
        return favoriteDoc.exists();
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
}
async function getUserFavorites(userId) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(favoritesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('userId', '==', userId));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const favoriteStoryIds = querySnapshot.docs.map((doc)=>doc.data().storyId);
        if (favoriteStoryIds.length === 0) {
            return [];
        }
        // Tüm hikayeleri getir ve favorileri filtrele
        const allStories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStories"])();
        const favoriteStories = allStories.filter((story)=>favoriteStoryIds.includes(story.id));
        // Favorilere eklenme tarihine göre sırala (en yeni önce)
        const favoritesMap = new Map(querySnapshot.docs.map((doc)=>[
                doc.data().storyId,
                doc.data().createdAt?.toDate() || new Date()
            ]));
        return favoriteStories.sort((a, b)=>{
            const dateA = favoritesMap.get(a.id) || new Date(0);
            const dateB = favoritesMap.get(b.id) || new Date(0);
            return dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        return [];
    }
}
async function getUserFavoriteIds(userId) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(favoritesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('userId', '==', userId));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        return querySnapshot.docs.map((doc)=>doc.data().storyId);
    } catch (error) {
        console.error('Error fetching user favorite IDs:', error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/FavoriteButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FavoriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favoriteService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FavoriteButton({ storyId, size = 'medium' }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isChecking, setIsChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Kullanıcının favorilediğini kontrol et
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FavoriteButton.useEffect": ()=>{
            if (!user) {
                setIsChecking(false);
                return;
            }
            async function checkFavoriteStatus() {
                if (!user) return; // Additional null check
                try {
                    const favorited = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFavorited"])(user.uid, storyId);
                    setIsFavorite(favorited);
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                } finally{
                    setIsChecking(false);
                }
            }
            checkFavoriteStatus();
        }
    }["FavoriteButton.useEffect"], [
        user,
        storyId
    ]);
    const handleFavorite = async (e)=>{
        e.stopPropagation(); // Parent click'i engelle
        if (!user || isLoading) return;
        setIsLoading(true);
        // Optimistic UI update
        const newIsFavorite = !isFavorite;
        setIsFavorite(newIsFavorite);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favoriteService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleFavorite"])(user.uid, storyId);
            setIsFavorite(result);
        } catch (error_0) {
            console.error('Error toggling favorite:', error_0);
            // Hata durumunda geri al
            setIsFavorite(!newIsFavorite);
        } finally{
            setIsLoading(false);
        }
    };
    if (isChecking) {
        return null;
    }
    const sizeClasses = {
        small: 'favorite-button-small',
        medium: 'favorite-button-medium',
        large: 'favorite-button-large'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `favorite-button ${sizeClasses[size]} ${isFavorite ? 'favorited' : ''} ${!user ? 'disabled' : ''}`,
        onClick: handleFavorite,
        disabled: !user || isLoading,
        title: user ? isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle' : 'Favori eklemek için giriş yapın',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "favorite-icon",
            children: isFavorite ? '⭐' : '☆'
        }, void 0, false, {
            fileName: "[project]/src/app/components/FavoriteButton.tsx",
            lineNumber: 70,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/FavoriteButton.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
_s(FavoriteButton, "xEhU4wbpFGinuotGNoIB3ZoCqJ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = FavoriteButton;
var _c;
__turbopack_context__.k.register(_c, "FavoriteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/readingTime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Reading Time Calculator Utility
 * Hikaye okuma süresini hesaplar
 */ __turbopack_context__.s([
    "calculateReadingTime",
    ()=>calculateReadingTime,
    "formatReadingTime",
    ()=>formatReadingTime,
    "formatReadingTimeWithEmoji",
    ()=>formatReadingTimeWithEmoji,
    "formatWordCount",
    ()=>formatWordCount
]);
const WORDS_PER_MINUTE = 200; // Ortalama okuma hızı
/**
 * Metindeki kelime sayısını hesapla
 */ function countWords(text) {
    return text.trim().split(/\s+/).filter((word)=>word.length > 0).length;
}
function calculateReadingTime(text) {
    const wordCount = countWords(text);
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return Math.max(1, minutes); // Minimum 1 dakika
}
function formatReadingTime(text) {
    const minutes = calculateReadingTime(text);
    if (minutes === 1) {
        return '1 dakikalık okuma';
    }
    return `${minutes} dakikalık okuma`;
}
function formatReadingTimeWithEmoji(text) {
    const minutes = calculateReadingTime(text);
    if (minutes <= 3) {
        return `⚡ ${minutes} dk`;
    } else if (minutes <= 10) {
        return `📖 ${minutes} dk`;
    } else {
        return `📚 ${minutes} dk`;
    }
}
function formatWordCount(text) {
    const wordCount = countWords(text);
    if (wordCount < 1000) {
        return `${wordCount} kelime`;
    }
    const thousands = (wordCount / 1000).toFixed(1);
    return `${thousands}K kelime`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/StoryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LikeButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/LikeButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/FavoriteButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$readingTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/readingTime.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function StoryCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(62);
    if ($[0] !== "132cea619cbb3e1373899c02d23aa12c571335cd204b429041bf75ca34c68e65") {
        for(let $i = 0; $i < 62; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "132cea619cbb3e1373899c02d23aa12c571335cd204b429041bf75ca34c68e65";
    }
    const { story } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t1;
    if ($[1] !== story.content) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$readingTime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatReadingTimeWithEmoji"])(story.content);
        $[1] = story.content;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const readingTime = t1;
    const formatDate = _StoryCardFormatDate;
    const formatNumber = _StoryCardFormatNumber;
    let t2;
    if ($[3] !== router || $[4] !== story.id) {
        t2 = ({
            "StoryCard[handleCardClick]": (e)=>{
                if (e.target.closest(".like-button")) {
                    return;
                }
                router.push(`/story/${story.id}`);
            }
        })["StoryCard[handleCardClick]"];
        $[3] = router;
        $[4] = story.id;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const handleCardClick = t2;
    let t3;
    if ($[6] !== story.category) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "category-badge",
            children: story.category
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[6] = story.category;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== readingTime) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "reading-time-badge",
            children: readingTime
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[8] = readingTime;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== story.id) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            storyId: story.id,
            size: "small"
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[10] = story.id;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== story.createdAt) {
        t6 = formatDate(story.createdAt);
        $[12] = story.createdAt;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "story-date",
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        $[14] = t6;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] !== t4 || $[17] !== t5 || $[18] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "header-actions",
            children: [
                t4,
                t5,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[16] = t4;
        $[17] = t5;
        $[18] = t7;
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] !== t3 || $[21] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "story-card-header",
            children: [
                t3,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[20] = t3;
        $[21] = t8;
        $[22] = t9;
    } else {
        t9 = $[22];
    }
    let t10;
    if ($[23] !== story.title) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "story-title",
            children: story.title
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 114,
            columnNumber: 11
        }, this);
        $[23] = story.title;
        $[24] = t10;
    } else {
        t10 = $[24];
    }
    let t11;
    if ($[25] !== story.excerpt) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "story-excerpt",
            children: story.excerpt
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, this);
        $[25] = story.excerpt;
        $[26] = t11;
    } else {
        t11 = $[26];
    }
    let t12;
    if ($[27] !== story.author.avatar) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "author-avatar",
            children: story.author.avatar
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[27] = story.author.avatar;
        $[28] = t12;
    } else {
        t12 = $[28];
    }
    let t13;
    if ($[29] !== story.author.name) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "author-name",
            children: story.author.name
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        $[29] = story.author.name;
        $[30] = t13;
    } else {
        t13 = $[30];
    }
    let t14;
    if ($[31] !== t12 || $[32] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "author-info",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[31] = t12;
        $[32] = t13;
        $[33] = t14;
    } else {
        t14 = $[33];
    }
    let t15;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "stat-icon",
            children: "👁️"
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 155,
            columnNumber: 11
        }, this);
        $[34] = t15;
    } else {
        t15 = $[34];
    }
    let t16;
    if ($[35] !== story.stats.views) {
        t16 = formatNumber(story.stats.views);
        $[35] = story.stats.views;
        $[36] = t16;
    } else {
        t16 = $[36];
    }
    let t17;
    if ($[37] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "stat",
            children: [
                t15,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[37] = t16;
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    let t18;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "stat-icon",
            children: "💬"
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 178,
            columnNumber: 11
        }, this);
        $[39] = t18;
    } else {
        t18 = $[39];
    }
    let t19;
    if ($[40] !== story.stats.comments) {
        t19 = formatNumber(story.stats.comments);
        $[40] = story.stats.comments;
        $[41] = t19;
    } else {
        t19 = $[41];
    }
    let t20;
    if ($[42] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "stat",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 193,
            columnNumber: 11
        }, this);
        $[42] = t19;
        $[43] = t20;
    } else {
        t20 = $[43];
    }
    let t21;
    if ($[44] !== story.authorId || $[45] !== story.id || $[46] !== story.stats.likes || $[47] !== story.title) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LikeButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            targetId: story.id,
            targetType: "story",
            initialLikeCount: story.stats.likes,
            size: "small",
            storyAuthorId: story.authorId,
            storyTitle: story.title
        }, void 0, false, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 201,
            columnNumber: 11
        }, this);
        $[44] = story.authorId;
        $[45] = story.id;
        $[46] = story.stats.likes;
        $[47] = story.title;
        $[48] = t21;
    } else {
        t21 = $[48];
    }
    let t22;
    if ($[49] !== t17 || $[50] !== t20 || $[51] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "story-stats",
            children: [
                t17,
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[49] = t17;
        $[50] = t20;
        $[51] = t21;
        $[52] = t22;
    } else {
        t22 = $[52];
    }
    let t23;
    if ($[53] !== t14 || $[54] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "story-footer",
            children: [
                t14,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[53] = t14;
        $[54] = t22;
        $[55] = t23;
    } else {
        t23 = $[55];
    }
    let t24;
    if ($[56] !== handleCardClick || $[57] !== t10 || $[58] !== t11 || $[59] !== t23 || $[60] !== t9) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "story-card",
            onClick: handleCardClick,
            children: [
                t9,
                t10,
                t11,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/StoryCard.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[56] = handleCardClick;
        $[57] = t10;
        $[58] = t11;
        $[59] = t23;
        $[60] = t9;
        $[61] = t24;
    } else {
        t24 = $[61];
    }
    return t24;
}
_s(StoryCard, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = StoryCard;
function _StoryCardFormatNumber(num) {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
}
function _StoryCardFormatDate(date) {
    return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
var _c;
__turbopack_context__.k.register(_c, "StoryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/debounce.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDebounce",
    ()=>createDebounce,
    "debounceAutoSave",
    ()=>debounceAutoSave,
    "debounceFilter",
    ()=>debounceFilter,
    "debounceScroll",
    ()=>debounceScroll,
    "debounceSearch",
    ()=>debounceSearch,
    "throttle",
    ()=>throttle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lodash.debounce/index.js [app-client] (ecmascript)");
;
const debounceSearch = (func, wait = 300)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait);
};
const debounceFilter = (func, wait = 400)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait);
};
const debounceAutoSave = (func, wait = 2000)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait);
};
const debounceScroll = (func, wait = 150)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait);
};
const createDebounce = (func, wait)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait);
};
const throttle = (func, wait)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lodash$2e$debounce$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(func, wait, {
        leading: true,
        trailing: false
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/SearchBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/debounce.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SearchBar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "349c2471e9bab0b214afac706ee09b3b2adc00835607cbb70d6ff0375693cb2e") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "349c2471e9bab0b214afac706ee09b3b2adc00835607cbb70d6ff0375693cb2e";
    }
    const { onSearch, placeholder: t1 } = t0;
    const placeholder = t1 === undefined ? "Hikaye ara..." : t1;
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t2;
    if ($[1] !== onSearch) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounceSearch"])({
            "SearchBar[debounceSearch()]": (searchQuery)=>{
                onSearch(searchQuery);
            }
        }["SearchBar[debounceSearch()]"], 300);
        $[1] = onSearch;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const debouncedSearchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t2);
    let t3;
    let t4;
    if ($[3] !== query) {
        t3 = ({
            "SearchBar[useEffect()]": ()=>{
                debouncedSearchRef.current(query);
            }
        })["SearchBar[useEffect()]"];
        t4 = [
            query
        ];
        $[3] = query;
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "SearchBar[handleClear]": ()=>{
                setQuery("");
            }
        })["SearchBar[handleClear]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const handleClear = t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "search-icon",
            children: "🔍"
        }, void 0, false, {
            fileName: "[project]/src/app/components/SearchBar.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "SearchBar[<input>.onChange]": (e)=>setQuery(e.target.value)
        })["SearchBar[<input>.onChange]"];
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] !== placeholder || $[10] !== query) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            className: "search-input",
            placeholder: placeholder,
            value: query,
            onChange: t7
        }, void 0, false, {
            fileName: "[project]/src/app/components/SearchBar.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[9] = placeholder;
        $[10] = query;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== query) {
        t9 = query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "search-clear",
            onClick: handleClear,
            title: "Temizle",
            children: "✕"
        }, void 0, false, {
            fileName: "[project]/src/app/components/SearchBar.tsx",
            lineNumber: 93,
            columnNumber: 19
        }, this);
        $[12] = query;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t8 || $[15] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "search-bar",
            children: [
                t6,
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/SearchBar.tsx",
            lineNumber: 101,
            columnNumber: 11
        }, this);
        $[14] = t8;
        $[15] = t9;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    return t10;
}
_s(SearchBar, "lrkMiTQ+uK2lFaVZbicN+V/Ev50=");
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/FilterPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FilterPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/debounce.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FilterPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(39);
    if ($[0] !== "7865c191563f66e8f227f357f990b93724a168212b34c0cffd03c7c61ae0423b") {
        for(let $i = 0; $i < 39; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7865c191563f66e8f227f357f990b93724a168212b34c0cffd03c7c61ae0423b";
    }
    const { categories, authors, selectedCategory, selectedAuthor, selectedSort, onCategoryChange, onAuthorChange, onSortChange, onClearFilters } = t0;
    const hasActiveFilters = selectedCategory || selectedAuthor || selectedSort !== "newest";
    let t1;
    if ($[1] !== onCategoryChange) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounceFilter"])({
            "FilterPanel[debounceFilter()]": (category)=>{
                onCategoryChange(category);
            }
        }["FilterPanel[debounceFilter()]"], 400);
        $[1] = onCategoryChange;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const debouncedCategoryChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t1);
    let t2;
    if ($[3] !== onAuthorChange) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounceFilter"])({
            "FilterPanel[debounceFilter()]": (authorId)=>{
                onAuthorChange(authorId);
            }
        }["FilterPanel[debounceFilter()]"], 400);
        $[3] = onAuthorChange;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const debouncedAuthorChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t2);
    let t3;
    if ($[5] !== onSortChange) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$debounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounceFilter"])({
            "FilterPanel[debounceFilter()]": (sort)=>{
                onSortChange(sort);
            }
        }["FilterPanel[debounceFilter()]"], 400);
        $[5] = onSortChange;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const debouncedSortChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t3);
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "filter-label",
            children: "Kategori"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const t5 = selectedCategory || "";
    let t6;
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "FilterPanel[<select>.onChange]": (e)=>debouncedCategoryChange.current(e.target.value)
        })["FilterPanel[<select>.onChange]"];
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "Tüm Kategoriler"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[8] = t6;
        $[9] = t7;
    } else {
        t6 = $[8];
        t7 = $[9];
    }
    let t8;
    if ($[10] !== categories) {
        t8 = categories.map(_FilterPanelCategoriesMap);
        $[10] = categories;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== t5 || $[13] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "filter-group",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "filter-select",
                    value: t5,
                    onChange: t6,
                    children: [
                        t7,
                        t8
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/FilterPanel.tsx",
                    lineNumber: 111,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 111,
            columnNumber: 10
        }, this);
        $[12] = t5;
        $[13] = t8;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "filter-label",
            children: "Yazar"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, this);
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    const t11 = selectedAuthor || "";
    let t12;
    let t13;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "FilterPanel[<select>.onChange]": (e_0)=>debouncedAuthorChange.current(e_0.target.value)
        })["FilterPanel[<select>.onChange]"];
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "Tüm Yazarlar"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 132,
            columnNumber: 11
        }, this);
        $[16] = t12;
        $[17] = t13;
    } else {
        t12 = $[16];
        t13 = $[17];
    }
    let t14;
    if ($[18] !== authors) {
        t14 = authors.map(_FilterPanelAuthorsMap);
        $[18] = authors;
        $[19] = t14;
    } else {
        t14 = $[19];
    }
    let t15;
    if ($[20] !== t11 || $[21] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "filter-group",
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "filter-select",
                    value: t11,
                    onChange: t12,
                    children: [
                        t13,
                        t14
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/FilterPanel.tsx",
                    lineNumber: 149,
                    columnNumber: 46
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t14;
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "filter-label",
            children: "Sıralama"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    let t17;
    let t18;
    let t19;
    let t20;
    let t21;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "FilterPanel[<select>.onChange]": (e_1)=>debouncedSortChange.current(e_1.target.value)
        })["FilterPanel[<select>.onChange]"];
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "newest",
            children: "En Yeni"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "popular",
            children: "En Popüler"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "mostLiked",
            children: "En Çok Beğenilen"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 174,
            columnNumber: 11
        }, this);
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "mostViewed",
            children: "En Çok Görüntülenen"
        }, void 0, false, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[24] = t17;
        $[25] = t18;
        $[26] = t19;
        $[27] = t20;
        $[28] = t21;
    } else {
        t17 = $[24];
        t18 = $[25];
        t19 = $[26];
        t20 = $[27];
        t21 = $[28];
    }
    let t22;
    if ($[29] !== selectedSort) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "filter-group",
            children: [
                t16,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    className: "filter-select",
                    value: selectedSort,
                    onChange: t17,
                    children: [
                        t18,
                        t19,
                        t20,
                        t21
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/FilterPanel.tsx",
                    lineNumber: 190,
                    columnNumber: 46
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 190,
            columnNumber: 11
        }, this);
        $[29] = selectedSort;
        $[30] = t22;
    } else {
        t22 = $[30];
    }
    let t23;
    if ($[31] !== hasActiveFilters || $[32] !== onClearFilters) {
        t23 = hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "clear-filters-button",
            onClick: onClearFilters,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "🔄"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/FilterPanel.tsx",
                    lineNumber: 198,
                    columnNumber: 97
                }, this),
                "Filtreleri Temizle"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 198,
            columnNumber: 31
        }, this);
        $[31] = hasActiveFilters;
        $[32] = onClearFilters;
        $[33] = t23;
    } else {
        t23 = $[33];
    }
    let t24;
    if ($[34] !== t15 || $[35] !== t22 || $[36] !== t23 || $[37] !== t9) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "filter-panel",
            children: [
                t9,
                t15,
                t22,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/FilterPanel.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[34] = t15;
        $[35] = t22;
        $[36] = t23;
        $[37] = t9;
        $[38] = t24;
    } else {
        t24 = $[38];
    }
    return t24;
}
_s(FilterPanel, "lt9ur2sqh3SaaZ3CZaeMB3ofecQ=");
_c = FilterPanel;
function _FilterPanelAuthorsMap(author) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: author.id,
        children: author.name
    }, author.id, false, {
        fileName: "[project]/src/app/components/FilterPanel.tsx",
        lineNumber: 219,
        columnNumber: 10
    }, this);
}
function _FilterPanelCategoriesMap(category_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
        value: category_0,
        children: category_0
    }, category_0, false, {
        fileName: "[project]/src/app/components/FilterPanel.tsx",
        lineNumber: 222,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "FilterPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/SkeletonLoader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentSkeleton",
    ()=>CommentSkeleton,
    "StoryCardSkeleton",
    ()=>StoryCardSkeleton,
    "StoryGridSkeleton",
    ()=>StoryGridSkeleton,
    "default",
    ()=>SkeletonLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Skeleton Loader Component
 * Loading state'leri için profesyonel görünüm
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
'use client';
;
;
function SkeletonLoader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893";
    }
    const { type: t1, width, height, count: t2, className: t3 } = t0;
    const type = t1 === undefined ? "text" : t1;
    const count = t2 === undefined ? 1 : t2;
    const className = t3 === undefined ? "" : t3;
    let t4;
    if ($[1] !== type) {
        t4 = ({
            "SkeletonLoader[getSkeletonClass]": ()=>{
                switch(type){
                    case "title":
                        {
                            return "skeleton skeleton-title";
                        }
                    case "card":
                        {
                            return "skeleton skeleton-card";
                        }
                    case "avatar":
                        {
                            return "skeleton skeleton-avatar";
                        }
                    case "image":
                        {
                            return "skeleton skeleton-image";
                        }
                    default:
                        {
                            return "skeleton skeleton-text";
                        }
                }
            }
        })["SkeletonLoader[getSkeletonClass]"];
        $[1] = type;
        $[2] = t4;
    } else {
        t4 = $[2];
    }
    const getSkeletonClass = t4;
    const t5 = width || undefined;
    const t6 = height || undefined;
    let t7;
    if ($[3] !== t5 || $[4] !== t6) {
        t7 = {
            width: t5,
            height: t6
        };
        $[3] = t5;
        $[4] = t6;
        $[5] = t7;
    } else {
        t7 = $[5];
    }
    const style = t7;
    if (count > 1) {
        const t8 = `skeleton-group ${className}`;
        let t9;
        if ($[6] !== count) {
            t9 = Array.from({
                length: count
            });
            $[6] = count;
            $[7] = t9;
        } else {
            t9 = $[7];
        }
        let t10;
        if ($[8] !== getSkeletonClass || $[9] !== style || $[10] !== t9) {
            t10 = t9.map({
                "SkeletonLoader[(anonymous)()]": (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: getSkeletonClass(),
                        style: style
                    }, index, false, {
                        fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                        lineNumber: 97,
                        columnNumber: 56
                    }, this)
            }["SkeletonLoader[(anonymous)()]"]);
            $[8] = getSkeletonClass;
            $[9] = style;
            $[10] = t9;
            $[11] = t10;
        } else {
            t10 = $[11];
        }
        let t11;
        if ($[12] !== t10 || $[13] !== t8) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t8,
                children: t10
            }, void 0, false, {
                fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                lineNumber: 108,
                columnNumber: 13
            }, this);
            $[12] = t10;
            $[13] = t8;
            $[14] = t11;
        } else {
            t11 = $[14];
        }
        return t11;
    }
    const t8 = `${getSkeletonClass()} ${className}`;
    let t9;
    if ($[15] !== style || $[16] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t8,
            style: style
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[15] = style;
        $[16] = t8;
        $[17] = t9;
    } else {
        t9 = $[17];
    }
    return t9;
}
_c = SkeletonLoader;
function StoryCardSkeleton() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
            type: "image",
            height: "200px"
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 143,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
            type: "title",
            width: "80%"
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 151,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
            type: "text",
            count: 3
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 152,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "story-card skeleton-card-wrapper",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "story-card-content",
                    children: [
                        t1,
                        t2,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "story-card-footer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
                                    type: "avatar",
                                    width: "32px",
                                    height: "32px"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                                    lineNumber: 161,
                                    columnNumber: 143
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
                                    type: "text",
                                    width: "100px"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                                    lineNumber: 161,
                                    columnNumber: 202
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                            lineNumber: 161,
                            columnNumber: 108
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                    lineNumber: 161,
                    columnNumber: 64
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 161,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c1 = StoryCardSkeleton;
function StoryGridSkeleton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893";
    }
    const { count: t1 } = t0;
    const count = t1 === undefined ? 6 : t1;
    let t2;
    if ($[1] !== count) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "stories-grid",
            children: Array.from({
                length: count
            }).map(_StoryGridSkeletonAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 186,
            columnNumber: 10
        }, this);
        $[1] = count;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    return t2;
}
_c2 = StoryGridSkeleton;
/**
 * Comment Skeleton
 */ function _StoryGridSkeletonAnonymous(_, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryCardSkeleton, {}, index, false, {
        fileName: "[project]/src/app/components/SkeletonLoader.tsx",
        lineNumber: 201,
        columnNumber: 10
    }, this);
}
function CommentSkeleton() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f660356254f6982c215dd0bb778e72f15d425af57f6bbaf183e2873a7900b893";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
            type: "avatar",
            width: "40px",
            height: "40px"
        }, void 0, false, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 213,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "comment-skeleton",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "comment-skeleton-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
                            type: "text",
                            width: "120px"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                            lineNumber: 220,
                            columnNumber: 90
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonLoader, {
                            type: "text",
                            count: 2
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                            lineNumber: 220,
                            columnNumber: 134
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/SkeletonLoader.tsx",
                    lineNumber: 220,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/SkeletonLoader.tsx",
            lineNumber: 220,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c3 = CommentSkeleton;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SkeletonLoader");
__turbopack_context__.k.register(_c1, "StoryCardSkeleton");
__turbopack_context__.k.register(_c2, "StoryGridSkeleton");
__turbopack_context__.k.register(_c3, "CommentSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/searchService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllAuthors",
    ()=>getAllAuthors,
    "getAllCategories",
    ()=>getAllCategories,
    "searchStories",
    ()=>searchStories,
    "sortStories",
    ()=>sortStories
]);
function searchStories(stories, filters) {
    let filtered = [
        ...stories
    ];
    // Metin araması (başlık ve içerikte)
    if (filters.query && filters.query.trim()) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter((story)=>story.title.toLowerCase().includes(query) || story.content.toLowerCase().includes(query) || story.excerpt.toLowerCase().includes(query));
    }
    // Kategori filtresi
    if (filters.category) {
        filtered = filtered.filter((story)=>story.category === filters.category);
    }
    // Yazar filtresi
    if (filters.authorId) {
        filtered = filtered.filter((story)=>story.authorId === filters.authorId);
    }
    // Tarih aralığı filtresi
    if (filters.startDate) {
        filtered = filtered.filter((story)=>story.createdAt >= filters.startDate);
    }
    if (filters.endDate) {
        filtered = filtered.filter((story)=>story.createdAt <= filters.endDate);
    }
    // Sıralama
    if (filters.sortBy) {
        filtered = sortStories(filtered, filters.sortBy);
    }
    return filtered;
}
function sortStories(stories, sortBy) {
    const sorted = [
        ...stories
    ];
    switch(sortBy){
        case 'newest':
            return sorted.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
        case 'popular':
            // Popülerlik = görüntülenme + yorum + beğeni kombinasyonu
            return sorted.sort((a, b)=>{
                const scoreA = a.stats.views + a.stats.comments * 10 + a.stats.likes * 5;
                const scoreB = b.stats.views + b.stats.comments * 10 + b.stats.likes * 5;
                return scoreB - scoreA;
            });
        case 'mostLiked':
            return sorted.sort((a, b)=>b.stats.likes - a.stats.likes);
        case 'mostViewed':
            return sorted.sort((a, b)=>b.stats.views - a.stats.views);
        default:
            return sorted;
    }
}
function getAllCategories(stories) {
    const categories = new Set(stories.map((story)=>story.category));
    return Array.from(categories).sort();
}
function getAllAuthors(stories) {
    const authorsMap = new Map();
    stories.forEach((story)=>{
        if (story.authorId && !authorsMap.has(story.authorId)) {
            authorsMap.set(story.authorId, story.author.name);
        }
    });
    return Array.from(authorsMap.entries()).map(([id, name])=>({
            id,
            name
        })).sort((a, b)=>a.name.localeCompare(b.name));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/StoryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/SearchBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FilterPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/FilterPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SkeletonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/SkeletonLoader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firestore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/searchService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const STORIES_PER_PAGE = 12; // Sayfa başına hikaye sayısı
function Home() {
    _s();
    const [allStories, setAllStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredStories, setFilteredStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topStories, setTopStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadingMore, setLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastDocRef, setLastDocRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Store lastDoc reference
    // Filter state
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedAuthor, setSelectedAuthor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedSort, setSelectedSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('newest');
    // Categories and authors for filters
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [authors, setAuthors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // İlk yükleme - Paginated query kullan (OPTIMIZE EDİLDİ)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function fetchInitialStories() {
                try {
                    const { stories, lastDoc } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoriesPaginated"])(STORIES_PER_PAGE);
                    setAllStories(stories);
                    setFilteredStories(stories);
                    setHasMore(lastDoc !== null);
                    setLastDocRef(lastDoc);
                    // Extract categories and authors
                    setCategories((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])(stories));
                    setAuthors((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllAuthors"])(stories));
                } catch (error) {
                    console.error('Error loading stories:', error);
                } finally{
                    setLoading(false);
                }
            }
            fetchInitialStories();
            fetchInitialStories();
        }
    }["Home.useEffect"], []);
    // Fetch Top Stories (Cached)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            async function fetchTopStories() {
                try {
                    const response = await fetch('/api/get-top-stories');
                    const data = await response.json();
                    if (data.success) {
                        // Convert ISO strings back to Date objects if needed, 
                        // but for display purposes strings might be fine or need parsing
                        const storiesWithDates = data.stories.map({
                            "Home.useEffect.fetchTopStories.storiesWithDates": (s)=>({
                                    ...s,
                                    createdAt: new Date(s.createdAt)
                                })
                        }["Home.useEffect.fetchTopStories.storiesWithDates"]);
                        setTopStories(storiesWithDates);
                    }
                } catch (error_0) {
                    console.error('Error fetching top stories:', error_0);
                }
            }
            fetchTopStories();
        }
    }["Home.useEffect"], []);
    // Daha fazla hikaye yükle
    const loadMoreStories = async ()=>{
        if (loadingMore || !hasMore || !lastDocRef) return;
        setLoadingMore(true);
        try {
            const { stories: newStories, lastDoc: lastDoc_0 } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firestore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoriesPaginated"])(STORIES_PER_PAGE, lastDocRef);
            const updatedStories = [
                ...allStories,
                ...newStories
            ];
            setAllStories(updatedStories);
            setHasMore(lastDoc_0 !== null);
            setLastDocRef(lastDoc_0);
            // Update categories and authors
            setCategories((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllCategories"])(updatedStories));
            setAuthors((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllAuthors"])(updatedStories));
            // Filtreleri yeniden uygula
            const filters = {
                query: searchQuery,
                category: selectedCategory || undefined,
                authorId: selectedAuthor || undefined,
                sortBy: selectedSort
            };
            const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchStories"])(updatedStories, filters);
            setFilteredStories(filtered);
        } catch (error_1) {
            console.error('Error loading more stories:', error_1);
        } finally{
            setLoadingMore(false);
        }
    };
    // Apply filters whenever any filter changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const filters_0 = {
                query: searchQuery,
                category: selectedCategory || undefined,
                authorId: selectedAuthor || undefined,
                sortBy: selectedSort
            };
            const filtered_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchStories"])(allStories, filters_0);
            setFilteredStories(filtered_0);
        }
    }["Home.useEffect"], [
        searchQuery,
        selectedCategory,
        selectedAuthor,
        selectedSort,
        allStories
    ]);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleSearch]": (query)=>{
            setSearchQuery(query);
        }
    }["Home.useCallback[handleSearch]"], []);
    const handleClearFilters = ()=>{
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedAuthor('');
        setSelectedSort('newest');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "home-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "hero-title",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "gradient-text",
                                children: "Fabula"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "hero-subtitle",
                            children: "Hikayelerin buluşma noktası. Oku, yorum yap, paylaş."
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "search-filter-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SearchBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onSearch: handleSearch
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$FilterPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                categories: categories,
                                authors: authors,
                                selectedCategory: selectedCategory,
                                selectedAuthor: selectedAuthor,
                                selectedSort: selectedSort,
                                onCategoryChange: setSelectedCategory,
                                onAuthorChange: setSelectedAuthor,
                                onSortChange: setSelectedSort,
                                onClearFilters: handleClearFilters
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    !searchQuery && !selectedCategory && !selectedAuthor && topStories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "top-stories-section mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section-header flex items-center gap-2 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: "🏆"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold",
                                        children: "Haftanın En İyileri"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "top-stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                                children: topStories.slice(0, 3).map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        story: story
                                    }, story.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 52
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 156,
                        columnNumber: 91
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stories-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: searchQuery ? `"${searchQuery}" için sonuçlar` : '✨ Hikayeler'
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    filteredStories.length,
                                    " hikaye bulundu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SkeletonLoader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoryGridSkeleton"], {
                        count: 12
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 175,
                        columnNumber: 20
                    }, this) : filteredStories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "empty-icon",
                                children: "🔍"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Aradığınız kriterlere uygun hikaye bulunamadı."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            (searchQuery || selectedCategory || selectedAuthor) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "browse-button",
                                onClick: handleClearFilters,
                                children: "Tüm Hikayeleri Göster"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 178,
                                columnNumber: 69
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 175,
                        columnNumber: 86
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "stories-grid",
                                children: filteredStories.map((story_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        story: story_0
                                    }, story_0.id, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 47
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            hasMore && !searchQuery && !selectedCategory && !selectedAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "load-more-section",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "load-more-button",
                                    onClick: loadMoreStories,
                                    disabled: loadingMore,
                                    children: loadingMore ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "spinner-small"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 23
                                            }, this),
                                            "Yükleniyor..."
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "📚"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 23
                                            }, this),
                                            "Daha Fazla Hikaye Yükle"
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 187,
                                columnNumber: 81
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 137,
        columnNumber: 10
    }, this);
}
_s(Home, "1Qa/+LtXUDXPhDwicqjEUOOznD0=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_832d2f8c._.js.map