import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Terminal, Plus, Clock, FileCode, CheckCircle, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/review/history`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history");
      } finally {
        setDashboardLoading(false);
      }
    };
    if (user) fetchHistory();
  }, [user]);

  if (loading || dashboardLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user?.name}</h1>
          <p className="text-slate-400">Manage your past analyses and start new ones.</p>
        </div>
        <Link to="/review" className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
          <Plus size={20} />
          <span className="hidden sm:inline">New Analysis</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-primary">
          <div className="p-3 bg-primary/10 rounded-lg"><Terminal className="text-primary"/></div>
          <div>
            <p className="text-slate-400 text-sm">Total Reviews</p>
            <p className="text-2xl font-bold text-white">{history.length}</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="p-3 bg-emerald-500/10 rounded-lg"><CheckCircle className="text-emerald-500"/></div>
          <div>
            <p className="text-slate-400 text-sm">Issues Resolved</p>
            <p className="text-2xl font-bold text-white">{history.reduce((acc, curr) => acc + (curr.issues?.length || 0), 0)}</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="p-3 bg-purple-500/10 rounded-lg"><FileCode className="text-purple-500"/></div>
          <div>
            <p className="text-slate-400 text-sm">Languages Used</p>
            <p className="text-2xl font-bold text-white">{new Set(history.map(item => item.language)).size}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Clock className="text-slate-400" /> Recent Activity
      </h2>
      
      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800">
          <Terminal size={48} className="text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl text-white font-medium mb-2">No reviews yet</h3>
          <p className="text-slate-400 mb-6">Start your first AI code review to see insights here.</p>
          <Link to="/review" className="text-primary hover:text-blue-400 font-medium inline-flex items-center gap-1">
            Start completely right now <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div key={item._id} className="glass-card p-5 hover:border-slate-600 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700">{item.language}</span>
                    <span className="text-xs text-slate-500 flex items-center">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xl font-bold ${item.score >= 8 ? 'text-emerald-400' : item.score >= 5 ? 'text-yellow-400' : 'text-rose-400'}`}>
                    {item.score}/10
                  </span>
                  <span className="text-xs text-slate-500 mt-1">AI Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
