import React, { useState, useContext, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Play, Loader2, Bug, CheckCircle, Lightbulb, CodeSquare, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};

const CodeReview = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [code, setCode] = useState('// Paste or write your code here...\n');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const handleAnalyze = async () => {
    if (code.trim().length === 0 || code.trim() === '// Paste or write your code here...') return;
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:5000/api/review/analyze', 
        { code, language, title: `${language} Analysis` },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setResult(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert('Your session has expired or is invalid. Please log out and log back in.');
        navigate('/login');
      } else {
        alert('Analysis failed. Check console or verify your Gemini API key in backend/.env');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
    if (score >= 5) return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
    return 'text-rose-400 border-rose-400/20 bg-rose-400/10';
  };

  return (
    <div className="w-full flex-grow flex flex-col md:flex-row min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
      {/* Editor Section */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 bg-[#0B0F19] h-[60vh] md:h-auto">
        <div className="px-4 py-3 flex justify-between items-center bg-slate-900 border-b border-slate-800">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 text-white text-sm rounded px-3 py-1.5 border border-slate-700 outline-none focus:border-primary"
          >
            {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
              <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
            ))}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {isAnalyzing ? 'Analyzing...' : 'Run Review'}
          </button>
        </div>
        <div className="flex-grow">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              padding: { top: 16 }
            }}
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-1/2 bg-slate-900/50 flex flex-col overflow-y-auto min-h-[400px] mb-10 md:mb-0">
        {!isAnalyzing && !result && (
          <div className="flex-grow flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            <Lightbulb size={48} className="mb-4 text-slate-600" />
            <h3 className="text-xl font-medium text-slate-300 mb-2">Ready for AI Review</h3>
            <p className="max-w-md">Paste your code in the editor and click "Run Review" to get intelligent insights, performance tips, and security checks.</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-grow flex flex-col items-center justify-center p-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h3 className="mt-6 text-xl font-medium text-white">Analyzing Codebase</h3>
            <p className="text-slate-400 mt-2 text-center text-sm">Gemini is looking for vulnerabilities and optimizations...</p>
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Analysis Results</h2>
                <div className="flex gap-2">
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">Code Quality</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">Security</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border flex flex-col items-center justify-center min-w-[80px] ${getScoreColor(result.score)}`}>
                <span className="text-2xl font-bold">{result.score || 0}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Score</span>
              </div>
            </div>

            {/* Explanations */}
            <div className="glass-card p-5">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2"><GraduationCap className="text-purple-400 w-5 h-5"/> Explanation</h3>
              <div className="text-slate-300 text-sm leading-relaxed">
                <ReactMarkdown
                  components={{
                    strong: ({node, ...props}) => <span className="font-bold text-white" {...props} />,
                    code: ({node, ...props}) => <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mt-2 mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mt-2 mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                  }}
                >
                  {result.explanation}
                </ReactMarkdown>
              </div>
            </div>

            {/* Issues */}
            {result.issues && result.issues.length > 0 && (
              <div className="glass-card p-5 border-l-4 border-l-rose-500">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2"><Bug className="text-rose-400 w-5 h-5"/> Issues Found</h3>
                <ul className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improved Code */}
            <div className="glass-card overflow-hidden">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <CodeSquare className="text-emerald-400 w-5 h-5" />
                <h3 className="text-white font-medium">Refactored Code</h3>
              </div>
              <div className="p-4 bg-slate-900/80">
                <Editor
                  height="300px"
                  language={language}
                  theme="vs-dark"
                  value={result.improvedCode || '// No code modification recommended'}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
                />
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeReview;
