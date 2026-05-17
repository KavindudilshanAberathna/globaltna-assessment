"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JobCard from './components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState<string | null>(null);
  
  // Mobile Menu 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem('userName'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        
        params.append('page', currentPage.toString());
        params.append('limit', '6');
        
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const url = `${apiBaseUrl}/api/jobs?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        
        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category, search, currentPage]);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      {/* Top Professional Navbar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💼</span>
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">
              GlobalTNA <span className="text-blue-600 font-medium">Board</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg">👋 {user}</span>
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-xs font-bold text-slate-600 hover:text-slate-900">
                Sign In
              </Link>
            )}
            
            <Link 
              href="/create"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-500 transition-colors"
            >
              + Post a Request
            </Link>
          </div>

          {/* Mobile Interactive Button (Hamburger or Avatar Initial Circle) */}
          <div className="flex md:hidden">
            {user ? (
              // Avatar
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-sm cursor-pointer uppercase focus:outline-none"
              >
                {user.charAt(0)}
              </button>
            ) : (

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 transition-colors rounded-lg hover:bg-slate-50"
              >
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Floating Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {user ? (
              
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-lg uppercase shadow-xs mb-1">
                  {user.charAt(0)}
                </div>
                <span className="text-sm font-bold text-slate-700 mb-3">👋 {user}</span>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);     
                    setShowLogoutModal(true);  
                  }}
                  className="w-full text-center rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 font-bold py-2.5 text-sm transition-colors cursor-pointer"
                >
                  Logout Account
                </button>
              </div>
            ) : (
             
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login" 
                  className="block text-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                
                <Link 
                  href="/create" 
                  className="block text-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  + Post a Request
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Welcome Section */}
        <div className="mb-10 text-center flex flex-col items-center ">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Service Request Board
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
            Connecting homeowners with skilled tradespeople. Browse active maintenance requests or post a new job board entry.
          </p>
          
          {/* Logged in '+ Post a Request' Button */}
          {user && (
            <Link 
              href="/create"
              className="mt-5 inline-flex md:hidden items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 transition-colors w-full sm:w-auto"
            >
              + Post a Request
            </Link>
          )}
        </div>

        {/* Search & Filter Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
          <div className="md:col-span-2 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔍</span>
            <input 
              type="text"
              placeholder="Search requests by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-2.5 outline-none transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-2.5 outline-none font-medium transition-all cursor-pointer"
            >
              <option value="">All Trades</option>
              <option value="Plumbing">🔧 Plumbing</option>
              <option value="Electrical">⚡ Electrical</option>
              <option value="Painting">🎨 Painting</option>
              <option value="Joinery">🔨 Joinery</option>
            </select>
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
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚪</span>
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2">Logout Account?</h3>
            <p className="text-center text-xs text-slate-400 mb-6 font-medium leading-relaxed">
              Are you sure you want to log out of your account? You will need to sign in again to make administrative changes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination Controls with Smooth Scroll */}
        {totalPages > 1 && (
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-200/60 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer"
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => {
                    setCurrentPage(pageNumber);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer"
            >
              Next →
            </button>
          </div>
        )}
    </main>
  );
}