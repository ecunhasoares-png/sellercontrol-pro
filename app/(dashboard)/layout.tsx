'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div style={{ display: 'flex' }}>
        
        <Sidebar />

        <main style={{ flex: 1, padding: 30 }}>
          {children}
        </main>

      </div>
    </ProtectedRoute>
  )
}