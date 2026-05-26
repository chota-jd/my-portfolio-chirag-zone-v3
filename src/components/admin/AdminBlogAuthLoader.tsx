export default function AdminBlogAuthLoader() {
  return (
    <div
      className="relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
      aria-label="Waiting for admin sign-in"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute h-48 w-48 rounded-full bg-[#4fc1c6]/10 blur-[80px]"
      />

      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full border border-[#4fc1c6]/20" />
        <div
          className="h-12 w-12 animate-spin rounded-full border-2 border-[#4fc1c6]/20 border-t-[#4fc1c6]"
          style={{ boxShadow: '0 0 28px rgba(79, 193, 198, 0.25)' }}
        />
      </div>

      <div className="relative text-center">
        <p className="text-base font-medium text-zinc-200 sm:text-lg">Preparing blog generator</p>
        <p className="mt-2 text-sm text-zinc-500">Complete sign-in to continue</p>
      </div>
    </div>
  );
}
