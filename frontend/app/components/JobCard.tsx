import Link from 'next/link';

export default function JobCard({ job }: { job: any }) {
  const statusStyles: Record<string, string> = {
    'Open': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 border-emerald-200',
    'In Progress': 'bg-amber-50 text-amber-700 ring-amber-600/20 border-amber-200',
    'Closed': 'bg-slate-100 text-slate-600 ring-slate-500/10 border-slate-200',
  };

  const categoryBadges: Record<string, string> = {
    'Plumbing': '🔧 Plumbing',
    'Electrical': '⚡ Electrical',
    'Painting': '🎨 Painting',
    'Joinery': '🔨 Joinery'
  };

  return (
    <Link href={`/jobs/${job._id}`}>
    <div className="group bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex justify-between items-start gap-4">
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10">
            {categoryBadges[job.category] || `📁 ${job.category || 'General'}`}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide shadow-2xs ${statusStyles[job.status] || statusStyles['Open']}`}>
            {job.status}
          </span>
        </div>
        
        <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {job.title}
        </h3>
        
        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
          {job.description}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
        <div className="flex items-center gap-3 text-slate-500 font-medium">
          {job.location && (
            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-200/40">
              📍 {job.location}
            </span>
          )}
          <span className="text-slate-400">
            {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
        
        <span 
          className="inline-flex items-center font-semibold text-blue-600 transition-colors gap-0.5 group-hover:gap-1"
        >
          Details <span>→</span>
        </span >
      </div>
    </div>
    </Link>
  );
}