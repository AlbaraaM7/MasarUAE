"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Award, 
  Heart,
  BookOpen, 
  GraduationCap, 
  CheckCircle2,
  Download,
  ChevronDown,
  Image as ImageIcon,
  RotateCcw
} from "lucide-react";

import { useToast } from "@/components/ToastProvider";
import { getStudentProfile } from "@/lib/studentProfile";

interface VolunteeringItem {
  id: string;
  organization: string;
  role: string;
  hours: number;
  description: string;
}

interface ActivityItem {
  id: string;
  title: string;
  category: "Leadership" | "Club / Society" | "Competition" | "Athletics";
  description: string;
}

export default function CVBuilderPage() {
  const { showToast } = useToast();
  const [studentName, setStudentName] = useState("Rashid Al-Nuaimi");
  const [email, setEmail] = useState("rashid.alnuaimi@example.ae");
  const [phone, setPhone] = useState("+971 50 123 4567");
  const [location, setLocation] = useState("Dubai, United Arab Emirates");
  const [school, setSchool] = useState("Dubai College");
  const [curriculum, setCurriculum] = useState("British Curriculum (Year 13)");
  const [targetMajor, setTargetMajor] = useState("Computer Science & Artificial Intelligence");
  const [exportFormat, setExportFormat] = useState<"pdf" | "doc" | "jpeg" | "png">("pdf");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const cvExportRef = useRef<HTMLDivElement>(null);

  // Synchronize CV with authenticated student profile
  useEffect(() => {
    const syncProfile = () => {
      const p = getStudentProfile();
      const fName = `${p.firstName || ""} ${p.lastName || ""}`.trim();
      if (fName) {
        setStudentName(fName);
      }
      if (p.email) {
        setEmail(p.email);
      }
      if (p.phone) {
        setPhone(p.phone);
      }
      if (p.location) {
        const formattedLoc = p.location.includes("United Arab Emirates") || p.location.includes("UAE")
          ? p.location
          : `${p.location}, United Arab Emirates`;
        setLocation(formattedLoc);
      }
      if (p.school && p.school !== "Dubai College") {
        setSchool(p.school);
      }
      if (p.curriculum) {
        setCurriculum(p.curriculum);
      }
      if (p.targetMajor) {
        setTargetMajor(p.targetMajor);
      }
    };

    syncProfile();
    window.addEventListener("masar_student_profile_updated", syncProfile);
    return () => window.removeEventListener("masar_student_profile_updated", syncProfile);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const [volunteering, setVolunteering] = useState<VolunteeringItem[]>([
    {
      id: "v1",
      organization: "Dubai Cares",
      role: "Youth Volunteer Ambassador",
      hours: 35,
      description: "Coordinated volunteer book distribution and fundraising drives supporting education access for children."
    },
    {
      id: "v2",
      organization: "Emirates Red Crescent",
      role: "Community Relief Aid Volunteer",
      hours: 25,
      description: "Assisted in packing Ramadan food hampers and organizing local donation centers across Dubai."
    }
  ]);

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "a1",
      title: "President, High School Artificial Intelligence & Coding Club",
      category: "Leadership",
      description: "Led weekly Python and web development workshops for 40+ younger students; mentored junior robotics teams."
    },
    {
      id: "a2",
      title: "Head Delegate, Dubai International Model United Nations (DIAMUN)",
      category: "Club / Society",
      description: "Drafted resolutions on international environmental treaties and cybersecurity governance; awarded Best Delegate."
    }
  ]);

  const [honors, setHonors] = useState<string[]>([
    "Academic Excellence Award (Top 5% of Year 12 cohort)",
    "IELTS Academic Band 8.0 (Listening 8.5, Reading 8.5, Speaking 8.0)",
    "Bronze Medalist - UAE Kangaroo Mathematics Competition"
  ]);

  // Calculations
  const totalVolunteerHours = volunteering.reduce((acc, curr) => acc + (Number(curr.hours) || 0), 0);

  const addVolunteerRow = () => {
    setVolunteering([
      ...volunteering,
      {
        id: Date.now().toString(),
        organization: "Emirates Red Crescent",
        role: "Volunteer",
        hours: 10,
        description: "Contributed to local community service initiatives."
      }
    ]);
  };

  const removeVolunteerRow = (id: string) => {
    setVolunteering(volunteering.filter((v) => v.id !== id));
  };

  const addActivityRow = () => {
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        title: "Student Council Representative",
        category: "Leadership",
        description: "Represented student body concerns to school administration."
      }
    ]);
  };

  const removeActivityRow = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const buildDocxHtml = () => {
    return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${studentName} - Academic CV</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page WordSection1 {
      size: 210mm 297mm;
      margin: 16mm 18mm 16mm 18mm;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.WordSection1 {
      page: WordSection1;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      font-size: 10pt;
      color: #0f172a;
      line-height: 1.45;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-family: 'Times New Roman', Georgia, serif;
      font-size: 22pt;
      font-weight: bold;
      color: #0f172a;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 0 0 4pt 0;
    }
    .contact {
      text-align: center;
      font-size: 9.5pt;
      color: #475569;
      margin-bottom: 6pt;
    }
    .header-divider {
      border-bottom: 2pt solid #0f172a;
      margin-bottom: 12pt;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: bold;
      letter-spacing: 1.5px;
      color: #1e293b;
      text-transform: uppercase;
      border-bottom: 1pt solid #cbd5e1;
      padding-bottom: 3pt;
      margin-top: 12pt;
      margin-bottom: 6pt;
    }
    .badge {
      background-color: #e6f7f6;
      color: #0D7377;
      border: 1pt solid #99ded9;
      padding: 2pt 8pt;
      font-size: 8pt;
      font-weight: bold;
      border-radius: 4pt;
      text-transform: uppercase;
      display: inline-block;
    }
    .item-title {
      font-size: 10pt;
      font-weight: bold;
      color: #0f172a;
    }
    .item-hours {
      font-family: 'Courier New', monospace;
      font-size: 9pt;
      color: #64748b;
      font-weight: bold;
    }
    .item-role {
      font-size: 9pt;
      font-style: italic;
      color: #334155;
      margin-top: 1pt;
    }
    .item-desc {
      font-size: 9pt;
      color: #475569;
      line-height: 1.4;
      margin-top: 2pt;
    }
    ul {
      margin: 4pt 0 10pt 0;
      padding-left: 18pt;
    }
    li {
      font-size: 9pt;
      color: #334155;
      line-height: 1.45;
      margin-bottom: 2pt;
    }
    .footer-table {
      border-top: 1pt solid #cbd5e1;
      padding-top: 8pt;
      margin-top: 16pt;
    }
  </style>
</head>
<body>
<div class="WordSection1">
  <table width="100%" cellpadding="22" cellspacing="0" style="border: 1.5pt solid #cbd5e1; border-radius: 12pt; background-color: #ffffff;">
    <tr>
      <td>
        <!-- Header -->
        <h1>${studentName}</h1>
        <div class="contact">
          ${location} &bull; ${email} &bull; ${phone}
        </div>
        <div class="header-divider"></div>

  <!-- Academic Profile & Goal -->
  <div class="section-title">Academic Profile &amp; Goal</div>
  <p style="font-size: 9.5pt; color: #334155; line-height: 1.5; margin: 0 0 12pt 0;">
    Dedicated student at <strong>${school}</strong> pursuing the <strong>${curriculum}</strong>. Aspiring to pursue undergraduate studies in <strong>${targetMajor}</strong>. Strong commitment to community service with <strong style="color: #0D7377;">${totalVolunteerHours} verified volunteer hours</strong> across UAE charity and youth initiatives.
  </p>

  <!-- Community Service -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 1pt solid #cbd5e1; padding-bottom: 3pt; margin-top: 12pt; margin-bottom: 8pt;">
    <tr>
      <td align="left" style="font-size: 9.5pt; font-weight: bold; letter-spacing: 1.5px; color: #1e293b; text-transform: uppercase;">
        Community Service &amp; Civic Volunteering
      </td>
      <td align="right">
        <span class="badge">UAE VERIFIED: ${totalVolunteerHours} HOURS</span>
      </td>
    </tr>
  </table>

  ${volunteering
    .map(
      (v) => `
    <div style="margin-bottom: 8pt;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="left" class="item-title">${v.organization}</td>
          <td align="right" class="item-hours">${v.hours} Hours</td>
        </tr>
      </table>
      <div class="item-role">${v.role}</div>
      <div class="item-desc">${v.description}</div>
    </div>
  `
    )
    .join("")}

  <!-- Extracurricular Leadership & Activities -->
  <div class="section-title">Extracurricular Leadership &amp; Activities</div>

  ${activities
    .map(
      (a) => `
    <div style="margin-bottom: 8pt;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="left" class="item-title">${a.title}</td>
          <td align="right">
            <span class="badge">${a.category}</span>
          </td>
        </tr>
      </table>
      <div class="item-desc">${a.description}</div>
    </div>
  `
    )
    .join("")}

  <!-- Academic Honors & Standardized Benchmarks -->
  <div class="section-title">Academic Honors &amp; Standardized Benchmarks</div>
  <ul>
    ${honors.map((h) => `<li>${h}</li>`).join("")}
  </ul>

  <!-- Footer Verification -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="footer-table">
    <tr>
      <td align="left" style="font-size: 8.5pt; color: #64748b;">
        <span style="color: #0D7377; font-weight: bold; font-size: 9.5pt;">&#10003;</span> Format compliant with UAE &amp; international university application portals
      </td>
      <td align="right" style="font-size: 8.5pt; font-weight: bold; color: #0D7377;">
        Powered by Masar UAE
      </td>
    </tr>
  </table>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
  };

  const handleExport = async (selectedFormat?: "pdf" | "doc" | "jpeg" | "png") => {
    const format = selectedFormat || exportFormat;
    if (selectedFormat) setExportFormat(selectedFormat);
    setDropdownOpen(false);

    const baseFilename = `${studentName.trim().replace(/\s+/g, "_") || "UAE_Student"}_CV`;
    setIsExporting(true);

    showToast({
      title: "Downloading CV...",
      description: `Generating .${format.toUpperCase()} document`,
      fuseColor: "#14FFEC",
      duration: 3000,
      icon: <Download className="w-4 h-4 text-[#14FFEC]" />
    });

    try {
      if (format === "doc") {
        const docHtml = buildDocxHtml();
        downloadFile(docHtml, `${baseFilename}.docx`, "application/vnd.ms-word;charset=utf-8");
        showToast({
          title: "Download Complete!",
          description: `Saved as ${baseFilename}.docx`,
          fuseColor: "#10b981",
          duration: 3500,
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        });
      } else {
        const targetEl = cvExportRef.current || cvPreviewRef.current;
        if (!targetEl) {
          throw new Error("CV export element not found");
        }

        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(targetEl, {
          scale: 3, // 300 DPI ultra-high sharpness
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          width: 794,
          windowWidth: 794,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById("cv-export-clean-document");
            if (el) {
              clonedDoc.body.innerHTML = "";
              clonedDoc.body.style.margin = "0px";
              clonedDoc.body.style.padding = "0px";
              clonedDoc.body.style.background = "#ffffff";
              clonedDoc.body.appendChild(el);
              el.style.position = "static";
              el.style.left = "0px";
              el.style.top = "0px";
              el.style.margin = "0px";
              el.style.zIndex = "1";
              el.style.display = "block";
              el.style.visibility = "visible";
              el.style.opacity = "1";
            }
          },
        });

        if (format === "png") {
          const imgUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgUrl;
          link.download = `${baseFilename}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (format === "jpeg") {
          const imgUrl = canvas.toDataURL("image/jpeg", 0.98);
          const link = document.createElement("a");
          link.href = imgUrl;
          link.download = `${baseFilename}.jpeg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (format === "pdf") {
          const { jsPDF } = await import("jspdf");
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
          });
          const pdfWidth = 210;
          const pdfHeight = 297;
          const margin = 6;
          const printWidth = pdfWidth - margin * 2;
          const printHeight = (canvas.height * printWidth) / canvas.width;

          if (printHeight <= pdfHeight - margin * 2) {
            pdf.addImage(imgData, "PNG", margin, margin, printWidth, printHeight, undefined, "FAST");
          } else {
            let heightLeft = printHeight;
            let position = margin;
            pdf.addImage(imgData, "PNG", margin, position, printWidth, printHeight, undefined, "FAST");
            heightLeft -= (pdfHeight - margin * 2);
            while (heightLeft > 0) {
              position = heightLeft - printHeight + margin;
              pdf.addPage();
              pdf.addImage(imgData, "PNG", margin, position, printWidth, printHeight, undefined, "FAST");
              heightLeft -= (pdfHeight - margin * 2);
            }
          }
          pdf.save(`${baseFilename}.pdf`);
        }

        showToast({
          title: "Download Complete!",
          description: `Successfully downloaded ${baseFilename}.${format}`,
          fuseColor: "#10b981",
          duration: 3500,
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        });
      }
    } catch (err) {
      console.error("Export error:", err);
      showToast({
        title: "Download Failed",
        description: "An error occurred while generating the document. Please try again.",
        fuseColor: "#f43f5e",
        duration: 4000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header (Hidden when printing) */}
      <div className="no-print flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-[#323232] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            UAE Student CV & Activity Portfolio Builder
          </h1>
          <p className="text-sm text-slate-600 dark:text-zinc-400 mt-1">
            Build a certified academic resume highlighting your UAE community service, leadership, and extracurriculars.
          </p>
        </div>

        {/* Single unified Download button with format dropdown arrow */}
        <div ref={dropdownRef} className="relative inline-flex items-center">
          <div className="inline-flex items-stretch rounded-xl bg-[#14FFEC] shadow-md shadow-[#14FFEC]/20 hover:shadow-lg hover:shadow-[#14FFEC]/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
            {/* Main Action: Download */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleExport()}
              className="inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-black text-[#212121] hover:bg-[#00e5d1] rounded-l-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none"
              title={`Download CV as .${exportFormat.toUpperCase()}`}
            >
              {isExporting ? (
                <RotateCcw className="w-4 h-4 animate-spin text-[#212121]" />
              ) : (
                <Download className="w-4 h-4 text-[#212121]" />
              )}
              <span>{isExporting ? "Exporting..." : "Download"}</span>
            </button>

            {/* Subtle Divider */}
            <div className="w-[1px] bg-black/15 self-stretch my-1.5" />

            {/* Tiny Arrow Toggle */}
            <button
              type="button"
              disabled={isExporting}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-label="Select download format"
              aria-expanded={dropdownOpen}
              className="px-2.5 flex items-center justify-center text-[#212121] hover:bg-[#00e5d1] rounded-r-xl transition-colors cursor-pointer select-none"
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Format Selection Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-[#1c1c1f] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Download Format
              </p>
              {[
                { id: "pdf" as const, label: "PDF Document", ext: ".pdf", badge: "Official" },
                { id: "doc" as const, label: "Word Document", ext: ".docx", badge: "Editable" },
                { id: "jpeg" as const, label: "JPEG Image", ext: ".jpeg", badge: "Photo" },
                { id: "png" as const, label: "PNG Image", ext: ".png", badge: "Lossless" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleExport(opt.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    exportFormat === opt.id
                      ? "bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] font-black"
                      : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/80 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {opt.id === "pdf" ? (
                      <FileText className="w-4 h-4 text-rose-500" />
                    ) : opt.id === "doc" ? (
                      <FileText className="w-4 h-4 text-blue-500" />
                    ) : opt.id === "jpeg" ? (
                      <ImageIcon className="w-4 h-4 text-amber-500" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                    )}
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 uppercase">
                    {opt.ext}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Builder (6 cols, hidden in print) */}
        <div className="no-print lg:col-span-6 space-y-6">
          {/* Personal Details */}
          <div className="bg-white dark:bg-[#323232] p-6 rounded-2xl border border-slate-200 dark:border-[#424242] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-[#0D7377] dark:text-[#14FFEC]" />
              <span>Student Profile Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Emirate / City</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">School / Institution</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Curriculum & Grade</label>
                <input
                  type="text"
                  value={curriculum}
                  onChange={(e) => setCurriculum(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-600 dark:text-zinc-300 font-medium mb-1">Target Major / College Goal</label>
              <input
                type="text"
                value={targetMajor}
                onChange={(e) => setTargetMajor(e.target.value)}
                placeholder="e.g. Mechanical Engineering, Business Analytics, Medicine"
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#212121] text-slate-900 dark:text-white focus:ring-1 focus:ring-[#14FFEC] focus:border-[#14FFEC] outline-none"
              />
            </div>
          </div>

          {/* UAE Volunteering & Service */}
          <div className="bg-white dark:bg-[#323232] p-6 rounded-2xl border border-slate-200 dark:border-[#424242] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>UAE Community Service & Volunteering</span>
              </h3>
              <button
                onClick={addVolunteerRow}
                className="inline-flex items-center space-x-1 text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="space-y-3">
              {volunteering.map((v, idx) => (
                <div key={v.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-zinc-200">Volunteering #{idx + 1}</span>
                    <button
                      onClick={() => removeVolunteerRow(v.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Organization (e.g. Dubai Cares)"
                      value={v.organization}
                      onChange={(e) => {
                        const updated = [...volunteering];
                        updated[idx].organization = e.target.value;
                        setVolunteering(updated);
                      }}
                      className="p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Hours (e.g. 25)"
                      value={v.hours}
                      onChange={(e) => {
                        const updated = [...volunteering];
                        updated[idx].hours = Number(e.target.value) || 0;
                        setVolunteering(updated);
                      }}
                      className="p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Role (e.g. Student Volunteer Ambassador)"
                    value={v.role}
                    onChange={(e) => {
                      const updated = [...volunteering];
                      updated[idx].role = e.target.value;
                      setVolunteering(updated);
                    }}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                  />

                  <textarea
                    placeholder="Brief description of impact or activities..."
                    value={v.description}
                    rows={2}
                    onChange={(e) => {
                      const updated = [...volunteering];
                      updated[idx].description = e.target.value;
                      setVolunteering(updated);
                    }}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Extracurriculars & Clubs */}
          <div className="bg-white dark:bg-[#323232] p-6 rounded-2xl border border-slate-200 dark:border-[#424242] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Extracurricular Leadership & Clubs</span>
              </h3>
              <button
                onClick={addActivityRow}
                className="inline-flex items-center space-x-1 text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Activity</span>
              </button>
            </div>

            <div className="space-y-3">
              {activities.map((a, idx) => (
                <div key={a.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-zinc-200">Activity #{idx + 1}</span>
                    <button
                      onClick={() => removeActivityRow(a.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Position & Organization"
                    value={a.title}
                    onChange={(e) => {
                      const updated = [...activities];
                      updated[idx].title = e.target.value;
                      setActivities(updated);
                    }}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                  />

                  <textarea
                    placeholder="Description of leadership, impact, or outcomes..."
                    value={a.description}
                    rows={2}
                    onChange={(e) => {
                      const updated = [...activities];
                      updated[idx].description = e.target.value;
                      setActivities(updated);
                    }}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-[#424242] bg-white dark:bg-[#323232] text-slate-900 dark:text-white focus:border-[#14FFEC] focus:ring-1 focus:ring-[#14FFEC] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Academic CV Preview (6 cols / 12 cols when printed) */}
        <div className="lg:col-span-6">
          <div 
            ref={cvPreviewRef}
            id="cv-document-preview"
            className="sticky top-20 bg-white text-slate-900 p-8 rounded-2xl border border-slate-300 dark:border-[#424242] shadow-xl space-y-6 print:shadow-none print:border print:border-slate-300 print:rounded-2xl print:p-8"
          >
            {/* CV Header */}
            <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
              <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-wide uppercase">
                {studentName}
              </h2>
              <div className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-2">
                <span>{location}</span>
                <span>•</span>
                <span>{email}</span>
                <span>•</span>
                <span>{phone}</span>
              </div>
            </div>

            {/* Academic Objective */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Academic Profile & Goal
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Dedicated student at <span className="font-semibold">{school}</span> pursuing the <span className="font-semibold">{curriculum}</span>. Aspiring to pursue undergraduate studies in <span className="font-semibold">{targetMajor}</span>. Strong commitment to community service with <span className="font-semibold text-[#0D7377]">{totalVolunteerHours} verified volunteer hours</span> across UAE charity and youth initiatives.
              </p>
            </div>

            {/* Volunteering & Community Engagement */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>Community Service & Civic Volunteering</span>
                <span className="text-[10px] font-bold text-[#0D7377] bg-[#0D7377]/10 border border-[#0D7377]/20 px-2 py-0.5 rounded">
                  UAE Verified: {totalVolunteerHours} Hours
                </span>
              </h3>

              <div className="space-y-3">
                {volunteering.map((v) => (
                  <div key={v.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{v.organization}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{v.hours} Hours</span>
                    </div>
                    <p className="font-medium text-slate-700 text-[11px] italic">{v.role}</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracurriculars & Leadership */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Extracurricular Leadership & Activities
              </h3>

              <div className="space-y-3">
                {activities.map((a) => (
                  <div key={a.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{a.title}</span>
                      <span className="text-[10px] text-[#0D7377] bg-[#0D7377]/10 border border-[#0D7377]/20 px-2 py-0.5 rounded font-sans font-bold">
                        {a.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors & Certifications */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Academic Honors & Standardized Benchmarks
              </h3>

              <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                {honors.map((h, i) => (
                  <li key={i} className="text-[11px] leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Verification Footer Stamp */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7377]" />
                <span>Format compliant with UAE & international university application portals</span>
              </div>
              <span className="font-semibold text-[#0D7377]">Powered by Masar UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pristine A4 Document Container for High-DPI Export (PDF / PNG / JPEG) */}
      <div
        ref={cvExportRef}
        id="cv-export-clean-document"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          width: "794px",
          zIndex: -9999,
          pointerEvents: "none",
          backgroundColor: "#ffffff",
          padding: "20px",
          boxSizing: "border-box",
        }}
        className="select-none"
      >
        {/* Rectangular Box Card matching live preview */}
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "1.5px solid #cbd5e1",
            borderRadius: "16px",
            padding: "36px 32px",
            boxSizing: "border-box",
            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
          }}
          className="space-y-6 font-sans"
        >
          {/* CV Header */}
          <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1.5">
            <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-wide uppercase">
              {studentName}
            </h1>
            <div className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-2">
              <span>{location}</span>
              <span>•</span>
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
            </div>
          </div>

          {/* Academic Objective */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              Academic Profile &amp; Goal
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Dedicated student at <span className="font-semibold">{school}</span> pursuing the <span className="font-semibold">{curriculum}</span>. Aspiring to pursue undergraduate studies in <span className="font-semibold">{targetMajor}</span>. Strong commitment to community service with <span className="font-semibold text-[#0D7377]">{totalVolunteerHours} verified volunteer hours</span> across UAE charity and youth initiatives.
            </p>
          </div>

          {/* Volunteering & Community Engagement */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Community Service &amp; Civic Volunteering
              </h2>
              <span className="text-[10px] font-bold text-[#0D7377] bg-[#0D7377]/10 border border-[#0D7377]/20 px-2.5 py-0.5 rounded font-sans uppercase">
                UAE Verified: {totalVolunteerHours} Hours
              </span>
            </div>

            <div className="space-y-3">
              {volunteering.map((v) => (
                <div key={v.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-xs font-bold">{v.organization}</span>
                    <span className="text-slate-500 font-mono text-[11px] font-medium">{v.hours} Hours</span>
                  </div>
                  <p className="font-medium text-slate-700 text-[11px] italic">{v.role}</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extracurriculars & Leadership */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              Extracurricular Leadership &amp; Activities
            </h2>

            <div className="space-y-3">
              {activities.map((a) => (
                <div key={a.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-xs font-bold">{a.title}</span>
                    <span className="text-[10px] text-[#0D7377] bg-[#0D7377]/10 border border-[#0D7377]/20 px-2 py-0.5 rounded font-sans font-bold">
                      {a.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              Academic Honors &amp; Standardized Benchmarks
            </h2>

            <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
              {honors.map((h, i) => (
                <li key={i} className="text-[11px] leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Footer Stamp */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7377]" />
              <span>Format compliant with UAE &amp; international university application portals</span>
            </div>
            <span className="font-semibold text-[#0D7377]">Powered by Masar UAE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
