import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  Search,
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock Data สำหรับตารางคำสั่งซื้อล่าสุด
  const recentOrders = [
    { id: '#ORD-001', customer: 'สมชาย ใจดี', date: '18 ก.พ. 2026', status: 'จัดส่งแล้ว', amount: '฿2,500' },
    { id: '#ORD-002', customer: 'สมหญิง รักเรียน', date: '18 ก.พ. 2026', status: 'รอดำเนินการ', amount: '฿1,200' },
    { id: '#ORD-003', customer: 'จอห์น โด', date: '17 ก.พ. 2026', status: 'กำลังจัดส่ง', amount: '฿4,500' },
    { id: '#ORD-004', customer: 'มานี มีนา', date: '17 ก.พ. 2026', status: 'ยกเลิก', amount: '฿850' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* 1. Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600">ShopAdmin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <LayoutDashboard size={20} /> ภาพรวมระบบ
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} /> คำสั่งซื้อ
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Package size={20} /> จัดการสินค้า
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Users size={20} /> ลูกค้า
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Settings size={20} /> ตั้งค่าระบบ
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. Top Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="ค้นหาคำสั่งซื้อ, สินค้า..." 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin ผู้ดูแล</span>
            </div>
          </div>
        </header>

        {/* 3. Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ยินดีต้อนรับกลับ, Admin 👋</h1>
            <p className="text-gray-500">นี่คือภาพรวมร้านค้าของคุณในวันนี้</p>
          </div>

          {/* Quick Stats (KPI Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="ยอดขายรวม (เดือนนี้)" value="฿145,000" icon={<DollarSign size={24} />} trend="+12.5%" isPositive={true} />
            <StatCard title="คำสั่งซื้อใหม่" value="342" icon={<ShoppingCart size={24} />} trend="+5.2%" isPositive={true} />
            <StatCard title="ลูกค้าใหม่" value="89" icon={<Users size={24} />} trend="-2.4%" isPositive={false} />
            <StatCard title="ค่าเฉลี่ยต่อออเดอร์" value="฿423" icon={<CreditCard size={24} />} trend="+8.1%" isPositive={true} />
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Sales Graph Placeholder */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">แนวโน้มยอดขาย</h3>
                <select className="text-sm border-gray-300 rounded-md shadow-sm outline-none">
                  <option>7 วันล่าสุด</option>
                  <option>30 วันล่าสุด</option>
                  <option>ปีนี้</option>
                </select>
              </div>
              {/* พื้นที่สำหรับใส่ Component กราฟ เช่น Recharts หรือ Chart.js */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                <p className="text-gray-400 flex items-center gap-2"><TrendingUp size={20}/> พื้นที่แสดงกราฟ (ใส่ Recharts ที่นี่)</p>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">ออเดอร์ล่าสุด</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">ดูทั้งหมด</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-200">
                      <th className="pb-3 font-medium">รหัส</th>
                      <th className="pb-3 font-medium">ลูกค้า</th>
                      <th className="pb-3 font-medium">สถานะ</th>
                      <th className="pb-3 font-medium text-right">ยอดรวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-800">{order.id}</td>
                        <td className="py-3 text-gray-600">{order.customer}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${order.status === 'จัดส่งแล้ว' ? 'bg-green-100 text-green-700' : 
                              order.status === 'รอดำเนินการ' ? 'bg-yellow-100 text-yellow-700' : 
                              order.status === 'ยกเลิก' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right font-medium text-gray-800">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

// Component ย่อยสำหรับแสดงการ์ดสถิติ (KPI)
function StatCard({ title, value, icon, trend, isPositive }: { title: string, value: string, icon: React.ReactNode, trend: string, isPositive: boolean }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
        <p className={`text-xs mt-2 flex items-center gap-1 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {trend} จากเดือนที่แล้ว
        </p>
      </div>
      <div className={`p-4 rounded-full ${isPositive ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
        {icon}
      </div>
    </div>
  );
}