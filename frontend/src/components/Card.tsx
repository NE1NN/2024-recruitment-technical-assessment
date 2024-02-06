import { StarIcon } from '@heroicons/react/24/solid';

type CardProps = {
  coursePrefix: string;
  courseCode: number;
  courseTitle: string;
  averageStars: number;
  totalReviews: number;
  offeredTerms: string[];
};

export default function Card({
  coursePrefix,
  courseCode,
  totalReviews,
  courseTitle,
  offeredTerms,
  averageStars,
}: CardProps) {
  return (
    <div className="shadow-lg rounded py-5 px-3 bg-gray-50">
      <div className="flex w-full justify-between">
        <div className="font-extrabold text-2xl">
          {coursePrefix}
          {courseCode}
        </div>
        <div className='flex flex-col'>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, idx) => (
              <StarIcon
                key={idx}
                className={`w-8 h-8 ${
                  idx < averageStars ? 'fill-purple-500' : 'fill-gray-500'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500">{totalReviews} reviews</div>
        </div>
      </div>
      <div className='text-sm mt-3'>{courseTitle}</div>
      <div className="flex gap-1 mt-10">
        {offeredTerms.map((term, idx) => (
          <div key={idx} className="bg-cyan-300 rounded-xl text-sm px-1">
            {term}
          </div>
        ))}
      </div>
    </div>
  );
}
