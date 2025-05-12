'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, CreditCard, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Cours', href: '/admin/courses', icon: Calendar },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Paiements', href: '/admin/payments', icon: CreditCard },
  { name: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b">
          <Link href="/admin" className="text-xl font-serif text-sage">
            Studio Élan Admin
          </Link>
        </div>
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-sage text-white' 
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}