"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    let isMounted = true; // If Component load

    const fetchJob = async () => {
      if (!id) return;
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBaseUrl}/api/jobs/${id}`);
        if (!res.ok) throw new Error('Job request not found');
        const data = await res.json();
        
        if (isMounted) setJob(data);
      } catch (err) {
        if (isMounted) setError('Could not load job details. It might have been deleted.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJob();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const token = localStorage.getItem('token');
    
    // Warning Modal
    if (!token) {
      setShowAuthWarning(true);
      return;
    }

    const newStatus = e.target.value;
    setUpdating(true);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    try {
      const res = await fetch(`${apiBaseUrl}/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedJob = await res.json();
        setJob(updatedJob);
        setStatusMessage('Status updated successfully!');
        setTimeout(() => setStatusMessage(''), 3000);
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  // Auth Check Before Delete
  const handleDeleteClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthWarning(true); 
    } else {
      setShowDeleteModal(true); 
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setShowAuthWarning(true);
      setIsDeleting(false);
      setShowDeleteModal(false);
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const res = await fetch(`${apiBaseUrl}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        router.push('/');
      } else {
        alert('Failed to delete job request');
        setIsDeleting(false);
        setShowDeleteModal(false);
      }
    } catch (err) {
      alert('Error deleting job');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Rendering States
  if (!id || loading) return <div className="text-center py-20 text-xl font-bold text-slate-500 animate-pulse">Loading details...</div>;
  
  if (error) return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 text-center">
      <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 mb-4 font-bold">{error}</div>
      <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Board</Link>
    </div>
  );

  if (!job) return null;

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto relative">
      
      {/* Floating Success Notification Toast */}
      {statusMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-3 bg-white border border-emerald-100 shadow-xl shadow-emerald-500/10 rounded-xl px-5 py-3.5 text-slate-800 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs">
            <span className="text-emerald-600 text-xs">✓</span>
          </div>
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
          ← Back to Board
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden relative z-10">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">
                {job.category || 'Uncategorized'}
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {job.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200/60 self-start md:self-center">
              <label htmlFor="status" className="text-xs font-bold text-slate-500 whitespace-nowrap pl-2">
                Status:
              </label>
              <select
                id="status"
                value={job.status}
                onChange={handleStatusChange}
                disabled={updating}
                className={`font-bold text-xs rounded-md border-0 py-1.5 pl-3 pr-8 ring-1 ring-inset ${
                  job.status === 'Open' ? 'text-emerald-700 ring-emerald-600/20 bg-emerald-50' : 
                  job.status === 'In Progress' ? 'text-amber-700 ring-amber-600/20 bg-amber-50' : 
                  'text-slate-700 ring-slate-600/20 bg-slate-100'
                } focus:ring-2 focus:ring-blue-600 disabled:opacity-50 outline-none cursor-pointer`}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/60 h-fit space-y-4 text-xs sm:text-sm">
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</h4>
              <p className="font-semibold text-slate-800">{job.location || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Posted On</h4>
              <p className="font-semibold text-slate-800">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact Name</h4>
              <p className="font-semibold text-slate-800">{job.contactName || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact Email</h4>
              {job.contactEmail ? (
                <a href={`mailto:${job.contactEmail}`} className="font-semibold text-blue-600 hover:underline break-all">
                  {job.contactEmail}
                </a>
              ) : (
                <p className="font-semibold text-slate-800">Not specified</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200/60 flex justify-end">
          <button
            onClick={handleDeleteClick}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs tracking-wide uppercase py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Delete Request
          </button>
        </div>
      </div>

      {/*Delete Confirmation Modal*/}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2">Delete Request?</h3>
            <p className="text-center text-xs text-slate-400 mb-6 font-medium leading-relaxed">
              This action cannot be undone. Are you sure you want to permanently delete this job request?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Action Restricted Warning Modal*/}
      {showAuthWarning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2">Action Restricted</h3>
            <p className="text-center text-xs text-slate-400 mb-6 font-medium leading-relaxed">
              You must be signed in to modify the status or delete a service request entry.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAuthWarning(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
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