import React from 'react';
import { TelliWidget } from './components/TelliWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* 
        This is the requested layout:
        A minimalistic background with the component centered.
        The component itself is self-contained in TelliWidget.
      */}
      <TelliWidget />
    </div>
  );
};

export default App;