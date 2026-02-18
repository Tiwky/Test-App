"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ดึงข้อมูล User เดิมจาก localStorage (ถ้ามี)
    const existingUsers = JSON.parse(localStorage.getItem('mythic_users') || '[]');
    
    // เช็คว่า Username หรือ Email ซ้ำไหม
    const isDuplicate = existingUsers.some(
      (u: any) => u.username === formData.username || u.email === formData.email
    );

    if (isDuplicate) {
      setError('Username หรือ Email นี้มีนักรบท่านอื่นใช้ไปแล้ว!');
      return;
    }

    // บันทึก User ใหม่
    existingUsers.push(formData);
    localStorage.setItem('mythic_users', JSON.stringify(existingUsers));
    
    alert('ลงทะเบียนสำเร็จ! เข้าสู่สมรภูมิได้เลย');
    router.push('/login'); // เด้งไปหน้า Login
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* เอฟเฟกต์แสงพื้นหลัง */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-[0_0_30px_rgba(147,51,234,0.2)] z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
            MYTHIC<span className="text-white">STORE</span>
          </Link>
          <h2 className="text-xl text-gray-400 mt-2 font-bold">สร้างตัวละครใหม่ (Register)</h2>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">อีเมล (Email)</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="hero@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">ชื่อผู้ใช้ (Username)</label>
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="KnightSlayer99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">รหัสผ่าน (Password)</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="w-full py-3 mt-4 text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/30 transition transform hover:-translate-y-0.5">
            เข้าร่วมกองทัพ (Register)
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          มีตัวละครอยู่แล้ว? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold underline">เข้าสู่ระบบที่นี่</Link>
        </p>
      </div>
    </div>
  );
}