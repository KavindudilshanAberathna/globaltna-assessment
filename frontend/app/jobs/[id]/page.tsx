"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id; // ID එක ලැබෙනකන් ආරක්ෂිතව බලා සිටීම

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true; // Component එක load වෙලාද කියලා බලන ක්‍රමය

    const fetchJob = async () => {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
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

    // Cleanup function එක
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setUpdating(true);
    
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedJob = await res.json();
        setJob(updatedJob);
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
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
  if (!id || loading) return <div className="text-center py-20 text-xl font-bold text-gray-500 animate-pulse">Loading details...</div>;
  
  if (error) return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 mb-4 font-bold">{error}</div>
      <Link href="/" className="text-blue-600 font-bold hover:underline">← Back to Board</Link>
    </div>
  );

  if (!job) return null;

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto relative">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
          ← Back to Board
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative z-10">
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-sm font-extrabold text-blue-600 uppercase tracking-widest">
                {job.category || 'Uncategorized'}
              </span>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 leading-tight">
                {job.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <label htmlFor="status" className="text-sm font-bold text-gray-700 whitespace-nowrap pl-2">
                Status:
              </label>
              <select
                id="status"
                value={job.status}
                onChange={handleStatusChange}
                disabled={updating}
                className={`font-bold text-sm rounded-md border-0 py-2 pl-3 pr-8 ring-1 ring-inset ${
                  job.status === 'Open' ? 'text-green-700 ring-green-600/20 bg-green-50' : 
                  job.status === 'In Progress' ? 'text-yellow-700 ring-yellow-600/20 bg-yellow-50' : 
                  'text-gray-700 ring-gray-600/20 bg-gray-100'
                } focus:ring-2 focus:ring-blue-600 disabled:opacity-50 outline-none cursor-pointer`}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-5">
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Location</h4>
              <p className="font-semibold text-gray-900">{job.location || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Posted On</h4>
              <p className="font-semibold text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Name</h4>
              <p className="font-semibold text-gray-900">{job.contactName || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Email</h4>
              {job.contactEmail ? (
                <a href={`mailto:${job.contactEmail}`} className="font-semibold text-blue-600 hover:underline break-all">
                  {job.contactEmail}
                </a>
              ) : (
                <p className="font-semibold text-gray-900">Not specified</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-red-50 border-t border-red-100 flex justify-end">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            Delete Request
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Delete Request?</h3>
            <p className="text-center text-gray-500 mb-8 font-medium leading-relaxed">
              This action cannot be undone. Are you sure you want to permanently delete this job request?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}