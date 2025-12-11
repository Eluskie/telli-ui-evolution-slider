import React, { useState, useEffect, useRef } from 'react';
import { X, Paperclip, ArrowUp, Star, ChevronRight, Play } from 'lucide-react';
import { FeedbackCard } from './FeedbackCard';
import { FeedbackList } from './FeedbackList';
import { Avatar } from './Avatar';
import { ChatMessage, FeedbackAction, FeedbackItem, TranscriptMessage } from '../types';

// --- DATA MOCKING ---

const MOCK_TRANSCRIPT: TranscriptMessage[] = [
    {
        id: 't1',
        sender: 'AI',
        text: 'können Sie Ihr Sky-Erlebnis erweitern: Es kombiniert die Inhalte von Sky Entertainment mit einem Netflix Standard-Abo.'
    },
    {
        id: 't2',
        sender: 'User',
        text: 'Ja, ich, Entschuldigung, da hätt ich gleich eine Frage.'
    },
    {
        id: 't3',
        sender: 'AI',
        text: 'Natürlich, gerne! Ähm, was möchten Sie wissen?',
        isFocus: true
    }
];

const SUGGESTED_ITEMS: FeedbackItem[] = [
    {
        id: 'f1',
        number: 1,
        title: 'Tone Adjustment',
        description: 'Rewrite the greetings part to act more uplifted.',
        transcript: MOCK_TRANSCRIPT
    },
    {
        id: 'f2',
        number: 2,
        title: 'Clarity Check',
        description: 'Simplify the explanation of the Sky Entertainment package.',
    },
    {
        id: 'f3',
        number: 3,
        title: 'Empathy Boost',
        description: 'Acknowledge the users interruption more gracefully.',
    }
];

// Start with a clean state
const INITIAL_MESSAGES: ChatMessage[] = [
    { id: '1', sender: 'System', text: 'Hi! I\'m Telli. How can I help you improve your agent today?' },
];

export const TelliWidget: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
    // Auto scroll to bottom
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'User', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Logic
        setTimeout(() => {
            setIsTyping(false);
            
            // If user mentions "tone", "fix", "change", show the list
            if (input.toLowerCase().match(/(tone|fix|change|feedback|improve)/)) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    sender: 'System',
                    component: 'FeedbackList',
                    data: SUGGESTED_ITEMS
                }]);
            } else {
                 setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    sender: 'System',
                    text: "I can help you analyze conversations or suggest improvements. Try asking 'Show me feedback on the tone' or 'How can I fix this?'"
                }]);
            }
        }, 1200);
    };

    const handleTryFix = (item: FeedbackItem) => {
        setIsTyping(true);
        
        // Simulate "Thinking" time before showing the card
        setTimeout(() => {
            setIsTyping(false);
            const cardData: FeedbackAction = {
                id: item.id,
                title: item.title,
                description: item.description,
                transcript: item.transcript || MOCK_TRANSCRIPT,
                status: 'pending'
            };

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'System',
                component: 'FeedbackCard',
                data: cardData
            }]);
        }, 1000);
    };

    const handleTestClick = (testName: string) => {
        setInput(`Run ${testName}`);
    };

    return (
        <div className="relative w-full max-w-[500px] h-[85vh] max-h-[900px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 ring-8 ring-gray-50/50">
            {/* Header / Close Button */}
            <div className="absolute top-8 right-8 z-10 cursor-pointer text-gray-400 hover:text-gray-800 transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-full">
                <X size={20} />
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-6 pt-20">
                {/* 
                    pb-48 ensures content isn't hidden behind the floating input even when accordion is open.
                    min-h-full + justify-end keeps messages at the bottom.
                */}
                <div className="min-h-full flex flex-col justify-end space-y-8 pb-48">
                    {messages.map((msg) => {
                        if (msg.component === 'FeedbackList') {
                            return (
                                <div key={msg.id} className="animate-in slide-in-from-bottom-5 duration-500 fade-in fill-mode-forwards">
                                    <FeedbackList items={msg.data} onTryFix={handleTryFix} />
                                </div>
                            )
                        }

                        if (msg.component === 'FeedbackCard') {
                            return (
                                <div key={msg.id} className="animate-in slide-in-from-bottom-5 duration-500 fade-in fill-mode-forwards pl-2">
                                    <FeedbackCard data={msg.data} />
                                </div>
                            );
                        }

                        return (
                            <div 
                                key={msg.id} 
                                className={`flex gap-4 ${msg.sender === 'User' ? 'justify-end' : 'justify-start items-end'}`}
                            >
                                {msg.sender === 'System' && <Avatar />}
                                
                                <div className={`
                                    max-w-[80%] p-3.5 px-5 text-[15px] leading-relaxed shadow-sm
                                    ${msg.sender === 'User' 
                                        ? 'bg-[#EAF4FF] text-gray-900 rounded-2xl rounded-tr-sm font-medium' 
                                        : 'text-gray-800 font-normal bg-white border border-gray-100 rounded-2xl rounded-tl-sm'}
                                `}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    
                    {isTyping && (
                         <div className="flex gap-4 justify-start items-end">
                            <Avatar />
                            <div className="bg-white border border-gray-100 p-4 px-5 rounded-2xl rounded-tl-sm shadow-sm">
                                <div className="flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section: Floating Input + Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pt-10">
                
                {/* Suggestions Accordion */}
                <div className="mb-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white z-20 relative">
                    <button 
                        onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}
                        className="w-full flex items-center justify-between p-3.5 px-5 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-2.5">
                            <Star size={16} className="text-purple-500" />
                            <span className="text-sm font-medium text-gray-700">Quality Assurance Checks</span>
                            <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-1.5 py-0.5 rounded">3</span>
                        </div>
                        <ChevronRight size={16} className={`text-gray-400 transition-transform duration-300 ${isSuggestionsOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <div className={`
                        transition-all duration-300 ease-in-out bg-gray-50
                        ${isSuggestionsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        <div className="p-2 space-y-1">
                            {['Tone Consistency', 'Brand Safety', 'Grammar & Syntax'].map((test, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleTestClick(test)}
                                    className="w-full flex items-center justify-between p-2.5 px-4 hover:bg-white rounded-lg cursor-pointer group transition-colors text-left"
                                >
                                    <span className="text-xs text-gray-600 font-medium group-hover:text-purple-600 transition-colors">
                                        <span className="opacity-40 mr-2">Run test</span> 
                                        {test}
                                    </span>
                                    <Play size={10} className="text-gray-300 group-hover:text-purple-500 fill-current" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Input Area */}
                <div className="relative border border-gray-200 rounded-[2rem] bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-shadow shadow-lg shadow-gray-100/50">
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Telli to improve the agent..."
                        className="w-full h-[5.5rem] p-5 pb-12 resize-none outline-none text-gray-700 placeholder-gray-400 bg-transparent rounded-[2rem] text-[15px] no-scrollbar"
                    />
                    
                    <div className="absolute bottom-3 left-5">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                            <Paperclip size={20} />
                        </button>
                    </div>

                    <div className="absolute bottom-3 right-4">
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                ${input.trim() ? 'bg-black hover:bg-gray-800 shadow-md translate-y-0 scale-100' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
                            `}
                        >
                            <ArrowUp size={20} className={input.trim() ? 'text-white' : 'text-gray-300'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};