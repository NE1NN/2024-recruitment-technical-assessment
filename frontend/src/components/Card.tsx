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
    <button className="flex flex-col shadow-lg rounded-xl px-5 py-7 bg-gray-50">
      <div className="flex w-full justify-between">
        <div className="font-extrabold text-2xl">
          {coursePrefix}
          {courseCode}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                className={`text-2xl ${
                  idx < averageStars ? 'text-purple-500' : 'text-gray-500'
                }`}
                key={idx}
              >
                ★
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 ml-1">{totalReviews} reviews</div>
        </div>
      </div>
      <div className="text-sm mt-3">{courseTitle}</div>
      <div className="flex gap-1 mt-10">
        {offeredTerms.map((term, idx) => (
          <div key={idx} className="bg-cyan-300 rounded-xl text-sm px-2 py-0.5">
            {term}
          </div>
        ))}
      </div>
    </button>
  );
}
