import React, { useMemo } from 'react';
import { Clock3, MessageSquareText, SendHorizonal } from 'lucide-react';
import { useDashboardJobNotesQuery } from '../../Api/dashboardApi';

const formatNoteTime = (value) => {
  if (!value) return 'N/A';

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsedDate);
};

const NotesComponentsJobDetails = ({ jobId }) => {
  const { data, isLoading, isError } = useDashboardJobNotesQuery(jobId);
  console.log(data)

  const notes = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((note, index) => ({
      id: note.id,
      author: note.author_name || 'Unknown',
      time: formatNoteTime(note.created_at),
      message: note.content || 'N/A',
      align: index % 2 === 0 ? 'left' : 'right',
    }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-4 sm:px-5">
          <MessageSquareText className="h-5 w-5 text-[#4B5563]" />
          <h3 className="text-sm font-semibold text-[#111827] sm:text-base">Internal Notes</h3>
        </div>
        <div className="px-4 py-10 text-sm text-[#6B7280] sm:px-5">Loading notes...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-4 sm:px-5">
          <MessageSquareText className="h-5 w-5 text-[#4B5563]" />
          <h3 className="text-sm font-semibold text-[#111827] sm:text-base">Internal Notes</h3>
        </div>
        <div className="px-4 py-10 text-sm text-red-500 sm:px-5">Failed to load notes.</div>
      </section>
    );
  }

  if (!notes.length) {
    return (
      <section className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-4 sm:px-5">
          <MessageSquareText className="h-5 w-5 text-[#4B5563]" />
          <h3 className="text-sm font-semibold text-[#111827] sm:text-base">Internal Notes</h3>
        </div>
        <div className="px-4 py-10 text-sm text-[#6B7280] sm:px-5">No internal notes yet.</div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-4 sm:px-5">
        <MessageSquareText className="h-5 w-5 text-[#4B5563]" />
        <h3 className="text-sm font-semibold text-[#111827] sm:text-base">Internal Notes</h3>
      </div>

      <div className="flex flex-col">
        <div className="bg-white px-4 py-6 sm:px-5 sm:py-8 lg:px-6">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {notes.map((note) => {
              const isRightAligned = note.align === 'right';

              return (
                <div
                  key={note.id}
                  className={`flex w-full ${isRightAligned ? 'justify-start sm:justify-end' : 'justify-start'}`}
                >
                  <article
                    className={`w-full max-w-full rounded-2xl border border-[#D9E4FB] bg-[#F7FAFF] px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] sm:max-w-[22rem] sm:px-5 sm:py-4 ${isRightAligned ? 'sm:ml-auto' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-[#3556A8]">{note.author}</p>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] text-[#6B7280] sm:text-xs">
                        <Clock3 className="h-3.5 w-3.5 shrink-0" />
                        {note.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#374151] sm:text-[15px]">{note.message}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#E7E7E7] bg-[#FBFCFF] px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex-1">
              <span className="sr-only">Type an internal note</span>
              <input
                type="text"
                placeholder="Type an internal note..."
                className="h-12 w-full rounded-xl border border-[#D9E4FB] bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#A3AEC2] focus:border-[#89A8F8] focus:ring-4 focus:ring-[#89A8F8]/15"
                disabled
              />
            </label>

            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#89A8F8] text-white shadow-sm transition-all hover:bg-[#7898F7] hover:shadow-md active:scale-[0.98] sm:w-12"
              aria-label="Send internal note"
              disabled
            >
              <SendHorizonal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesComponentsJobDetails;