(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/components/LeaderboardCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interfaces$2f$Badge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/interfaces/Badge.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function LeaderboardCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(97);
    if ($[0] !== "67b8e7614d2d62748729bbda72f9bbf764511e50539fb79c1cc6aee87f102142") {
        for(let $i = 0; $i < 97; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "67b8e7614d2d62748729bbda72f9bbf764511e50539fb79c1cc6aee87f102142";
    }
    const { rank, type, data } = t0;
    const getRankIcon = _LeaderboardCardGetRankIcon;
    if (type === "story") {
        const t1 = `/story/${data.id}`;
        const t2 = getRankIcon(rank);
        let t3;
        if ($[1] !== t2) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rank-badge",
                children: t2
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 30,
                columnNumber: 12
            }, this);
            $[1] = t2;
            $[2] = t3;
        } else {
            t3 = $[2];
        }
        let t4;
        if ($[3] !== data.title) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "card-title",
                children: data.title
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 38,
                columnNumber: 12
            }, this);
            $[3] = data.title;
            $[4] = t4;
        } else {
            t4 = $[4];
        }
        let t5;
        if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "meta-icon",
                children: "👤"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 46,
                columnNumber: 12
            }, this);
            $[5] = t5;
        } else {
            t5 = $[5];
        }
        let t6;
        if ($[6] !== data.author.name) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "meta-item",
                children: [
                    t5,
                    data.author.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 53,
                columnNumber: 12
            }, this);
            $[6] = data.author.name;
            $[7] = t6;
        } else {
            t6 = $[7];
        }
        let t7;
        if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "meta-icon",
                children: "📁"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 61,
                columnNumber: 12
            }, this);
            $[8] = t7;
        } else {
            t7 = $[8];
        }
        let t8;
        if ($[9] !== data.category) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "meta-item",
                children: [
                    t7,
                    data.category
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 68,
                columnNumber: 12
            }, this);
            $[9] = data.category;
            $[10] = t8;
        } else {
            t8 = $[10];
        }
        let t9;
        if ($[11] !== t6 || $[12] !== t8) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-meta",
                children: [
                    t6,
                    t8
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 76,
                columnNumber: 12
            }, this);
            $[11] = t6;
            $[12] = t8;
            $[13] = t9;
        } else {
            t9 = $[13];
        }
        let t10;
        if ($[14] !== t4 || $[15] !== t9) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-content",
                children: [
                    t4,
                    t9
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this);
            $[14] = t4;
            $[15] = t9;
            $[16] = t10;
        } else {
            t10 = $[16];
        }
        let t11;
        if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-icon",
                children: "👁️"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this);
            $[17] = t11;
        } else {
            t11 = $[17];
        }
        let t12;
        if ($[18] !== data.stats.views) {
            t12 = data.stats.views.toLocaleString();
            $[18] = data.stats.views;
            $[19] = t12;
        } else {
            t12 = $[19];
        }
        let t13;
        if ($[20] !== t12) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stat-item",
                children: [
                    t11,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stat-value",
                        children: t12
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                        lineNumber: 109,
                        columnNumber: 45
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 109,
                columnNumber: 13
            }, this);
            $[20] = t12;
            $[21] = t13;
        } else {
            t13 = $[21];
        }
        let t14;
        if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-icon",
                children: "💬"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 117,
                columnNumber: 13
            }, this);
            $[22] = t14;
        } else {
            t14 = $[22];
        }
        let t15;
        if ($[23] !== data.stats.comments) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stat-item",
                children: [
                    t14,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stat-value",
                        children: data.stats.comments
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                        lineNumber: 124,
                        columnNumber: 45
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this);
            $[23] = data.stats.comments;
            $[24] = t15;
        } else {
            t15 = $[24];
        }
        let t16;
        if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-icon",
                children: "❤️"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, this);
            $[25] = t16;
        } else {
            t16 = $[25];
        }
        let t17;
        if ($[26] !== data.stats.likes) {
            t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stat-item",
                children: [
                    t16,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "stat-value",
                        children: data.stats.likes
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                        lineNumber: 139,
                        columnNumber: 45
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 139,
                columnNumber: 13
            }, this);
            $[26] = data.stats.likes;
            $[27] = t17;
        } else {
            t17 = $[27];
        }
        let t18;
        if ($[28] !== t13 || $[29] !== t15 || $[30] !== t17) {
            t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-stats",
                children: [
                    t13,
                    t15,
                    t17
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this);
            $[28] = t13;
            $[29] = t15;
            $[30] = t17;
            $[31] = t18;
        } else {
            t18 = $[31];
        }
        let t19;
        if ($[32] !== t1 || $[33] !== t10 || $[34] !== t18 || $[35] !== t3) {
            t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: t1,
                className: "leaderboard-card",
                children: [
                    t3,
                    t10,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 157,
                columnNumber: 13
            }, this);
            $[32] = t1;
            $[33] = t10;
            $[34] = t18;
            $[35] = t3;
            $[36] = t19;
        } else {
            t19 = $[36];
        }
        return t19;
    }
    if (type === "author") {
        const badgeEmoji = data.currentBadge || "\uD83C\uDF31";
        const t1 = data.totalWins || 0;
        let t2;
        if ($[37] !== t1) {
            t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interfaces$2f$Badge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserBadge"])(t1);
            $[37] = t1;
            $[38] = t2;
        } else {
            t2 = $[38];
        }
        const badge = t2;
        const t3 = getRankIcon(rank);
        let t4;
        if ($[39] !== t3) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rank-badge",
                children: t3
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 183,
                columnNumber: 12
            }, this);
            $[39] = t3;
            $[40] = t4;
        } else {
            t4 = $[40];
        }
        let t5;
        if ($[41] !== data.displayName || $[42] !== data.photoURL) {
            t5 = data.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: data.photoURL,
                alt: data.displayName
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 191,
                columnNumber: 28
            }, this) : "\uD83D\uDC64";
            $[41] = data.displayName;
            $[42] = data.photoURL;
            $[43] = t5;
        } else {
            t5 = $[43];
        }
        let t6;
        if ($[44] !== t5) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "author-avatar",
                children: t5
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 200,
                columnNumber: 12
            }, this);
            $[44] = t5;
            $[45] = t6;
        } else {
            t6 = $[45];
        }
        let t7;
        if ($[46] !== data.displayName) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "card-title",
                children: data.displayName
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 208,
                columnNumber: 12
            }, this);
            $[46] = data.displayName;
            $[47] = t7;
        } else {
            t7 = $[47];
        }
        let t8;
        if ($[48] !== badge || $[49] !== badgeEmoji) {
            t8 = badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "author-badge",
                children: [
                    badgeEmoji,
                    " ",
                    badge.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 216,
                columnNumber: 21
            }, this);
            $[48] = badge;
            $[49] = badgeEmoji;
            $[50] = t8;
        } else {
            t8 = $[50];
        }
        let t9;
        if ($[51] !== t7 || $[52] !== t8) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t7,
                    t8
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 225,
                columnNumber: 12
            }, this);
            $[51] = t7;
            $[52] = t8;
            $[53] = t9;
        } else {
            t9 = $[53];
        }
        let t10;
        if ($[54] !== t6 || $[55] !== t9) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "author-header",
                    children: [
                        t6,
                        t9
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                    lineNumber: 234,
                    columnNumber: 43
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 234,
                columnNumber: 13
            }, this);
            $[54] = t6;
            $[55] = t9;
            $[56] = t10;
        } else {
            t10 = $[56];
        }
        let t11;
        if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-icon",
                children: "🏆"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 243,
                columnNumber: 13
            }, this);
            $[57] = t11;
        } else {
            t11 = $[57];
        }
        const t12 = data.totalWins || 0;
        let t13;
        if ($[58] !== t12) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-value",
                children: t12
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 251,
                columnNumber: 13
            }, this);
            $[58] = t12;
            $[59] = t13;
        } else {
            t13 = $[59];
        }
        let t14;
        if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-label",
                children: "Galibiyet"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 259,
                columnNumber: 13
            }, this);
            $[60] = t14;
        } else {
            t14 = $[60];
        }
        let t15;
        if ($[61] !== t13) {
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-stats",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stat-item",
                    children: [
                        t11,
                        t13,
                        t14
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                    lineNumber: 266,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 266,
                columnNumber: 13
            }, this);
            $[61] = t13;
            $[62] = t15;
        } else {
            t15 = $[62];
        }
        let t16;
        if ($[63] !== t10 || $[64] !== t15 || $[65] !== t4) {
            t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "leaderboard-card",
                children: [
                    t4,
                    t10,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 274,
                columnNumber: 13
            }, this);
            $[63] = t10;
            $[64] = t15;
            $[65] = t4;
            $[66] = t16;
        } else {
            t16 = $[66];
        }
        return t16;
    }
    if (type === "badge") {
        const badgeEmoji_0 = data.currentBadge || "\uD83C\uDF31";
        let t1;
        if ($[67] !== data.totalWins) {
            t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$interfaces$2f$Badge$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserBadge"])(data.totalWins);
            $[67] = data.totalWins;
            $[68] = t1;
        } else {
            t1 = $[68];
        }
        const badge_0 = t1;
        const t2 = getRankIcon(rank);
        let t3;
        if ($[69] !== t2) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rank-badge",
                children: t2
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 298,
                columnNumber: 12
            }, this);
            $[69] = t2;
            $[70] = t3;
        } else {
            t3 = $[70];
        }
        let t4;
        if ($[71] !== data.displayName || $[72] !== data.photoURL) {
            t4 = data.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: data.photoURL,
                alt: data.displayName
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 306,
                columnNumber: 28
            }, this) : "\uD83D\uDC64";
            $[71] = data.displayName;
            $[72] = data.photoURL;
            $[73] = t4;
        } else {
            t4 = $[73];
        }
        let t5;
        if ($[74] !== t4) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "author-avatar",
                children: t4
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 315,
                columnNumber: 12
            }, this);
            $[74] = t4;
            $[75] = t5;
        } else {
            t5 = $[75];
        }
        let t6;
        if ($[76] !== data.displayName) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "card-title",
                children: data.displayName
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 323,
                columnNumber: 12
            }, this);
            $[76] = data.displayName;
            $[77] = t6;
        } else {
            t6 = $[77];
        }
        let t7;
        if ($[78] !== badgeEmoji_0 || $[79] !== badge_0) {
            t7 = badge_0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "author-badge badge-highlight",
                children: [
                    badgeEmoji_0,
                    " ",
                    badge_0.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 331,
                columnNumber: 23
            }, this);
            $[78] = badgeEmoji_0;
            $[79] = badge_0;
            $[80] = t7;
        } else {
            t7 = $[80];
        }
        let t8;
        if ($[81] !== t6 || $[82] !== t7) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t6,
                    t7
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 340,
                columnNumber: 12
            }, this);
            $[81] = t6;
            $[82] = t7;
            $[83] = t8;
        } else {
            t8 = $[83];
        }
        let t9;
        if ($[84] !== t5 || $[85] !== t8) {
            t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "author-header",
                    children: [
                        t5,
                        t8
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                    lineNumber: 349,
                    columnNumber: 42
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 349,
                columnNumber: 12
            }, this);
            $[84] = t5;
            $[85] = t8;
            $[86] = t9;
        } else {
            t9 = $[86];
        }
        let t10;
        if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-icon",
                children: "🏆"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 358,
                columnNumber: 13
            }, this);
            $[87] = t10;
        } else {
            t10 = $[87];
        }
        let t11;
        if ($[88] !== data.totalWins) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-value",
                children: data.totalWins
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 365,
                columnNumber: 13
            }, this);
            $[88] = data.totalWins;
            $[89] = t11;
        } else {
            t11 = $[89];
        }
        let t12;
        if ($[90] === Symbol.for("react.memo_cache_sentinel")) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-label",
                children: "Toplam Galibiyet"
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 373,
                columnNumber: 13
            }, this);
            $[90] = t12;
        } else {
            t12 = $[90];
        }
        let t13;
        if ($[91] !== t11) {
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-stats",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stat-item",
                    children: [
                        t10,
                        t11,
                        t12
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                    lineNumber: 380,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 380,
                columnNumber: 13
            }, this);
            $[91] = t11;
            $[92] = t13;
        } else {
            t13 = $[92];
        }
        let t14;
        if ($[93] !== t13 || $[94] !== t3 || $[95] !== t9) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "leaderboard-card",
                children: [
                    t3,
                    t9,
                    t13
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/LeaderboardCard.tsx",
                lineNumber: 388,
                columnNumber: 13
            }, this);
            $[93] = t13;
            $[94] = t3;
            $[95] = t9;
            $[96] = t14;
        } else {
            t14 = $[96];
        }
        return t14;
    }
    return null;
}
_c = LeaderboardCard;
function _LeaderboardCardGetRankIcon(rank_0) {
    switch(rank_0){
        case 1:
            {
                return "\uD83E\uDD47";
            }
        case 2:
            {
                return "\uD83E\uDD48";
            }
        case 3:
            {
                return "\uD83E\uDD49";
            }
        default:
            {
                return `${rank_0}.`;
            }
    }
}
var _c;
__turbopack_context__.k.register(_c, "LeaderboardCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/leaderboardService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTopAuthors",
    ()=>getTopAuthors,
    "getTopBadgeHolders",
    ()=>getTopBadgeHolders,
    "getTopStories",
    ()=>getTopStories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript) <locals>");
;
;
async function getTopStories(timeRange = 'all', limitCount = 10) {
    try {
        const storiesCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'stories');
        // Fetch all stories and filter/sort in memory to avoid composite index requirements
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(storiesCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('createdAt', 'desc'));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        let stories = querySnapshot.docs.map((doc)=>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date()
            };
        });
        // Filter by time range
        if (timeRange !== 'all') {
            const now = new Date();
            let startDate;
            switch(timeRange){
                case 'today':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                default:
                    startDate = new Date(0);
            }
            stories = stories.filter((story)=>story.createdAt >= startDate);
        }
        // Sort by views and limit
        const sortedStories = stories.sort((a, b)=>(b.stats?.views || 0) - (a.stats?.views || 0)).slice(0, limitCount).map((story, index)=>({
                ...story,
                rank: index + 1
            }));
        return sortedStories;
    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
}
async function getTopAuthors(limitCount = 10) {
    try {
        const usersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'users');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(usersCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('totalWins', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const authors = querySnapshot.docs.map((doc, index)=>{
            const data = doc.data();
            return {
                uid: doc.id,
                displayName: data.displayName || 'Anonim',
                photoURL: data.photoURL || null,
                totalViews: data.totalViews || 0,
                storiesCount: data.storiesCount || 0,
                currentBadge: data.currentBadge || '🌱',
                rank: index + 1
            };
        });
        return authors;
    } catch (error) {
        console.error('Error fetching top authors:', error);
        return [];
    }
}
async function getTopBadgeHolders(limitCount = 10) {
    try {
        const usersCollection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], 'users');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(usersCollection, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('totalWins', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limit"])(limitCount));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const badgeHolders = querySnapshot.docs.map((doc, index)=>{
            const data = doc.data();
            return {
                uid: doc.id,
                email: data.email || '',
                displayName: data.displayName || 'Anonim',
                photoURL: data.photoURL || null,
                totalWins: data.totalWins || 0,
                currentBadge: data.currentBadge || '🌱',
                createdAt: data.createdAt || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                lastUpdated: data.lastUpdated || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timestamp"].now(),
                rank: index + 1
            };
        });
        return badgeHolders;
    } catch (error) {
        console.error('Error fetching top badge holders:', error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/leaderboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LeaderboardCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/LeaderboardCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$leaderboardService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/leaderboardService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LeaderboardPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('stories');
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [topStories, setTopStories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topAuthors, setTopAuthors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topBadgeHolders, setTopBadgeHolders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeaderboardPage.useEffect": ()=>{
            fetchLeaderboardData();
        }
    }["LeaderboardPage.useEffect"], [
        activeTab,
        timeRange
    ]);
    const fetchLeaderboardData = async ()=>{
        setLoading(true);
        try {
            if (activeTab === 'stories') {
                const stories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$leaderboardService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTopStories"])(timeRange, 10);
                setTopStories(stories);
            } else if (activeTab === 'authors') {
                const authors = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$leaderboardService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTopAuthors"])(10);
                setTopAuthors(authors);
            } else if (activeTab === 'badges') {
                const badgeHolders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$leaderboardService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTopBadgeHolders"])(10);
                setTopBadgeHolders(badgeHolders);
            }
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        } finally{
            setLoading(false);
        }
    };
    const renderContent = ()=>{
        if (loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "loading-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "spinner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/leaderboard/page.tsx",
                        lineNumber: 39,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Liderlik tablosu yükleniyor..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/leaderboard/page.tsx",
                        lineNumber: 40,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/leaderboard/page.tsx",
                lineNumber: 38,
                columnNumber: 14
            }, this);
        }
        if (activeTab === 'stories') {
            if (topStories.length === 0) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "empty-state",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "empty-icon",
                            children: "📚"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 46,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Henüz hikaye yok."
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 47,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 45,
                    columnNumber: 16
                }, this);
            }
            return topStories.map((story)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LeaderboardCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    rank: story.rank,
                    type: "story",
                    data: story
                }, story.id, false, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 50,
                    columnNumber: 38
                }, this));
        }
        if (activeTab === 'authors') {
            if (topAuthors.length === 0) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "empty-state",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "empty-icon",
                            children: "👥"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 55,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Henüz yazar yok."
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 56,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 54,
                    columnNumber: 16
                }, this);
            }
            return topAuthors.map((author)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LeaderboardCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    rank: author.rank,
                    type: "author",
                    data: author
                }, author.uid, false, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 59,
                    columnNumber: 39
                }, this));
        }
        if (activeTab === 'badges') {
            if (topBadgeHolders.length === 0) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "empty-state",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "empty-icon",
                            children: "🏆"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 64,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Henüz rozet sahibi yok."
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 65,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 63,
                    columnNumber: 16
                }, this);
            }
            return topBadgeHolders.map((holder)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$LeaderboardCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    rank: holder.rank,
                    type: "badge",
                    data: holder
                }, holder.uid, false, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 68,
                    columnNumber: 44
                }, this));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "leaderboard-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "leaderboard-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "leaderboard-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "page-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "title-icon",
                                    children: "🏆"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/leaderboard/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this),
                                "Liderlik Tablosu"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 74,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "page-subtitle",
                            children: "En başarılı hikayeler, yazarlar ve rozet sahipleri"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 78,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 73,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "leaderboard-tabs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `tab-button ${activeTab === 'stories' ? 'active' : ''}`,
                            onClick: ()=>setActiveTab('stories'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "tab-icon",
                                    children: "📖"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/leaderboard/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, this),
                                "En Çok Okunan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `tab-button ${activeTab === 'authors' ? 'active' : ''}`,
                            onClick: ()=>setActiveTab('authors'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "tab-icon",
                                    children: "✍️"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/leaderboard/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 25
                                }, this),
                                "Aktif Yazarlar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `tab-button ${activeTab === 'badges' ? 'active' : ''}`,
                            onClick: ()=>setActiveTab('badges'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "tab-icon",
                                    children: "🎖️"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/leaderboard/page.tsx",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, this),
                                "Rozet Sıralaması"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                activeTab === 'stories' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "time-filters",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `filter-button ${timeRange === 'today' ? 'active' : ''}`,
                            onClick: ()=>setTimeRange('today'),
                            children: "Bugün"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 99,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `filter-button ${timeRange === 'week' ? 'active' : ''}`,
                            onClick: ()=>setTimeRange('week'),
                            children: "Bu Hafta"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 102,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `filter-button ${timeRange === 'month' ? 'active' : ''}`,
                            onClick: ()=>setTimeRange('month'),
                            children: "Bu Ay"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 105,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `filter-button ${timeRange === 'all' ? 'active' : ''}`,
                            onClick: ()=>setTimeRange('all'),
                            children: "Tüm Zamanlar"
                        }, void 0, false, {
                            fileName: "[project]/src/app/leaderboard/page.tsx",
                            lineNumber: 108,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 98,
                    columnNumber: 45
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "leaderboard-content",
                    children: renderContent()
                }, void 0, false, {
                    fileName: "[project]/src/app/leaderboard/page.tsx",
                    lineNumber: 113,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/leaderboard/page.tsx",
            lineNumber: 72,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/leaderboard/page.tsx",
        lineNumber: 71,
        columnNumber: 10
    }, this);
}
_s(LeaderboardPage, "CuYzfrB3vSDpgnrSRrWkOIqRKOs=");
_c = LeaderboardPage;
var _c;
__turbopack_context__.k.register(_c, "LeaderboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_57cfb658._.js.map