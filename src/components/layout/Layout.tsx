import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main app container */}
      <div
        className="app-main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          marginLeft: '270px',
        }}
      >
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main style={{ flex: 1, padding: '32px 36px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .app-main-content {
            margin-left: 0 !important;
          }
          main {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
