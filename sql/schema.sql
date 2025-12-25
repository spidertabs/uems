-- ============================================================
--  UEMS - University Exam Management System
--  Complete MySQL Database Schema
-- ============================================================

-- =====================================================
-- ORGANIZATIONAL STRUCTURE
-- =====================================================

-- Colleges Table (SOMAC, SONAS, CEM, SOL, etc.)
CREATE TABLE colleges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    abbrv VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Departments Table (CS, IT, STATISTICS etc under a College)
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    college_id INT NOT NULL COMMENT 'College where the department belongs',
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL UNIQUE,
    abbrv VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    INDEX idx_code (code),
    INDEX idx_college (college_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Programmes Table (BIT, DIT, BSTAT, DSTAT, MBA, BBA, BOL, etc.)
CREATE TABLE programmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE COMMENT 'Programme code (e.g., BIT, DIT, BSTAT)',
    name VARCHAR(255) NOT NULL UNIQUE COMMENT 'Full programme name',
    level ENUM('diploma', 'bachelors', 'masters', 'phd') NOT NULL,
    duration_years INT COMMENT 'Standard duration in years',
    department_id INT,
    college_id INT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL,
    INDEX idx_code (code),
    INDEX idx_department (department_id),
    INDEX idx_college (college_id),
    INDEX idx_level (level),
    INDEX idx_active (is_active),
    INDEX idx_level_active (level, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- USER MANAGEMENT & AUTHENTICATION
-- =====================================================

-- Users Table (RBAC Implementation)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('lecturer', 'hod', 'dean', 'exam_master', 'admin') NOT NULL DEFAULT 'lecturer',
    department_id INT,
    college_id INT,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_department (department_id),
    INDEX idx_college (college_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions Table
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- ACADEMIC CONTENT
-- =====================================================

-- Courses Table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    level INT,
    semester INT,
    credit_units INT,
    college_id INT,
    department_id INT,
    hod_id INT COMMENT 'HOD who created/manages this course',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL,
    FOREIGN KEY (hod_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_code (code),
    INDEX idx_department (department_id),
    INDEX idx_college (college_id),
    INDEX idx_hod (hod_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Study Units Table (Created by HOD, nested under courses)
CREATE TABLE study_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sequence_order INT DEFAULT 0,
    learning_outcomes TEXT,
    created_by INT NOT NULL COMMENT 'HOD who created this unit',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_course_unit (course_id, code),
    INDEX idx_course (course_id),
    INDEX idx_code (code),
    INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PERMISSIONS SYSTEM
-- =====================================================

-- Lecturer Permissions (HOD grants permission to lecturers to add questions)
CREATE TABLE lecturer_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lecturer_id INT NOT NULL,
    course_id INT NOT NULL,
    granted_by INT NOT NULL COMMENT 'HOD who granted permission',
    can_add_questions BOOLEAN DEFAULT TRUE,
    can_create_papers BOOLEAN DEFAULT TRUE,
    can_edit_questions BOOLEAN DEFAULT FALSE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_lecturer_course (lecturer_id, course_id),
    INDEX idx_lecturer (lecturer_id),
    INDEX idx_course (course_id),
    INDEX idx_granted_by (granted_by),
    INDEX idx_active (is_active),
    INDEX idx_permissions_active (lecturer_id, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- QUESTION BANK
-- =====================================================

-- Questions Table (Created by HOD or authorized Lecturers)
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    study_unit_id INT,
    created_by INT NOT NULL COMMENT 'HOD or Lecturer with permission',
    question_type ENUM('multiple_choice', 'true_false', 'short_answer', 'essay', 'practical', 'case_study') NOT NULL,
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    question_text TEXT NOT NULL,
    options JSON COMMENT 'For MCQs: array of options',
    correct_answer TEXT,
    marks INT NOT NULL DEFAULT 1,
    time_allocation INT COMMENT 'Time in minutes',
    learning_outcome TEXT,
    keywords TEXT,
    bloom_taxonomy ENUM('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'),
    tags JSON,
    usage_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    approved_by INT COMMENT 'HOD who approved this question',
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (study_unit_id) REFERENCES study_units(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_course (course_id),
    INDEX idx_study_unit (study_unit_id),
    INDEX idx_created_by (created_by),
    INDEX idx_type (question_type),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_approved_by (approved_by),
    INDEX idx_questions_course_active (course_id, is_active),
    FULLTEXT idx_question_text (question_text)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- EXAM PAPERS
-- =====================================================

-- Exam Papers Table (Created by Lecturers, Approved by HOD)
CREATE TABLE exam_papers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paper_code VARCHAR(50) NOT NULL UNIQUE,
    course_id INT NOT NULL,
    created_by INT NOT NULL COMMENT 'Lecturer who created the paper',
    exam_type ENUM('TEST', 'CAT', 'FINAL') NOT NULL,
    academic_year INT NOT NULL,
    semester INT NOT NULL,
    exam_date DATE,
    duration INT COMMENT 'Duration in minutes',
    total_marks INT DEFAULT 0,
    instructions TEXT,
    -- Workflow status
    status ENUM('draft', 'submitted', 'hod_review', 'hod_approved', 'hod_rejected',
                'dean_review', 'dean_approved', 'dean_rejected',
                'ready_for_print', 'printing', 'printed', 'published') 
           DEFAULT 'draft',
    -- Approval tracking
    hod_id INT COMMENT 'HOD who needs to approve',
    hod_approved_at TIMESTAMP NULL,
    dean_id INT COMMENT 'Dean overseeing approval',
    dean_approved_at TIMESTAMP NULL,
    exam_master_id INT COMMENT 'Exam Master handling printing',
    printed_at TIMESTAMP NULL,
    print_quantity INT DEFAULT 0,
    -- Metadata
    submitted_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    version INT DEFAULT 1,
    is_locked BOOLEAN DEFAULT FALSE,
    metadata JSON COMMENT 'Additional paper metadata',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hod_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (dean_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (exam_master_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_paper_code (paper_code),
    INDEX idx_course (course_id),
    INDEX idx_created_by (created_by),
    INDEX idx_status (status),
    INDEX idx_exam_type (exam_type),
    INDEX idx_hod (hod_id),
    INDEX idx_dean (dean_id),
    INDEX idx_exam_master (exam_master_id),
    INDEX idx_academic_year (academic_year, semester),
    INDEX idx_papers_status_type (status, exam_type),
    INDEX idx_papers_creator_status (created_by, status),
    INDEX idx_papers_hod_status (hod_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exam Paper Programmes Junction Table (Many-to-Many)
CREATE TABLE exam_paper_programmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_paper_id INT NOT NULL,
    programme_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (programme_id) REFERENCES programmes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_paper_programme (exam_paper_id, programme_id),
    INDEX idx_exam_paper (exam_paper_id),
    INDEX idx_programme (programme_id),
    INDEX idx_paper_programmes_paper (exam_paper_id),
    INDEX idx_paper_programmes_programme (programme_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exam Paper Questions (Junction Table with ordering and custom numbering)
CREATE TABLE exam_paper_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_paper_id INT NOT NULL,
    question_id INT NOT NULL,
    section VARCHAR(10) DEFAULT 'A' COMMENT 'Section A, B, C, etc.',
    question_number VARCHAR(20) NOT NULL COMMENT 'Custom question number (e.g., "1", "2a", "2b", "3(i)", "3(ii)")',
    display_number VARCHAR(50) COMMENT 'Full display format (e.g., "Question 1", "1(a)(i)")',
    marks INT NOT NULL,
    sub_marks VARCHAR(50) COMMENT 'For sub-questions (e.g., "2+3+5" for parts a,b,c)',
    is_required BOOLEAN DEFAULT TRUE COMMENT 'Is this question compulsory?',
    is_choice BOOLEAN DEFAULT FALSE COMMENT 'Part of a choice set (e.g., Answer any 3)',
    choice_group VARCHAR(20) COMMENT 'Group identifier for choice questions',
    sequence_order INT NOT NULL COMMENT 'Order questions appear on paper (1, 2, 3...)',
    parent_question_id INT COMMENT 'For sub-questions, references parent question',
    indentation_level INT DEFAULT 0 COMMENT '0=main, 1=sub (a,b,c), 2=sub-sub (i,ii,iii)',
    option_order JSON COMMENT 'Shuffled order of MCQ options (array of indices like [2,0,3,1])',
    notes TEXT COMMENT 'Internal notes about this question placement',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_question_id) REFERENCES exam_paper_questions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_paper_question_seq (exam_paper_id, sequence_order),
    INDEX idx_exam_paper (exam_paper_id),
    INDEX idx_question (question_id),
    INDEX idx_section (section),
    INDEX idx_sequence (sequence_order),
    INDEX idx_parent (parent_question_id),
    INDEX idx_choice_group (choice_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- WORKFLOW & APPROVALS
-- =====================================================

-- Workflow History Table (Audit Trail)
CREATE TABLE workflow_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_paper_id INT NOT NULL,
    action ENUM('created', 'submitted', 'hod_approved', 'hod_rejected', 
                'dean_approved', 'dean_rejected', 'ready_for_print', 
                'printing_started', 'printed', 'published', 'returned', 'updated') NOT NULL,
    from_status VARCHAR(50),
    to_status VARCHAR(50) NOT NULL,
    actor_id INT NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    comments TEXT,
    metadata JSON COMMENT 'Additional action metadata (e.g., print_quantity)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_exam_paper (exam_paper_id),
    INDEX idx_actor (actor_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_workflow_paper_created (exam_paper_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Paper Comments/Feedback Table
CREATE TABLE paper_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_paper_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_type ENUM('feedback', 'revision_request', 'hod_approval_note', 
                     'dean_note', 'print_instruction', 'general') DEFAULT 'general',
    comment TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    parent_comment_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES paper_comments(id) ON DELETE CASCADE,
    INDEX idx_exam_paper (exam_paper_id),
    INDEX idx_user (user_id),
    INDEX idx_type (comment_type),
    INDEX idx_parent (parent_comment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

-- Notifications Table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('paper_submitted', 'paper_approved', 'paper_rejected', 'paper_returned',
              'permission_granted', 'approval_required', 'ready_for_print', 
              'print_completed', 'comment_added', 'deadline_reminder', 'general') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_paper_id INT,
    related_entity_type VARCHAR(50),
    related_entity_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    action_url VARCHAR(500),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_paper_id) REFERENCES exam_papers(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    INDEX idx_related_paper (related_paper_id),
    INDEX idx_notifications_user_read (user_id, is_read, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- AUDIT & LOGGING
-- =====================================================

-- Audit Logs Table (System-wide audit trail)
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- VIEWS
-- =====================================================

-- View: Papers awaiting HOD approval
CREATE VIEW hod_pending_approvals AS
SELECT 
    ep.id,
    ep.paper_code,
    ep.status,
    ep.exam_type,
    c.code as course_code,
    c.title as course_name,
    CONCAT(u.first_name, ' ', u.last_name) as lecturer_name,
    ep.submitted_at,
    ep.hod_id,
    d.name as department_name,
    GROUP_CONCAT(DISTINCT p.code ORDER BY p.code SEPARATOR ', ') as programmes
FROM exam_papers ep
JOIN courses c ON ep.course_id = c.id
JOIN users u ON ep.created_by = u.id
LEFT JOIN departments d ON c.department_id = d.id
LEFT JOIN exam_paper_programmes epp ON ep.id = epp.exam_paper_id
LEFT JOIN programmes p ON epp.programme_id = p.id
WHERE ep.status IN ('submitted', 'hod_review')
GROUP BY ep.id, ep.paper_code, ep.status, ep.exam_type, c.code, c.title, 
         u.first_name, u.last_name, ep.submitted_at, ep.hod_id, d.name;

-- View: Papers ready for printing (Exam Master view)
CREATE VIEW papers_ready_for_print AS
SELECT 
    ep.id,
    ep.paper_code,
    ep.status,
    ep.exam_type,
    ep.exam_date,
    c.code as course_code,
    c.title as course_name,
    ep.total_marks,
    ep.duration,
    ep.hod_approved_at,
    ep.print_quantity,
    d.name as department_name,
    col.name as college_name,
    GROUP_CONCAT(DISTINCT p.code ORDER BY p.code SEPARATOR ', ') as programmes,
    GROUP_CONCAT(DISTINCT p.name ORDER BY p.code SEPARATOR ' | ') as programme_names
FROM exam_papers ep
JOIN courses c ON ep.course_id = c.id
LEFT JOIN departments d ON c.department_id = d.id
LEFT JOIN colleges col ON c.college_id = col.id
LEFT JOIN exam_paper_programmes epp ON ep.id = epp.exam_paper_id
LEFT JOIN programmes p ON epp.programme_id = p.id
WHERE ep.status IN ('ready_for_print', 'printing')
GROUP BY ep.id, ep.paper_code, ep.status, ep.exam_type, ep.exam_date,
         c.code, c.title, ep.total_marks, ep.duration, ep.hod_approved_at,
         ep.print_quantity, d.name, col.name;

-- View: Lecturer permissions summary
CREATE VIEW lecturer_permissions_summary AS
SELECT 
    u.id as lecturer_id,
    CONCAT(u.first_name, ' ', u.last_name) as lecturer_name,
    c.code as course_code,
    c.title as course_name,
    lp.can_add_questions,
    lp.can_create_papers,
    lp.granted_at,
    lp.expires_at,
    CONCAT(hod.first_name, ' ', hod.last_name) as granted_by_name
FROM lecturer_permissions lp
JOIN users u ON lp.lecturer_id = u.id
JOIN courses c ON lp.course_id = c.id
JOIN users hod ON lp.granted_by = hod.id
WHERE lp.is_active = TRUE;

-- View: Papers summary by status
CREATE VIEW papers_by_status_summary AS
SELECT 
    status,
    exam_type,
    COUNT(*) as count,
    MIN(created_at) as oldest_paper,
    MAX(created_at) as newest_paper
FROM exam_papers
GROUP BY status, exam_type;

-- View: Active programmes with course counts
CREATE VIEW programmes_summary AS
SELECT 
    p.id,
    p.code,
    p.name,
    p.level,
    p.duration_years,
    d.name as department_name,
    col.name as college_name,
    COUNT(DISTINCT epp.exam_paper_id) as total_exam_papers,
    p.is_active
FROM programmes p
LEFT JOIN departments d ON p.department_id = d.id
LEFT JOIN colleges col ON p.college_id = col.id
LEFT JOIN exam_paper_programmes epp ON p.id = epp.programme_id
GROUP BY p.id, p.code, p.name, p.level, p.duration_years, 
         d.name, col.name, p.is_active;

-- View: Papers by programme and status
CREATE VIEW papers_by_programme AS
SELECT 
    p.code as programme_code,
    p.name as programme_name,
    ep.status,
    ep.exam_type,
    ep.academic_year,
    ep.semester,
    c.code as course_code,
    c.title as course_title,
    ep.paper_code,
    ep.exam_date,
    CONCAT(u.first_name, ' ', u.last_name) as created_by_name
FROM programmes p
JOIN exam_paper_programmes epp ON p.id = epp.programme_id
JOIN exam_papers ep ON epp.exam_paper_id = ep.id
JOIN courses c ON ep.course_id = c.id
JOIN users u ON ep.created_by = u.id
ORDER BY p.code, ep.academic_year DESC, ep.semester DESC;

-- =====================================================
-- TRIGGERS
-- =====================================================

DELIMITER //

-- Trigger: Update exam paper total marks when questions are added/updated
CREATE TRIGGER update_paper_total_marks
AFTER INSERT ON exam_paper_questions
FOR EACH ROW
BEGIN
    UPDATE exam_papers 
    SET total_marks = (
        SELECT COALESCE(SUM(marks), 0) 
        FROM exam_paper_questions 
        WHERE exam_paper_id = NEW.exam_paper_id
    )
    WHERE id = NEW.exam_paper_id;
END//

-- Trigger: Increment question usage count when added to paper
CREATE TRIGGER increment_question_usage
AFTER INSERT ON exam_paper_questions
FOR EACH ROW
BEGIN
    UPDATE questions 
    SET usage_count = usage_count + 1 
    WHERE id = NEW.question_id;
END//

-- Trigger: Create notification when paper is submitted
CREATE TRIGGER notify_hod_on_submission
AFTER UPDATE ON exam_papers
FOR EACH ROW
BEGIN
    IF OLD.status = 'draft' AND NEW.status = 'submitted' THEN
        INSERT INTO notifications (user_id, type, title, message, related_paper_id, priority)
        VALUES (
            NEW.hod_id,
            'approval_required',
            CONCAT('New ', NEW.exam_type, ' paper awaiting approval'),
            CONCAT('Paper ', NEW.paper_code, ' has been submitted for approval'),
            NEW.id,
            'high'
        );
    END IF;
END//

-- Trigger: Notify lecturer when paper is approved
CREATE TRIGGER notify_lecturer_on_approval
AFTER UPDATE ON exam_papers
FOR EACH ROW
BEGIN
    IF OLD.status = 'hod_review' AND NEW.status = 'hod_approved' THEN
        INSERT INTO notifications (user_id, type, title, message, related_paper_id, priority)
        VALUES (
            NEW.created_by,
            'paper_approved',
            CONCAT('Paper ', NEW.paper_code, ' approved'),
            CONCAT('Your ', NEW.exam_type, ' paper has been approved by HOD'),
            NEW.id,
            'medium'
        );
    END IF;
END//

-- Trigger: Notify exam master when paper is ready for print
CREATE TRIGGER notify_exam_master_on_ready
AFTER UPDATE ON exam_papers
FOR EACH ROW
BEGIN
    IF OLD.status != 'ready_for_print' AND NEW.status = 'ready_for_print' THEN
        -- Notify all exam masters
        INSERT INTO notifications (user_id, type, title, message, related_paper_id, priority)
        SELECT 
            id,
            'ready_for_print',
            CONCAT('Paper ', NEW.paper_code, ' ready for printing'),
            CONCAT(NEW.exam_type, ' paper approved and ready for printing'),
            NEW.id,
            'high'
        FROM users
        WHERE role = 'exam_master' AND is_active = TRUE;
    END IF;
END//

-- Trigger: Validate at least one programme is assigned to paper before submission
CREATE TRIGGER validate_programmes_before_submit
BEFORE UPDATE ON exam_papers
FOR EACH ROW
BEGIN
    DECLARE prog_count INT;
    
    -- Only check when transitioning from draft to submitted
    IF OLD.status = 'draft' AND NEW.status = 'submitted' THEN
        SELECT COUNT(*) INTO prog_count
        FROM exam_paper_programmes
        WHERE exam_paper_id = NEW.id;
        
        IF prog_count = 0 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cannot submit paper: At least one programme must be assigned';
        END IF;
    END IF;
END//

-- Trigger: Log programme changes in workflow history
CREATE TRIGGER log_programme_assignment
AFTER INSERT ON exam_paper_programmes
FOR EACH ROW
BEGIN
    INSERT INTO workflow_history (
        exam_paper_id,
        action,
        from_status,
        to_status,
        actor_id,
        actor_role,
        comments,
        metadata
    )
    SELECT 
        NEW.exam_paper_id,
        'updated',
        ep.status,
        ep.status,
        ep.created_by,
        u.role,
        'Programme assigned to paper',
        JSON_OBJECT('programme_id', NEW.programme_id, 'action', 'programme_added')
    FROM exam_papers ep
    JOIN users u ON ep.created_by = u.id
    WHERE ep.id = NEW.exam_paper_id;
END//

DELIMITER ;

-- =====================================================
-- ROLE-BASED DOCUMENTATION
-- =====================================================

/*
ROLE DEFINITIONS:

1. LECTURER
   - Creates/sets exam papers
   - Can add questions WITH PERMISSION from HOD
   - Submits papers for HOD approval
   - Views their own papers and feedback

2. HOD (Head of Department)
   - Creates courses and study units
   - Creates questions for study units
   - Grants permission to specific lecturers to add questions
   - Approves ALL exams (both CATs and FINALS)
   - Reviews and provides feedback on papers

3. DEAN
   - Oversees college-level approvals
   - Can review papers across departments in their college
   - Provides high-level oversight

4. EXAM MASTER
   - Views all HOD-approved papers
   - Handles printing of approved exams
   - Tracks printing status and quantities
   - Manages exam distribution

5. ADMIN
   - Full system access
   - Administrative support
   - User management
   - System configuration
   - Can perform actions on behalf of other roles

WORKFLOW:
1. Lecturer creates paper (draft)
2. Lecturer submits paper → status: 'submitted'
3. HOD reviews → status: 'hod_review'
4. HOD approves → status: 'hod_approved' → status: 'ready_for_print'
5. Exam Master prints → status: 'printing' → 'printed'
6. Paper published → status: 'published'

ALTERNATIVE PATH:
- HOD rejects → status: 'hod_rejected' → back to Lecturer for revision
- Dean can oversee and provide feedback at any stage
*/

-- =====================================================
-- END OF SCHEMA
-- =====================================================