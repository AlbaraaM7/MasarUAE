"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Award, 
  Check, 
  School
} from "lucide-react";
import { 
  StudentProfile, 
  getStudentProfile, 
  saveStudentProfile 
} from "@/lib/studentProfile";
import GlideSelect, { GlideSelectOption } from "@/components/reactbits/GlideSelect";

const EMIRATE_OPTIONS: GlideSelectOption[] = [
  { value: "Dubai", label: "Dubai", tag: "DXB" },
  { value: "Abu Dhabi", label: "Abu Dhabi", tag: "AUH" },
  { value: "Sharjah", label: "Sharjah", tag: "SHJ" },
  { value: "Ajman", label: "Ajman", tag: "AJM" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah", tag: "RAK" },
  { value: "Fujairah", label: "Fujairah", tag: "FUJ" },
  { value: "Umm Al Quwain", label: "Umm Al Quwain", tag: "UAQ" },
];

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated?: (updated: StudentProfile) => void;
}

export function UpdateProfileModal({
  isOpen,
  onClose,
  onProfileUpdated,
}: UpdateProfileModalProps) {
  const [formData, setFormData] = useState<StudentProfile>(getStudentProfile());
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(getStudentProfile());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveStudentProfile(formData);
    setIsSaved(true);
    if (onProfileUpdated) {
      onProfileUpdated(formData);
    }
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#282828] border border-slate-200 dark:border-[#383838] shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-zinc-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#333333]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Update Student Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Personal details & academic admissions benchmarks
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#323232] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                First Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Rashid"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Al-Nuaimi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. rashid.alnuaimi@example.ae"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
            />
          </div>

          {/* Date of Birth & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
                <span>Date of Birth (DOB) *</span>
              </label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
                <span>Location / Emirate *</span>
              </label>
              <GlideSelect
                options={EMIRATE_OPTIONS}
                value={formData.location}
                onChange={(val) => setFormData({ ...formData, location: val })}
                ariaLabel="Location / Emirate"
                showTags
                size="md"
                radius={12}
                menuWidth="100%"
                placement="bottom"
                align="left"
                className="w-full"
              />
            </div>
          </div>

          {/* Academic Grades & GPA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
                <span>Grades / Syllabus *</span>
              </label>
              <input
                type="text"
                required
                value={formData.grades}
                onChange={(e) => setFormData({ ...formData, grades: e.target.value })}
                placeholder="e.g. A*AA, IB 38, or 92%"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
                <span>GPA (out of 4.0) *</span>
              </label>
              <input
                type="text"
                required
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="e.g. 3.9"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
          </div>

          {/* School & Target Major */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 flex items-center space-x-1.5">
                <School className="w-3.5 h-3.5 text-[#0D7377] dark:text-[#14FFEC]" />
                <span>School / High School</span>
              </label>
              <input
                type="text"
                value={formData.school || ""}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                placeholder="e.g. Dubai College"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                Target Major
              </label>
              <input
                type="text"
                value={formData.targetMajor || ""}
                onChange={(e) => setFormData({ ...formData, targetMajor: e.target.value })}
                placeholder="e.g. Computer Science"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-[#323232] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#14FFEC] hover:bg-[#14FFEC]/90 text-[#212121] font-bold text-xs shadow-md shadow-[#14FFEC]/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-[#212121]" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
