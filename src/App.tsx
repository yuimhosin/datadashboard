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
    { name: '1月', value: 400 },
    { name: '2月', value: 300 },
    { name: '3月', value: 600 },
    { name: '4月', value: 800 },
    { name: '5月', value: 500 },
    { name: '6月', value: 900 },
  ];

  const agingData = [
    { name: '60-70歲', value: 45 },
    { name: '70-80歲', value: 30 },
    { name: '80歲以上', value: 25 },
  ];

  const COLORS = ['#18181b', '#3f3f46', '#71717a'];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">戰略概覽</h1>
        <p className="text-zinc-500">全球數據治理與行業情報</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="全球貿易流向" subtitle="每月交易量 (指數)">
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

        <Card title="人口老齡化" subtitle="人口分佈 (%)">
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

        <Card title="合規狀態" subtitle="活動法規監測">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="text-sm font-medium">CAC 2024 合規</span>
              </div>
              <span className="text-xs font-bold uppercase">活動中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">美國數據出口規則</span>
              </div>
              <span className="text-xs font-bold uppercase">待定</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <span className="text-sm font-medium">歐盟 GDPR 充分性</span>
              </div>
              <span className="text-xs font-bold uppercase">穩定</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="最新研究見解" className="lg:col-span-2">
          <div className="prose prose-zinc max-w-none">
            <p className="text-zinc-600">
              從「數字化」向「智能化」的轉變是由公共數據資產化驅動的。
              主要研究結果表明，AI 每年可為全球經濟貢獻超過 7 萬億美元，
              在先進製造和養老產業中具有顯著影響。
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-zinc-100 rounded-lg">
                <h4 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <TrendingUp size={16} /> 貿易革命
                </h4>
                <p className="text-sm text-zinc-500 mt-1">AI 驅動的實體匹配和供應鏈映射正在將貿易摩擦減少 25%。</p>
              </div>
              <div className="p-4 border border-zinc-100 rounded-lg">
                <h4 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <HeartPulse size={16} /> 精準護理
                </h4>
                <p className="text-sm text-zinc-500 mt-1">將人口統計數據與 AI 相結合，可使養老產業的風險干預提高 38%。</p>
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
        <h1 className="text-3xl font-bold text-zinc-900">合規導航</h1>
        <p className="text-zinc-500">CAC 數據出境規定 (2024-2025)</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card title="監管框架" subtitle="合規路徑">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">數據類型</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">閾值</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">要求</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase text-zinc-400">描述</th>
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
                        path.requirement === '豁免' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"
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
          <Card title="豁免場景" subtitle="商業背景">
            <ul className="space-y-3">
              {[
                "跨境購物和送貨",
                "國際匯款",
                "機票和酒店預訂",
                "簽證辦理服務",
                "跨境人力資源管理"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                  <ChevronRight size={14} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="自貿區負面清單" subtitle="自貿區優勢">
            <p className="text-sm text-zinc-600 mb-4">
              北京、上海和廣東等地區實施了「負面清單」。清單之外的數據可以在區內自由流動。
            </p>
            <div className="flex flex-wrap gap-2">
              {['汽車', '醫藥', '零售', '民航', '再保險'].map(tag => (
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
  const [filter, setFilter] = useState<string>('全部');
  const categories = ['全部', '貿易', '經濟', '人口', '健康'];

  const filteredSources = filter === '全部' 
    ? DATA_SOURCES 
    : DATA_SOURCES.filter(s => s.category === filter);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-zinc-900">全球數據探索</h1>
        <p className="text-zinc-500">精選高質量公共數據源</p>
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
                <span className="text-[10px] font-bold uppercase text-zinc-400">質量</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 mb-6 line-clamp-2">{source.description}</p>
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:underline"
            >
              訪問數據 <ExternalLink size={14} />
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
        <h1 className="text-3xl font-bold text-zinc-900">行業解決方案</h1>
        <p className="text-zinc-500">貿易與養老產業的 AI 驅動應用</p>
      </header>

      <div className="flex border-b border-zinc-100">
        <button
          onClick={() => setActiveTab('trade')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'trade' ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400"
          )}
        >
          全球貿易與物流
        </button>
        <button
          onClick={() => setActiveTab('elderly')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'elderly' ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-400"
          )}
        >
          養老產業與人口統計
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
            <Card title="供應鏈映射" className="lg:col-span-2">
              <div className="aspect-video bg-zinc-50 rounded-lg flex items-center justify-center border border-dashed border-zinc-200">
                <div className="text-center">
                  <Globe className="mx-auto text-zinc-300 mb-2" size={48} />
                  <p className="text-sm text-zinc-400">交互式貿易路線可視化</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 rounded-lg">
                  <div className="text-xs font-bold text-zinc-400 uppercase mb-1">實體匹配</div>
                  <div className="text-lg font-bold text-zinc-900">95% 準確率</div>
                </div>
                <div className="p-4 bg-zinc-50 rounded-lg">
                  <div className="text-xs font-bold text-zinc-400 uppercase mb-1">風險檢測</div>
                  <div className="text-lg font-bold text-zinc-900">實時</div>
                </div>
              </div>
            </Card>
            <Card title="貿易情報" subtitle="平台對比">
              <div className="space-y-4">
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">Panjiva (S&P Global)</div>
                  <div className="text-xs text-zinc-500 mt-1">最適合深度實體匹配和供應鏈映射。</div>
                </div>
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">ImportGenius</div>
                  <div className="text-xs text-zinc-500 mt-1">最適合美國市場滲透，易於使用。</div>
                </div>
                <div className="p-3 border border-zinc-100 rounded-lg">
                  <div className="font-bold text-sm">上海騰道 (Tendata)</div>
                  <div className="text-xs text-zinc-500 mt-1">最適合銷售自動化和 CRM 集成。</div>
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
            <Card title="選址助手" className="lg:col-span-2">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <MapPin className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">老齡化指數</div>
                    <div className="text-xl font-bold">高</div>
                  </div>
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <TrendingUp className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">可支配收入</div>
                    <div className="text-xl font-bold">1.2萬/年</div>
                  </div>
                  <div className="p-4 border border-zinc-100 rounded-lg text-center">
                    <HeartPulse className="mx-auto text-zinc-400 mb-2" size={24} />
                    <div className="text-xs font-bold uppercase text-zinc-400">醫療密度</div>
                    <div className="text-xl font-bold">3.2/km²</div>
                  </div>
                </div>
                <div className="h-48 bg-zinc-50 rounded-lg flex items-center justify-center border border-dashed border-zinc-200">
                  <p className="text-sm text-zinc-400">人口統計熱力圖可視化</p>
                </div>
              </div>
            </Card>
            <Card title="護理 AI 模塊" subtitle="運營效率">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">需求預測</div>
                    <p className="text-xs text-zinc-500">預測床位佔用率和人員配備需求。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <AlertCircle size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">跌倒風險檢測</div>
                    <p className="text-xs text-zinc-500">AI 行為分析，用於早期干預。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-zinc-900 text-white rounded">
                    <FileText size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-bold">個性化康復</div>
                    <p className="text-xs text-zinc-500">基於健康數據的動態恢復計劃。</p>
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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "無法生成響應。" }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "連接 AI 服務出錯。" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900">研究助手</h1>
        <p className="text-zinc-500">AI 驅動的戰略見解 (DeepSeek)</p>
      </header>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>向我諮詢數據合規、貿易情報或養老產業戰略。</p>
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
              AI 正在思考...
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
              placeholder="輸入您的研究查詢..."
              className="flex-1 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold hover:bg-zinc-800 disabled:opacity-50 transition-colors"
            >
              發送
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
          <span className="font-bold text-lg tracking-tight">數據戰略</span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="儀表板" 
            active={activeSection === 'dashboard'} 
            onClick={() => setActiveSection('dashboard')} 
          />
          <SidebarItem 
            icon={ShieldCheck} 
            label="合規中心" 
            active={activeSection === 'compliance'} 
            onClick={() => setActiveSection('compliance')} 
          />
          <SidebarItem 
            icon={Database} 
            label="數據探索" 
            active={activeSection === 'explorer'} 
            onClick={() => setActiveSection('explorer')} 
          />
          <SidebarItem 
            icon={TrendingUp} 
            label="行業解決方案" 
            active={activeSection === 'industry'} 
            onClick={() => setActiveSection('industry')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="研究 AI" 
            active={activeSection === 'ai'} 
            onClick={() => setActiveSection('ai')} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-100">
          <div className="p-4 bg-zinc-50 rounded-xl">
            <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">系統狀態</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-zinc-600">所有系統運行正常</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-zinc-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database size={20} />
          <span className="font-bold">數據戰略</span>
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
                label="儀表板" 
                active={activeSection === 'dashboard'} 
                onClick={() => { setActiveSection('dashboard'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={ShieldCheck} 
                label="合規中心" 
                active={activeSection === 'compliance'} 
                onClick={() => { setActiveSection('compliance'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={Database} 
                label="數據探索" 
                active={activeSection === 'explorer'} 
                onClick={() => { setActiveSection('explorer'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={TrendingUp} 
                label="行業解決方案" 
                active={activeSection === 'industry'} 
                onClick={() => { setActiveSection('industry'); setIsMobileMenuOpen(false); }} 
              />
              <SidebarItem 
                icon={MessageSquare} 
                label="研究 AI" 
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
