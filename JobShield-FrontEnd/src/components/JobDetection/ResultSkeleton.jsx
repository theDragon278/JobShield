// components/ResultSkeleton.jsx

export default function ResultSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="border border-black/20 bg-white p-6 shadow-[5px_5px_0px_0px_#6c6c6c]">
        <div className="h-7 w-48 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-36 bg-gray-200 rounded mx-auto mt-3" />
      </div>

      <div className="bg-white border border-black/20 p-6 shadow-[5px_5px_0px_0px_#6c6c6c] space-y-4">
        <div className="h-7 w-44 bg-gray-200 rounded" />
        <div className="h-44 w-full bg-gray-100 rounded border border-gray-200" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-5 w-full bg-gray-300 rounded" />
        </div>
      </div>

      <div className="bg-white border border-black/20 p-6 shadow-[5px_5px_0px_0px_#6c6c6c] space-y-3">
        <div className="h-7 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
