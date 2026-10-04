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
const InteractiveGuide = React.lazy(() =>
  import('../../modules/guides/components/InteractiveGuide').then(m => ({ default: m.InteractiveGuide }))
);

// Carregamento Lazy do Vetor Forense
const VetorForense = React.lazy(() =>
  import('../../modules/vetor-forense/components/VetorForense').then(m => ({ default: m.VetorForense }))
);

const LoadingFallback = () => (
  <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-dim)' }}>
    Carregando módulo...
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/croqui-converter" element={<CroquiConverter />} />

          {/* Vetor Forense */}
          <Route
            path="/tools/vetor-forense"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <VetorForense />
              </Suspense>
            }
          />

          <Route path="/guides" element={<Guides />} />

          {/* Rota Dinâmica dos Guias */}
          <Route
            path="/guides/:guideId"
            element={
              <Suspense fallback={<LoadingFallback />}>
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
