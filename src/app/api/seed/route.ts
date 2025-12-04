import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Basit bir güvenlik önlemi
    if (secret !== 'fabula-seed-2024') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const stories = [
            {
                title: "Kayıp Astronot",
                content: "Gözlerini açtığında alarmın kırmızı ışığı yanıp sönüyordu. Yerçekimsiz ortamda süzülürken başındaki ağrıyı hissetti. Nerede olduğunu hatırlamıyordu, ama bir şeyler ters gidiyordu.",
                excerpt: "Uzay istasyonunda hafızasını kaybetmiş bir astronotun hayatta kalma mücadelesi.",
                category: "Bilim Kurgu",
                type: "interactive",
                status: "ACTIVE",
                author: {
                    name: "Fabula Evreni",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=astro"
                },
                authorId: "system",
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
                stats: { views: 120, likes: 45, comments: 12 },
                startNodeId: "root",
                nodes: {
                    "root": {
                        id: "root",
                        title: "Uyanış",
                        content: "Gözlerini açtığında alarmın kırmızı ışığı yanıp sönüyordu. Yerçekimsiz ortamda süzülürken başındaki ağrıyı hissetti. Nerede olduğunu hatırlamıyordu, ama bir şeyler ters gidiyordu. İstasyonun ana bilgisayarı 'HAYATİ TEHLİKE' uyarısı veriyordu.",
                        choices: [
                            {
                                id: "c1",
                                text: "Hızla kokpite doğru yöneldi.",
                                nextNodeId: "node_cockpit",
                                votes: 5
                            },
                            {
                                id: "c2",
                                text: "Önce revire gidip yaralarına bakmak istedi.",
                                nextNodeId: "node_medbay",
                                votes: 3
                            }
                        ],
                        authorId: "system"
                    },
                    "node_cockpit": {
                        id: "node_cockpit",
                        title: "Kokpit",
                        content: "Koridor boyunca süzülerek kokpite ulaştı. Kontrol paneli kıvılcımlar saçıyordu. Dışarıdaki pencereden Dünya'nın mavi parıltısı yerine, kapkara bir boşluk görünüyordu. Navigasyon sistemi bozulmuştu.",
                        choices: [
                            {
                                id: "c3",
                                text: "Manuel kontrolü devreye alıp rotayı hesaplamaya çalıştı.",
                                nextNodeId: "node_manual",
                                votes: 0
                            },
                            {
                                id: "c4",
                                text: "Telsizden yardım çağrısı gönderdi.",
                                nextNodeId: "node_radio",
                                votes: 0
                            }
                        ],
                        authorId: "system"
                    },
                    "node_medbay": {
                        id: "node_medbay",
                        title: "Revir",
                        content: "Revire girdiğinde ortalık darmadağınıktı. İlaçlar havada uçuşuyordu. Aynaya baktığında alnındaki derin yarayı gördü. Bu bir kaza değildi, birisi ona saldırmıştı.",
                        choices: [], // Henüz yazılmamış
                        authorId: "system"
                    }
                }
            },
            {
                title: "Fırtınalı Gece",
                content: "Yağmur cama vururken eski konağın kapısı gıcırdayarak açıldı. İçerisi buz gibiydi ve küf kokuyordu. Dedektif, elindeki feneri karanlığa doğru tuttu.",
                excerpt: "Terk edilmiş bir konakta geçen gerilim dolu bir gece.",
                category: "Korku",
                type: "interactive",
                status: "ACTIVE",
                author: {
                    name: "Gizemli Yazar",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=detective"
                },
                authorId: "system",
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
                stats: { views: 85, likes: 32, comments: 8 },
                startNodeId: "root",
                nodes: {
                    "root": {
                        id: "root",
                        title: "Giriş",
                        content: "Yağmur cama vururken eski konağın kapısı gıcırdayarak açıldı. İçerisi buz gibiydi ve küf kokuyordu. Dedektif, elindeki feneri karanlığa doğru tuttu. Yerde çamurlu ayak izleri vardı.",
                        choices: [
                            {
                                id: "c1",
                                text: "Ayak izlerini takip ederek salona girdi.",
                                nextNodeId: "node_salon",
                                votes: 10
                            },
                            {
                                id: "c2",
                                text: "Merdivenlerden üst kata çıktı.",
                                nextNodeId: "node_upstairs",
                                votes: 2
                            }
                        ],
                        authorId: "system"
                    },
                    "node_salon": {
                        id: "node_salon",
                        title: "Salon",
                        content: "Salona girdiğinde şöminede hala sönmemiş bir ateş buldu. Birisi buradaydı. Ya da çok yakın bir zamanda buradaydı. Koltuğun üzerinde eski bir günlük duruyordu.",
                        choices: [],
                        authorId: "system"
                    }
                }
            },
            {
                title: "Merhaba Dünya",
                content: "Bilgisayarın başına oturduğunda saat gece yarısını geçiyordu. Kahvesinden bir yudum aldı ve ekranın parıltısına odaklandı. Bugün hayatının değişeceği gündü.",
                excerpt: "Bir yazılımcının başarıya giden zorlu yolculuğu.",
                category: "Dram",
                type: "linear",
                status: "ACTIVE",
                author: {
                    name: "Kod Şairi",
                    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=coder"
                },
                authorId: "system",
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
                stats: { views: 250, likes: 120, comments: 45 }
            }
        ];

        for (const story of stories) {
            await adminDb.collection('stories').add(story);
        }

        return NextResponse.json({ success: true, message: 'Stories seeded successfully' });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
