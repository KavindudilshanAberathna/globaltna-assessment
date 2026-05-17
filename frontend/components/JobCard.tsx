import Link from 'next/link';

// Job description
export default function JobCard({ job }: { job: any }) {
  // Status color
  const statusColors = {
    'Open': 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            {job.category || 'Uncategorized'}
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-gray-900">{job.title}</h3>
          <p className="mt-2 text-gray-600 line-clamp-2">{job.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${(statusColors as any)[job.status] || statusColors['Open']}`}>
          {job.status}
        </span>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500 font-medium">
          {job.location && <span className="mr-2">📍 {job.location}</span>}
          <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
        <Link 
          href={`/jobs/${job._id}`}
          className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}