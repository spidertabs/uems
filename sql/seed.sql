INSERT INTO colleges (code, name, description) VALUES
-- Schools (Main Campus)
('SOAS', 'School of Agriculture Sciences', 'Agricultural sciences, agribusiness, and environmental studies.'),
('SPS', 'School of Professional Studies', 'Professional and interdisciplinary programs.'),
('SDDEL', 'School of Digital, Distance and E-Learning', 'Online, distance, and blended learning programs.'),
('SEAS', 'School of Engineering and Applied Sciences', 'Engineering and applied science programs.'),
('SOL', 'School of Law', 'Legal studies and research faculty.'),
('SOMAC', 'School of Mathematics and Computing', 'Handles Mathematics, Computing, and ICT programs.'),
('SONAS', 'School of Natural and Applied Sciences', 'Covers biology, chemistry, physics, and applied science programs.'),
('SPH', 'School of Public Health', 'Public health, epidemiology, and community health programs.'),

-- Colleges (Main Campus)
('CEM', 'College of Economics and Management', 'Business, management, and economics programs.'),
('CEODL', 'College of Education, Open and Distance Learning', 'Teacher education and open and distance learning programs.'),
('CHSS', 'College of Humanities and Social Sciences', 'Humanities, social sciences, and behavioral studies.');


-- Departments Table INSERT statements
INSERT INTO departments (college_id, code, name, description) VALUES

-- SOMAC (School of Mathematics and Computing) Departments
(1, 'CS', 'Computer Science', 'Department of Computer Science offering programs in computing and software development'),
(1, 'IT', 'Information Technology', 'Department of Information Technology offering programs in IT systems and management'),
(1, 'SE', 'Software Engineering', 'Department of Software Engineering specializing in software development methodologies'),
(1, 'MATH', 'Mathematics', 'Department of Mathematics offering pure and applied mathematics programs'),

-- SONAS (School of Natural and Applied Sciences) Departments
(2, 'ENV', 'Environmental Management', 'Department of Environmental Management and Conservation'),
(2, 'PHY', 'Physics', 'Department of Physics offering energy systems and applied physics'),
(2, 'CHEM', 'Chemistry', 'Department of Chemistry specializing in industrial and research chemistry'),
(2, 'BIO', 'Biology', 'Department of Biological Sciences including wildlife and ecology'),
(2, 'AGRIC', 'Agriculture', 'Department of Agricultural Sciences and Rural Development'),

-- SOPH (School of Public Health) Departments
(3, 'PH', 'Public Health', 'Department of Public Health offering MPH and PhD programs'),
(3, 'EPID', 'Epidemiology', 'Department of Epidemiology and Biostatistics'),
(3, 'HSM', 'Health Systems Management', 'Department of Health Systems and Policy Management'),

-- SOL (School of Law) Departments
(4, 'LAW', 'Law', 'Department of Law offering LLB and LLM programs'),
(4, 'CML', 'Commercial Law', 'Department of Commercial and Business Law'),
(4, 'IEL', 'International and Economic Law', 'Department of International and Economic Law'),
(4, 'IPL', 'Intellectual Property Law', 'Department of Intellectual Property and Innovation Law'),

-- CEM (College of Economics and Management) Departments
(5, 'ACC', 'Accounting', 'Department of Accounting and Finance'),
(5, 'BUS', 'Business Administration', 'Department of Business Administration and Management'),
(5, 'HRM', 'Human Resource Management', 'Department of Human Resource Management'),
(5, 'MKT', 'Marketing', 'Department of Marketing and Entrepreneurship'),
(5, 'ENT', 'Entrepreneurship', 'Department of Entrepreneurship and Small Business Management'),
(5, 'ECO', 'Economics', 'Department of Economics'),
(5, 'SCM', 'Supply Chain Management', 'Department of Supply Chain and Procurement Management'),

-- CEODL (Center for External and Open Distance Learning) Departments
(6, 'EDU', 'Education', 'Department of Education and Pedagogy'),
(6, 'ENG', 'English', 'Department of English Language and Literature'),
(6, 'LING', 'Linguistics', 'Department of Linguistics'),
(6, 'EDADMIN', 'Educational Administration', 'Department of Educational Management and Administration'),

-- SEAS (School of Engineering and Applied Sciences) Departments
(7, 'CIV', 'Civil Engineering', 'Department of Civil and Structural Engineering'),
(7, 'ELE', 'Electrical Engineering', 'Department of Electrical and Electronic Engineering'),
(7, 'MEC', 'Mechanical Engineering', 'Department of Mechanical Engineering'),
(7, 'TEL', 'Telecommunications Engineering', 'Department of Telecommunications and Network Engineering'),

-- CHSS (College of Humanities and Social Sciences) Departments
(8, 'SWS', 'Social Work', 'Department of Social Work and Social Administration'),
(8, 'GIC', 'Guidance and Counselling', 'Department of Guidance and Counselling'),
(8, 'PSY', 'Psychology', 'Department of Psychology'),
(8, 'DVS', 'Development Studies', 'Department of Development Studies'),
(8, 'CRP', 'Conflict Resolution and Peace', 'Department of Conflict Resolution and Peace Building'),
(8, 'MCO', 'Mass Communication', 'Department of Mass Communication and Journalism'),
(8, 'PAD', 'Public Administration', 'Department of Public Administration and Management'),
(8, 'POL', 'Political Science', 'Department of Political Science and International Relations');


-- Insert sample programmes (adjust college_id and department_id based on your setup)
INSERT INTO programmes (code, name, level, duration_years, department_id, college_id, description, is_active) VALUES

-- ============================================================
-- SOMAC - School of Mathematics and Computing Programmes
-- ============================================================
('DIT', 'Diploma in Information Technology', 'diploma', 2, 2, 1, 'Two-year diploma programme covering computer fundamentals, networking, programming, computer operations and maintenance, and information security', TRUE),
('BIT', 'Bachelor of Information Technology', 'bachelors', 3, 2, 1, 'Three-year bachelor degree covering advanced IT concepts including web design, database management, IT audit, network security, cloud computing, mobile computing, data warehousing, and cyber forensics', TRUE),
('BSE', 'Bachelor of Software Engineering', 'bachelors', 3, 3, 1, 'Bachelor degree focusing on software development principles and database management systems', TRUE),
('DCS', 'Diploma in Computer Science', 'diploma', 2, 5, 1, 'Two-year diploma covering programming fundamentals, computer architecture, networking basics, databases, software development, and information security', TRUE),
('BCS', 'Bachelor of Computer Science', 'bachelors', 3, 5, 1, 'Three-year bachelor degree covering algorithms, data structures, programming, computer architecture, operating systems, databases, artificial intelligence, software engineering, networking, and cybersecurity', TRUE),
('MCS', 'Master of Computer Science', 'masters', 2, 5, 1, 'Master programme covering advanced computing topics including machine learning, data science, distributed systems, cloud computing, and research methodology', TRUE),
('PHDCOMPSCI', 'PhD in Computer Science by Research', 'phd', 3, 5, 1, 'Doctoral research programme covering advanced computer science topics, computational theory, research ethics, and publication in top journals', TRUE),
('MSCMATH', 'Master of Science in Pure Mathematics', 'masters', 2, 4, 1, 'Master programme in pure mathematics with research methods in computing, cybersecurity, and data science analytics', TRUE),

-- ============================================================
-- SONAS - School of Natural and Applied Sciences Programmes
-- ============================================================
('DENV', 'Diploma in Environmental Management', 'diploma', 2, 1, 2, 'Two-year diploma covering environmental ethics, natural resource management, environmental sanitation, population studies, and earth physical environment', TRUE),
('BSWMC', 'Bachelor of Science in Wildlife Management and Conservation', 'bachelors', 3, 4, 2, 'Bachelor degree in wildlife management covering evolutionary biology, principles of ecology, and invertebrates', TRUE),
('BSIC', 'Bachelor of Science in Industrial Chemistry', 'bachelors', 3, 3, 2, 'Bachelor degree in industrial chemistry with focus on fluid mechanics and applied chemistry', TRUE),
('MSCENV', 'Master of Science in Environmental Management', 'masters', 2, 1, 2, 'Blended in-person with online learning master programme covering waste management, environmental economics, environmental law, water resource management, biostatistics, energy and climate change, and conservation genetics', TRUE),
('MSCPHY', 'Master of Science in Physics (Energy Systems)', 'masters', 2, 2, 2, 'Master programme in physics covering advanced classical mechanics, computational mathematics, energy resources, bio-energy technologies, solar photovoltaic technology, and research methodology', TRUE),
('MAERI', 'Master in Agricultural Extension and Rural Innovation', 'masters', 2, 5, 2, 'Master programme covering innovations for agricultural systems, agricultural extension, program development, organizational management, rural livelihood, crop production, and farming systems analysis', TRUE),
('PHDPHY', 'PhD in Physics by Research', 'phd', 3, 2, 2, 'Doctoral research programme covering philosophy of knowledge, institutional pedagogy, advanced research methodology, information access, research ethics, and advanced data analysis', TRUE),
('PHDCHEM', 'PhD in Chemistry by Research', 'phd', 3, 3, 2, 'Doctoral research programme covering philosophy of knowledge, institutional pedagogy, advanced research methodology, information access, research ethics, and advanced data analysis', TRUE),

-- ============================================================
-- SOPH - School of Public Health Programmes
-- ============================================================
('MPH', 'Master in Public Health', 'masters', 2, 1, 3, 'Blended in-person with online learning master programme covering epidemiology, biostatistics, health economics, communicable and non-communicable diseases, health education, health policy, occupational health, and public health nutrition', TRUE),
('PHDPH', 'PhD in Public Health by Research', 'phd', 3, 1, 3, 'Blended in-person with online learning doctoral programme covering philosophy of knowledge, institutional pedagogy, advanced research methodology, epidemiology and biostatistics, research ethics, and advanced data analysis', TRUE),

-- ============================================================
-- SOL - School of Law Programmes
-- ============================================================
('LLB', 'Bachelor of Law', 'bachelors', 4, 1, 4, 'Four-year bachelor of law degree covering introduction to law, contracts, constitutional law, criminal law, torts, family law, evidence, land law, business associations, international law, civil procedure, taxation, intellectual property, labour law, and specialized legal topics', TRUE),
('LLMCL', 'Master of Laws - Commercial Law', 'masters', 2, 2, 4, 'Master of laws specializing in intellectual property law, international economic law, international investment law, banking and financial law, and corporate governance law', TRUE),
('LLMGL', 'Master of Laws - General Law', 'masters', 2, 1, 4, 'Master of laws covering international refugee law, international criminal law, patents and trade secrets, public international law, Islamic banking and finance, international commercial arbitration, and legal research methods', TRUE),

-- ============================================================
-- CEM - College of Economics and Management Programmes
-- ============================================================
('BHRM', 'Bachelor of Human Resource Management', 'bachelors', 3, 3, 5, 'Bachelor degree covering principles of marketing, accounting, management, micro and macro economics, quantitative methods, human resource management, and industrial relations and labour laws', TRUE),
('BESBM', 'Bachelor of Entrepreneurship & Small Business Management', 'bachelors', 3, 5, 5, 'Bachelor degree covering electronic commerce, quantitative methods, human resource management, entrepreneurship development, and macro economics', TRUE),
('BBA', 'Bachelor of Business Administration', 'bachelors', 3, 2, 5, 'Bachelor degree covering principles of marketing, accounting, computer fundamentals, management, micro and macro economics, electronic commerce, quantitative methods, and human resource management', TRUE),
('BBAFA', 'Bachelor of Business Administration (Finance & Accounting)', 'bachelors', 3, 1, 5, 'Bachelor degree specializing in cost accounting, public sector accounting, specialized accounting, computerized accounting, insurance management, international trade, corporate finance, taxation, company law, public financial management, advanced accounting, auditing, management accounting, and business ethics', TRUE),
('BIBA', 'Bachelor of International Business Administration', 'bachelors', 3, 2, 5, 'Bachelor degree covering principles of marketing, accounting, computer fundamentals, management, and micro economics with international business focus', TRUE),
('BSPM', 'Bachelor of Supply and Procurement Management', 'bachelors', 3, 7, 5, 'Bachelor degree covering principles of marketing, accounting, computer fundamentals, management, and micro economics with supply chain and procurement specialization', TRUE),

-- ============================================================
-- CEODL - Center for External and Open Distance Learning Programmes
-- ============================================================
('PGDE', 'Postgraduate Diploma in Education', 'diploma', 1, 1, 6, 'Postgraduate diploma covering philosophy of religion, psychology of education, history of education, professional ethics, sociology of education, comparative education, entrepreneurship, educational management, instructional methods, guidance and counseling, curriculum planning, economics of education, and methodology of teaching computer', TRUE),
('PGDEMA', 'Postgraduate Diploma in Educational Management and Administration', 'diploma', 1, 4, 6, 'Postgraduate diploma covering philosophy of education, psychology of education, history of education, professional ethics, sociology of education, comparative education, policy studies, strategic HRM, theories of educational management, organizational behaviour, financial resource management, and school governance', TRUE),
('MAENG', 'Master of Arts in English', 'masters', 2, 2, 6, 'Master programme covering psychology of language, psycholinguistics, semantics-syntax interface, historical development of English, advanced phonology, and usage and abusage', TRUE),
('MALING', 'Master of Arts in Linguistics', 'masters', 2, 3, 6, 'Master programme covering psychology of language, psycholinguistics, advanced semantic role theory, historical linguistics, and advanced phonology', TRUE),
('MEDEMA', 'Master of Education in Education Management and Administration', 'masters', 2, 4, 6, 'Blended in-person with online learning master programme covering advanced management information systems, economics of education, theories of educational management, organizational behaviour, academic ethics, educational systems analysis, policy studies, planning and management of higher education, statistical research methods, curriculum planning, strategic HRM, project planning, legal aspects in education, and school mapping', TRUE),
('PHDMSEA', 'PhD in Management Sciences - Educational Administration', 'phd', 3, 4, 6, 'Blended in-person with online learning doctoral programme covering institutional pedagogy, advanced research methodology, human resource management, and theories and principles of management', TRUE),

-- ============================================================
-- SEAS - School of Engineering and Applied Sciences Programmes
-- ============================================================
('BSCIV', 'Bachelor of Science in Civil Engineering', 'bachelors', 4, 1, 7, 'Four-year bachelor degree covering engineering mathematics, research methods, geotechnical engineering, construction technology, structural analysis, engineering surveying, strength of materials, modeling and computer aided engineering, concrete technology, fluid mechanics, soil mechanics, civil engineering drawing, hydraulics, water resources, urban engineering, highway engineering, traffic engineering, structural design (concrete, steel, timber, masonry), public health engineering, measurement, building services, management, environmental engineering, irrigation, construction equipment, project management, engineering economics, environmental quality, waste treatment, estimation and valuation, engineering laws and ethics', TRUE),
('BSELE', 'Bachelor of Science in Electrical Engineering', 'bachelors', 4, 2, 7, 'Four-year bachelor degree covering circuit theory, electric machines, electronic circuits, electromagnetics, modeling and computer aided engineering, electrical instruments, network theory, engineering mathematics, engineering and society, entrepreneurship, management of organization, power plant engineering, high voltage engineering, safety engineering, power quality management, energy conservation, energy harvesting and storage, and energy and climate change', TRUE),

-- ============================================================
-- CHSS - College of Humanities and Social Sciences Programmes
-- ============================================================
('DGC', 'Diploma in Guidance and Counselling', 'diploma', 2, 2, 8, 'Two-year diploma covering stress management, conflict resolution, abnormal psychology, and trauma and crisis counseling', TRUE),
('DMC', 'Diploma in Mass Communication', 'diploma', 2, 6, 8, 'Two-year diploma covering theories of mass communication, photo journalism, public relations, online journalism, communication and development, and research methods', TRUE),
('PGDDS', 'Postgraduate Diploma in Development Studies', 'diploma', 1, 4, 8, 'Postgraduate diploma covering introduction to development studies, development economics, governance and development, human rights and development, state and the economy, NGO administration, case studies of development, international security, environment and development, sociology of development, and research methodology', TRUE),
('BGC', 'Bachelor of Guidance and Counselling', 'bachelors', 3, 2, 8, 'Bachelor degree covering introduction to guidance and counseling, counseling theories, introduction to psychology and behavioral sciences, childhood disorders, behaviour modification and therapy, human growth and development, counseling skills, group and family counseling, human sexuality and marital counseling, psychometric assessment, psychology of adult learning, ethical and professional issues, adolescence psychology, drug and substance abuse, and career counseling', TRUE),
('BSWCD', 'Bachelor of Social Work and Community Development', 'bachelors', 3, 1, 8, 'Bachelor degree (upgrading programme) covering development economics, human services in the development world, sustainable development, ethics and accountability in public sector, migration and refugee studies, and social psychology', TRUE),
('MACRP', 'Master of Arts in Conflict Resolution and Peace Building', 'masters', 2, 5, 8, 'Master programme covering war and conflict in the Great Lakes, environmental management, international and regional human rights law, and environment management sustainability and development', TRUE),
('PHDMSPM', 'PhD in Management Sciences - Public Management', 'phd', 3, 7, 8, 'Doctoral programme in management sciences focusing on doctoral research seminar and public management research', TRUE);



-- ============================================================
-- Users: COMMON PASSWORD HASH (bcrypt)
-- ============================================================
SET @HASH := '$2b$12$p7vxZWNxKttUQLyf7xxirOBHWVH2wOrMYDehizyWUpP4SATMquMY.';
INSERT INTO users (email, password_hash, first_name, last_name, role, department_id, college_id, phone ) VALUES

-- ADMIN USERS
('admin@uems.ac.ug', @HASH, 'System', 'Admin', 'admin', NULL, NULL, '0700000000'),

-- EXAM MASTERS
('exammaster@uems.ac.ug', @HASH, 'Peter', 'Lutalo', 'exam_master', NULL, NULL, '0705555555'),
('exam.assistant@uems.ac.ug', @HASH, 'Ruth', 'Nakimuli', 'exam_master', NULL, NULL, '0705555556'),
('exam.it@uems.ac.ug', @HASH, 'Daniel', 'Kyambadde', 'exam_master', NULL, NULL, '0705555557'),
('exam.sciences@uems.ac.ug', @HASH, 'Catherine', 'Nabatanzi', 'exam_master', NULL, NULL, '0705555558'),
('exam.law@uems.ac.ug', @HASH, 'Henry', 'Wasswa', 'exam_master', NULL, NULL, '0705555559'),

-- DEANS (COLLEGES / SCHOOLS)
('dean.somac@uems.ac.ug', @HASH, 'John', 'Katumba', 'dean', NULL, 1, '0701111111'),
('dean.sonas@uems.ac.ug', @HASH, 'Sarah', 'Nanyonga', 'dean', NULL, 2, '0702222222'),
('dean.sph@uems.ac.ug', @HASH, 'Michael', 'Okello', 'dean', NULL, 3, '0703333333'),
('dean.sol@uems.ac.ug', @HASH, 'Elizabeth', 'Namubiru', 'dean', NULL, 4, '0703333334'),
('dean.cem@uems.ac.ug', @HASH, 'Alice', 'Kakuru', 'dean', NULL, 5, '0704444444'),
('dean.ceodl@uems.ac.ug', @HASH, 'Simon', 'Mwebaze', 'dean', NULL, 6, '0704444445'),
('dean.seas@uems.ac.ug', @HASH, 'Christopher', 'Tugume', 'dean', NULL, 7, '0704444446'),
('dean.chss@uems.ac.ug', @HASH, 'Margaret', 'Kwagala', 'dean', NULL, 8, '0704444447'),
('dean.research@uems.ac.ug', @HASH, 'Paul', 'Mukasa', 'dean', NULL, NULL, '0704444448'),
('dean.students@uems.ac.ug', @HASH, 'Jane', 'Nakibuka', 'dean', NULL, NULL, '0704444449'),

-- ============================================================
-- HEADS OF DEPARTMENT (HODs) - All Departments Covered
-- ============================================================

-- SOMAC HODs
('hod.cs@uems.ac.ug', @HASH, 'Derrick', 'Mugisha', 'hod', 1, 1, '0706000001'),
('hod.it@uems.ac.ug', @HASH, 'Brenda', 'Kansiime', 'hod', 2, 1, '0706000002'),
('hod.se@uems.ac.ug', @HASH, 'Ronald', 'Kato', 'hod', 3, 1, '0706000003'),
('hod.math@uems.ac.ug', @HASH, 'Caroline', 'Nabirye', 'hod', 4, 1, '0706000004'),

-- SONAS HODs
('hod.env@uems.ac.ug', @HASH, 'Francis', 'Opolot', 'hod', 5, 2, '0706000005'),
('hod.phy@uems.ac.ug', @HASH, 'Rogers', 'Wamala', 'hod', 6, 2, '0706000006'),
('hod.chem@uems.ac.ug', @HASH, 'Isaac', 'Baluku', 'hod', 7, 2, '0706000007'),
('hod.bio@uems.ac.ug', @HASH, 'Lydia', 'Namara', 'hod', 8, 2, '0706000008'),
('hod.agric@uems.ac.ug', @HASH, 'Joseph', 'Mugerwa', 'hod', 9, 2, '0706000009'),

-- SOPH HODs
('hod.ph@uems.ac.ug', @HASH, 'David', 'Tumusiime', 'hod', 10, 3, '0706000010'),
('hod.epid@uems.ac.ug', @HASH, 'Grace', 'Nakato', 'hod', 11, 3, '0706000011'),
('hod.hsm@uems.ac.ug', @HASH, 'Andrew', 'Kisembo', 'hod', 12, 3, '0706000012'),

-- SOL HODs
('hod.law@uems.ac.ug', @HASH, 'Julius', 'Businge', 'hod', 13, 4, '0706000013'),
('hod.cml@uems.ac.ug', @HASH, 'Monica', 'Kyomugisha', 'hod', 14, 4, '0706000014'),
('hod.iel@uems.ac.ug', @HASH, 'Patrick', 'Mugisha', 'hod', 15, 4, '0706000015'),
('hod.ipl@uems.ac.ug', @HASH, 'Susan', 'Namutebi', 'hod', 16, 4, '0706000016'),

-- CEM HODs
('hod.acc@uems.ac.ug', @HASH, 'Thomas', 'Wasswa', 'hod', 17, 5, '0706000017'),
('hod.bus@uems.ac.ug', @HASH, 'Joyce', 'Nalubega', 'hod', 18, 5, '0706000018'),
('hod.hrm@uems.ac.ug', @HASH, 'Richard', 'Kigozi', 'hod', 19, 5, '0706000019'),
('hod.mkt@uems.ac.ug', @HASH, 'Esther', 'Nabatanzi', 'hod', 20, 5, '0706000020'),
('hod.ent@uems.ac.ug', @HASH, 'Peter', 'Muwanga', 'hod', 21, 5, '0706000021'),
('hod.eco@uems.ac.ug', @HASH, 'Samuel', 'Kyeyune', 'hod', 22, 5, '0706000022'),
('hod.scm@uems.ac.ug', @HASH, 'Rebecca', 'Nakafeero', 'hod', 23, 5, '0706000023'),

-- CEODL HODs
('hod.edu@uems.ac.ug', @HASH, 'Matthew', 'Kigozi', 'hod', 24, 6, '0706000024'),
('hod.eng@uems.ac.ug', @HASH, 'Dorothy', 'Nansubuga', 'hod', 25, 6, '0706000025'),
('hod.ling@uems.ac.ug', @HASH, 'Stephen', 'Ssematimba', 'hod', 26, 6, '0706000026'),
('hod.edadmin@uems.ac.ug', @HASH, 'Janet', 'Namukasa', 'hod', 27, 6, '0706000027'),

-- SEAS HODs
('hod.civ@uems.ac.ug', @HASH, 'Francis', 'Okello', 'hod', 28, 7, '0706000028'),
('hod.ele@uems.ac.ug', @HASH, 'James', 'Kato', 'hod', 29, 7, '0706000029'),
('hod.mec@uems.ac.ug', @HASH, 'Sarah', 'Tendo', 'hod', 30, 7, '0706000030'),
('hod.tel@uems.ac.ug', @HASH, 'Robert', 'Mugambwa', 'hod', 31, 7, '0706000031'),

-- CHSS HODs
('hod.sws@uems.ac.ug', @HASH, 'Peter', 'Namugera', 'hod', 32, 8, '0706000032'),
('hod.gic@uems.ac.ug', @HASH, 'Rose', 'Nalule', 'hod', 33, 8, '0706000033'),
('hod.psy@uems.ac.ug', @HASH, 'Martin', 'Ssali', 'hod', 34, 8, '0706000034'),
('hod.dvs@uems.ac.ug', @HASH, 'Mary', 'Kemigisha', 'hod', 35, 8, '0706000035'),
('hod.crp@uems.ac.ug', @HASH, 'Alex', 'Mugisha', 'hod', 36, 8, '0706000036'),
('hod.mco@uems.ac.ug', @HASH, 'Patricia', 'Nabukenya', 'hod', 37, 8, '0706000037'),
('hod.pad@uems.ac.ug', @HASH, 'George', 'Kisitu', 'hod', 38, 8, '0706000038'),
('hod.pol@uems.ac.ug', @HASH, 'Lydia', 'Nansikombi', 'hod', 39, 8, '0706000039'),

-- ============================================================
-- LECTURERS - Multiple lecturers per department
-- ============================================================

-- Linguistics Department (3 lecturers)
('lect.ling1@uems.ac.ug', @HASH, 'Stephen', 'Ssematimba', 'lecturer', 26, 6, '0707000102'),
('lect.ling2@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 26, 6, '0707000103'),
('lect.ling3@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 26, 6, '0707000104'),

-- Computer Science Department (5 lecturers)
('lect.cs1@uems.ac.ug', @HASH, 'Paul', 'Mutebi', 'lecturer', 1, 1, '0707000001'),
('lect.cs2@uems.ac.ug', @HASH, 'Sarah', 'Nakibuuka', 'lecturer', 1, 1, '0707000002'),
('lect.cs3@uems.ac.ug', @HASH, 'Robert', 'Kakembo', 'lecturer', 1, 1, '0707000003'),
('lect.cs4@uems.ac.ug', @HASH, 'Grace', 'Nabukeera', 'lecturer', 1, 1, '0707000004'),
('lect.cs5@uems.ac.ug', @HASH, 'David', 'Ssempijja', 'lecturer', 1, 1, '0707000005'),

-- Information Technology Department (5 lecturers)
('lect.it1@uems.ac.ug', @HASH, 'Moses', 'Nabende', 'lecturer', 2, 1, '0707000006'),
('lect.it2@uems.ac.ug', @HASH, 'Esther', 'Namuli', 'lecturer', 2, 1, '0707000007'),
('lect.it3@uems.ac.ug', @HASH, 'Henry', 'Kato', 'lecturer', 2, 1, '0707000008'),
('lect.it4@uems.ac.ug', @HASH, 'Joyce', 'Nalwadda', 'lecturer', 2, 1, '0707000009'),
('lect.it5@uems.ac.ug', @HASH, 'Richard', 'Mugisha', 'lecturer', 2, 1, '0707000010'),

-- Software Engineering Department (5 lecturers)
('lect.se1@uems.ac.ug', @HASH, 'Daniel', 'Okumu', 'lecturer', 3, 1, '0707000011'),
('lect.se2@uems.ac.ug', @HASH, 'Catherine', 'Nabatanzi', 'lecturer', 3, 1, '0707000012'),
('lect.se3@uems.ac.ug', @HASH, 'Peter', 'Lwanga', 'lecturer', 3, 1, '0707000013'),
('lect.se4@uems.ac.ug', @HASH, 'Sarah', 'Nabukeera', 'lecturer', 3, 1, '0707000014'),
('lect.se5@uems.ac.ug', @HASH, 'Thomas', 'Ssali', 'lecturer', 3, 1, '0707000015'),

-- Mathematics Department (5 lecturers)
('lect.math1@uems.ac.ug', @HASH, 'Robert', 'Wandera', 'lecturer', 4, 1, '0707000016'),
('lect.math2@uems.ac.ug', @HASH, 'Alice', 'Nakintu', 'lecturer', 4, 1, '0707000017'),
('lect.math3@uems.ac.ug', @HASH, 'John', 'Kisakye', 'lecturer', 4, 1, '0707000018'),
('lect.math4@uems.ac.ug', @HASH, 'Grace', 'Namugga', 'lecturer', 4, 1, '0707000019'),
('lect.math5@uems.ac.ug', @HASH, 'David', 'Mugerwa', 'lecturer', 4, 1, '0707000020'),

-- Environmental Management Department (4 lecturers)
('lect.env1@uems.ac.ug', @HASH, 'Catherine', 'Nalwoga', 'lecturer', 5, 2, '0707000021'),
('lect.env2@uems.ac.ug', @HASH, 'James', 'Otim', 'lecturer', 5, 2, '0707000022'),
('lect.env3@uems.ac.ug', @HASH, 'Ruth', 'Nabukenya', 'lecturer', 5, 2, '0707000023'),
('lect.env4@uems.ac.ug', @HASH, 'Paul', 'Okello', 'lecturer', 5, 2, '0707000024'),

-- Physics Department (4 lecturers)
('lect.phy1@uems.ac.ug', @HASH, 'Samuel', 'Okello', 'lecturer', 6, 2, '0707000025'),
('lect.phy2@uems.ac.ug', @HASH, 'Mary', 'Achan', 'lecturer', 6, 2, '0707000026'),
('lect.phy3@uems.ac.ug', @HASH, 'Joseph', 'Ocaya', 'lecturer', 6, 2, '0707000027'),
('lect.phy4@uems.ac.ug', @HASH, 'Grace', 'Atim', 'lecturer', 6, 2, '0707000028'),

-- Chemistry Department (4 lecturers)
('lect.chem1@uems.ac.ug', @HASH, 'Isaac', 'Okurut', 'lecturer', 7, 2, '0707000029'),
('lect.chem2@uems.ac.ug', @HASH, 'Susan', 'Kemigisha', 'lecturer', 7, 2, '0707000030'),
('lect.chem3@uems.ac.ug', @HASH, 'Patrick', 'Odongo', 'lecturer', 7, 2, '0707000031'),
('lect.chem4@uems.ac.ug', @HASH, 'Rebecca', 'Nanyonjo', 'lecturer', 7, 2, '0707000032'),

-- Biology Department (4 lecturers)
('lect.bio1@uems.ac.ug', @HASH, 'Lydia', 'Nabukenya', 'lecturer', 8, 2, '0707000033'),
('lect.bio2@uems.ac.ug', @HASH, 'Charles', 'Mugisha', 'lecturer', 8, 2, '0707000034'),
('lect.bio3@uems.ac.ug', @HASH, 'Sarah', 'Namayanja', 'lecturer', 8, 2, '0707000035'),
('lect.bio4@uems.ac.ug', @HASH, 'Peter', 'Okot', 'lecturer', 8, 2, '0707000036'),

-- Agriculture Department (4 lecturers)
('lect.agric1@uems.ac.ug', @HASH, 'Joseph', 'Wandera', 'lecturer', 9, 2, '0707000037'),
('lect.agric2@uems.ac.ug', @HASH, 'Esther', 'Namuli', 'lecturer', 9, 2, '0707000038'),
('lect.agric3@uems.ac.ug', @HASH, 'Robert', 'Ocen', 'lecturer', 9, 2, '0707000039'),
('lect.agric4@uems.ac.ug', @HASH, 'Grace', 'Auma', 'lecturer', 9, 2, '0707000040'),

-- Public Health Department (4 lecturers)
('lect.ph1@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 10, 3, '0707000041'),
('lect.ph2@uems.ac.ug', @HASH, 'Sarah', 'Nabirye', 'lecturer', 10, 3, '0707000042'),
('lect.ph3@uems.ac.ug', @HASH, 'James', 'Okello', 'lecturer', 10, 3, '0707000043'),
('lect.ph4@uems.ac.ug', @HASH, 'Mary', 'Nakafeero', 'lecturer', 10, 3, '0707000044'),

-- Epidemiology Department (3 lecturers)
('lect.epid1@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 11, 3, '0707000045'),
('lect.epid2@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 11, 3, '0707000046'),
('lect.epid3@uems.ac.ug', @HASH, 'John', 'Otim', 'lecturer', 11, 3, '0707000047'),

-- Health Systems Management Department (3 lecturers)
('lect.hsm1@uems.ac.ug', @HASH, 'Sarah', 'Nabatanzi', 'lecturer', 12, 3, '0707000048'),
('lect.hsm2@uems.ac.ug', @HASH, 'David', 'Kisitu', 'lecturer', 12, 3, '0707000049'),
('lect.hsm3@uems.ac.ug', @HASH, 'Esther', 'Nalwoga', 'lecturer', 12, 3, '0707000050'),

-- Law Department (5 lecturers)
('lect.law1@uems.ac.ug', @HASH, 'Robert', 'Turyasingura', 'lecturer', 13, 4, '0707000051'),
('lect.law2@uems.ac.ug', @HASH, 'Grace', 'Nabukeera', 'lecturer', 13, 4, '0707000052'),
('lect.law3@uems.ac.ug', @HASH, 'James', 'Mugisha', 'lecturer', 13, 4, '0707000053'),
('lect.law4@uems.ac.ug', @HASH, 'Sarah', 'Namukasa', 'lecturer', 13, 4, '0707000054'),
('lect.law5@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 13, 4, '0707000055'),

-- Commercial Law Department (3 lecturers)
('lect.cml1@uems.ac.ug', @HASH, 'Monica', 'Kyomugisha', 'lecturer', 14, 4, '0707000056'),
('lect.cml2@uems.ac.ug', @HASH, 'Peter', 'Wasswa', 'lecturer', 14, 4, '0707000057'),
('lect.cml3@uems.ac.ug', @HASH, 'Ruth', 'Nabatanzi', 'lecturer', 14, 4, '0707000058'),

-- International and Economic Law Department (3 lecturers)
('lect.iel1@uems.ac.ug', @HASH, 'Patrick', 'Mugisha', 'lecturer', 15, 4, '0707000059'),
('lect.iel2@uems.ac.ug', @HASH, 'Sarah', 'Nabukeera', 'lecturer', 15, 4, '0707000060'),
('lect.iel3@uems.ac.ug', @HASH, 'David', 'Kisitu', 'lecturer', 15, 4, '0707000061'),

-- Intellectual Property Law Department (3 lecturers)
('lect.ipl1@uems.ac.ug', @HASH, 'Susan', 'Namutebi', 'lecturer', 16, 4, '0707000062'),
('lect.ipl2@uems.ac.ug', @HASH, 'Robert', 'Mugerwa', 'lecturer', 16, 4, '0707000063'),
('lect.ipl3@uems.ac.ug', @HASH, 'Grace', 'Nalwoga', 'lecturer', 16, 4, '0707000064'),

-- Accounting Department (5 lecturers)
('lect.acc1@uems.ac.ug', @HASH, 'Geoffrey', 'Nsubuga', 'lecturer', 17, 5, '0707000065'),
('lect.acc2@uems.ac.ug', @HASH, 'Sarah', 'Nabukenya', 'lecturer', 17, 5, '0707000066'),
('lect.acc3@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 17, 5, '0707000067'),
('lect.acc4@uems.ac.ug', @HASH, 'Grace', 'Namuli', 'lecturer', 17, 5, '0707000068'),
('lect.acc5@uems.ac.ug', @HASH, 'Robert', 'Kigozi', 'lecturer', 17, 5, '0707000069'),

-- Business Administration Department (5 lecturers)
('lect.bus1@uems.ac.ug', @HASH, 'Joyce', 'Nalubega', 'lecturer', 18, 5, '0707000070'),
('lect.bus2@uems.ac.ug', @HASH, 'Peter', 'Mugisha', 'lecturer', 18, 5, '0707000071'),
('lect.bus3@uems.ac.ug', @HASH, 'Sarah', 'Nabatanzi', 'lecturer', 18, 5, '0707000072'),
('lect.bus4@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 18, 5, '0707000073'),
('lect.bus5@uems.ac.ug', @HASH, 'Grace', 'Nalwadda', 'lecturer', 18, 5, '0707000074'),

-- Human Resource Management Department (4 lecturers)
('lect.hrm1@uems.ac.ug', @HASH, 'Richard', 'Kigozi', 'lecturer', 19, 5, '0707000075'),
('lect.hrm2@uems.ac.ug', @HASH, 'Sarah', 'Nabukeera', 'lecturer', 19, 5, '0707000076'),
('lect.hrm3@uems.ac.ug', @HASH, 'David', 'Mugisha', 'lecturer', 19, 5, '0707000077'),
('lect.hrm4@uems.ac.ug', @HASH, 'Grace', 'Namukasa', 'lecturer', 19, 5, '0707000078'),

-- Marketing Department (4 lecturers)
('lect.mkt1@uems.ac.ug', @HASH, 'Esther', 'Nabatanzi', 'lecturer', 20, 5, '0707000079'),
('lect.mkt2@uems.ac.ug', @HASH, 'Peter', 'Wasswa', 'lecturer', 20, 5, '0707000080'),
('lect.mkt3@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 20, 5, '0707000081'),
('lect.mkt4@uems.ac.ug', @HASH, 'David', 'Kisitu', 'lecturer', 20, 5, '0707000082'),

-- Entrepreneurship Department (3 lecturers)
('lect.ent1@uems.ac.ug', @HASH, 'Peter', 'Muwanga', 'lecturer', 21, 5, '0707000083'),
('lect.ent2@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 21, 5, '0707000084'),
('lect.ent3@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 21, 5, '0707000085'),

-- Economics Department (4 lecturers)
('lect.eco1@uems.ac.ug', @HASH, 'Samuel', 'Kyeyune', 'lecturer', 22, 5, '0707000086'),
('lect.eco2@uems.ac.ug', @HASH, 'Sarah', 'Namuli', 'lecturer', 22, 5, '0707000087'),
('lect.eco3@uems.ac.ug', @HASH, 'David', 'Okello', 'lecturer', 22, 5, '0707000088'),
('lect.eco4@uems.ac.ug', @HASH, 'Grace', 'Nabatanzi', 'lecturer', 22, 5, '0707000089'),

-- Supply Chain Management Department (3 lecturers)
('lect.scm1@uems.ac.ug', @HASH, 'Rebecca', 'Nakafeero', 'lecturer', 23, 5, '0707000090'),
('lect.scm2@uems.ac.ug', @HASH, 'Peter', 'Mugisha', 'lecturer', 23, 5, '0707000091'),
('lect.scm3@uems.ac.ug', @HASH, 'Sarah', 'Nabukenya', 'lecturer', 23, 5, '0707000092'),

-- Education Department (5 lecturers)
('lect.edu1@uems.ac.ug', @HASH, 'Matthew', 'Kigozi', 'lecturer', 24, 6, '0707000093'),
('lect.edu2@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 24, 6, '0707000094'),
('lect.edu3@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 24, 6, '0707000095'),
('lect.edu4@uems.ac.ug', @HASH, 'Grace', 'Namukasa', 'lecturer', 24, 6, '0707000096'),
('lect.edu5@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 24, 6, '0707000097'),

-- English Department (4 lecturers)
('lect.eng1@uems.ac.ug', @HASH, 'Dorothy', 'Nansubuga', 'lecturer', 25, 6, '0707000098'),
('lect.eng2@uems.ac.ug', @HASH, 'Peter', 'Mugisha', 'lecturer', 25, 6, '0707000099'),
('lect.eng3@uems.ac.ug', @HASH, 'Sarah', 'Nabatanzi', 'lecturer', 25, 6, '0707000100'),
('lect.eng4@uems.ac.ug', @HASH, 'David', 'Kisitu', 'lecturer', 25, 6, '0707000101'),


-- Educational Administration Department (3 lecturers)
('lect.edadmin1@uems.ac.ug', @HASH, 'Janet', 'Namukasa', 'lecturer', 27, 6, '0707000105'),
('lect.edadmin2@uems.ac.ug', @HASH, 'Peter', 'Wasswa', 'lecturer', 27, 6, '0707000106'),
('lect.edadmin3@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 27, 6, '0707000107'),

-- Civil Engineering Department (5 lecturers)
('lect.civ1@uems.ac.ug', @HASH, 'Francis', 'Okello', 'lecturer', 28, 7, '0707000108'),
('lect.civ2@uems.ac.ug', @HASH, 'Sarah', 'Nabukenya', 'lecturer', 28, 7, '0707000109'),
('lect.civ3@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 28, 7, '0707000110'),
('lect.civ4@uems.ac.ug', @HASH, 'Grace', 'Namuli', 'lecturer', 28, 7, '0707000111'),
('lect.civ5@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 28, 7, '0707000112'),

-- Electrical Engineering Department (5 lecturers)
('lect.ele1@uems.ac.ug', @HASH, 'James', 'Kato', 'lecturer', 29, 7, '0707000113'),
('lect.ele2@uems.ac.ug', @HASH, 'Sarah', 'Nabatanzi', 'lecturer', 29, 7, '0707000114'),
('lect.ele3@uems.ac.ug', @HASH, 'David', 'Mugisha', 'lecturer', 29, 7, '0707000115'),
('lect.ele4@uems.ac.ug', @HASH, 'Grace', 'Nalwoga', 'lecturer', 29, 7, '0707000116'),
('lect.ele5@uems.ac.ug', @HASH, 'Robert', 'Wasswa', 'lecturer', 29, 7, '0707000117'),

-- Mechanical Engineering Department (4 lecturers)
('lect.mec1@uems.ac.ug', @HASH, 'Sarah', 'Tendo', 'lecturer', 30, 7, '0707000118'),
('lect.mec2@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 30, 7, '0707000119'),
('lect.mec3@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 30, 7, '0707000120'),
('lect.mec4@uems.ac.ug', @HASH, 'Robert', 'Mugisha', 'lecturer', 30, 7, '0707000121'),

-- Telecommunications Engineering Department (4 lecturers)
('lect.tel1@uems.ac.ug', @HASH, 'Robert', 'Mugambwa', 'lecturer', 31, 7, '0707000122'),
('lect.tel2@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 31, 7, '0707000123'),
('lect.tel3@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 31, 7, '0707000124'),
('lect.tel4@uems.ac.ug', @HASH, 'Grace', 'Namukasa', 'lecturer', 31, 7, '0707000125'),

-- Social Work Department (4 lecturers)
('lect.sws1@uems.ac.ug', @HASH, 'Peter', 'Namugera', 'lecturer', 32, 8, '0707000126'),
('lect.sws2@uems.ac.ug', @HASH, 'Sarah', 'Nabukenya', 'lecturer', 32, 8, '0707000127'),
('lect.sws3@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 32, 8, '0707000128'),
('lect.sws4@uems.ac.ug', @HASH, 'Grace', 'Namuli', 'lecturer', 32, 8, '0707000129'),

-- Guidance and Counselling Department (4 lecturers)
('lect.gic1@uems.ac.ug', @HASH, 'Rose', 'Nalule', 'lecturer', 33, 8, '0707000130'),
('lect.gic2@uems.ac.ug', @HASH, 'Peter', 'Mugisha', 'lecturer', 33, 8, '0707000131'),
('lect.gic3@uems.ac.ug', @HASH, 'Sarah', 'Nabatanzi', 'lecturer', 33, 8, '0707000132'),
('lect.gic4@uems.ac.ug', @HASH, 'David', 'Kisitu', 'lecturer', 33, 8, '0707000133'),

-- Psychology Department (4 lecturers)
('lect.psy1@uems.ac.ug', @HASH, 'Martin', 'Ssali', 'lecturer', 34, 8, '0707000134'),
('lect.psy2@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 34, 8, '0707000135'),
('lect.psy3@uems.ac.ug', @HASH, 'David', 'Mugisha', 'lecturer', 34, 8, '0707000136'),
('lect.psy4@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 34, 8, '0707000137'),

-- Development Studies Department (3 lecturers)
('lect.dvs1@uems.ac.ug', @HASH, 'Mary', 'Kemigisha', 'lecturer', 35, 8, '0707000138'),
('lect.dvs2@uems.ac.ug', @HASH, 'Peter', 'Wasswa', 'lecturer', 35, 8, '0707000139'),
('lect.dvs3@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 35, 8, '0707000140'),

-- Conflict Resolution and Peace Department (3 lecturers)
('lect.crp1@uems.ac.ug', @HASH, 'Alex', 'Mugisha', 'lecturer', 36, 8, '0707000141'),
('lect.crp2@uems.ac.ug', @HASH, 'Grace', 'Nabukenya', 'lecturer', 36, 8, '0707000142'),
('lect.crp3@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 36, 8, '0707000143'),

-- Mass Communication Department (4 lecturers)
('lect.mco1@uems.ac.ug', @HASH, 'Patricia', 'Nabukenya', 'lecturer', 37, 8, '0707000144'),
('lect.mco2@uems.ac.ug', @HASH, 'Peter', 'Mugisha', 'lecturer', 37, 8, '0707000145'),
('lect.mco3@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 37, 8, '0707000146'),
('lect.mco4@uems.ac.ug', @HASH, 'David', 'Wasswa', 'lecturer', 37, 8, '0707000147'),

-- Public Administration Department (4 lecturers)
('lect.pad1@uems.ac.ug', @HASH, 'George', 'Kisitu', 'lecturer', 38, 8, '0707000148'),
('lect.pad2@uems.ac.ug', @HASH, 'Sarah', 'Nabukenya', 'lecturer', 38, 8, '0707000149'),
('lect.pad3@uems.ac.ug', @HASH, 'David', 'Mugisha', 'lecturer', 38, 8, '0707000150'),
('lect.pad4@uems.ac.ug', @HASH, 'Grace', 'Namuli', 'lecturer', 38, 8, '0707000151'),

-- Political Science Department (4 lecturers)
('lect.pol1@uems.ac.ug', @HASH, 'Lydia', 'Nansikombi', 'lecturer', 39, 8, '0707000152'),
('lect.pol2@uems.ac.ug', @HASH, 'Peter', 'Wasswa', 'lecturer', 39, 8, '0707000153'),
('lect.pol3@uems.ac.ug', @HASH, 'David', 'Kato', 'lecturer', 39, 8, '0707000154'),
('lect.pol4@uems.ac.ug', @HASH, 'Sarah', 'Nalwoga', 'lecturer', 39, 8, '0707000155');

-- ============================================================================
-- DIPLOMA IN INFORMATION TECHNOLOGY COURSES
-- ============================================================================

-- Year 1, Semester 1
INSERT INTO courses (code, title, level, semester, credit_units, college_id, department_id, hod_id, description, is_active) VALUES
('UCC1101', 'English Language Skills', 1, 1, 3, NULL, NULL, NULL, 'Core university course focusing on developing English language proficiency and communication skills', TRUE),
('UCC1102', 'Introduction to Computer Fundamentals', 1, 1, 3, NULL, NULL, NULL, 'Introduction to basic computer concepts, hardware, software, and operating systems', TRUE),
('ITE1101', 'Introduction to Information Technology', 1, 1, 3, NULL, NULL, NULL, 'Overview of IT concepts, applications, and role in modern society', TRUE),
('COS1202', 'Computer Applications', 1, 1, 3, NULL, NULL, NULL, 'Practical training in office productivity software and computer applications', TRUE),
('ITE1102', 'Mathematical Techniques for IS-IT', 1, 1, 3, NULL, NULL, NULL, 'Mathematical foundations for information systems and information technology', TRUE),
('ITE1103', 'Introduction to Programming Logic', 1, 1, 3, NULL, NULL, NULL, 'Fundamental concepts of algorithmic thinking, flowcharts, and structured programming principles', TRUE),
-- Year 1, Semester 2
('ITE1201', 'Internet Technologies & Web-Page Authoring (Website Design)', 1, 2, 3, NULL, NULL, NULL, 'Introduction to internet technologies, HTML, CSS, and web design principles', TRUE),
('DIT1202', 'Computer Operations and Maintenance', 1, 2, 3, NULL, NULL, NULL, 'Computer hardware operations, troubleshooting, and maintenance procedures', TRUE),
('COS1203', 'Network Fundamentals', 1, 2, 3, NULL, NULL, NULL, 'Introduction to computer networking concepts and protocols', TRUE),
('DIT1201', 'Fundamentals of Networking', 1, 2, 3, NULL, NULL, NULL, 'Alternative code - Basic networking principles and technologies', TRUE),
('UCC1201', 'Communication Skills', 1, 2, 3, NULL, NULL, NULL, 'Development of effective written and oral communication skills', TRUE),
('DCS1102', 'Programming Fundamentals', 1, 2, 3, NULL, NULL, NULL, 'Introduction to programming concepts and problem-solving techniques', TRUE),
('COS1204', 'Structured Programming', 1, 2, 3, NULL, NULL, NULL, 'Alternative code - Structured programming methodologies and techniques', TRUE),
-- Year 2, Semester 2
('ENT2201', 'Entrepreneurship Development II', 2, 2, 3, NULL, NULL, NULL, 'Advanced entrepreneurship concepts, business planning, and venture management', TRUE),
('DIT2202', 'Information Security Fundamentals', 2, 2, 3, NULL, NULL, NULL, 'Basic concepts of information security, threats, and protection mechanisms', TRUE),
('DCS2201', 'Computer Networks and Systems Administration', 2, 2, 3, NULL, NULL, NULL, 'Network administration, configuration, and systems management', TRUE),
('COS2102', 'Systems Analysis and Design', 2, 2, 3, NULL, NULL, NULL, 'Methods and techniques for analyzing and designing information systems', TRUE),

-- ============================================================================
-- BACHELOR OF INFORMATION TECHNOLOGY COURSES
-- ============================================================================

-- Year 1, Semester 1 (some shared with Diploma)
('IFS1101', 'Fundamentals of Information Technology', 1, 1, 3, NULL, NULL, NULL, 'Comprehensive introduction to IT principles and applications', TRUE),
('HRM1101', 'Principles and Practices of Management', 1, 1, 3, NULL, NULL, NULL, 'Introduction to management theory and organizational behavior', TRUE),

-- Year 1, Semester 2
('STA1207', 'Introduction to Probability and Statistics', 1, 2, 3, NULL, NULL, NULL, 'Statistical concepts, probability theory, and data analysis', TRUE),
('ITE1202', 'Electronic Commerce', 1, 2, 3, NULL, NULL, NULL, 'E-commerce technologies, business models, and online transactions', TRUE),
('COS1201', 'Fundamentals of Programming', 1, 2, 3, NULL, NULL, NULL, 'Core programming concepts and algorithm development', TRUE),
('ITE2201', 'Web Site Design, Programming and Administration', 1, 2, 3, NULL, NULL, NULL, 'Web development and administration', TRUE),

-- Year 2, Semester 2
('ITE2203', 'Graphics and Multimedia Applications', 2, 2, 3, NULL, NULL, NULL, 'Digital graphics, multimedia design, and production tools', TRUE),
('COS2208', 'Software Engineering', 2, 2, 3, NULL, NULL, NULL, 'Software development lifecycle, methodologies, and best practices', TRUE),
('ITE2205', 'Systems Dynamics and Simulation', 2, 2, 3, NULL, NULL, NULL, 'Modeling and simulation of complex systems', TRUE),
('ITE3105', 'Data Warehousing', 2, 2, 3, NULL, NULL, NULL, 'Data warehouse concepts, design, and implementation', TRUE),
('CEN2202', 'Computer Networks and Data Communications', 2, 2, 3, NULL, NULL, NULL, 'Advanced networking and data communication technologies', TRUE),
('COS3104', 'Emerging Trends in Computer Science', 2, 2, 3, NULL, NULL, NULL, 'Current and emerging technologies in computer science', TRUE),
('ITE2202', 'Emerging Trends in Information Technology', 2, 2, 3, NULL, NULL, NULL, 'Alternative code - Latest IT trends and innovations', TRUE),
('COS3103', 'Operating Systems', 2, 2, 3, NULL, NULL, NULL, 'Operating system concepts, design, and implementation', TRUE),

-- Year 3, Semester 1
('ITE3106', 'Network and Information Security', 3, 1, 3, NULL, NULL, NULL, 'Advanced security concepts, cryptography, and network protection', TRUE),
('CEN3101', 'Network Administration and Configuration', 3, 1, 3, NULL, NULL, NULL, 'Advanced network management and configuration techniques', TRUE),
('ITE3101', 'IT Audit', 3, 1, 3, NULL, NULL, NULL, 'IT auditing principles, standards, and methodologies', TRUE),
('ITE3103', 'Web Design, Programming, and Administration', 3, 1, 3, NULL, NULL, NULL, 'Advanced web development and website management', TRUE),
('ITE3102', 'IT Planning and Management', 3, 1, 3, NULL, NULL, NULL, 'Strategic IT planning and project management', TRUE),
('ITE3107', 'Enterprise Data Management', 3, 1, 3, NULL, NULL, NULL, 'Enterprise-level data management and governance', TRUE),

-- Year 3, Semester 2
('ITE3202', 'Computer and Cyber Forensics', 3, 2, 3, NULL, NULL, NULL, 'Digital forensics, investigation techniques, and cybercrime', TRUE),
('IFS3201', 'Social Issues in Computing', 3, 2, 3, NULL, NULL, NULL, 'Ethical, social, and professional issues in computing', TRUE),
('ITE2204', 'Social & Professional Issues in Computing', 3, 2, 3, NULL, NULL, NULL, 'Alternative code - Ethics and professional responsibility', TRUE),
('COS3201', 'Cloud Computing Principles', 3, 2, 3, NULL, NULL, NULL, 'Cloud computing architectures, services, and deployment models', TRUE),
('ITE3203', 'Principles of Mobile Computing', 3, 2, 3, NULL, NULL, NULL, 'Mobile computing technologies and application development', TRUE),
('COS3204', 'Mobile Application Development', 3, 2, 3, NULL, NULL, NULL, 'Alternative code - Mobile app development platforms and tools', TRUE),
('ITE3207', 'Database Management Systems', 3, 2, 3, NULL, NULL, NULL, 'Database design, SQL, and database administration', TRUE),
('ITE3201', 'Database Management Systems', 3, 2, 3, NULL, NULL, NULL, 'Alternative code - Database concepts and implementation', TRUE),

-- ============================================================================
-- BACHELOR OF SOFTWARE ENGINEERING COURSES
-- ============================================================================

('CSE1203', 'Principles of Software Development', 1, 2, 3, NULL, NULL, NULL, 'Software development principles, methodologies, and practices', TRUE),

-- ============================================================================
-- MASTER OF SCIENCE IN PURE MATHEMATICS COURSES
-- ============================================================================

('MCS7102', 'Research Methods in Computing', 1, 1, 3, NULL, NULL, NULL, 'Research methodologies for computing and IT disciplines', TRUE),
('MCY7102', 'Research Methods for Cybersecurity', 1, 1, 3, NULL, NULL, NULL, 'Research approaches specific to cybersecurity', TRUE),
('MDS7111', 'Research Methods for Data Science and Analytics', 1, 1, 3, NULL, NULL, NULL, 'Research methodologies in data science', TRUE),

-- ============================================================================
-- PhD PROGRAMMES - COMMON COURSES
-- ============================================================================

-- PhD Common Year 1, Semester 1
('UCC9105', 'Information Access and Computer Applications in Research', 1, 1, 3, NULL, NULL, NULL, 'Advanced research tools and information retrieval', TRUE),
('UCC9101', 'Philosophy of Knowledge', 1, 1, 3, NULL, NULL, NULL, 'Epistemology and philosophy of science', TRUE),
('UCC9104', 'Institutional Pedagogy', 1, 1, 3, NULL, NULL, NULL, 'Teaching methodologies for higher education', TRUE),
('UCC9103', 'Advanced Research Methodology', 1, 1, 3, NULL, NULL, NULL, 'Advanced quantitative and qualitative research methods', TRUE),

-- PhD Common Year 1, Semester 2
('UCC9102', 'Scholarly Writing and Publication Skills', 1, 2, 3, NULL, NULL, NULL, 'Academic writing and publication strategies', TRUE),
('CDC9121', 'Research Ethics', 1, 2, 3, NULL, NULL, NULL, 'Ethical principles in research conduct', TRUE),
('CDC9123', 'Advanced Data Analysis', 1, 2, 3, NULL, NULL, NULL, 'Advanced statistical and data analysis techniques', TRUE),

-- ============================================================================
-- MASTER OF PUBLIC HEALTH COURSES
-- ============================================================================

-- Year 1, Semester 1
('MPH414', 'Health Economics & Finance', 1, 1, 3, NULL, NULL, NULL, 'Economic principles in health systems and financing', TRUE),
('MPH412', 'Epidemiology', 1, 1, 3, NULL, NULL, NULL, 'Disease distribution and determinants in populations', TRUE),
('MPH415', 'Communicable & Non Communicable Diseases', 1, 1, 3, NULL, NULL, NULL, 'Prevention and control of diseases', TRUE),
('MPH411', 'Fundamentals of Public Health', 1, 1, 3, NULL, NULL, NULL, 'Core public health concepts and principles', TRUE),
('MPH413', 'Biostatistics', 1, 1, 3, NULL, NULL, NULL, 'Statistical methods in public health research', TRUE),
('MPH416', 'Health Education & Promotion', 1, 1, 3, NULL, NULL, NULL, 'Health behavior change and promotion strategies', TRUE),

-- Year 1, Semester 2
('MPH421', 'Health Policy and Management', 1, 2, 3, NULL, NULL, NULL, 'Health policy development and management', TRUE),
('MPH423', 'Health Communication and Informatics', 1, 2, 3, NULL, NULL, NULL, 'Communication strategies in public health', TRUE),
('MPH425', 'Community Home Based Care', 1, 2, 3, NULL, NULL, NULL, 'Community-based health interventions', TRUE),
('MPH422', 'Occupational Health and Safety', 1, 2, 3, NULL, NULL, NULL, 'Workplace health and safety management', TRUE),
('MPH424', 'Biostatistics II & Computing', 1, 2, 3, NULL, NULL, NULL, 'Advanced biostatistics and computational methods', TRUE),
('UCC8101', 'Research Methodology', 1, 2, 3, NULL, NULL, NULL, 'Masters level research methods', TRUE),

-- Year 2, Semester 1
('MPH515', 'Public Health Ethics and Law', 2, 1, 3, NULL, NULL, NULL, 'Ethical and legal issues in public health', TRUE),
('MPH511', 'Environmental Health', 2, 1, 3, NULL, NULL, NULL, 'Environmental factors affecting population health', TRUE),
('MPH513', 'Demography of Population Health', 2, 1, 3, NULL, NULL, NULL, 'Population dynamics and health indicators', TRUE),
('MPH512', 'Public Health Nutrition', 2, 1, 3, NULL, NULL, NULL, 'Nutrition principles and interventions', TRUE),
('MPH514', 'Disaster Management', 2, 1, 3, NULL, NULL, NULL, 'Emergency preparedness and disaster response', TRUE),

-- PhD in Public Health
('BME9201', 'Epidemiology and Biostatistics', 1, 2, 3, NULL, NULL, NULL, 'Advanced epidemiological and statistical methods', TRUE),

-- ============================================================================
-- MASTER OF SCIENCE IN ENVIRONMENTAL MANAGEMENT COURSES
-- ============================================================================

('ENV7208', 'Waste Management', 1, 2, 3, NULL, NULL, NULL, 'Solid waste management systems and technologies', TRUE),
('ENV7203', 'Environmental Economics', 1, 2, 3, NULL, NULL, NULL, 'Economic analysis of environmental issues', TRUE),
('ENV7201', 'Environmental Law and Ethics', 1, 2, 3, NULL, NULL, NULL, 'Environmental legislation and ethical frameworks', TRUE),
('ENV7206', 'Integrated Water Resource Management', 1, 2, 3, NULL, NULL, NULL, 'Sustainable water resource management', TRUE),
('CBW7104', 'Biostatistics', 1, 2, 3, NULL, NULL, NULL, 'Statistical methods in biological sciences', TRUE),
('ENV7205', 'Energy Environment and Climate Change', 1, 2, 3, NULL, NULL, NULL, 'Climate change impacts and energy systems', TRUE),
('ENV7207', 'Evolutionary and Conservation Genetics', 1, 2, 3, NULL, NULL, NULL, 'Genetic principles in conservation', TRUE),

-- ============================================================================
-- MASTER OF SCIENCE IN PHYSICS (ENERGY SYSTEMS) COURSES
-- ============================================================================

('PHY7109', 'Advanced Classical Mechanics and Special Relativity', 1, 1, 3, NULL, NULL, NULL, 'Advanced mechanics and relativistic physics', TRUE),
('AMP7106', 'Computational Mathematics and Programming', 1, 1, 3, NULL, NULL, NULL, 'Mathematical computing and programming', TRUE),
('RET7116', 'Energy Resources and Conservation Techniques', 1, 1, 3, NULL, NULL, NULL, 'Energy resources and efficiency', TRUE),
('RET7114', 'Bio-energy Technologies', 1, 1, 3, NULL, NULL, NULL, 'Biomass and bioenergy systems', TRUE),
('RET7115', 'Solar Photo-voltaic Technology', 1, 1, 3, NULL, NULL, NULL, 'Solar PV systems and applications', TRUE),
('PHY7101', 'Methods of Mathematical Physics', 1, 1, 3, NULL, NULL, NULL, 'Mathematical techniques in physics', TRUE),
('UCC8201', 'Scholarly Writing and Publication Skills', 1, 1, 3, NULL, NULL, NULL, 'Masters level academic writing', TRUE),

-- ============================================================================
-- MASTER IN AGRICULTURAL EXTENSION AND RURAL INNOVATION COURSES
-- ============================================================================

('MAR7103', 'Innovations for Resilient Agricultural Systems', 1, 1, 3, NULL, NULL, NULL, 'Agricultural innovation and resilience', TRUE),
('MAR7101', 'Agricultural Extension and Innovation Systems', 1, 1, 3, NULL, NULL, NULL, 'Extension services and innovation diffusion', TRUE),
('MAR7104', 'Program Development and Evaluation', 1, 1, 3, NULL, NULL, NULL, 'Agricultural program planning and assessment', TRUE),
('MAR7102', 'Administration and Management of Agricultural Organizations', 1, 1, 3, NULL, NULL, NULL, 'Management of agricultural enterprises', TRUE),
('MAR7108', 'Rural Livelihood and Food Systems', 1, 1, 3, NULL, NULL, NULL, 'Rural development and food security', TRUE),
('MAR7107', 'Crop Production Systems', 1, 1, 3, NULL, NULL, NULL, 'Crop management and production', TRUE),
('MAR7105', 'Farming Systems and Livelihood Analysis', 1, 1, 3, NULL, NULL, NULL, 'Analysis of farming systems', TRUE),

-- ============================================================================
-- BACHELOR OF SCIENCE IN WILDLIFE MANAGEMENT COURSES
-- ============================================================================

('BWM1103', 'Evolutionary Biology', 1, 1, 3, NULL, NULL, NULL, 'Evolution and natural selection principles', TRUE),
('ENV1102', 'Principles of Ecology', 1, 1, 3, NULL, NULL, NULL, 'Ecological concepts and ecosystem dynamics', TRUE),
('BIO1102', 'Invertebrates', 1, 1, 3, NULL, NULL, NULL, 'Study of invertebrate animals', TRUE),

-- ============================================================================
-- BACHELOR OF SCIENCE IN INDUSTRIAL CHEMISTRY COURSES
-- ============================================================================

('MEC2109', 'Fluid Mechanics', 2, 1, 3, NULL, NULL, NULL, 'Fluid properties and flow dynamics', TRUE),

-- ============================================================================
-- DIPLOMA IN ENVIRONMENTAL MANAGEMENT COURSES
-- ============================================================================

('ENV1203', 'Environmental Ethics', 1, 2, 3, NULL, NULL, NULL, 'Ethical approaches to environmental issues', TRUE),
('ENV1201', 'Principles of Natural Resource Management', 1, 2, 3, NULL, NULL, NULL, 'Natural resource conservation and management', TRUE),
('ENV1101', 'Environment & Society', 1, 2, 3, NULL, NULL, NULL, 'Environmental sociology and human-environment interactions', TRUE),
('ENV1202', 'Environmental Sanitation & Community Health', 1, 2, 3, NULL, NULL, NULL, 'Sanitation systems and community health', TRUE),
('ENV1206', 'Population & Environment', 1, 2, 3, NULL, NULL, NULL, 'Population dynamics and environmental impacts', TRUE),
('ENV1207', 'Earth Physical Environment', 1, 2, 3, NULL, NULL, NULL, 'Geophysical processes and earth systems', TRUE),

-- ============================================================================
-- BACHELOR OF LAW (LLB) COURSES
-- ============================================================================

-- Year 1, Semester 1
('LLB1104', 'Law of Contracts I', 1, 1, 3, NULL, NULL, NULL, 'Introduction to contract law principles', TRUE),
('LLB1105', 'Principles of Constitutional Law I', 1, 1, 3, NULL, NULL, NULL, 'Constitutional law fundamentals', TRUE),
('LLB1101', 'Introducing Law', 1, 1, 3, NULL, NULL, NULL, 'Introduction to legal systems and concepts', TRUE),
('LLB1102', 'Law and Development', 1, 1, 3, NULL, NULL, NULL, 'Legal frameworks for development', TRUE),
('LLB1103', 'Fundamentals of Criminal Law', 1, 1, 3, NULL, NULL, NULL, 'Introduction to criminal law', TRUE),

-- Year 1, Semester 2
('LLB1205', 'Principles of Constitutional Law II', 1, 2, 3, NULL, NULL, NULL, 'Advanced constitutional law', TRUE),
('LLB1202', 'Administrative Law', 1, 2, 3, NULL, NULL, NULL, 'Principles of administrative law', TRUE),
('LLB1204', 'Law of Contracts II', 1, 2, 3, NULL, NULL, NULL, 'Advanced contract law', TRUE),
('LLB1203', 'Criminal Liability', 1, 2, 3, NULL, NULL, NULL, 'Criminal responsibility and defenses', TRUE),
('LLB1201', 'Legal Methods', 1, 2, 3, NULL, NULL, NULL, 'Legal research and reasoning', TRUE),

-- Year 2, Semester 1
('LLB2103', 'Family Law I', 2, 1, 3, NULL, NULL, NULL, 'Marriage, divorce, and family relations', TRUE),
('LLB2104', 'Law of Evidence I', 2, 1, 3, NULL, NULL, NULL, 'Rules of evidence and procedure', TRUE),
('LLB2101', 'Nature and History of Torts', 2, 1, 3, NULL, NULL, NULL, 'Tort law principles and development', TRUE),
('LLB2102', 'Equity and Trusts', 2, 1, 3, NULL, NULL, NULL, 'Equitable principles and trust law', TRUE),
('LLB2105', 'Foundations of Land Law', 2, 1, 3, NULL, NULL, NULL, 'Property and land law basics', TRUE),

-- Year 2, Semester 2
('LLB2201', 'Negligence, Strict Liability and Procedure in Torts', 2, 2, 3, NULL, NULL, NULL, 'Advanced tort law', TRUE),
('UCC2101', 'Research Methods', 2, 2, 3, NULL, NULL, NULL, 'Legal research methodology', TRUE),
('LLB2204', 'Law of Evidence II', 2, 2, 3, NULL, NULL, NULL, 'Advanced evidence law', TRUE),
('LLB2203', 'Family Law II', 2, 2, 3, NULL, NULL, NULL, 'Advanced family law', TRUE),
('LLB2205', 'Land Transactions', 2, 2, 3, NULL, NULL, NULL, 'Property transactions and conveyancing', TRUE),

-- Year 3, Semester 1
('LLB3105', 'Banking and Negotiable Instruments', 3, 1, 3, NULL, NULL, NULL, 'Banking law and negotiable instruments', TRUE),
('LLB3104', 'Principles of International Law I', 3, 1, 3, NULL, NULL, NULL, 'Public international law', TRUE),
('LLB3102', 'Law of Sale of Goods', 3, 1, 3, NULL, NULL, NULL, 'Commercial law - sale of goods', TRUE),
('LLB3103', 'Business Associations I', 3, 1, 3, NULL, NULL, NULL, 'Company law and business organizations', TRUE),
('LLB3106', 'Human Rights In Domestic Perspective', 3, 1, 3, NULL, NULL, NULL, 'Human rights in national context', TRUE),
('LLB3101', 'Jurisprudence I', 3, 1, 3, NULL, NULL, NULL, 'Legal philosophy and theory', TRUE),

-- Year 3, Semester 2
('LLB3202', 'Criminal Procedure', 3, 2, 3, NULL, NULL, NULL, 'Criminal trial procedure', TRUE),
('LLB3201', 'Jurisprudence II', 3, 2, 3, NULL, NULL, NULL, 'Advanced legal theory', TRUE),
('LLB3206', 'Environmental Law and Policy', 3, 2, 3, NULL, NULL, NULL, 'Environmental legislation and regulation', TRUE),
('LLB3204', 'Principles of International Law II', 3, 2, 3, NULL, NULL, NULL, 'Advanced international law', TRUE),
('LLB3203', 'Business Association II', 3, 2, 3, NULL, NULL, NULL, 'Advanced company law', TRUE),
('LLB3205', 'Consumer Law and Practice', 3, 2, 3, NULL, NULL, NULL, 'Consumer protection law', TRUE),
('LLB3208', 'Commercial Law (Hire Purchase and Agency)', 3, 2, 3, NULL, NULL, NULL, 'Hire purchase and agency law', TRUE),

-- Year 4, Semester 1
('LLB4101', 'Civil Procedure I', 4, 1, 3, NULL, NULL, NULL, 'Civil litigation procedure', TRUE),
('LLB4106', 'Intellectual Property Law I', 4, 1, 3, NULL, NULL, NULL, 'IP rights and protection', TRUE),
('LLB4109', 'Insurance Law', 4, 1, 3, NULL, NULL, NULL, 'Insurance contracts and regulation', TRUE),
('LLB4104', 'International Trade and Business', 4, 1, 3, NULL, NULL, NULL, 'International commercial law', TRUE),
('LLB4107', 'Labour Law I', 4, 1, 3, NULL, NULL, NULL, 'Employment law and relations', TRUE),
('LLB4108', 'Clinical Legal Education', 4, 1, 3, NULL, NULL, NULL, 'Practical legal skills and ethics', TRUE),
('LLB4103', 'International and Regional Human Rights', 4, 1, 3, NULL, NULL, NULL, 'International human rights law', TRUE),
('LLB4102', 'Revenue Law and Taxation I', 4, 1, 3, NULL, NULL, NULL, 'Tax law and administration', TRUE),

-- Year 4, Semester 2
('LLB4208', 'Insolvency Law', 4, 2, 3, NULL, NULL, NULL, 'Bankruptcy and insolvency', TRUE),
('LLB4202', 'Revenue Law and Taxation II', 4, 2, 3, NULL, NULL, NULL, 'Advanced taxation law', TRUE),
('LLB4201', 'Civil Procedure II', 4, 2, 3, NULL, NULL, NULL, 'Advanced civil procedure', TRUE),
('LLB4206', 'Intellectual Property Law II', 4, 2, 3, NULL, NULL, NULL, 'Advanced IP law', TRUE),
('LLB4207', 'Labour Law II', 4, 2, 3, NULL, NULL, NULL, 'Advanced labour law', TRUE),
('LLB4205', 'Criminology and Penology', 4, 2, 3, NULL, NULL, NULL, 'Criminal justice and corrections', TRUE),
('LLB4203', 'International Humanitarian Law', 4, 2, 3, NULL, NULL, NULL, 'Law of armed conflict', TRUE),
('LLB4204', 'Gender and The Law', 4, 2, 3, NULL, NULL, NULL, 'Gender issues in legal context', TRUE),
('LLB4210', 'Alternative Dispute Resolution', 4, 2, 3, NULL, NULL, NULL, 'Mediation, arbitration, and ADR', TRUE),

-- ============================================================================
-- MASTER OF LAWS COURSES
-- ============================================================================

-- LLM Commercial Law
('IPL7108', 'Intellectual Property Law (Core)', 1, 1, 3, NULL, NULL, NULL, 'Advanced IP law for LLM', TRUE),
('IET7101', 'International Economic Law (Core)', 1, 1, 3, NULL, NULL, NULL, 'International economic legal frameworks', TRUE),
('IET7102', 'International Investment Law', 1, 1, 3, NULL, NULL, NULL, 'Foreign investment law', TRUE),
('IET7104', 'Banking and Financial Law (Elective)', 1, 1, 3, NULL, NULL, NULL, 'Banking regulation and finance law', TRUE),
('LCL7107', 'Corporate Governance Law', 1, 1, 3, NULL, NULL, NULL, 'Corporate governance principles', TRUE),

-- LLM General Law
('PIL7204', 'International Refugee Law', 1, 2, 3, NULL, NULL, NULL, 'Refugee protection and asylum law', TRUE),
('CLC7207', 'International Criminal Law', 1, 2, 3, NULL, NULL, NULL, 'International criminal tribunals', TRUE),
('IPL7206', 'Patents and Trade Secrets Law', 1, 2, 3, NULL, NULL, NULL, 'Patent law and trade secrets', TRUE),
('LMG7205', 'Legal Research Methods', 1, 2, 3, NULL, NULL, NULL, 'Advanced legal research', TRUE),
('PIL7207', 'Public International Law II', 1, 2, 3, NULL, NULL, NULL, 'Advanced PIL topics', TRUE),
('BFL7208', 'Islamic Banking and Finance', 1, 2, 3, NULL, NULL, NULL, 'Sharia-compliant banking', TRUE),
('IE7207', 'International Commercial Arbitration', 1, 2, 3, NULL, NULL, NULL, 'Arbitration in commercial disputes', TRUE),
('UCC8102', 'Computer Application in Research', 1, 2, 3, NULL, NULL, NULL, 'Research computing tools', TRUE),

-- ============================================================================
-- BUSINESS AND MANAGEMENT COURSES
-- ============================================================================

-- Common Business Courses
('MKM1101', 'Principles of Marketing', 1, 1, 3, NULL, NULL, NULL, 'Marketing fundamentals and strategies', TRUE),
('ACC1101', 'Fundamentals of Accounting', 1, 1, 3, NULL, NULL, NULL, 'Introduction to financial accounting', TRUE),
('ECO1101', 'Introduction to Micro Economics', 1, 1, 3, NULL, NULL, NULL, 'Microeconomic principles', TRUE),
('STA1201', 'Quantitative Methods', 1, 2, 3, NULL, NULL, NULL, 'Business statistics and quantitative analysis', TRUE),
('HRM1201', 'Principles of Human Resource Management', 1, 2, 3, NULL, NULL, NULL, 'HR management fundamentals', TRUE),
('ECO1201', 'Introduction to Macro Economics', 1, 2, 3, NULL, NULL, NULL, 'Macroeconomic principles', TRUE),

-- HRM Specific
('HRM1202', 'Industrial Relations and Labour Laws', 1, 2, 3, NULL, NULL, NULL, 'Employment relations and law', TRUE),

-- Accounting & Finance (BBA-FA)
('ACC2203', 'Cost Accounting', 2, 2, 3, NULL, NULL, NULL, 'Cost analysis and management accounting', TRUE),
('ACC2202', 'Public Sector Accounting', 2, 2, 3, NULL, NULL, NULL, 'Government accounting systems', TRUE),
('ACC2204', 'Specialized Accounting', 2, 2, 3, NULL, NULL, NULL, 'Industry-specific accounting', TRUE),
('BUS2203', 'Principles and Practice of Insurance Management', 2, 2, 3, NULL, NULL, NULL, 'Insurance industry management', TRUE),
('ECO2203', 'International Trade Theory', 2, 2, 3, NULL, NULL, NULL, 'International economics', TRUE),
('ACC2201', 'Computerised Accounting', 2, 2, 3, NULL, NULL, NULL, 'Accounting software applications', TRUE),
('ACC3102', 'Corporate Finance', 3, 1, 3, NULL, NULL, NULL, 'Corporate financial management', TRUE),
('ACC3101', 'Taxation and Accounting', 3, 1, 3, NULL, NULL, NULL, 'Tax accounting and compliance', TRUE),
('PAD2102', 'Public Financial Management', 3, 1, 3, NULL, NULL, NULL, 'Government financial systems', TRUE),
('ACC3103', 'Advanced Accounting', 3, 1, 3, NULL, NULL, NULL, 'Complex accounting topics', TRUE),
('HRM3101', 'Strategic Management and Business Policy', 3, 1, 3, NULL, NULL, NULL, 'Strategic planning and execution', TRUE),
('PAD3202', 'Project Planning and Management', 3, 2, 3, NULL, NULL, NULL, 'Project management methodologies', TRUE),
('ACC3204', 'Management Accounting', 3, 2, 3, NULL, NULL, NULL, 'Managerial decision-making', TRUE),
('ACC3201', 'Auditing Practice and Investigation', 3, 2, 3, NULL, NULL, NULL, 'Audit procedures and forensics', TRUE),
('ACC3203', 'Contemporary Issues In Financial Accounting', 3, 2, 3, NULL, NULL, NULL, 'Current accounting standards', TRUE),
('BUS3202', 'Business Ethics', 3, 2, 3, NULL, NULL, NULL, 'Corporate social responsibility', TRUE),

-- ============================================================================
-- SCHOOL OF ENGINEERING AND APPLIED SCIENCES (SEAS) COURSES
-- ============================================================================

-- Bachelor of Science in Civil Engineering
-- Year 2, Semester 1
('CVE2101', 'Engineering Surveying I', 2, 1, 3, NULL, NULL, NULL, 'Land surveying techniques and instruments', TRUE),
('CVE2102', 'Strength of Materials I', 2, 1, 3, NULL, NULL, NULL, 'Mechanics of materials and stress analysis', TRUE),
('CVE2103', 'Fluid Mechanics I', 2, 1, 3, NULL, NULL, NULL, 'Fluid properties and dynamics', TRUE),
('CVE2104', 'Engineering Drawing and CAD', 2, 1, 3, NULL, NULL, NULL, 'Technical drawing and computer-aided design', TRUE),

-- Year 2, Semester 2
('CVE2201', 'Engineering Surveying II', 2, 2, 3, NULL, NULL, NULL, 'Advanced surveying and GPS', TRUE),
('CVE2202', 'Strength of Materials II', 2, 2, 3, NULL, NULL, NULL, 'Advanced material mechanics', TRUE),
('CVE2203', 'Fluid Mechanics II', 2, 2, 3, NULL, NULL, NULL, 'Advanced fluid dynamics', TRUE),
('CVE2204', 'Structural Analysis I', 2, 2, 3, NULL, NULL, NULL, 'Analysis of structures', TRUE),

-- Year 3, Semester 1
('CVE3101', 'Structural Analysis II', 3, 1, 3, NULL, NULL, NULL, 'Advanced structural analysis', TRUE),
('CVE3102', 'Geotechnical Engineering I', 3, 1, 3, NULL, NULL, NULL, 'Soil mechanics and foundation engineering', TRUE),
('CVE3103', 'Hydraulics and Hydrology', 3, 1, 3, NULL, NULL, NULL, 'Water resources engineering', TRUE),
('CVE3104', 'Construction Technology and Management', 3, 1, 3, NULL, NULL, NULL, 'Construction methods and project management', TRUE),

-- Year 3, Semester 2
('CVE3201', 'Structural Design I', 3, 2, 3, NULL, NULL, NULL, 'Design of structural elements', TRUE),
('CVE3202', 'Geotechnical Engineering II', 3, 2, 3, NULL, NULL, NULL, 'Advanced foundation design', TRUE),
('CVE3203', 'Transportation Engineering I', 3, 2, 3, NULL, NULL, NULL, 'Highway and traffic engineering', TRUE),
('CVE3204', 'Environmental Engineering', 3, 2, 3, NULL, NULL, NULL, 'Water and wastewater treatment', TRUE),

-- Year 4, Semester 1
('CVE4101', 'Structural Design II', 4, 1, 3, NULL, NULL, NULL, 'Advanced structural design', TRUE),
('CVE4102', 'Transportation Engineering II', 4, 1, 3, NULL, NULL, NULL, 'Advanced transportation systems', TRUE),
('CVE4103', 'Water Resources Engineering', 4, 1, 3, NULL, NULL, NULL, 'Irrigation and water supply systems', TRUE),
('CVE4104', 'Engineering Economics and Project Management', 4, 1, 3, NULL, NULL, NULL, 'Economic analysis of engineering projects', TRUE),

-- Year 4, Semester 2
('CVE4201', 'Design Project', 4, 2, 6, NULL, NULL, NULL, 'Final year civil engineering design project', TRUE),
('CVE4202', 'Professional Practice and Ethics', 4, 2, 3, NULL, NULL, NULL, 'Engineering ethics and professional conduct', TRUE),

-- Bachelor of Science in Electrical Engineering
-- Year 2, Semester 1
('ELE2101', 'Circuit Analysis I', 2, 1, 3, NULL, NULL, NULL, 'DC and AC circuit analysis', TRUE),
('ELE2102', 'Electronics I', 2, 1, 3, NULL, NULL, NULL, 'Semiconductor devices and circuits', TRUE),
('ELE2103', 'Electrical Measurements', 2, 1, 3, NULL, NULL, NULL, 'Measurement instruments and techniques', TRUE),
('ELE2104', 'Engineering Mathematics III', 2, 1, 3, NULL, NULL, NULL, 'Advanced mathematics for electrical engineering', TRUE),

-- Year 2, Semester 2
('ELE2201', 'Circuit Analysis II', 2, 2, 3, NULL, NULL, NULL, 'Advanced circuit theory', TRUE),
('ELE2202', 'Electronics II', 2, 2, 3, NULL, NULL, NULL, 'Amplifiers and oscillators', TRUE),
('ELE2203', 'Electrical Machines I', 2, 2, 3, NULL, NULL, NULL, 'DC machines and transformers', TRUE),
('ELE2204', 'Electromagnetic Fields', 2, 2, 3, NULL, NULL, NULL, 'Electromagnetic theory', TRUE),

-- Year 3, Semester 1
('ELE3101', 'Electrical Machines II', 3, 1, 3, NULL, NULL, NULL, 'AC machines and special machines', TRUE),
('ELE3102', 'Power Systems I', 3, 1, 3, NULL, NULL, NULL, 'Power generation and transmission', TRUE),
('ELE3103', 'Control Systems I', 3, 1, 3, NULL, NULL, NULL, 'Control theory and applications', TRUE),
('ELE3104', 'Digital Electronics', 3, 1, 3, NULL, NULL, NULL, 'Digital logic and circuits', TRUE),

-- Year 3, Semester 2
('ELE3201', 'Power Systems II', 3, 2, 3, NULL, NULL, NULL, 'Power distribution and protection', TRUE),
('ELE3202', 'Control Systems II', 3, 2, 3, NULL, NULL, NULL, 'Advanced control systems', TRUE),
('ELE3203', 'Microprocessors and Microcontrollers', 3, 2, 3, NULL, NULL, NULL, 'Embedded systems programming', TRUE),
('ELE3204', 'Communication Systems', 3, 2, 3, NULL, NULL, NULL, 'Analog and digital communication', TRUE),

-- Year 4, Semester 1
('ELE4101', 'Power Electronics', 4, 1, 3, NULL, NULL, NULL, 'Power conversion and drives', TRUE),
('ELE4102', 'Electrical Installation Design', 4, 1, 3, NULL, NULL, NULL, 'Electrical system design', TRUE),
('ELE4103', 'Renewable Energy Systems', 4, 1, 3, NULL, NULL, NULL, 'Solar, wind, and alternative energy', TRUE),
('ELE4104', 'Project I', 4, 1, 3, NULL, NULL, NULL, 'Electrical engineering project phase 1', TRUE),

-- Year 4, Semester 2
('ELE4201', 'High Voltage Engineering', 4, 2, 3, NULL, NULL, NULL, 'High voltage systems and insulation', TRUE),
('ELE4202', 'Industrial Automation', 4, 2, 3, NULL, NULL, NULL, 'PLC and SCADA systems', TRUE),
('ELE4203', 'Project II', 4, 2, 6, NULL, NULL, NULL, 'Electrical engineering final project', TRUE),
('ELE4204', 'Engineering Management', 4, 2, 3, NULL, NULL, NULL, 'Engineering project and operations management', TRUE),

-- ============================================================================
-- CEODL (CENTER FOR EXTERNAL AND OPEN DISTANCE LEARNING) COURSES
-- ============================================================================

-- Postgraduate Diploma in Education
-- Year 1, Semester 1
('PDE1101', 'Foundations of Education', 1, 1, 3, NULL, NULL, NULL, 'Educational philosophy and theory', TRUE),
('PDE1102', 'Educational Psychology', 1, 1, 3, NULL, NULL, NULL, 'Learning theories and development', TRUE),
('PDE1103', 'Curriculum Development', 1, 1, 3, NULL, NULL, NULL, 'Curriculum design and implementation', TRUE),
('PDE1104', 'Methods of Teaching', 1, 1, 3, NULL, NULL, NULL, 'Pedagogical methods and strategies', TRUE),

-- Year 1, Semester 2
('PDE1201', 'Educational Assessment and Evaluation', 1, 2, 3, NULL, NULL, NULL, 'Assessment techniques and evaluation', TRUE),
('PDE1202', 'Educational Technology', 1, 2, 3, NULL, NULL, NULL, 'Technology integration in teaching', TRUE),
('PDE1203', 'Classroom Management', 1, 2, 3, NULL, NULL, NULL, 'Behavior management and discipline', TRUE),
('PDE1204', 'Teaching Practice', 1, 2, 6, NULL, NULL, NULL, 'Supervised teaching experience', TRUE),

-- Postgraduate Diploma in Educational Management and Administration
-- Year 1, Semester 1
('PDEMA1101', 'Principles of Educational Management', 1, 1, 3, NULL, NULL, NULL, 'Educational management concepts', TRUE),
('PDEMA1102', 'Educational Leadership', 1, 1, 3, NULL, NULL, NULL, 'Leadership in educational institutions', TRUE),
('PDEMA1103', 'Human Resource Management in Education', 1, 1, 3, NULL, NULL, NULL, 'HR practices in schools', TRUE),
('PDEMA1104', 'Educational Planning and Policy', 1, 1, 3, NULL, NULL, NULL, 'Policy development and planning', TRUE),

-- Year 1, Semester 2
('PDEMA1201', 'Financial Management in Education', 1, 2, 3, NULL, NULL, NULL, 'School finance and budgeting', TRUE),
('PDEMA1202', 'School-Community Relations', 1, 2, 3, NULL, NULL, NULL, 'Stakeholder engagement', TRUE),
('PDEMA1203', 'Educational Law and Ethics', 1, 2, 3, NULL, NULL, NULL, 'Legal and ethical issues in education', TRUE),
('PDEMA1204', 'Research in Educational Management', 1, 2, 3, NULL, NULL, NULL, 'Research methods in education', TRUE),

-- Master of Education in Education Management and Administration
-- Year 1, Semester 1
('MEMA1101', 'Advanced Educational Management', 1, 1, 3, NULL, NULL, NULL, 'Advanced management theories', TRUE),
('MEMA1102', 'Strategic Planning in Education', 1, 1, 3, NULL, NULL, NULL, 'Strategic management for schools', TRUE),
('MEMA1103', 'Organizational Behavior in Education', 1, 1, 3, NULL, NULL, NULL, 'Organizational dynamics', TRUE),
('MEMA1104', 'Research Methodology in Education', 1, 1, 3, NULL, NULL, NULL, 'Educational research methods', TRUE),

-- Year 1, Semester 2
('MEMA1201', 'Educational Leadership and Change Management', 1, 2, 3, NULL, NULL, NULL, 'Leading educational change', TRUE),
('MEMA1202', 'Quality Assurance in Education', 1, 2, 3, NULL, NULL, NULL, 'Standards and quality management', TRUE),
('MEMA1203', 'Comparative Education Systems', 1, 2, 3, NULL, NULL, NULL, 'International education comparison', TRUE),
('MEMA1204', 'Educational Finance and Resource Management', 1, 2, 3, NULL, NULL, NULL, 'Financial planning and allocation', TRUE),

-- Year 2, Semester 1
('MEMA2101', 'Curriculum Leadership', 2, 1, 3, NULL, NULL, NULL, 'Leading curriculum development', TRUE),
('MEMA2102', 'Educational Technology Management', 2, 1, 3, NULL, NULL, NULL, 'Managing ICT in education', TRUE),
('MEMA2103', 'Thesis/Research Project I', 2, 1, 6, NULL, NULL, NULL, 'Research proposal and literature review', TRUE),

-- Master of Arts in Linguistics
-- Year 2, Semester 1
('MAL2101', 'Advanced Phonetics and Phonology', 2, 1, 3, NULL, NULL, NULL, 'Sound systems and patterns', TRUE),
('MAL2102', 'Advanced Syntax and Morphology', 2, 1, 3, NULL, NULL, NULL, 'Grammatical structures', TRUE),
('MAL2103', 'Sociolinguistics', 2, 1, 3, NULL, NULL, NULL, 'Language in social context', TRUE),
('MAL2104', 'Applied Linguistics', 2, 1, 3, NULL, NULL, NULL, 'Linguistics in practical applications', TRUE),
('MAL2105', 'Discourse Analysis', 2, 1, 3, NULL, NULL, NULL, 'Analysis of spoken and written discourse', TRUE),

-- Master of Arts in English
-- Year 2, Semester 1
('MAE2101', 'Advanced Literary Theory', 2, 1, 3, NULL, NULL, NULL, 'Contemporary literary criticism', TRUE),
('MAE2102', 'Shakespeare Studies', 2, 1, 3, NULL, NULL, NULL, 'Shakespearean literature analysis', TRUE),
('MAE2103', 'Postcolonial Literature', 2, 1, 3, NULL, NULL, NULL, 'Literature from postcolonial perspectives', TRUE),
('MAE2104', 'English Language Teaching Methodology', 2, 1, 3, NULL, NULL, NULL, 'Advanced ELT techniques', TRUE),
('MAE2105', 'Research in English Studies', 2, 1, 3, NULL, NULL, NULL, 'Research methods in English', TRUE),

-- PhD in Management Sciences - Educational Administration
-- Year 1, Semester 1
('PHDEA1101', 'Advanced Educational Administration Theory', 1, 1, 3, NULL, NULL, NULL, 'Doctoral-level administration theory', TRUE),
('PHDEA1102', 'Policy Analysis in Education', 1, 1, 3, NULL, NULL, NULL, 'Educational policy research', TRUE),
('PHDEA1103', 'Seminar in Educational Leadership', 1, 1, 3, NULL, NULL, NULL, 'Contemporary leadership issues', TRUE),

-- ============================================================================
-- CHSS (COLLEGE OF HUMANITIES AND SOCIAL SCIENCES) COURSES
-- ============================================================================

-- Bachelor of Guidance and Counselling
-- Year 1, Semester 1
('BGC1101', 'Introduction to Guidance and Counselling', 1, 1, 3, NULL, NULL, NULL, 'Foundations of counseling', TRUE),
('BGC1102', 'Developmental Psychology', 1, 1, 3, NULL, NULL, NULL, 'Human development across lifespan', TRUE),
('BGC1103', 'Introduction to Psychology', 1, 1, 3, NULL, NULL, NULL, 'Basic psychological concepts', TRUE),
('BGC1104', 'Communication Skills for Counsellors', 1, 1, 3, NULL, NULL, NULL, 'Effective counseling communication', TRUE),

-- Year 1, Semester 2
('BGC1201', 'Theories of Counselling', 1, 2, 3, NULL, NULL, NULL, 'Major counseling theories', TRUE),
('BGC1202', 'Abnormal Psychology', 1, 2, 3, NULL, NULL, NULL, 'Psychopathology and mental disorders', TRUE),
('BGC1203', 'Educational Psychology', 1, 2, 3, NULL, NULL, NULL, 'Psychology in educational settings', TRUE),
('BGC1204', 'Group Dynamics and Counselling', 1, 2, 3, NULL, NULL, NULL, 'Group counseling techniques', TRUE),

-- Year 2, Semester 1
('BGC2101', 'Career Guidance and Counselling', 2, 1, 3, NULL, NULL, NULL, 'Vocational guidance and career development', TRUE),
('BGC2102', 'Family and Marriage Counselling', 2, 1, 3, NULL, NULL, NULL, 'Family therapy and marriage counseling', TRUE),
('BGC2103', 'Psychological Testing and Assessment', 2, 1, 3, NULL, NULL, NULL, 'Assessment instruments and interpretation', TRUE),
('BGC2104', 'Child and Adolescent Counselling', 2, 1, 3, NULL, NULL, NULL, 'Counseling young people', TRUE),

-- Year 2, Semester 2
('BGC2201', 'Counselling Practicum I', 2, 2, 6, NULL, NULL, NULL, 'Supervised counseling practice', TRUE),
('BGC2202', 'Substance Abuse Counselling', 2, 2, 3, NULL, NULL, NULL, 'Addiction counseling', TRUE),
('BGC2203', 'Crisis Intervention and Trauma Counselling', 2, 2, 3, NULL, NULL, NULL, 'Emergency counseling techniques', TRUE),

-- Bachelor of Social Work and Community Development (Upgrading)
-- Year 3, Semester 1
('BSWCD3101', 'Advanced Social Work Practice', 3, 1, 3, NULL, NULL, NULL, 'Advanced practice methods', TRUE),
('BSWCD3102', 'Community Development Theories', 3, 1, 3, NULL, NULL, NULL, 'Community development approaches', TRUE),
('BSWCD3103', 'Social Policy and Administration', 3, 1, 3, NULL, NULL, NULL, 'Social welfare policy', TRUE),
('BSWCD3104', 'Program Planning and Evaluation', 3, 1, 3, NULL, NULL, NULL, 'Social program design', TRUE),
('BSWCD3105', 'Research Methods in Social Work', 3, 1, 3, NULL, NULL, NULL, 'Social work research', TRUE),

-- Diploma in Guidance and Counselling
-- Year 2, Semester 2
('DGC2201', 'Basic Counselling Skills', 2, 2, 3, NULL, NULL, NULL, 'Fundamental counseling techniques', TRUE),
('DGC2202', 'Psychology of Guidance', 2, 2, 3, NULL, NULL, NULL, 'Psychological foundations of guidance', TRUE),
('DGC2203', 'Counselling Ethics and Professional Practice', 2, 2, 3, NULL, NULL, NULL, 'Ethics in counseling', TRUE),
('DGC2204', 'Practicum in Guidance and Counselling', 2, 2, 6, NULL, NULL, NULL, 'Practical counseling experience', TRUE),

-- Diploma in Mass Communication
-- Year 2, Semester 1
('DMC2101', 'Introduction to Mass Communication', 2, 1, 3, NULL, NULL, NULL, 'Mass media theory and practice', TRUE),
('DMC2102', 'News Writing and Reporting', 2, 1, 3, NULL, NULL, NULL, 'Journalism fundamentals', TRUE),
('DMC2103', 'Media Ethics and Law', 2, 1, 3, NULL, NULL, NULL, 'Legal and ethical issues in media', TRUE),
('DMC2104', 'Public Relations and Advertising', 2, 1, 3, NULL, NULL, NULL, 'PR and advertising principles', TRUE),
('DMC2105', 'Broadcasting Techniques', 2, 1, 3, NULL, NULL, NULL, 'Radio and TV production', TRUE),

-- Postgraduate Diploma in Development Studies
-- Year 1, Semester 1
('PDDS1101', 'Theories of Development', 1, 1, 3, NULL, NULL, NULL, 'Development paradigms and approaches', TRUE),
('PDDS1102', 'Development Economics', 1, 1, 3, NULL, NULL, NULL, 'Economic aspects of development', TRUE),
('PDDS1103', 'Social Development and Change', 1, 1, 3, NULL, NULL, NULL, 'Social dimensions of development', TRUE),
('PDDS1104', 'Research Methods in Development Studies', 1, 1, 3, NULL, NULL, NULL, 'Development research approaches', TRUE),

-- Year 1, Semester 2
('PDDS1201', 'Project Planning and Management', 1, 2, 3, NULL, NULL, NULL, 'Development project management', TRUE),
('PDDS1202', 'Sustainable Development', 1, 2, 3, NULL, NULL, NULL, 'Sustainability principles', TRUE),
('PDDS1203', 'Gender and Development', 1, 2, 3, NULL, NULL, NULL, 'Gender issues in development', TRUE),
('PDDS1204', 'Monitoring and Evaluation', 1, 2, 3, NULL, NULL, NULL, 'M&E frameworks and tools', TRUE),

-- Master of Arts in Conflict Resolution and Peace Building
-- Year 2, Semester 1
('MACRPB2101', 'Advanced Conflict Analysis', 2, 1, 3, NULL, NULL, NULL, 'Complex conflict dynamics', TRUE),
('MACRPB2102', 'Peacebuilding Theories and Practice', 2, 1, 3, NULL, NULL, NULL, 'Peace intervention strategies', TRUE),
('MACRPB2103', 'Mediation and Negotiation', 2, 1, 3, NULL, NULL, NULL, 'Dispute resolution techniques', TRUE),
('MACRPB2104', 'Transitional Justice', 2, 1, 3, NULL, NULL, NULL, 'Post-conflict justice mechanisms', TRUE),
('MACRPB2105', 'Humanitarian Response and Intervention', 2, 1, 3, NULL, NULL, NULL, 'Humanitarian operations', TRUE),

-- PhD in Management Sciences - Public Management
-- Year 2, Semester 2
('PHDPM2201', 'Public Policy Analysis and Implementation', 2, 2, 3, NULL, NULL, NULL, 'Advanced policy studies', TRUE),
('PHDPM2202', 'Governance and Public Sector Reform', 2, 2, 3, NULL, NULL, NULL, 'Public sector transformation', TRUE),
('PHDPM2203', 'Research Seminar in Public Management', 2, 2, 3, NULL, NULL, NULL, 'Contemporary public management issues', TRUE),
('PHDPM2204', 'Dissertation Research', 2, 2, 12, NULL, NULL, NULL, 'Doctoral dissertation work', TRUE);
