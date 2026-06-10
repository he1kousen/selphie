import React, { useState, Suspense, lazy } from 'react';
import LandingView from './components/LandingView';

const TemplatePickerView = lazy(() => import('./components/TemplatePickerView'));
const StudioView = lazy(() => import('./components/StudioView'));
const ResultView = lazy(() => import('./components/ResultView'));

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [finalImage, setFinalImage] = useState(null);

  // A simple fallback UI
  const Fallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-8 h-8 rounded-full border-2 border-line border-t-accent animate-spin" />
    </div>
  );

  return (
    <>
      {/* Global grain overlay */}
      <div className="bg-grain" />

      <Suspense fallback={<Fallback />}>
        {currentView === 'landing' && (
          <LandingView onNext={() => setCurrentView('picker')} />
        )}
        {currentView === 'picker' && (
          <TemplatePickerView
            onNext={() => setCurrentView('studio')}
            onBack={() => setCurrentView('landing')}
          />
        )}
        {currentView === 'studio' && (
          <StudioView
            onNext={(img) => { setFinalImage(img); setCurrentView('result'); }}
            onBack={() => setCurrentView('picker')}
          />
        )}
        {currentView === 'result' && (
          <ResultView
            finalImage={finalImage}
            onRestart={() => setCurrentView('landing')}
          />
        )}
      </Suspense>
    </>
  );
}

export default App;
