import React, { useMemo, useState } from 'react';
import { MapPin, BriefcaseBusiness, CheckCircle2, CircleUserRound } from 'lucide-react';
import { useDashboardTechniciansQuery } from '../../Api/dashboardApi';

const AssignTechnician = () => {
  const [assignedTechnicianId, setAssignedTechnicianId] = useState(null);
  const { data, isLoading, isError } = useDashboardTechniciansQuery();

  const technicians = useMemo(() => {
    if (!data) {
      return [];
    }

    if (Array.isArray(data.all)) {
      return data.all;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  }, [data]);

  const handleAssign = (technicianId) => {
    setAssignedTechnicianId(technicianId);
  };

  if (isLoading) {
    return (
      <section className="flex h-full items-center justify-center rounded-2xl border border-[#E7E7E7] bg-white p-6 text-sm text-slate-500 shadow-sm">
        Loading technicians...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex h-full items-center justify-center rounded-2xl border border-[#E7E7E7] bg-white p-6 text-sm text-red-500 shadow-sm">
        Failed to load technicians.
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white shadow-sm h-full">
      <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-4 sm:px-5">
        <MapPin className="h-5 w-5 text-slate-500" />
        <h3 className="text-base font-semibold text-[#1F2937] sm:text-lg">Assign Technician</h3>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        {technicians.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500 sm:px-5">
            No technicians found.
          </div>
        ) : null}

        {technicians.map((technician) => {
          const isAssigned = technician.id === assignedTechnicianId;
          const avatarSrc = technician.profile_picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';

          return (
            <div
              key={technician.id}
              className={`flex flex-col gap-4 border-b border-[#F1F5F9] px-4 py-4 transition-colors sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between ${
                isAssigned ? 'bg-[#F3F8FF]' : 'bg-white hover:bg-[#FAFBFC]'
              }`}
            >
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={avatarSrc}
                    alt={technician.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white sm:h-14 sm:w-14"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ring-2 ring-white sm:h-4 sm:w-4 ${
                      isAssigned ? 'bg-blue-500' : 'bg-emerald-500'
                    }`}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium text-slate-900 sm:text-base">{technician.full_name}</p>
                    {isAssigned ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-600">
                        <CheckCircle2 className="h-4 w-4" /> Assigned
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {technician.location || 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                      {technician.active_jobs ?? 0} active
                    </span>
                  </div>
                  {technician.specialities ? (
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{technician.specialities}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-end md:shrink-0">
                <button
                  type="button"
                  onClick={() => handleAssign(technician.id)}
                  className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium transition-all sm:h-11 sm:px-5 ${
                    isAssigned
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'border border-[#CBD5E1] bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isAssigned ? 'Assigned' : 'Assign'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#E7E7E7] px-4 py-3 text-xs text-slate-500 sm:px-5 sm:text-sm">
        <div className="flex items-center gap-2">
          <CircleUserRound className="h-4 w-4 text-slate-400" />
          Select a technician to assign them to this job.
        </div>
      </div>
    </section>
  );
};

export default AssignTechnician;