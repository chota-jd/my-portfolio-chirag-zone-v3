'use client';

/**
 * Static backdrop only — particle “dots” and Framer-driven orbs were removed for smoother scrolling.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />

      {/* Soft accent glows (CSS only, no animation loop) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#4fc1c6] to-transparent opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#4fc1c6] to-transparent opacity-5 blur-3xl" />
    </div>
  );
}
