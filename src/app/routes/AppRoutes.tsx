import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { Home } from '../../pages/Home/Home';
import { Tools } from '../../pages/Tools/Tools';
import { CroquiConverter } from '../../pages/CroquiConverter/CroquiConverter';
import { Projects } from '../../pages/Projects/Projects';
import { About } from '../../pages/About/About';
import { Guides } from '../../pages/Guides/Guides';

// Carregamento Lazy da página de Guia Interativo
const InteractiveGuide = React.lazy(() => import('../../modules/guides/components/InteractiveGuide').then(m => ({ default: m.InteractiveGuide })));

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/croqui-converter" element={<CroquiConverter />} />
          <Route path="/guides" element={<Guides />} />
          
          {/* Rota Dinâmica dos Guias */}
          <Route 
            path="/guides/:guideId" 
            element={
              <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>Carregando tutorial interativo...</div>}>
                <InteractiveGuide />
              </Suspense>
            } 
          />

          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};
