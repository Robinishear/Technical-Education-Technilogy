import { Button } from "@/components/ui/button";
import { Student } from "../students.type";

export default function ViewDetailsModal({ student, onClose }: { student: Student; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card border border-white/10 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">Student Full Profile 👤</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <p><strong>Duration :</strong> {student.duration}</p>
          <p><strong>Father&apos;s Name:</strong> {student.fatherName}</p>
          <p><strong>Mother&apos;s Name:</strong> {student.motherName}</p>
          <p><strong>Address:</strong> {student.studentAddress}</p>
          <p><strong>Thana:</strong> {student.thana}</p>
          <p><strong>Roll:</strong> {student.roll}</p>
          <p><strong>Reg Number:</strong> {student.regNumber}</p>
        </div>
        <div className="space-y-2">
          <p><strong>Institute:</strong> {student.institute}</p>
          <p><strong>Director:</strong> {student.directorName}</p>
          <p><strong>Start:</strong> {student.month1}/{student.year1}</p>
          <p><strong>End:</strong> {student.month2}/{student.year2}</p>
          <p><strong>Issue Date:</strong> {student.issueDate}</p>
          <p><strong>Expire Date:</strong> {student.expireDate}</p>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={onClose}>Close</Button>
    </div>
  </div>
    );
}
   
