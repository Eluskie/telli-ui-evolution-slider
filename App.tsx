
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  LayoutDashboard,
  Users,
  Phone,
  Activity,
  Bot,
  Smartphone,
  Settings,
  LogOut,
  ChevronDown,
  Copy,
  Edit2,
  Volume2,
  MoreVertical,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  X,
  History,
  Save,
  GripVertical,
  Play,
  PhoneCall,
  Calendar,
  Code,
  Voicemail,
  Plus,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';

// --- Shared Components ---

const Sidebar = memo(({ isNew = false }: { isNew?: boolean }) => (
  <div className={`w-64 h-full border-r flex flex-col flex-shrink-0 transition-colors ${isNew ? 'bg-white border-gray-100' : 'bg-white border-gray-200'}`}>
    <div className="p-6">
      {/* Logo */}
      <div className="w-8 h-8 grid grid-cols-3 gap-0.5 mb-6 opacity-80">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`rounded-full ${i === 4 ? 'bg-black' : 'bg-gray-300'}`} />
        ))}
      </div>

      {/* Tenant Selector */}
      <div className={`flex items-center justify-between border rounded px-3 py-2 text-sm font-medium mb-6 transition-all hover:border-gray-400 cursor-pointer ${isNew ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-gray-50 border-gray-300 text-gray-700'}`}>
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-cyan-500 rounded text-white flex items-center justify-center text-[10px] font-bold">T</div>
          telli_friends
        </span>
        <ChevronDown size={14} className="text-gray-400" />
      </div>
    </div>

    <nav className="flex-1 px-4 space-y-1">
      {[
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: Users, label: 'Contacts' },
        { icon: Phone, label: 'Call history' },
        { icon: Activity, label: 'Live monitoring' },
        { icon: Bot, label: 'Agents', active: true },
        { icon: Smartphone, label: 'Phone Numbers' },
      ].map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${item.active
            ? (isNew ? 'bg-gray-100 text-gray-900' : 'bg-gray-100 text-gray-900')
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
          <item.icon size={18} className={item.active ? 'text-black' : 'text-gray-400'} />
          {item.label}
        </div>
      ))}
    </nav>

    <div className="p-4 border-t border-gray-100 space-y-1">
      <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md cursor-pointer group">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-gray-900">Auto Dialer</span>
        </div>
        <MoreVertical size={16} className="opacity-0 group-hover:opacity-100 text-gray-400" />
      </div>
      <div className="px-3 text-xs text-emerald-600 pl-7 pb-2 font-medium">Enabled</div>

      <div className="mt-4 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer transition-colors">
          <Settings size={18} /> Settings
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer transition-colors">
          <LogOut size={18} /> Logout
        </div>
      </div>
    </div>
  </div>
));

// --- Annotations Component ---

interface Annotation {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
  align?: 'left' | 'right';
}

const AnnotationLayer = memo(({ items, colorClass, alignRight = false }: { items: Annotation[], colorClass: string, alignRight?: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {/* Pulsing Dot */}
          <div className="relative">
            <div className={`w-4 h-4 rounded-full ${colorClass} shadow-lg ring-4 ring-white relative z-10 animate-pulse`}></div>

            {/* Line */}
            <div className={`absolute top-2 ${alignRight ? 'right-2' : 'left-2'} h-px w-16 bg-gray-400/50 origin-left`}></div>

            {/* Card */}
            <div
              className={`absolute top-6 ${alignRight ? 'right-[-250px]' : 'left-8'} w-64 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 transform transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-2`}
              style={{ marginTop: '-10px' }}
            >
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-1 ${colorClass.replace('bg-', 'text-')}`}>{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

// --- OLD UI Component (Legacy Dashboard Style) ---

const OldInterface = memo(() => {
  return (
    <div className="flex h-full w-full bg-[#f8f9fa] text-gray-800 font-['Inter'] overflow-hidden">
      <Sidebar isNew={false} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-gray-300 flex items-center justify-between px-6 bg-white flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              Solar ABCDEF <Edit2 size={16} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium flex items-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors bg-white shadow-sm">
              <Copy size={16} /> Duplicate
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm font-medium hover:bg-gray-700 shadow-sm transition-colors">
              Save
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-[#f8f9fa] p-8">
            <div className="w-full">
              {/* Agent ID */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agent ID</label>
                <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-300 text-gray-600 font-mono text-sm shadow-sm hover:border-gray-400 transition-colors group">
                  79166558-b912-4c1b-b5b0-2c60b80ff99c
                  <Copy size={16} className="cursor-pointer text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>

              {/* System Prompt Box */}
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">System prompt</h3>
                  <p className="text-sm text-gray-600">Fully customize the agent</p>
                </div>
                <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
                  Edit
                </button>
              </div>

              {/* Persona Section */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-5 text-gray-900">Persona</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Persona name</label>
                    <p className="text-xs text-gray-500 mb-2">The name the agent uses to refer to themselves</p>
                    <input
                      type="text"
                      defaultValue="Anna"
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <p className="text-xs text-gray-500 mb-2">The language used by the agent</p>
                    <div className="w-full bg-gray-100 border border-gray-300 rounded-md p-2.5 text-sm text-gray-700">English</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1 border border-gray-300 rounded-md p-2.5 flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-gray-400 transition-colors">
                        <span className="text-sm font-medium text-gray-700"><span className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-xs mr-2 font-mono text-gray-600">en-US</span> Energetic British Female</span>
                        <ChevronDown size={16} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" defaultValue="Hey, nice to meet you. I'm a virtual assistant created by telli." className="flex-1 border border-gray-300 rounded-md p-2.5 text-sm text-gray-600 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                      <button className="border border-gray-300 rounded-md px-4 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
                        <Volume2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background noise</label>
                    <div className="w-full border border-gray-300 rounded-md p-2.5 flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-gray-400 transition-colors">
                      <span className="text-sm text-gray-700">Office</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First message - outgoing call</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 h-28 resize-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-sans"
                      defaultValue="Yes hello, here is {{personaName}} from Solar ABC. Ehm Am I speaking to {{firstName}}?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
});

// --- NEW UI Component (Modern Clean Style) ---

const NewInterface = memo(() => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Script');

  const renderContent = () => {
    switch (activeTab) {
      case 'Identity':
        return (
          <div className="max-w-[1000px] mx-auto w-full px-8 pb-24 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Identity</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white bg-white shadow-sm hover:shadow transition-all">
                <PhoneCall size={14} /> Test call
              </button>
            </div>

            <div className="space-y-8">
              {/* Agent Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-900">Agent name</label>
                <p className="text-xs text-gray-500 mb-2">How agent refers to itself in conversation</p>
                <input
                  type="text"
                  defaultValue="Megan"
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                />
              </div>

              {/* Default Agent Toggle */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-black rounded-full p-1 cursor-pointer flex items-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">Default agent</span>
              </div>

              {/* Agent ID */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-900">Agent ID</label>
                <div className="w-full bg-gray-100 border-none rounded-lg p-2.5 text-sm text-gray-500 font-mono flex items-center justify-between">
                  4b608b07-9b7c-45db-9970-b5717610e27b
                  <Copy size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-900">Language</label>
                <p className="text-xs text-gray-500 mb-2">The language agent undersands</p>
                <div className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 font-medium">
                  German
                </div>
              </div>

              {/* Voice */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-900">Voice</label>
                <p className="text-xs text-gray-500 mb-2">How agent speaks</p>
                <div className="space-y-3">
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors">
                    Southern Bavarian
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue="Hey, this is Megan from Bliss."
                      className="flex-1 bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    />
                    <button className="p-2.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all">
                      <Volume2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Background Noise */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-900">Background noise</label>
                <div className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors">
                  Office
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Actions':
        return (
          <div className="max-w-[1000px] mx-auto w-full px-8 pb-24 animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">What should your Agent be able to do?</h2>
              <p className="text-sm text-gray-500">Select what your agent can actually do beyond just talking - like booking meetings, transferring calls, or checking availability. <span className="text-blue-600 font-medium cursor-pointer">Learn more</span></p>
            </div>

            {/* Before the call */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Before the call</h3>
                  <p className="text-xs text-gray-500">All the task and actions the agent will do before the call</p>
                </div>
                <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700"><Plus size={14} /> Add an action</button>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500"><PhoneCall size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Greetings</h4>
                  <p className="text-xs text-gray-500">Set up the message the agent says</p>
                </div>
              </div>
            </div>

            {/* During the call */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">During the call</h3>
                  <p className="text-xs text-gray-500">All the task and actions the agent will do during the call</p>
                </div>
                <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700"><Plus size={14} /> Add an action</button>
              </div>
              {/* List items with toggles */}
              {[
                { title: 'End call', desc: 'Answer calls from unrecognized numbers.', icon: Phone, active: true },
                { title: 'Transfer call', desc: 'Answer calls from unrecognized numbers.', icon: PhoneCall, active: true },
                { title: 'Get available calendar slots', desc: 'Answer calls from unrecognized numbers.', icon: Code, active: true },
                { title: 'Book a calendar slot', desc: 'Answer calls from unrecognized numbers.', icon: Calendar, active: true },
              ].map(item => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500"><item.icon size={20} /></div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  {/* Toggle Switch */}
                  <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-black' : 'bg-gray-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* After the call */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">After the call</h3>
                  <p className="text-xs text-gray-500">All the task and actions the agent will do after the call</p>
                </div>
                <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700"><Plus size={14} /> Add an action</button>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500"><Voicemail size={20} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Voicemail detection</h4>
                    <p className="text-xs text-gray-500">Answer calls from unrecognized numbers.</p>
                  </div>
                </div>
                <div className="w-11 h-6 bg-black rounded-full p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm translate-x-5"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Call Control':
        return (
          <div className="max-w-[1000px] mx-auto w-full px-8 pb-24 animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Start of the call</h2>
              <p className="text-sm text-gray-500">What the agent says on the start of the call depending on the type. <span className="text-blue-600 font-medium cursor-pointer">Learn more</span></p>
            </div>

            <div className="space-y-6 mb-12">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Inbound first message</label>
                <div className="w-full h-32 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all cursor-text">
                  Hey <span className="text-purple-600 bg-purple-50 px-1 rounded font-medium">{`{{firstName}}`}</span>, this is Megan from Bliss. How are you doing today?
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Outbound first message</label>
                <div className="w-full h-32 bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-900 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all cursor-text">
                  Hey <span className="text-purple-600 bg-purple-50 px-1 rounded font-medium">{`{{firstName}}`}</span>, this is Megan from Bliss. How are you doing today?
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Auto Dialer</h2>
              <p className="text-sm text-gray-500 mb-6 max-w-2xl">When a contact isn't reached, the system will retry based on your configured calling strategy until either the contact is reached or the maximum number of attempts/days is exceeded. <span className="text-blue-600 font-medium cursor-pointer">Learn more</span></p>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Calling strategy</label>
              </div>
            </div>
          </div>
        );

      case 'Outcomes':
        return (
          <div className="max-w-[1000px] mx-auto w-full px-8 pb-24 animate-in fade-in duration-300">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">What should we remember from each call?</h2>
              <p className="text-sm text-gray-500">Select the customer details you want to capture automatically. We'll save this information and notify your team after each conversation. <span className="text-blue-600 font-medium cursor-pointer">Learn more</span></p>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Data to extract</h3>
                <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700"><Plus size={14} /> Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Action required', 'Appointment', 'Follow-up', 'Summary', 'Loss reason'].map(tag => (
                  <div key={tag} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Notification emails</h3>
                  <p className="text-xs text-gray-500">Where agent sends notifications</p>
                </div>
                <button className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700"><Plus size={14} /> Add</button>
              </div>
              <div className="space-y-3">
                {['finn@telli.com', 'seb@telli.com', 'philipp@telli.com'].map(email => (
                  <div key={email} className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm text-gray-900 flex items-center justify-between hover:border-gray-300 transition-colors group">
                    {email}
                    <X size={16} className="text-gray-400 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Script':
      default:
        return (
          <div className="max-w-[1000px] mx-auto w-full px-8">
            {/* Script Editor Card */}
            <div className="border border-gray-200 rounded-xl p-8 mb-24 shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white hover:border-gray-300 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex gap-2 mb-8 border-b border-gray-100 pb-4 overflow-x-auto">
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 rounded transition-colors">B</button>
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-900 bg-gray-100 rounded">H1</button>
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 rounded transition-colors">H2</button>
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 rounded transition-colors">H3</button>
                <div className="w-px bg-gray-200 h-5 my-auto mx-2"></div>
                <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <div className="scale-x-[-1]"><MessageSquare size={16} /></div>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <LayoutDashboard size={16} />
                </button>
              </div>

              <div className="prose prose-sm max-w-none font-['Inter']">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Anna's Base Personality Layer</h2>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Core Communication Style</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">You communicate with a professional yet approachable tone. Your responses are:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8 marker:text-gray-400">
                  <li><span className="font-semibold text-gray-900">Concise and direct</span> - Get to the point without unnecessary filler</li>
                  <li><span className="font-semibold text-gray-900">Clear and easy to understand</span> - Use simple language, avoid jargon</li>
                  <li><span className="font-semibold text-gray-900">Confident but not pushy</span> - State information with certainty while remaining respectful</li>
                  <li><span className="font-semibold text-gray-900">Conversational</span> - <span className="bg-red-100 text-red-800 px-1 rounded">Sound natural and</span> <span className="bg-emerald-100 text-emerald-800 px-1 rounded">human-like, not robotic</span></li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Basic Personality Traits</h3>
                <p className="text-gray-600 mb-3">You embody these fundamental characteristics:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6 marker:text-gray-400">
                  <li><strong className="text-gray-900">Helpful</strong> - Genuinely focused on assisting the user</li>
                  <li><strong className="text-gray-900">Patient</strong> - Remain calm even when users are confused or repeat themselves</li>
                  <li><strong className="text-gray-900">Reliable</strong> - Consistent in your responses and behavior</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-white text-gray-900 font-['Inter'] overflow-hidden">
      <Sidebar isNew={true} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* New Header */}
        <header className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-800 transition-colors">
              <ArrowLeft size={16} />
            </button>
            <span className="hover:text-gray-800 cursor-pointer transition-colors">Agents</span>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-900">Anna Solar 123</span>
          </div>
          <button className="text-gray-400 hover:text-gray-800 p-2 rounded hover:bg-gray-50 transition-colors">
            <X size={20} />
          </button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Center Canvas */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] border-r border-gray-100 relative">

            {/* Scrollable Content Wrapper */}
            <div className="flex-1 overflow-y-auto no-scrollbar">

              {/* Agent Header - Centered Column */}
              <div className="pt-10 px-8">
                <div className="flex flex-col items-center gap-3 mb-8">
                  <div className="w-16 h-16 bg-[#D1F298] rounded-full flex items-center justify-center text-2xl font-semibold text-[#3F6212] shadow-sm">A</div>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-gray-900">
                      Anna <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">Live</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">English voice</p>
                  </div>
                </div>

                <div className="bg-blue-50/40 border border-blue-100 rounded-md p-2.5 mb-8 flex items-center justify-center text-[11px] font-semibold text-gray-600 tracking-wide w-fit mx-auto px-6">
                  <span className="text-blue-600">5-question qualification flow</span>
                  <span className="mx-3 text-gray-400">→</span>
                  <span>appointment scheduling</span>
                  <span className="mx-3 text-gray-400">→</span>
                  <span>confirmation</span>
                </div>

                {/* Tabs - Centered */}
                <div className="flex items-center gap-1 bg-gray-50/80 p-1 rounded-lg w-fit mx-auto mb-8 border border-gray-100">
                  {['Script', 'Identity', 'Actions', 'Outcomes', 'Call Control'].map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-[6px] text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-gray-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC CONTENT */}
              {renderContent()}

            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-white z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
              <div className="max-w-[1000px] mx-auto w-full px-8 py-4 flex items-center justify-between">
                <div className="text-xs text-gray-400 italic font-medium">Last changes saved 1 h ago</div>
                <div className="flex items-center gap-4 text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
                  <History size={16} /> Restore Version <ChevronDown size={14} />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-2"
                  >
                    {isChatOpen ? (
                      <>
                        <LogOut size={16} className="rotate-180" /> Close Chat
                      </>
                    ) : (
                      <>
                        <MessageSquare size={16} /> Open Chat
                      </>
                    )}
                  </button>
                  <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2 shadow-sm">
                    <Save size={16} /> Save & Publish
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* New Right Panel - Chat */}
          <aside className={`bg-[#fcfcfc] border-gray-200 flex flex-col shadow-[inset_4px_0_24px_-12px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isChatOpen ? 'w-[420px] border-l opacity-100' : 'w-0 border-l-0 opacity-0'}`}>
            <div className="w-[420px] h-full flex flex-col">
              <div className="p-4 border-b border-gray-100 bg-white shadow-sm z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">AI</div>
                  <span className="text-sm font-medium text-gray-900">Hi! how can I help you today?</span>
                  <button className="ml-auto text-gray-400 hover:text-gray-600" onClick={() => setIsChatOpen(false)}><X size={16} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="flex justify-end">
                  <div className="bg-[#E0F2FE] text-[#0C4A6E] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[90%] shadow-sm leading-relaxed">
                    I'd like to know how to change the tone
                  </div>
                </div>

                {/* Feedback Item */}
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">Title name of the feedback</h4>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-600 mb-5 leading-relaxed">
                    können Sie Ihr Sky-Erlebnis erweitern: Es kombiniert die Inhalte von Sky Entertainment mit einem Netflix Standard-Abo. Das heißt, Sie können sowohl exklusive Sky-Inhalte als auch alle Netflix-Serien und Filme...
                  </div>

                  <div className="flex gap-3 items-start mb-4 group">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-700 flex-1 leading-relaxed">
                      Ja, ich, Entschuldigung, da hätt ich gleich eine Frage.
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">MS</div>
                  </div>

                  <div className="flex gap-3 items-start mb-2 group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">AI</div>
                    <div className="border border-blue-200 border-dashed rounded-2xl rounded-bl-sm p-3 text-sm text-gray-800 bg-white flex-1 leading-relaxed relative">
                      Natürlich, gerne! Ähm, was möchten Sie wissen?
                    </div>
                  </div>

                  <div className="flex justify-center my-3">
                    <button className="text-[11px] font-medium text-gray-400 flex items-center gap-1.5 hover:text-gray-600 transition-colors bg-white px-2 py-1 rounded-full border border-transparent hover:border-gray-200">
                      Collapse Call history <ChevronDown size={12} className="rotate-180" />
                    </button>
                  </div>

                  <div className="bg-gray-100/80 rounded-lg p-3.5 text-sm font-medium text-gray-800 leading-snug">
                    Agent asks if they should transfer sales and not mention other departments
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-emerald-600 text-xs font-medium bg-emerald-50 py-1.5 rounded-full w-fit mx-auto px-4">
                  <CheckCircle2 size={14} />
                  <span>Succesful after 5 Attempts</span>
                </div>

                <p className="text-sm text-gray-600 px-2 text-center leading-relaxed">
                  Great news! Your feedback has been successfully applied. <br /> Check the script to Accept or Reject the Feedback applied
                </p>

              </div>

              <div className="p-4 bg-white border-t border-gray-200 space-y-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] z-20">
                <div className="border border-blue-100 bg-blue-50/30 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-2.5 text-sm font-medium text-blue-600">
                    <Edit2 size={14} className="group-hover:scale-110 transition-transform" /> Suggested Tests Based on Feedback
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">3</span>
                </div>
                <div className="border border-gray-200 rounded-lg p-2.5 flex items-center justify-between bg-white shadow-sm">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"><div className="rotate-45"><Bot size={18} /></div></button>
                  <span className="text-xs text-gray-400 font-medium select-none">Accept or Reject Feedback to continue</span>
                  <div className="w-8 h-8 rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
});


// --- MAIN SLIDER LOGIC ---

export default function App() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define Annotations for Old UI
  const oldAnnotations: Annotation[] = [
    { id: '1', x: 25, y: 35, title: 'Manual Config', description: 'Settings were scattered in raw form fields without logical grouping.' },
    { id: '2', x: 60, y: 40, title: 'Limited Context', description: 'System prompt was a rigid text block with no visual flow or hierarchy.' }
  ];

  // Define Annotations for New UI
  const newAnnotations: Annotation[] = [
    { id: '3', x: 50, y: 30, title: 'Visual Flow', description: 'Clear process mapping shows the agents journey at a glance.', align: 'right' },
    { id: '4', x: 80, y: 50, title: 'Interactive Assistant', description: 'Real-time AI feedback loop helps refine the agent instantly.' }
  ];

  const handleMove = useCallback((clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault(); // Prevent text selection during drag
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMove]);

  return (
    <div className="w-full h-screen overflow-hidden bg-transparent flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-center p-8 font-['Inter'] gap-6"
        style={{ width: '142.85%', height: '142.85%', transform: 'scale(0.7)', transformOrigin: 'center' }}
      >

        {/* Toggle Controls */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Design Notes</span>
          <button
            onClick={() => setShowAnnotations(!showAnnotations)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${showAnnotations ? 'bg-indigo-600' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showAnnotations ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          {showAnnotations ? <Eye size={16} className="text-indigo-600 ml-1" /> : <EyeOff size={16} className="text-gray-400 ml-1" />}
        </div>

        {/* Landing Page Card Component */}
        <div className="relative w-full max-w-[1400px] h-[850px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

          {/* Slider Container */}
          <div ref={containerRef} className="relative w-full h-full group">

            {/* New UI (Right Side / Background) */}
            <div className="absolute inset-0 w-full h-full bg-white z-0">
              <NewInterface />
              {showAnnotations && <AnnotationLayer items={newAnnotations} colorClass="bg-indigo-500" alignRight={true} />}
            </div>

            {/* Old UI (Left Side / Foreground) - Clipped - INCREASED Z-INDEX to 40 - REMOVED TRANSITION */}
            <div
              className="absolute inset-0 w-full h-full bg-white z-40"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <OldInterface />
              {showAnnotations && <AnnotationLayer items={oldAnnotations} colorClass="bg-rose-500" />}
            </div>

            {/* Slider Handle - now has the event listeners */}
            <div
              className="absolute top-0 bottom-0 w-8 -ml-4 cursor-ew-resize z-50 flex justify-center touch-none select-none"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Visual Line */}
              <div className="w-[2px] h-full bg-black shadow-[12px_0_40px_-4px_rgba(0,0,0,0.6)] relative">
                {/* Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center border border-gray-200 text-gray-600 hover:scale-110 hover:text-blue-600 transition-all">
                  <GripVertical size={20} />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className={`absolute top-6 left-6 bg-black/80 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md z-50 pointer-events-none transition-opacity duration-300 ${sliderPosition < 10 ? 'opacity-0' : 'opacity-100'}`}>
              Legacy Dashboard
            </div>
            <div className={`absolute top-6 right-6 bg-blue-600/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md z-50 pointer-events-none transition-opacity duration-300 ${sliderPosition > 90 ? 'opacity-0' : 'opacity-100'}`}>
              New Workspace
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
