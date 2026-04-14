import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, ShieldAlert, Zap, BookOpen, UploadCloud, Command, Sparkles, Terminal, Globe, Mail, Code } from 'lucide-react';
import DotGrid from '../components/DotGrid';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="absolute top-0 left-0 w-full h-[700px] z-0 pointer-events-none">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#1e293b"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 w-full relative z-10 pointer-events-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            AI-Powered Code Review Engine
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 leading-tight"
          >
            Write Better Code,<br />Faster Than Ever.
          </motion.h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly analyze your codebase. Detect bugs, resolve security vulnerabilities, and get optimized refactoring suggestions powered by advanced AI models.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              Start Reviewing Code <ArrowRight size={20} />
            </Link>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-lg transition-all border border-slate-700 hover:border-slate-600">
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="w-full mt-16 relative py-20 flex justify-center">
        <div className="absolute inset-0 top-0 left-0 w-full h-full z-0 pointer-events-none">
          <DotGrid
            dotSize={4}
            gap={18}
            baseColor="#0f172a"
            activeColor="#3b82f6"
            proximity={100}
            shockRadius={200}
            shockStrength={3}
            resistance={800}
            returnDuration={1.2}
          />
        </div>
      
        <div id="features" className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10">
        {[
          { icon: <Code2 className="text-blue-400" size={28} />, title: "Code Quality", desc: "Enforce best practices and clean code standards automatically." },
          { icon: <Zap className="text-emerald-400" size={28} />, title: "Performance", desc: "Identify bottlenecks and get optimized code snippets." },
          { icon: <ShieldAlert className="text-rose-400" size={28} />, title: "Security", desc: "Catch vulnerabilities before they reach production." },
          { icon: <BookOpen className="text-purple-400" size={28} />, title: "Learning Mode", desc: "Understand the 'why' with beginner-friendly explanations." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
            className="glass-card p-6 flex flex-col items-start text-left hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
          </motion.div>
        ))}
        </div>
      </div>


      {/* How It Works */}
      <div className="w-full mt-32 relative py-20 flex justify-center">
        <div className="absolute inset-0 top-0 left-0 w-full h-full z-0 pointer-events-none">
          <DotGrid
            dotSize={4}
            gap={18}
            baseColor="#0f172a"
            activeColor="#10B981"
            proximity={100}
            shockRadius={200}
            shockStrength={3}
            resistance={800}
            returnDuration={1.2}
          />
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            How It Works
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Get intelligent code analysis in three simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>

          {[
            { step: '01', icon: <UploadCloud className="text-blue-400" size={32} />, title: "Submit Code", desc: "Paste your code snippet directly in our Monaco-powered editor or seamlessly sync." },
            { step: '02', icon: <Command className="text-indigo-400" size={32} />, title: "AI Analysis", desc: "Our Gemini-powered engine scans for performance bottlenecks, bugs, and security risks." },
            { step: '03', icon: <Sparkles className="text-primary" size={32} />, title: "Get Insights", desc: "Receive refactored code, an AI score out of 10, and a detailed explanation of the changes." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.5 }}
              className="glass-card p-8 flex flex-col items-center text-center relative bg-slate-900/50"
            >
              <div className="absolute -top-5 bg-card border border-slate-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-300 shadow-lg">
                {item.step}
              </div>
              <div className="p-4 bg-slate-800/80 rounded-2xl mb-6 mt-4 ring-1 ring-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="w-full mt-32 border-t border-slate-800 pt-16 pb-8 px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight mb-4">
              <Terminal className="text-primary" size={32} />
              <span>CodeInsight <span className="text-primary">AI</span></span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
              The smartest way to review, refactor, and improve your codebase with artificial intelligence.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-900/50 rounded-full ring-1 ring-slate-800">
              <Code size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors p-2 bg-slate-900/50 rounded-full ring-1 ring-slate-800">
              <Globe size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors p-2 bg-slate-900/50 rounded-full ring-1 ring-slate-800">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} CodeInsight AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
