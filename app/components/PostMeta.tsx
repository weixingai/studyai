import { format } from 'date-fns';

interface PostMetaProps {
  date: string;
  tags?: string[];
}

export default function PostMeta({ date, tags }: PostMetaProps) {
  return (
    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
      <div className="flex flex-wrap gap-2">
        {tags && tags.length > 0 && tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            #{tag}
          </span>
        ))}
      </div>
      <time className="flex items-center gap-2 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {format(new Date(date), 'MMMM d, yyyy')}
      </time>
    </div>
  );
} 