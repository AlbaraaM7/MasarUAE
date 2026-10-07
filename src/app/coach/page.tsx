"use client";

import { useState, useRef } from "react";
import { PAST_QUESTIONS, PastQuestion } from "@/data/pastQuestions";
import { useToast } from "@/components/ToastProvider";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Clock, 
  RotateCcw, 
  HelpCircle,
  FileCheck,
  Award,
  Upload,
  FileText,
  X,
  Paperclip,
  Image as ImageIcon
} from "lucide-react";
import RubberSegment from "@/components/reactbits/RubberSegment";
const CURRICULA = [
  "British (IGCSE/A-Level)",
  "IB Diploma",
  "CBSE",
  "EmSAT",
] as const;

export default function CoachPage() {
  const { showToast } = useToast();
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>("British (IGCSE/A-Level)");
  const [selectedQuestion, setSelectedQuestion] = useState<PastQuestion>(PAST_QUESTIONS[0]);
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // File Upload State (Photo or PDF)
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: "image" | "pdf";
    previewUrl?: string;
  } | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter questions for the selected curriculum
  const availableQuestions = PAST_QUESTIONS.filter(
    (q) => q.curriculum === selectedCurriculum
  );

  const handleSelectCurriculum = (curr: string) => {
    setSelectedCurriculum(curr);
    const firstQ = PAST_QUESTIONS.find((q) => q.curriculum === curr) || PAST_QUESTIONS[0];
    setSelectedQuestion(firstQ);
    setStudentAnswer("");
    setUploadedFile(null);
    setResult(null);
    setShowModelAnswer(false);
  };

  const handleSelectQuestion = (q: PastQuestion) => {
    setSelectedQuestion(q);
    setStudentAnswer("");
    setUploadedFile(null);
    setResult(null);
    setShowModelAnswer(false);
  };

  const handleFileUpload = (file: File) => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      alert("Please upload an image (PNG, JPG, WEBP) or a PDF file.");
      return;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const fileData = {
      name: file.name,
      size: sizeStr,
      type: (isPdf ? "pdf" : "image") as "image" | "pdf",
      previewUrl: isImage ? URL.createObjectURL(file) : undefined,
    };

    setUploadedFile(fileData);

    // If answer box is blank, add an indicator for convenience
    if (!studentAnswer.trim()) {
      setStudentAnswer(`[Handwritten solution attached: ${file.name}]`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleGrade = async () => {
    if (!studentAnswer.trim() && !uploadedFile) {
      showToast({
        title: "Answer Required",
        description: "Please write your answer or upload a photo/PDF of your working.",
        fuseColor: "#f43f5e",
        duration: 3500,
        icon: <AlertCircle className="w-4 h-4 text-rose-500" />
      });
      return;
    }

    setIsGrading(true);
    setResult(null);

    showToast({
      title: "Grading in process...",
      description: "Comparing your solution against official Cambridge / Edexcel mark schemes",
      fuseColor: "#14FFEC",
      duration: 4500,
      icon: <RotateCcw className="w-4 h-4 animate-spin text-[#14FFEC]" />
    });

    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: selectedQuestion.id,
          curriculum: selectedQuestion.curriculum,
          subject: selectedQuestion.subject,
          questionText: selectedQuestion.question,
          studentAnswer: studentAnswer.trim() || `[Handwritten Solution Attached: ${uploadedFile?.name}]`,
          maxMarks: selectedQuestion.marks,
          attachmentName: uploadedFile?.name,
          attachmentType: uploadedFile?.type,
        }),
      });

      const data = await res.json();
      setResult(data);

      showToast({
        title: "Grading Complete!",
        description: `Awarded ${data.score ?? data.awardedMarks ?? 0}/${selectedQuestion.marks} marks. Detailed mark scheme breakdown ready.`,
        fuseColor: "#10b981",
        duration: 4500,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      });
    } catch (err) {
      console.error("Grading failed:", err);
      showToast({
        title: "Grading Interrupted",
        description: "An error occurred while evaluating your answer. Please try again.",
        fuseColor: "#f43f5e",
        duration: 4000,
        icon: <AlertCircle className="w-4 h-4 text-rose-500" />
      });
    } finally {
      setIsGrading(false);
    }
  };

  const handleSolveQuestion = () => {
    setIsSolving(true);
    showToast({
      title: "Solving question in progress...",
      description: `Masar AI is generating step-by-step syllabus solution & mark breakdown for ${selectedQuestion.subject}`,
      fuseColor: "#14FFEC",
      duration: 4000,
      icon: <Sparkles className="w-4 h-4 text-[#14FFEC]" />
    });

    setTimeout(() => {
      setShowModelAnswer(true);
      setIsSolving(false);
      showToast({
        title: "Question Solved!",
        description: "Official examiner solution and mark breakdown are now revealed.",
        fuseColor: "#10b981",
        duration: 4000,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-[#323232] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Past Paper & Curriculum Coach
          </h1>
          <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
            Practice actual past-paper exam questions and get graded against official examiner mark schemes.
          </p>
        </div>

        {/* Curriculum Selector Tabs with React Bits RubberSegment Elastic Effect */}
        <div className="overflow-x-auto max-w-full pb-1 pt-0.5">
          <RubberSegment
            items={CURRICULA.map((curr) => ({
              value: curr,
              label: curr,
            }))}
            value={selectedCurriculum}
            onChange={(val) => handleSelectCurriculum(val)}
            thumbColor="#14FFEC"
            activeTextColor="#09090b"
            size="md"
            radius={14}
            inset={3}
            equalSlots={false}
            stretch={110}
            squash={4}
            speed={1}
            glide={75}
            draggable={true}
            className="border border-slate-300 dark:border-white/10 shadow-xs"
          />
        </div>
      </div>

      {/* Main Practice Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Question Selection & Prompts (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <span>Available Past Questions</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              {availableQuestions.length} Questions
            </span>
          </div>

          <div className="space-y-2.5">
            {availableQuestions.map((q) => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#0D7377]/15 dark:bg-[#0D7377]/30 border-[#14FFEC] shadow-sm ring-1 ring-[#14FFEC]/40"
                      : "bg-white dark:bg-[#323232] border-slate-200 dark:border-[#424242] hover:border-[#14FFEC]/40 hover:bg-slate-50 dark:hover:bg-[#3a3a3a]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-900 dark:text-white">{q.subject}</span>
                    <span className="font-bold text-[#0D7377] dark:text-[#14FFEC] bg-[#14FFEC]/10 border border-[#14FFEC]/20 px-2 py-0.5 rounded-md">
                      {q.marks} Marks
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mb-2">{q.paperInfo}</p>
                  <p className="text-xs text-slate-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                    {q.question}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
            <p className="font-bold flex items-center space-x-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Exam Coach Tip for UAE Students</span>
            </p>
            <p className="leading-relaxed text-amber-800 dark:text-amber-300">
              Exam boards deduct marks when units are missing, or when students write general statements instead of syllabus keywords (e.g. stating 'it saves time' instead of 'reduces production lead time').
            </p>
          </div>
        </div>

        {/* Right Column: Active Question, Student Answer Box & Feedback (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Question Card */}
          <div className="bg-white dark:bg-[#323232] rounded-3xl border border-slate-200 dark:border-[#424242] shadow-xs p-6 sm:p-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-[#424242] pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] bg-[#14FFEC]/10 border border-[#14FFEC]/30 px-2.5 py-0.5 rounded-full">
                  {selectedQuestion.level} • {selectedQuestion.subject}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  {selectedQuestion.paperInfo}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] px-2.5 py-1 rounded-lg">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Max Marks: {selectedQuestion.marks}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedQuestion.question}
              </h2>
              {selectedQuestion.contextOrEquation && (
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#212121] border border-slate-200/80 dark:border-[#424242] font-mono text-xs text-slate-700 dark:text-[#14FFEC]">
                  {selectedQuestion.contextOrEquation}
                </div>
              )}
            </div>

            {/* Answer Box */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium">
                <span>Write your answer or steps below:</span>
                <span>{studentAnswer.length} characters</span>
              </div>

              <textarea
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                placeholder="Show your formula, working steps, calculations, or explanations..."
                rows={5}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#212121] focus:bg-white dark:focus:bg-[#212121] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-sm font-sans text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none transition-all"
              />

              {/* Upload Handwritten Working (Photo or PDF) */}
              <div className="pt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {!uploadedFile ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-3.5 sm:p-4 text-center transition-all ${
                      dragOver
                        ? "border-[#14FFEC] bg-[#14FFEC]/10"
                        : "border-slate-300/80 dark:border-[#424242] hover:border-[#14FFEC]/50 bg-slate-50/70 dark:bg-[#282828]/50 hover:bg-slate-50 dark:hover:bg-[#282828]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs">
                      <div className="flex items-center space-x-2 text-slate-700 dark:text-zinc-300 font-semibold">
                        <div className="w-7 h-7 rounded-lg bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] flex items-center justify-center shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                        </div>
                        <span>Upload photo or PDF of your working</span>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                        (PNG, JPG, WEBP, or PDF — AI Vision OCR evaluated)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-[#282828] border border-slate-200 dark:border-[#424242] animate-in fade-in duration-200">
                    <div className="flex items-center space-x-3 min-w-0">
                      {uploadedFile.type === "image" && uploadedFile.previewUrl ? (
                        <img
                          src={uploadedFile.previewUrl}
                          alt="Uploaded working"
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-[#424242] shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {uploadedFile.name}
                          </p>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] shrink-0">
                            {uploadedFile.type === "image" ? "Photo Attached" : "PDF Attached"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                          {uploadedFile.size} • AI Examiner Ready to Evaluate
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-[#383838] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                      title="Remove attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setStudentAnswer(selectedQuestion.modelAnswer);
                    }}
                    className="text-xs text-[#0D7377] dark:text-[#14FFEC] hover:underline font-semibold"
                  >
                    Insert Sample Answer
                  </button>
                  <span className="text-slate-300 dark:text-zinc-600 text-xs">•</span>
                  <button
                    onClick={handleSolveQuestion}
                    disabled={isSolving}
                    className="inline-flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 font-bold"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isSolving ? "Solving in progress..." : "Solve Question with AI"}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  {result && (
                    <button
                      onClick={() => setShowModelAnswer(!showModelAnswer)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-[#424242] hover:bg-slate-50 dark:hover:bg-[#212121] text-slate-700 dark:text-zinc-200 transition-colors"
                    >
                      {showModelAnswer ? "Hide Model Answer" : "View Model Answer"}
                    </button>
                  )}

                  <button
                    onClick={handleGrade}
                    disabled={isGrading || (!studentAnswer.trim() && !uploadedFile)}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#14FFEC] hover:bg-[#14FFEC]/90 disabled:opacity-50 text-[#212121] font-bold text-sm shadow-md shadow-[#14FFEC]/20 transition-all hover:scale-[1.01] cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isGrading ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        <span>Grading with Mark Scheme...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#212121]" />
                        <span>Grade Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Model Answer Preview Box (Toggleable) */}
          {showModelAnswer && (
            <div className="bg-slate-50 dark:bg-[#212121] text-slate-900 dark:text-white rounded-2xl p-6 shadow-xs border border-slate-200 dark:border-[#424242] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0D7377] dark:text-[#14FFEC] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D7377] dark:text-[#14FFEC]" />
                  <span>Official Examiner Model Answer</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">100% Marks Solution</span>
              </div>
              <pre className="text-xs text-slate-800 dark:text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border border-slate-200 dark:border-[#323232]">
                {selectedQuestion.modelAnswer}
              </pre>
            </div>
          )}

          {/* AI Result Card */}
          {result && (
            <div className="bg-white dark:bg-[#323232] rounded-2xl p-6 border-2 border-[#14FFEC]/40 shadow-xl space-y-6 animate-in fade-in duration-300">
              {/* Graded Attachment Notice */}
              {result.attachmentInfo && (
                <div className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] text-xs">
                  <Paperclip className="w-4 h-4 text-[#0D7377] dark:text-[#14FFEC] shrink-0" />
                  <span className="text-slate-600 dark:text-zinc-400">Graded Working File:</span>
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {result.attachmentInfo.name}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] uppercase">
                    {result.attachmentInfo.type}
                  </span>
                </div>
              )}

              {/* Score header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0D7377]/15 dark:bg-[#0D7377]/25 border border-[#14FFEC]/40">
                <div>
                  <span className="text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] uppercase tracking-wide">
                    Evaluated Score
                  </span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 dark:text-[#14FFEC]">
                      {result.awardedMarks} / {result.maxMarks}
                    </span>
                    <span className="text-sm font-bold text-[#0D7377] dark:text-[#14FFEC]">
                      ({result.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Estimated Grade</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{result.gradeLabel}</p>
                </div>
              </div>

              {/* Strengths & Missing Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 rounded-xl bg-[#0D7377]/10 dark:bg-[#0D7377]/20 border border-[#0D7377]/30">
                  <h4 className="text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] uppercase tracking-wider flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#14FFEC]" />
                    <span>What You Did Well</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-200">
                    {result.feedback.strengths.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-1.5 leading-relaxed">
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 p-4 rounded-xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/30">
                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span>Where You Lost Marks</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-zinc-200">
                    {result.feedback.areasForImprovement.map((imp: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-1.5 leading-relaxed">
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Examiner Note & Common Mistakes */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] space-y-2 text-xs text-slate-600 dark:text-zinc-300">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-white">
                  <FileCheck className="w-4 h-4 text-[#14FFEC]" />
                  <span>Examiner Rubric Standard</span>
                </div>
                <p className="leading-relaxed">{result.feedback.examinerNote}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
