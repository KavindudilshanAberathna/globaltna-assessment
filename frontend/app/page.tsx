"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import JobCard from './components/JobCard'; // අපි හදපු component එක

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
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Service Request Board
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse open requests or post a new job.
          </p>
        </div>
        
        <Link 
          href="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors"
        >
          + Post a Request
        </Link>
      </div>

      <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <label htmlFor="category" className="font-bold text-gray-700">Filter by Category:</label>
        <select 
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none font-medium"
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
          <option value="Joinery">Joinery</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl font-bold text-gray-500 animate-pulse">Loading requests...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          <p className="text-xl font-bold text-gray-500">No job requests found.</p>
          <p className="text-gray-400 mt-2">Be the first to post a new request!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}