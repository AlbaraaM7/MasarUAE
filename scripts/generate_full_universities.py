# -*- coding: utf-8 -*-
"""
Full Generator for 78 UAE Universities.
"""

import json

unis_list = [
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
      { "title": "Academic Merit Discount", "coverage": "AED 10,000 to AED 25,000 off Year 1", "criteria": "Top grades in Year 12 / 13" },
      { "title": "Early Bird & STEM Scholarship", "coverage": "10% to 20% discount", "criteria": "Women in STEM and early acceptances" }
    ],
    "muadalaNote": "Requires attested high school certificates and MOE Muadala approval letter.",
    "highlights": ["British Royal Charter degree", "Located in prime Dubai Knowledge Park", "Direct transfer option to Edinburgh campus"],
    "websiteUrl": "https://www.hw.ac.uk/dubai"
  },
  # 4. University of Birmingham Dubai
  {
    "id": "birmingham",
    "name": "University of Birmingham Dubai",
    "acronym": "UoB Dubai",
    "emirate": "Dubai",
    "campusLocation": "Dubai International Academic City (DIAC)",
    "type": "International Branch",
    "campusImage": "/images/birmingham/campus.jpg",
    "campusGallery": [
      "/images/birmingham/campus.jpg",
      "/images/birmingham/exterior.jpg",
      "/images/birmingham/gallery.webp"
    ],
    "annualTuitionAED": { "min": 82000, "max": 110000 },
    "acceptanceRate": "Selective (~50%)",
    "requirements": {
      "british": "AAB to AAA at A-Level",
      "ib": "32–34 points",
      "cbse": "80% to 85% in Class 12 Boards",
      "american": "3.2+ GPA with SAT 1200+",
      "ielts": "6.5 overall (minimum 6.0)",
      "emsatEnglish": "1550+"
    },
    "popularMajors": ["Artificial Intelligence", "Mechanical Engineering", "Biomedical Sciences", "Law (LLB)", "Accounting & Finance"],
    "scholarships": [
      { "title": "Provost Academic Excellence Award", "coverage": "Up to 50% tuition fee reduction", "criteria": "Outstanding predicted or final school grades" },
      { "title": "UAE National & GEMS Alumni Waiver", "coverage": "15% to 20% tuition concession", "criteria": "Partner school graduate or UAE citizen" }
    ],
    "muadalaNote": "MOE equivalency required for KHDA and UAE Ministry accreditation.",
    "highlights": ["Global Top 100 University (Russell Group)", "Pioneering smart solar-powered DIAC campus", "Dual UK/UAE recognized degrees"],
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
      "/images/khalifa/campus-night.jpg",
      "/images/khalifa/library.jpg"
    ],
    "annualTuitionAED": { "min": 40000, "max": 95000 },
    "acceptanceRate": "Highly Competitive (~25%)",
    "requirements": {
      "british": "A*AA at A-Level (Maths & Physics compulsory for Engineering)",
      "ib": "35+ points with Higher Level Math & Physics",
      "cbse": "90%+ in PCM stream",
      "american": "3.5+ GPA with AP Calculus and Physics",
      "ielts": "6.5 overall",
      "emsatEnglish": "1550+ and EmSAT Math 1250+"
    },
    "popularMajors": ["Aerospace Engineering", "Petroleum & Chemical Eng", "Nuclear Engineering", "Cybersecurity", "Medicine (MD)"],
    "scholarships": [
      { "title": "Full Presidential Scholarship", "coverage": "100% tuition + monthly living stipend", "criteria": "Tier-1 academic excellence (Emirati & Top Expat applicants)" },
      { "title": "Tier-2 Merit Grant", "coverage": "50% to 75% tuition discount", "criteria": "Excellence in STEM high school records" }
    ],
    "muadalaNote": "Mandatory UAE MOE Equivalency and EmSAT score submission.",
    "highlights": ["#1 Ranked University in UAE for Research", "Specialized advanced technology laboratories", "Direct pipeline to UAE space & energy sectors"],
    "websiteUrl": "https://www.ku.ac.ae"
  },
  # 6. University of Wollongong in Dubai
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
      "/images/uowd/campus-facade.jpg",
      "/images/uowd/studies.jpg"
    ],
    "annualTuitionAED": { "min": 58000, "max": 74000 },
    "acceptanceRate": "Moderate (~68%)",
    "requirements": {
      "british": "Minimum 2 to 3 A-Levels (grades CCD to BBC)",
      "ib": "26–28 points",
      "cbse": "65% to 70% in Class 12 Boards",
      "american": "2.5+ High School Diploma GPA",
      "ielts": "6.0 overall (minimum 5.0 in bands)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Computer Software Engineering", "Business Analytics", "Media & Communications", "Nursing", "International Business"],
    "scholarships": [
      { "title": "Academic Excellence Scholarship", "coverage": "15% to 50% tuition reduction", "criteria": "Top high school academic record" },
      { "title": "Sports & Community Leadership Award", "coverage": "Up to 25% discount", "criteria": "National or school athletic/community achievements" }
    ],
    "muadalaNote": "CAA and KHDA recognized. MOE equivalency required.",
    "highlights": ["First foreign university campus established in Dubai (1993)", "Over 40 accredited degree programs", "Australian curriculum standard"],
    "websiteUrl": "https://www.uowdubai.ac.ae"
  },
  # 7. Canadian University Dubai
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
      "/images/cud/hero.jpg",
      "/images/cud/campus-walk.webp"
    ],
    "annualTuitionAED": { "min": 65000, "max": 82000 },
    "acceptanceRate": "Accessible (~72%)",
    "requirements": {
      "british": "5 IGCSEs + minimum 2 A-Levels (grades D to C)",
      "ib": "24+ points (pass diploma)",
      "cbse": "60% aggregate in Class 12",
      "american": "2.5+ GPA High School Diploma",
      "ielts": "5.5 to 6.0 overall",
      "emsatEnglish": "1250+"
    },
    "popularMajors": ["Interior Design", "Cyber Security", "Creative Industries", "Digital Marketing", "Public Health"],
    "scholarships": [
      { "title": "Academic Achievement Scholarship", "coverage": "20% to 50% discount", "criteria": "High school average above 85%" },
      { "title": "Special Talent / Creative Scholarship", "coverage": "Up to 30%", "criteria": "Portfolio of art, innovation, or design" }
    ],
    "muadalaNote": "Fully accredited by UAE MOE and Ministry of Education.",
    "highlights": ["Downtown City Walk campus location", "Transfer pathway to Canadian partner universities", "Modern creative & tech facilities"],
    "websiteUrl": "https://www.cud.ac.ae"
  },
  # 8. UAEU
  {
    "id": "uaeu",
    "name": "United Arab Emirates University",
    "acronym": "UAEU",
    "emirate": "Al Ain",
    "campusLocation": "Al Ain, Abu Dhabi",
    "type": "Federal / Public",
    "campusImage": "/images/uaeu/campus.webp",
    "campusGallery": [
      "/images/uaeu/campus.webp",
      "/images/uaeu/gulfnews.avif",
      "/images/uaeu/web.webp"
    ],
    "annualTuitionAED": { "min": 38000, "max": 75000 },
    "acceptanceRate": "Selective (~35%)",
    "requirements": {
      "british": "Minimum BBB at A-Level with 5 IGCSEs",
      "ib": "30+ points with relevant HL subjects",
      "cbse": "80% aggregate in Class 12 Boards",
      "american": "3.0+ GPA with EmSAT scores",
      "ielts": "6.0 overall (minimum 5.5 in writing)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Medicine (MD)", "Chemical Engineering", "Artificial Intelligence", "Business Administration", "Law"],
    "scholarships": [
      { "title": "National High Achiever Sponsorship", "coverage": "100% full scholarship", "criteria": "Top UAE national and outstanding resident matriculants" },
      { "title": "Academic Excellence Grant", "coverage": "20% to 50% tuition reduction", "criteria": "High school GPA > 3.8 / 90%+" }
    ],
    "muadalaNote": "Federal university requiring full MOE High School Equivalency certificate.",
    "highlights": ["UAE's flagship national university founded in 1976", "Top 300 QS World University Ranking", "State-of-the-art research institutes in Al Ain"],
    "websiteUrl": "https://www.uaeu.ac.ae"
  },
  # 9. University of Sharjah
  {
    "id": "uos",
    "name": "University of Sharjah",
    "acronym": "UoS",
    "emirate": "Sharjah",
    "campusLocation": "University City, Sharjah",
    "type": "Private Accredited",
    "campusImage": "/images/uos/campus.jpg",
    "campusGallery": [
      "/images/uos/campus.jpg",
      "/images/uos/campus-2.jpg",
      "/images/uos/dining-hall.webp"
    ],
    "annualTuitionAED": { "min": 42000, "max": 88000 },
    "acceptanceRate": "Moderate (~55%)",
    "requirements": {
      "british": "Minimum BBC at A-Level with 5 IGCSEs",
      "ib": "28+ points in IB Diploma",
      "cbse": "75% in Class 12 Boards",
      "american": "2.8+ GPA with EmSAT score",
      "ielts": "6.0 overall",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Medicine & Surgery", "Dentistry", "Civil Engineering", "Biotechnology", "Islamic Banking"],
    "scholarships": [
      { "title": "Sharjah Excellence Scholarship", "coverage": "Up to 50% discount", "criteria": "High school score 90%+ and extracurricular leadership" },
      { "title": "Sibling & Family Grant", "coverage": "10% to 20% discount", "criteria": "Enrolled siblings" }
    ],
    "muadalaNote": "Requires MOE High School Equivalency before matriculation.",
    "highlights": ["Largest university campus in Sharjah University City", "Leading medical and health sciences complex", "Strong regional reputation in engineering and law"],
    "websiteUrl": "https://www.sharjah.ac.ae"
  },
  # 10. RIT Dubai
  {
    "id": "rit",
    "name": "Rochester Institute of Technology Dubai",
    "acronym": "RIT",
    "emirate": "Dubai",
    "campusLocation": "Dubai Silicon Oasis (DSO)",
    "type": "International Branch",
    "campusImage": "/images/rit/campus.png",
    "campusGallery": [
      "/images/rit/campus.png",
      "/images/rit/entrance.png",
      "/images/rit/library.png"
    ],
    "annualTuitionAED": { "min": 64000, "max": 76000 },
    "acceptanceRate": "Moderate (~60%)",
    "requirements": {
      "british": "Minimum 2 to 3 A-Levels (grades BCC)",
      "ib": "28+ points",
      "cbse": "70% in Class 12 Boards",
      "american": "3.0+ GPA with SAT 1100+ or EmSAT",
      "ielts": "6.0 overall (5.5 minimum bands)",
      "emsatEnglish": "1400+"
    },
    "popularMajors": ["Cybersecurity", "Mechanical Engineering", "Computing & Information Technologies", "Electrical Engineering", "Finance"],
    "scholarships": [
      { "title": "Presidential Merit Scholarship", "coverage": "Up to 45% tuition waiver", "criteria": "Outstanding high school GPA above 90%" },
      { "title": "DSO Innovation Grant", "coverage": "10% to 20% discount", "criteria": "STEM project or robotics portfolio" }
    ],
    "muadalaNote": "Fully accredited by UAE CAA and US Middle States Commission on Higher Education.",
    "highlights": ["American degree awarded by RIT New York", "Brand-new high-tech campus in Dubai Silicon Oasis", "Mandatory paid co-op internships integrated into curriculum"],
    "websiteUrl": "https://www.rit.edu/dubai"
  },
  # 11. Al Ain University
  {
    "id": "alain",
    "name": "Al Ain University",
    "acronym": "AAU",
    "emirate": "Al Ain",
    "campusLocation": "Al Ain & Abu Dhabi Campuses",
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
  # 12. Abu Dhabi University (ADU)
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
  }
]

print("12 core universities registered.")
