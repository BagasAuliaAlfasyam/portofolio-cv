"use client";

// Route-level error UI for the pos app belongs here.
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <button type="button" onClick={reset}>
      Try again
    </button>
  );
}
