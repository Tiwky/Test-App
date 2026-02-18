"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [recoveredPassword, setRecoveredPassword] = useState('');

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRecoveredPassword('');
    
    // ดึงข้อมูล User ทั้งหมดจาก localStorage
    const existingUsers = JSON.parse(localStorage.getItem('mythic_users') || '[]');
    
    // ค้นหาอีเมลในระบบ
    const user = existingUsers.find((u: any) => u.email === email);

    if (user) {
      // จำลองการค้นพบรหัสผ่าน (ในระบบจริงห้ามทำแบบนี้เด็ดขาด ต้องส่งอีเมลรีเซ็ตเท่านั้น!)
      setRecoveredPassword(user.password);
    } else {
      setError('ไม่พบม้วนคัมภีร์ที่บันทึกอีเมลนี้ในสารบบของเรา');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* เอฟเฟกต์แสงพื้นหลังสีเหลือง/ทอง */}
      <div className="absolute w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-[0_0_30px_rgba(245,158,11,0.15)] z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
            MYTHIC<span className="text-white">STORE</span>
          </Link>
          <h2 className="text-xl text-gray-400 mt-2 font-bold">ฟื้นฟูความทรงจำ</h2>
          <p className="text-sm text-gray-500 mt-2">กรอกอีเมลที่ใช้ลงทะเบียนเพื่อค้นหารหัสผ่านของคุณ</p>
        </div>

        {error && <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm text-center">{error}</div>}
        
        {recoveredPassword ? (
          <div className="mb-6 p-5 bg-green-500/10 border border-green-500/50 rounded-lg text-center">
            <p className="text-green-400 text-sm mb-2">✨ ค้นพบความทรงจำของคุณแล้ว ✨</p>
            <p className="text-gray-300 mb-1">รหัสผ่านของคุณคือ:</p>
            <p className="text-xl font-mono text-white bg-gray-950 py-2 rounded border border-gray-700 select-all tracking-wider">
              {recoveredPassword}
            </p>
          </div>
        ) : (
          <form onSubmit={handleRecover} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">อีเมล (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                placeholder="hero@example.com"
              />
            </div>
            
            <button type="submit" className="w-full py-3 mt-2 text-black font-bold bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg hover:from-yellow-400 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5">
              ค้นหาความทรงจำ
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
            <span>←</span> กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}