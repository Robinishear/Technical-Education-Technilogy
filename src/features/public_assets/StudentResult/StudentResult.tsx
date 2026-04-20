// import { useEffect, useState } from "react";

// const MarksPage = () => {
//   const [marks, setMarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // 🔹 Fetch Data
//   const fetchMarks = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/marks");
//       const data = await res.json();

//       if (!data.success) {
//         throw new Error("Failed to load data");
//       }

//       setMarks(data.data);
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMarks();
//   }, []);

//   // 🔄 Loading
//   if (loading) {
//     return <h2>Loading results...</h2>;
//   }

//   // ❌ Error
//   if (error) {
//     return <h2 style={{ color: "red" }}>{error}</h2>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📊 Student Results Dashboard</h1>

//       {marks.length === 0 && <p>No data found</p>}

//       {marks.map((mark) => (
//         <div
//           key={mark.id}
//           style={{
//             border: "1px solid #ddd",
//             marginTop: 20,
//             padding: 15,
//             borderRadius: 8,
//           }}
//         >
//           {/* 🔹 Main Info */}
//           <h2>{mark.semesterTitle}</h2>
//           <p>👨‍🎓 Student ID: {mark.studentId}</p>
//           <p>📊 CGPA: {mark.cgpa}</p>
//           <p>🏅 Grade: {mark.grade}</p>
//           <p>📌 Status: {mark.status}</p>

//           {/* 🔹 Subjects */}
//           <h3 style={{ marginTop: 10 }}>Subjects</h3>

//           {mark.subjects?.length > 0 ? (
//             mark.subjects.map((sub) => (
//               <div
//                 key={sub.id}
//                 style={{
//                   marginLeft: 20,
//                   padding: 10,
//                   borderLeft: "3px solid #333",
//                 }}
//               >
//                 <p><b>{sub.subjectName}</b> ({sub.subjectCode})</p>
//                 <p>Credit: {sub.credit}</p>
//                 <p>Total Marks: {sub.totalMarks}</p>
//                 <p>Grade: {sub.grade}</p>
//                 <p>Grade Point: {sub.gradePoint}</p>
//               </div>
//             ))
//           ) : (
//             <p>No subjects found</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MarksPage;