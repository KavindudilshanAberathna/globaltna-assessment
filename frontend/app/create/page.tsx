"use client";

import { useState, useEffect } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateJob() {
  const router = useNextRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthWarning(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Job Title and Description are required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthWarning(true);
      setLoading(false);
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const res = await fetch(`${apiBaseUrl}/api/jobs`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to submit request.');
      }
    } catch (err) {
      setError('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/40 pb-16">
      <div className="bg-white border-b border-slate-200/80 h-16 flex items-center">
        <div className="max-w-3xl mx-auto w-full px-4 flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Create New Entry</span>
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            Cancel
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10">
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Post a Service Request</h1>
            <p className="text-slate-400 text-sm mt-1">Provide accurate details so tradespeople can assess your requirement.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm font-medium text-rose-800">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Electrician needed for fuse board tripping"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Detailed Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue, urgency, and any specific requirements..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Trade Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none cursor-pointer"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Joinery">Joinery</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Location / Area</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Nugegoda"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <label htmlFor="contactName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Ajith Kumara"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="ajithkumara97@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 p-3 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors mt-4 disabled:bg-blue-400 text-sm tracking-wide uppercase"
            >
              {loading ? 'Publishing Request...' : 'Publish Request'}
            </button>
          </form>
        </div>
      </div>

      {/* Custom Action Restricted Warning Modal */}
      {showAuthWarning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2">Action Restricted</h3>
            <p className="text-center text-xs text-slate-400 mb-6 font-medium leading-relaxed">
              You must be signed in to post a new service request entry on the board.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAuthWarning(false);
                  router.push('/');
                }}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/login"
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg text-center transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}