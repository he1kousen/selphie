import React, { useState, Suspense, lazy, useEffect } from 'react';
import LandingView from './components/LandingView';

const TemplatePickerView = lazy(() => import('./components/TemplatePickerView'));
const StudioView = lazy(() => import('./components/StudioView'));
const ResultView = lazy(() => import('./components/ResultView'));

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [finalImage, setFinalImage] = useState(null);

  // Handle browser back/forward button via popstate
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
        if (event.state.finalImage) {
          setFinalImage(event.state.finalImage);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Push state to history whenever view changes
  useEffect(() => {
    const state = { view: currentView };
    if (finalImage) {
      state.finalImage = finalImage;
    }
    window.history.pushState(state, '', `#${currentView}`);
  }, [currentView, finalImage]);

  // Navigation handlers with history tracking
  const navigateTo = (view, image = null) => {
    if (image) {
      setFinalImage(image);
    }
    setCurrentView(view);
  };

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
          <LandingView onNext={() => navigateTo('picker')} />
        )}
        {currentView === 'picker' && (
          <TemplatePickerView
            onNext={() => navigateTo('studio')}
            onBack={() => navigateTo('landing')}
          />
        )}
        {currentView === 'studio' && (
          <StudioView
            onNext={(img) => navigateTo('result', img)}
            onBack={() => navigateTo('picker')}
          />
        )}
        {currentView === 'result' && (
          <ResultView
            finalImage={finalImage}
            onRestart={() => navigateTo('landing')}
          />
        )}
      </Suspense>
      <footer className="w-full bg-surface/80 border-t border-line/70 text-center text-muted text-[12px] py-3">
        Made with love by he1kousen
      </footer>
    </>
  );
}

export default App;
