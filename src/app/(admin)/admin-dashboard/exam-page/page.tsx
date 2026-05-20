import ExamPageClient from "@/features/AdminDashboard/exam/components/ExamPageClient";
import { getAllQuestionsAction } from "@/features/AdminDashboard/exam/exam.actions";


const ExamPage = async () => {
  const questions = await getAllQuestionsAction();

  return <ExamPageClient questions={questions || []} />;
};

export default ExamPage;
