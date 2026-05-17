"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JobCard from './components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const url = category 
          ? `http://localhost:5000/api/jobs?category=${category}`
          : 'http://localhost:5000/api/jobs';
          
        const res = await fetch(url);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      {/* Top Professional Navbar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💼</span>
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">GlobalTNA <span className="text-blue-600 font-medium">Board</span></span>
          </div>
          <Link 
            href="/create"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            + Post a Request
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Service Request Board
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
            Connecting homeowners with skilled tradespeople. Browse active maintenance requests or post a new job board entry.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="category" className="text-sm font-bold text-slate-700 whitespace-nowrap">Filter Category</label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-48 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block p-2.5 outline-none font-medium transition-all"
            >
              <option value="">All Trades</option>
              <option value="Plumbing">🔧 Plumbing</option>
              <option value="Electrical">⚡ Electrical</option>
              <option value="Painting">🎨 Painting</option>
              <option value="Joinery">🔨 Joinery</option>
            </select>
          </div>
          <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
            Showing {jobs.length} active requests
          </div>
        </div>

        {/* Content Board */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-[220px] animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded-sm w-1/4"></div>
                  <div className="h-5 bg-slate-200 rounded-sm w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded-sm w-full"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded-sm w-1/3"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[45vh] bg-white rounded-xl border border-dashed border-slate-200 p-8 text-center shadow-xs">
            <span className="text-4xl mb-3">📭</span>
            <h3 className="text-lg font-bold text-slate-900">No requests available</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">There are no open service requests for the selected filter right now.</p>
            <button onClick={() => setCategory('')} className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: any) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}