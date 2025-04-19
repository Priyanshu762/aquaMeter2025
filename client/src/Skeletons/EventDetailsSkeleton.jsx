import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`} />
);

const EventDetailsSkeleton = () => {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-2/3 space-y-4">
        <SkeletonBox className="w-full h-64 rounded-lg" /> {/* Image */}
        <SkeletonBox className="w-1/2 h-6" /> {/* Event Title */}
        <SkeletonBox className="w-2/3 h-4" /> {/* Date */}
        <SkeletonBox className="w-1/3 h-4" /> {/* Time */}
        <SkeletonBox className="w-3/4 h-4" /> {/* Location */}
        <SkeletonBox className="w-full h-32" /> {/* Description */}
      </div>
      <div className="w-1/3 space-y-4">
        <SkeletonBox className="w-full h-48 rounded-lg" /> {/* Registration Card */}
        <SkeletonBox className="w-full h-12" />
        <SkeletonBox className="w-full h-12" />
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
