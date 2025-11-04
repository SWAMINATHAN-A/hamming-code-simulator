import { X } from "lucide-react";

interface DevelopedByModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DevelopedByModal({ open, onClose }: DevelopedByModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[90%] md:w-[700px] bg-white dark:bg-[#1f1b45] p-10 rounded-2xl shadow-2xl border border-[#FFB300]/30 relative">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
          onClick={onClose}
        >
          <X className="text-[#FFB300] w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#FFB300] mb-8 tracking-wide">
          Developed By
        </h2>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">

          {/* Joel */}
          <div>
            <img
              src="/profiles/joel.jpg"
              className="w-32 h-32 rounded-full mx-auto border-4 border-[#FFB300] shadow-lg object-cover"
            />
            <p className="text-lg mt-4 font-semibold text-[#24292F] dark:text-[#FFB300]">Joel Alfred Israel</p>
            <p className="text-sm text-[#24292F]/70 dark:text-[#FFB300]/70">Register Number: 24BCE5361</p>
          </div>

          {/* Nithin */}
          <div>
            <img
              src="/profiles/nithin.jpg"
              className="w-32 h-32 rounded-full mx-auto border-4 border-[#FFB300] shadow-lg object-cover"
            />
            <p className="text-lg mt-4 font-semibold text-[#24292F] dark:text-[#FFB300]">Nithin</p>
            <p className="text-sm text-[#24292F]/70 dark:text-[#FFB300]/70">Register Number: 24BCE5392</p>
          </div>

        </div>
      </div>
    </div>
  );
}
