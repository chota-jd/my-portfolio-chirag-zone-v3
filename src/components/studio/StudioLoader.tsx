type StudioLoaderProps = {
  fullScreen?: boolean;
};

export default function StudioLoader({ fullScreen = true }: StudioLoaderProps) {
  const content = (
    <>
      <div
        className="h-11 w-11 animate-spin rounded-full border-2 border-[#4fc1c6]/25 border-t-[#4fc1c6]"
        aria-hidden
      />
      <p className="text-sm font-medium tracking-wide text-zinc-200 sm:text-base">
        Loading Sanity Studio
      </p>
    </>
  );

  if (!fullScreen) {
    return <div className="flex flex-col items-center justify-center gap-4">{content}</div>;
  }

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 bg-[#101112]">
      {content}
    </div>
  );
}
