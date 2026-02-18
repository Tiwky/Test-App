"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [username, setUsername] = useState("Guest");
  const [mounted, setMounted] = useState(false); // ป้องกัน Hydration error

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('mythic_current_user');
    if (user) {
      setUsername(JSON.parse(user).username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mythic_current_user');
    window.location.href = '/'; // เด้งกลับหน้าแรกทันที
  };

  console.log(handleLogout)

  const shopItems = [
    { id: 1, name: "Spirit Wolf Cowl", category: "Helmet", price: "500", currency: "Crystals", image: "/image_7928a6.png", rarity: "Epic", color: "text-purple-400", border: "border-purple-500/50" },
    { id: 2, name: "Crimson Berserker Vest", category: "Armor", price: "750", currency: "Crystals", image: "/image_7928c6.png", rarity: "Legendary", color: "text-orange-400", border: "border-orange-500/50" },
    { id: 3, name: "Phantom Feather Hood", category: "Helmet", price: "1,200", currency: "Crystals", image: "/image_7928e3.png", rarity: "Mythic", color: "text-red-500", border: "border-red-500/50" },
    { id: 4, name: "Frostbite Wolf Mask", category: "Helmet", price: "15,000", currency: "Gold", image: "/image_7928a6.png", rarity: "Rare", color: "text-blue-400", border: "border-blue-500/50" },
    { id: 5, name: "Corrupted Knight Chest", category: "Armor", price: "800", currency: "Crystals", image: "/image_7928c6.png", rarity: "Epic", color: "text-purple-400", border: "border-purple-500/50" },
    { id: 6, name: "Angelic Halo Hood", category: "Helmet", price: "950", currency: "Crystals", image: "/image_7928e3.png", rarity: "Legendary", color: "text-orange-400", border: "border-orange-500/50" },
    { id: 7, name: "Novice Brawler Shirt", category: "Armor", price: "2,000", currency: "Gold", image: "/image_7928c6.png", rarity: "Common", color: "text-gray-400", border: "border-gray-500/50" },
    { id: 8, name: "Cultist Shadow Cowl", category: "Helmet", price: "18,000", currency: "Gold", image: "/image_7928e3.png", rarity: "Rare", color: "text-blue-400", border: "border-blue-500/50" },
  ];
      
  const filteredItems = activeCategory === "All" ? shopItems : shopItems.filter(item => item.category === activeCategory);
  const categories = ["All", "Helmet", "Armor", "Weapon", "Accessory"];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-purple-500 selection:text-white pb-20">
      {/* ---------------- Navbar ---------------- */}
      <nav className="fixed w-full top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 hover:scale-105 transition-transform">
            MYTHIC<span className="text-white">STORE</span>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="hidden md:flex items-center gap-2 text-sm font-bold bg-gray-900 px-4 py-2 rounded-full border border-gray-700">
              💰 <span className="text-yellow-400">12,500 Gold</span> | 💎 <span className="text-cyan-400">3,400 Crystals</span>
            </span>
            
            {/* แสดงชื่อผู้ใช้จาก localStorage */}
            {mounted && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 shadow-inner">
                  👤 {username}
                </span>
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 font-semibold underline transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      

      {/* ---------------- Header Section ---------------- */}
      <header className="pt-32 pb-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 z-10 text-white">
          คลังอาวุธ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">ทั้งหมด</span>
        </h1>
        <p className="text-gray-400 max-w-2xl">เลือกซื้ออุปกรณ์เพื่อเสริมความแข็งแกร่งให้ตัวละครของคุณ</p>
      </header>

      {/* ---------------- Filters & Search ---------------- */}
      <section className="px-6 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64 relative">
            <input 
              type="text" 
              placeholder="ค้นหาไอเทม..." 
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
            <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </section>

      {/* ---------------- Shop Grid ---------------- */}
      <section className="px-6 max-w-7xl mx-auto">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className={`group bg-gray-900 rounded-2xl p-4 border ${item.border} hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col h-full relative overflow-hidden`}>
                <div className="flex justify-between items-start mb-3 z-10">
                  <span className={`text-xs font-bold uppercase tracking-wide ${item.color}`}>{item.rarity}</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{item.category}</span>
                </div>
                <div className="relative w-full h-48 bg-gray-950 rounded-xl mb-4 flex items-center justify-center p-4 overflow-hidden z-10">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-t ${item.color.replace('text', 'from').replace('400', '600')} to-transparent`}></div>
                  <Image src={item.image} alt={item.name} width={150} height={150} className="object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 z-10">{item.name}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-800 z-10">
                  <div className="flex items-center gap-1.5 font-bold text-lg">
                    {item.currency === "Crystals" ? "💎" : "💰"}
                    <span className={item.currency === "Crystals" ? "text-cyan-400" : "text-yellow-400"}>{item.price}</span>
                  </div>
                  <button className="px-4 py-2 bg-gray-800 text-sm text-white font-bold rounded-lg hover:bg-purple-600 hover:shadow-[0_0_10px_rgba(147,51,234,0.6)] transition-all active:scale-95">
                    ซื้อ (Buy)
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        ) : (
          <div className="text-center py-20 text-gray-500">
            <span className="text-4xl block mb-4">👻</span>
            <p className="text-xl font-semibold">ยังไม่มีไอเทมในหมวดหมู่นี้</p>
          </div>
        )}
      </section>
    </div>
  );
}