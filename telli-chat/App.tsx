import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TelliWidget } from './components/TelliWidget';

interface Annotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  align?: 'left' | 'right';
}

const AnnotationLayer: React.FC<{ items: Annotation[], colorClass: string }> = ({ items, colorClass }) => {
  const leftItems = items.filter(item => item.align === 'left');
  const rightItems = items.filter(item => item.align === 'right');

  return (
    <>
      {/* Left side annotations */}
      <div className="absolute left-[-320px] top-0 flex flex-col gap-8 justify-center h-full">
        {leftItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="w-64 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${colorClass.replace('bg-', 'text-')}`}>{item.title}</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium">{item.description}</p>
            </div>
            <img src="/chat/arrow-down-right.svg" alt="arrow" className="flex-shrink-0 w-[90px]" />
          </div>
        ))}
      </div>

      {/* Right side annotations */}
      <div className="absolute right-[-320px] top-0 flex flex-col gap-8 justify-center h-full">
        {rightItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <img src="/chat/arrow-down-left.svg" alt="arrow" className="flex-shrink-0 w-[65px]" />
            <div className="w-64 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${colorClass.replace('bg-', 'text-')}`}>{item.title}</h4>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [showAnnotations, setShowAnnotations] = useState(false);

  const annotations: Annotation[] = [
    {
      id: '1',
      x: 5,
      y: 20,
      title: 'Clear Hierarchy',
      description: 'Before: no messaging structure. Now: distinct feedback types with visual separation.',
      align: 'left'
    },
    {
      id: '2',
      x: 95,
      y: 35,
      title: 'Feedback Types',
      description: 'Before: confusing action flows. Now: agent feedback, user feedback, and evaluations are clearly separated.',
      align: 'right'
    },
    {
      id: '3',
      x: 5,
      y: 55,
      title: 'Conversation Tracking',
      description: 'Before: no prompt change history. Now: system prompt changes are tracked with conversation context.',
      align: 'left'
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4 gap-6">
      {/* Toggle Controls */}
      <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200 z-50">
        <span className="text-sm font-semibold text-gray-700">Design Notes</span>
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${showAnnotations ? 'bg-indigo-600' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showAnnotations ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        {showAnnotations ? <Eye size={16} className="text-indigo-600 ml-1" /> : <EyeOff size={16} className="text-gray-400 ml-1" />}
      </div>

      {/* Widget with Annotations */}
      <div className="relative inline-block">
        <TelliWidget />
        {showAnnotations && <AnnotationLayer items={annotations} colorClass="bg-indigo-500" />}
      </div>
    </div>
  );
};

export default App;