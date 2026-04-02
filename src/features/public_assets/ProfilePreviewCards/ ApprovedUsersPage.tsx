/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getApprovedUsersAction } from "./approved-users.actions";
import { Building2, MapPin, BookOpen, Eye } from "lucide-react";
import { IApprovedUser } from "./approved-users.types";


export default function ApprovedUsersPage() {
  const [users, setUsers] = useState<IApprovedUser[]>([]);
  const [selected, setSelected] = useState<IApprovedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedUsersAction().then((res: any) => {
      setUsers(res?.data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="p-6 py-15">
      <h1 className="text-2xl font-bold mb-6">Approved Institutes</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Institute Photo */}
            <div className="h-40 bg-gray-100 overflow-hidden">
              {user.institutePhoto ? (
                <img
                  src={user.institutePhoto}
                  alt={user.instituteName ?? ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Building2 size={40} />
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-gray-800">{user.instituteName ?? "—"}</h2>
                  <p className="text-xs text-orange-500 font-semibold">{user.branchId ?? "—"}</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={user.directorPhoto ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt={user.name ?? ""}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                <span>{user.district ?? "—"}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <BookOpen size={12} />
                <span>{user.courseName ?? "—"}</span>
              </div>

              <button
                onClick={() => setSelected(user)}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-600"
              >
                <Eye size={14} /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{selected.instituteName}</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Branch ID", selected.branchId],
                ["Director", selected.directorName],
                ["Institute Age", selected.instituteAge],
                ["Course", selected.courseName],
                ["Duration", selected.duration],
                ["Session", `${selected.startMonth}/${selected.startYear} — ${selected.endMonth}/${selected.endYear}`],
                ["Education", selected.educationQualification],
                ["Gender", selected.gender],
                ["Nationality", selected.nationality],
                ["Religion", selected.religion],
                ["District", selected.district],
                ["Thana", selected.thanaUpazila],
                ["Village", selected.village],
                ["Post Office", selected.postOffice],
                ["Full Address", selected.fullAddress],
                ["Father", selected.fatherName],
                ["Mother", selected.motherName],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-gray-400 text-xs">{label}</div>
                  <div className="text-gray-700 font-medium">{value ?? "—"}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}