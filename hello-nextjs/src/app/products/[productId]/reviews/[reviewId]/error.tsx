"use client";
export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h1>{error.message}</h1>
            <button onClick={reset}>Try reloading</button>
        </div>
    );
}
