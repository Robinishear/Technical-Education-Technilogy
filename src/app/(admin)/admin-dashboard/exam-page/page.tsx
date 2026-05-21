import ExamPageClient from "@/features/AdminDashboard/exam/components/ExamPageClient";
import ExamResultList from "@/features/AdminDashboard/exam/components/ExamResultList";
import { getAllQuestionsAction, getAllResultsAction } from "@/features/AdminDashboard/exam/exam.actions";


const ExamPage = async () => {
  const questions = await getAllQuestionsAction();
  const results = await getAllResultsAction();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 dark:bg-black bg-stone-50 min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-800">
          Exam Management
        </h2>
        <p className="text-stone-400 text-sm font-medium mt-2">
          Question যোগ করো এবং Result দেখো
        </p>
      </header>

      {/* Question Add Section */}
      <div className="mb-10">
        <h3 className="text-lg font-black text-stone-700 mb-4 uppercase tracking-wider">
          Question যোগ করো
        </h3>
        <ExamPageClient questions={questions || []} />
      </div>

      {/* Result Section */}
      <div>
        <h3 className="text-lg font-black text-stone-700 mb-4 uppercase tracking-wider">
          Student Results ({results?.length || 0}টা)
        </h3>
        <ExamResultList results={results ?? []} />{" "}
      </div>
    </div>
  );
};

export default ExamPage;
