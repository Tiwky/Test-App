"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ดึงข้อมูล User จาก localStorage
    const existingUsers = JSON.parse(localStorage.getItem('mythic_users') || '[]');
    
    // ค้นหา User ที่ Username และ Password ตรงกัน
    const user = existingUsers.find(
      (u: any) => u.username === formData.username && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('mythic_current_user', JSON.stringify(user));
      router.push('/shop');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ร่ายเวทย์ใหม่อีกครั้ง!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-[0_0_30px_rgba(37,99,235,0.2)] z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
            MYTHIC<span className="text-white">STORE</span>
          </Link>
          <h2 className="text-xl text-gray-400 mt-2 font-bold">เข้าสู่ระบบ (Login)</h2>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">ชื่อผู้ใช้ (Username)</label>
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
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
              className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {/* ลิงก์ลืมรหัสผ่าน */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
              ลืมรหัสผ่าน (Forgot Password)?
            </Link>
          </div>
          
          <button type="submit" className="w-full py-3 mt-2 text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5">
            เข้าสู่คลังอาวุธ (Login)
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ยังไม่มีตัวละคร? <Link href="/register" className="text-blue-400 hover:text-blue-300 font-bold underline">ลงทะเบียนที่นี่</Link>
        </p>
      </div>
    </div>
  );
}