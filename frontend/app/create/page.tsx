"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing', // Default category
    location: '',
    contactName: '',
    contactEmail: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form එකේ දත්ත වෙනස් වෙද්දී state එක update කිරීම
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Form එක Submit කිරීම
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side Validation (අනිවාර්ය කර ඇති කොටස)
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and Description are required fields.');
      return;
    }

    // Email Validation (Regular Expression)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/'); // සාර්ථක වුණාම ප්‍රධාන පිටුවට යැවීම
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create job request.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">Post a New Request</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-bold">
          ← Back to Board
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Need a plumber for a leaking kitchen tap"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide details about the job..."
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Glasgow"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-1">Contact Name</label>
              <input
                type="text"
                id="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-bold text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-6 rounded-lg transition-colors mt-4 disabled:bg-blue-400"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </main>
  );
}