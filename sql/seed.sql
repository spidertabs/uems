INSERT INTO colleges (code, name, abbrv, description) VALUES
('SOMAC', 'School of Mathematics and Computing', 'SOMAC', 'Handles Mathematics, Computing, and ICT programs.'),
('SONAS', 'School of Natural Sciences', 'SONAS', 'Covers biology, chemistry, physics and natural science programs.'),
('SOL', 'School of Law', 'SOL', 'Legal studies and research faculty.'),
('CEM', 'College of Economics and Management', 'CEM', 'Business, management and economics programs.');


INSERT INTO departments (college_id, code, name, abbrv, description) VALUES
-- SOMAC
(1, 'CS', 'Computer Science', 'CS', 'Department of Computer Science'),
(1, 'IT', 'Information Technology', 'IT', 'Department of Information Technology'),
(1, 'STAT', 'Statistics', 'STAT', 'Department of Statistics'),
-- SONAS
(2, 'BIO', 'Biology', 'BIO', 'Department of Biology'),
(2, 'CHEM', 'Chemistry', 'CHEM', 'Department of Chemistry'),
(2, 'PHY', 'Physics', 'PHY', 'Department of Physics'),
-- SOL
(3, 'LAW', 'Law', 'LAW', 'Department of Law'),
-- CEM
(4, 'BBA', 'Business Administration', 'BBA', 'Department of Business Administration'),
(4, 'ECO', 'Economics', 'ECO', 'Department of Economics'),
(4, 'ACC', 'Accounting', 'ACC', 'Department of Accounting');


INSERT INTO users (email, password_hash, first_name, last_name, role, department_id, college_id, phone) VALUES
-- Admin
('admin@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'System', 'Admin', 'admin', NULL, NULL, '0700000000'),
-- Deans
('dean.somac@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'John', 'Katumba', 'dean', NULL, 1, '0701111111'),
('dean.sonas@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Sarah', 'Nanyonga', 'dean', NULL, 2, '0702222222'),
('dean.sol@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Michael', 'Okello', 'dean', NULL, 3, '0703333333'),
('dean.cem@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Alice', 'Kakuru', 'dean', NULL, 4, '0704444444'),
-- Exam Master
('exammaster@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Peter', 'Lutalo', 'exam_master', NULL, NULL, '0705555555'),
-- HODs
('hod.cs@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Derrick', 'Mugisha', 'hod', 1, 1, '0706000001'),
('hod.it@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Brenda', 'Kansiime', 'hod', 2, 1, '0706000002'),
('hod.stat@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Henry', 'Okoth', 'hod', 3, 1, '0706000003'),
('hod.bio@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Lydia', 'Namara', 'hod', 4, 2, '0706000004'),
('hod.chem@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Isaac', 'Baluku', 'hod', 5, 2, '0706000005'),
('hod.phy@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Rogers', 'Wamala', 'hod', 6, 2, '0706000006'),
('hod.law@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Angela', 'Nambasa', 'hod', 7, 3, '0706000007'),
('hod.bba@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'James', 'Katureebe', 'hod', 8, 4, '0706000008'),
('hod.eco@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Patricia', 'Mirembe', 'hod', 9, 4, '0706000009'),
('hod.acc@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Samuel', 'Kasule', 'hod', 10, 4, '0706000010'),
-- Lecturers
('lect.cs1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Paul', 'Mutebi', 'lecturer', 1, 1, '0707000001'),
('lect.cs2@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Annet', 'Mukisa', 'lecturer', 1, 1, '0707000002'),
('lect.it1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Moses', 'Nabende', 'lecturer', 2, 1, '0707000003'),
('lect.stat1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Daniel', 'Okumu', 'lecturer', 3, 1, '0707000004'),
('lect.bio1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Olivia', 'Nakato', 'lecturer', 4, 2, '0707000005'),
('lect.chem1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Patrick', 'Ssentamu', 'lecturer', 5, 2, '0707000006'),
('lect.phy1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Sylvia', 'Mutumba', 'lecturer', 6, 2, '0707000007'),
('lect.law1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Robert', 'Turyasingura', 'lecturer', 7, 3, '0707000008'),
('lect.bba1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Hassan', 'Lubega', 'lecturer', 8, 4, '0707000009'),
('lect.eco1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Emily', 'Kyaligonza', 'lecturer', 9, 4, '0707000010'),
('lect.acc1@uems.ac.ug', '$2b$12$Zzzbi.AwYOlNdHSCUJGcOeKU5YxNgA9TKU7ihFdb62KpGq.tr.ssK', 'Geoffrey', 'Nsubuga', 'lecturer', 10, 4, '0707000011');


INSERT INTO courses (code, title, level, semester, credit_units, college_id, department_id, hod_id, description) VALUES
-- CS Courses (Dept 1, HOD = 7)
('CSC1101', 'Introduction to Computer Science', '1', '1', 3, 1, 1, 7, 'Foundation course in computing.'),
('CSC1202', 'Programming Fundamentals', '1', '2', 4, 1, 1, 7, 'Basics of programming in high-level languages.'),
('CSC2103', 'Data Structures & Algorithms', '2', '1', 4, 1, 1, 7, 'Core algorithms and data organization.'),
-- IT Courses (Dept 2, HOD = 8)
('ICT1101', 'Information Systems I', '1', '1', 3, 1, 2, 8, 'Intro to business information systems.'),
('ICT2205', 'Network Systems', '2', '2', 4, 1, 2, 8, 'Fundamentals of computer networks.'),
-- Statistics Courses (Dept 3, HOD = 9)
('STA1101', 'Basic Statistics', '1', '1', 3, 1, 3, 9, 'Foundation in statistical methods.'),
('STA2203', 'Probability Theory', '2', '2', 4, 1, 3, 9, 'Probability and distributions.'),
-- Biology Courses (Dept 4, HOD = 10)
('BIO1101', 'General Biology', '1', '1', 3, 2, 4, 10, 'Introduction to biological sciences.'),
('BIO2302', 'Genetics', '2', '2', 4, 2, 4, 10, 'Principles of heredity and variation.'),
-- Chemistry Courses (Dept 5, HOD = 11)
('CHE1101', 'General Chemistry', '1', '1', 3, 2, 5, 11, 'Introductory chemistry principles.'),
('CHE2204', 'Organic Chemistry', '2', '2', 4, 2, 5, 11, 'Study of carbon compounds.'),
-- Physics Courses (Dept 6, HOD = 12)
('PHY1101', 'Classical Mechanics', '1', '1', 3, 2, 6, 12, 'Newtonian physics and motion.'),
('PHY2203', 'Electromagnetism', '2', '2', 4, 2, 6, 12, 'Electric and magnetic fields.'),
-- Law Courses (Dept 7, HOD = 13)
('LAW1101', 'Introduction to Law', '1', '1', 3, 3, 7, 13, 'Legal systems overview.'),
('LAW2205', 'Contract Law', '2', '2', 4, 3, 7, 13, 'Principles of contract law.'),
-- BBA Courses (Dept 8, HOD = 14)
('BBA1101', 'Principles of Management', '1', '1', 3, 4, 8, 14, 'Basic management and leadership.'),
('BBA2204', 'Marketing Management', '2', '2', 4, 4, 8, 14, 'Marketing strategies and tools.'),
-- Economics Courses (Dept 9, HOD = 15)
('ECO1101', 'Microeconomics I', '1', '1', 3, 4, 9, 15, 'Consumer and firm theory.'),
('ECO2203', 'Macroeconomics II', '2', '2', 4, 4, 9, 15, 'National income, inflation, and growth.'),
-- Accounting Courses (Dept 10, HOD = 16)
('ACC1101', 'Financial Accounting I', '1', '1', 3, 4, 10, 16, 'Introduction to accounting.'),
('ACC2304', 'Cost Accounting', '2', '2', 4, 4, 10, 16, 'Costing methods and analysis.');


INSERT INTO study_units (course_id, code, name, description, sequence_order, learning_outcomes, created_by) VALUES
-- CSC1101
(1, 'CSC1101-U1', 'Computer Overview', 'Basics of computers.', 1, 'Understand computer components.', 7),
(1, 'CSC1101-U2', 'History of Computing', 'Evolution of computers.', 2, 'Trace computing timeline.', 7),
-- CSC1202
(2, 'CSC1202-U1', 'Variables & Data Types', 'Core programming concepts.', 1, 'Write simple programs.', 7),
(2, 'CSC1202-U2', 'Control Structures', 'Decision and looping.', 2, 'Use conditionals and loops.', 7),
-- CSC2103
(3, 'CSC2103-U1', 'Arrays & Lists', 'Sequential data structures.', 1, 'Explain lists and arrays.', 7),
(3, 'CSC2103-U2', 'Searching & Sorting', 'Algorithms basics.', 2, 'Implement sorting techniques.', 7),
-- ICT1101
(4, 'ICT1101-U1', 'Intro to IS', 'System concepts.', 1, 'Define information systems.', 8),
(4, 'ICT1101-U2', 'Business Processes', 'Organizations & systems.', 2, 'Describe business workflows.', 8),
-- ICT2205
(5, 'ICT2205-U1', 'Networking Basics', 'Network terms.', 1, 'Explain OSI layers.', 8),
(5, 'ICT2205-U2', 'Network Devices', 'Routers, switches.', 2, 'Understand network components.', 8),
-- STA1101
(6, 'STA1101-U1', 'Descriptive Stats', 'Summarizing data.', 1, 'Compute descriptive measures.', 9),
(6, 'STA1101-U2', 'Sampling', 'Data collection.', 2, 'Design sampling methods.', 9),
-- STA2203
(7, 'STA2203-U1', 'Random Variables', 'Probability basics.', 1, 'Define random variables.', 9),
(7, 'STA2203-U2', 'Distributions', 'Probability distributions.', 2, 'Apply distributions.', 9),
-- BIO1101
(8, 'BIO1101-U1', 'Cells', 'Cell structure.', 1, 'Identify cell organelles.', 10),
(8, 'BIO1101-U2', 'Ecology', 'Ecosystems.', 2, 'Explain ecosystems.', 10),
-- BIO2302
(9, 'BIO2302-U1', 'DNA & RNA', 'Genetic material.', 1, 'Explain DNA structure.', 10),
(9, 'BIO2302-U2', 'Genetic Disorders', 'Genetic diseases.', 2, 'Describe disorders.', 10),
-- CHE1101
(10, 'CHE1101-U1', 'Atoms', 'Atomic structure.', 1, 'Describe atoms.', 11),
(10, 'CHE1101-U2', 'Periodic Table', 'Elements overview.', 2, 'Understand periodic trends.', 11),
-- CHE2204
(11, 'CHE2204-U1', 'Hydrocarbons', 'Types of hydrocarbons.', 1, 'Classify hydrocarbons.', 11),
(11, 'CHE2204-U2', 'Reactions', 'Organic reactions.', 2, 'Explain reaction types.', 11),
-- PHY1101
(12, 'PHY1101-U1', 'Kinematics', 'Motion basics.', 1, 'Analyze motion.', 12),
(12, 'PHY1101-U2', 'Forces', 'Newton''s laws.', 2, 'Apply motion laws.', 12),
-- PHY2203
(13, 'PHY2203-U1', 'Electric Fields', 'Electric forces.', 1, 'Define electric fields.', 12),
(13, 'PHY2203-U2', 'Magnetic Fields', 'Magnetism.', 2, 'Explain magnetic fields.', 12),
-- LAW1101
(14, 'LAW1101-U1', 'Legal Systems', 'Types of law.', 1, 'Identify legal systems.', 13),
(14, 'LAW1101-U2', 'Courts', 'Court system.', 2, 'Describe courts.', 13),
-- LAW2205
(15, 'LAW2205-U1', 'Contracts Basics', 'Elements of contract.', 1, 'Explain contract elements.', 13),
(15, 'LAW2205-U2', 'Breach of Contract', 'Legal remedies.', 2, 'Explain contract breaches.', 13),
-- BBA1101
(16, 'BBA1101-U1', 'Management Roles', 'Role of managers.', 1, 'Describe managerial roles.', 14),
(16, 'BBA1101-U2', 'Leadership', 'Leadership styles.', 2, 'Compare leadership types.', 14),
-- BBA2204
(17, 'BBA2204-U1', 'Marketing Mix', '4Ps concept.', 1, 'Apply marketing mix.', 14),
(17, 'BBA2204-U2', 'Consumer Behavior', 'Behavior analysis.', 2, 'Analyze consumer behavior.', 14),
-- ECO1101
(18, 'ECO1101-U1', 'Demand & Supply', 'Market basics.', 1, 'Explain market forces.', 15),
(18, 'ECO1101-U2', 'Elasticity', 'Elasticity concepts.', 2, 'Compute elasticity.', 15),
-- ECO2203
(19, 'ECO2203-U1', 'GDP & Inflation', 'Macro indicators.', 1, 'Understand economic growth.', 15),
(19, 'ECO2203-U2', 'Monetary Policy', 'Central bank roles.', 2, 'Explain monetary policy.', 15),
-- ACC1101
(20, 'ACC1101-U1', 'Accounting Terms', 'Intro concepts.', 1, 'Define accounting terms.', 16),
(20, 'ACC1101-U2', 'Double Entry', 'Ledger system.', 2, 'Apply double entry.', 16),
-- ACC2304
(21, 'ACC2304-U1', 'Costing Basics', 'Types of costs.', 1, 'Identify cost types.', 16),
(21, 'ACC2304-U2', 'Budgets', 'Budgeting.', 2, 'Prepare budgets.', 16);


INSERT INTO lecturer_permissions (lecturer_id, course_id, granted_by, can_add_questions, can_create_papers, can_edit_questions, expires_at, notes) VALUES
-- CS Lecturer Permissions (Dept 1, HOD = 7)
(17, 1, 7, TRUE, TRUE, FALSE, NULL, 'Access to CSC1101'),
(18, 2, 7, TRUE, TRUE, FALSE, NULL, 'Access to CSC1202'),
-- IT Lecturer Permissions (Dept 2, HOD = 8)
(19, 4, 8, TRUE, TRUE, FALSE, NULL, 'Access to ICT1101'),
(19, 5, 8, TRUE, TRUE, TRUE, NULL, 'Full editing rights for ICT2205'),
-- Statistics Lecturer Permissions (Dept 3, HOD = 9)
(20, 6, 9, TRUE, TRUE, FALSE, NULL, 'Access to STA1101'),
(20, 7, 9, TRUE, TRUE, TRUE, NULL, 'Full editing rights for STA2203'),
-- Biology Lecturer Permissions (Dept 4, HOD = 10)
(21, 8, 10, TRUE, TRUE, FALSE, NULL, 'Access to BIO1101'),
(21, 9, 10, TRUE, TRUE, TRUE, NULL, 'Genetics course access with edit'),
-- Chemistry Lecturer Permissions (Dept 5, HOD = 11)
(22, 10, 11, TRUE, TRUE, FALSE, NULL, 'General Chemistry access'),
(22, 11, 11, TRUE, TRUE, TRUE, NULL, 'Organic Chemistry Editor Access'),
-- Physics Lecturer Permissions (Dept 6, HOD = 12)
(23, 12, 12, TRUE, TRUE, FALSE, NULL, 'Access to PHY1101'),
(23, 13, 12, TRUE, TRUE, TRUE, NULL, 'Electromagnetism full rights'),
-- Law Lecturer Permissions (Dept 7, HOD = 13)
(24, 14, 13, TRUE, TRUE, FALSE, NULL, 'Intro to Law access'),
(24, 15, 13, TRUE, TRUE, TRUE, NULL, 'Contract Law edit rights'),
-- BBA Lecturer Permissions (Dept 8, HOD = 14)
(25, 16, 14, TRUE, TRUE, FALSE, NULL, 'Principles of Management access'),
(25, 17, 14, TRUE, TRUE, TRUE, NULL, 'Marketing Management full rights'),
-- Economics Lecturer Permissions (Dept 9, HOD = 15)
(26, 18, 15, TRUE, TRUE, FALSE, NULL, 'Microeconomics I access'),
(26, 19, 15, TRUE, TRUE, TRUE, NULL, 'Macroeconomics II edit rights'),
-- Accounting Lecturer Permissions (Dept 10, HOD = 16)
(27, 20, 16, TRUE, TRUE, FALSE, NULL, 'Financial Accounting I access'),
(27, 21, 16, TRUE, TRUE, TRUE, NULL, 'Cost Accounting full rights');



-- =====================================================
-- VIEW QUERIES (Testing the views with our data)
-- =====================================================

-- Query 1: Check papers awaiting HOD approval
SELECT * FROM hod_pending_approvals;

-- Expected Results:
-- | id | paper_code          | status   | exam_type | course_code | course_name          | lecturer_name    | submitted_at        | hod_id | department_name |
-- |----|---------------------|----------|-----------|-------------|----------------------|------------------|---------------------|--------|-----------------|
-- | 3  | STA1101-FINAL-2024-1| submitted| FINAL     | STA1101     | Basic Statistics     | Daniel Okumu     | 2024-03-14 11:30:00 | 9      | Statistics      |
-- | 5  | LAW1101-CAT1-2024-1 | submitted| CAT       | LAW1101     | Introduction to Law  | Robert Turyasingura| 2024-03-15 10:00:00 | 13     | Law            |

-- Query 2: Check papers ready for printing
SELECT * FROM papers_ready_for_print;

-- Expected Results:
-- | id | paper_code          | status         | exam_type | exam_date   | course_code | course_name          | total_marks | duration | hod_approved_at    | print_quantity | department_name | college_name |
-- |----|---------------------|----------------|-----------|-------------|-------------|----------------------|-------------|----------|---------------------|----------------|-----------------|--------------|
-- | 6  | BBA1101-FINAL-2024-1| ready_for_print| FINAL     | 2024-05-22  | BBA1101     | Principles of Management| 100        | 180      | 2024-03-16 11:20:00 | 500           | BBA            | CEM         |
-- | 8  | ACC1101-FINAL-2024-1| printed        | FINAL     | 2024-05-19  | ACC1101     | Financial Accounting I| 100        | 180      | 2024-03-14 13:25:00 | 600           | Accounting      | CEM         |

-- Query 3: Check lecturer permissions summary
SELECT * FROM lecturer_permissions_summary;

-- Expected Results:
-- | lecturer_id | lecturer_name    | course_code | course_name          | can_add_questions | can_create_papers | granted_at          | expires_at | granted_by_name  |
-- |-------------|------------------|-------------|----------------------|-------------------|-------------------|---------------------|------------|------------------|
-- | 20          | Paul Mutebi      | CSC1101     | Intro to Comp Science| 1                 | 1                 | 2024-02-15 14:00:00 | NULL       | Derrick Mugisha  |
-- | 20          | Paul Mutebi      | CSC1202     | Programming Fundamentals| 1               | 1                 | 2024-02-15 14:00:00 | NULL       | Derrick Mugisha  |
-- | 20          | Paul Mutebi      | CSC2103     | Data Structures & Algorithms| 1          | 1                 | 2024-02-15 14:00:00 | NULL       | Derrick Mugisha  |
-- | 21          | Moses Nabende    | ICT1101     | Information Systems I | 1                 | 1                 | 2024-02-20 10:30:00 | NULL       | Brenda Kansiime  |
-- | 21          | Moses Nabende    | ICT2205     | Network Systems      | 1                 | 1                 | 2024-02-20 10:30:00 | NULL       | Brenda Kansiime  |

-- Query 4: Check papers summary by status
SELECT * FROM papers_by_status_summary;

-- Expected Results:
-- | status         | exam_type | count | oldest_paper        | newest_paper        |
-- |----------------|-----------|-------|---------------------|---------------------|
-- | submitted      | FINAL     | 1     | 2024-03-14 11:30:00 | 2024-03-14 11:30:00 |
-- | submitted      | CAT       | 1     | 2024-03-15 10:00:00 | 2024-03-15 10:00:00 |
-- | hod_approved   | CAT       | 1     | 2024-03-13 09:45:00 | 2024-03-13 09:45:00 |
-- | hod_approved   | FINAL     | 2     | 2024-03-12 14:15:00 | 2024-03-16 11:20:00 |
-- | dean_approved  | FINAL     | 3     | 2024-03-11 15:30:00 | 2024-03-17 08:30:00 |
-- | ready_for_print| FINAL     | 1     | 2024-03-17 08:30:00 | 2024-03-17 08:30:00 |
-- | printed        | FINAL     | 1     | 2024-03-16 14:30:00 | 2024-03-16 14:30:00 |

-- =====================================================
-- TRIGGER DEMONSTRATION
-- =====================================================

-- Let's test the triggers by simulating some actions:

-- Test 1: Add a new question to an exam paper and see total_marks update
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) 
VALUES (6, 141, 'C', '11', 'Question 11', 10, 11);

-- Check if total_marks updated automatically
SELECT paper_code, total_marks FROM exam_papers WHERE id = 6;
-- Expected: total_marks should increase from 100 to 110

-- Test 2: Check if question usage count increased
SELECT id, question_text, usage_count FROM questions WHERE id = 141;
-- Expected: usage_count should increase by 1

-- Test 3: Simulate paper status change to trigger notifications
-- First, let's check current notifications count
SELECT COUNT(*) as current_notifications FROM notifications;

-- Update a paper status from draft to submitted
UPDATE exam_papers SET status = 'submitted' WHERE id = 3;

-- Check if notification was created for HOD
SELECT * FROM notifications WHERE related_paper_id = 3 AND type = 'approval_required';
-- Expected: A new notification should be created for HOD (user_id: 9)

-- Test 4: Simulate HOD approval to trigger lecturer notification
UPDATE exam_papers SET status = 'hod_approved' WHERE id = 3;

-- Check if notification was created for lecturer
SELECT * FROM notifications WHERE related_paper_id = 3 AND type = 'paper_approved';
-- Expected: A new notification should be created for lecturer (user_id: 22)

-- Test 5: Simulate paper ready for print to trigger exam master notification
UPDATE exam_papers SET status = 'ready_for_print' WHERE id = 3;

-- Check if notifications were created for all exam masters
SELECT * FROM notifications WHERE related_paper_id = 3 AND type = 'ready_for_print';
-- Expected: Notifications should be created for all active exam masters

-- =====================================================
-- ADDITIONAL USEFUL QUERIES USING THE VIEWS
-- =====================================================

-- Query: Find all papers created by a specific lecturer
SELECT p.* 
FROM hod_pending_approvals p 
WHERE p.lecturer_name = 'Daniel Okumu';

-- Query: Count papers per department awaiting approval
SELECT department_name, COUNT(*) as pending_count
FROM hod_pending_approvals
GROUP BY department_name;

-- Query: Find papers that need printing within the next week
SELECT *
FROM papers_ready_for_print
WHERE exam_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY);

-- Query: Check which lecturers have permissions for specific courses
SELECT lecturer_name, course_name, can_add_questions, can_create_papers
FROM lecturer_permissions_summary
WHERE course_code LIKE 'CSC%';

-- Query: Get department-wise paper status summary
SELECT 
    d.name as department_name,
    ep.status,
    COUNT(*) as paper_count
FROM exam_papers ep
JOIN courses c ON ep.course_id = c.id
JOIN departments d ON c.department_id = d.id
GROUP BY d.name, ep.status
ORDER BY d.name, ep.status;

-- Query: Find papers with comments requiring attention
SELECT 
    ep.paper_code,
    c.code as course_code,
    COUNT(pc.id) as unresolved_comments
FROM exam_papers ep
JOIN courses c ON ep.course_id = c.id
JOIN paper_comments pc ON ep.id = pc.exam_paper_id
WHERE pc.is_resolved = FALSE
GROUP BY ep.id, c.code;

-- Query: Recent system activity (using audit logs)
SELECT 
    u.first_name,
    u.last_name,
    al.action,
    al.entity_type,
    al.created_at
FROM audit_logs al
JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 10;



-- Insert sample programmes (adjust college_id and department_id based on your setup)
INSERT INTO programmes (code, name, level, duration_years, description) VALUES
('BIT', 'Bachelor of Information Technology', 'bachelors', 3, 'Undergraduate programme in Information Technology'),
('DIT', 'Diploma in Information Technology', 'diploma', 2, 'Diploma programme in Information Technology'),
('BSTAT', 'Bachelor of Statistics', 'bachelors', 3, 'Undergraduate programme in Statistics'),
('DSTAT', 'Diploma in Statistics', 'diploma', 2, 'Diploma programme in Statistics'),
('MBA', 'Master of Business Administration', 'masters', 2, 'Postgraduate programme in Business Administration'),
('BBA', 'Bachelor of Business Administration', 'bachelors', 3, 'Undergraduate programme in Business Administration'),
('BOL', 'Bachelor of Organizational Leadership', 'bachelors', 3, 'Undergraduate programme in Organizational Leadership'),
('BCS', 'Bachelor of Computer Science', 'bachelors', 3, 'Undergraduate programme in Computer Science'),
('DCS', 'Diploma in Computer Science', 'diploma', 2, 'Diploma programme in Computer Science'),
('BECO', 'Bachelor of Economics', 'bachelors', 3, 'Undergraduate programme in Economics');