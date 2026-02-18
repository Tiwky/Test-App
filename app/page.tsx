"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // ป้องกัน Hydration error

  // ตรวจสอบสถานะตอนโหลดหน้าเว็บ
  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('mythic_current_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mythic_current_user');
    setCurrentUser(null);
  };

  // ข้อมูลสมมติของไอเทมทั้ง 3 ชิ้น
  const featuredItems = [
    { id: 1, name: "Spirit Wolf Cowl (หมวกหมาป่าวิญญาณ)", description: "มอบความคล่องตัวระดับสูงสุด และเพิ่มพลังป้องกันเวทย์น้ำแข็ง", price: "500 Crystals", image: "/image_7928a6.png", rarity: "Epic", glowColor: "shadow-blue-500/50" },
    { id: 2, name: "Crimson Berserker Vest (เสื้อคลุมผู้บ้าคลั่ง)", description: "ดูดซับพลังชีวิตศัตรูทุกครั้งที่โจมตีติดคริติคอล ไอเทมต้องคำสาป", price: "750 Crystals", image: "/image_7928c6.png", rarity: "Legendary", glowColor: "shadow-red-500/50" },
    { id: 3, name: "Phantom Feather Hood (ฮูดปักษาเงามฤตยู)", description: "พรจากทวยเทพ เพิ่มความเร็วในการเคลื่อนที่ขั้นสุด มอบสถานะล่องหน", price: "1,200 Crystals", image: "/image_7928e3.png", rarity: "Mythic", glowColor: "shadow-yellow-500/50" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* ---------------- Navbar ---------------- */}
      <nav className="fixed w-full top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
            MYTHIC<span className="text-white">STORE</span>
          </div>
          <div className="flex gap-4 items-center">
            {mounted && currentUser ? (
              <>
                <span className="text-gray-400 text-sm hidden sm:block">นักรบ: <span className="text-white font-bold">{currentUser.username}</span></span>
                <Link href="/shop" className="px-5 py-2 text-sm font-semibold bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 transition">
                  คลังอาวุธ
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 underline font-semibold transition">
                  Logout
                </button>
              </>
            ) : mounted ? (
              <>
                <Link href="/login" className="px-5 py-2 text-sm font-semibold border border-gray-600 rounded-md hover:bg-gray-800 transition">
                  Log In
                </Link>
                <Link href="/register" className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/30 transition transform hover:-translate-y-0.5">
                  Register
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      {/* ---------------- Hero Section ---------------- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 z-10 drop-shadow-2xl">
          EPIC WEEKEND <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">SALE</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 z-10 leading-relaxed">
          เตรียมตัวให้พร้อมสำหรับสมรภูมิถัดไป! ปลดล็อกพลังที่ซ่อนเร้นด้วยไอเทมระดับตำนานที่จัดโปรโมชั่นลดราคาพิเศษเฉพาะสุดสัปดาห์นี้เท่านั้น
        </p>
        <Link 
          href="/shop" 
          className="z-10 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]"
        >
          เข้าสู่คลังอาวุธ (Enter Main Shop)
        </Link>
      </header>

      {/* ---------------- Featured Items Section ---------------- */}
      <section className="py-20 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">✨ หีบสมบัติที่ถูกเลือก ✨</h2>
            <p className="text-gray-400">ไอเทมระดับสูงที่นักรบทุกคนหมายปอง (Limited Edition)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredItems.map((item) => (
              <div key={item.id} className={`bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${item.glowColor}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gray-900 border border-gray-600 text-gray-300">{item.rarity}</span>
                </div>
                <div className="relative w-full h-64 mb-6 bg-gray-900/50 rounded-xl flex items-center justify-center p-4">
                  <Image src={item.image} alt={item.name} width={200} height={200} className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 min-h-[60px]">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xl font-black text-yellow-400">{item.price}</div>
                  <Link href="/shop" className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    ซื้อเลย
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-950 border-t border-gray-900">
        <p>© 2026 MythicStore. All rights reserved.</p>
      </footer>
    </div>
  );
}