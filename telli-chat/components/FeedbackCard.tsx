import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { FeedbackAction } from '../types';
import { Avatar } from './Avatar';

interface FeedbackCardProps {
  data: FeedbackAction;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Open by default for better visibility
  const [status, setStatus] = useState(data.status);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // Local state for transcript so we can modify it
  const [transcript, setTranscript] = useState(data.transcript);

  const handleRun = async () => {
    setStatus('fixing');
    setAttemptCount(prev => prev + 1);
    
    // Simulate API delay
    setTimeout(() => {
        // ACTUAL LOGIC: Update the transcript to be "uplifted"
        const updatedTranscript = transcript.map(msg => {
            if (msg.sender === 'AI' && msg.isFocus) {
                return {
                    ...msg,
                    text: "Fantastisch! Ich helfe Ihnen unglaublich gerne weiter. Worüber möchten Sie sprechen?"
                };
            }
            return msg;
        });
        
        setTranscript(updatedTranscript);
        setStatus('fixed');
    }, 2000);
  };

  const handleIgnore = () => {
    setStatus('ignored');
  };

  const handleReset = () => {
      setTranscript(data.transcript);
      setStatus('pending');
  };

  return (
    <div className="mt-2 mb-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-lg transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-gray-900">{data.title}</h3>
          
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
             >
                <span className="text-[10px] bg-gray-50 px-2 py-1 rounded border border-gray-100 flex items-center gap-1 font-medium text-gray-500">
                    {isExpanded ? 'Collapse' : 'Expand'}
                    {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </span>
             </button>
          </div>
        </div>
        
        {/* Instruction Label */}
        <div className="mb-4 text-xs text-gray-500">
            Click "Run it" below to apply this suggestion.
        </div>

        {/* Action Box */}
        <div className="bg-gray-50 rounded-xl p-4 text-sm font-medium text-gray-800 mb-4 border border-gray-100/50">
            {data.description}
        </div>

        {/* Collapsible Transcript Area */}
        <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <div className="space-y-4 pb-4 pl-1 pr-1 border-l-2 border-gray-100 ml-2 my-2">
                {transcript.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 pl-3 ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender !== 'User' && <Avatar type="agent" />}
                            
                            <div className={`
                            relative p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm
                            ${msg.sender === 'User' ? 'bg-blue-50 text-gray-800 rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}
                            ${msg.isFocus ? 'ring-2 ring-dashed ring-blue-300 ring-offset-2 transition-all duration-500' : ''}
                            ${status === 'fixed' && msg.isFocus ? 'bg-green-50 ring-green-300 border-green-100' : ''}
                            `}>
                            {msg.text}
                            </div>

                            {msg.sender === 'User' && <Avatar type="user" />}
                    </div>
                ))}
            </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-2 flex items-center justify-center min-h-[40px] pt-4 border-t border-gray-50">
            {status === 'pending' && (
                <div className="flex gap-6 animate-in fade-in duration-300">
                    <button 
                        onClick={handleRun}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                        <Check size={16} className="text-green-500" />
                        Run it
                    </button>
                    <button 
                        onClick={handleIgnore}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                        <X size={16} className="text-red-500" />
                        Ignore for now
                    </button>
                </div>
            )}

            {status === 'fixing' && (
                <div className="flex items-center gap-2 text-gray-500 text-sm animate-pulse">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                    <span>Attempt Fixing</span>
                    <span className="text-gray-400">({attemptCount})</span>
                </div>
            )}

            {status === 'fixed' && (
                <div className="flex items-center gap-4 animate-in zoom-in duration-300">
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <Check size={16} />
                        <span>Fixed!</span>
                    </div>
                    <button 
                        onClick={handleReset} 
                        className="text-xs text-gray-400 underline hover:text-gray-600"
                    >
                        Undo
                    </button>
                </div>
            )}

            {status === 'ignored' && (
                <div className="flex items-center gap-3">
                    <div className="text-gray-400 text-sm italic">Feedback ignored</div>
                    <button onClick={handleReset} className="p-1 hover:bg-gray-100 rounded-full text-gray-400"><RefreshCw size={12}/></button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};