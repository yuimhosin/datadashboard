import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Database, 
  TrendingUp, 
  HeartPulse, 
  MessageSquare, 
  ChevronRight, 
  ExternalLink, 
  Search,
  AlertCircle,
  Globe,
  BarChart3,
  MapPin,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';
import { DATA_SOURCES, COMPLIANCE_PATHS, DataSource } from './constants';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      active 
        ? "bg-zinc-900 text-white" 
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);

const Card = ({ children, className, title, subtitle }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <div className={cn("bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm", className)}>
    {(title || subtitle) && (
      <div className="px-6 py-4 border-bottom border-zinc-100">
        {title && <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>}
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// --- Sections ---

const Dashboard = () => {
  const tradeData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const agingData = [
    { name: '60-70', value: 45 },
    { name: '70-80', value: 30 },
    { name: '80+', value: 25 },
  ];

  const COLORS = ['#18181b', '#3f3f46', '#71717a'];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">Strategic Overview</h1>
        <p className="text-zinc-500">Global Data Governance & Industry Intelligence</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Global Trade Flow" subtitle="Monthly Volume (Index)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Aging Demographics" subtitle="Population Distribution (%)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Compliance Status" subtitle="Active Regulations Monitor">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="text-sm font-medium">CAC 2024 Compliance</span>
              </div>
              <span className="text-xs font-bold uppercase">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">US Data Export Rule</span>
              </div>
              <span className="text-xs font-bold uppercase">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <span className="text-sm font-medium">EU GDPR Adequacy</span>
              </div>
              <span className="text-xs font-bold uppercase">Stable</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Research Insights" className="lg:col-span-2">
          <div className="prose prose-zinc max-w-none">
            <p className="text-zinc-600">
              The transition from "Digitalization" to "Intelligence" is driven by public data assetization. 
              Key findings suggest that AI can unlock over $7 trillion in global economic value annually, 
              with significant impact in advanced manufacturing and elderly care.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-zinc-100 rounded-lg">
                <h4 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <TrendingUp size={16} /> Trade Revolution
                </h4>
                <p className="text-sm text-zinc-500 mt-1">AI-driven entity matching and supply chain mapping are reducing trade friction by 25%.</p>
              </div>
              <div className="p-4 border border-zinc-100 rounded-lg">
                <h4 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <HeartPulse size={16} /> Precision Care
                </h4>
                <p className="text-sm text-zinc-500 mt-1">Integrating demographic data with AI enables 38% better risk intervention in elderly care.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ComplianceHub = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">Compliance Navigator</h1>
        <p className="text-zinc-500">CAC Data Export Regulations (2024-2025)</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card title="Regulatory Framework" subtitle="Pathways to Compliance">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">Data Type</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">Threshold</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">Requirement</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">Description</th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_PATHS.map((path) => (
                  <tr key={path.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-zinc-900">{path.type}</td>
                    <td className="py-4 px-4 text-sm text-zinc-600">{path.threshold}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        path.requirement === 'Exempt' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"
                      )}>
                        {path.requirement}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-zinc-500">{path.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Exemption Scenarios" subtitle="Commercial Contexts">
            <ul className="space-y-3">
              {[
                "Cross-border shopping & delivery",
                "International money transfers",
                "Flight & hotel bookings",
                "Visa processing services",
                "Cross-border HR management"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                  <ChevronRight size={14} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="FTZ Negative List" subtitle="Free Trade Zone Benefits">
            <p className="text-sm text-zinc-600 mb-4">
              Areas like Beijing, Shanghai, and Guangdong have implemented "Negative Lists". Data outside these lists can flow freely within the zone.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Automotive', 'Medicine', 'Retail', 'Civil Aviation', 'Reinsurance'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DataExplorer = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Trade', 'Economy', 'Demographics', 'Health'];

  const filteredSources = filter === 'All' 
    ? DATA_SOURCES 
    : DATA_SOURCES.filter(s => s.category === filter);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">Global Data Explorer</h1>
        <p className="text-zinc-500">Curated High-Quality Public Data Sources</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap",
              filter === cat 
                ? "bg-zinc-900 text-white" 
                : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSources.map(source => (
          <Card key={source.id} className="group hover:border-zinc-900 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{source.category}</span>
                <h3 className="text-xl font-bold text-zinc-900 mt-1">{source.name}</h3>
                <p className="text-sm text-zinc-500">{source.provider}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-zinc-900">{source.qualityScore}</span>
                <span className="text-[10px] font-bold uppercase text-zinc-400">Quality</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 mb-6 line-clamp-2">{source.description}</p>
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:underline"
            >
              Access Data <ExternalLink size={14} />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};

const IndustrySolutions = () => {
  const [activeTab, setActiveTab] = useState<'trade' | 'elderly'>('trade');

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">Industry Solutions</h1>
        <p className="text-zinc-500">AI-Driven Applications for Trade & Care</p>
      </header>

      <div className="flex border-b border-zinc-100">
        <button
          onClick={() => setActiveTab('trade')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'trade' ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400"
          )}
        >
          Global Trade & Logistics
        </button>
        <button
          onClick={() => setActiveTab('elderly')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'elderly' ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400"
          )}
        >
          Elderly Care & Demographics
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'trade' ? (
          <motion.div
            key="trade"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card title="Supply Chain Mapping" className="lg:col-span-2">
              <div className="aspect-video bg-zinc-50 rounded-lg flex items-center justify-center border border-dashed border-zinc-200">
                <div className="text-center">
                  <Globe className="mx-auto text-zinc-300 mb-2" size={48} />
                  <p className="text-sm text-zinc-400">Interactive Trade Route Visualization</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 rounded-lg">
                  <div className="text-xs font-bold text-zinc-400 uppercase mb-1">Entity Matching</div>
                  <div className="text-lg font-bold text-zinc-900">95% Accuracy</div>
                </div>
                <div className="p-4 bg-zinc-50 rounded-lg">
                  <div className="text-xs font-bold text-zinc-400 uppercase mb-1">Risk Detection</div>
                  <div className="text-lg font-bold text-zinc-900">Real-time</div>
                </div>
              </div>
            </Card>
            <Card title="Trade Intelligence" subtitle="Platform Comparison">
              <div className="space-y-4">
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">Panjiva (S&P Global)</div>
                  <div className="text-xs text-zinc-500 mt-1">Best for deep entity matching and supply chain mapping.</div>
                </div>
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">ImportGenius</div>
                  <div className="text-xs text-zinc-500 mt-1">Best for US market penetration and ease of use.</div>
                </div>
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">Tendata (China)</div>
                  <div className="text-xs text-zinc-500 mt-1">Best for sales automation and CRM integration.</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="elderly"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card title="Site Selection Assistant" className="lg:col-span-2">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <MapPin className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">Aging Index</div>
                    <div className="text-xl font-bold">High</div>
                  </div>
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <TrendingUp className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">Disposable Income</div>
                    <div className="text-xl font-bold">$12k/yr</div>
                  </div>
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <HeartPulse className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">Medical Density</div>
                    <div className="text-xl font-bold">3.2/km²</div>
                  </div>
                </div>
                <div className="h-48 bg-zinc-50 rounded-lg flex items-center justify-center border border-dashed border-zinc-200">
                  <p className="text-sm text-zinc-400">Demographic Heatmap Visualization</p>
                </div>
              </div>
            </Card>
            <Card title="Care AI Modules" subtitle="Operational Efficiency">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Demand Forecasting</div>
                    <p className="text-xs text-zinc-500">Predicting bed occupancy and staffing needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <AlertCircle size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Fall Risk Detection</div>
                    <p className="text-xs text-zinc-500">AI behavioral analysis for early intervention.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <FileText size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Personalized Rehab</div>
                    <p className="text-xs text-zinc-500">Dynamic recovery plans based on health data.</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AIResearchAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMsg].map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
        config: {
          systemInstruction: "You are a strategic data governance and industry research assistant. You have deep knowledge of global public data, CAC data export regulations, and AI applications in trade and elderly care. Provide professional, data-driven insights based on the user's queries."
        }
      });

      const response = await model;
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I couldn't generate a response." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">Research Assistant</h1>
        <p className="text-zinc-500">AI-Powered Strategic Insights</p>
      </header>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>Ask me about data compliance, trade intelligence, or elderly care strategies.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={cn(
              "flex flex-col max-w-[80%]",
              msg.role === 'user' ? "ml-auto items-end" : "items-start"
            )}>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm",
                msg.role === 'user' ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-900"
              )}>
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-zinc-400 text-sm italic">
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              AI is thinking...
            </div>
          )}
        </div>
        <div className="p-4 border-t border-zinc-100 bg-zinc-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your research query..."
              className="flex-1 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'compliance' | 'explorer' | 'industry' | 'ai'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'compliance': return <ComplianceHub />;
      case 'explorer': return <DataExplorer />;
      case 'industry': return <IndustrySolutions />;
      case 'ai': return <AIResearchAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex text-zinc-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-zinc-200 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Database size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">DataStrat</span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')} 
          />
          <SidebarItem 
            icon={ShieldCheck} 
            label="Compliance Hub" 
            active={activeSection === 'compliance'} 
            onClick={() => setActiveSection('compliance')} 
          />
          <SidebarItem 
            icon={Database} 
            label="Data Explorer" 
            active={activeSection === 'explorer'} 
            onClick={() => setActiveSection('explorer')} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="Industry Solutions" 
            active={activeSection === 'industry'} 
            onClick={() => setActiveSection('industry')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Research AI" 
            active={activeSection === 'ai'} 
            onClick={() => setActiveSection('ai')} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-100">
          <div className="p-4 bg-zinc-50 rounded-xl">
            <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-zinc-600">All Systems Operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-zinc-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database size={20} />
          <span className="font-bold">DataStrat</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
          >
            <nav className="space-y-4">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={activeSection === 'dashboard'} 
                onClick={() => { setActiveSection('dashboard'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={ShieldCheck} 
                label="Compliance Hub" 
                active={activeSection === 'compliance'} 
                onClick={() => { setActiveSection('compliance'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={Database} 
                label="Data Explorer" 
                active={activeSection === 'explorer'} 
                onClick={() => { setActiveSection('explorer'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={TrendingUp} 
                label="Industry Solutions" 
                active={activeSection === 'industry'} 
                onClick={() => { setActiveSection('industry'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={MessageSquare} 
                label="Research AI" 
                active={activeSection === 'ai'} 
                onClick={() => { setActiveSection('ai'); setIsMobileMenuOpen(false); }} 
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 mt-14 lg:mt-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
