/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ExamQuestions from "@/features/public_assets/Online-exam/components/ExamQuestions";
import ExamResult from "@/features/public_assets/Online-exam/components/ExamResult";
import StudentLoginForm from "@/features/public_assets/Online-exam/components/StudentLoginForm";
import { useState } from "react";


type Step = "login" | "exam" | "result";

const ExamPage = () => {
  const [step, setStep] = useState<Step>("login");
  const [student, setStudent] = useState<any>(null);
  const [result, setResult] = useState<any>(null);

  const handleLogin = (data: any) => {
    if (data.hasAttempted && !data.canRetry) {
      setStudent(data.student);
      setStep("result");
      return;
    }
    setStudent(data.student);
    setStep("exam");
  };

  const handleSubmit = (examResult: any) => {
    setResult(examResult);
    setStep("result");
  };

  return (
    <>
      {step === "login" && <StudentLoginForm onLogin={handleLogin} />}

      {step === "exam" && student && (
        <ExamQuestions studentId={student.id} onSubmit={handleSubmit} />
      )}

      {step === "result" && student && result && (
        <ExamResult result={result} student={student} />
      )}
    </>
  );
};

export default ExamPage;
