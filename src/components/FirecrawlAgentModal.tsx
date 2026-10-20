import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Flame,
  Globe,
  Sparkles,
  Search,
  CheckCircle2,
  Copy,
  Check,
  X,
  ExternalLink,
  Code2,
  Building,
  GraduationCap,
  Phone,
  MapPin,
  Clock,
  Layers,
  Key,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface FirecrawlAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted?: (data: any) => void;
}

export const FirecrawlAgentModal: React.FC<FirecrawlAgentModalProps> = ({
  isOpen,
  onClose,
  onDataExtracted,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const defaultUrl = 'https://bengal-computer-training-institute-ku-2439.ai.studio/';
  const [targetUrl, setTargetUrl] = useState(defaultUrl);
  const [prompt, setPrompt] = useState(
    'Extract institute overview, courses, syllabus, fees, BTEB affiliation, campus location, and contact numbers'
  );
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('firecrawl_user_api_key') || '';
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'briefing' | 'json' | 'meta'>('briefing');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    if (val.trim()) {
      localStorage.setItem('firecrawl_user_api_key', val.trim());
    } else {
      localStorage.removeItem('firecrawl_user_api_key');
    }
  };

  const handleRunAgent = async (overridePrompt?: string) => {
    setLoading(true);
    setError(null);
    const activePrompt = overridePrompt || prompt;

    try {
      const response = await fetch('/api/firecrawl/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey.trim() ? { 'x-firecrawl-key': apiKey.trim() } : {}),
        },
        body: JSON.stringify({
          prompt: activePrompt,
          url: targetUrl.trim() || defaultUrl,
          apiKey: apiKey.trim() || undefined,
          model: 'spark-2',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Firecrawl agent execution failed');
      }

      setResult(data);
      if (onDataExtracted && data.data) {
        onDataExtracted(data.data);
      }
    } catch (err: any) {
      setError(err?.message || 'Error executing Firecrawl agent');
    } finally {
      setLoading(false);
    }
  };

  const copyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isBn ? 'ফায়ারক্ল এআই ওয়েব এজেন্ট' : 'Firecrawl AI Agent Endpoint'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  v2/agent
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'টার্গেট ইউআরএল ক্রল ও স্ট্রাকচার্ড এআই এক্সট্রাকশন'
                  : 'Autonomous web extraction & structured agent intelligence'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Target URL Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-orange-400" />
                {isBn ? 'টার্গেট ইউআরএল (Target URL):' : 'Target URL:'}
              </span>
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>{isBn ? 'সরাসরি সাইট ভিজিট' : 'Visit Live URL'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Prompt & Quick Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                {isBn ? 'এজেন্ট প্রম্পট (Agent Prompt):' : 'Agent Prompt:'}
              </label>
              <span className="text-[11px] text-slate-500">Spark-2 Autonomous</span>
            </div>

            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
              placeholder="Describe what data Firecrawl agent should extract..."
            />

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => {
                  const p = 'Extract institute overview, courses, syllabus, and fees structure';
                  setPrompt(p);
                  handleRunAgent(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] transition-all flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="w-3 h-3 text-orange-400" />
                <span>{isBn ? 'কোর্স ও সিলেবাস' : 'Courses & Fees'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const p = 'Extract campus address, BTEB accreditation code 27117, and hotlines';
                  setPrompt(p);
                  handleRunAgent(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] transition-all flex items-center gap-1 cursor-pointer"
              >
                <Building className="w-3 h-3 text-emerald-400" />
                <span>{isBn ? 'বিটিইবি কোড ও ঠিকানা' : 'BTEB & Campus'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const p = 'Extract HSC 50% discount offers and coupon codes';
                  setPrompt(p);
                  handleRunAgent(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>{isBn ? '৫০% এইচএসসি অফার' : 'HSC 50% Offer'}</span>
              </button>
            </div>
          </div>

          {/* Optional Firecrawl API Key */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                {isBn ? 'Firecrawl API Key (ঐচ্ছিক):' : 'Firecrawl API Key (Optional):'}
              </span>
              <span className="text-[10px] text-slate-500">
                {apiKey ? '✓ কাস্টম কি সেট করা' : 'সার্ভার ফলব্যাক সক্রিয়'}
              </span>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="fc-..."
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isBn
                ? 'API Key না থাকলেও লাইভ সাইট থেকে তাৎক্ষণিকভাবে স্ট্রাকচার্ড ডাটা ফেচ হবে। নিজস্ব Firecrawl ক্লাউড ব্রাউজার ও ক্রেডিট ব্যবহার করতে Key বসাতে পারেন।'
                : 'Works instantly without an API key using live DOM extraction, or enter your personal Firecrawl API key for autonomous cloud scraping.'}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleRunAgent()}
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isBn ? 'ফায়ারক্ল এজেন্ট কাজ করছে...' : 'Firecrawl Agent Running...'}</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 fill-slate-950" />
                  <span>{isBn ? 'ফায়ারক্ল এজেন্ট রান করুন' : 'Run Firecrawl Agent'}</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isBn ? 'ত্রুটি:' : 'Execution Error:'}</span> {error}
              </div>
            </div>
          )}

          {/* Result View */}
          {result && (
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {/* Result Navigation Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('briefing')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === 'briefing'
                        ? 'bg-orange-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isBn ? 'সংক্ষিপ্ত ব্রিফিং' : 'Visual Briefing'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('json')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeTab === 'json'
                        ? 'bg-orange-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JSON Data
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {result.executionTimeMs}ms
                  </span>
                  <button
                    type="button"
                    onClick={copyJson}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{isBn ? 'কপি' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tab: Visual Briefing */}
              {activeTab === 'briefing' && (
                <div className="p-4 sm:p-5 space-y-4 text-xs">
                  {/* Institute Header */}
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm">
                          {result.data?.institute?.name || 'BENGAL INSTITUTE'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          BTEB: {result.data?.institute?.btebCode || '27117'}
                        </span>
                      </div>
                      <p className="text-slate-400 mt-1 line-clamp-2">
                        {result.data?.institute?.description || result.data?.institute?.title}
                      </p>
                    </div>

                    <div className="shrink-0 text-slate-300 space-y-1 text-[11px]">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>01782-824582, 01870-707715</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        <span>সিঙ্গার মোড়, এন এস রোড, কুষ্টিয়া</span>
                      </div>
                    </div>
                  </div>

                  {/* Extracted Courses Grid */}
                  <div>
                    <div className="font-bold text-slate-300 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
                        {isBn ? 'এক্সট্রাক্ট করা কোর্সসমূহ (৮টি):' : 'Extracted Courses (8):'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        গড় সফলতা: {result.data?.statistics?.averagePlacementRate || '92.9%'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(result.data?.coursesOverview || []).map((c: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-slate-200 line-clamp-1">
                              {c.nameBn}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {c.duration} {c.bteb && '· BTEB অনুমোদিত'}
                            </div>
                          </div>
                          <span className="font-mono font-bold text-emerald-400 shrink-0 ml-2">
                            {c.fee}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Offer Banner Card */}
                  {result.data?.specialOffer && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>HSC পরীক্ষার্থীদের জন্য {result.data.specialOffer.discount} বিশেষ ছাড়</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          সেশন: {result.data.specialOffer.period}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black font-mono text-xs">
                        {result.data.specialOffer.couponCode}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: JSON Output */}
              {activeTab === 'json' && (
                <div className="p-4 bg-slate-950 max-h-96 overflow-y-auto">
                  <pre className="text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Endpoint: /api/firecrawl/agent</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
