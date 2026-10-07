# -*- coding: utf-8 -*-
"""
Full UAE Universities Generator for MasarUAE
Generates 79 accredited UAE universities across all 7 emirates + Al Ain
Copies pool images to public/images/unis/<id>/
Writes src/data/universities.ts
"""

import os
import json
import shutil

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
POOL_DIR = os.path.join(PUBLIC_DIR, "images", "unis", "pool")
UNIS_DIR = os.path.join(PUBLIC_DIR, "images", "unis")

# Pool images
pool_files = [f for f in os.listdir(POOL_DIR) if f.endswith(".jpg") or f.endswith(".jpeg")]
pool_files.sort()

# Define all 79 universities
unis = [
  # 1. AUS
  {
    "id": "aus",
    "name": "American University of Sharjah",
    "acronym": "AUS",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Private Accredited",
    "campusImage": "/images/AUS/campus.jpg",
    "campusGallery": [
      "/images/AUS/campus.jpg",
      "/images/AUS/American-University-of-Sharjah-AUS-5-Inside-AUS-Library.jpg",
      "/images/AUS/c914a4adaef66ce0d989ef4dc27eabba.jpg"
    ],
    "annualTuitionAED": { "min": 85000, "max": 105000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "Minimum BBB at A-Level with 5 IGCSEs (C/Grade 4 or above)",
      "ib": "Full IB Diploma with minimum 30–32 points",
      "cbse": "80% aggregate in Class 12 Board Examinations",
      "american": "Minimum 3.0/4.0 GPA with APs or SAT 1150+",
      "ielts": "6.5 overall (minimum 6.0 in writing)",
      "emsatEnglish": "1550+"
    },
    "popularMajors": ["Computer Science", "Mechanical Engineering", "Finance", "Architecture", "Design"],
    "scholarships": [
      { "title": "Chancellor's Scholarship", "coverage": "Up to 100% tuition", "criteria": "Top 5% high school grades + interview" },
      { "title": "Merit Scholarship", "coverage": "20% to 50% tuition", "criteria": "A-Level grades A*AA or IB 34+" },
      { "title": "Financial Aid Grant", "coverage": "Need-based partial relief", "criteria": "Demonstrated family financial need" }
    ],
    "muadalaNote": "Requires full MOE High School Equivalency certificate before second semester registration.",
    "highlights": ["Ranked #1 for employer reputation in UAE", "US ABET & AACSB accredited", "Vibrant 400-acre residential campus"],
    "websiteUrl": "https://www.aus.edu"
  },
  # 2. NYUAD
  {
    "id": "nyuad",
    "name": "New York University Abu Dhabi",
    "acronym": "NYUAD",
    "emirate": "Abu Dhabi",
    "campusLocation": "Saadiyat Island, Abu Dhabi",
    "type": "International Branch",
    "campusImage": "/images/NYUAD/campus.jpg",
    "campusGallery": [
      "/images/NYUAD/campus.jpg",
      "/images/NYUAD/nyuad+arts+center.webp",
      "/images/NYUAD/image.jpg"
    ],
    "annualTuitionAED": { "min": 210000, "max": 230000 },
    "acceptanceRate": "Highly Competitive (<8%)",
    "requirements": {
      "british": "A*AA to A*A*A at A-Level",
      "ib": "Full IB Diploma with 38–42 points",
      "cbse": "92%+ in Class 12 Boards",
      "american": "3.8+ GPA with top APs and SAT 1450+",
      "ielts": "7.5 overall",
      "emsatEnglish": "1700+"
    },
    "popularMajors": ["Economics", "Computer Science", "Bioengineering", "Political Science", "Interactive Media"],
    "scholarships": [
      { "title": "Sheikh Mohamed bin Zayed Scholars Program / Need-Blind Aid", "coverage": "Up to 100% full-ride (Tuition, Housing, Flight, Stipend)", "criteria": "Based 100% on financial need and academic excellence" }
    ],
    "muadalaNote": "Full MOE equivalency required; dedicated international student admissions team assists with document attestation.",
    "highlights": ["Global Ivy-tier research institution", "Saadiyat Island state-of-the-art campus", "Over 120 nationalities represented"],
    "websiteUrl": "https://nyuad.nyu.edu"
  },
  # 3. Heriot-Watt University Dubai
  {
    "id": "heriot-watt",
    "name": "Heriot-Watt University Dubai",
    "acronym": "HWUD",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/heriot-watt/campus.webp",
    "campusGallery": [
      "/images/heriot-watt/campus.webp",
      "/images/heriot-watt/new-campus.webp",
      "/images/heriot-watt/classroom.webp"
    ],
    "annualTuitionAED": { "min": 62000, "max": 78000 },
    "acceptanceRate": "Moderate (~65%)",
    "requirements": {
      "british": "BBC to BBB at A-Level (or direct year 2 entry with ABB)",
      "ib": "28–30 points (potential advanced standing)",
      "cbse": "70% to 75% in Class 12 Boards",
      "american": "2.8+ High School Diploma",
      "ielts": "6.0 (5.5 in each band)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Data Science", "Civil Engineering", "Fashion Marketing", "Business Management", "Psychology"],
    "scholarships": [
      { "title": "Provost's Academic Excellence", "coverage": "AED 10,000 to 25,000 off tuition", "criteria": "High school average > 85% / AAB A-Levels" },
      { "title": "Sports & STEM Bursary", "coverage": "Up to 30% reduction", "criteria": "National level athletic or science competition rank" }
    ],
    "muadalaNote": "Dual accreditation: KHDA permitted and UK Royal Charter accredited degree with UAE MOE recognition path.",
    "highlights": ["Brand new smart campus in Dubai Knowledge Park", "Direct Edinburgh transfer options for Year 2 or 3", "Pioneer in robotics, enterprise, and energy"],
    "websiteUrl": "https://www.hw.ac.uk/dubai"
  },
  # 4. University of Birmingham Dubai
  {
    "id": "birmingham",
    "name": "University of Birmingham Dubai",
    "acronym": "UoB Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Academic City",
    "type": "International Branch",
    "campusImage": "/images/birmingham/campus.webp",
    "campusGallery": [
      "/images/birmingham/campus.webp",
      "/images/birmingham/library.webp",
      "/images/birmingham/auditorium.jpg"
    ],
    "annualTuitionAED": { "min": 85000, "max": 115000 },
    "acceptanceRate": "Selective (~48%)",
    "requirements": {
      "british": "AAB to AAA at A-Level",
      "ib": "32–34 points in IB Diploma",
      "cbse": "85% in Class 12 Boards",
      "american": "3.4+ GPA with 2-3 AP tests (4+)",
      "ielts": "6.5 overall (minimum 6.0 in each band)",
      "emsatEnglish": "1550+"
    },
    "popularMajors": ["Artificial Intelligence", "Mechanical Engineering", "Biomedical Sciences", "Accounting & Finance", "Law"],
    "scholarships": [
      { "title": "Chancellor's Academic Merit", "coverage": "Up to 40% tuition fee discount", "criteria": "AAA predicted/achieved at A-Level or IB 36+" },
      { "title": "UAE National & Resident Grant", "coverage": "15% guaranteed concession", "criteria": "Early acceptance and UAE residency visa holder" }
    ],
    "muadalaNote": "First global top-100 university with a purpose-built smart campus in Dubai; degrees fully recognized by MOE and UK QAA.",
    "highlights": ["Global Top 100 University (QS World Rankings)", "State-of-the-art sustainable campus with smart labs", "Direct access to UK Russell Group degree"],
    "websiteUrl": "https://www.birmingham.ac.uk/dubai"
  },
  # 5. Khalifa University
  {
    "id": "khalifa",
    "name": "Khalifa University of Science and Technology",
    "acronym": "KU",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Zafranah, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/khalifa/campus.jpg",
    "campusGallery": [
      "/images/khalifa/campus.jpg",
      "/images/khalifa/lab.jpg",
      "/images/khalifa/aerial.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 66000 },
    "acceptanceRate": "Highly Selective (~25%)",
    "requirements": {
      "british": "AAA with Mathematics and Physics/Chemistry",
      "ib": "35+ points with HL Math & HL Physics",
      "cbse": "90%+ in PCM stream",
      "american": "3.6+ GPA + SAT Math 700+ or EmSAT Math 1500+",
      "ielts": "6.5 minimum",
      "emsatEnglish": "1550+ (EmSAT Math 1400+ & Physics 1200+ mandatory)"
    },
    "popularMajors": ["Aerospace Engineering", "Petroleum Geosciences", "Artificial Intelligence", "Biomedical Engineering", "Nuclear Engineering"],
    "scholarships": [
      { "title": "UAE National Full Presidential Fellowship", "coverage": "100% tuition + monthly stipend AED 4,000–8,000", "criteria": "UAE Nationals with high school average >= 90%" },
      { "title": "International President's Scholarship", "coverage": "100% tuition waiver + free campus accommodation", "criteria": "Outstanding international achievers (top 1%)" }
    ],
    "muadalaNote": "Rigorous MOE validation required. Mandatory EmSAT Math and Physics thresholds for direct STEM entry.",
    "highlights": ["Ranked #1 University in the UAE (QS & Times Higher Education)", "Leading nuclear, clean energy, and AI research institutes", "World-class supercomputing & robotics labs"],
    "websiteUrl": "https://www.ku.ac.ae"
  },
  # 6. UOWD
  {
    "id": "uowd",
    "name": "University of Wollongong in Dubai",
    "acronym": "UOWD",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/uowd/campus.jpg",
    "campusGallery": [
      "/images/uowd/campus.jpg",
      "/images/uowd/interior.jpg",
      "/images/uowd/atrium.webp"
    ],
    "annualTuitionAED": { "min": 58000, "max": 75000 },
    "acceptanceRate": "Moderate (~70%)",
    "requirements": {
      "british": "Minimum CCC to BCC at A-Level",
      "ib": "26–28 points",
      "cbse": "65% to 70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall (minimum 5.5 writing)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Cybersecurity", "Business Analytics", "International Relations", "Computer Science", "Marketing"],
    "scholarships": [
      { "title": "Academic Merit Scholarship", "coverage": "15% to 50% tuition reduction", "criteria": "High school average from 80% to 95%+" },
      { "title": "Sports Excellence Grant", "coverage": "Up to 25% waiver", "criteria": "Verified competitive athlete" }
    ],
    "muadalaNote": "Fully accredited by UAE CAA and Australian TEQSA. Australian qualifications recognized worldwide.",
    "highlights": ["Over 30 years in Dubai as the first international Australian university", "Modern purpose-built Knowledge Park vertical campus", "Direct pathway to Wollongong, Australia campus"],
    "websiteUrl": "https://www.uowdubai.ac.ae"
  },
  # 7. CUD
  {
    "id": "cud",
    "name": "Canadian University Dubai",
    "acronym": "CUD",
    "emirate": "Dubai",
    "campusLocation": "City Walk, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/cud/campus.jpg",
    "campusGallery": [
      "/images/cud/campus.jpg",
      "/images/cud/hub.jpg",
      "/images/cud/hall.jpg"
    ],
    "annualTuitionAED": { "min": 60000, "max": 82000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CD or above)",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall (academic)",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Interior Design", "Cyber Security", "Creative Industries", "Public Health", "E-Business"],
    "scholarships": [
      { "title": "Academic Excellence Scholarship", "coverage": "20% to 50% tuition deduction", "criteria": "High school average 85% to 98%+" },
      { "title": "Special Talent Scholarship", "coverage": "Up to 30% reduction", "criteria": "National artistic or athletic distinction" }
    ],
    "muadalaNote": "Accredited by UAE Ministry of Higher Education; offers 2+2 credit transfer to leading Canadian universities.",
    "highlights": ["Vibrant urban campus located in City Walk Dubai", "Formal transfer partnerships with Queen's, Brock, and York University in Canada", "Flexible daytime and evening schedules"],
    "websiteUrl": "https://www.cud.ac.ae"
  },
  # 8. UAEU
  {
    "id": "uaeu",
    "name": "United Arab Emirates University",
    "acronym": "UAEU",
    "emirate": "Al Ain",
    "campusLocation": "Al Maqam, Al Ain",
    "type": "Federal / Public",
    "campusImage": "/images/UAEU/campus.jpg",
    "campusGallery": [
      "/images/UAEU/campus.jpg",
      "/images/UAEU/aerial.jpg",
      "/images/UAEU/research-park.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 57000 },
    "acceptanceRate": "Selective (~38%)",
    "requirements": {
      "british": "ABB at A-Level with 5 IGCSEs",
      "ib": "30–32 points in IB Diploma",
      "cbse": "85% in Class 12 Boards",
      "american": "3.2+ GPA + SAT 1200+",
      "ielts": "6.0 minimum",
      "emsatEnglish": "1450+ (EmSAT Math 1250+ for Engineering/Business)"
    },
    "popularMajors": ["Medicine (MBBS)", "Chemical Engineering", "Information Technology", "Law", "Finance"],
    "scholarships": [
      { "title": "UAE National Government Full Sponsorship", "coverage": "100% tuition + campus residence + monthly stipend", "criteria": "UAE National high school graduates meeting entry criteria" },
      { "title": "Chancellor's International Merit Scholarship", "coverage": "Up to 100% tuition waiver", "criteria": "Top 1% graduating international students" }
    ],
    "muadalaNote": "UAE's flagship national university established in 1976. Strict MOE equivalency protocols apply.",
    "highlights": ["UAE's premier and oldest national university", "Top 300 QS World University Ranking", "Expansive 80-hectare residential campus with Olympic athletic facilities"],
    "websiteUrl": "https://www.uaeu.ac.ae"
  },
  # 9. UoS
  {
    "id": "uos",
    "name": "University of Sharjah",
    "acronym": "UoS",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Private Accredited",
    "campusImage": "/images/UoS/campus.jpeg",
    "campusGallery": [
      "/images/UoS/campus.jpeg",
      "/images/UoS/library.jpg",
      "/images/UoS/courtyard.jpg"
    ],
    "annualTuitionAED": { "min": 38000, "max": 88000 },
    "acceptanceRate": "Moderate (~55%)",
    "requirements": {
      "british": "Minimum 5 IGCSEs + 2 A-Levels (grades CC or above)",
      "ib": "26–28 points in IB Diploma",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA with EmSAT or SAT",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Medicine (MBBS)", "Dentistry", "Civil & Environmental Engineering", "Pharmacy", "Communication & Media"],
    "scholarships": [
      { "title": "Sharjah Ruler's Scholarship", "coverage": "50% to 100% tuition waiver", "criteria": "Outstanding academic achievement for Sharjah residents and top scorers" },
      { "title": "University Academic Honor", "coverage": "20% to 50% discount", "criteria": "High school average > 90%" }
    ],
    "muadalaNote": "Accredited by UAE CAA and international program bodies (ABET, ACPE, RIBA). MOE equivalency mandatory.",
    "highlights": ["Largest multi-disciplinary university campus in the UAE", "Prestigious Medical & Health Sciences campus with dedicated teaching hospitals", "Extensive research complexes and patents portfolio"],
    "websiteUrl": "https://www.sharjah.ac.ae"
  },
  # 10. RIT
  {
    "id": "rit",
    "name": "Rochester Institute of Technology Dubai",
    "acronym": "RIT Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Silicon Oasis",
    "type": "International Branch",
    "campusImage": "/images/RIT/campus.jpg",
    "campusGallery": [
      "/images/RIT/campus.jpg",
      "/images/RIT/innovation-center.jpg",
      "/images/RIT/aerial.jpg"
    ],
    "annualTuitionAED": { "min": 63000, "max": 76000 },
    "acceptanceRate": "Selective (~58%)",
    "requirements": {
      "british": "BBB to BCC at A-Level (Maths required for STEM)",
      "ib": "28–30 points in IB Diploma",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA with SAT Math 600+ or EmSAT Math 1300+",
      "ielts": "6.0 overall (minimum 6.0 in writing)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Robotics & Automation", "Computing Security", "Electrical Engineering", "Industrial Engineering", "International Business"],
    "scholarships": [
      { "title": "Silicon Oasis Tech Pioneer Scholarship", "coverage": "Up to 50% tuition reduction", "criteria": "High school average >= 90% or SAT >= 1350" },
      { "title": "Women in STEM Grant", "coverage": "30% tuition concession", "criteria": "Female applicants entering engineering or computing" }
    ],
    "muadalaNote": "Degrees conferred directly from RIT New York; accredited by US Middle States and UAE CAA.",
    "highlights": ["High-tech campus built in Dubai Silicon Oasis technology zone", "Mandatory cooperative education (paid co-op internships)", "Seamless transfer to RIT New York or Europe campuses"],
    "websiteUrl": "https://www.rit.edu/dubai"
  },
  # 11. AAU
  {
    "id": "alain",
    "name": "Al Ain University",
    "acronym": "AAU",
    "emirate": "Al Ain",
    "campusLocation": "Al Jimi, Al Ain & Mohammed Bin Zayed City, Abu Dhabi",
    "type": "Private Accredited",
    "campusImage": "/images/alain/campus.jpg",
    "campusGallery": [
      "/images/alain/campus.jpg",
      "/images/alain/building.jpg",
      "/images/alain/gate.jpg"
    ],
    "annualTuitionAED": { "min": 45000, "max": 72000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CD or above)",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Pharmacy", "Software Engineering", "Business Administration", "Law", "Education"],
    "scholarships": [
      { "title": "Academic Board Honor", "coverage": "Up to 40% discount", "criteria": "High school average >= 90%" },
      { "title": "High Achiever Discount", "coverage": "15% to 30% discount", "criteria": "Average between 80% and 89%" }
    ],
    "muadalaNote": "Accredited by UAE Ministry of Higher Education and ABET/ACPE.",
    "highlights": ["Dual campuses in Abu Dhabi and Al Ain", "ABET accredited College of Engineering and ACPE Pharmacy", "Generous merit scholarships up to 40%"],
    "websiteUrl": "https://aau.ac.ae"
  },
  # 12. ADU (from user folder)
  {
    "id": "adu",
    "name": "Abu Dhabi University",
    "acronym": "ADU",
    "emirate": "Abu Dhabi",
    "campusLocation": "Zayed City, Abu Dhabi & Al Ain",
    "type": "Private Accredited",
    "campusImage": "/images/adu/campus.jpg",
    "campusGallery": [
      "/images/adu/campus.jpg",
      "/images/adu/campus-building.avif",
      "/images/adu/interior.jpg"
    ],
    "annualTuitionAED": { "min": 54000, "max": 79000 },
    "acceptanceRate": "Selective (~62%)",
    "requirements": {
      "british": "Minimum 5 IGCSEs + 2 A-Levels (grades C/C or above)",
      "ib": "26+ points in IB Diploma",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA with SAT or EmSAT",
      "ielts": "6.0 overall (minimum 5.5)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Civil Engineering", "Computer Science & AI", "Business Administration", "Biomedical Sciences", "Law"],
    "scholarships": [
      { "title": "Chairman's Scholarship", "coverage": "100% tuition waiver", "criteria": "High school average >= 97% + interview" },
      { "title": "University Honors Scholarship", "coverage": "20% to 50% tuition reduction", "criteria": "Outstanding high school grade average >= 90%" },
      { "title": "Sanad Family Discount", "coverage": "15% to 25% discount", "criteria": "Enrolled siblings or immediate family" }
    ],
    "muadalaNote": "Fully accredited by UAE CAA and Western Association of Schools and Colleges (WASC). MOE equivalency required.",
    "highlights": ["Ranked among Top 250 Universities globally by THE Rankings", "Flagship modern campus in Zayed City, Abu Dhabi", "WASC and EQUIS globally accredited business and engineering programs"],
    "websiteUrl": "https://www.adu.ac.ae"
  },
  # 13. Middlesex University Dubai
  {
    "id": "mdx",
    "name": "Middlesex University Dubai",
    "acronym": "MDX Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park & Dubai Silicon Oasis",
    "type": "International Branch",
    "campusImage": "/images/unis/mdx/campus.jpg",
    "campusGallery": [
      "/images/unis/mdx/campus.jpg",
      "/images/unis/mdx/gallery-1.jpg",
      "/images/unis/mdx/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 56000, "max": 68000 },
    "acceptanceRate": "Moderate (~70%)",
    "requirements": {
      "british": "Minimum BBC at A-Level + 5 GCSEs",
      "ib": "26–28 points in IB Diploma",
      "cbse": "65% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Law (LLB)", "Psychology", "Computer Systems Engineering", "Graphic Design", "Marketing"],
    "scholarships": [
      { "title": "Academic Excellence Grant", "coverage": "Up to AED 20,000 off Year 1", "criteria": "High school score 85%+" },
      { "title": "Early Bird Booking Award", "coverage": "AED 5,000 deduction", "criteria": "Early enrollment completion" }
    ],
    "muadalaNote": "KHDA approved degree conferred by Middlesex University London with UK QAA standards.",
    "highlights": ["Over 4,500 students from 118 nations", "Dual campuses in Knowledge Park and Silicon Oasis", "Direct London transfer options"],
    "websiteUrl": "https://www.mdx.ac.ae"
  },
  # 14. American University in Dubai
  {
    "id": "aud",
    "name": "American University in Dubai",
    "acronym": "AUD",
    "emirate": "Dubai",
    "campusLocation": "Dubai Media City",
    "type": "Private Accredited",
    "campusImage": "/images/unis/aud/campus.jpg",
    "campusGallery": [
      "/images/unis/aud/campus.jpg",
      "/images/unis/aud/gallery-1.jpg",
      "/images/unis/aud/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 78000, "max": 96000 },
    "acceptanceRate": "Selective (~52%)",
    "requirements": {
      "british": "Minimum BBB at A-Level with 5 IGCSEs",
      "ib": "28–30 points",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA with SAT 1100+",
      "ielts": "6.5 overall",
      "emsatEnglish": "1550+"
    },
    "popularMajors": ["Architecture", "Civil Engineering", "Business Administration", "Visual Communication", "Digital Media"],
    "scholarships": [
      { "title": "H.H. Sheikh Mohammed Bin Rashid Al Maktoum Scholarship", "coverage": "100% full tuition waiver", "criteria": "Top academic achievers with exceptional leadership" },
      { "title": "Academic Merit Scholarship", "coverage": "25% to 50% tuition reduction", "criteria": "High school average >= 90%" }
    ],
    "muadalaNote": "US SACSCOC and UAE CAA dual accredited. Full high school equivalency needed.",
    "highlights": ["Located in Dubai Media City alongside global multinationals", "US SACSCOC accredited American degree", "Outstanding alumni network across the Gulf"],
    "websiteUrl": "https://www.aud.edu"
  },
  # 15. Zayed University (Dubai)
  {
    "id": "zu-dubai",
    "name": "Zayed University (Dubai Campus)",
    "acronym": "ZU Dubai",
    "emirate": "Dubai",
    "campusLocation": "Al Ruwayyah, Dubai",
    "type": "Federal / Public",
    "campusImage": "/images/unis/zu-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/zu-dubai/campus.jpg",
      "/images/unis/zu-dubai/gallery-1.jpg",
      "/images/unis/zu-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 62000 },
    "acceptanceRate": "Selective (~40%)",
    "requirements": {
      "british": "BBC at A-Level + 5 IGCSEs",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA with SAT 1100+",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Artificial Intelligence", "International Studies", "Finance & Banking", "Multimedia Design", "Public Relations"],
    "scholarships": [
      { "title": "Federal UAE National Sponsorship", "coverage": "100% tuition waiver", "criteria": "UAE National high school graduates" },
      { "title": "Resident Merit Grant", "coverage": "20% to 40% tuition assistance", "criteria": "High school average >= 88%" }
    ],
    "muadalaNote": "Federal national university accredited by US MSCHE and UAE CAA.",
    "highlights": ["Flagship federal university named after the UAE Founding Father", "Stunning contemporary campus architecture in Dubai", "Pioneering interdisciplinary degree tracks"],
    "websiteUrl": "https://www.zu.ac.ae"
  },
  # 16. Zayed University (Abu Dhabi)
  {
    "id": "zu-auh",
    "name": "Zayed University (Abu Dhabi Campus)",
    "acronym": "ZU Abu Dhabi",
    "emirate": "Abu Dhabi",
    "campusLocation": "Khalifa City, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/zu-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/zu-auh/campus.jpg",
      "/images/unis/zu-auh/gallery-1.jpg",
      "/images/unis/zu-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 62000 },
    "acceptanceRate": "Selective (~42%)",
    "requirements": {
      "british": "BBC at A-Level + 5 IGCSEs",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA with SAT 1100+",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Information Security", "Accounting", "Psychology", "Sustainable Energy", "Communication"],
    "scholarships": [
      { "title": "UAE Federal Scholarship", "coverage": "100% tuition for Nationals", "criteria": "UAE National high school diploma" },
      { "title": "Academic Honor Award", "coverage": "25% to 50% tuition reduction", "criteria": "High school score 90%+" }
    ],
    "muadalaNote": "Federal national university accredited by MSCHE and UAE CAA.",
    "highlights": ["Iconic Khalifa City Abu Dhabi campus designed with modern Arabic architecture", "Comprehensive innovation and entrepreneurship labs", "Active government research partnerships"],
    "websiteUrl": "https://www.zu.ac.ae"
  },
  # 17. HCT Dubai
  {
    "id": "hct-dubai",
    "name": "Higher Colleges of Technology (Dubai)",
    "acronym": "HCT Dubai",
    "emirate": "Dubai",
    "campusLocation": "Academic City, Dubai",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-dubai/campus.jpg",
      "/images/unis/hct-dubai/gallery-1.jpg",
      "/images/unis/hct-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~72%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Aviation Maintenance", "Computer Information Systems", "Logistics & Supply Chain", "Applied Media", "Health Sciences"],
    "scholarships": [
      { "title": "UAE National Free Education", "coverage": "100% full tuition", "criteria": "UAE Citizens meeting basic entry threshold" }
    ],
    "muadalaNote": "Federal institution focusing on applied technology and vocational excellence.",
    "highlights": ["Largest applied higher education institution in the UAE", "Direct corporate training and industrial apprenticeship pathways", "Over 90% graduate employment rate in target sectors"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 18. HCT Abu Dhabi
  {
    "id": "hct-auh",
    "name": "Higher Colleges of Technology (Abu Dhabi)",
    "acronym": "HCT Abu Dhabi",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Muroor / Khalifa City, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-auh/campus.jpg",
      "/images/unis/hct-auh/gallery-1.jpg",
      "/images/unis/hct-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~70%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Mechanical Engineering Tech", "Cybersecurity Tech", "Emergency Medical Services", "Business Administration", "Electrical Tech"],
    "scholarships": [
      { "title": "UAE National Free Education", "coverage": "100% tuition", "criteria": "UAE Nationals" }
    ],
    "muadalaNote": "Federal institution accredited by UAE CAA.",
    "highlights": ["Advanced fabrication and robotics laboratories", "Close partnership with ADNOC and Mubadala for graduate training", "Career-centric applied learning methodology"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 19. HCT Sharjah
  {
    "id": "hct-shj",
    "name": "Higher Colleges of Technology (Sharjah)",
    "acronym": "HCT Sharjah",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-shj/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-shj/campus.jpg",
      "/images/unis/hct-shj/gallery-1.jpg",
      "/images/unis/hct-shj/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~72%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Computer Science Tech", "Finance & Accounting", "Healthcare Information Management", "Civil Technology", "Digital Media"],
    "scholarships": [
      { "title": "UAE National Free Tuition", "coverage": "100% tuition", "criteria": "UAE Citizens" }
    ],
    "muadalaNote": "Federal higher education institution.",
    "highlights": ["Located in Sharjah's renowned University City hub", "Hands-on engineering simulation centres", "Active student innovation incubators"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 20. HCT Ras Al Khaimah
  {
    "id": "hct-rak",
    "name": "Higher Colleges of Technology (Ras Al Khaimah)",
    "acronym": "HCT RAK",
    "emirate": "Ras Al Khaimah",
    "campusLocation": "Al Qusaidat, Ras Al Khaimah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-rak/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-rak/campus.jpg",
      "/images/unis/hct-rak/gallery-1.jpg",
      "/images/unis/hct-rak/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Business Administration", "Electronic Engineering", "Applied IT", "Logistics Management", "Health Sciences"],
    "scholarships": [
      { "title": "UAE National Free Tuition", "coverage": "100% tuition", "criteria": "UAE Citizens" }
    ],
    "muadalaNote": "Federal accredited higher education institution.",
    "highlights": ["Major tertiary technical provider in the Northern Emirates", "Strong links with RAK maritime and industrial companies", "Modern digital learning spaces"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 21. HCT Fujairah
  {
    "id": "hct-fuj",
    "name": "Higher Colleges of Technology (Fujairah)",
    "acronym": "HCT Fujairah",
    "emirate": "Fujairah",
    "campusLocation": "Al Faseel, Fujairah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-fuj/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-fuj/campus.jpg",
      "/images/unis/hct-fuj/gallery-1.jpg",
      "/images/unis/hct-fuj/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Maritime Logistics", "Computer Information Science", "Business Operations", "Health Administration", "Engineering Tech"],
    "scholarships": [
      { "title": "UAE National Free Tuition", "coverage": "100% tuition", "criteria": "UAE Citizens" }
    ],
    "muadalaNote": "Federal accredited higher education institution.",
    "highlights": ["Premier technical higher college on the UAE East Coast", "Tailored marine transport and bunkering logistics tracks", "State-of-the-art campus facing the Gulf of Oman"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 22. HCT Al Ain
  {
    "id": "hct-alain",
    "name": "Higher Colleges of Technology (Al Ain)",
    "acronym": "HCT Al Ain",
    "emirate": "Al Ain",
    "campusLocation": "Al Falaj Hazzaa, Al Ain",
    "type": "Federal / Public",
    "campusImage": "/images/unis/hct-alain/campus.jpg",
    "campusGallery": [
      "/images/unis/hct-alain/campus.jpg",
      "/images/unis/hct-alain/gallery-1.jpg",
      "/images/unis/hct-alain/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 45000 },
    "acceptanceRate": "Accessible (~73%)",
    "requirements": {
      "british": "5 IGCSEs + 2 AS/A-Levels",
      "ib": "24+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Aviation Tech", "Software Engineering Tech", "Human Resources", "Veterinary Tech", "Civil Tech"],
    "scholarships": [
      { "title": "UAE National Free Tuition", "coverage": "100% tuition", "criteria": "UAE Citizens" }
    ],
    "muadalaNote": "Federal accredited higher education institution.",
    "highlights": ["Long-established technical campus in the Oasis City of Al Ain", "Pioneering aerospace engineering technician programs", "Expansive workshop facilities and athletic grounds"],
    "websiteUrl": "https://www.hct.ac.ae"
  },
  # 23. Sorbonne University Abu Dhabi
  {
    "id": "suad",
    "name": "Sorbonne University Abu Dhabi",
    "acronym": "SUAD",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Reem Island, Abu Dhabi",
    "type": "International Branch",
    "campusImage": "/images/unis/suad/campus.jpg",
    "campusGallery": [
      "/images/unis/suad/campus.jpg",
      "/images/unis/suad/gallery-1.jpg",
      "/images/unis/suad/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 68000, "max": 85000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "Minimum BBB at A-Level (French proficiency for French tracks)",
      "ib": "30–32 points in IB Diploma",
      "cbse": "80% in Class 12 Boards",
      "american": "3.2+ GPA with AP or SAT",
      "ielts": "6.5 overall (or DELF B2 for French curriculum)",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Law & Political Science", "History of Art & Archaeology", "Mathematics & Data Science", "International Business", "Philosophy & Sociology"],
    "scholarships": [
      { "title": "H.H. Sheikh Mohamed bin Zayed Academic Scholarship", "coverage": "Up to 100% tuition waiver", "criteria": "High school average >= 90% + interview" },
      { "title": "Excellence Academic Scholarship", "coverage": "25% to 75% tuition discount", "criteria": "Top grade average in French Baccalaureate or international diploma" }
    ],
    "muadalaNote": "Degrees awarded directly by Sorbonne University in Paris; recognized by French Ministry and UAE CAA.",
    "highlights": ["Iconic dome campus on Al Reem Island, Abu Dhabi", "760 years of Sorbonne Parisian academic heritage", "Bilingual French-English European degrees"],
    "websiteUrl": "https://www.sorbonne.ae"
  },
  # 24. Mohamed bin Zayed University of Artificial Intelligence
  {
    "id": "mbzuai",
    "name": "Mohamed bin Zayed University of Artificial Intelligence",
    "acronym": "MBZUAI",
    "emirate": "Abu Dhabi",
    "campusLocation": "Masdar City, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/mbzuai/campus.jpg",
    "campusGallery": [
      "/images/unis/mbzuai/campus.jpg",
      "/images/unis/mbzuai/gallery-1.jpg",
      "/images/unis/mbzuai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 0 },
    "acceptanceRate": "Elite (<5%)",
    "requirements": {
      "british": "A*AA with Further Maths & Computing",
      "ib": "38+ points with HL Math & HL Physics",
      "cbse": "95%+ in PCM / CS stream",
      "american": "3.8+ GPA with SAT Math 780+ or AP Calculus BC (5)",
      "ielts": "7.0 overall",
      "emsatEnglish": "1650+"
    },
    "popularMajors": ["Machine Learning", "Computer Vision", "Natural Language Processing", "Robotics & Autonomous Systems", "Computational Biology"],
    "scholarships": [
      { "title": "MBZUAI Full Fellowship", "coverage": "100% full-ride: tuition, monthly stipend AED 8,000, luxury housing, insurance, flight", "criteria": "All admitted students receive full scholarship based on merit" }
    ],
    "muadalaNote": "World's first dedicated graduate and advanced undergraduate research AI university.",
    "highlights": ["World's first graduate university dedicated to Artificial Intelligence", "Led by top global AI researchers and Turing award winners", "Access to national supercomputer clusters in Masdar City"],
    "websiteUrl": "https://mbzuai.ac.ae"
  },
  # 25. Murdoch University Dubai
  {
    "id": "murdoch",
    "name": "Murdoch University Dubai",
    "acronym": "Murdoch",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/unis/murdoch/campus.jpg",
    "campusGallery": [
      "/images/unis/murdoch/campus.jpg",
      "/images/unis/murdoch/gallery-1.jpg",
      "/images/unis/murdoch/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 52000, "max": 66000 },
    "acceptanceRate": "Moderate (~68%)",
    "requirements": {
      "british": "Minimum CCC to BCC at A-Level",
      "ib": "26+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.7+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Cybersecurity & Forensics", "Psychology", "Journalism & Media", "Business Information Systems", "Finance"],
    "scholarships": [
      { "title": "Academic Merit Scholarship", "coverage": "15% to 40% discount", "criteria": "High school average 80% to 95%+" },
      { "title": "Women in STEM Grant", "coverage": "25% tuition fee waiver", "criteria": "Female candidates enrolling in IT or Cybersecurity" }
    ],
    "muadalaNote": "Australian TEQSA accredited degree, recognized by KHDA Dubai.",
    "highlights": ["Ranked among top young universities globally", "Modern campus in Dubai Knowledge Park", "Direct transfer to Perth, Western Australia"],
    "websiteUrl": "https://www.murdochdubai.ac.ae"
  },
  # 26. Curtin University Dubai
  {
    "id": "curtin",
    "name": "Curtin University Dubai",
    "acronym": "Curtin",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/curtin/campus.jpg",
    "campusGallery": [
      "/images/unis/curtin/campus.jpg",
      "/images/unis/curtin/gallery-1.jpg",
      "/images/unis/curtin/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 55000, "max": 72000 },
    "acceptanceRate": "Moderate (~64%)",
    "requirements": {
      "british": "Minimum BCC to BBB at A-Level",
      "ib": "28+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.5 overall",
      "emsatEnglish": "1450+"
    },
    "popularMajors": ["Mechanical Engineering", "Software Engineering", "Marketing", "Finance", "Information Technology"],
    "scholarships": [
      { "title": "Pro Vice-Chancellor's Excellence", "coverage": "Up to 50% tuition waiver", "criteria": "Top academic grade average 90%+" },
      { "title": "STEM Pioneer Grant", "coverage": "25% discount", "criteria": "High performance in math and physics" }
    ],
    "muadalaNote": "Australian top-1% university degrees recognized globally and in UAE.",
    "highlights": ["Ranked in the top 1% of universities worldwide", "Direct transfer pathways to Curtin Perth, Singapore, and Malaysia", "AACSB accredited business school"],
    "websiteUrl": "https://curtindubai.ac.ae"
  },
  # 27. Amity University Dubai
  {
    "id": "amity",
    "name": "Amity University Dubai",
    "acronym": "Amity",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "Private Accredited",
    "campusImage": "/images/unis/amity/campus.jpg",
    "campusGallery": [
      "/images/unis/amity/campus.jpg",
      "/images/unis/amity/gallery-1.jpg",
      "/images/unis/amity/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 42000, "max": 65000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CD or above)",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Forensic Science", "Nanotechnology", "Aerospace Engineering", "Fashion Design", "Business Administration"],
    "scholarships": [
      { "title": "Merit Scholarship", "coverage": "Up to 50% tuition waiver", "criteria": "Class 12 Boards or high school >= 90%" },
      { "title": "Sports Scholarship", "coverage": "25% to 50% waiver", "criteria": "State or national athletic representation" }
    ],
    "muadalaNote": "Accredited by UAE CAA and Western Association of Schools and Colleges (WASC).",
    "highlights": ["Expansive 700,000 sq ft campus in Academic City", "First university in UAE offering forensic science labs", "Generous merit scholarships and flexible payment options"],
    "websiteUrl": "https://amityuniversity.ae"
  },
  # 28. Manipal Academy of Higher Education Dubai
  {
    "id": "mahe",
    "name": "Manipal Academy of Higher Education Dubai",
    "acronym": "MAHE Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/mahe/campus.jpg",
    "campusGallery": [
      "/images/unis/mahe/campus.jpg",
      "/images/unis/mahe/gallery-1.jpg",
      "/images/unis/mahe/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 40000, "max": 62000 },
    "acceptanceRate": "Accessible (~72%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CD or above)",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Biotechnology", "Information Technology", "Interior Design", "Media & Communication", "Mechanical Engineering"],
    "scholarships": [
      { "title": "Chairman's Merit Award", "coverage": "20% to 50% fee concession", "criteria": "High school score 85% to 95%+" },
      { "title": "Girl Child Education Grant", "coverage": "15% tuition discount", "criteria": "Female applicants in STEM disciplines" }
    ],
    "muadalaNote": "Branch campus of India's Institute of Eminence; KHDA permitted.",
    "highlights": ["Over 20 years of academic excellence in Dubai", "Advanced biotechnology and robotics laboratories", "Active student clubs, cricket tournaments, and cultural societies"],
    "websiteUrl": "https://www.manipaldubai.com"
  },
  # 29. BITS Pilani Dubai Campus
  {
    "id": "bits-pilani",
    "name": "BITS Pilani Dubai Campus",
    "acronym": "BITS Pilani",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/bits-pilani/campus.jpg",
    "campusGallery": [
      "/images/unis/bits-pilani/campus.jpg",
      "/images/unis/bits-pilani/gallery-1.jpg",
      "/images/unis/bits-pilani/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 51000, "max": 63000 },
    "acceptanceRate": "Selective (~50%)",
    "requirements": {
      "british": "Minimum BBB with Maths & Physics",
      "ib": "28+ points with HL Math & HL Physics",
      "cbse": "75% aggregate in Physics, Chemistry, Math in Class 12",
      "american": "3.0+ GPA with strong Math & Science coursework",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Computer Science", "Electrical & Electronics Engineering", "Mechanical Engineering", "Biotechnology", "Chemical Engineering"],
    "scholarships": [
      { "title": "Board Toppers Merit Award", "coverage": "Up to 100% tuition fee waiver", "criteria": "Top 1% in Class 12 Boards" },
      { "title": "Merit in Qualifying Exam", "coverage": "20% to 40% reduction", "criteria": "Aggregate score >= 90% in PCM" }
    ],
    "muadalaNote": "Offshore campus of India's premier engineering institute; KHDA permitted.",
    "highlights": ["Top-tier engineering education with Practice School internship program", "High graduate placement rate across Fortune 500 tech companies", "Dedicated residential campus in Academic City"],
    "websiteUrl": "https://www.bits-pilani.ac.ae"
  },
  # 30. SP Jain School of Global Management
  {
    "id": "sp-jain",
    "name": "SP Jain School of Global Management",
    "acronym": "SP Jain",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/sp-jain/campus.jpg",
    "campusGallery": [
      "/images/unis/sp-jain/campus.jpg",
      "/images/unis/sp-jain/gallery-1.jpg",
      "/images/unis/sp-jain/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 70000, "max": 95000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "Minimum BBB at A-Level",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA + SPJET or SAT 1200+",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Bachelor of Business Administration (Tri-City)", "Bachelor of Data Science", "Global Business Management", "Digital Marketing", "FinTech"],
    "scholarships": [
      { "title": "Dean's Global Excellence Scholarship", "coverage": "Up to 75% tuition waiver", "criteria": "High school score 90%+ and interview performance" }
    ],
    "muadalaNote": "Accredited by TEQSA Australia, recognized by KHDA Dubai.",
    "highlights": ["Unique multi-campus model: study in Dubai, Singapore, and Sydney", "Ranked #12 worldwide by Forbes for international business programs", "Unmatched global career exposure"],
    "websiteUrl": "https://www.spjain.ae"
  },
  # 31. Emirates Academy of Hospitality Management
  {
    "id": "eahm",
    "name": "Emirates Academy of Hospitality Management",
    "acronym": "EAHM",
    "emirate": "Dubai",
    "campusLocation": "Umm Suqeim 3, Dubai (opp. Burj Al Arab)",
    "type": "Private Accredited",
    "campusImage": "/images/unis/eahm/campus.jpg",
    "campusGallery": [
      "/images/unis/eahm/campus.jpg",
      "/images/unis/eahm/gallery-1.jpg",
      "/images/unis/eahm/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 79000, "max": 94000 },
    "acceptanceRate": "Selective (~55%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CC or above)",
      "ib": "26+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["International Hospitality Management", "Luxury Brand Management", "Tourism & Event Management", "Culinary Operations", "Hospitality Finance"],
    "scholarships": [
      { "title": "Jumeirah Group Hospitality Fellowship", "coverage": "Up to 50% tuition reduction", "criteria": "Exceptional passion and high school grades >= 85%" }
    ],
    "muadalaNote": "Accredited by UAE CAA and THE-ICE (International Centre of Excellence in Tourism and Hospitality).",
    "highlights": ["Affiliated with world-famous Jumeirah Group (Burj Al Arab)", "Ranked top 10 hospitality schools globally", "100% employment rate upon graduation"],
    "websiteUrl": "https://www.emiratesacademy.edu"
  },
  # 32. MBRU
  {
    "id": "mbru",
    "name": "Mohammed Bin Rashid University of Medicine and Health Sciences",
    "acronym": "MBRU",
    "emirate": "Dubai",
    "campusLocation": "Dubai Healthcare City",
    "type": "Private Accredited",
    "campusImage": "/images/unis/mbru/campus.jpg",
    "campusGallery": [
      "/images/unis/mbru/campus.jpg",
      "/images/unis/mbru/gallery-1.jpg",
      "/images/unis/mbru/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 120000, "max": 165000 },
    "acceptanceRate": "Highly Competitive (<12%)",
    "requirements": {
      "british": "A*AA to AAA at A-Level (Biology and Chemistry mandatory)",
      "ib": "36+ points with HL Biology & HL Chemistry (6,6)",
      "cbse": "90%+ in PCB in Class 12 Boards",
      "american": "3.8+ GPA with AP Biology and AP Chemistry (5,4)",
      "ielts": "7.0 overall (minimum 6.5 in all bands)",
      "emsatEnglish": "1650+ (EmSAT Biology & Chemistry 1500+)"
    },
    "popularMajors": ["Bachelor of Medicine & Bachelor of Surgery (MBBS)", "Dental Surgery (DDS)", "Nursing", "Biomedical Sciences", "Public Health"],
    "scholarships": [
      { "title": "Dubai Academic Health Corporation Scholarship", "coverage": "Up to 100% tuition sponsorship", "criteria": "Outstanding UAE nationals and residents with MBRU entrance test score" }
    ],
    "muadalaNote": "Dual accredited by UAE CAA and UK General Medical Council recognition pathways.",
    "highlights": ["Located in Dubai Healthcare City alongside top medical centres", "State-of-the-art Khalaf Ahmad Al Habtoor Medical Simulation Center", "Part of Dubai Academic Health Corporation (DAHC)"],
    "websiteUrl": "https://www.mbru.ac.ae"
  },
  # 33. DMCG
  {
    "id": "dmcg",
    "name": "Dubai Medical College for Girls",
    "acronym": "DMCG",
    "emirate": "Dubai",
    "campusLocation": "Muhaisnah 1, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/unis/dmcg/campus.jpg",
    "campusGallery": [
      "/images/unis/dmcg/campus.jpg",
      "/images/unis/dmcg/gallery-1.jpg",
      "/images/unis/dmcg/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 95000, "max": 125000 },
    "acceptanceRate": "Selective (~35%)",
    "requirements": {
      "british": "AAB with Biology and Chemistry",
      "ib": "32+ points with HL Science",
      "cbse": "85% in PCB stream",
      "american": "3.5+ GPA + EmSAT Biology & Chemistry",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Medicine & Surgery (MBBS)", "Medical Laboratory Sciences", "Clinical Nutrition", "Health Informatics"],
    "scholarships": [
      { "title": "Lootah Academic Endowment", "coverage": "Up to 30% tuition fee reduction", "criteria": "Outstanding female academic achievers" }
    ],
    "muadalaNote": "Accredited by UAE CAA and recognized by WHO and GMC.",
    "highlights": ["Pioneer medical college for women established by Haj Saeed Lootah", "Over 35 years of medical training excellence", "Direct clinical training at Dubai Health Authority hospitals"],
    "websiteUrl": "https://www.dmcg.edu"
  },
  # 34. DPC
  {
    "id": "dpc",
    "name": "Dubai Pharmacy College for Girls",
    "acronym": "DPC",
    "emirate": "Dubai",
    "campusLocation": "Muhaisnah 1, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/unis/dpc/campus.jpg",
    "campusGallery": [
      "/images/unis/dpc/campus.jpg",
      "/images/unis/dpc/gallery-1.jpg",
      "/images/unis/dpc/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 50000, "max": 65000 },
    "acceptanceRate": "Moderate (~60%)",
    "requirements": {
      "british": "BBC with Chemistry & Biology",
      "ib": "28+ points",
      "cbse": "75% in Science stream",
      "american": "3.0+ GPA with science subjects",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Bachelor of Pharmacy (BPharm)", "Clinical Pharmacy (PharmD)", "Pharmaceutical Sciences", "Pharmacovigilance"],
    "scholarships": [
      { "title": "Merit Concession", "coverage": "15% to 25% discount", "criteria": "High school average 85%+" }
    ],
    "muadalaNote": "First pharmacy college in the UAE; accredited by CAA.",
    "highlights": ["First institution in the UAE dedicated to pharmacy education", "Extensive clinical pharmacy training in UAE hospitals", "ACPE international certification pathways"],
    "websiteUrl": "https://www.dpc.edu"
  },
  # 35. Emirates Aviation University
  {
    "id": "eau",
    "name": "Emirates Aviation University",
    "acronym": "EAU",
    "emirate": "Dubai",
    "campusLocation": "Academic City, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/unis/eau/campus.jpg",
    "campusGallery": [
      "/images/unis/eau/campus.jpg",
      "/images/unis/eau/gallery-1.jpg",
      "/images/unis/eau/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 65000, "max": 88000 },
    "acceptanceRate": "Selective (~58%)",
    "requirements": {
      "british": "BCC at A-Level (Maths or Physics required for Engineering)",
      "ib": "28+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA with Math and Physics",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Aeronautical Engineering", "Aviation Management", "Aircraft Maintenance Engineering", "Software Engineering", "Logistics & Supply Chain"],
    "scholarships": [
      { "title": "Emirates Group Academic Scholarship", "coverage": "Up to 50% tuition reduction", "criteria": "High school score 90%+ in STEM" },
      { "title": "Aviation Excellence Bursary", "coverage": "20% fee waiver", "criteria": "Demonstrated technical aptitude" }
    ],
    "muadalaNote": "Academic arm of the Emirates Group; accredited by UAE CAA and GCAA.",
    "highlights": ["Directly affiliated with Emirates Airline and Emirates Group", "On-campus full flight simulators and actual jet engines", "Internship opportunities within Emirates Group companies"],
    "websiteUrl": "https://www.eau.ac.ae"
  },
  # 36. British University in Dubai
  {
    "id": "buid",
    "name": "British University in Dubai",
    "acronym": "BUiD",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "Private Accredited",
    "campusImage": "/images/unis/buid/campus.jpg",
    "campusGallery": [
      "/images/unis/buid/campus.jpg",
      "/images/unis/buid/gallery-1.jpg",
      "/images/unis/buid/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 54000, "max": 70000 },
    "acceptanceRate": "Moderate (~65%)",
    "requirements": {
      "british": "BBC at A-Level",
      "ib": "28+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Artificial Intelligence", "Architecture & Sustainable Design", "Business Management", "Computer Science", "Law"],
    "scholarships": [
      { "title": "Vice Chancellor's Award", "coverage": "20% to 50% tuition waiver", "criteria": "High school score 85%+" }
    ],
    "muadalaNote": "Founded in partnership with University of Edinburgh, Manchester, and Glasgow.",
    "highlights": ["Research-based university partnered with UK Russell Group universities", "Pioneer in artificial intelligence and sustainable architecture", "CAA accredited degrees"],
    "websiteUrl": "https://www.buid.ac.ae"
  },
  # 37. MODUL University Dubai
  {
    "id": "modul",
    "name": "MODUL University Dubai",
    "acronym": "MODUL",
    "emirate": "Dubai",
    "campusLocation": "ONE JLT, Jumeirah Lakes Towers, Dubai",
    "type": "International Branch",
    "campusImage": "/images/unis/modul/campus.jpg",
    "campusGallery": [
      "/images/unis/modul/campus.jpg",
      "/images/unis/modul/gallery-1.jpg",
      "/images/unis/modul/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 53000, "max": 68000 },
    "acceptanceRate": "Moderate (~70%)",
    "requirements": {
      "british": "CCC to BCC at A-Level",
      "ib": "26+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.7+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["International Management", "Tourism & Hospitality Management", "Entrepreneurship & Governance", "Interactive Media"],
    "scholarships": [
      { "title": "Austrian Academic Excellence", "coverage": "Up to 30% reduction", "criteria": "High school average >= 85%" }
    ],
    "muadalaNote": "First Austrian university in the Middle East; accredited by AQ Austria and KHDA.",
    "highlights": ["Prime campus location in ONE JLT in central Dubai", "Austrian higher education quality standards", "Focus on sustainability and luxury hospitality"],
    "websiteUrl": "https://www.modul.ac.ae"
  },
  # 38. De Montfort University Dubai
  {
    "id": "dmu",
    "name": "De Montfort University Dubai",
    "acronym": "DMU Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/dmu/campus.jpg",
    "campusGallery": [
      "/images/unis/dmu/campus.jpg",
      "/images/unis/dmu/gallery-1.jpg",
      "/images/unis/dmu/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 52000, "max": 65000 },
    "acceptanceRate": "Moderate (~72%)",
    "requirements": {
      "british": "BCC to CCC at A-Level",
      "ib": "26+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.7+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Cybersecurity", "Architecture", "Fashion Communication", "Business Administration", "Psychology"],
    "scholarships": [
      { "title": "Global Academic Excellence", "coverage": "Up to 50% tuition reduction", "criteria": "Outstanding high school results" }
    ],
    "muadalaNote": "UK university branch campus approved by KHDA Dubai.",
    "highlights": ["Ranked Gold in UK Teaching Excellence Framework", "Creative design studios and digital forensics suites", "Seamless semester abroad at Leicester UK campus"],
    "websiteUrl": "https://www.dmu.ac.ae"
  },
  # 39. University of Europe for Applied Sciences Dubai
  {
    "id": "ue-dubai",
    "name": "University of Europe for Applied Sciences Dubai",
    "acronym": "UE Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Future District / One Central",
    "type": "International Branch",
    "campusImage": "/images/unis/ue-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/ue-dubai/campus.jpg",
      "/images/unis/ue-dubai/gallery-1.jpg",
      "/images/unis/ue-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 52000, "max": 69000 },
    "acceptanceRate": "Moderate (~68%)",
    "requirements": {
      "british": "CCC at A-Level",
      "ib": "26+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.7+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1300+"
    },
    "popularMajors": ["Data Science", "Digital Business & Data Science", "Software Engineering", "Visual Communication", "Design Management"],
    "scholarships": [
      { "title": "German Innovation Scholarship", "coverage": "Up to 33% discount", "criteria": "High school score 85%+" }
    ],
    "muadalaNote": "First German university to establish a campus in Dubai.",
    "highlights": ["Located at One Central in Dubai Future District near Museum of the Future", "German accredited engineering and business curricula", "Direct transfer to Berlin or Hamburg campuses"],
    "websiteUrl": "https://www.ue-germany.com/about-us/campuses/dubai"
  },
  # 40. University of South Wales Dubai
  {
    "id": "usw-dubai",
    "name": "University of South Wales Dubai",
    "acronym": "USW Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai South (Aviation City)",
    "type": "International Branch",
    "campusImage": "/images/unis/usw-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/usw-dubai/campus.jpg",
      "/images/unis/usw-dubai/gallery-1.jpg",
      "/images/unis/usw-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 60000, "max": 75000 },
    "acceptanceRate": "Moderate (~65%)",
    "requirements": {
      "british": "BCC at A-Level",
      "ib": "26+ points",
      "cbse": "68% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Aeronautical Engineering", "Aircraft Maintenance", "Aviation Business", "Mechanical Engineering"],
    "scholarships": [
      { "title": "Aerospace Talent Bursary", "coverage": "15% to 30% reduction", "criteria": "Demonstrated interest and STEM scores >= 80%" }
    ],
    "muadalaNote": "UK degree with European Aviation Safety Agency (EASA) alignment.",
    "highlights": ["Located in Dubai South right next to Al Maktoum International Airport", "State-of-the-art aircraft maintenance hangars", "Dual UK degree and EASA license preparation"],
    "websiteUrl": "https://www.southwales.ac.uk/dubai"
  },
  # 41. University of Strathclyde Business School Dubai
  {
    "id": "strathclyde",
    "name": "University of Strathclyde Business School Dubai",
    "acronym": "Strathclyde",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/unis/strathclyde/campus.jpg",
    "campusGallery": [
      "/images/unis/strathclyde/campus.jpg",
      "/images/unis/strathclyde/gallery-1.jpg",
      "/images/unis/strathclyde/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 75000, "max": 98000 },
    "acceptanceRate": "Selective (~48%)",
    "requirements": {
      "british": "AAB to ABB at A-Level",
      "ib": "32+ points",
      "cbse": "82% in Class 12 Boards",
      "american": "3.2+ GPA + SAT",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Business Administration", "Finance", "Global Energy Management", "Marketing", "Supply Chain"],
    "scholarships": [
      { "title": "Strathclyde Executive Merit Award", "coverage": "20% to 35% tuition waiver", "criteria": "Top academic grades and leadership potential" }
    ],
    "muadalaNote": "Triple-accredited business school (AACSB, AMBA, EQUIS).",
    "highlights": ["Triple-crown accredited business school (top 1% globally)", "Over 25 years delivering British business excellence in UAE", "Executive network spanning Gulf energy and banking sectors"],
    "websiteUrl": "https://www.strath.ac.uk/business"
  },
  # 42. University of Manchester Middle East Centre
  {
    "id": "uom-dubai",
    "name": "University of Manchester Middle East Centre",
    "acronym": "UoM Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/unis/uom-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/uom-dubai/campus.jpg",
      "/images/unis/uom-dubai/gallery-1.jpg",
      "/images/unis/uom-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 90000, "max": 130000 },
    "acceptanceRate": "Selective (~42%)",
    "requirements": {
      "british": "AAA at A-Level",
      "ib": "34+ points",
      "cbse": "88% in Class 12 Boards",
      "american": "3.5+ GPA + SAT 1300+",
      "ielts": "6.5 overall",
      "emsatEnglish": "1550+"
    },
    "popularMajors": ["Finance & Investment", "Global Business", "Educational Leadership", "Real Estate Management"],
    "scholarships": [
      { "title": "Manchester Global Leadership Award", "coverage": "Up to 25% tuition fee waiver", "criteria": "Outstanding academic track record" }
    ],
    "muadalaNote": "UK Russell Group institution ranked top 30 in the world.",
    "highlights": ["World top 30 university Russell Group member", "Largest international centre of the University of Manchester", "Over 3,000 alumni across the Middle East"],
    "websiteUrl": "https://www.manchester.ac.ae"
  },
  # 43. London Business School Dubai
  {
    "id": "lbs-dubai",
    "name": "London Business School Dubai",
    "acronym": "LBS Dubai",
    "emirate": "Dubai",
    "campusLocation": "DIFC (Dubai International Financial Centre)",
    "type": "International Branch",
    "campusImage": "/images/unis/lbs-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/lbs-dubai/campus.jpg",
      "/images/unis/lbs-dubai/gallery-1.jpg",
      "/images/unis/lbs-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 150000, "max": 240000 },
    "acceptanceRate": "Highly Competitive (<15%)",
    "requirements": {
      "british": "First Class Honours equivalent / AAA",
      "ib": "36+ points",
      "cbse": "90%+ in Class 12 Boards",
      "american": "3.6+ GPA + GMAT/GRE or SAT",
      "ielts": "7.0 overall",
      "emsatEnglish": "1650+"
    },
    "popularMajors": ["Executive MBA", "Masters in Finance", "Global Strategy", "FinTech Leadership"],
    "scholarships": [
      { "title": "LBS Middle East Scholars Award", "coverage": "Up to 50% tuition reduction", "criteria": "Exceptional academic background and leadership" }
    ],
    "muadalaNote": "Ranked among top business schools in the world by Financial Times.",
    "highlights": ["Located in DIFC, the Middle East's primary financial district", "Consistently ranked top 5 business schools globally", "Elite global alumni network in sovereign wealth and private equity"],
    "websiteUrl": "https://www.london.edu"
  },
  # 44. Hult International Business School Dubai
  {
    "id": "hult",
    "name": "Hult International Business School Dubai",
    "acronym": "Hult Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Internet City",
    "type": "International Branch",
    "campusImage": "/images/unis/hult/campus.jpg",
    "campusGallery": [
      "/images/unis/hult/campus.jpg",
      "/images/unis/hult/gallery-1.jpg",
      "/images/unis/hult/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 110000, "max": 145000 },
    "acceptanceRate": "Selective (~52%)",
    "requirements": {
      "british": "BBB at A-Level",
      "ib": "28–30 points",
      "cbse": "75% in Class 12 Boards",
      "american": "3.0+ GPA High School Diploma",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Bachelor of Business Administration", "International Business", "Business Analytics", "Entrepreneurship", "Social Impact"],
    "scholarships": [
      { "title": "Global Generation Scholarship", "coverage": "Up to 40% tuition fee reduction", "criteria": "Leadership essay and high school excellence" },
      { "title": "Social Impact Award", "coverage": "25% discount", "criteria": "Demonstrated community initiative" }
    ],
    "muadalaNote": "Triple-accredited by AACSB, AMBA, and EQUIS.",
    "highlights": ["Campus rotation to Boston, San Francisco, London, and Shanghai", "Practical, challenge-based business curriculum", "Students from over 140 nations"],
    "websiteUrl": "https://www.hult.edu"
  },
  # 45. City, University of London (DIFC)
  {
    "id": "city-dubai",
    "name": "City, University of London (DIFC Centre)",
    "acronym": "City Dubai",
    "emirate": "Dubai",
    "campusLocation": "DIFC Gate Village, Dubai",
    "type": "International Branch",
    "campusImage": "/images/unis/city-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/city-dubai/campus.jpg",
      "/images/unis/city-dubai/gallery-1.jpg",
      "/images/unis/city-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 85000, "max": 115000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "AAB to ABB at A-Level",
      "ib": "32+ points",
      "cbse": "80% in Class 12 Boards",
      "american": "3.2+ GPA + SAT 1200+",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Aviation Management", "Maritime Operations", "Banking & Finance", "Islamic Finance", "Data Privacy Law"],
    "scholarships": [
      { "title": "DIFC Academic Excellence Award", "coverage": "Up to 30% tuition fee deduction", "criteria": "Top grade average in high school" }
    ],
    "muadalaNote": "Home of Bayes Business School (formerly Cass); UK royal charter degrees.",
    "highlights": ["Located in DIFC Gate Village", "World leader in aviation finance and actuarial science", "Direct corporate pipeline into DIFC financial institutions"],
    "websiteUrl": "https://www.city.ac.uk"
  },
  # 46. IMT Dubai
  {
    "id": "imt-dubai",
    "name": "Institute of Management Technology Dubai",
    "acronym": "IMT Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "Private Accredited",
    "campusImage": "/images/unis/imt-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/imt-dubai/campus.jpg",
      "/images/unis/imt-dubai/gallery-1.jpg",
      "/images/unis/imt-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 45000, "max": 58000 },
    "acceptanceRate": "Accessible (~70%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CD or above)",
      "ib": "25+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Bachelor of Business Administration", "Digital Business", "Supply Chain Management", "Retail Management", "Marketing"],
    "scholarships": [
      { "title": "Merit Entrance Grant", "coverage": "15% to 40% discount", "criteria": "High school score 80% to 95%+" }
    ],
    "muadalaNote": "Accredited by UAE CAA and IACBE.",
    "highlights": ["Compact, focused business and analytics academy", "Strong placement ties with UAE retail and logistics groups", "International student housing within campus"],
    "websiteUrl": "https://www.imtdubai.ac.ae"
  },
  # 47. Islamic Azad University Dubai
  {
    "id": "azad-dubai",
    "name": "Islamic Azad University Dubai",
    "acronym": "IAU Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai Knowledge Park",
    "type": "International Branch",
    "campusImage": "/images/unis/azad-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/azad-dubai/campus.jpg",
      "/images/unis/azad-dubai/gallery-1.jpg",
      "/images/unis/azad-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 35000, "max": 48000 },
    "acceptanceRate": "Accessible (~78%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Architecture", "Civil Engineering", "Computer Software", "Management", "Law"],
    "scholarships": [
      { "title": "Academic Honor Award", "coverage": "15% to 30% reduction", "criteria": "High school average >= 85%" }
    ],
    "muadalaNote": "Permitted by KHDA Dubai.",
    "highlights": ["Established presence in Dubai Knowledge Park", "Focus on architecture and civil engineering disciplines", "Affordable tuition structure"],
    "websiteUrl": "https://iau.ae"
  },
  # 48. City University Dubai
  {
    "id": "city-university",
    "name": "City University Dubai (formerly City University College)",
    "acronym": "CUC Dubai",
    "emirate": "Dubai",
    "campusLocation": "Al Garhoud, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/unis/city-university/campus.jpg",
    "campusGallery": [
      "/images/unis/city-university/campus.jpg",
      "/images/unis/city-university/gallery-1.jpg",
      "/images/unis/city-university/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 42000, "max": 56000 },
    "acceptanceRate": "Accessible (~74%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Business Management", "Computer Information Systems", "Accounting", "Public Relations", "Human Resources"],
    "scholarships": [
      { "title": "Community Achievement Grant", "coverage": "15% to 35% tuition waiver", "criteria": "High school average >= 80%" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Centrally located in Al Garhoud near GGICO metro station", "Flexible evening and weekend study modes for working students", "CAA accredited degree paths"],
    "websiteUrl": "https://www.cityuniversity.ac.ae"
  },
  # 49. Jumeira University
  {
    "id": "jumeira-uni",
    "name": "Jumeira University",
    "acronym": "JU",
    "emirate": "Dubai",
    "campusLocation": "Al Quoz 4, Latifa Bint Hamdan St, Dubai",
    "type": "Private Accredited",
    "campusImage": "/images/unis/jumeira-uni/campus.jpg",
    "campusGallery": [
      "/images/unis/jumeira-uni/campus.jpg",
      "/images/unis/jumeira-uni/gallery-1.jpg",
      "/images/unis/jumeira-uni/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 44000, "max": 58000 },
    "acceptanceRate": "Accessible (~72%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Healthcare Management", "Environmental Health", "Business Administration", "Islamic Studies", "Education"],
    "scholarships": [
      { "title": "Founder's Scholarship", "coverage": "Up to 50% tuition reduction", "criteria": "High school score 88%+" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Emphasis on healthcare sciences and public health leadership", "Dedicated male and female learning wings", "Vibrant community-centric culture"],
    "websiteUrl": "https://www.jumeira.ac.ae"
  },
  # 50. Dubai Institute of Design and Innovation
  {
    "id": "didi",
    "name": "Dubai Institute of Design and Innovation",
    "acronym": "DIDI",
    "emirate": "Dubai",
    "campusLocation": "Dubai Design District (d3)",
    "type": "Private Accredited",
    "campusImage": "/images/unis/didi/campus.jpg",
    "campusGallery": [
      "/images/unis/didi/campus.jpg",
      "/images/unis/didi/gallery-1.jpg",
      "/images/unis/didi/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 98000, "max": 105000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "BBB at A-Level + creative portfolio",
      "ib": "28+ points + portfolio",
      "cbse": "75% in Class 12 + portfolio",
      "american": "3.0+ GPA + design portfolio review",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Bachelor of Design (Product Design)", "Strategic Design Management", "Multimedia Design", "Fashion Design", "Physical Computing"],
    "scholarships": [
      { "title": "d3 Creative Visionary Scholarship", "coverage": "Up to 50% tuition waiver", "criteria": "Exceptional portfolio review and high school score >= 85%" }
    ],
    "muadalaNote": "Curriculum developed in collaboration with MIT and Parsons School of Design.",
    "highlights": ["Located in the heart of Dubai Design District (d3)", "Curriculum crafted with MIT and Parsons New York", "Cross-disciplinary design degree unique to the MENA region"],
    "websiteUrl": "https://didi.ac.ae"
  },
  # 51. Saint-Joseph University Dubai
  {
    "id": "usj-dubai",
    "name": "Saint-Joseph University Dubai",
    "acronym": "USJ Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City",
    "type": "International Branch",
    "campusImage": "/images/unis/usj-dubai/campus.jpg",
    "campusGallery": [
      "/images/unis/usj-dubai/campus.jpg",
      "/images/unis/usj-dubai/gallery-1.jpg",
      "/images/unis/usj-dubai/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 52000, "max": 68000 },
    "acceptanceRate": "Moderate (~65%)",
    "requirements": {
      "british": "BCC at A-Level",
      "ib": "26+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Bachelor of Law (LLB)", "Civil Law", "International Arbitration", "Corporate Law", "Comparative Legal Systems"],
    "scholarships": [
      { "title": "Legal Excellence Scholarship", "coverage": "Up to 30% tuition fee reduction", "criteria": "High school score 85%+" }
    ],
    "muadalaNote": "Prestigious Lebanese law curriculum recognized across the Arab world.",
    "highlights": ["Distinguished legal education based on Saint-Joseph University Beirut heritage", "Bilingual Arabic-French legal training", "High judicial exam pass rate"],
    "websiteUrl": "https://www.usj.edu.lb/dubai"
  },
  # 52. Synergy University Dubai
  {
    "id": "synergy",
    "name": "Synergy University Dubai",
    "acronym": "Synergy",
    "emirate": "Dubai",
    "campusLocation": "JLT (Jumeirah Lakes Towers), Dubai",
    "type": "International Branch",
    "campusImage": "/images/unis/synergy/campus.jpg",
    "campusGallery": [
      "/images/unis/synergy/campus.jpg",
      "/images/unis/synergy/gallery-1.jpg",
      "/images/unis/synergy/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 38000, "max": 49000 },
    "acceptanceRate": "Accessible (~80%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Global Economy & Business", "Hotel & Restaurant Management", "Information Systems & Technologies", "Entrepreneurship"],
    "scholarships": [
      { "title": "Early Admission Grant", "coverage": "15% to 25% discount", "criteria": "Early enrollment" }
    ],
    "muadalaNote": "Licensed by KHDA Dubai.",
    "highlights": ["Located in JLT with easy metro connectivity", "Strong ties with Russian and CIS regional enterprises", "Cost-effective international degree option"],
    "websiteUrl": "https://synergydubai.ae"
  },
  # 53. Rabdan Academy
  {
    "id": "rabdan",
    "name": "Rabdan Academy",
    "acronym": "Rabdan",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Dhafrah, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/rabdan/campus.jpg",
    "campusGallery": [
      "/images/unis/rabdan/campus.jpg",
      "/images/unis/rabdan/gallery-1.jpg",
      "/images/unis/rabdan/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 65000 },
    "acceptanceRate": "Selective (~32%)",
    "requirements": {
      "british": "BBB at A-Level",
      "ib": "30+ points",
      "cbse": "80% in Class 12 Boards",
      "american": "3.0+ GPA + physical fitness / interview",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+ (EmSAT Math 1200+)"
    },
    "popularMajors": ["Homeland Security", "Emergency Management", "Business Continuity", "Integrated Intelligence", "Policing & Security"],
    "scholarships": [
      { "title": "National Security Sponsorship", "coverage": "100% full sponsorship + stipend", "criteria": "UAE Nationals meeting national defense standards" }
    ],
    "muadalaNote": "Dual education model blending academic degrees with vocational security credentials.",
    "highlights": ["Specialized government academy for safety, security, defense, and crisis response", "World-class simulation incident response command center", "Direct commissioning and employment within government bodies"],
    "websiteUrl": "https://rabdan.ac.ae"
  },
  # 54. MBZUH
  {
    "id": "mbzuh",
    "name": "Mohamed bin Zayed University for Humanities",
    "acronym": "MBZUH",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Rawdah, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/mbzuh/campus.jpg",
    "campusGallery": [
      "/images/unis/mbzuh/campus.jpg",
      "/images/unis/mbzuh/gallery-1.jpg",
      "/images/unis/mbzuh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 48000 },
    "acceptanceRate": "Selective (~40%)",
    "requirements": {
      "british": "BBC at A-Level (Arabic proficiency)",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA with Arabic & Islamic studies",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+ (EmSAT Arabic 1250+)"
    },
    "popularMajors": ["Islamic Studies", "Arabic Language & Literature", "Philosophy & Ethics", "Tolerance & Coexistence", "Humanities"],
    "scholarships": [
      { "title": "Presidential Fellowship", "coverage": "100% full tuition + monthly stipend", "criteria": "Outstanding students in humanities and Arabic literature" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["World-renowned centre for moderate Islamic discourse and interfaith dialogue", "Preserves and researches classical Arabic cultural heritage", "Generous student sponsorships and cultural exchange travel"],
    "websiteUrl": "https://www.mbzuh.ac.ae"
  },
  # 55. Anwar Gargash Diplomatic Academy
  {
    "id": "agda",
    "name": "Anwar Gargash Diplomatic Academy",
    "acronym": "AGDA",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Bateen, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/agda/campus.jpg",
    "campusGallery": [
      "/images/unis/agda/campus.jpg",
      "/images/unis/agda/gallery-1.jpg",
      "/images/unis/agda/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 75000 },
    "acceptanceRate": "Highly Selective (<20%)",
    "requirements": {
      "british": "ABB at A-Level",
      "ib": "32+ points",
      "cbse": "85% in Class 12 Boards",
      "american": "3.2+ GPA + diplomatic interview",
      "ielts": "7.0 overall",
      "emsatEnglish": "1600+"
    },
    "popularMajors": ["Diplomacy & International Relations", "Global Affairs", "Humanitarian Action", "Geopolitics & Energy Strategy"],
    "scholarships": [
      { "title": "Foreign Affairs Fellowship", "coverage": "100% full scholarship + diplomatic allowance", "criteria": "Admitted UAE future diplomats" }
    ],
    "muadalaNote": "Under the Ministry of Foreign Affairs (MoFA); CAA accredited.",
    "highlights": ["Official training academy for UAE diplomats and ambassadors", "Distinguished guest lectures from international heads of state", "Direct career track into UAE embassies and United Nations missions"],
    "websiteUrl": "https://agda.ac.ae"
  },
  # 56. FCHS Abu Dhabi
  {
    "id": "fchs-auh",
    "name": "Fatima College of Health Sciences (Abu Dhabi)",
    "acronym": "FCHS Abu Dhabi",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Mafraq, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/fchs-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/fchs-auh/campus.jpg",
      "/images/unis/fchs-auh/gallery-1.jpg",
      "/images/unis/fchs-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 50000 },
    "acceptanceRate": "Selective (~50%)",
    "requirements": {
      "british": "BCC with Biology and Chemistry",
      "ib": "28+ points",
      "cbse": "75% in PCB stream",
      "american": "2.8+ GPA with science subjects",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Bachelor of Nursing", "Pharmacy", "Physiotherapy", "Radiography & Medical Imaging", "Emergency Health (Paramedic)"],
    "scholarships": [
      { "title": "National Healthcare Sponsorship", "coverage": "100% tuition + monthly stipend", "criteria": "UAE Nationals in nursing and health sciences" }
    ],
    "muadalaNote": "Accredited by UAE CAA; affiliated with Monash University Australia.",
    "highlights": ["Specialized in vital nursing and allied health professions", "Partnership with Monash University, Australia", "Guaranteed employment in SEHA / PureHealth healthcare networks"],
    "websiteUrl": "https://www.fchs.ac.ae"
  },
  # 57. FCHS Al Ain
  {
    "id": "fchs-alain",
    "name": "Fatima College of Health Sciences (Al Ain)",
    "acronym": "FCHS Al Ain",
    "emirate": "Al Ain",
    "campusLocation": "Al Jimi, Al Ain",
    "type": "Federal / Public",
    "campusImage": "/images/unis/fchs-alain/campus.jpg",
    "campusGallery": [
      "/images/unis/fchs-alain/campus.jpg",
      "/images/unis/fchs-alain/gallery-1.jpg",
      "/images/unis/fchs-alain/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 50000 },
    "acceptanceRate": "Selective (~52%)",
    "requirements": {
      "british": "BCC with Biology and Chemistry",
      "ib": "28+ points",
      "cbse": "75% in PCB stream",
      "american": "2.8+ GPA with science subjects",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Nursing", "Physiotherapy", "Radiography", "Clinical Psychology", "Health Informatics"],
    "scholarships": [
      { "title": "National Healthcare Sponsorship", "coverage": "100% tuition + monthly stipend", "criteria": "UAE Nationals entering healthcare fields" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Dedicated healthcare training centre serving the Eastern Region", "State-of-the-art anatomy and simulation wards", "Close hospital rotations at Tawam and Al Ain Hospital"],
    "websiteUrl": "https://www.fchs.ac.ae"
  },
  # 58. ADSM
  {
    "id": "adsm",
    "name": "Abu Dhabi School of Management",
    "acronym": "ADSM",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Zafranah, Abu Dhabi",
    "type": "Private Accredited",
    "campusImage": "/images/unis/adsm/campus.jpg",
    "campusGallery": [
      "/images/unis/adsm/campus.jpg",
      "/images/unis/adsm/gallery-1.jpg",
      "/images/unis/adsm/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 58000, "max": 75000 },
    "acceptanceRate": "Moderate (~65%)",
    "requirements": {
      "british": "BCC at A-Level",
      "ib": "26+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Bachelor of Science in Management", "Business Analytics", "Quality Management", "Leadership & Strategy"],
    "scholarships": [
      { "title": "Chamber of Commerce Merit Award", "coverage": "20% to 40% discount", "criteria": "High school average >= 85%" }
    ],
    "muadalaNote": "Founded by Abu Dhabi Chamber of Commerce & Industry; CAA accredited.",
    "highlights": ["Direct initiative of the Abu Dhabi Chamber of Commerce", "Heavy focus on entrepreneurship, AI in business, and commercial leadership", "Strong corporate mentoring network"],
    "websiteUrl": "https://www.adsm.ac.ae"
  },
  # 59. EIC Abu Dhabi
  {
    "id": "eic-auh",
    "name": "European International College Abu Dhabi",
    "acronym": "EIC",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Muror Road, Abu Dhabi",
    "type": "Private Accredited",
    "campusImage": "/images/unis/eic-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/eic-auh/campus.jpg",
      "/images/unis/eic-auh/gallery-1.jpg",
      "/images/unis/eic-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 38000, "max": 52000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Hotel Management", "Tourism Management", "Business Administration", "Event Coordination"],
    "scholarships": [
      { "title": "Hospitality Excellence Grant", "coverage": "15% to 30% reduction", "criteria": "High school average >= 80%" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Swiss hotel management pedagogy in Abu Dhabi", "Internship placements with luxury 5-star hotel brands", "Boutique practical class sizes"],
    "websiteUrl": "https://www.eic.ac.ae"
  },
  # 60. INSEAD Middle East Campus
  {
    "id": "insead-auh",
    "name": "INSEAD Middle East Campus Abu Dhabi",
    "acronym": "INSEAD",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Maryah Island, Abu Dhabi",
    "type": "International Branch",
    "campusImage": "/images/unis/insead-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/insead-auh/campus.jpg",
      "/images/unis/insead-auh/gallery-1.jpg",
      "/images/unis/insead-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 180000, "max": 280000 },
    "acceptanceRate": "Highly Competitive (<10%)",
    "requirements": {
      "british": "First Class Honours equivalent",
      "ib": "38+ points",
      "cbse": "92%+ in Class 12 Boards",
      "american": "3.7+ GPA + GMAT 700+",
      "ielts": "7.5 overall",
      "emsatEnglish": "1700+"
    },
    "popularMajors": ["Global Executive MBA", "Strategic Leadership", "Venture Capital & Private Equity", "Corporate Governance"],
    "scholarships": [
      { "title": "Abu Dhabi Global Leader Scholarship", "coverage": "Up to 50% tuition reduction", "criteria": "Outstanding leadership credentials" }
    ],
    "muadalaNote": "Consistently ranked #1 or #2 MBA programme in the world by the Financial Times.",
    "highlights": ["Located on Al Maryah Island in Abu Dhabi's international financial free zone", "The Business School for the World", "Premier executive network across 170 countries"],
    "websiteUrl": "https://www.insead.edu/campuses/middle-east"
  },
  # 61. National Defence College UAE
  {
    "id": "ndc-uae",
    "name": "National Defence College UAE",
    "acronym": "NDC",
    "emirate": "Abu Dhabi",
    "campusLocation": "Camp Al Nahyan, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/ndc-uae/campus.jpg",
    "campusGallery": [
      "/images/unis/ndc-uae/campus.jpg",
      "/images/unis/ndc-uae/gallery-1.jpg",
      "/images/unis/ndc-uae/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 0 },
    "acceptanceRate": "Elite Nominated (<5%)",
    "requirements": {
      "british": "Nomination by Armed Forces or Government Entity",
      "ib": "Nominated candidate criteria",
      "cbse": "Nominated candidate criteria",
      "american": "Senior civil servant / military officer selection",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Strategic Security Studies", "National Decision-Making", "Crisis Management", "Geopolitical Strategy"],
    "scholarships": [
      { "title": "Full State Fellowship", "coverage": "100% full coverage", "criteria": "All nominated participants fully sponsored by the UAE State" }
    ],
    "muadalaNote": "Apex military and security educational institution in the UAE.",
    "highlights": ["Highest level of strategic education for military and civil leaders in the UAE", "Direct mentorship from global strategic defence luminaries", "Focus on national sovereignty and statecraft"],
    "websiteUrl": "https://ndc.ac.ae"
  },
  # 62. ECAE
  {
    "id": "ecae",
    "name": "Emirates College for Advanced Education",
    "acronym": "ECAE",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Muroor, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/ecae/campus.jpg",
    "campusGallery": [
      "/images/unis/ecae/campus.jpg",
      "/images/unis/ecae/gallery-1.jpg",
      "/images/unis/ecae/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 42000 },
    "acceptanceRate": "Selective (~45%)",
    "requirements": {
      "british": "BBC at A-Level",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Curriculum & Instruction", "Special Education", "Educational Technology", "School Leadership", "Early Childhood Education"],
    "scholarships": [
      { "title": "Teacher Sponsorship Grant", "coverage": "100% tuition for future educators", "criteria": "UAE Nationals entering teaching and education leadership" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Dedicated teacher training and educational development college", "Direct affiliation with ADEK and MOE school systems", "State-of-the-art educational psychology labs"],
    "websiteUrl": "https://www.ecae.ac.ae"
  },
  # 63. Liwa College Abu Dhabi
  {
    "id": "liwa-auh",
    "name": "Liwa College (Abu Dhabi Campus)",
    "acronym": "LC Abu Dhabi",
    "emirate": "Abu Dhabi",
    "campusLocation": "Al Nahyan, Abu Dhabi",
    "type": "Private Accredited",
    "campusImage": "/images/unis/liwa-auh/campus.jpg",
    "campusGallery": [
      "/images/unis/liwa-auh/campus.jpg",
      "/images/unis/liwa-auh/gallery-1.jpg",
      "/images/unis/liwa-auh/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 40000, "max": 58000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Medical Diagnostic Imaging", "Health Management", "Computer Information Systems", "Accounting", "Public Relations"],
    "scholarships": [
      { "title": "Merit Scholarship", "coverage": "Up to 50% discount", "criteria": "High school score 85% to 95%+" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Over 30 years of practical education (formerly Emirates College of Technology)", "High-tech health laboratories in central Abu Dhabi", "Career-oriented degrees with practical internships"],
    "websiteUrl": "https://lc.ac.ae"
  },
  # 64. Liwa College Al Ain
  {
    "id": "liwa-alain",
    "name": "Liwa College (Al Ain Campus)",
    "acronym": "LC Al Ain",
    "emirate": "Al Ain",
    "campusLocation": "Al Falaj Hazzaa, Al Ain",
    "type": "Private Accredited",
    "campusImage": "/images/unis/liwa-alain/campus.jpg",
    "campusGallery": [
      "/images/unis/liwa-alain/campus.jpg",
      "/images/unis/liwa-alain/gallery-1.jpg",
      "/images/unis/liwa-alain/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 38000, "max": 54000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Medical Laboratory Analysis", "Business Administration", "Media & Public Relations", "Information Technology"],
    "scholarships": [
      { "title": "Academic Achievement Award", "coverage": "20% to 40% reduction", "criteria": "High school average >= 85%" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Modern purpose-built campus in Al Ain", "Strong health sciences and business faculties", "Affordable fee structures with installment plans"],
    "websiteUrl": "https://lc.ac.ae"
  },
  # 65. ADVETI
  {
    "id": "adveti",
    "name": "Abu Dhabi Vocational Education and Training Institute",
    "acronym": "ADVETI",
    "emirate": "Abu Dhabi",
    "campusLocation": "Mohammed Bin Zayed City, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/unis/adveti/campus.jpg",
    "campusGallery": [
      "/images/unis/adveti/campus.jpg",
      "/images/unis/adveti/gallery-1.jpg",
      "/images/unis/adveti/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 38000 },
    "acceptanceRate": "Accessible (~78%)",
    "requirements": {
      "british": "5 IGCSEs",
      "ib": "24+ points",
      "cbse": "55% in Class 12 Boards",
      "american": "2.2+ GPA High School Diploma",
      "ielts": "5.0 overall",
      "emsatEnglish": "1100+"
    },
    "popularMajors": ["Design & Media", "Information Technology", "Business Operations", "Travel & Tourism", "Industrial Engineering Tech"],
    "scholarships": [
      { "title": "National Vocational Sponsorship", "coverage": "100% full tuition for Nationals", "criteria": "UAE Nationals" }
    ],
    "muadalaNote": "Federal vocational institute certified by NQC and CAA.",
    "highlights": ["Direct path into vital technical careers across government entities", "State-of-the-art machinery and digital media studios", "100% practical hands-on training model"],
    "websiteUrl": "https://www.adveti.ac.ae"
  },
  # 66. Skyline University College
  {
    "id": "skyline",
    "name": "Skyline University College",
    "acronym": "SUC",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Private Accredited",
    "campusImage": "/images/unis/skyline/campus.jpg",
    "campusGallery": [
      "/images/unis/skyline/campus.jpg",
      "/images/unis/skyline/gallery-1.jpg",
      "/images/unis/skyline/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 38000, "max": 52000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Information Technology (AI & Robotics)", "Travel & Tourism Aviation", "International Business", "Marketing & Retail", "Accounting & Finance"],
    "scholarships": [
      { "title": "Academic Merit Scholarship", "coverage": "15% to 50% fee concession", "criteria": "High school average from 80% to 95%+" },
      { "title": "Sports Excellence Grant", "coverage": "Up to 50% waiver", "criteria": "State or national level sports achievements" }
    ],
    "muadalaNote": "Established in 1990; accredited by UAE CAA.",
    "highlights": ["Over 30 years in Sharjah's University City", "Specialized aviation and tourism laboratories", "Over AED 3 million awarded in student scholarships annually"],
    "websiteUrl": "https://www.skylineuniversity.ac.ae"
  },
  # 67. University of Khorfakkan
  {
    "id": "uok",
    "name": "University of Khorfakkan",
    "acronym": "UOK",
    "emirate": "Sharjah",
    "campusLocation": "Khorfakkan, Sharjah (East Coast)",
    "type": "Federal / Public",
    "campusImage": "/images/unis/uok/campus.jpg",
    "campusGallery": [
      "/images/unis/uok/campus.jpg",
      "/images/unis/uok/gallery-1.jpg",
      "/images/unis/uok/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 48000 },
    "acceptanceRate": "Selective (~48%)",
    "requirements": {
      "british": "BBC at A-Level",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA with science subjects",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Marine Biology & Oceanography", "Fisheries & Marine Sciences", "Business Administration", "Sharia & Law", "Communication"],
    "scholarships": [
      { "title": "Sharjah Government Scholarship", "coverage": "100% full tuition for Sharjah Nationals", "criteria": "Sharjah residency and high school qualification" }
    ],
    "muadalaNote": "Founded by Decree of the Ruler of Sharjah; CAA accredited.",
    "highlights": ["Stunning coastal campus nestled between mountains and sea in Khorfakkan", "UAE's premier specialized marine sciences research institute", "Advanced coastal research vessels and marine labs"],
    "websiteUrl": "https://www.ukf.ac.ae"
  },
  # 68. University of Kalba
  {
    "id": "ukalba",
    "name": "University of Kalba",
    "acronym": "UKalba",
    "emirate": "Sharjah",
    "campusLocation": "Kalba, Sharjah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/ukalba/campus.jpg",
    "campusGallery": [
      "/images/unis/ukalba/campus.jpg",
      "/images/unis/ukalba/gallery-1.jpg",
      "/images/unis/ukalba/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 48000 },
    "acceptanceRate": "Selective (~50%)",
    "requirements": {
      "british": "BBC at A-Level",
      "ib": "28+ points",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA with sports/science background",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Sports Sciences & Physical Education", "Business Administration", "Law", "Computer Science", "Arts & Humanities"],
    "scholarships": [
      { "title": "Sharjah Government Full Sponsorship", "coverage": "100% tuition for Sharjah citizens", "criteria": "Meeting admission criteria" }
    ],
    "muadalaNote": "Founded by Decree of the Ruler of Sharjah; CAA accredited.",
    "highlights": ["Flagship College of Sports Sciences in the UAE", "World-class Olympic sports training complexes and aquatic centres", "Beautiful location on the Kalba mangrove ecological reserve"],
    "websiteUrl": "https://www.uk.ac.ae"
  },
  # 69. Al Qasimia University
  {
    "id": "aqu",
    "name": "Al Qasimia University",
    "acronym": "AQU",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/aqu/campus.jpg",
    "campusGallery": [
      "/images/unis/aqu/campus.jpg",
      "/images/unis/aqu/gallery-1.jpg",
      "/images/unis/aqu/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 0 },
    "acceptanceRate": "Highly Competitive (<15%)",
    "requirements": {
      "british": "High school diploma with distinction",
      "ib": "30+ points",
      "cbse": "85% in Class 12 Boards",
      "american": "3.2+ GPA + Quran / Arabic proficiency",
      "ielts": "5.0 overall",
      "emsatEnglish": "1200+"
    },
    "popularMajors": ["Sharia & Islamic Studies", "Holy Quran Sciences", "Arabic Language & Literature", "Economics & Management", "Mass Communication"],
    "scholarships": [
      { "title": "Al Qasimia Full Fellowship", "coverage": "100% full ride: tuition, free housing, monthly stipend, medical insurance, annual flights", "criteria": "All admitted international and local students receive full fellowship" }
    ],
    "muadalaNote": "Founded by the Ruler of Sharjah; CAA accredited.",
    "highlights": ["Magnificent Islamic architectural masterpiece campus in Sharjah", "100% full-ride fellowship for every admitted student from over 80 nations", "Center for global Islamic and Arabic cultural illumination"],
    "websiteUrl": "https://www.alqasimia.ac.ae"
  },
  # 70. Sharjah Police Academy
  {
    "id": "spa-shj",
    "name": "Sharjah Police Science Academy",
    "acronym": "SPA",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Federal / Public",
    "campusImage": "/images/unis/spa-shj/campus.jpg",
    "campusGallery": [
      "/images/unis/spa-shj/campus.jpg",
      "/images/unis/spa-shj/gallery-1.jpg",
      "/images/unis/spa-shj/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 0, "max": 0 },
    "acceptanceRate": "Elite Nominated (<10%)",
    "requirements": {
      "british": "High school average >= 80% + fitness test",
      "ib": "High school average >= 80%",
      "cbse": "High school average >= 80%",
      "american": "3.0+ GPA + medical and security clearance",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Police Sciences & Criminal Justice", "Criminal Investigation", "Cybercrime & Digital Forensics", "Security Leadership"],
    "scholarships": [
      { "title": "Sharjah Government Cadet Sponsorship", "coverage": "100% full coverage + cadet monthly salary", "criteria": "Admitted UAE cadet officers" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Prestigious security and policing education in University City", "Advanced ballistics, tactical driving, and digital forensic crime labs", "Direct commissioning as police officers upon graduation"],
    "websiteUrl": "https://www.psa.ac.ae"
  },
  # 71. Ajman University
  {
    "id": "ajman-uni",
    "name": "Ajman University",
    "acronym": "AU",
    "emirate": "Ajman",
    "campusLocation": "University City, Al Jurf 1, Ajman",
    "type": "Private Accredited",
    "campusImage": "/images/unis/ajman-uni/campus.jpg",
    "campusGallery": [
      "/images/unis/ajman-uni/campus.jpg",
      "/images/unis/ajman-uni/gallery-1.jpg",
      "/images/unis/ajman-uni/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 42000, "max": 89000 },
    "acceptanceRate": "Selective (~55%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CC or above)",
      "ib": "26–28 points in IB Diploma",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Dentistry (DDS)", "Medicine (MBBS)", "Pharmacy", "Artificial Intelligence Engineering", "Architecture"],
    "scholarships": [
      { "title": "His Highness Ruler of Ajman Scholarship", "coverage": "Up to 100% tuition waiver", "criteria": "High school average >= 95%" },
      { "title": "High Achiever Discount", "coverage": "20% to 50% discount", "criteria": "Average from 85% to 94%" },
      { "title": "Thamer Fund for Educational Solidarity", "coverage": "Need-based fee relief", "criteria": "Demonstrated financial hardship" }
    ],
    "muadalaNote": "First private university in the GCC (founded 1988); accredited by UAE CAA and QAA Global UK.",
    "highlights": ["Ranked among top 500 universities in the world (QS World Rankings)", "State-of-the-art College of Dentistry with 140+ dental clinics", "AACSB and ABET accredited business and engineering degrees"],
    "websiteUrl": "https://www.ajman.ac.ae"
  },
  # 72. Gulf Medical University
  {
    "id": "gmu",
    "name": "Gulf Medical University",
    "acronym": "GMU",
    "emirate": "Ajman",
    "campusLocation": "Al Jurf 1, Ajman",
    "type": "Private Accredited",
    "campusImage": "/images/unis/gmu/campus.jpg",
    "campusGallery": [
      "/images/unis/gmu/campus.jpg",
      "/images/unis/gmu/gallery-1.jpg",
      "/images/unis/gmu/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 85000, "max": 150000 },
    "acceptanceRate": "Selective (~38%)",
    "requirements": {
      "british": "AAB to ABB at A-Level (Biology & Chemistry mandatory)",
      "ib": "32+ points with HL Biology & Chemistry",
      "cbse": "85% in PCB in Class 12 Boards",
      "american": "3.5+ GPA + EmSAT Biology & Chemistry 1300+",
      "ielts": "6.5 overall",
      "emsatEnglish": "1500+"
    },
    "popularMajors": ["Medicine & Surgery (MBBS)", "Dental Medicine (DMD)", "Doctor of Pharmacy (PharmD)", "Physiotherapy", "Biomedical Sciences"],
    "scholarships": [
      { "title": "Thumbay Academic Merit Award", "coverage": "15% to 40% tuition fee reduction", "criteria": "High school average >= 90% in science" }
    ],
    "muadalaNote": "Accredited by UAE CAA and listed in the World Directory of Medical Schools.",
    "highlights": ["Largest private academic medical center in the Middle East", "On-campus 350-bed Thumbay University Hospital for direct clinical rotations", "Over 2,000 healthcare students from 86 countries"],
    "websiteUrl": "https://www.gmu.ac.ae"
  },
  # 73. City University College of Ajman
  {
    "id": "cuca",
    "name": "City University College of Ajman",
    "acronym": "CUCA",
    "emirate": "Ajman",
    "campusLocation": "Al Tallah 2, Ajman",
    "type": "Private Accredited",
    "campusImage": "/images/unis/cuca/campus.jpg",
    "campusGallery": [
      "/images/unis/cuca/campus.jpg",
      "/images/unis/cuca/gallery-1.jpg",
      "/images/unis/cuca/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 36000, "max": 52000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Law", "Dental Surgery Tech", "Business Administration", "Public Relations", "Information Technology"],
    "scholarships": [
      { "title": "Ajman Community Grant", "coverage": "15% to 35% discount", "criteria": "High school score 80%+" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["Convenient campus in Al Tallah district", "Popular law school program with practical moot court sessions", "Flexible class scheduling tailored for working students"],
    "websiteUrl": "https://www.cuca.ae"
  },
  # 74. American University of Ras Al Khaimah
  {
    "id": "aurak",
    "name": "American University of Ras Al Khaimah",
    "acronym": "AURAK",
    "emirate": "Ras Al Khaimah",
    "campusLocation": "Al Qusaidat, Ras Al Khaimah",
    "type": "Private Accredited",
    "campusImage": "/images/unis/aurak/campus.jpg",
    "campusGallery": [
      "/images/unis/aurak/campus.jpg",
      "/images/unis/aurak/gallery-1.jpg",
      "/images/unis/aurak/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 45000, "max": 68000 },
    "acceptanceRate": "Moderate (~68%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels (grades CC or above)",
      "ib": "26+ points in IB Diploma",
      "cbse": "70% in Class 12 Boards",
      "american": "2.8+ GPA with SAT 1100+",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Mechanical Engineering", "Biotechnology", "Business Administration", "Petroleum Engineering", "Architecture"],
    "scholarships": [
      { "title": "H.H. Sheikh Saud bin Saqr Al Qasimi Scholarship", "coverage": "Up to 50% tuition reduction", "criteria": "High school average >= 90%" },
      { "title": "Pioneer Merit Award", "coverage": "20% to 35% waiver", "criteria": "Average from 80% to 89%" }
    ],
    "muadalaNote": "Dual accredited by US SACSCOC and UAE CAA.",
    "highlights": ["US SACSCOC institutional accreditation", "Scenic 1.3 million sq ft campus surrounded by the Hajar Mountains", "ABET accredited engineering and AACSB member business school"],
    "websiteUrl": "https://www.aurak.ac.ae"
  },
  # 75. RAK Medical & Health Sciences University
  {
    "id": "rakmhsu",
    "name": "RAK Medical & Health Sciences University",
    "acronym": "RAKMHSU",
    "emirate": "Ras Al Khaimah",
    "campusLocation": "Al Juwais, Ras Al Khaimah",
    "type": "Private Accredited",
    "campusImage": "/images/unis/rakmhsu/campus.jpg",
    "campusGallery": [
      "/images/unis/rakmhsu/campus.jpg",
      "/images/unis/rakmhsu/gallery-1.jpg",
      "/images/unis/rakmhsu/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 78000, "max": 135000 },
    "acceptanceRate": "Selective (~42%)",
    "requirements": {
      "british": "ABB at A-Level (Biology & Chemistry mandatory)",
      "ib": "30+ points with HL Science",
      "cbse": "80% in PCB stream",
      "american": "3.2+ GPA + EmSAT Biology & Chemistry",
      "ielts": "6.0 overall",
      "emsatEnglish": "1450+"
    },
    "popularMajors": ["Bachelor of Medicine & Bachelor of Surgery (MBBS)", "Dental Surgery (BDS)", "Bachelor of Pharmacy (BPharm)", "Nursing"],
    "scholarships": [
      { "title": "Chancellor's Merit Scholarship", "coverage": "20% to 50% tuition reduction", "criteria": "High school average >= 95%" }
    ],
    "muadalaNote": "Established by the Government of Ras Al Khaimah; CAA accredited.",
    "highlights": ["Premier dedicated medical university in the Northern Emirates", "Affiliated with Saqr Hospital and Ibrahim Bin Hamad Obaidullah Hospital", "Comprehensive healthcare simulation center"],
    "websiteUrl": "https://www.rakmhsu.ac.ae"
  },
  # 76. University of Stirling Ras Al Khaimah
  {
    "id": "stirling-rak",
    "name": "University of Stirling Ras Al Khaimah",
    "acronym": "Stirling RAK",
    "emirate": "Ras Al Khaimah",
    "campusLocation": "RAK Academic Zone, Al Dhait, Ras Al Khaimah",
    "type": "International Branch",
    "campusImage": "/images/unis/stirling-rak/campus.jpg",
    "campusGallery": [
      "/images/unis/stirling-rak/campus.jpg",
      "/images/unis/stirling-rak/gallery-1.jpg",
      "/images/unis/stirling-rak/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 42000, "max": 58000 },
    "acceptanceRate": "Moderate (~70%)",
    "requirements": {
      "british": "CCC to BCC at A-Level",
      "ib": "26+ points",
      "cbse": "65% in Class 12 Boards",
      "american": "2.7+ GPA High School Diploma",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Computing Science & Software", "Management & Finance", "Accounting", "Marketing", "Human Resources"],
    "scholarships": [
      { "title": "Scottish Academic Excellence", "coverage": "Up to 35% tuition fee reduction", "criteria": "High school average >= 85%" }
    ],
    "muadalaNote": "Degree conferred directly from University of Stirling, Scotland (UK QAA).",
    "highlights": ["Affordable British university degree in the UAE", "Direct transfer opportunities to Scotland for final years", "Specialized computing and accounting curricula"],
    "websiteUrl": "https://www.stir.ac.uk"
  },
  # 77. University of Bolton Academic Centre RAK
  {
    "id": "bolton-rak",
    "name": "University of Bolton Academic Centre RAK",
    "acronym": "Bolton RAK",
    "emirate": "Ras Al Khaimah",
    "campusLocation": "Al Hudaiba, Ras Al Khaimah",
    "type": "International Branch",
    "campusImage": "/images/unis/bolton-rak/campus.jpg",
    "campusGallery": [
      "/images/unis/bolton-rak/campus.jpg",
      "/images/unis/bolton-rak/gallery-1.jpg",
      "/images/unis/bolton-rak/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 35000, "max": 48000 },
    "acceptanceRate": "Accessible (~75%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Civil Engineering", "Mechanical Engineering", "Computing & AI", "Business Management", "Psychology"],
    "scholarships": [
      { "title": "Pioneer Bursary", "coverage": "15% to 30% reduction", "criteria": "High school score 80%+" }
    ],
    "muadalaNote": "Accredited by UK QAA, permitted by RAK Academic Zone.",
    "highlights": ["Established UK branch presence in RAK since 2008", "Extensive engineering workshops and testing rigs", "Accessible tuition rates and installment structures"],
    "websiteUrl": "https://www.bolton.ac.uk"
  },
  # 78. University of Fujairah
  {
    "id": "uof",
    "name": "University of Fujairah",
    "acronym": "UOF",
    "emirate": "Fujairah",
    "campusLocation": "Al Faseel, Fujairah",
    "type": "Private Accredited",
    "campusImage": "/images/unis/uof/campus.jpg",
    "campusGallery": [
      "/images/unis/uof/campus.jpg",
      "/images/unis/uof/gallery-1.jpg",
      "/images/unis/uof/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 36000, "max": 52000 },
    "acceptanceRate": "Accessible (~76%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Information Technology", "Business Administration", "Mass Communication", "Arabic & Islamic Studies", "Nursing"],
    "scholarships": [
      { "title": "Fujairah Crown Prince Scholarship", "coverage": "Up to 50% tuition waiver", "criteria": "High school score 85%+" },
      { "title": "Merit Concession", "coverage": "20% to 35% discount", "criteria": "High school score 80% to 84%" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["First private university in the Emirate of Fujairah", "Modern campus located between coastal shores and dramatic mountain ridges", "Active community healthcare initiatives"],
    "websiteUrl": "https://www.uof.ac.ae"
  },
  # 79. Umm Al Quwain University
  {
    "id": "uaqu",
    "name": "Umm Al Quwain University",
    "acronym": "UAQU",
    "emirate": "Umm Al Quwain",
    "campusLocation": "Al Salamah 1, Umm Al Quwain",
    "type": "Private Accredited",
    "campusImage": "/images/unis/uaqu/campus.jpg",
    "campusGallery": [
      "/images/unis/uaqu/campus.jpg",
      "/images/unis/uaqu/gallery-1.jpg",
      "/images/unis/uaqu/gallery-2.jpg"
    ],
    "annualTuitionAED": { "min": 34000, "max": 48000 },
    "acceptanceRate": "Accessible (~78%)",
    "requirements": {
      "british": "5 IGCSEs + 2 A-Levels",
      "ib": "24+ points",
      "cbse": "60% in Class 12 Boards",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Bachelor of Law", "Business Administration", "Mass Communication", "Information Technology", "Arts & Sciences"],
    "scholarships": [
      { "title": "UAQ Ruler's Scholarship", "coverage": "Up to 50% tuition discount", "criteria": "High school average >= 85%" },
      { "title": "Community Academic Aid", "coverage": "15% to 30% reduction", "criteria": "Local residency and good academic standing" }
    ],
    "muadalaNote": "Accredited by UAE CAA.",
    "highlights": ["First university established in the Emirate of Umm Al Quwain", "Prominent law and public relations faculties", "Affordable community education with modern smart classrooms"],
    "websiteUrl": "https://www.uaqu.ac.ae"
  }
]

print(f"Total universities in list: {len(unis)}")

# Ensure each university has its local directory and images
core_12 = ["aus", "nyuad", "heriot-watt", "birmingham", "khalifa", "uowd", "cud", "uaeu", "uos", "rit", "alain", "adu"]

for idx, u in enumerate(unis):
    u_id = u["id"]
    if u_id in core_12:
        continue
    
    u_dir = os.path.join(UNIS_DIR, u_id)
    os.makedirs(u_dir, exist_ok=True)
    
    # Campus image
    c_img = os.path.join(u_dir, "campus.jpg")
    if not os.path.exists(c_img) or os.path.getsize(c_img) == 0:
        src = os.path.join(POOL_DIR, pool_files[idx % len(pool_files)])
        shutil.copyfile(src, c_img)
    
    # Gallery 1
    g1 = os.path.join(u_dir, "gallery-1.jpg")
    if not os.path.exists(g1) or os.path.getsize(g1) == 0:
        src1 = os.path.join(POOL_DIR, pool_files[(idx + 3) % len(pool_files)])
        shutil.copyfile(src1, g1)
        
    # Gallery 2
    g2 = os.path.join(u_dir, "gallery-2.jpg")
    if not os.path.exists(g2) or os.path.getsize(g2) == 0:
        src2 = os.path.join(POOL_DIR, pool_files[(idx + 7) % len(pool_files)])
        shutil.copyfile(src2, g2)

print("Images populated for all universities.")

# Now write src/data/universities.ts
ts_content = """export interface University {
  id: string;
  name: string;
  acronym: string;
  emirate: "Dubai" | "Abu Dhabi" | "Sharjah" | "Ajman" | "Ras Al Khaimah" | "Fujairah" | "Umm Al Quwain" | "Al Ain";
  campusLocation: string;
  type: "International Branch" | "Private Accredited" | "Federal / Public";
  campusImage: string;
  campusGallery: string[];
  annualTuitionAED: {
    min: number;
    max: number;
  };
  acceptanceRate: string;
  requirements: {
    british: string;
    ib: string;
    cbse: string;
    american: string;
    ielts: string;
    emsatEnglish: string;
  };
  popularMajors: string[];
  scholarships: {
    title: string;
    coverage: string;
    criteria: string;
  }[];
  muadalaNote: string;
  highlights: string[];
  websiteUrl: string;
}

export const UAE_UNIVERSITIES: University[] = """ + json.dumps(unis, indent=2) + """;

export const SCHOLARSHIPS_LIST = [
  {
    name: "ADEK Abu Dhabi Scholarship for Outstanding Students",
    provider: "Abu Dhabi Department of Education and Knowledge (ADEK)",
    eligibility: "Top performing UAE national and long-term resident high school graduates in Abu Dhabi",
    benefits: "Full tuition + allowance for top domestic and international universities",
    deadline: "March – April annually",
    url: "https://www.adek.gov.ae"
  },
  {
    name: "UAE Ministry of Education (MOE) University Sponsorship",
    provider: "UAE Ministry of Education",
    eligibility: "High achieving UAE national students with EmSAT score ≥ 1500 and high school score ≥ 90%",
    benefits: "100% tuition coverage, book stipend, and monthly allowance",
    deadline: "May – June annually",
    url: "https://www.moe.gov.ae"
  },
  {
    name: "GEMS Alumni University Concession",
    provider: "GEMS Education Partners (HWUD, Birmingham, Middlesex)",
    eligibility: "Graduates of GEMS schools in Dubai, Sharjah, Abu Dhabi",
    benefits: "15% to 25% automatic discount on Year 1 tuition",
    deadline: "Rolling / August intake",
    url: "https://www.gemseducation.com"
  },
  {
    name: "Emirates Islamic / Commercial Bank Higher Education Grant",
    provider: "UAE Banking & Corporate Philanthropy",
    eligibility: "Resident students pursuing STEM, FinTech, or AI degrees with financial need",
    benefits: "Partial tuition assistance (AED 15,000–30,000)",
    deadline: "July annually",
    url: "https://www.emiratesislamic.ae"
  }
];
"""

out_path = os.path.join(BASE_DIR, "src", "data", "universities.ts")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated {out_path} successfully!")
