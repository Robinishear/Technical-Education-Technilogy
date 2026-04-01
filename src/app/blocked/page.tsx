export default function BlockedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-3">Account Blocked</h1>
        <p className="text-gray-500">আপনার account block করা হয়েছে। বিস্তারিত জানতে admin এর সাথে যোগাযোগ করুন।</p>
      </div>
    </div>
  );
}