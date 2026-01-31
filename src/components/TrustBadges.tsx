'use client';

// Indian Flag Component with proper Ashoka Chakra
function IndiaFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Saffron stripe */}
      <rect width="900" height="200" fill="#FF9933" />
      {/* White stripe */}
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      {/* Green stripe */}
      <rect y="400" width="900" height="200" fill="#138808" />
      {/* Ashoka Chakra */}
      <g transform="translate(450, 300)">
        {/* Outer circle */}
        <circle r="55" fill="none" stroke="#000080" strokeWidth="3" />
        {/* Inner hub */}
        <circle r="9" fill="#000080" />
        {/* 24 spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = 12 * Math.cos(angle);
          const y1 = 12 * Math.sin(angle);
          const x2 = 52 * Math.cos(angle);
          const y2 = 52 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#000080"
              strokeWidth="2"
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function TrustBadges() {
  return (
    <section className="relative py-16 sm:py-20 bg-white">
      {/* Glassmorphism Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 uppercase mb-3 sm:mb-4">
            Why Customers Choose Hawaa
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            A trusted brand, built on real outcomes
          </h2>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-16 max-w-3xl mx-auto">
          {/* Made in India Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 sm:mb-4 w-12 h-8 sm:w-16 sm:h-11 relative overflow-hidden rounded-sm shadow-sm">
              <IndiaFlag className="w-full h-full" />
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800">
              Made in India
            </p>
          </div>

          {/* 5 Star Rating Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">5</span>
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800">
              Highly Rated
            </p>
          </div>

          {/* 1 Year Warranty Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 sm:mb-4 flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">1</span>
              <span className="text-base sm:text-lg md:text-xl font-medium text-gray-700">Yr</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800">
              PAN India Warranty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
