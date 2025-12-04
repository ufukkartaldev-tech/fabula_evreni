module.exports = [
"[project]/src/lib/firestore.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_lib_firestore_ts_70d184a6._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/firestore.ts [app-ssr] (ecmascript)");
    });
});
}),
];