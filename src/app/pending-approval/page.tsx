export default function PendingApprovalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md">
        <h1 className="text-2xl font-bold text-yellow-600 mb-3">Pending Approval</h1>
        <p className="text-gray-500">আপনার account admin এর approval এর অপেক্ষায় আছে। অনুমোদন পেলে login করতে পারবেন।</p>
      </div>
    </div>
  );
}