import React from 'react';
import { Zap } from 'lucide-react';
import { FeedbackItem } from '../types';

interface FeedbackListProps {
  items: FeedbackItem[];
  onTryFix: (item: FeedbackItem) => void;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ items, onTryFix }) => {
  return (
    <div className="w-full space-y-4 my-2 pl-1">
        <div className="flex items-center gap-2 mb-3 px-1">
            <div className="bg-blue-50 p-1 rounded-md">
                <Zap size={14} className="text-blue-500 fill-blue-500" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Suggested Prompt Feedback</span>
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{items.length}</span>
        </div>

        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center group">
                    <div className="flex items-start gap-4">
                        <span className="text-xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">#{item.number}</span>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => onTryFix(item)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all active:scale-95 whitespace-nowrap shadow-sm"
                    >
                        Try fix
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};