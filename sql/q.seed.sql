
INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- multiple_choice (10)
(1, 1, 20, 'multiple_choice', 'easy', 'Which of the following is NOT a fundamental component of a computer?', JSON_ARRAY('CPU','Memory','Printer','Operating System'), 'Printer', 1, 10, 'Identify core computer components', 'hardware,components', 'remember', JSON_ARRAY('fundamentals','mcq'), 0, TRUE, 7, NULL),
(1, 2, 20, 'multiple_choice', 'easy', 'Which language is considered a low-level programming language?', JSON_ARRAY('Python','C','Assembly','Java'), 'Assembly', 2, 15, 'Distinguish low- and high-level languages', 'programming,languages', 'understand', JSON_ARRAY('languages','mcq'), 0, TRUE, 7, NULL),
(1, 1, 20, 'multiple_choice', 'medium','What data structure uses LIFO ordering?', JSON_ARRAY('Queue','Stack','Heap','Graph'), 'Stack', 2, 20, 'Explain LIFO and FIFO', 'data-structures,LIFO', 'understand', JSON_ARRAY('ds','mcq'), 0, TRUE, 7, NULL),
(1, 2, 20, 'multiple_choice', 'medium', 'Which sorting algorithm has average-case time complexity O(n log n)?', JSON_ARRAY('Bubble Sort','Insertion Sort','Merge Sort','Selection Sort'), 'Merge Sort', 3, 25, 'Select appropriate sorting algorithms', 'sorting,algorithms', 'apply', JSON_ARRAY('algorithms','mcq'), 0, TRUE, 7, NULL),
(1, 1, 20, 'multiple_choice', 'hard', 'Which graph traversal method is best for finding shortest path in an unweighted graph?', JSON_ARRAY('Depth-first search','Breadth-first search','Dijkstra','A*'), 'Breadth-first search', 3, 30, 'Apply graph traversal for shortest path', 'graphs,shortest-path', 'apply', JSON_ARRAY('graphs','mcq'), 0, TRUE, 7, NULL),
(1, 2, 20, 'multiple_choice', 'easy','Which of these is a volatile memory type?', JSON_ARRAY('SSD','HDD','RAM','ROM'), 'RAM', 1, 10, 'Differentiate volatile vs non-volatile memory', 'memory,ram', 'remember', JSON_ARRAY('hardware','mcq'), 0, TRUE, 7, NULL),
(1, 1, 20, 'multiple_choice', 'medium', 'Which OS scheduling concept allows multiple processes to share CPU time fairly?', JSON_ARRAY('Multithreading','Time slicing','Interrupts','DMA'), 'Time slicing', 2, 20, 'Understand CPU scheduling basics', 'os,scheduling', 'understand', JSON_ARRAY('os','mcq'), 0, TRUE, 7, NULL),
(1, 2, 20, 'multiple_choice', 'hard', 'In Big-O notation which function grows fastest as n increases?', JSON_ARRAY('n^2','n log n','n','log n'), 'n^2', 3, 25, 'Analyze algorithmic complexity', 'big-o,complexity', 'analyze', JSON_ARRAY('algorithms','mcq'), 0, TRUE, 7, NULL),
(1, 1, 20, 'multiple_choice', 'medium', 'Which structure best represents key–value pairs for fast lookup?', JSON_ARRAY('Array','Linked List','Hash Table','Stack'),'Hash Table', 2, 15, 'Choose data structures for lookup', 'hash,lookup', 'apply', JSON_ARRAY('ds','mcq'), 0, TRUE, 7, NULL),
(1, 2, 20, 'multiple_choice', 'easy', 'Which symbol commonly denotes a comment in C-style languages?', JSON_ARRAY('\\/\\/','##','--','/* */'), '//', 1, 10, 'Recognize comment syntax', 'syntax,comments', 'remember', JSON_ARRAY('syntax','mcq'), 0, TRUE, 7, NULL),

-- true_false (10)
(1, 1, 20, 'true_false', 'easy', 'A compiler translates source code to machine code before execution.', NULL, 'true', 1, 10, 'Explain compilation vs interpretation', 'compiler,translation', 'remember', JSON_ARRAY('tf','compilation'), 0, TRUE, 7, NULL),
(1, 2, 20, 'true_false', 'easy', 'RAM retains its data even after the computer is turned off.', NULL, 'false', 1, 5, 'Differentiate volatile memory', 'ram,volatile', 'remember', JSON_ARRAY('tf','memory'), 0, TRUE, 7, NULL),
(1, 1, 20, 'true_false', 'medium', 'Depth-first search uses a queue data structure internally.', NULL, 'false', 2, 10, 'Understand DFS implementation', 'dfs,queue,stack', 'understand', JSON_ARRAY('tf','graphs'), 0, TRUE, 7, NULL),
(1, 2, 20, 'true_false', 'medium', 'A linked list provides O(1) time to access an element by index.', NULL, 'false', 2, 10, 'Assess linked list properties', 'linked-list,access-time', 'analyze', JSON_ARRAY('tf','ds'), 0, TRUE, 7, NULL),
(1, 1, 20, 'true_false', 'easy', 'High-level languages abstract hardware details from the programmer.', NULL, 'true', 1, 5, 'Describe features of high-level languages', 'high-level,abstraction', 'remember', JSON_ARRAY('tf','languages'), 0, TRUE, 7, NULL),
(1, 2, 20, 'true_false', 'hard', 'Dijkstra''s algorithm works correctly with negative edge weights.', NULL, 'false', 3, 15, 'Evaluate algorithm constraints', 'dijkstra,graphs', 'evaluate', JSON_ARRAY('tf','algorithms'), 0, TRUE, 7, NULL),
(1, 1, 20, 'true_false', 'medium', 'Concurrency problems can include race conditions and deadlocks.', NULL, 'true', 2, 10, 'Identify concurrency issues', 'concurrency,deadlock', 'understand', JSON_ARRAY('tf','os'), 0, TRUE, 7, NULL),
(1, 2, 20, 'true_false', 'easy', 'HTML is a programming language used for general computation.', NULL, 'false', 1, 5, 'Recognize markup vs programming languages', 'html,markup', 'remember', JSON_ARRAY('tf','web'), 0, TRUE, 7, NULL),
(1, 1, 20, 'true_false', 'medium', 'A stack overflow occurs when too many function calls are nested.', NULL, 'true', 2, 10, 'Explain runtime errors', 'stack-overflow,recursion', 'understand', JSON_ARRAY('tf','errors'), 0, TRUE, 7, NULL),
(1, 2, 20, 'true_false', 'medium', 'Normalization reduces data redundancy in relational databases.', NULL, 'true', 2, 10, 'Apply normalization principles', 'database,normalization', 'apply', JSON_ARRAY('tf','db'), 0, TRUE, 7, NULL),

-- short_answer (10)
(1, 1, 20, 'short_answer', 'easy', 'Define what an algorithm is.', NULL, 'A step-by-step procedure for solving a problem or performing a task.', 2, 15, 'Define algorithms', 'algorithm,definition', 'remember', JSON_ARRAY('short','definition'), 0, TRUE, 7, NULL),
(1, 2, 20, 'short_answer', 'easy', 'Give two examples of non-volatile storage.', NULL, 'Hard disk drive (HDD) and Solid State Drive (SSD).', 2, 10, 'Identify storage types', 'storage,non-volatile', 'remember', JSON_ARRAY('short','storage'), 0, TRUE, 7, NULL),
(1, 1, 20, 'short_answer', 'medium', 'Explain the difference between compile-time and run-time errors.', NULL, 'Compile-time errors occur during compilation; run-time errors occur during program execution.', 3, 20, 'Differentiate error types', 'errors,compile,run', 'understand', JSON_ARRAY('short','errors'), 0, TRUE, 7, NULL),
(1, 2, 20, 'short_answer', 'medium', 'What is the purpose of an index in a database?', NULL, 'To speed up data retrieval by providing a lookup structure for rows matching search criteria.', 3, 15, 'Explain indexes', 'db,index', 'apply', JSON_ARRAY('short','db'), 0, TRUE, 7, NULL),
(1, 1, 20, 'short_answer', 'hard', 'Describe how a hash table handles collisions (name one method).', NULL, 'Open addressing (probing) or chaining using linked lists.', 4, 25, 'Discuss collision resolution', 'hash,collision', 'analyze', JSON_ARRAY('short','hash'), 0, TRUE, 7, NULL),
(1, 2, 20, 'short_answer', 'easy', 'What does CPU stand for?', NULL, 'Central Processing Unit', 1, 5, 'Recall CPU acronym', 'cpu,acronym', 'remember', JSON_ARRAY('short','hardware'), 0, TRUE, 7, NULL),
(1, 1, 20, 'short_answer', 'medium', 'Name one advantage of using a linked list over an array.', NULL, 'Dynamic size and efficient insertion/deletion at arbitrary positions.', 2, 15, 'Compare data structures', 'linked-list,array', 'understand', JSON_ARRAY('short','ds'), 0, TRUE, 7, NULL),
(1, 2, 20, 'short_answer', 'medium', 'Briefly explain what encapsulation is in OOP.', NULL, 'Encapsulation bundles data and methods; restricts direct access to some components.', 3, 20, 'Explain OOP principle', 'oop,encapsulation', 'understand', JSON_ARRAY('short','oop'), 0, TRUE, 7, NULL),
(1, 1, 20, 'short_answer', 'hard', 'What is the time complexity of binary search on a sorted array?', NULL, 'O(log n)', 3, 15, 'Compute search complexity', 'binary-search,complexity', 'apply', JSON_ARRAY('short','algorithms'), 0, TRUE, 7, NULL),
(1, 2, 20, 'short_answer', 'easy', 'List one example of an operating system.', NULL, 'Linux', 1, 5, 'Recognize OS examples', 'os,examples', 'remember', JSON_ARRAY('short','os'), 0, TRUE, 7, NULL),

-- essay (10)
(1, 1, 20, 'essay', 'hard', 'Discuss the evolution of programming paradigms from procedural to object-oriented and functional programming. Include advantages and disadvantages of each.', NULL, NULL, 15, 120, 'Assess programming paradigms', 'paradigms,history', 'analyze', JSON_ARRAY('essay','programming'), 0, TRUE, 7, NULL),
(1, 2, 20, 'essay', 'hard', 'Critically evaluate the impact of open source software on software development and business models.', NULL, NULL, 15, 120, 'Evaluate open source effects', 'open-source,business', 'evaluate', JSON_ARRAY('essay','opensource'), 0, TRUE, 7, NULL),
(1, 1, 20, 'essay', 'hard', 'Explain how modern operating systems manage memory and process scheduling. Provide examples.', NULL, NULL, 15, 150, 'Analyze OS memory and scheduling', 'os,memory,scheduling', 'analyze', JSON_ARRAY('essay','os'), 0, TRUE, 7, NULL),
(1, 2, 20, 'essay', 'hard', 'Discuss security challenges in networked systems and propose mitigation strategies.', NULL, NULL, 15, 120, 'Evaluate network security', 'security,networks', 'evaluate', JSON_ARRAY('essay','security'), 0, TRUE, 7, NULL),
(1, 1, 20, 'essay', 'medium', 'Describe software testing types and argue how they contribute to software quality.', NULL, NULL, 10, 90, 'Discuss testing types', 'testing,quality', 'understand', JSON_ARRAY('essay','testing'), 0, TRUE, 7, NULL),
(1, 2, 20, 'essay', 'medium', 'Examine the role of algorithms in solving real-world problems and the trade-offs involved.', NULL, NULL, 10, 100, 'Discuss algorithm role', 'algorithms,tradeoffs', 'analyze', JSON_ARRAY('essay','algorithms'), 0, TRUE, 7, NULL),
(1, 1, 20, 'essay', 'hard', 'Assess the ethical implications of AI deployment in critical sectors like healthcare and finance.', NULL, NULL, 15, 120, 'Evaluate AI ethics', 'ai,ethics', 'evaluate', JSON_ARRAY('essay','ai'), 0, TRUE, 7, NULL),
(1, 2, 20, 'essay', 'medium', 'Discuss cloud computing models (IaaS, PaaS, SaaS) and their pros/cons for small businesses.', NULL, NULL, 10, 90, 'Explain cloud models', 'cloud,models', 'understand', JSON_ARRAY('essay','cloud'), 0, TRUE, 7, NULL),
(1, 1, 20, 'essay', 'hard', 'Compare centralized vs distributed systems and explain when each is preferable.', NULL, NULL, 15, 120, 'Analyze system architectures', 'distributed,centralized', 'analyze', JSON_ARRAY('essay','systems'), 0, TRUE, 7, NULL),
(1, 2, 20, 'essay', 'medium', 'Outline the software development lifecycle and justify why a chosen lifecycle fits a hypothetical project.', NULL, NULL, 10, 90, 'Apply SDLC selection', 'sdlc,project', 'apply', JSON_ARRAY('essay','sdlc'), 0, TRUE, 7, NULL),

-- practical (10)
(1, 1, 20, 'practical', 'medium', 'Write a program that reads a list of integers and outputs the sorted list. Provide source code and brief explanation.', NULL, NULL, 10, 120, 'Implement sorting program', 'programming,sorting', 'apply', JSON_ARRAY('practical','coding'), 0, TRUE, 7, NULL),
(1, 2, 20, 'practical', 'hard', 'Design and implement a simple hash table with insert and search operations; demonstrate collision handling.', NULL, NULL, 12, 150, 'Build hash table', 'hash,implementation', 'create', JSON_ARRAY('practical','ds'), 0, TRUE, 7, NULL),
(1, 1, 20, 'practical', 'medium', 'Set up a small client-server application and demonstrate message passing between them.', NULL, NULL, 10, 120, 'Demonstrate client-server comms', 'network,client-server', 'apply', JSON_ARRAY('practical','network'), 0, TRUE, 7, NULL),
(1, 2, 20, 'practical', 'hard', 'Perform a benchmark comparing two sorting algorithms on large input and report time measurements and analysis.', NULL, NULL, 12, 180, 'Benchmark algorithms', 'benchmark,sorting', 'analyze', JSON_ARRAY('practical','benchmark'), 0, TRUE, 7, NULL),
(1, 1, 20, 'practical', 'medium', 'Create a normalized database schema for a small library system and provide SQL CREATE statements.', NULL, NULL, 10, 120, 'Design normalized schema', 'database,normalization', 'create', JSON_ARRAY('practical','db'), 0, TRUE, 7, NULL),
(1, 2, 20, 'practical', 'hard', 'Implement a simple interpreter for arithmetic expressions (support +, -, *, /) and show tests.', NULL, NULL, 12, 180, 'Build interpreter', 'interpreter,parser', 'create', JSON_ARRAY('practical','compilers'), 0, TRUE, 7, NULL),
(1, 1, 20, 'practical', 'medium', 'Deploy a static website to a simple web server and document the steps taken.', NULL, NULL, 8, 90, 'Deploy static site', 'deployment,web', 'apply', JSON_ARRAY('practical','web'), 0, TRUE, 7, NULL),
(1, 2, 20, 'practical', 'medium', 'Write unit tests for a given module and show coverage results.', NULL, NULL, 8, 90, 'Create unit tests', 'testing,unit-tests', 'apply', JSON_ARRAY('practical','testing'), 0, TRUE, 7, NULL),
(1, 1, 20, 'practical', 'hard', 'Design and implement a small file system simulation supporting basic operations.', NULL, NULL, 12, 180, 'Simulate file system', 'file-system,simulation', 'create', JSON_ARRAY('practical','os'), 0, TRUE, 7, NULL),
(1, 2, 20, 'practical', 'medium', 'Create a REST API endpoint that returns JSON data and document the endpoint and example requests.', NULL, NULL, 8, 90, 'Build REST API endpoint', 'api,rest', 'apply', JSON_ARRAY('practical','api'), 0, TRUE, 7, NULL),

-- case_study (10)
(1, 1, 20, 'case_study', 'hard', 'A local business needs an inventory system. Analyze requirements and propose a software solution, including architecture and database design.', NULL, NULL, 15, 180, 'Analyze requirements and design solution', 'case-study,inventory', 'create', JSON_ARRAY('case','design'), 0, TRUE, 7, NULL),
(1, 2, 20, 'case_study', 'hard', 'A hospital wants to digitize patient records. Discuss privacy, security, and usability concerns and propose mitigation strategies.', NULL, NULL, 15, 180, 'Evaluate privacy and design', 'case-study,health', 'evaluate', JSON_ARRAY('case','security'), 0, TRUE, 7, NULL),
(1, 1, 20, 'case_study', 'medium', 'Analyze the migration of a legacy monolith to microservices for an e-commerce platform; include risks and testing strategy.', NULL, NULL, 12, 150, 'Assess migration trade-offs', 'case-study,microservices', 'analyze', JSON_ARRAY('case','architecture'), 0, TRUE, 7, NULL),
(1, 2, 20, 'case_study', 'hard', 'A school wants an online exam system with secure delivery. Recommend architecture, security controls, and operational procedures.', NULL, NULL, 15, 180, 'Design secure exam system', 'case-study,exams', 'create', JSON_ARRAY('case','security'), 0, TRUE, 7, NULL),
(1, 1, 20, 'case_study', 'medium', 'Evaluate implementing analytics for user behavior on a learning platform; identify metrics and data collection concerns.', NULL, NULL, 10, 120, 'Propose analytics strategy', 'case-study,analytics', 'evaluate', JSON_ARRAY('case','analytics'), 0, TRUE, 7, NULL),
(1, 2, 20, 'case_study', 'hard', 'A fintech startup needs secure transaction processing. Propose a secure architecture and compliance considerations.', NULL, NULL, 15, 180, 'Design secure transaction system', 'case-study,fintech', 'create', JSON_ARRAY('case','security'), 0, TRUE, 7, NULL),
(1, 1, 20, 'case_study', 'medium', 'Recommend a disaster recovery plan for a small online service with RTO and RPO targets.', NULL, NULL, 10, 120, 'Plan disaster recovery', 'case-study,dr', 'apply', JSON_ARRAY('case','dr'), 0, TRUE, 7, NULL),
(1, 2, 20, 'case_study', 'hard', 'Assess the impact of adopting container orchestration for a medium-sized company and recommend transition steps.', NULL, NULL, 15, 180, 'Analyze orchestration adoption', 'case-study,containers', 'analyze', JSON_ARRAY('case','containers'), 0, TRUE, 7, NULL),
(1, 1, 20, 'case_study', 'medium', 'Design a caching strategy to improve performance of a read-heavy web application and discuss cache invalidation.', NULL, NULL, 10, 120, 'Propose caching strategy', 'case-study,caching', 'apply', JSON_ARRAY('case','performance'), 0, TRUE, 7, NULL),
(1, 2, 20, 'case_study', 'hard', 'A logistics company needs route optimization; propose an algorithmic approach and discuss scalability.', NULL, NULL, 15, 180, 'Design route optimization', 'case-study,logistics', 'create', JSON_ARRAY('case','algorithms'), 0, TRUE, 7, NULL);

INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- CSC1202: Programming Fundamentals (Course ID: 2) - Multiple Choice
(2, 3, 7, 'multiple_choice', 'easy', 'Which of the following is NOT a valid data type in most programming languages?', JSON_ARRAY('integer', 'float', 'boolean', 'stringarray'), 'stringarray', 2, 3, 'Identify basic data types in programming', 'data types, variables', 'remember', JSON_ARRAY('fundamentals', 'mcq'), 0, TRUE, 7, NULL),
(2, 3, 7, 'multiple_choice', 'medium', 'What is the purpose of a compiler in programming?', JSON_ARRAY('Debugs program errors', 'Converts high-level code to machine code', 'Executes the program', 'Stores program data'), 'Converts high-level code to machine code', 2, 3, 'Understand the role of compilers', 'compiler, translation', 'understand', JSON_ARRAY('compilation', 'mcq'), 0, TRUE, 7, NULL),
(2, 4, 7, 'multiple_choice', 'medium', 'Which loop structure is guaranteed to execute at least once?', JSON_ARRAY('for', 'while', 'do-while', 'if-else'), 'do-while', 2, 3, 'Differentiate between loop structures', 'loops, control structures', 'understand', JSON_ARRAY('control-flow', 'mcq'), 0, TRUE, 7, NULL),
(2, 4, 7, 'multiple_choice', 'medium', 'What does the term "variable scope" refer to?', JSON_ARRAY('Variable data type', 'Where a variable can be accessed in the program', 'Variable memory address', 'Variable value range'), 'Where a variable can be accessed in the program', 2, 3, 'Understand variable scope concepts', 'scope, variables', 'understand', JSON_ARRAY('variables', 'mcq'), 0, TRUE, 7, NULL),
(2, 3, 7, 'multiple_choice', 'easy', 'Which operator is used for assignment in most programming languages?', JSON_ARRAY('==', '=', '===', ':='), '=', 2, 2, 'Identify basic operators', 'operators, assignment', 'remember', JSON_ARRAY('syntax', 'mcq'), 0, TRUE, 7, NULL),

-- CSC1202: True/False Questions
(2, 3, 7, 'true_false', 'easy', 'A function must always return a value.', NULL, 'false', 1, 2, 'Understand function behavior', 'functions, return values', 'understand', JSON_ARRAY('functions', 'tf'), 0, TRUE, 7, NULL),
(2, 4, 7, 'true_false', 'easy', 'Arrays can store multiple values of different data types.', NULL, 'false', 1, 2, 'Understand array properties', 'arrays, data types', 'remember', JSON_ARRAY('arrays', 'tf'), 0, TRUE, 7, NULL),
(2, 3, 7, 'true_false', 'easy', 'Comments in code are executed by the computer.', NULL, 'false', 1, 2, 'Understand code documentation', 'comments, execution', 'remember', JSON_ARRAY('syntax', 'tf'), 0, TRUE, 7, NULL),
(2, 4, 7, 'true_false', 'easy', 'Pseudocode is an actual programming language.', NULL, 'false', 1, 2, 'Recognize pseudocode purpose', 'pseudocode, planning', 'remember', JSON_ARRAY('planning', 'tf'), 0, TRUE, 7, NULL),
(2, 3, 7, 'true_false', 'easy', 'The main() function is the entry point of a program in C-based languages.', NULL, 'true', 1, 2, 'Identify program structure', 'main function, entry point', 'remember', JSON_ARRAY('structure', 'tf'), 0, TRUE, 7, NULL),

-- CSC1202: Short Answer Questions
(2, 4, 7, 'short_answer', 'medium', 'What is the difference between "==" and "=" operators?', NULL, '== is comparison operator, = is assignment operator', 3, 5, 'Differentiate between comparison and assignment', 'operators, comparison, assignment', 'understand', JSON_ARRAY('operators', 'short-answer'), 0, TRUE, 7, NULL),
(2, 3, 7, 'short_answer', 'easy', 'Explain what a syntax error is.', NULL, 'A syntax error occurs when code violates the programming language rules', 3, 4, 'Identify common programming errors', 'syntax, errors, debugging', 'understand', JSON_ARRAY('errors', 'short-answer'), 0, TRUE, 7, NULL),
(2, 4, 7, 'short_answer', 'medium', 'What is the purpose of conditional statements in programming?', NULL, 'To make decisions and execute different code blocks based on conditions', 3, 5, 'Apply conditional logic', 'conditionals, decision-making', 'apply', JSON_ARRAY('control-flow', 'short-answer'), 0, TRUE, 7, NULL),
(2, 3, 7, 'short_answer', 'medium', 'Define what an algorithm is.', NULL, 'A step-by-step procedure for solving a problem or accomplishing a task', 3, 4, 'Understand algorithmic thinking', 'algorithms, problem-solving', 'understand', JSON_ARRAY('algorithms', 'short-answer'), 0, TRUE, 7, NULL),
(2, 4, 7, 'short_answer', 'hard', 'Explain the concept of variable initialization.', NULL, 'Assigning an initial value to a variable when it is declared', 4, 5, 'Apply proper variable declaration practices', 'variables, initialization, declaration', 'apply', JSON_ARRAY('variables', 'short-answer'), 0, TRUE, 7, NULL),

-- CSC1202: Essay Questions
(2, 3, 7, 'essay', 'medium', 'Discuss the importance of code documentation and comments in programming.', NULL, 'Code documentation helps maintainability, collaboration, and understanding of code purpose and logic', 10, 15, 'Apply documentation best practices', 'documentation, comments, maintainability', 'evaluate', JSON_ARRAY('documentation', 'essay'), 0, TRUE, 7, NULL),
(2, 4, 7, 'essay', 'hard', 'Compare and contrast while loops and for loops, including when to use each.', NULL, 'While loops for unknown iterations, for loops for known iterations with counter', 12, 20, 'Analyze loop structures and applications', 'loops, control structures, iteration', 'analyze', JSON_ARRAY('loops', 'essay'), 0, TRUE, 7, NULL),
(2, 3, 7, 'essay', 'medium', 'Explain the concept of data types and why they are important in programming.', NULL, 'Data types define the kind of data and operations that can be performed, ensuring type safety', 10, 15, 'Understand data type significance', 'data types, type safety, operations', 'understand', JSON_ARRAY('data-types', 'essay'), 0, TRUE, 7, NULL),
(2, 4, 7, 'essay', 'hard', 'Describe the software development lifecycle and the role of programming within it.', NULL, 'SDLC includes planning, design, implementation, testing, deployment, and maintenance', 15, 25, 'Understand software development process', 'SDLC, development process, programming', 'analyze', JSON_ARRAY('process', 'essay'), 0, TRUE, 7, NULL),
(2, 3, 7, 'essay', 'medium', 'Discuss common programming errors and strategies for debugging them.', NULL, 'Syntax errors, logical errors, runtime errors; debugging with print statements, debuggers, and systematic testing', 10, 20, 'Apply debugging techniques', 'errors, debugging, testing', 'apply', JSON_ARRAY('debugging', 'essay'), 0, TRUE, 7, NULL),

-- CSC2103: Data Structures & Algorithms (Course ID: 3) - Multiple Choice
(3, 5, 7, 'multiple_choice', 'easy', 'Which data structure follows the LIFO (Last-In-First-Out) principle?', JSON_ARRAY('Queue', 'Stack', 'Array', 'Linked List'), 'Stack', 2, 3, 'Identify basic data structure properties', 'LIFO, stack, queue', 'remember', JSON_ARRAY('fundamentals', 'mcq'), 0, TRUE, 7, NULL),
(3, 5, 7, 'multiple_choice', 'medium', 'What is the time complexity of binary search on a sorted array?', JSON_ARRAY('O(1)', 'O(n)', 'O(log n)', 'O(n log n)'), 'O(log n)', 3, 4, 'Analyze search algorithm complexity', 'binary search, time complexity', 'analyze', JSON_ARRAY('algorithms', 'mcq'), 0, TRUE, 7, NULL),
(3, 6, 7, 'multiple_choice', 'medium', 'Which sorting algorithm has the worst-case time complexity of O(n²)?', JSON_ARRAY('Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'), 'Bubble Sort', 3, 4, 'Compare sorting algorithm performance', 'sorting, time complexity', 'analyze', JSON_ARRAY('sorting', 'mcq'), 0, TRUE, 7, NULL),
(3, 5, 7, 'multiple_choice', 'hard', 'In a binary tree, what is the maximum number of nodes at level k?', JSON_ARRAY('k', '2k', '2^k', 'log k'), '2^k', 4, 5, 'Understand tree structure properties', 'binary tree, nodes, levels', 'apply', JSON_ARRAY('trees', 'mcq'), 0, TRUE, 7, NULL),
(3, 6, 7, 'multiple_choice', 'medium', 'Which data structure is typically used for implementing recursion?', JSON_ARRAY('Queue', 'Stack', 'Array', 'Tree'), 'Stack', 3, 4, 'Understand recursion implementation', 'recursion, stack, call stack', 'understand', JSON_ARRAY('recursion', 'mcq'), 0, TRUE, 7, NULL),

-- CSC2103: True/False Questions
(3, 5, 7, 'true_false', 'easy', 'A linked list allows constant time access to any element.', NULL, 'false', 1, 2, 'Understand linked list access patterns', 'linked list, access time', 'remember', JSON_ARRAY('linked-list', 'tf'), 0, TRUE, 7, NULL),
(3, 6, 7, 'true_false', 'medium', 'Hash tables provide average O(1) time complexity for insertions and lookups.', NULL, 'true', 2, 3, 'Analyze hash table performance', 'hash tables, time complexity', 'analyze', JSON_ARRAY('hash-tables', 'tf'), 0, TRUE, 7, NULL),
(3, 5, 7, 'true_false', 'easy', 'Arrays have fixed size once allocated in memory.', NULL, 'true', 1, 2, 'Understand array memory allocation', 'arrays, memory, fixed-size', 'remember', JSON_ARRAY('arrays', 'tf'), 0, TRUE, 7, NULL),
(3, 6, 7, 'true_false', 'medium', 'Depth-First Search uses a queue data structure for implementation.', NULL, 'false', 2, 3, 'Differentiate graph traversal methods', 'DFS, BFS, graph traversal', 'understand', JSON_ARRAY('graphs', 'tf'), 0, TRUE, 7, NULL),
(3, 5, 7, 'true_false', 'hard', 'All sorting algorithms can be implemented recursively.', NULL, 'false', 3, 4, 'Evaluate algorithm implementation methods', 'sorting, recursion, iteration', 'evaluate', JSON_ARRAY('sorting', 'tf'), 0, TRUE, 7, NULL),

-- CSC2103: Short Answer Questions
(3, 5, 7, 'short_answer', 'medium', 'Explain the difference between an array and a linked list.', NULL, 'Array has contiguous memory and fixed size, linked list has dynamic size and non-contiguous memory with pointers', 4, 6, 'Compare linear data structures', 'array, linked list, memory allocation', 'understand', JSON_ARRAY('data-structures', 'short-answer'), 0, TRUE, 7, NULL),
(3, 6, 7, 'short_answer', 'medium', 'What is the purpose of a hash function in hash tables?', NULL, 'To map keys to array indices for efficient storage and retrieval', 4, 5, 'Understand hash table mechanisms', 'hash function, hash tables, mapping', 'understand', JSON_ARRAY('hash-tables', 'short-answer'), 0, TRUE, 7, NULL),
(3, 5, 7, 'short_answer', 'hard', 'Describe how the Quick Sort algorithm works.', NULL, 'Uses divide and conquer with pivot element to partition array and recursively sort subarrays', 5, 8, 'Apply sorting algorithm concepts', 'quick sort, partitioning, recursion', 'apply', JSON_ARRAY('sorting', 'short-answer'), 0, TRUE, 7, NULL),
(3, 6, 7, 'short_answer', 'medium', 'What is a binary search tree and what are its properties?', NULL, 'A tree where each node has at most two children, with left child < parent < right child', 4, 6, 'Understand tree data structures', 'BST, binary tree, properties', 'understand', JSON_ARRAY('trees', 'short-answer'), 0, TRUE, 7, NULL),
(3, 5, 7, 'short_answer', 'hard', 'Explain the concept of time-space tradeoff in algorithms.', NULL, 'The balance between algorithm speed and memory usage, where improving one may worsen the other', 5, 7, 'Analyze algorithm efficiency tradeoffs', 'time complexity, space complexity, tradeoffs', 'analyze', JSON_ARRAY('complexity', 'short-answer'), 0, TRUE, 7, NULL),

-- CSC2103: Essay Questions
(3, 5, 7, 'essay', 'hard', 'Compare and contrast arrays and linked lists, discussing their advantages and disadvantages for different use cases.', NULL, 'Arrays better for random access, linked lists better for frequent insertions/deletions', 15, 25, 'Evaluate data structure selection', 'arrays, linked lists, performance', 'evaluate', JSON_ARRAY('data-structures', 'essay'), 0, TRUE, 7, NULL),
(3, 6, 7, 'essay', 'hard', 'Analyze the time and space complexity of various sorting algorithms and recommend the best choice for different scenarios.', NULL, 'Different algorithms optimal for different data sizes and characteristics', 20, 30, 'Analyze sorting algorithm performance', 'sorting, complexity, optimization', 'analyze', JSON_ARRAY('sorting', 'essay'), 0, TRUE, 7, NULL),
(3, 5, 7, 'essay', 'medium', 'Discuss the importance of choosing appropriate data structures in software development and provide examples.', NULL, 'Proper data structures improve efficiency, maintainability, and performance of applications', 12, 20, 'Apply data structure selection principles', 'data structures, software design, efficiency', 'apply', JSON_ARRAY('design', 'essay'), 0, TRUE, 7, NULL),
(3, 6, 7, 'essay', 'hard', 'Explain how hash tables handle collisions and compare different collision resolution techniques.', NULL, 'Separate chaining vs open addressing methods like linear probing and quadratic probing', 18, 25, 'Understand hash table implementation', 'hash tables, collisions, resolution', 'analyze', JSON_ARRAY('hash-tables', 'essay'), 0, TRUE, 7, NULL),
(3, 5, 7, 'essay', 'medium', 'Describe the applications of stacks and queues in real-world computing scenarios.', NULL, 'Stacks for function calls and undo operations, queues for task scheduling and buffering', 12, 20, 'Apply data structures to real problems', 'stacks, queues, applications', 'apply', JSON_ARRAY('applications', 'essay'), 0, TRUE, 7, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- CSC1202: Programming Fundamentals (Course ID: 2) - Multiple Choice
-- Study Unit 3: Variables & Data Types
(2, 3, 7, 'multiple_choice', 'easy', 'Which of the following is NOT a valid data type in most programming languages?', JSON_ARRAY('integer', 'float', 'boolean', 'stringarray'), 'stringarray', 2, 3, 'Identify basic data types in programming', 'data types, variables', 'remember', JSON_ARRAY('fundamentals', 'mcq'), 0, TRUE, 7, NULL),
(2, 3, 7, 'multiple_choice', 'medium', 'What is the purpose of a compiler in programming?', JSON_ARRAY('Debugs program errors', 'Converts high-level code to machine code', 'Executes the program', 'Stores program data'), 'Converts high-level code to machine code', 2, 3, 'Understand the role of compilers', 'compiler, translation', 'understand', JSON_ARRAY('compilation', 'mcq'), 0, TRUE, 7, NULL),
(2, 3, 7, 'multiple_choice', 'easy', 'Which operator is used for assignment in most programming languages?', JSON_ARRAY('==', '=', '===', ':='), '=', 2, 2, 'Identify basic operators', 'operators, assignment', 'remember', JSON_ARRAY('syntax', 'mcq'), 0, TRUE, 7, NULL),

-- Study Unit 4: Control Structures
(2, 4, 7, 'multiple_choice', 'medium', 'Which loop structure is guaranteed to execute at least once?', JSON_ARRAY('for', 'while', 'do-while', 'if-else'), 'do-while', 2, 3, 'Differentiate between loop structures', 'loops, control structures', 'understand', JSON_ARRAY('control-flow', 'mcq'), 0, TRUE, 7, NULL),
(2, 4, 7, 'multiple_choice', 'medium', 'What does the term "variable scope" refer to?', JSON_ARRAY('Variable data type', 'Where a variable can be accessed in the program', 'Variable memory address', 'Variable value range'), 'Where a variable can be accessed in the program', 2, 3, 'Understand variable scope concepts', 'scope, variables', 'understand', JSON_ARRAY('variables', 'mcq'), 0, TRUE, 7, NULL),

-- CSC1202: True/False Questions
-- Study Unit 3: Variables & Data Types
(2, 3, 7, 'true_false', 'easy', 'A function must always return a value.', NULL, 'false', 1, 2, 'Understand function behavior', 'functions, return values', 'understand', JSON_ARRAY('functions', 'tf'), 0, TRUE, 7, NULL),
(2, 3, 7, 'true_false', 'easy', 'Comments in code are executed by the computer.', NULL, 'false', 1, 2, 'Understand code documentation', 'comments, execution', 'remember', JSON_ARRAY('syntax', 'tf'), 0, TRUE, 7, NULL),
(2, 3, 7, 'true_false', 'easy', 'The main() function is the entry point of a program in C-based languages.', NULL, 'true', 1, 2, 'Identify program structure', 'main function, entry point', 'remember', JSON_ARRAY('structure', 'tf'), 0, TRUE, 7, NULL),

-- Study Unit 4: Control Structures
(2, 4, 7, 'true_false', 'easy', 'Arrays can store multiple values of different data types.', NULL, 'false', 1, 2, 'Understand array properties', 'arrays, data types', 'remember', JSON_ARRAY('arrays', 'tf'), 0, TRUE, 7, NULL),
(2, 4, 7, 'true_false', 'easy', 'Pseudocode is an actual programming language.', NULL, 'false', 1, 2, 'Recognize pseudocode purpose', 'pseudocode, planning', 'remember', JSON_ARRAY('planning', 'tf'), 0, TRUE, 7, NULL),

-- CSC1202: Short Answer Questions
-- Study Unit 3: Variables & Data Types
(2, 3, 7, 'short_answer', 'medium', 'What is the difference between "==" and "=" operators?', NULL, '== is comparison operator, = is assignment operator', 3, 5, 'Differentiate between comparison and assignment', 'operators, comparison, assignment', 'understand', JSON_ARRAY('operators', 'short-answer'), 0, TRUE, 7, NULL),
(2, 3, 7, 'short_answer', 'easy', 'Explain what a syntax error is.', NULL, 'A syntax error occurs when code violates the programming language rules', 3, 4, 'Identify common programming errors', 'syntax, errors, debugging', 'understand', JSON_ARRAY('errors', 'short-answer'), 0, TRUE, 7, NULL),
(2, 3, 7, 'short_answer', 'medium', 'Define what an algorithm is.', NULL, 'A step-by-step procedure for solving a problem or accomplishing a task', 3, 4, 'Understand algorithmic thinking', 'algorithms, problem-solving', 'understand', JSON_ARRAY('algorithms', 'short-answer'), 0, TRUE, 7, NULL),

-- Study Unit 4: Control Structures
(2, 4, 7, 'short_answer', 'medium', 'What is the purpose of conditional statements in programming?', NULL, 'To make decisions and execute different code blocks based on conditions', 3, 5, 'Apply conditional logic', 'conditionals, decision-making', 'apply', JSON_ARRAY('control-flow', 'short-answer'), 0, TRUE, 7, NULL),
(2, 4, 7, 'short_answer', 'hard', 'Explain the concept of variable initialization.', NULL, 'Assigning an initial value to a variable when it is declared', 4, 5, 'Apply proper variable declaration practices', 'variables, initialization, declaration', 'apply', JSON_ARRAY('variables', 'short-answer'), 0, TRUE, 7, NULL),

-- CSC1202: Essay Questions
-- Study Unit 3: Variables & Data Types
(2, 3, 7, 'essay', 'medium', 'Discuss the importance of code documentation and comments in programming.', NULL, 'Code documentation helps maintainability, collaboration, and understanding of code purpose and logic', 10, 15, 'Apply documentation best practices', 'documentation, comments, maintainability', 'evaluate', JSON_ARRAY('documentation', 'essay'), 0, TRUE, 7, NULL),
(2, 3, 7, 'essay', 'medium', 'Explain the concept of data types and why they are important in programming.', NULL, 'Data types define the kind of data and operations that can be performed, ensuring type safety', 10, 15, 'Understand data type significance', 'data types, type safety, operations', 'understand', JSON_ARRAY('data-types', 'essay'), 0, TRUE, 7, NULL),

-- Study Unit 4: Control Structures
(2, 4, 7, 'essay', 'hard', 'Compare and contrast while loops and for loops, including when to use each.', NULL, 'While loops for unknown iterations, for loops for known iterations with counter', 12, 20, 'Analyze loop structures and applications', 'loops, control structures, iteration', 'analyze', JSON_ARRAY('loops', 'essay'), 0, TRUE, 7, NULL),
(2, 4, 7, 'essay', 'hard', 'Describe the software development lifecycle and the role of programming within it.', NULL, 'SDLC includes planning, design, implementation, testing, deployment, and maintenance', 15, 25, 'Understand software development process', 'SDLC, development process, programming', 'analyze', JSON_ARRAY('process', 'essay'), 0, TRUE, 7, NULL),
(2, 3, 7, 'essay', 'medium', 'Discuss common programming errors and strategies for debugging them.', NULL, 'Syntax errors, logical errors, runtime errors; debugging with print statements, debuggers, and systematic testing', 10, 20, 'Apply debugging techniques', 'errors, debugging, testing', 'apply', JSON_ARRAY('debugging', 'essay'), 0, TRUE, 7, NULL),

-- CSC2103: Data Structures & Algorithms (Course ID: 3) - Multiple Choice
-- Study Unit 5: Arrays & Lists
(3, 5, 7, 'multiple_choice', 'easy', 'Which data structure follows the LIFO (Last-In-First-Out) principle?', JSON_ARRAY('Queue', 'Stack', 'Array', 'Linked List'), 'Stack', 2, 3, 'Identify basic data structure properties', 'LIFO, stack, queue', 'remember', JSON_ARRAY('fundamentals', 'mcq'), 0, TRUE, 7, NULL),
(3, 5, 7, 'multiple_choice', 'hard', 'In a binary tree, what is the maximum number of nodes at level k?', JSON_ARRAY('k', '2k', '2^k', 'log k'), '2^k', 4, 5, 'Understand tree structure properties', 'binary tree, nodes, levels', 'apply', JSON_ARRAY('trees', 'mcq'), 0, TRUE, 7, NULL),
(3, 5, 7, 'multiple_choice', 'medium', 'Which data structure is typically used for implementing recursion?', JSON_ARRAY('Queue', 'Stack', 'Array', 'Tree'), 'Stack', 3, 4, 'Understand recursion implementation', 'recursion, stack, call stack', 'understand', JSON_ARRAY('recursion', 'mcq'), 0, TRUE, 7, NULL),

-- Study Unit 6: Searching & Sorting
(3, 6, 7, 'multiple_choice', 'medium', 'What is the time complexity of binary search on a sorted array?', JSON_ARRAY('O(1)', 'O(n)', 'O(log n)', 'O(n log n)'), 'O(log n)', 3, 4, 'Analyze search algorithm complexity', 'binary search, time complexity', 'analyze', JSON_ARRAY('algorithms', 'mcq'), 0, TRUE, 7, NULL),
(3, 6, 7, 'multiple_choice', 'medium', 'Which sorting algorithm has the worst-case time complexity of O(n²)?', JSON_ARRAY('Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'), 'Bubble Sort', 3, 4, 'Compare sorting algorithm performance', 'sorting, time complexity', 'analyze', JSON_ARRAY('sorting', 'mcq'), 0, TRUE, 7, NULL),

-- CSC2103: True/False Questions
-- Study Unit 5: Arrays & Lists
(3, 5, 7, 'true_false', 'easy', 'A linked list allows constant time access to any element.', NULL, 'false', 1, 2, 'Understand linked list access patterns', 'linked list, access time', 'remember', JSON_ARRAY('linked-list', 'tf'), 0, TRUE, 7, NULL),
(3, 5, 7, 'true_false', 'easy', 'Arrays have fixed size once allocated in memory.', NULL, 'true', 1, 2, 'Understand array memory allocation', 'arrays, memory, fixed-size', 'remember', JSON_ARRAY('arrays', 'tf'), 0, TRUE, 7, NULL),
(3, 5, 7, 'true_false', 'hard', 'All sorting algorithms can be implemented recursively.', NULL, 'false', 3, 4, 'Evaluate algorithm implementation methods', 'sorting, recursion, iteration', 'evaluate', JSON_ARRAY('sorting', 'tf'), 0, TRUE, 7, NULL),

-- Study Unit 6: Searching & Sorting
(3, 6, 7, 'true_false', 'medium', 'Hash tables provide average O(1) time complexity for insertions and lookups.', NULL, 'true', 2, 3, 'Analyze hash table performance', 'hash tables, time complexity', 'analyze', JSON_ARRAY('hash-tables', 'tf'), 0, TRUE, 7, NULL),
(3, 6, 7, 'true_false', 'medium', 'Depth-First Search uses a queue data structure for implementation.', NULL, 'false', 2, 3, 'Differentiate graph traversal methods', 'DFS, BFS, graph traversal', 'understand', JSON_ARRAY('graphs', 'tf'), 0, TRUE, 7, NULL),

-- CSC2103: Short Answer Questions
-- Study Unit 5: Arrays & Lists
(3, 5, 7, 'short_answer', 'medium', 'Explain the difference between an array and a linked list.', NULL, 'Array has contiguous memory and fixed size, linked list has dynamic size and non-contiguous memory with pointers', 4, 6, 'Compare linear data structures', 'array, linked list, memory allocation', 'understand', JSON_ARRAY('data-structures', 'short-answer'), 0, TRUE, 7, NULL),
(3, 5, 7, 'short_answer', 'medium', 'What is a binary search tree and what are its properties?', NULL, 'A tree where each node has at most two children, with left child < parent < right child', 4, 6, 'Understand tree data structures', 'BST, binary tree, properties', 'understand', JSON_ARRAY('trees', 'short-answer'), 0, TRUE, 7, NULL),
(3, 5, 7, 'short_answer', 'hard', 'Explain the concept of time-space tradeoff in algorithms.', NULL, 'The balance between algorithm speed and memory usage, where improving one may worsen the other', 5, 7, 'Analyze algorithm efficiency tradeoffs', 'time complexity, space complexity, tradeoffs', 'analyze', JSON_ARRAY('complexity', 'short-answer'), 0, TRUE, 7, NULL),

-- Study Unit 6: Searching & Sorting
(3, 6, 7, 'short_answer', 'medium', 'What is the purpose of a hash function in hash tables?', NULL, 'To map keys to array indices for efficient storage and retrieval', 4, 5, 'Understand hash table mechanisms', 'hash function, hash tables, mapping', 'understand', JSON_ARRAY('hash-tables', 'short-answer'), 0, TRUE, 7, NULL),
(3, 6, 7, 'short_answer', 'hard', 'Describe how the Quick Sort algorithm works.', NULL, 'Uses divide and conquer with pivot element to partition array and recursively sort subarrays', 5, 8, 'Apply sorting algorithm concepts', 'quick sort, partitioning, recursion', 'apply', JSON_ARRAY('sorting', 'short-answer'), 0, TRUE, 7, NULL),

-- CSC2103: Essay Questions
-- Study Unit 5: Arrays & Lists
(3, 5, 7, 'essay', 'hard', 'Compare and contrast arrays and linked lists, discussing their advantages and disadvantages for different use cases.', NULL, 'Arrays better for random access, linked lists better for frequent insertions/deletions', 15, 25, 'Evaluate data structure selection', 'arrays, linked lists, performance', 'evaluate', JSON_ARRAY('data-structures', 'essay'), 0, TRUE, 7, NULL),
(3, 5, 7, 'essay', 'medium', 'Discuss the importance of choosing appropriate data structures in software development and provide examples.', NULL, 'Proper data structures improve efficiency, maintainability, and performance of applications', 12, 20, 'Apply data structure selection principles', 'data structures, software design, efficiency', 'apply', JSON_ARRAY('design', 'essay'), 0, TRUE, 7, NULL),
(3, 5, 7, 'essay', 'medium', 'Describe the applications of stacks and queues in real-world computing scenarios.', NULL, 'Stacks for function calls and undo operations, queues for task scheduling and buffering', 12, 20, 'Apply data structures to real problems', 'stacks, queues, applications', 'apply', JSON_ARRAY('applications', 'essay'), 0, TRUE, 7, NULL),

-- Study Unit 6: Searching & Sorting
(3, 6, 7, 'essay', 'hard', 'Analyze the time and space complexity of various sorting algorithms and recommend the best choice for different scenarios.', NULL, 'Different algorithms optimal for different data sizes and characteristics', 20, 30, 'Analyze sorting algorithm performance', 'sorting, complexity, optimization', 'analyze', JSON_ARRAY('sorting', 'essay'), 0, TRUE, 7, NULL),
(3, 6, 7, 'essay', 'hard', 'Explain how hash tables handle collisions and compare different collision resolution techniques.', NULL, 'Separate chaining vs open addressing methods like linear probing and quadratic probing', 18, 25, 'Understand hash table implementation', 'hash tables, collisions, resolution', 'analyze', JSON_ARRAY('hash-tables', 'essay'), 0, TRUE, 7, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- ICT1101: Introduction to Information Systems (Course ID: 4) - Multiple Choice
-- Study Unit 7: Intro to IS
(4, 7, 8, 'multiple_choice', 'easy', 'What is the primary purpose of an information system?', JSON_ARRAY('To store data only', 'To process and manage information', 'To replace human workers', 'To create software applications'), 'To process and manage information', 2, 3, 'Define information systems', 'information systems, purpose', 'remember', JSON_ARRAY('fundamentals', 'mcq'), 0, TRUE, 8, NULL),
(4, 7, 8, 'multiple_choice', 'easy', 'Which of the following is NOT a component of an information system?', JSON_ARRAY('Hardware', 'Software', 'Data', 'Office furniture'), 'Office furniture', 2, 3, 'Identify IS components', 'components, hardware, software', 'remember', JSON_ARRAY('components', 'mcq'), 0, TRUE, 8, NULL),
(4, 7, 8, 'multiple_choice', 'medium', 'What type of information system is used for strategic decision making?', JSON_ARRAY('TPS', 'MIS', 'DSS', 'ERP'), 'DSS', 3, 4, 'Classify information systems', 'DSS, strategic planning', 'understand', JSON_ARRAY('systems-types', 'mcq'), 0, TRUE, 8, NULL),

-- Study Unit 8: Business Processes
(4, 8, 8, 'multiple_choice', 'medium', 'What does BPM stand for in information systems?', JSON_ARRAY('Business Process Management', 'Business Product Marketing', 'Basic Process Model', 'Business Performance Measurement'), 'Business Process Management', 2, 3, 'Understand business process concepts', 'BPM, business processes', 'remember', JSON_ARRAY('processes', 'mcq'), 0, TRUE, 8, NULL),
(4, 8, 8, 'multiple_choice', 'hard', 'Which of the following best describes workflow automation?', JSON_ARRAY('Manual process documentation', 'Automating business processes using technology', 'Hiring more employees', 'Creating paper forms'), 'Automating business processes using technology', 3, 4, 'Apply process automation concepts', 'workflow, automation', 'apply', JSON_ARRAY('automation', 'mcq'), 0, TRUE, 8, NULL),

-- ICT1101: True/False Questions
-- Study Unit 7: Intro to IS
(4, 7, 8, 'true_false', 'easy', 'Information systems only deal with computer hardware.', NULL, 'false', 1, 2, 'Understand IS scope', 'scope, components', 'remember', JSON_ARRAY('scope', 'tf'), 0, TRUE, 8, NULL),
(4, 7, 8, 'true_false', 'easy', 'Data and information are the same thing.', NULL, 'false', 1, 2, 'Differentiate data and information', 'data, information', 'remember', JSON_ARRAY('definitions', 'tf'), 0, TRUE, 8, NULL),
(4, 7, 8, 'true_false', 'medium', 'ERP systems integrate various business functions.', NULL, 'true', 2, 3, 'Understand ERP systems', 'ERP, integration', 'understand', JSON_ARRAY('erp', 'tf'), 0, TRUE, 8, NULL),

-- Study Unit 8: Business Processes
(4, 8, 8, 'true_false', 'medium', 'Business process reengineering always leads to job losses.', NULL, 'false', 2, 3, 'Evaluate BPR impacts', 'BPR, impacts', 'evaluate', JSON_ARRAY('bpr', 'tf'), 0, TRUE, 8, NULL),
(4, 8, 8, 'true_false', 'easy', 'Workflow diagrams help visualize business processes.', NULL, 'true', 1, 2, 'Apply process visualization', 'workflow, diagrams', 'apply', JSON_ARRAY('visualization', 'tf'), 0, TRUE, 8, NULL),

-- ICT1101: Short Answer Questions
-- Study Unit 7: Intro to IS
(4, 7, 8, 'short_answer', 'medium', 'What are the five key components of an information system?', NULL, 'Hardware, software, data, procedures, people', 4, 5, 'Identify IS components', 'components, hardware, software, data, procedures, people', 'remember', JSON_ARRAY('components', 'short-answer'), 0, TRUE, 8, NULL),
(4, 7, 8, 'short_answer', 'medium', 'Differentiate between data and information.', NULL, 'Data are raw facts, information is processed data with meaning', 4, 5, 'Differentiate data concepts', 'data, information, processing', 'understand', JSON_ARRAY('definitions', 'short-answer'), 0, TRUE, 8, NULL),

-- Study Unit 8: Business Processes
(4, 8, 8, 'short_answer', 'medium', 'What is the purpose of business process modeling?', NULL, 'To visualize and analyze business processes for improvement', 4, 6, 'Apply process modeling', 'BPM, modeling, improvement', 'apply', JSON_ARRAY('modeling', 'short-answer'), 0, TRUE, 8, NULL),
(4, 8, 8, 'short_answer', 'hard', 'Explain how information systems support business processes.', NULL, 'IS automate, monitor, and optimize business processes for efficiency', 5, 7, 'Analyze IS-business alignment', 'automation, optimization, efficiency', 'analyze', JSON_ARRAY('alignment', 'short-answer'), 0, TRUE, 8, NULL),
(4, 7, 8, 'short_answer', 'easy', 'What does TPS stand for in information systems?', NULL, 'Transaction Processing System', 3, 4, 'Identify system types', 'TPS, transaction systems', 'remember', JSON_ARRAY('systems', 'short-answer'), 0, TRUE, 8, NULL),

-- ICT1101: Essay Questions
-- Study Unit 7: Intro to IS
(4, 7, 8, 'essay', 'medium', 'Discuss the role of information systems in modern organizations.', NULL, 'IS support decision making, automate processes, enable communication, and provide competitive advantage', 12, 20, 'Evaluate organizational impact', 'organizations, impact, value', 'evaluate', JSON_ARRAY('impact', 'essay'), 0, TRUE, 8, NULL),
(4, 7, 8, 'essay', 'hard', 'Compare and contrast different types of information systems (TPS, MIS, DSS, ESS).', NULL, 'TPS for transactions, MIS for management reporting, DSS for decision support, ESS for executive strategy', 15, 25, 'Analyze system types', 'TPS, MIS, DSS, ESS, comparison', 'analyze', JSON_ARRAY('comparison', 'essay'), 0, TRUE, 8, NULL),

-- Study Unit 8: Business Processes
(4, 8, 8, 'essay', 'medium', 'Explain the concept of business process reengineering and its benefits.', NULL, 'BPR involves radical redesign of processes for dramatic improvements in performance', 12, 20, 'Apply BPR concepts', 'BPR, redesign, improvement', 'apply', JSON_ARRAY('bpr', 'essay'), 0, TRUE, 8, NULL),
(4, 8, 8, 'essay', 'hard', 'Describe how ERP systems integrate business processes across an organization.', NULL, 'ERP provides unified database and processes across departments like finance, HR, supply chain', 15, 25, 'Analyze ERP integration', 'ERP, integration, unified systems', 'analyze', JSON_ARRAY('erp', 'essay'), 0, TRUE, 8, NULL),
(4, 7, 8, 'essay', 'medium', 'Discuss the ethical implications of information systems in business.', NULL, 'Privacy concerns, data security, intellectual property, and social responsibility issues', 10, 18, 'Evaluate ethical considerations', 'ethics, privacy, security', 'evaluate', JSON_ARRAY('ethics', 'essay'), 0, TRUE, 8, NULL),

-- ICT2205: Networking Basics (Course ID: 5) - Multiple Choice
-- Study Unit 9: Networking Basics
(5, 9, 8, 'multiple_choice', 'easy', 'Which layer of the OSI model is responsible for physical transmission?', JSON_ARRAY('Application', 'Transport', 'Network', 'Physical'), 'Physical', 2, 3, 'Identify OSI model layers', 'OSI, physical layer', 'remember', JSON_ARRAY('osi', 'mcq'), 0, TRUE, 8, NULL),
(5, 9, 8, 'multiple_choice', 'medium', 'What protocol is used for web browsing?', JSON_ARRAY('FTP', 'HTTP', 'SMTP', 'TCP'), 'HTTP', 2, 3, 'Understand application protocols', 'HTTP, web protocols', 'understand', JSON_ARRAY('protocols', 'mcq'), 0, TRUE, 8, NULL),
(5, 9, 8, 'multiple_choice', 'medium', 'Which device operates at the Network layer?', JSON_ARRAY('Hub', 'Switch', 'Router', 'Bridge'), 'Router', 3, 4, 'Classify networking devices', 'router, network layer', 'understand', JSON_ARRAY('devices', 'mcq'), 0, TRUE, 8, NULL),

-- Study Unit 10: Network Devices
(5, 10, 8, 'multiple_choice', 'medium', 'What is the main function of a switch in a network?', JSON_ARRAY('Connect different networks', 'Filter and forward packets within LAN', 'Amplify signals', 'Convert protocols'), 'Filter and forward packets within LAN', 3, 4, 'Understand switch functionality', 'switch, LAN, forwarding', 'understand', JSON_ARRAY('switching', 'mcq'), 0, TRUE, 8, NULL),
(5, 10, 8, 'multiple_choice', 'hard', 'Which wireless standard offers the highest theoretical speed?', JSON_ARRAY('802.11a', '802.11g', '802.11n', '802.11ac'), '802.11ac', 4, 5, 'Compare wireless standards', 'wireless, standards, speed', 'analyze', JSON_ARRAY('wireless', 'mcq'), 0, TRUE, 8, NULL),

-- ICT2205: True/False Questions
-- Study Unit 9: Networking Basics
(5, 9, 8, 'true_false', 'easy', 'TCP is a connection-oriented protocol.', NULL, 'true', 1, 2, 'Understand TCP properties', 'TCP, connection-oriented', 'remember', JSON_ARRAY('tcp', 'tf'), 0, TRUE, 8, NULL),
(5, 9, 8, 'true_false', 'easy', 'IP addresses are logical addresses.', NULL, 'true', 1, 2, 'Identify addressing types', 'IP, logical addressing', 'remember', JSON_ARRAY('addressing', 'tf'), 0, TRUE, 8, NULL),
(5, 9, 8, 'true_false', 'medium', 'UDP provides reliable data delivery.', NULL, 'false', 2, 3, 'Differentiate transport protocols', 'UDP, reliability', 'understand', JSON_ARRAY('udp', 'tf'), 0, TRUE, 8, NULL),

-- Study Unit 10: Network Devices
(5, 10, 8, 'true_false', 'medium', 'A hub broadcasts data to all connected devices.', NULL, 'true', 2, 3, 'Understand hub operation', 'hub, broadcasting', 'understand', JSON_ARRAY('hub', 'tf'), 0, TRUE, 8, NULL),
(5, 10, 8, 'true_false', 'hard', 'VLANs can span multiple physical switches.', NULL, 'true', 3, 4, 'Apply VLAN concepts', 'VLAN, spanning', 'apply', JSON_ARRAY('vlan', 'tf'), 0, TRUE, 8, NULL),

-- ICT2205: Short Answer Questions
-- Study Unit 9: Networking Basics
(5, 9, 8, 'short_answer', 'medium', 'What are the seven layers of the OSI model?', NULL, 'Physical, Data Link, Network, Transport, Session, Presentation, Application', 4, 6, 'Recall OSI model', 'OSI, layers, model', 'remember', JSON_ARRAY('osi', 'short-answer'), 0, TRUE, 8, NULL),
(5, 9, 8, 'short_answer', 'medium', 'Differentiate between TCP and UDP protocols.', NULL, 'TCP is connection-oriented and reliable, UDP is connectionless and unreliable', 4, 5, 'Compare transport protocols', 'TCP, UDP, comparison', 'understand', JSON_ARRAY('transport', 'short-answer'), 0, TRUE, 8, NULL),

-- Study Unit 10: Network Devices
(5, 10, 8, 'short_answer', 'medium', 'What is the purpose of a router in a network?', NULL, 'To connect different networks and route packets between them', 4, 5, 'Understand router functionality', 'router, routing, networks', 'understand', JSON_ARRAY('routing', 'short-answer'), 0, TRUE, 8, NULL),
(5, 10, 8, 'short_answer', 'hard', 'Explain how a switch learns MAC addresses.', NULL, 'Switch examines source MAC addresses in frames and builds forwarding table', 5, 7, 'Analyze switching operation', 'switch, MAC, learning', 'analyze', JSON_ARRAY('switching', 'short-answer'), 0, TRUE, 8, NULL),
(5, 9, 8, 'short_answer', 'easy', 'What does LAN stand for?', NULL, 'Local Area Network', 3, 4, 'Identify network types', 'LAN, local network', 'remember', JSON_ARRAY('networks', 'short-answer'), 0, TRUE, 8, NULL),

-- ICT2205: Essay Questions
-- Study Unit 9: Networking Basics
(5, 9, 8, 'essay', 'medium', 'Discuss the importance of the TCP/IP model in modern networking.', NULL, 'TCP/IP is the foundation of internet communications and modern network implementations', 12, 20, 'Evaluate TCP/IP significance', 'TCP/IP, internet, foundation', 'evaluate', JSON_ARRAY('tcp-ip', 'essay'), 0, TRUE, 8, NULL),
(5, 9, 8, 'essay', 'hard', 'Compare and contrast the OSI and TCP/IP networking models.', NULL, 'OSI has 7 layers, TCP/IP has 4 layers; both provide framework for network communications', 15, 25, 'Analyze networking models', 'OSI, TCP/IP, comparison', 'analyze', JSON_ARRAY('models', 'essay'), 0, TRUE, 8, NULL),

-- Study Unit 10: Network Devices
(5, 10, 8, 'essay', 'medium', 'Explain the role of different network devices in building a corporate network.', NULL, 'Switches for LAN connectivity, routers for inter-network routing, firewalls for security', 12, 20, 'Apply network design concepts', 'devices, design, corporate', 'apply', JSON_ARRAY('design', 'essay'), 0, TRUE, 8, NULL),
(5, 10, 8, 'essay', 'hard', 'Describe how wireless networks work and their security considerations.', NULL, 'Wireless uses radio frequencies; security includes encryption, authentication, and access control', 15, 25, 'Analyze wireless security', 'wireless, security, encryption', 'analyze', JSON_ARRAY('wireless', 'essay'), 0, TRUE, 8, NULL),
(5, 9, 8, 'essay', 'medium', 'Discuss the challenges of network security in modern organizations.', NULL, 'Threats include malware, unauthorized access, data breaches; solutions include firewalls, encryption, policies', 10, 18, 'Evaluate security challenges', 'security, challenges, solutions', 'evaluate', JSON_ARRAY('security', 'essay'), 0, TRUE, 8, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- STA1101: Descriptive Statistics (Course ID: 6) - Multiple Choice
-- Study Unit 11: Descriptive Stats
(6, 11, 9, 'multiple_choice', 'easy', 'Which measure of central tendency is most affected by outliers?', JSON_ARRAY('Mean', 'Median', 'Mode', 'Range'), 'Mean', 2, 3, 'Compute descriptive measures', 'central tendency, outliers', 'understand', JSON_ARRAY('descriptive', 'mcq'), 0, TRUE, 9, NULL),
(6, 11, 9, 'multiple_choice', 'easy', 'What type of data can be categorized but not ordered?', JSON_ARRAY('Nominal', 'Ordinal', 'Interval', 'Ratio'), 'Nominal', 2, 3, 'Classify data types', 'data types, nominal', 'remember', JSON_ARRAY('data-types', 'mcq'), 0, TRUE, 9, NULL),
(6, 11, 9, 'multiple_choice', 'medium', 'Which measure of dispersion uses all data points?', JSON_ARRAY('Range', 'Interquartile Range', 'Standard Deviation', 'All of the above'), 'Standard Deviation', 3, 4, 'Analyze dispersion measures', 'dispersion, standard deviation', 'analyze', JSON_ARRAY('dispersion', 'mcq'), 0, TRUE, 9, NULL),

-- Study Unit 12: Sampling
(6, 12, 9, 'multiple_choice', 'medium', 'What sampling method ensures every member has equal chance of selection?', JSON_ARRAY('Convenience', 'Stratified', 'Simple Random', 'Cluster'), 'Simple Random', 3, 4, 'Design sampling methods', 'sampling, random', 'apply', JSON_ARRAY('sampling', 'mcq'), 0, TRUE, 9, NULL),
(6, 12, 9, 'multiple_choice', 'hard', 'Which sampling bias occurs when some population members are excluded?', JSON_ARRAY('Selection', 'Non-response', 'Measurement', 'Sampling frame'), 'Selection', 4, 5, 'Evaluate sampling biases', 'bias, selection', 'evaluate', JSON_ARRAY('bias', 'mcq'), 0, TRUE, 9, NULL),

-- STA1101: True/False Questions
-- Study Unit 11: Descriptive Stats
(6, 11, 9, 'true_false', 'easy', 'The median is always affected by extreme values.', NULL, 'false', 1, 2, 'Understand median properties', 'median, outliers', 'remember', JSON_ARRAY('median', 'tf'), 0, TRUE, 9, NULL),
(6, 11, 9, 'true_false', 'easy', 'A histogram is used for categorical data.', NULL, 'false', 1, 2, 'Identify graphical methods', 'histogram, categorical', 'remember', JSON_ARRAY('graphs', 'tf'), 0, TRUE, 9, NULL),
(6, 11, 9, 'true_false', 'medium', 'Variance is the square of standard deviation.', NULL, 'true', 2, 3, 'Understand variance calculation', 'variance, standard deviation', 'understand', JSON_ARRAY('variance', 'tf'), 0, TRUE, 9, NULL),

-- Study Unit 12: Sampling
(6, 12, 9, 'true_false', 'medium', 'Stratified sampling requires homogeneous subgroups.', NULL, 'false', 2, 3, 'Apply sampling techniques', 'stratified, homogeneous', 'apply', JSON_ARRAY('sampling', 'tf'), 0, TRUE, 9, NULL),
(6, 12, 9, 'true_false', 'hard', 'Systematic sampling always produces a representative sample.', NULL, 'false', 3, 4, 'Evaluate sampling methods', 'systematic, representative', 'evaluate', JSON_ARRAY('sampling', 'tf'), 0, TRUE, 9, NULL),

-- STA1101: Short Answer Questions
-- Study Unit 11: Descriptive Stats
(6, 11, 9, 'short_answer', 'medium', 'What is the difference between population and sample?', NULL, 'Population is entire group, sample is subset used for study', 4, 5, 'Differentiate population concepts', 'population, sample', 'understand', JSON_ARRAY('definitions', 'short-answer'), 0, TRUE, 9, NULL),
(6, 11, 9, 'short_answer', 'medium', 'When would you use median instead of mean?', NULL, 'When data has outliers or is skewed', 4, 5, 'Apply appropriate measures', 'median, mean, outliers', 'apply', JSON_ARRAY('measures', 'short-answer'), 0, TRUE, 9, NULL),

-- Study Unit 12: Sampling
(6, 12, 9, 'short_answer', 'medium', 'What is the purpose of random sampling?', NULL, 'To ensure every member has equal chance and reduce bias', 4, 6, 'Understand sampling principles', 'random, bias reduction', 'understand', JSON_ARRAY('sampling', 'short-answer'), 0, TRUE, 9, NULL),
(6, 12, 9, 'short_answer', 'hard', 'Explain the concept of sampling error.', NULL, 'Difference between sample statistic and population parameter due to chance', 5, 7, 'Analyze sampling accuracy', 'sampling error, accuracy', 'analyze', JSON_ARRAY('error', 'short-answer'), 0, TRUE, 9, NULL),
(6, 11, 9, 'short_answer', 'easy', 'What does IQR stand for in statistics?', NULL, 'Interquartile Range', 3, 4, 'Identify statistical terms', 'IQR, quartiles', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 9, NULL),

-- STA1101: Essay Questions
-- Study Unit 11: Descriptive Stats
(6, 11, 9, 'essay', 'medium', 'Discuss the importance of descriptive statistics in data analysis.', NULL, 'Provides data summary, identifies patterns, supports decision making', 12, 20, 'Evaluate descriptive statistics', 'descriptive, analysis, importance', 'evaluate', JSON_ARRAY('importance', 'essay'), 0, TRUE, 9, NULL),
(6, 11, 9, 'essay', 'hard', 'Compare and contrast different measures of central tendency and dispersion.', NULL, 'Mean vs median vs mode; range vs variance vs standard deviation', 15, 25, 'Analyze statistical measures', 'central tendency, dispersion, comparison', 'analyze', JSON_ARRAY('comparison', 'essay'), 0, TRUE, 9, NULL),

-- Study Unit 12: Sampling
(6, 12, 9, 'essay', 'medium', 'Explain the different probability sampling methods and their applications.', NULL, 'Simple random, systematic, stratified, cluster sampling methods', 12, 20, 'Apply sampling techniques', 'probability sampling, applications', 'apply', JSON_ARRAY('sampling', 'essay'), 0, TRUE, 9, NULL),
(6, 12, 9, 'essay', 'hard', 'Describe common sampling biases and how to minimize them in research.', NULL, 'Selection bias, non-response bias, measurement bias; randomization, proper design', 15, 25, 'Analyze sampling biases', 'biases, minimization, research', 'analyze', JSON_ARRAY('biases', 'essay'), 0, TRUE, 9, NULL),
(6, 11, 9, 'essay', 'medium', 'Discuss the role of graphical representations in statistical analysis.', NULL, 'Visualize patterns, identify outliers, communicate findings effectively', 10, 18, 'Evaluate graphical methods', 'graphs, visualization, communication', 'evaluate', JSON_ARRAY('graphs', 'essay'), 0, TRUE, 9, NULL),

-- STA2203: Probability & Distributions (Course ID: 7) - Multiple Choice
-- Study Unit 13: Random Variables
(7, 13, 9, 'multiple_choice', 'easy', 'What is a discrete random variable?', JSON_ARRAY('Takes any value in range', 'Takes countable values', 'Always positive', 'Follows normal distribution'), 'Takes countable values', 2, 3, 'Define random variables', 'discrete, random variables', 'remember', JSON_ARRAY('variables', 'mcq'), 0, TRUE, 9, NULL),
(7, 13, 9, 'multiple_choice', 'medium', 'Which probability distribution describes the number of successes in n trials?', JSON_ARRAY('Normal', 'Poisson', 'Binomial', 'Exponential'), 'Binomial', 3, 4, 'Apply probability distributions', 'binomial, success trials', 'apply', JSON_ARRAY('distributions', 'mcq'), 0, TRUE, 9, NULL),
(7, 13, 9, 'multiple_choice', 'medium', 'What is the expected value of a random variable?', JSON_ARRAY('Most frequent value', 'Middle value', 'Long-run average', 'Maximum value'), 'Long-run average', 3, 4, 'Understand expected value', 'expected value, average', 'understand', JSON_ARRAY('expectation', 'mcq'), 0, TRUE, 9, NULL),

-- Study Unit 14: Distributions
(7, 14, 9, 'multiple_choice', 'medium', 'Which distribution is symmetric and bell-shaped?', JSON_ARRAY('Exponential', 'Uniform', 'Normal', 'Poisson'), 'Normal', 3, 4, 'Identify distribution shapes', 'normal, symmetric', 'remember', JSON_ARRAY('distributions', 'mcq'), 0, TRUE, 9, NULL),
(7, 14, 9, 'multiple_choice', 'hard', 'What does the Central Limit Theorem state?', JSON_ARRAY('Sample means approach normality', 'All data is normal', 'Large samples are biased', 'Population means equal sample means'), 'Sample means approach normality', 4, 5, 'Analyze central limit theorem', 'CLT, sample means', 'analyze', JSON_ARRAY('CLT', 'mcq'), 0, TRUE, 9, NULL),

-- STA2203: True/False Questions
-- Study Unit 13: Random Variables
(7, 13, 9, 'true_false', 'easy', 'Probability always ranges between 0 and 1.', NULL, 'true', 1, 2, 'Understand probability range', 'probability, range', 'remember', JSON_ARRAY('probability', 'tf'), 0, TRUE, 9, NULL),
(7, 13, 9, 'true_false', 'easy', 'All continuous random variables follow normal distribution.', NULL, 'false', 1, 2, 'Identify distribution types', 'continuous, normal', 'remember', JSON_ARRAY('distributions', 'tf'), 0, TRUE, 9, NULL),
(7, 13, 9, 'true_false', 'medium', 'The sum of all probabilities in a distribution equals 1.', NULL, 'true', 2, 3, 'Understand probability rules', 'probability sum, rules', 'understand', JSON_ARRAY('probability', 'tf'), 0, TRUE, 9, NULL),

-- Study Unit 14: Distributions
(7, 14, 9, 'true_false', 'medium', 'Poisson distribution is used for counting events over time.', NULL, 'true', 2, 3, 'Apply Poisson distribution', 'Poisson, counting', 'apply', JSON_ARRAY('Poisson', 'tf'), 0, TRUE, 9, NULL),
(7, 14, 9, 'true_false', 'hard', 'The standard normal distribution has mean 1 and variance 1.', NULL, 'false', 3, 4, 'Evaluate normal distribution', 'standard normal, parameters', 'evaluate', JSON_ARRAY('normal', 'tf'), 0, TRUE, 9, NULL),

-- STA2203: Short Answer Questions
-- Study Unit 13: Random Variables
(7, 13, 9, 'short_answer', 'medium', 'What is the difference between discrete and continuous random variables?', NULL, 'Discrete takes countable values, continuous takes any value in range', 4, 5, 'Differentiate variable types', 'discrete, continuous, variables', 'understand', JSON_ARRAY('variables', 'short-answer'), 0, TRUE, 9, NULL),
(7, 13, 9, 'short_answer', 'medium', 'Define the term "probability density function".', NULL, 'Function describing relative likelihood of continuous random variable', 4, 5, 'Understand PDF concepts', 'PDF, continuous probability', 'understand', JSON_ARRAY('PDF', 'short-answer'), 0, TRUE, 9, NULL),

-- Study Unit 14: Distributions
(7, 14, 9, 'short_answer', 'medium', 'What are the parameters of normal distribution?', NULL, 'Mean and standard deviation', 4, 6, 'Identify distribution parameters', 'normal, parameters', 'remember', JSON_ARRAY('normal', 'short-answer'), 0, TRUE, 9, NULL),
(7, 14, 9, 'short_answer', 'hard', 'Explain when to use binomial vs Poisson distribution.', NULL, 'Binomial for fixed trials, Poisson for rare events over time/space', 5, 7, 'Analyze distribution selection', 'binomial, Poisson, selection', 'analyze', JSON_ARRAY('distributions', 'short-answer'), 0, TRUE, 9, NULL),
(7, 13, 9, 'short_answer', 'easy', 'What does CDF stand for in probability?', NULL, 'Cumulative Distribution Function', 3, 4, 'Identify probability terms', 'CDF, cumulative', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 9, NULL),

-- STA2203: Essay Questions
-- Study Unit 13: Random Variables
(7, 13, 9, 'essay', 'medium', 'Discuss the concept of expected value and its importance in decision making.', NULL, 'Long-term average, helps in risk assessment and optimal choices', 12, 20, 'Evaluate expected value', 'expected value, decision making', 'evaluate', JSON_ARRAY('expectation', 'essay'), 0, TRUE, 9, NULL),
(7, 13, 9, 'essay', 'hard', 'Compare and contrast discrete and continuous probability distributions.', NULL, 'Discrete: probability mass function, Continuous: probability density function', 15, 25, 'Analyze distribution types', 'discrete, continuous, comparison', 'analyze', JSON_ARRAY('distributions', 'essay'), 0, TRUE, 9, NULL),

-- Study Unit 14: Distributions
(7, 14, 9, 'essay', 'medium', 'Explain the properties and applications of normal distribution.', NULL, 'Symmetric, bell-shaped, many natural phenomena, statistical inference', 12, 20, 'Apply normal distribution', 'normal, properties, applications', 'apply', JSON_ARRAY('normal', 'essay'), 0, TRUE, 9, NULL),
(7, 14, 9, 'essay', 'hard', 'Describe the Central Limit Theorem and its significance in statistics.', NULL, 'Sample means approach normal distribution, enables inference about populations', 15, 25, 'Analyze CLT significance', 'CLT, inference, significance', 'analyze', JSON_ARRAY('CLT', 'essay'), 0, TRUE, 9, NULL),
(7, 13, 9, 'essay', 'medium', 'Discuss how probability theory supports statistical inference.', NULL, 'Provides foundation for hypothesis testing, confidence intervals, and predictions', 10, 18, 'Evaluate probability applications', 'probability, inference, foundation', 'evaluate', JSON_ARRAY('inference', 'essay'), 0, TRUE, 9, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- BIO1101: Cell Biology (Course ID: 8) - Multiple Choice
-- Study Unit 15: Cells
(8, 15, 10, 'multiple_choice', 'easy', 'Which organelle is known as the "powerhouse" of the cell?', JSON_ARRAY('Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'), 'Mitochondria', 2, 3, 'Identify cell organelles', 'organelles, mitochondria', 'remember', JSON_ARRAY('cell-biology', 'mcq'), 0, TRUE, 10, NULL),
(8, 15, 10, 'multiple_choice', 'easy', 'What is the function of the cell membrane?', JSON_ARRAY('Protein synthesis', 'Control center', 'Selective barrier', 'Energy production'), 'Selective barrier', 2, 3, 'Understand cell membrane function', 'cell membrane, selective barrier', 'remember', JSON_ARRAY('membrane', 'mcq'), 0, TRUE, 10, NULL),
(8, 15, 10, 'multiple_choice', 'medium', 'Which process describes cell division in somatic cells?', JSON_ARRAY('Meiosis', 'Mitosis', 'Binary fission', 'Budding'), 'Mitosis', 3, 4, 'Differentiate cell division types', 'mitosis, cell division', 'understand', JSON_ARRAY('cell-division', 'mcq'), 0, TRUE, 10, NULL),

-- Study Unit 16: Ecology
(8, 16, 10, 'multiple_choice', 'medium', 'What is the primary source of energy in most ecosystems?', JSON_ARRAY('Water', 'Soil nutrients', 'Sunlight', 'Atmospheric gases'), 'Sunlight', 3, 4, 'Explain ecosystems', 'energy, sunlight, ecosystems', 'understand', JSON_ARRAY('ecology', 'mcq'), 0, TRUE, 10, NULL),
(8, 16, 10, 'multiple_choice', 'hard', 'Which ecological relationship benefits both species?', JSON_ARRAY('Parasitism', 'Commensalism', 'Mutualism', 'Competition'), 'Mutualism', 4, 5, 'Analyze ecological relationships', 'mutualism, symbiosis', 'analyze', JSON_ARRAY('relationships', 'mcq'), 0, TRUE, 10, NULL),

-- BIO1101: True/False Questions
-- Study Unit 15: Cells
(8, 15, 10, 'true_false', 'easy', 'Prokaryotic cells have a nucleus.', NULL, 'false', 1, 2, 'Differentiate cell types', 'prokaryotic, nucleus', 'remember', JSON_ARRAY('cell-types', 'tf'), 0, TRUE, 10, NULL),
(8, 15, 10, 'true_false', 'easy', 'Chloroplasts are found in animal cells.', NULL, 'false', 1, 2, 'Identify organelle distribution', 'chloroplasts, animal cells', 'remember', JSON_ARRAY('organelles', 'tf'), 0, TRUE, 10, NULL),
(8, 15, 10, 'true_false', 'medium', 'DNA replication occurs during the S phase of interphase.', NULL, 'true', 2, 3, 'Understand cell cycle', 'DNA replication, interphase', 'understand', JSON_ARRAY('cell-cycle', 'tf'), 0, TRUE, 10, NULL),

-- Study Unit 16: Ecology
(8, 16, 10, 'true_false', 'medium', 'A food chain always begins with a producer.', NULL, 'true', 2, 3, 'Apply ecological concepts', 'food chain, producer', 'apply', JSON_ARRAY('ecology', 'tf'), 0, TRUE, 10, NULL),
(8, 16, 10, 'true_false', 'hard', 'Carbon cycle involves only biological processes.', NULL, 'false', 3, 4, 'Evaluate biogeochemical cycles', 'carbon cycle, processes', 'evaluate', JSON_ARRAY('cycles', 'tf'), 0, TRUE, 10, NULL),

-- BIO1101: Short Answer Questions
-- Study Unit 15: Cells
(8, 15, 10, 'short_answer', 'medium', 'What are the main differences between plant and animal cells?', NULL, 'Plant cells have cell walls and chloroplasts, animal cells do not', 4, 5, 'Compare cell types', 'plant cells, animal cells, differences', 'understand', JSON_ARRAY('cell-comparison', 'short-answer'), 0, TRUE, 10, NULL),
(8, 15, 10, 'short_answer', 'medium', 'Describe the process of osmosis.', NULL, 'Movement of water across semi-permeable membrane from high to low concentration', 4, 5, 'Understand membrane transport', 'osmosis, membrane transport', 'understand', JSON_ARRAY('transport', 'short-answer'), 0, TRUE, 10, NULL),

-- Study Unit 16: Ecology
(8, 16, 10, 'short_answer', 'medium', 'What is the role of decomposers in an ecosystem?', NULL, 'Break down dead organic matter and recycle nutrients', 4, 6, 'Explain ecosystem roles', 'decomposers, nutrient cycling', 'understand', JSON_ARRAY('ecology', 'short-answer'), 0, TRUE, 10, NULL),
(8, 16, 10, 'short_answer', 'hard', 'Explain the concept of carrying capacity.', NULL, 'Maximum population size an environment can sustain indefinitely', 5, 7, 'Analyze population dynamics', 'carrying capacity, population', 'analyze', JSON_ARRAY('population', 'short-answer'), 0, TRUE, 10, NULL),
(8, 15, 10, 'short_answer', 'easy', 'What does DNA stand for?', NULL, 'Deoxyribonucleic Acid', 3, 4, 'Identify biological terms', 'DNA, terminology', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 10, NULL),

-- BIO1101: Essay Questions
-- Study Unit 15: Cells
(8, 15, 10, 'essay', 'medium', 'Discuss the structure and function of the endoplasmic reticulum.', NULL, 'Rough ER with ribosomes for protein synthesis, smooth ER for lipid synthesis', 12, 20, 'Evaluate organelle functions', 'endoplasmic reticulum, structure, function', 'evaluate', JSON_ARRAY('organelles', 'essay'), 0, TRUE, 10, NULL),
(8, 15, 10, 'essay', 'hard', 'Compare and contrast mitosis and meiosis.', NULL, 'Mitosis for growth/repair (2 identical cells), meiosis for gametes (4 genetically different cells)', 15, 25, 'Analyze cell division', 'mitosis, meiosis, comparison', 'analyze', JSON_ARRAY('cell-division', 'essay'), 0, TRUE, 10, NULL),

-- Study Unit 16: Ecology
(8, 16, 10, 'essay', 'medium', 'Explain the importance of biodiversity in ecosystems.', NULL, 'Increases stability, resilience, and provides ecosystem services', 12, 20, 'Apply biodiversity concepts', 'biodiversity, ecosystem stability', 'apply', JSON_ARRAY('biodiversity', 'essay'), 0, TRUE, 10, NULL),
(8, 16, 10, 'essay', 'hard', 'Describe the water cycle and its ecological significance.', NULL, 'Evaporation, condensation, precipitation; essential for life and climate regulation', 15, 25, 'Analyze biogeochemical cycles', 'water cycle, ecology', 'analyze', JSON_ARRAY('cycles', 'essay'), 0, TRUE, 10, NULL),
(8, 15, 10, 'essay', 'medium', 'Discuss the role of enzymes in cellular reactions.', NULL, 'Biological catalysts that speed up reactions by lowering activation energy', 10, 18, 'Evaluate enzyme function', 'enzymes, catalysis, reactions', 'evaluate', JSON_ARRAY('enzymes', 'essay'), 0, TRUE, 10, NULL),

-- BIO2302: Genetics (Course ID: 9) - Multiple Choice
-- Study Unit 17: DNA & RNA
(9, 17, 10, 'multiple_choice', 'easy', 'What are the base pairing rules in DNA?', JSON_ARRAY('A-T, G-C', 'A-U, G-C', 'A-G, T-C', 'A-C, G-T'), 'A-T, G-C', 2, 3, 'Explain DNA structure', 'DNA, base pairing', 'remember', JSON_ARRAY('genetics', 'mcq'), 0, TRUE, 10, NULL),
(9, 17, 10, 'multiple_choice', 'medium', 'Which process creates mRNA from DNA?', JSON_ARRAY('Replication', 'Transcription', 'Translation', 'Translocation'), 'Transcription', 3, 4, 'Understand genetic processes', 'transcription, mRNA', 'understand', JSON_ARRAY('genetic-processes', 'mcq'), 0, TRUE, 10, NULL),
(9, 17, 10, 'multiple_choice', 'medium', 'What is the function of tRNA in protein synthesis?', JSON_ARRAY('Carries amino acids', 'Forms ribosomes', 'Carries genetic code', 'Unzips DNA'), 'Carries amino acids', 3, 4, 'Apply protein synthesis concepts', 'tRNA, protein synthesis', 'apply', JSON_ARRAY('protein-synthesis', 'mcq'), 0, TRUE, 10, NULL),

-- Study Unit 18: Genetic Disorders
(9, 18, 10, 'multiple_choice', 'medium', 'Which genetic disorder results from an extra chromosome 21?', JSON_ARRAY('Turner syndrome', 'Down syndrome', 'Klinefelter syndrome', 'Cystic fibrosis'), 'Down syndrome', 3, 4, 'Describe disorders', 'Down syndrome, chromosomal', 'remember', JSON_ARRAY('disorders', 'mcq'), 0, TRUE, 10, NULL),
(9, 18, 10, 'multiple_choice', 'hard', 'What type of inheritance shows affected males passing to all daughters?', JSON_ARRAY('Autosomal dominant', 'Autosomal recessive', 'X-linked dominant', 'X-linked recessive'), 'X-linked dominant', 4, 5, 'Analyze inheritance patterns', 'inheritance, X-linked', 'analyze', JSON_ARRAY('inheritance', 'mcq'), 0, TRUE, 10, NULL),

-- BIO2302: True/False Questions
-- Study Unit 17: DNA & RNA
(9, 17, 10, 'true_false', 'easy', 'RNA contains thymine instead of uracil.', NULL, 'false', 1, 2, 'Differentiate DNA and RNA', 'RNA, uracil', 'remember', JSON_ARRAY('nucleic-acids', 'tf'), 0, TRUE, 10, NULL),
(9, 17, 10, 'true_false', 'easy', 'Genes are located on chromosomes.', NULL, 'true', 1, 2, 'Understand genetic organization', 'genes, chromosomes', 'remember', JSON_ARRAY('genetics', 'tf'), 0, TRUE, 10, NULL),
(9, 17, 10, 'true_false', 'medium', 'The genetic code is universal across all organisms.', NULL, 'true', 2, 3, 'Understand genetic code', 'genetic code, universal', 'understand', JSON_ARRAY('genetic-code', 'tf'), 0, TRUE, 10, NULL),

-- Study Unit 18: Genetic Disorders
(9, 18, 10, 'true_false', 'medium', 'All genetic disorders are inherited from parents.', NULL, 'false', 2, 3, 'Evaluate disorder causes', 'genetic disorders, inheritance', 'evaluate', JSON_ARRAY('disorders', 'tf'), 0, TRUE, 10, NULL),
(9, 18, 10, 'true_false', 'hard', 'Carriers of recessive disorders always show symptoms.', NULL, 'false', 3, 4, 'Analyze carrier status', 'carriers, recessive', 'analyze', JSON_ARRAY('inheritance', 'tf'), 0, TRUE, 10, NULL),

-- BIO2302: Short Answer Questions
-- Study Unit 17: DNA & RNA
(9, 17, 10, 'short_answer', 'medium', 'What is the difference between genotype and phenotype?', NULL, 'Genotype is genetic makeup, phenotype is observable characteristics', 4, 5, 'Differentiate genetic concepts', 'genotype, phenotype', 'understand', JSON_ARRAY('genetics', 'short-answer'), 0, TRUE, 10, NULL),
(9, 17, 10, 'short_answer', 'medium', 'Describe the process of DNA replication.', NULL, 'Semi-conservative process where DNA unwinds and new strands form', 4, 5, 'Understand DNA replication', 'DNA replication, semi-conservative', 'understand', JSON_ARRAY('replication', 'short-answer'), 0, TRUE, 10, NULL),

-- Study Unit 18: Genetic Disorders
(9, 18, 10, 'short_answer', 'medium', 'What is a mutation and how can it affect an organism?', NULL, 'Change in DNA sequence; can be beneficial, harmful, or neutral', 4, 6, 'Apply mutation concepts', 'mutation, DNA changes', 'apply', JSON_ARRAY('mutations', 'short-answer'), 0, TRUE, 10, NULL),
(9, 18, 10, 'short_answer', 'hard', 'Explain the concept of genetic counseling.', NULL, 'Process of advising individuals about inheritance and risks of genetic disorders', 5, 7, 'Analyze genetic applications', 'genetic counseling, risk assessment', 'analyze', JSON_ARRAY('counseling', 'short-answer'), 0, TRUE, 10, NULL),
(9, 17, 10, 'short_answer', 'easy', 'What does mRNA stand for?', NULL, 'Messenger RNA', 3, 4, 'Identify genetic terms', 'mRNA, terminology', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 10, NULL),

-- BIO2302: Essay Questions
-- Study Unit 17: DNA & RNA
(9, 17, 10, 'essay', 'medium', 'Discuss the central dogma of molecular biology.', NULL, 'DNA → RNA → Protein; flow of genetic information', 12, 20, 'Evaluate molecular biology principles', 'central dogma, genetic flow', 'evaluate', JSON_ARRAY('molecular-biology', 'essay'), 0, TRUE, 10, NULL),
(9, 17, 10, 'essay', 'hard', 'Compare and contrast DNA and RNA in structure and function.', NULL, 'DNA: double-stranded, deoxyribose, stores genetic info; RNA: single-stranded, ribose, protein synthesis', 15, 25, 'Analyze nucleic acids', 'DNA, RNA, comparison', 'analyze', JSON_ARRAY('nucleic-acids', 'essay'), 0, TRUE, 10, NULL),

-- Study Unit 18: Genetic Disorders
(9, 18, 10, 'essay', 'medium', 'Explain the different patterns of Mendelian inheritance.', NULL, 'Autosomal dominant, autosomal recessive, X-linked inheritance patterns', 12, 20, 'Apply inheritance patterns', 'Mendelian inheritance, patterns', 'apply', JSON_ARRAY('inheritance', 'essay'), 0, TRUE, 10, NULL),
(9, 18, 10, 'essay', 'hard', 'Describe how genetic technologies are used in disease diagnosis and treatment.', NULL, 'Genetic testing, gene therapy, personalized medicine applications', 15, 25, 'Analyze genetic technologies', 'genetic technologies, diagnosis, treatment', 'analyze', JSON_ARRAY('technology', 'essay'), 0, TRUE, 10, NULL),
(9, 17, 10, 'essay', 'medium', 'Discuss the ethical implications of genetic engineering.', NULL, 'GMO concerns, gene editing ethics, privacy in genetic testing', 10, 18, 'Evaluate genetic ethics', 'genetic engineering, ethics', 'evaluate', JSON_ARRAY('ethics', 'essay'), 0, TRUE, 10, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- CHE1101: General Chemistry (Course ID: 10) - Multiple Choice
-- Study Unit 19: Atoms
(10, 19, 11, 'multiple_choice', 'easy', 'What is the atomic number of an element?', JSON_ARRAY('Number of protons', 'Number of neutrons', 'Number of electrons', 'Total mass number'), 'Number of protons', 2, 3, 'Describe atoms', 'atomic number, protons', 'remember', JSON_ARRAY('atomic-structure', 'mcq'), 0, TRUE, 11, NULL),
(10, 19, 11, 'multiple_choice', 'easy', 'Which subatomic particle has a negative charge?', JSON_ARRAY('Proton', 'Neutron', 'Electron', 'Positron'), 'Electron', 2, 3, 'Understand atomic particles', 'electrons, charge', 'remember', JSON_ARRAY('subatomic', 'mcq'), 0, TRUE, 11, NULL),
(10, 19, 11, 'multiple_choice', 'medium', 'What does the Pauli Exclusion Principle state?', JSON_ARRAY('Electrons fill lowest energy first', 'No two electrons can have same quantum numbers', 'Electrons pair with opposite spins', 'Orbitals have specific shapes'), 'No two electrons can have same quantum numbers', 3, 4, 'Apply quantum principles', 'Pauli exclusion, quantum numbers', 'apply', JSON_ARRAY('quantum', 'mcq'), 0, TRUE, 11, NULL),

-- Study Unit 20: Periodic Table
(10, 20, 11, 'multiple_choice', 'medium', 'Which group contains the most reactive metals?', JSON_ARRAY('Alkali metals', 'Alkaline earth metals', 'Halogens', 'Noble gases'), 'Alkali metals', 3, 4, 'Understand periodic trends', 'alkali metals, reactivity', 'understand', JSON_ARRAY('periodic-table', 'mcq'), 0, TRUE, 11, NULL),
(10, 20, 11, 'multiple_choice', 'hard', 'What is the general trend for atomic radius across a period?', JSON_ARRAY('Increases', 'Decreases', 'Remains constant', 'Varies randomly'), 'Decreases', 4, 5, 'Analyze periodic trends', 'atomic radius, periodic trend', 'analyze', JSON_ARRAY('trends', 'mcq'), 0, TRUE, 11, NULL),

-- CHE1101: True/False Questions
-- Study Unit 19: Atoms
(10, 19, 11, 'true_false', 'easy', 'Isotopes have the same number of protons but different neutrons.', NULL, 'true', 1, 2, 'Understand isotope concepts', 'isotopes, protons, neutrons', 'remember', JSON_ARRAY('isotopes', 'tf'), 0, TRUE, 11, NULL),
(10, 19, 11, 'true_false', 'easy', 'Electrons are located in the nucleus of an atom.', NULL, 'false', 1, 2, 'Identify atomic structure', 'electrons, nucleus', 'remember', JSON_ARRAY('atomic-structure', 'tf'), 0, TRUE, 11, NULL),
(10, 19, 11, 'true_false', 'medium', 'The Heisenberg Uncertainty Principle states we cannot know both position and momentum exactly.', NULL, 'true', 2, 3, 'Apply quantum principles', 'Heisenberg, uncertainty', 'apply', JSON_ARRAY('quantum', 'tf'), 0, TRUE, 11, NULL),

-- Study Unit 20: Periodic Table
(10, 20, 11, 'true_false', 'medium', 'Ionization energy decreases across a period from left to right.', NULL, 'false', 2, 3, 'Understand periodic trends', 'ionization energy, trends', 'understand', JSON_ARRAY('periodic', 'tf'), 0, TRUE, 11, NULL),
(10, 20, 11, 'true_false', 'hard', 'Electronegativity is highest for noble gases.', NULL, 'false', 3, 4, 'Evaluate electronegativity', 'electronegativity, noble gases', 'evaluate', JSON_ARRAY('electronegativity', 'tf'), 0, TRUE, 11, NULL),

-- CHE1101: Short Answer Questions
-- Study Unit 19: Atoms
(10, 19, 11, 'short_answer', 'medium', 'What is the difference between atomic mass and mass number?', NULL, 'Atomic mass is weighted average of isotopes, mass number is protons + neutrons', 4, 5, 'Differentiate mass concepts', 'atomic mass, mass number', 'understand', JSON_ARRAY('mass-concepts', 'short-answer'), 0, TRUE, 11, NULL),
(10, 19, 11, 'short_answer', 'medium', 'Describe the electron configuration of oxygen.', NULL, '1s² 2s² 2p⁴', 4, 5, 'Apply electron configuration', 'electron configuration, oxygen', 'apply', JSON_ARRAY('electron-config', 'short-answer'), 0, TRUE, 11, NULL),

-- Study Unit 20: Periodic Table
(10, 20, 11, 'short_answer', 'medium', 'What are the main characteristics of transition metals?', NULL, 'Form colored compounds, multiple oxidation states, catalytic properties', 4, 6, 'Understand metal properties', 'transition metals, characteristics', 'understand', JSON_ARRAY('metals', 'short-answer'), 0, TRUE, 11, NULL),
(10, 20, 11, 'short_answer', 'hard', 'Explain why atomic radius decreases across a period.', NULL, 'Increasing nuclear charge pulls electrons closer, no new electron shells', 5, 7, 'Analyze periodic trends', 'atomic radius, nuclear charge', 'analyze', JSON_ARRAY('trends', 'short-answer'), 0, TRUE, 11, NULL),
(10, 19, 11, 'short_answer', 'easy', 'What does AMU stand for in chemistry?', NULL, 'Atomic Mass Unit', 3, 4, 'Identify chemical terms', 'AMU, units', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 11, NULL),

-- CHE1101: Essay Questions
-- Study Unit 19: Atoms
(10, 19, 11, 'essay', 'medium', 'Discuss the quantum mechanical model of the atom.', NULL, 'Electrons in orbitals with specific energy levels and quantum numbers', 12, 20, 'Evaluate atomic models', 'quantum model, orbitals', 'evaluate', JSON_ARRAY('quantum-model', 'essay'), 0, TRUE, 11, NULL),
(10, 19, 11, 'essay', 'hard', 'Compare and contrast the Bohr model with the quantum mechanical model.', NULL, 'Bohr: fixed orbits; Quantum: probability orbitals, wave-particle duality', 15, 25, 'Analyze atomic models', 'Bohr model, quantum model', 'analyze', JSON_ARRAY('atomic-models', 'essay'), 0, TRUE, 11, NULL),

-- Study Unit 20: Periodic Table
(10, 20, 11, 'essay', 'medium', 'Explain the periodic trends in electronegativity and electron affinity.', NULL, 'Both increase across period, decrease down group; related to atomic size', 12, 20, 'Apply periodic trends', 'electronegativity, electron affinity', 'apply', JSON_ARRAY('periodic-trends', 'essay'), 0, TRUE, 11, NULL),
(10, 20, 11, 'essay', 'hard', 'Describe how the periodic table is organized and its predictive power.', NULL, 'By atomic number, groups show similar properties; predicts element behavior', 15, 25, 'Analyze periodic organization', 'periodic table, organization', 'analyze', JSON_ARRAY('periodic-table', 'essay'), 0, TRUE, 11, NULL),
(10, 19, 11, 'essay', 'medium', 'Discuss the importance of valence electrons in chemical bonding.', NULL, 'Determine bonding behavior, chemical reactivity, and compound formation', 10, 18, 'Evaluate bonding concepts', 'valence electrons, bonding', 'evaluate', JSON_ARRAY('bonding', 'essay'), 0, TRUE, 11, NULL),

-- CHE2204: Organic Chemistry (Course ID: 11) - Multiple Choice
-- Study Unit 21: Hydrocarbons
(11, 21, 11, 'multiple_choice', 'easy', 'Which hydrocarbon has only single bonds?', JSON_ARRAY('Alkane', 'Alkene', 'Alkyne', 'Aromatic'), 'Alkane', 2, 3, 'Classify hydrocarbons', 'alkanes, single bonds', 'remember', JSON_ARRAY('hydrocarbons', 'mcq'), 0, TRUE, 11, NULL),
(11, 21, 11, 'multiple_choice', 'medium', 'What is the general formula for alkenes?', JSON_ARRAY('CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnHn'), 'CnH2n', 3, 4, 'Apply hydrocarbon formulas', 'alkenes, general formula', 'apply', JSON_ARRAY('formulas', 'mcq'), 0, TRUE, 11, NULL),
(11, 21, 11, 'multiple_choice', 'medium', 'Which type of isomerism occurs in alkenes?', JSON_ARRAY('Chain', 'Position', 'Geometric', 'All of the above'), 'All of the above', 3, 4, 'Understand isomerism', 'isomerism, alkenes', 'understand', JSON_ARRAY('isomerism', 'mcq'), 0, TRUE, 11, NULL),

-- Study Unit 22: Reactions
(11, 22, 11, 'multiple_choice', 'medium', 'What type of reaction converts alkenes to alkanes?', JSON_ARRAY('Substitution', 'Addition', 'Elimination', 'Oxidation'), 'Addition', 3, 4, 'Explain reaction types', 'addition, alkenes', 'understand', JSON_ARRAY('reactions', 'mcq'), 0, TRUE, 11, NULL),
(11, 22, 11, 'multiple_choice', 'hard', 'Which mechanism describes free radical substitution?', JSON_ARRAY('Initiation, propagation, termination', 'SN1, SN2', 'E1, E2', 'Electrophilic addition'), 'Initiation, propagation, termination', 4, 5, 'Analyze reaction mechanisms', 'free radical, substitution', 'analyze', JSON_ARRAY('mechanisms', 'mcq'), 0, TRUE, 11, NULL),

-- CHE2204: True/False Questions
-- Study Unit 21: Hydrocarbons
(11, 21, 11, 'true_false', 'easy', 'Methane is the simplest alkane.', NULL, 'true', 1, 2, 'Identify hydrocarbons', 'methane, alkane', 'remember', JSON_ARRAY('hydrocarbons', 'tf'), 0, TRUE, 11, NULL),
(11, 21, 11, 'true_false', 'easy', 'Benzene has alternating single and double bonds.', NULL, 'true', 1, 2, 'Understand aromatic compounds', 'benzene, bonds', 'remember', JSON_ARRAY('aromatic', 'tf'), 0, TRUE, 11, NULL),
(11, 21, 11, 'true_false', 'medium', 'Cycloalkanes have the same general formula as alkenes.', NULL, 'true', 2, 3, 'Apply hydrocarbon formulas', 'cycloalkanes, formulas', 'apply', JSON_ARRAY('formulas', 'tf'), 0, TRUE, 11, NULL),

-- Study Unit 22: Reactions
(11, 22, 11, 'true_false', 'medium', 'Markovnikov''s rule applies to addition reactions.', NULL, 'true', 2, 3, 'Understand reaction rules', 'Markovnikov, addition', 'understand', JSON_ARRAY('reactions', 'tf'), 0, TRUE, 11, NULL),
(11, 22, 11, 'true_false', 'hard', 'All substitution reactions follow SN2 mechanism.', NULL, 'false', 3, 4, 'Evaluate reaction mechanisms', 'substitution, mechanisms', 'evaluate', JSON_ARRAY('mechanisms', 'tf'), 0, TRUE, 11, NULL),

-- CHE2204: Short Answer Questions
-- Study Unit 21: Hydrocarbons
(11, 21, 11, 'short_answer', 'medium', 'What is the difference between saturated and unsaturated hydrocarbons?', NULL, 'Saturated: only single bonds; Unsaturated: double or triple bonds', 4, 5, 'Differentiate hydrocarbon types', 'saturated, unsaturated', 'understand', JSON_ARRAY('hydrocarbons', 'short-answer'), 0, TRUE, 11, NULL),
(11, 21, 11, 'short_answer', 'medium', 'Describe the structure of benzene.', NULL, 'Hexagonal ring with delocalized pi electrons', 4, 5, 'Understand aromatic structure', 'benzene, structure', 'understand', JSON_ARRAY('aromatic', 'short-answer'), 0, TRUE, 11, NULL),

-- Study Unit 22: Reactions
(11, 22, 11, 'short_answer', 'medium', 'What is Markovnikov''s rule?', NULL, 'In addition to unsymmetrical alkenes, H adds to carbon with more H atoms', 4, 6, 'Apply reaction rules', 'Markovnikov, addition', 'apply', JSON_ARRAY('reactions', 'short-answer'), 0, TRUE, 11, NULL),
(11, 22, 11, 'short_answer', 'hard', 'Explain the difference between SN1 and SN2 mechanisms.', NULL, 'SN1: two steps, carbocation; SN2: one step, backside attack', 5, 7, 'Analyze reaction mechanisms', 'SN1, SN2, mechanisms', 'analyze', JSON_ARRAY('mechanisms', 'short-answer'), 0, TRUE, 11, NULL),
(11, 21, 11, 'short_answer', 'easy', 'What does IUPAC stand for?', NULL, 'International Union of Pure and Applied Chemistry', 3, 4, 'Identify chemical organizations', 'IUPAC, nomenclature', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 11, NULL),

-- CHE2204: Essay Questions
-- Study Unit 21: Hydrocarbons
(11, 21, 11, 'essay', 'medium', 'Discuss the importance of isomerism in organic chemistry.', NULL, 'Same formula, different properties; structural, stereoisomerism types', 12, 20, 'Evaluate isomerism concepts', 'isomerism, organic chemistry', 'evaluate', JSON_ARRAY('isomerism', 'essay'), 0, TRUE, 11, NULL),
(11, 21, 11, 'essay', 'hard', 'Compare and contrast aliphatic and aromatic hydrocarbons.', NULL, 'Aliphatic: straight chains; Aromatic: ring structures with delocalized electrons', 15, 25, 'Analyze hydrocarbon types', 'aliphatic, aromatic', 'analyze', JSON_ARRAY('hydrocarbons', 'essay'), 0, TRUE, 11, NULL),

-- Study Unit 22: Reactions
(11, 22, 11, 'essay', 'medium', 'Explain the different types of organic reactions and provide examples.', NULL, 'Substitution, addition, elimination, oxidation-reduction reactions', 12, 20, 'Apply reaction classification', 'reaction types, examples', 'apply', JSON_ARRAY('reactions', 'essay'), 0, TRUE, 11, NULL),
(11, 22, 11, 'essay', 'hard', 'Describe the mechanisms of electrophilic aromatic substitution.', NULL, 'Electrophile attack, carbocation intermediate, proton loss; nitration, halogenation', 15, 25, 'Analyze aromatic reactions', 'electrophilic substitution, mechanisms', 'analyze', JSON_ARRAY('aromatic-reactions', 'essay'), 0, TRUE, 11, NULL),
(11, 21, 11, 'essay', 'medium', 'Discuss the role of functional groups in determining organic compound properties.', NULL, 'Determine reactivity, physical properties, and biological activity', 10, 18, 'Evaluate functional groups', 'functional groups, properties', 'evaluate', JSON_ARRAY('functional-groups', 'essay'), 0, TRUE, 11, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- PHY1101: General Physics (Course ID: 12) - Multiple Choice
-- Study Unit 23: Kinematics
(12, 23, 12, 'multiple_choice', 'easy', 'What is the SI unit of velocity?', JSON_ARRAY('m/s²', 'm/s', 'N/s', 'kg·m/s'), 'm/s', 2, 3, 'Analyze motion', 'velocity, SI units', 'remember', JSON_ARRAY('kinematics', 'mcq'), 0, TRUE, 12, NULL),
(12, 23, 12, 'multiple_choice', 'easy', 'Which quantity has both magnitude and direction?', JSON_ARRAY('Scalar', 'Vector', 'Tensor', 'Unit'), 'Vector', 2, 3, 'Understand motion concepts', 'vector, magnitude, direction', 'remember', JSON_ARRAY('vectors', 'mcq'), 0, TRUE, 12, NULL),
(12, 23, 12, 'multiple_choice', 'medium', 'What does the area under a velocity-time graph represent?', JSON_ARRAY('Acceleration', 'Displacement', 'Velocity', 'Distance'), 'Displacement', 3, 4, 'Apply motion graphs', 'velocity-time graph, displacement', 'apply', JSON_ARRAY('graphs', 'mcq'), 0, TRUE, 12, NULL),

-- Study Unit 24: Forces
(12, 24, 12, 'multiple_choice', 'medium', 'According to Newton''s First Law, an object at rest will:', JSON_ARRAY('Accelerate', 'Remain at rest', 'Move at constant velocity', 'Fall'), 'Remain at rest', 3, 4, 'Apply motion laws', 'Newton first law, inertia', 'apply', JSON_ARRAY('newton-laws', 'mcq'), 0, TRUE, 12, NULL),
(12, 24, 12, 'multiple_choice', 'hard', 'What is the relationship between force, mass, and acceleration?', JSON_ARRAY('F = m/a', 'F = ma', 'F = mv', 'F = m²a'), 'F = ma', 4, 5, 'Analyze force concepts', 'Newton second law, F=ma', 'analyze', JSON_ARRAY('newton-laws', 'mcq'), 0, TRUE, 12, NULL),

-- PHY1101: True/False Questions
-- Study Unit 23: Kinematics
(12, 23, 12, 'true_false', 'easy', 'Acceleration is the rate of change of velocity.', NULL, 'true', 1, 2, 'Understand acceleration', 'acceleration, velocity change', 'remember', JSON_ARRAY('kinematics', 'tf'), 0, TRUE, 12, NULL),
(12, 23, 12, 'true_false', 'easy', 'Distance and displacement are always equal.', NULL, 'false', 1, 2, 'Differentiate motion concepts', 'distance, displacement', 'remember', JSON_ARRAY('motion', 'tf'), 0, TRUE, 12, NULL),
(12, 23, 12, 'true_false', 'medium', 'Projectile motion follows a parabolic path.', NULL, 'true', 2, 3, 'Apply projectile motion', 'projectile motion, parabolic', 'apply', JSON_ARRAY('projectile', 'tf'), 0, TRUE, 12, NULL),

-- Study Unit 24: Forces
(12, 24, 12, 'true_false', 'medium', 'Friction always opposes motion.', NULL, 'true', 2, 3, 'Understand friction', 'friction, motion opposition', 'understand', JSON_ARRAY('friction', 'tf'), 0, TRUE, 12, NULL),
(12, 24, 12, 'true_false', 'hard', 'The normal force is always equal to the weight of an object.', NULL, 'false', 3, 4, 'Evaluate normal force', 'normal force, weight', 'evaluate', JSON_ARRAY('forces', 'tf'), 0, TRUE, 12, NULL),

-- PHY1101: Short Answer Questions
-- Study Unit 23: Kinematics
(12, 23, 12, 'short_answer', 'medium', 'What is the difference between speed and velocity?', NULL, 'Speed is scalar (magnitude only), velocity is vector (magnitude and direction)', 4, 5, 'Differentiate motion quantities', 'speed, velocity, scalar, vector', 'understand', JSON_ARRAY('motion', 'short-answer'), 0, TRUE, 12, NULL),
(12, 23, 12, 'short_answer', 'medium', 'Write the equations of motion for constant acceleration.', NULL, 'v = u + at; s = ut + ½at²; v² = u² + 2as', 4, 5, 'Apply motion equations', 'equations of motion, constant acceleration', 'apply', JSON_ARRAY('kinematics', 'short-answer'), 0, TRUE, 12, NULL),

-- Study Unit 24: Forces
(12, 24, 12, 'short_answer', 'medium', 'State Newton''s Three Laws of Motion.', NULL, '1: Inertia, 2: F=ma, 3: Action-reaction pairs', 4, 6, 'Understand Newton laws', 'Newton laws, motion', 'understand', JSON_ARRAY('newton-laws', 'short-answer'), 0, TRUE, 12, NULL),
(12, 24, 12, 'short_answer', 'hard', 'Explain the concept of free fall and its acceleration.', NULL, 'Motion under gravity only; acceleration = g (9.8 m/s² downward)', 5, 7, 'Analyze free fall', 'free fall, gravity, acceleration', 'analyze', JSON_ARRAY('gravity', 'short-answer'), 0, TRUE, 12, NULL),
(12, 23, 12, 'short_answer', 'easy', 'What does SUVAT stand for in kinematics?', NULL, 'Displacement (s), Initial velocity (u), Final velocity (v), Acceleration (a), Time (t)', 3, 4, 'Identify kinematics terms', 'SUVAT, equations', 'remember', JSON_ARRAY('kinematics', 'short-answer'), 0, TRUE, 12, NULL),

-- PHY1101: Essay Questions
-- Study Unit 23: Kinematics
(12, 23, 12, 'essay', 'medium', 'Discuss the motion of a projectile and the factors affecting its range.', NULL, 'Parabolic path; range depends on initial velocity, angle, and gravity', 12, 20, 'Evaluate projectile motion', 'projectile motion, range factors', 'evaluate', JSON_ARRAY('projectile', 'essay'), 0, TRUE, 12, NULL),
(12, 23, 12, 'essay', 'hard', 'Compare and rectilinear and curvilinear motion with examples.', NULL, 'Rectilinear: straight line; Curvilinear: curved path; examples for each', 15, 25, 'Analyze motion types', 'rectilinear, curvilinear, motion', 'analyze', JSON_ARRAY('motion-types', 'essay'), 0, TRUE, 12, NULL),

-- Study Unit 24: Forces
(12, 24, 12, 'essay', 'medium', 'Explain how friction affects motion in everyday situations.', NULL, 'Walking, driving, braking; static and kinetic friction roles', 12, 20, 'Apply friction concepts', 'friction, everyday motion', 'apply', JSON_ARRAY('friction', 'essay'), 0, TRUE, 12, NULL),
(12, 24, 12, 'essay', 'hard', 'Describe the principle of conservation of momentum with applications.', NULL, 'Total momentum constant in isolated system; collisions, rocket propulsion', 15, 25, 'Analyze momentum conservation', 'momentum conservation, applications', 'analyze', JSON_ARRAY('momentum', 'essay'), 0, TRUE, 12, NULL),
(12, 23, 12, 'essay', 'medium', 'Discuss the importance of reference frames in describing motion.', NULL, 'Motion relative to observer; inertial and non-inertial frames', 10, 18, 'Evaluate reference frames', 'reference frames, relative motion', 'evaluate', JSON_ARRAY('reference-frames', 'essay'), 0, TRUE, 12, NULL),

-- PHY2203: Electromagnetism (Course ID: 13) - Multiple Choice
-- Study Unit 25: Electric Fields
(13, 25, 12, 'multiple_choice', 'easy', 'What is the SI unit of electric charge?', JSON_ARRAY('Volt', 'Ampere', 'Coulomb', 'Ohm'), 'Coulomb', 2, 3, 'Define electric fields', 'electric charge, coulomb', 'remember', JSON_ARRAY('electrostatics', 'mcq'), 0, TRUE, 12, NULL),
(13, 25, 12, 'multiple_choice', 'medium', 'What does Coulomb''s Law describe?', JSON_ARRAY('Magnetic force', 'Electric force between charges', 'Gravitational force', 'Nuclear force'), 'Electric force between charges', 3, 4, 'Understand electric forces', 'Coulomb law, electric force', 'understand', JSON_ARRAY('electrostatics', 'mcq'), 0, TRUE, 12, NULL),
(13, 25, 12, 'multiple_choice', 'medium', 'What is the direction of electric field lines?', JSON_ARRAY('Positive to negative', 'Negative to positive', 'North to south', 'Random'), 'Positive to negative', 3, 4, 'Apply field concepts', 'electric field, direction', 'apply', JSON_ARRAY('fields', 'mcq'), 0, TRUE, 12, NULL),

-- Study Unit 26: Magnetic Fields
(13, 26, 12, 'multiple_choice', 'medium', 'What creates a magnetic field?', JSON_ARRAY('Stationary charges', 'Moving charges', 'Mass', 'Temperature'), 'Moving charges', 3, 4, 'Explain magnetic fields', 'magnetic field, moving charges', 'understand', JSON_ARRAY('magnetism', 'mcq'), 0, TRUE, 12, NULL),
(13, 26, 12, 'multiple_choice', 'hard', 'According to Faraday''s Law, what induces an EMF?', JSON_ARRAY('Constant magnetic field', 'Changing magnetic flux', 'Static charge', 'Steady current'), 'Changing magnetic flux', 4, 5, 'Analyze electromagnetic induction', 'Faraday law, EMF induction', 'analyze', JSON_ARRAY('induction', 'mcq'), 0, TRUE, 12, NULL),

-- PHY2203: True/False Questions
-- Study Unit 25: Electric Fields
(13, 25, 12, 'true_false', 'easy', 'Like charges attract each other.', NULL, 'false', 1, 2, 'Understand charge interactions', 'like charges, repulsion', 'remember', JSON_ARRAY('electrostatics', 'tf'), 0, TRUE, 12, NULL),
(13, 25, 12, 'true_false', 'easy', 'Electric potential is a scalar quantity.', NULL, 'true', 1, 2, 'Identify potential properties', 'electric potential, scalar', 'remember', JSON_ARRAY('potential', 'tf'), 0, TRUE, 12, NULL),
(13, 25, 12, 'true_false', 'medium', 'Capacitance depends on the voltage applied.', NULL, 'false', 2, 3, 'Apply capacitance concepts', 'capacitance, voltage independence', 'apply', JSON_ARRAY('capacitance', 'tf'), 0, TRUE, 12, NULL),

-- Study Unit 26: Magnetic Fields
(13, 26, 12, 'true_false', 'medium', 'Magnetic monopoles have been experimentally confirmed.', NULL, 'false', 2, 3, 'Understand magnetic properties', 'magnetic monopoles, existence', 'understand', JSON_ARRAY('magnetism', 'tf'), 0, TRUE, 12, NULL),
(13, 26, 12, 'true_false', 'hard', 'Lenz''s Law violates conservation of energy.', NULL, 'false', 3, 4, 'Evaluate electromagnetic laws', 'Lenz law, energy conservation', 'evaluate', JSON_ARRAY('induction', 'tf'), 0, TRUE, 12, NULL),

-- PHY2203: Short Answer Questions
-- Study Unit 25: Electric Fields
(13, 25, 12, 'short_answer', 'medium', 'What is the difference between conductors and insulators?', NULL, 'Conductors allow charge flow, insulators resist charge flow', 4, 5, 'Differentiate materials', 'conductors, insulators, charge flow', 'understand', JSON_ARRAY('materials', 'short-answer'), 0, TRUE, 12, NULL),
(13, 25, 12, 'short_answer', 'medium', 'State Gauss''s Law for electricity.', NULL, 'Electric flux through closed surface equals charge enclosed divided by ε₀', 4, 5, 'Apply Gauss law', 'Gauss law, electric flux', 'apply', JSON_ARRAY('gauss-law', 'short-answer'), 0, TRUE, 12, NULL),

-- Study Unit 26: Magnetic Fields
(13, 26, 12, 'short_answer', 'medium', 'What is the right-hand rule for magnetic fields around currents?', NULL, 'Thumb points current direction, fingers curl in field direction', 4, 6, 'Understand magnetic rules', 'right-hand rule, magnetic field', 'understand', JSON_ARRAY('magnetism', 'short-answer'), 0, TRUE, 12, NULL),
(13, 26, 12, 'short_answer', 'hard', 'Explain how transformers work using electromagnetic induction.', NULL, 'Changing current in primary induces voltage in secondary via magnetic flux', 5, 7, 'Analyze transformer operation', 'transformers, electromagnetic induction', 'analyze', JSON_ARRAY('transformers', 'short-answer'), 0, TRUE, 12, NULL),
(13, 25, 12, 'short_answer', 'easy', 'What does EMF stand for?', NULL, 'Electromotive Force', 3, 4, 'Identify electrical terms', 'EMF, electromotive force', 'remember', JSON_ARRAY('terms', 'short-answer'), 0, TRUE, 12, NULL),

-- PHY2203: Essay Questions
-- Study Unit 25: Electric Fields
(13, 25, 12, 'essay', 'medium', 'Discuss the concept of electric potential energy and its applications.', NULL, 'Energy of charge in field; capacitors, batteries, circuits', 12, 20, 'Evaluate potential energy', 'electric potential energy, applications', 'evaluate', JSON_ARRAY('potential-energy', 'essay'), 0, TRUE, 12, NULL),
(13, 25, 12, 'essay', 'hard', 'Compare and contrast electric and gravitational fields.', NULL, 'Both inverse-square laws; electric: attraction/repulsion, gravitational: only attraction', 15, 25, 'Analyze field similarities', 'electric field, gravitational field', 'analyze', JSON_ARRAY('field-comparison', 'essay'), 0, TRUE, 12, NULL),

-- Study Unit 26: Magnetic Fields
(13, 26, 12, 'essay', 'medium', 'Explain the principles behind electric motors and generators.', NULL, 'Motors: force on current in field; Generators: induced EMF from motion in field', 12, 20, 'Apply electromagnetic principles', 'electric motors, generators', 'apply', JSON_ARRAY('electromagnetic-devices', 'essay'), 0, TRUE, 12, NULL),
(13, 26, 12, 'essay', 'hard', 'Describe Maxwell''s Equations and their significance in electromagnetism.', NULL, 'Gauss electric, Gauss magnetic, Faraday, Ampere-Maxwell; unified theory', 15, 25, 'Analyze electromagnetic theory', 'Maxwell equations, significance', 'analyze', JSON_ARRAY('maxwell', 'essay'), 0, TRUE, 12, NULL),
(13, 25, 12, 'essay', 'medium', 'Discuss the practical applications of capacitors in electronic circuits.', NULL, 'Energy storage, filtering, timing circuits, power conditioning', 10, 18, 'Evaluate capacitor applications', 'capacitors, electronic circuits', 'evaluate', JSON_ARRAY('capacitors', 'essay'), 0, TRUE, 12, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- LAW1101: Introduction to Legal Systems (Course ID: 14) - Multiple Choice
-- Study Unit 27: Legal Systems
(14, 27, 13, 'multiple_choice', 'easy', 'Which legal system is based on judicial precedents?', JSON_ARRAY('Civil Law', 'Common Law', 'Religious Law', 'Customary Law'), 'Common Law', 2, 3, 'Identify legal systems', 'common law, precedents', 'remember', JSON_ARRAY('legal-systems', 'mcq'), 0, TRUE, 13, NULL),
(14, 27, 13, 'multiple_choice', 'easy', 'What is the primary source of law in civil law systems?', JSON_ARRAY('Judicial decisions', 'Codified statutes', 'Customs', 'Religious texts'), 'Codified statutes', 2, 3, 'Understand legal sources', 'civil law, codified statutes', 'remember', JSON_ARRAY('legal-sources', 'mcq'), 0, TRUE, 13, NULL),
(14, 27, 13, 'multiple_choice', 'medium', 'Which principle means "to stand by things decided"?', JSON_ARRAY('Res ipsa loquitur', 'Stare decisis', 'Habeas corpus', 'Actus reus'), 'Stare decisis', 3, 4, 'Apply legal principles', 'stare decisis, precedent', 'apply', JSON_ARRAY('legal-principles', 'mcq'), 0, TRUE, 13, NULL),

-- Study Unit 28: Courts
(14, 28, 13, 'multiple_choice', 'medium', 'Which court handles the most serious criminal cases?', JSON_ARRAY('Magistrate Court', 'High Court', 'Supreme Court', 'Court of Appeal'), 'High Court', 3, 4, 'Describe courts', 'court hierarchy, criminal cases', 'understand', JSON_ARRAY('courts', 'mcq'), 0, TRUE, 13, NULL),
(14, 28, 13, 'multiple_choice', 'hard', 'What is the doctrine of judicial precedent?', JSON_ARRAY('Judges make law', 'Lower courts bind higher courts', 'Courts follow previous decisions', 'Parliament is sovereign'), 'Courts follow previous decisions', 4, 5, 'Analyze judicial system', 'judicial precedent, doctrine', 'analyze', JSON_ARRAY('precedent', 'mcq'), 0, TRUE, 13, NULL),

-- LAW1101: True/False Questions
-- Study Unit 27: Legal Systems
(14, 27, 13, 'true_false', 'easy', 'Common law originated in England.', NULL, 'true', 1, 2, 'Understand legal history', 'common law, origin', 'remember', JSON_ARRAY('legal-history', 'tf'), 0, TRUE, 13, NULL),
(14, 27, 13, 'true_false', 'easy', 'Statutes are laws made by the judiciary.', NULL, 'false', 1, 2, 'Differentiate law-making bodies', 'statutes, legislature', 'remember', JSON_ARRAY('law-making', 'tf'), 0, TRUE, 13, NULL),
(14, 27, 13, 'true_false', 'medium', 'Customary law is recognized as a source of law in Uganda.', NULL, 'true', 2, 3, 'Apply legal recognition', 'customary law, Uganda', 'apply', JSON_ARRAY('customary-law', 'tf'), 0, TRUE, 13, NULL),

-- Study Unit 28: Courts
(14, 28, 13, 'true_false', 'medium', 'The Supreme Court is the highest court in Uganda.', NULL, 'true', 2, 3, 'Understand court hierarchy', 'supreme court, hierarchy', 'understand', JSON_ARRAY('courts', 'tf'), 0, TRUE, 13, NULL),
(14, 28, 13, 'true_false', 'hard', 'All courts have unlimited jurisdiction.', NULL, 'false', 3, 4, 'Evaluate court jurisdiction', 'jurisdiction, court powers', 'evaluate', JSON_ARRAY('jurisdiction', 'tf'), 0, TRUE, 13, NULL),

-- LAW1101: Short Answer Questions
-- Study Unit 27: Legal Systems
(14, 27, 13, 'short_answer', 'medium', 'What are the main differences between common law and civil law systems?', NULL, 'Common law: judge-made, precedent; Civil law: codified, statutory', 4, 5, 'Compare legal systems', 'common law, civil law, differences', 'understand', JSON_ARRAY('legal-systems', 'short-answer'), 0, TRUE, 13, NULL),
(14, 27, 13, 'short_answer', 'medium', 'Define the term "jurisprudence".', NULL, 'The theory or philosophy of law', 4, 5, 'Understand legal theory', 'jurisprudence, legal theory', 'understand', JSON_ARRAY('legal-theory', 'short-answer'), 0, TRUE, 13, NULL),

-- Study Unit 28: Courts
(14, 28, 13, 'short_answer', 'medium', 'What is the role of the Court of Appeal?', NULL, 'Hears appeals from lower courts and reviews decisions', 4, 6, 'Apply court functions', 'court of appeal, appellate jurisdiction', 'apply', JSON_ARRAY('courts', 'short-answer'), 0, TRUE, 13, NULL),
(14, 28, 13, 'short_answer', 'hard', 'Explain the concept of judicial independence.', NULL, 'Judges free from external influence in decision-making', 5, 7, 'Analyze judicial principles', 'judicial independence, separation of powers', 'analyze', JSON_ARRAY('judiciary', 'short-answer'), 0, TRUE, 13, NULL),
(14, 27, 13, 'short_answer', 'easy', 'What does IPC stand for in criminal law?', NULL, 'Indian Penal Code', 3, 4, 'Identify legal codes', 'IPC, penal code', 'remember', JSON_ARRAY('legal-codes', 'short-answer'), 0, TRUE, 13, NULL),

-- LAW1101: Essay Questions
-- Study Unit 27: Legal Systems
(14, 27, 13, 'essay', 'medium', 'Discuss the sources of law in the Ugandan legal system.', NULL, 'Constitution, statutes, common law, customary law, judicial precedent', 12, 20, 'Evaluate legal sources', 'sources of law, Uganda', 'evaluate', JSON_ARRAY('legal-sources', 'essay'), 0, TRUE, 13, NULL),
(14, 27, 13, 'essay', 'hard', 'Compare and contrast the adversarial and inquisitorial legal systems.', NULL, 'Adversarial: party-driven, judge as referee; Inquisitorial: judge-led investigation', 15, 25, 'Analyze legal procedures', 'adversarial, inquisitorial, legal systems', 'analyze', JSON_ARRAY('legal-procedures', 'essay'), 0, TRUE, 13, NULL),

-- Study Unit 28: Courts
(14, 28, 13, 'essay', 'medium', 'Explain the hierarchy of courts in Uganda and their jurisdictions.', NULL, 'Supreme Court, Court of Appeal, High Court, Magistrate Courts', 12, 20, 'Apply court structure', 'court hierarchy, jurisdiction, Uganda', 'apply', JSON_ARRAY('courts', 'essay'), 0, TRUE, 13, NULL),
(14, 28, 13, 'essay', 'hard', 'Describe the importance of the doctrine of separation of powers in constitutional law.', NULL, 'Prevents concentration of power, checks and balances among branches', 15, 25, 'Analyze constitutional principles', 'separation of powers, constitutional law', 'analyze', JSON_ARRAY('constitutional-law', 'essay'), 0, TRUE, 13, NULL),
(14, 27, 13, 'essay', 'medium', 'Discuss the role of customary law in modern legal systems.', NULL, 'Recognized source, governs personal matters, subject to constitution', 10, 18, 'Evaluate customary law', 'customary law, modern systems', 'evaluate', JSON_ARRAY('customary-law', 'essay'), 0, TRUE, 13, NULL),

-- LAW2205: Contract Law (Course ID: 15) - Multiple Choice
-- Study Unit 29: Contracts Basics
(15, 29, 13, 'multiple_choice', 'easy', 'What are the essential elements of a valid contract?', JSON_ARRAY('Offer, acceptance, consideration', 'Writing, signature, witnesses', 'Registration, stamp duty, filing', 'Intention, capacity, legality'), 'Offer, acceptance, consideration', 2, 3, 'Explain contract elements', 'contract elements, offer, acceptance', 'remember', JSON_ARRAY('contract-law', 'mcq'), 0, TRUE, 13, NULL),
(15, 29, 13, 'multiple_choice', 'medium', 'What is consideration in contract law?', JSON_ARRAY('Serious thought', 'Something of value exchanged', 'Good faith', 'Legal advice'), 'Something of value exchanged', 3, 4, 'Understand contract concepts', 'consideration, value exchange', 'understand', JSON_ARRAY('contract-concepts', 'mcq'), 0, TRUE, 13, NULL),
(15, 29, 13, 'multiple_choice', 'medium', 'Which type of contract must be in writing?', JSON_ARRAY('Simple contract', 'Contract for sale of goods', 'Contract for land sale', 'All contracts'), 'Contract for land sale', 3, 4, 'Apply contract formalities', 'written contracts, land sale', 'apply', JSON_ARRAY('contract-formalities', 'mcq'), 0, TRUE, 13, NULL),

-- Study Unit 30: Breach of Contract
(15, 30, 13, 'multiple_choice', 'medium', 'What is the primary remedy for breach of contract?', JSON_ARRAY('Imprisonment', 'Damages', 'Specific performance', 'Injunction'), 'Damages', 3, 4, 'Explain legal remedies', 'breach, damages, remedies', 'understand', JSON_ARRAY('remedies', 'mcq'), 0, TRUE, 13, NULL),
(15, 30, 13, 'multiple_choice', 'hard', 'What constitutes fundamental breach of contract?', JSON_ARRAY('Minor delay', 'Failure to perform core obligation', 'Poor quality work', 'All breaches'), 'Failure to perform core obligation', 4, 5, 'Analyze breach types', 'fundamental breach, core obligation', 'analyze', JSON_ARRAY('breach', 'mcq'), 0, TRUE, 13, NULL),

-- LAW2205: True/False Questions
-- Study Unit 29: Contracts Basics
(15, 29, 13, 'true_false', 'easy', 'All contracts must be in writing to be valid.', NULL, 'false', 1, 2, 'Understand contract validity', 'written contracts, validity', 'remember', JSON_ARRAY('contract-validity', 'tf'), 0, TRUE, 13, NULL),
(15, 29, 13, 'true_false', 'easy', 'Minors can enter into binding contracts.', NULL, 'false', 1, 2, 'Identify contractual capacity', 'minors, contractual capacity', 'remember', JSON_ARRAY('capacity', 'tf'), 0, TRUE, 13, NULL),
(15, 29, 13, 'true_false', 'medium', 'Past consideration is valid consideration.', NULL, 'false', 2, 3, 'Apply consideration rules', 'past consideration, validity', 'apply', JSON_ARRAY('consideration', 'tf'), 0, TRUE, 13, NULL),

-- Study Unit 30: Breach of Contract
(15, 30, 13, 'true_false', 'medium', 'Specific performance is available for all contract breaches.', NULL, 'false', 2, 3, 'Understand remedy limitations', 'specific performance, limitations', 'understand', JSON_ARRAY('remedies', 'tf'), 0, TRUE, 13, NULL),
(15, 30, 13, 'true_false', 'hard', 'Anticipatory breach occurs before performance is due.', NULL, 'true', 3, 4, 'Evaluate breach timing', 'anticipatory breach, timing', 'evaluate', JSON_ARRAY('breach', 'tf'), 0, TRUE, 13, NULL),

-- LAW2205: Short Answer Questions
-- Study Unit 29: Contracts Basics
(15, 29, 13, 'short_answer', 'medium', 'What is the difference between an offer and an invitation to treat?', NULL, 'Offer: intention to be bound; Invitation to treat: invitation to make offer', 4, 5, 'Differentiate contract concepts', 'offer, invitation to treat', 'understand', JSON_ARRAY('contract-formation', 'short-answer'), 0, TRUE, 13, NULL),
(15, 29, 13, 'short_answer', 'medium', 'Define the term "voidable contract".', NULL, 'Contract that can be affirmed or rejected by one party', 4, 5, 'Understand contract types', 'voidable contract, definition', 'understand', JSON_ARRAY('contract-types', 'short-answer'), 0, TRUE, 13, NULL),

-- Study Unit 30: Breach of Contract
(15, 30, 13, 'short_answer', 'medium', 'What are the elements of misrepresentation?', NULL, 'False statement of fact, addressed to party, induces contract', 4, 6, 'Apply misrepresentation concepts', 'misrepresentation, elements', 'apply', JSON_ARRAY('misrepresentation', 'short-answer'), 0, TRUE, 13, NULL),
(15, 30, 13, 'short_answer', 'hard', 'Explain the difference between liquidated damages and penalty clauses.', NULL, 'Liquidated damages: genuine pre-estimate; Penalty: punishment, unenforceable', 5, 7, 'Analyze damage types', 'liquidated damages, penalty clauses', 'analyze', JSON_ARRAY('damages', 'short-answer'), 0, TRUE, 13, NULL),
(15, 29, 13, 'short_answer', 'easy', 'What does UCC stand for in commercial law?', NULL, 'Uniform Commercial Code', 3, 4, 'Identify legal codes', 'UCC, commercial law', 'remember', JSON_ARRAY('legal-codes', 'short-answer'), 0, TRUE, 13, NULL),

-- LAW2205: Essay Questions
-- Study Unit 29: Contracts Basics
(15, 29, 13, 'essay', 'medium', 'Discuss the requirement of intention to create legal relations in contract formation.', NULL, 'Parties must intend legal consequences, rebuttable presumptions for social/commercial', 12, 20, 'Evaluate contract formation', 'intention, legal relations', 'evaluate', JSON_ARRAY('contract-formation', 'essay'), 0, TRUE, 13, NULL),
(15, 29, 13, 'essay', 'hard', 'Compare and contrast void, voidable, and unenforceable contracts.', NULL, 'Void: no legal effect; Voidable: valid until avoided; Unenforceable: valid but no action', 15, 25, 'Analyze contract validity', 'void, voidable, unenforceable contracts', 'analyze', JSON_ARRAY('contract-validity', 'essay'), 0, TRUE, 13, NULL),

-- Study Unit 30: Breach of Contract
(15, 30, 13, 'essay', 'medium', 'Explain the various remedies available for breach of contract.', NULL, 'Damages, specific performance, injunction, rescission, restitution', 12, 20, 'Apply contract remedies', 'remedies, breach of contract', 'apply', JSON_ARRAY('remedies', 'essay'), 0, TRUE, 13, NULL),
(15, 30, 13, 'essay', 'hard', 'Describe the doctrine of frustration and its effects on contractual obligations.', NULL, 'Supervening event makes performance impossible, discharges contract', 15, 25, 'Analyze contract discharge', 'frustration, contractual obligations', 'analyze', JSON_ARRAY('contract-discharge', 'essay'), 0, TRUE, 13, NULL),
(15, 29, 13, 'essay', 'medium', 'Discuss the role of good faith in contract law.', NULL, 'Implied duty in some jurisdictions, honesty in performance and enforcement', 10, 18, 'Evaluate contractual duties', 'good faith, contractual duties', 'evaluate', JSON_ARRAY('contract-duties', 'essay'), 0, TRUE, 13, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- BBA1101: Principles of Management (Course ID: 16) - Multiple Choice
-- Study Unit 31: Management Roles
(16, 31, 14, 'multiple_choice', 'easy', 'Which management function involves setting objectives and determining actions?', JSON_ARRAY('Organizing', 'Planning', 'Leading', 'Controlling'), 'Planning', 2, 3, 'Describe managerial roles', 'planning, management functions', 'remember', JSON_ARRAY('management-functions', 'mcq'), 0, TRUE, 14, NULL),
(16, 31, 14, 'multiple_choice', 'easy', 'What are the three levels of management in most organizations?', JSON_ARRAY('Top, Middle, Front-line', 'Senior, Junior, Trainee', 'Executive, Managerial, Supervisory', 'Strategic, Tactical, Operational'), 'Top, Middle, Front-line', 2, 3, 'Understand management hierarchy', 'management levels, hierarchy', 'remember', JSON_ARRAY('management-levels', 'mcq'), 0, TRUE, 14, NULL),
(16, 31, 14, 'multiple_choice', 'medium', 'Which management role involves resolving conflicts among subordinates?', JSON_ARRAY('Figurehead', 'Leader', 'Disturbance handler', 'Resource allocator'), 'Disturbance handler', 3, 4, 'Apply management roles', 'disturbance handler, conflict resolution', 'apply', JSON_ARRAY('management-roles', 'mcq'), 0, TRUE, 14, NULL),

-- Study Unit 32: Leadership
(16, 32, 14, 'multiple_choice', 'medium', 'Which leadership style involves making decisions without consulting subordinates?', JSON_ARRAY('Democratic', 'Autocratic', 'Laissez-faire', 'Transformational'), 'Autocratic', 3, 4, 'Compare leadership types', 'autocratic, leadership styles', 'understand', JSON_ARRAY('leadership-styles', 'mcq'), 0, TRUE, 14, NULL),
(16, 32, 14, 'multiple_choice', 'hard', 'According to Hersey-Blanchard model, what leadership style suits low maturity followers?', JSON_ARRAY('Delegating', 'Participating', 'Selling', 'Telling'), 'Telling', 4, 5, 'Analyze leadership models', 'situational leadership, telling', 'analyze', JSON_ARRAY('leadership-models', 'mcq'), 0, TRUE, 14, NULL),

-- BBA1101: True/False Questions
-- Study Unit 31: Management Roles
(16, 31, 14, 'true_false', 'easy', 'Management and leadership are the same concept.', NULL, 'false', 1, 2, 'Differentiate management concepts', 'management, leadership', 'remember', JSON_ARRAY('management-concepts', 'tf'), 0, TRUE, 14, NULL),
(16, 31, 14, 'true_false', 'easy', 'Controlling involves monitoring performance and taking corrective action.', NULL, 'true', 1, 2, 'Understand control function', 'controlling, performance monitoring', 'remember', JSON_ARRAY('control-function', 'tf'), 0, TRUE, 14, NULL),
(16, 31, 14, 'true_false', 'medium', 'Middle managers primarily focus on strategic planning.', NULL, 'false', 2, 3, 'Apply management level understanding', 'middle managers, strategic planning', 'apply', JSON_ARRAY('management-levels', 'tf'), 0, TRUE, 14, NULL),

-- Study Unit 32: Leadership
(16, 32, 14, 'true_false', 'medium', 'Transformational leadership focuses on maintaining the status quo.', NULL, 'false', 2, 3, 'Understand leadership types', 'transformational leadership, change', 'understand', JSON_ARRAY('leadership', 'tf'), 0, TRUE, 14, NULL),
(16, 32, 14, 'true_false', 'hard', 'According to Fiedler''s Contingency Model, leadership style is fixed and cannot be changed.', NULL, 'true', 3, 4, 'Evaluate leadership theories', 'Fiedler, contingency model', 'evaluate', JSON_ARRAY('leadership-theories', 'tf'), 0, TRUE, 14, NULL),

-- BBA1101: Short Answer Questions
-- Study Unit 31: Management Roles
(16, 31, 14, 'short_answer', 'medium', 'What are the four main functions of management?', NULL, 'Planning, Organizing, Leading, Controlling', 4, 5, 'Identify management functions', 'management functions, POLC', 'remember', JSON_ARRAY('management-functions', 'short-answer'), 0, TRUE, 14, NULL),
(16, 31, 14, 'short_answer', 'medium', 'Differentiate between efficiency and effectiveness.', NULL, 'Efficiency: doing things right; Effectiveness: doing the right things', 4, 5, 'Differentiate performance concepts', 'efficiency, effectiveness', 'understand', JSON_ARRAY('performance-concepts', 'short-answer'), 0, TRUE, 14, NULL),

-- Study Unit 32: Leadership
(16, 32, 14, 'short_answer', 'medium', 'What are the key characteristics of democratic leadership?', NULL, 'Participative decision-making, consultation with team members, shared responsibility', 4, 6, 'Apply leadership concepts', 'democratic leadership, characteristics', 'apply', JSON_ARRAY('leadership-styles', 'short-answer'), 0, TRUE, 14, NULL),
(16, 32, 14, 'short_answer', 'hard', 'Explain the Path-Goal Theory of leadership.', NULL, 'Leaders clarify path to goals, remove obstacles, provide support based on situation', 5, 7, 'Analyze leadership theories', 'path-goal theory, leadership', 'analyze', JSON_ARRAY('leadership-theories', 'short-answer'), 0, TRUE, 14, NULL),
(16, 31, 14, 'short_answer', 'easy', 'What does SWOT stand for in strategic planning?', NULL, 'Strengths, Weaknesses, Opportunities, Threats', 3, 4, 'Identify planning tools', 'SWOT, strategic planning', 'remember', JSON_ARRAY('planning-tools', 'short-answer'), 0, TRUE, 14, NULL),

-- BBA1101: Essay Questions
-- Study Unit 31: Management Roles
(16, 31, 14, 'essay', 'medium', 'Discuss the importance of ethical leadership in modern organizations.', NULL, 'Builds trust, enhances reputation, ensures legal compliance, promotes social responsibility', 12, 20, 'Evaluate ethical leadership', 'ethical leadership, organizational impact', 'evaluate', JSON_ARRAY('ethics', 'essay'), 0, TRUE, 14, NULL),
(16, 31, 14, 'essay', 'hard', 'Compare and contrast the classical and behavioral approaches to management.', NULL, 'Classical: efficiency, structure; Behavioral: human relations, motivation', 15, 25, 'Analyze management theories', 'classical, behavioral, management approaches', 'analyze', JSON_ARRAY('management-theories', 'essay'), 0, TRUE, 14, NULL),

-- Study Unit 32: Leadership
(16, 32, 14, 'essay', 'medium', 'Explain how different leadership styles affect employee motivation and performance.', NULL, 'Autocratic: compliance; Democratic: commitment; Laissez-faire: creativity', 12, 20, 'Apply leadership impact', 'leadership styles, motivation, performance', 'apply', JSON_ARRAY('leadership-impact', 'essay'), 0, TRUE, 14, NULL),
(16, 32, 14, 'essay', 'hard', 'Describe the transformational leadership model and its application in organizational change.', NULL, 'Inspirational motivation, intellectual stimulation, individualized consideration', 15, 25, 'Analyze transformational leadership', 'transformational leadership, organizational change', 'analyze', JSON_ARRAY('leadership-models', 'essay'), 0, TRUE, 14, NULL),
(16, 31, 14, 'essay', 'medium', 'Discuss the challenges faced by managers in the 21st century business environment.', NULL, 'Globalization, technology changes, diversity, ethical dilemmas, sustainability', 10, 18, 'Evaluate modern management', '21st century, management challenges', 'evaluate', JSON_ARRAY('modern-management', 'essay'), 0, TRUE, 14, NULL),

-- BBA2204: Marketing Management (Course ID: 17) - Multiple Choice
-- Study Unit 33: Marketing Mix
(17, 33, 14, 'multiple_choice', 'easy', 'What are the four Ps of the marketing mix?', JSON_ARRAY('Product, Price, Place, Promotion', 'People, Process, Physical evidence, Price', 'Product, Process, Place, Promotion', 'Price, Place, Promotion, Packaging'), 'Product, Price, Place, Promotion', 2, 3, 'Apply marketing mix', 'marketing mix, 4Ps', 'remember', JSON_ARRAY('marketing-mix', 'mcq'), 0, TRUE, 14, NULL),
(17, 33, 14, 'multiple_choice', 'medium', 'Which element of the marketing mix involves distribution channels?', JSON_ARRAY('Product', 'Price', 'Place', 'Promotion'), 'Place', 3, 4, 'Understand marketing elements', 'place, distribution channels', 'understand', JSON_ARRAY('marketing-elements', 'mcq'), 0, TRUE, 14, NULL),
(17, 33, 14, 'multiple_choice', 'medium', 'What is the purpose of market segmentation?', JSON_ARRAY('To increase prices', 'To identify target markets', 'To reduce competition', 'To standardize products'), 'To identify target markets', 3, 4, 'Apply segmentation concepts', 'market segmentation, target markets', 'apply', JSON_ARRAY('segmentation', 'mcq'), 0, TRUE, 14, NULL),

-- Study Unit 34: Consumer Behavior
(17, 34, 14, 'multiple_choice', 'medium', 'Which factor is part of the psychological influences on consumer behavior?', JSON_ARRAY('Culture', 'Social class', 'Motivation', 'Family'), 'Motivation', 3, 4, 'Analyze consumer behavior', 'psychological factors, motivation', 'analyze', JSON_ARRAY('consumer-behavior', 'mcq'), 0, TRUE, 14, NULL),
(17, 34, 14, 'multiple_choice', 'hard', 'According to Maslow''s hierarchy, which need must be satisfied first?', JSON_ARRAY('Esteem needs', 'Safety needs', 'Physiological needs', 'Self-actualization'), 'Physiological needs', 4, 5, 'Analyze consumer motivation', 'Maslow, hierarchy of needs', 'analyze', JSON_ARRAY('motivation', 'mcq'), 0, TRUE, 14, NULL),

-- BBA2204: True/False Questions
-- Study Unit 33: Marketing Mix
(17, 33, 14, 'true_false', 'easy', 'The marketing mix applies only to consumer products.', NULL, 'false', 1, 2, 'Understand marketing scope', 'marketing mix, application', 'remember', JSON_ARRAY('marketing-scope', 'tf'), 0, TRUE, 14, NULL),
(17, 33, 14, 'true_false', 'easy', 'Price is the only element of the marketing mix that generates revenue.', NULL, 'true', 1, 2, 'Identify revenue elements', 'price, revenue generation', 'remember', JSON_ARRAY('marketing-elements', 'tf'), 0, TRUE, 14, NULL),
(17, 33, 14, 'true_false', 'medium', 'Product positioning involves creating a distinct image in consumers'' minds.', NULL, 'true', 2, 3, 'Apply positioning concepts', 'product positioning, brand image', 'apply', JSON_ARRAY('positioning', 'tf'), 0, TRUE, 14, NULL),

-- Study Unit 34: Consumer Behavior
(17, 34, 14, 'true_false', 'medium', 'Cultural factors have the weakest influence on consumer behavior.', NULL, 'false', 2, 3, 'Understand cultural influences', 'cultural factors, consumer behavior', 'understand', JSON_ARRAY('consumer-influences', 'tf'), 0, TRUE, 14, NULL),
(17, 34, 14, 'true_false', 'hard', 'The consumer decision process always begins with information search.', NULL, 'false', 3, 4, 'Evaluate decision process', 'consumer decision process, stages', 'evaluate', JSON_ARRAY('decision-process', 'tf'), 0, TRUE, 14, NULL),

-- BBA2204: Short Answer Questions
-- Study Unit 33: Marketing Mix
(17, 33, 14, 'short_answer', 'medium', 'What is the difference between marketing and selling?', NULL, 'Marketing: customer needs focus; Selling: product focus', 4, 5, 'Differentiate marketing concepts', 'marketing, selling, differences', 'understand', JSON_ARRAY('marketing-concepts', 'short-answer'), 0, TRUE, 14, NULL),
(17, 33, 14, 'short_answer', 'medium', 'Define the term "target market".', NULL, 'Specific group of consumers at which a company aims its products and services', 4, 5, 'Understand targeting concepts', 'target market, definition', 'understand', JSON_ARRAY('targeting', 'short-answer'), 0, TRUE, 14, NULL),

-- Study Unit 34: Consumer Behavior
(17, 34, 14, 'short_answer', 'medium', 'What are the stages of the consumer buying decision process?', NULL, 'Problem recognition, information search, evaluation, purchase, post-purchase', 4, 6, 'Apply decision process', 'consumer decision process, stages', 'apply', JSON_ARRAY('decision-process', 'short-answer'), 0, TRUE, 14, NULL),
(17, 34, 14, 'short_answer', 'hard', 'Explain how reference groups influence consumer behavior.', NULL, 'Provide information, norms for behavior, basis for comparison, social pressure', 5, 7, 'Analyze social influences', 'reference groups, consumer influence', 'analyze', JSON_ARRAY('social-influences', 'short-answer'), 0, TRUE, 14, NULL),
(17, 33, 14, 'short_answer', 'easy', 'What does CRM stand for in marketing?', NULL, 'Customer Relationship Management', 3, 4, 'Identify marketing terms', 'CRM, customer relationship', 'remember', JSON_ARRAY('marketing-terms', 'short-answer'), 0, TRUE, 14, NULL),

-- BBA2204: Essay Questions
-- Study Unit 33: Marketing Mix
(17, 33, 14, 'essay', 'medium', 'Discuss the importance of integrated marketing communications in modern business.', NULL, 'Consistent message across channels, enhanced brand image, improved effectiveness', 12, 20, 'Evaluate marketing communications', 'integrated marketing, communications', 'evaluate', JSON_ARRAY('marketing-communications', 'essay'), 0, TRUE, 14, NULL),
(17, 33, 14, 'essay', 'hard', 'Compare and contrast the product concept and marketing concept orientations.', NULL, 'Product concept: product quality focus; Marketing concept: customer needs focus', 15, 25, 'Analyze marketing orientations', 'product concept, marketing concept', 'analyze', JSON_ARRAY('marketing-orientations', 'essay'), 0, TRUE, 14, NULL),

-- Study Unit 34: Consumer Behavior
(17, 34, 14, 'essay', 'medium', 'Explain how psychological factors affect consumer buying decisions.', NULL, 'Perception, motivation, learning, beliefs, attitudes influence purchase behavior', 12, 20, 'Apply psychological influences', 'psychological factors, consumer decisions', 'apply', JSON_ARRAY('consumer-psychology', 'essay'), 0, TRUE, 14, NULL),
(17, 34, 14, 'essay', 'hard', 'Describe the impact of digital technology on contemporary consumer behavior.', NULL, 'Increased information access, social media influence, online shopping, reviews', 15, 25, 'Analyze digital impact', 'digital technology, consumer behavior', 'analyze', JSON_ARRAY('digital-marketing', 'essay'), 0, TRUE, 14, NULL),
(17, 33, 14, 'essay', 'medium', 'Discuss the ethical considerations in marketing practices.', NULL, 'Truth in advertising, privacy concerns, targeting vulnerable groups, sustainability', 10, 18, 'Evaluate marketing ethics', 'marketing ethics, considerations', 'evaluate', JSON_ARRAY('ethics', 'essay'), 0, TRUE, 14, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- ECO1101: Principles of Microeconomics (Course ID: 18) - Multiple Choice
-- Study Unit 35: Demand & Supply
(18, 35, 15, 'multiple_choice', 'easy', 'What is the law of demand?', JSON_ARRAY('Price up, demand up', 'Price up, demand down', 'Price down, demand down', 'Price unchanged, demand varies'), 'Price up, demand down', 2, 3, 'Explain market forces', 'law of demand, price relationship', 'remember', JSON_ARRAY('demand', 'mcq'), 0, TRUE, 15, NULL),
(18, 35, 15, 'multiple_choice', 'easy', 'What causes a movement along the demand curve?', JSON_ARRAY('Change in consumer income', 'Change in price of the good', 'Change in consumer tastes', 'Change in population'), 'Change in price of the good', 2, 3, 'Understand demand shifts', 'demand curve, movement along', 'remember', JSON_ARRAY('demand-curve', 'mcq'), 0, TRUE, 15, NULL),
(18, 35, 15, 'multiple_choice', 'medium', 'What is equilibrium price?', JSON_ARRAY('Price where demand equals supply', 'Highest possible price', 'Lowest possible price', 'Government-set price'), 'Price where demand equals supply', 3, 4, 'Apply market equilibrium', 'equilibrium price, market clearing', 'apply', JSON_ARRAY('equilibrium', 'mcq'), 0, TRUE, 15, NULL),

-- Study Unit 36: Elasticity
(18, 36, 15, 'multiple_choice', 'medium', 'What does price elasticity of demand measure?', JSON_ARRAY('Responsiveness of quantity demanded to price changes', 'Responsiveness of supply to price changes', 'Total revenue changes', 'Consumer income changes'), 'Responsiveness of quantity demanded to price changes', 3, 4, 'Compute elasticity', 'price elasticity, demand responsiveness', 'understand', JSON_ARRAY('elasticity', 'mcq'), 0, TRUE, 15, NULL),
(18, 36, 15, 'multiple_choice', 'hard', 'When demand is elastic, what happens to total revenue when price decreases?', JSON_ARRAY('Increases', 'Decreases', 'Remains unchanged', 'Becomes zero'), 'Increases', 4, 5, 'Analyze elasticity effects', 'elastic demand, total revenue', 'analyze', JSON_ARRAY('revenue', 'mcq'), 0, TRUE, 15, NULL),

-- ECO1101: True/False Questions
-- Study Unit 35: Demand & Supply
(18, 35, 15, 'true_false', 'easy', 'A normal good has positive income elasticity of demand.', NULL, 'true', 1, 2, 'Understand good types', 'normal good, income elasticity', 'remember', JSON_ARRAY('good-types', 'tf'), 0, TRUE, 15, NULL),
(18, 35, 15, 'true_false', 'easy', 'Supply curves always slope upward.', NULL, 'true', 1, 2, 'Identify supply characteristics', 'supply curve, slope', 'remember', JSON_ARRAY('supply', 'tf'), 0, TRUE, 15, NULL),
(18, 35, 15, 'true_false', 'medium', 'A shortage occurs when price is above equilibrium.', NULL, 'false', 2, 3, 'Apply market conditions', 'shortage, equilibrium price', 'apply', JSON_ARRAY('market-conditions', 'tf'), 0, TRUE, 15, NULL),

-- Study Unit 36: Elasticity
(18, 36, 15, 'true_false', 'medium', 'Perfectly inelastic demand has elasticity equal to zero.', NULL, 'true', 2, 3, 'Understand elasticity extremes', 'perfectly inelastic, zero elasticity', 'understand', JSON_ARRAY('elasticity', 'tf'), 0, TRUE, 15, NULL),
(18, 36, 15, 'true_false', 'hard', 'Cross-price elasticity is positive for complementary goods.', NULL, 'false', 3, 4, 'Evaluate elasticity relationships', 'cross-price elasticity, complementary goods', 'evaluate', JSON_ARRAY('cross-elasticity', 'tf'), 0, TRUE, 15, NULL),

-- ECO1101: Short Answer Questions
-- Study Unit 35: Demand & Supply
(18, 35, 15, 'short_answer', 'medium', 'What is the difference between a change in demand and a change in quantity demanded?', NULL, 'Change in demand: shift of curve; Change in quantity demanded: movement along curve', 4, 5, 'Differentiate demand concepts', 'demand change, quantity demanded change', 'understand', JSON_ARRAY('demand-concepts', 'short-answer'), 0, TRUE, 15, NULL),
(18, 35, 15, 'short_answer', 'medium', 'List three factors that can shift the supply curve.', NULL, 'Input prices, technology, number of sellers, expectations, taxes/subsidies', 4, 5, 'Identify supply shifters', 'supply shifters, factors', 'remember', JSON_ARRAY('supply', 'short-answer'), 0, TRUE, 15, NULL),

-- Study Unit 36: Elasticity
(18, 36, 15, 'short_answer', 'medium', 'What does income elasticity of demand measure?', NULL, 'Responsiveness of quantity demanded to changes in consumer income', 4, 6, 'Apply elasticity concepts', 'income elasticity, measurement', 'apply', JSON_ARRAY('income-elasticity', 'short-answer'), 0, TRUE, 15, NULL),
(18, 36, 15, 'short_answer', 'hard', 'Explain why demand for necessities tends to be inelastic.', NULL, 'Consumers continue buying despite price changes, few substitutes, essential nature', 5, 7, 'Analyze demand characteristics', 'necessities, inelastic demand', 'analyze', JSON_ARRAY('demand-characteristics', 'short-answer'), 0, TRUE, 15, NULL),
(18, 35, 15, 'short_answer', 'easy', 'What is a substitute good?', NULL, 'Good that can be used in place of another good', 3, 4, 'Identify good relationships', 'substitute goods, definition', 'remember', JSON_ARRAY('goods', 'short-answer'), 0, TRUE, 15, NULL),

-- ECO1101: Essay Questions
-- Study Unit 35: Demand & Supply
(18, 35, 15, 'essay', 'medium', 'Discuss how market equilibrium is achieved and maintained in a competitive market.', NULL, 'Interaction of demand and supply, price adjustments, market clearing process', 12, 20, 'Evaluate market equilibrium', 'market equilibrium, competitive markets', 'evaluate', JSON_ARRAY('equilibrium', 'essay'), 0, TRUE, 15, NULL),
(18, 35, 15, 'essay', 'hard', 'Compare and contrast the effects of price ceilings and price floors on market outcomes.', NULL, 'Price ceilings: shortages; Price floors: surpluses; both create market inefficiencies', 15, 25, 'Analyze price controls', 'price ceilings, price floors, market effects', 'analyze', JSON_ARRAY('price-controls', 'essay'), 0, TRUE, 15, NULL),

-- Study Unit 36: Elasticity
(18, 36, 15, 'essay', 'medium', 'Explain the importance of elasticity for business pricing decisions.', NULL, 'Determines revenue impact of price changes, guides pricing strategy', 12, 20, 'Apply elasticity in business', 'elasticity, pricing decisions', 'apply', JSON_ARRAY('business-applications', 'essay'), 0, TRUE, 15, NULL),
(18, 36, 15, 'essay', 'hard', 'Describe how different types of elasticity affect consumer and producer behavior.', NULL, 'Price elasticity: consumption patterns; Income elasticity: spending priorities; Cross elasticity: substitution choices', 15, 25, 'Analyze behavioral impacts', 'elasticity, consumer behavior, producer behavior', 'analyze', JSON_ARRAY('behavioral-economics', 'essay'), 0, TRUE, 15, NULL),
(18, 35, 15, 'essay', 'medium', 'Discuss the role of government intervention in markets and its economic consequences.', NULL, 'Correct market failures, redistribute income, but may create inefficiencies', 10, 18, 'Evaluate government intervention', 'government intervention, market consequences', 'evaluate', JSON_ARRAY('government', 'essay'), 0, TRUE, 15, NULL),

-- ECO2203: Macroeconomics (Course ID: 19) - Multiple Choice
-- Study Unit 37: GDP & Inflation
(19, 37, 15, 'multiple_choice', 'easy', 'What does GDP stand for?', JSON_ARRAY('Gross Domestic Product', 'General Demand Price', 'Government Debt Percentage', 'Growth Development Plan'), 'Gross Domestic Product', 2, 3, 'Understand economic growth', 'GDP, definition', 'remember', JSON_ARRAY('gdp', 'mcq'), 0, TRUE, 15, NULL),
(19, 37, 15, 'multiple_choice', 'medium', 'Which component is included in GDP calculation?', JSON_ARRAY('Intermediate goods', 'Used goods', 'Financial transactions', 'Government spending'), 'Government spending', 3, 4, 'Apply GDP calculation', 'GDP components, government spending', 'apply', JSON_ARRAY('gdp-calculation', 'mcq'), 0, TRUE, 15, NULL),
(19, 37, 15, 'multiple_choice', 'medium', 'What is inflation?', JSON_ARRAY('Increase in specific prices', 'General increase in price level', 'Decrease in money supply', 'Increase in employment'), 'General increase in price level', 3, 4, 'Understand inflation', 'inflation, price level', 'understand', JSON_ARRAY('inflation', 'mcq'), 0, TRUE, 15, NULL),

-- Study Unit 38: Monetary Policy
(19, 38, 15, 'multiple_choice', 'medium', 'What is the primary tool of monetary policy?', JSON_ARRAY('Government spending', 'Taxation', 'Interest rates', 'Price controls'), 'Interest rates', 3, 4, 'Explain monetary policy', 'monetary policy, interest rates', 'understand', JSON_ARRAY('monetary-policy', 'mcq'), 0, TRUE, 15, NULL),
(19, 38, 15, 'multiple_choice', 'hard', 'What is the main goal of contractionary monetary policy?', JSON_ARRAY('Stimulate economic growth', 'Reduce inflation', 'Increase employment', 'Decrease exports'), 'Reduce inflation', 4, 5, 'Analyze policy objectives', 'contractionary policy, inflation control', 'analyze', JSON_ARRAY('policy-objectives', 'mcq'), 0, TRUE, 15, NULL),

-- ECO2203: True/False Questions
-- Study Unit 37: GDP & Inflation
(19, 37, 15, 'true_false', 'easy', 'Real GDP is adjusted for inflation.', NULL, 'true', 1, 2, 'Understand GDP measures', 'real GDP, inflation adjustment', 'remember', JSON_ARRAY('gdp-measures', 'tf'), 0, TRUE, 15, NULL),
(19, 37, 15, 'true_false', 'easy', 'Unemployment rate measures the percentage of working-age population without jobs.', NULL, 'false', 1, 2, 'Identify unemployment measurement', 'unemployment rate, definition', 'remember', JSON_ARRAY('unemployment', 'tf'), 0, TRUE, 15, NULL),
(19, 37, 15, 'true_false', 'medium', 'The Consumer Price Index (CPI) measures changes in production costs.', NULL, 'false', 2, 3, 'Apply price indices', 'CPI, consumer prices', 'apply', JSON_ARRAY('price-indices', 'tf'), 0, TRUE, 15, NULL),

-- Study Unit 38: Monetary Policy
(19, 38, 15, 'true_false', 'medium', 'Central banks use fiscal policy to control money supply.', NULL, 'false', 2, 3, 'Understand policy tools', 'central banks, monetary policy', 'understand', JSON_ARRAY('policy-tools', 'tf'), 0, TRUE, 15, NULL),
(19, 38, 15, 'true_false', 'hard', 'Quantitative easing involves decreasing the money supply.', NULL, 'false', 3, 4, 'Evaluate monetary operations', 'quantitative easing, money supply', 'evaluate', JSON_ARRAY('monetary-operations', 'tf'), 0, TRUE, 15, NULL),

-- ECO2203: Short Answer Questions
-- Study Unit 37: GDP & Inflation
(19, 37, 15, 'short_answer', 'medium', 'What are the four components of GDP using the expenditure approach?', NULL, 'Consumption, Investment, Government Spending, Net Exports', 4, 5, 'Identify GDP components', 'GDP components, expenditure approach', 'remember', JSON_ARRAY('gdp-components', 'short-answer'), 0, TRUE, 15, NULL),
(19, 37, 15, 'short_answer', 'medium', 'Differentiate between cost-push and demand-pull inflation.', NULL, 'Cost-push: supply side factors; Demand-pull: demand side factors', 4, 5, 'Differentiate inflation types', 'cost-push inflation, demand-pull inflation', 'understand', JSON_ARRAY('inflation-types', 'short-answer'), 0, TRUE, 15, NULL),

-- Study Unit 38: Monetary Policy
(19, 38, 15, 'short_answer', 'medium', 'What are the main objectives of monetary policy?', NULL, 'Price stability, full employment, economic growth, exchange rate stability', 4, 6, 'Apply policy objectives', 'monetary policy, objectives', 'apply', JSON_ARRAY('policy-objectives', 'short-answer'), 0, TRUE, 15, NULL),
(19, 38, 15, 'short_answer', 'hard', 'Explain how changes in interest rates affect aggregate demand.', NULL, 'Higher rates reduce borrowing and spending, lower rates stimulate economic activity', 5, 7, 'Analyze interest rate effects', 'interest rates, aggregate demand', 'analyze', JSON_ARRAY('interest-rates', 'short-answer'), 0, TRUE, 15, NULL),
(19, 37, 15, 'short_answer', 'easy', 'What does CPI stand for?', NULL, 'Consumer Price Index', 3, 4, 'Identify economic indicators', 'CPI, economic indicator', 'remember', JSON_ARRAY('indicators', 'short-answer'), 0, TRUE, 15, NULL),

-- ECO2203: Essay Questions
-- Study Unit 37: GDP & Inflation
(19, 37, 15, 'essay', 'medium', 'Discuss the limitations of GDP as a measure of economic well-being.', NULL, 'Excludes non-market activities, ignores income distribution, doesn''t account for environmental costs', 12, 20, 'Evaluate GDP limitations', 'GDP limitations, economic well-being', 'evaluate', JSON_ARRAY('gdp-limitations', 'essay'), 0, TRUE, 15, NULL),
(19, 37, 15, 'essay', 'hard', 'Compare and contrast the Keynesian and Monetarist approaches to economic stabilization.', NULL, 'Keynesian: fiscal policy emphasis; Monetarist: monetary policy emphasis', 15, 25, 'Analyze economic theories', 'Keynesian, Monetarist, economic stabilization', 'analyze', JSON_ARRAY('economic-theories', 'essay'), 0, TRUE, 15, NULL),

-- Study Unit 38: Monetary Policy
(19, 38, 15, 'essay', 'medium', 'Explain the role of central banks in maintaining economic stability.', NULL, 'Control inflation, manage interest rates, regulate banking system, lender of last resort', 12, 20, 'Apply central bank functions', 'central banks, economic stability', 'apply', JSON_ARRAY('central-banking', 'essay'), 0, TRUE, 15, NULL),
(19, 38, 15, 'essay', 'hard', 'Describe the transmission mechanism of monetary policy on the real economy.', NULL, 'Interest rate changes affect investment, consumption, aggregate demand, and output', 15, 25, 'Analyze policy transmission', 'monetary policy, transmission mechanism', 'analyze', JSON_ARRAY('policy-transmission', 'essay'), 0, TRUE, 15, NULL),
(19, 37, 15, 'essay', 'medium', 'Discuss the relationship between inflation and unemployment in the short and long run.', NULL, 'Short run: trade-off (Phillips Curve); Long run: no trade-off', 10, 18, 'Evaluate inflation-unemployment relationship', 'inflation, unemployment, Phillips Curve', 'evaluate', JSON_ARRAY('macro-relationships', 'essay'), 0, TRUE, 15, NULL);


INSERT INTO questions (course_id, study_unit_id, created_by, question_type, difficulty_level, question_text, options, correct_answer, marks, time_allocation, learning_outcome, keywords, bloom_taxonomy, tags, usage_count, is_active, approved_by, approved_at) VALUES
-- ACC1101: Financial Accounting (Course ID: 20) - Multiple Choice
-- Study Unit 39: Accounting Terms
(20, 39, 16, 'multiple_choice', 'easy', 'What is the basic accounting equation?', JSON_ARRAY('Assets = Liabilities + Equity', 'Assets = Revenue - Expenses', 'Liabilities = Assets + Equity', 'Revenue = Assets - Liabilities'), 'Assets = Liabilities + Equity', 2, 3, 'Define accounting terms', 'accounting equation, assets, liabilities', 'remember', JSON_ARRAY('accounting-equation', 'mcq'), 0, TRUE, 16, NULL),
(20, 39, 16, 'multiple_choice', 'easy', 'Which financial statement shows financial position at a point in time?', JSON_ARRAY('Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Statement of Equity'), 'Balance Sheet', 2, 3, 'Identify financial statements', 'balance sheet, financial position', 'remember', JSON_ARRAY('financial-statements', 'mcq'), 0, TRUE, 16, NULL),
(20, 39, 16, 'multiple_choice', 'medium', 'What is the purpose of the income statement?', JSON_ARRAY('Show financial position', 'Show cash flows', 'Show financial performance', 'Show equity changes'), 'Show financial performance', 3, 4, 'Understand accounting concepts', 'income statement, financial performance', 'understand', JSON_ARRAY('income-statement', 'mcq'), 0, TRUE, 16, NULL),

-- Study Unit 40: Double Entry
(20, 40, 16, 'multiple_choice', 'medium', 'In double-entry accounting, what is the normal balance for assets?', JSON_ARRAY('Credit', 'Debit', 'Both', 'Neither'), 'Debit', 3, 4, 'Apply double entry', 'double entry, normal balance', 'apply', JSON_ARRAY('double-entry', 'mcq'), 0, TRUE, 16, NULL),
(20, 40, 16, 'multiple_choice', 'hard', 'Which accounts are closed to retained earnings at period end?', JSON_ARRAY('Assets and Liabilities', 'Revenue and Expenses', 'Equity and Dividends', 'Cash and Inventory'), 'Revenue and Expenses', 4, 5, 'Analyze closing entries', 'closing entries, retained earnings', 'analyze', JSON_ARRAY('closing-entries', 'mcq'), 0, TRUE, 16, NULL),

-- ACC1101: True/False Questions
-- Study Unit 39: Accounting Terms
(20, 39, 16, 'true_false', 'easy', 'Accounts payable is a liability account.', NULL, 'true', 1, 2, 'Understand account types', 'accounts payable, liability', 'remember', JSON_ARRAY('account-types', 'tf'), 0, TRUE, 16, NULL),
(20, 39, 16, 'true_false', 'easy', 'Revenue increases equity.', NULL, 'true', 1, 2, 'Identify equity relationships', 'revenue, equity increase', 'remember', JSON_ARRAY('equity', 'tf'), 0, TRUE, 16, NULL),
(20, 39, 16, 'true_false', 'medium', 'The matching principle requires expenses to be recorded when paid.', NULL, 'false', 2, 3, 'Apply accounting principles', 'matching principle, expense recognition', 'apply', JSON_ARRAY('accounting-principles', 'tf'), 0, TRUE, 16, NULL),

-- Study Unit 40: Double Entry
(20, 40, 16, 'true_false', 'medium', 'Every transaction affects at least two accounts.', NULL, 'true', 2, 3, 'Understand double entry system', 'double entry, transaction effects', 'understand', JSON_ARRAY('double-entry', 'tf'), 0, TRUE, 16, NULL),
(20, 40, 16, 'true_false', 'hard', 'Accrual basis accounting recognizes revenue when cash is received.', NULL, 'false', 3, 4, 'Evaluate accounting methods', 'accrual basis, revenue recognition', 'evaluate', JSON_ARRAY('accounting-methods', 'tf'), 0, TRUE, 16, NULL),

-- ACC1101: Short Answer Questions
-- Study Unit 39: Accounting Terms
(20, 39, 16, 'short_answer', 'medium', 'What are the three main financial statements?', NULL, 'Balance Sheet, Income Statement, Cash Flow Statement', 4, 5, 'Identify financial statements', 'financial statements, three main', 'remember', JSON_ARRAY('financial-statements', 'short-answer'), 0, TRUE, 16, NULL),
(20, 39, 16, 'short_answer', 'medium', 'Define the term "accounts receivable".', NULL, 'Amounts owed to a business by its customers for goods or services sold on credit', 4, 5, 'Understand accounting terms', 'accounts receivable, definition', 'understand', JSON_ARRAY('accounting-terms', 'short-answer'), 0, TRUE, 16, NULL),

-- Study Unit 40: Double Entry
(20, 40, 16, 'short_answer', 'medium', 'What is the journal entry to record cash sales?', NULL, 'Debit Cash, Credit Sales Revenue', 4, 6, 'Apply journal entries', 'journal entry, cash sales', 'apply', JSON_ARRAY('journal-entries', 'short-answer'), 0, TRUE, 16, NULL),
(20, 40, 16, 'short_answer', 'hard', 'Explain the difference between accrual and cash basis accounting.', NULL, 'Accrual: records when earned/incurred; Cash: records when cash received/paid', 5, 7, 'Analyze accounting methods', 'accrual basis, cash basis, differences', 'analyze', JSON_ARRAY('accounting-methods', 'short-answer'), 0, TRUE, 16, NULL),
(20, 39, 16, 'short_answer', 'easy', 'What does GAAP stand for?', NULL, 'Generally Accepted Accounting Principles', 3, 4, 'Identify accounting standards', 'GAAP, accounting principles', 'remember', JSON_ARRAY('accounting-standards', 'short-answer'), 0, TRUE, 16, NULL),

-- ACC1101: Essay Questions
-- Study Unit 39: Accounting Terms
(20, 39, 16, 'essay', 'medium', 'Discuss the importance of the conceptual framework in accounting.', NULL, 'Provides foundation for standards, ensures consistency, enhances comparability', 12, 20, 'Evaluate accounting framework', 'conceptual framework, accounting standards', 'evaluate', JSON_ARRAY('accounting-framework', 'essay'), 0, TRUE, 16, NULL),
(20, 39, 16, 'essay', 'hard', 'Compare and contrast assets, liabilities, and equity with examples.', NULL, 'Assets: resources owned; Liabilities: obligations; Equity: residual interest', 15, 25, 'Analyze accounting elements', 'assets, liabilities, equity, comparison', 'analyze', JSON_ARRAY('accounting-elements', 'essay'), 0, TRUE, 16, NULL),

-- Study Unit 40: Double Entry
(20, 40, 16, 'essay', 'medium', 'Explain the accounting cycle from transaction to financial statements.', NULL, 'Journal entries, posting to ledger, trial balance, adjusting entries, financial statements', 12, 20, 'Apply accounting cycle', 'accounting cycle, financial statements', 'apply', JSON_ARRAY('accounting-cycle', 'essay'), 0, TRUE, 16, NULL),
(20, 40, 16, 'essay', 'hard', 'Describe how errors in accounting records are detected and corrected.', NULL, 'Trial balance discrepancies, reconciliation, adjusting entries, reversing entries', 15, 25, 'Analyze error correction', 'accounting errors, detection, correction', 'analyze', JSON_ARRAY('error-correction', 'essay'), 0, TRUE, 16, NULL),
(20, 39, 16, 'essay', 'medium', 'Discuss the role of ethics in financial accounting and reporting.', NULL, 'Ensures accurate representation, builds trust, prevents fraud, legal compliance', 10, 18, 'Evaluate accounting ethics', 'ethics, financial reporting', 'evaluate', JSON_ARRAY('accounting-ethics', 'essay'), 0, TRUE, 16, NULL),

-- ACC2304: Cost Accounting (Course ID: 21) - Multiple Choice
-- Study Unit 41: Costing Basics
(21, 41, 16, 'multiple_choice', 'easy', 'What are the three main manufacturing costs?', JSON_ARRAY('Fixed, Variable, Mixed', 'Direct, Indirect, Period', 'Direct Materials, Direct Labor, Manufacturing Overhead', 'Product, Period, Sunk'), 'Direct Materials, Direct Labor, Manufacturing Overhead', 2, 3, 'Identify cost types', 'manufacturing costs, three types', 'remember', JSON_ARRAY('cost-types', 'mcq'), 0, TRUE, 16, NULL),
(21, 41, 16, 'multiple_choice', 'medium', 'Which cost remains constant per unit but varies in total?', JSON_ARRAY('Fixed cost', 'Variable cost', 'Mixed cost', 'Step cost'), 'Variable cost', 3, 4, 'Understand cost behavior', 'variable cost, cost behavior', 'understand', JSON_ARRAY('cost-behavior', 'mcq'), 0, TRUE, 16, NULL),
(21, 41, 16, 'multiple_choice', 'medium', 'What is the formula for calculating predetermined overhead rate?', JSON_ARRAY('Actual overhead / Actual activity', 'Estimated overhead / Estimated activity', 'Actual overhead / Estimated activity', 'Estimated overhead / Actual activity'), 'Estimated overhead / Estimated activity', 3, 4, 'Apply overhead calculation', 'predetermined overhead rate, formula', 'apply', JSON_ARRAY('overhead', 'mcq'), 0, TRUE, 16, NULL),

-- Study Unit 42: Budgets
(21, 42, 16, 'multiple_choice', 'medium', 'Which budget is prepared first in the master budget?', JSON_ARRAY('Cash budget', 'Production budget', 'Sales budget', 'Budgeted income statement'), 'Sales budget', 3, 4, 'Explain budget preparation', 'sales budget, master budget', 'understand', JSON_ARRAY('budgeting', 'mcq'), 0, TRUE, 16, NULL),
(21, 42, 16, 'multiple_choice', 'hard', 'What is the purpose of a flexible budget?', JSON_ARRAY('Show planned revenues', 'Compare actual results at different activity levels', 'Control fixed costs', 'Plan capital expenditures'), 'Compare actual results at different activity levels', 4, 5, 'Analyze budget types', 'flexible budget, purpose', 'analyze', JSON_ARRAY('budget-types', 'mcq'), 0, TRUE, 16, NULL),

-- ACC2304: True/False Questions
-- Study Unit 41: Costing Basics
(21, 41, 16, 'true_false', 'easy', 'Direct costs can be easily traced to cost objects.', NULL, 'true', 1, 2, 'Understand cost tracing', 'direct costs, cost objects', 'remember', JSON_ARRAY('cost-tracing', 'tf'), 0, TRUE, 16, NULL),
(21, 41, 16, 'true_false', 'easy', 'Period costs are included in inventory valuation.', NULL, 'false', 1, 2, 'Identify cost classification', 'period costs, inventory', 'remember', JSON_ARRAY('cost-classification', 'tf'), 0, TRUE, 16, NULL),
(21, 41, 16, 'true_false', 'medium', 'Sunk costs are relevant for decision making.', NULL, 'false', 2, 3, 'Apply cost relevance', 'sunk costs, decision making', 'apply', JSON_ARRAY('cost-relevance', 'tf'), 0, TRUE, 16, NULL),

-- Study Unit 42: Budgets
(21, 42, 16, 'true_false', 'medium', 'A static budget is adjusted for changes in activity level.', NULL, 'false', 2, 3, 'Understand budget characteristics', 'static budget, activity level', 'understand', JSON_ARRAY('budget-characteristics', 'tf'), 0, TRUE, 16, NULL),
(21, 42, 16, 'true_false', 'hard', 'Zero-based budgeting requires justification of all expenses each period.', NULL, 'true', 3, 4, 'Evaluate budgeting methods', 'zero-based budgeting, expense justification', 'evaluate', JSON_ARRAY('budgeting-methods', 'tf'), 0, TRUE, 16, NULL),

-- ACC2304: Short Answer Questions
-- Study Unit 41: Costing Basics
(21, 41, 16, 'short_answer', 'medium', 'What is the difference between product costs and period costs?', NULL, 'Product costs: inventoriable; Period costs: expensed when incurred', 4, 5, 'Differentiate cost categories', 'product costs, period costs', 'understand', JSON_ARRAY('cost-categories', 'short-answer'), 0, TRUE, 16, NULL),
(21, 41, 16, 'short_answer', 'medium', 'Define the term "cost driver".', NULL, 'Factor that causes changes in the cost of an activity', 4, 5, 'Understand cost concepts', 'cost driver, definition', 'understand', JSON_ARRAY('cost-concepts', 'short-answer'), 0, TRUE, 16, NULL),

-- Study Unit 42: Budgets
(21, 42, 16, 'short_answer', 'medium', 'What are the main components of a cash budget?', NULL, 'Cash receipts, cash payments, financing, ending cash balance', 4, 6, 'Apply budget preparation', 'cash budget, components', 'apply', JSON_ARRAY('cash-budget', 'short-answer'), 0, TRUE, 16, NULL),
(21, 42, 16, 'short_answer', 'hard', 'Explain the concept of management by exception in budgeting.', NULL, 'Focusing attention on significant variances from budget', 5, 7, 'Analyze management control', 'management by exception, budgeting', 'analyze', JSON_ARRAY('management-control', 'short-answer'), 0, TRUE, 16, NULL),
(21, 41, 16, 'short_answer', 'easy', 'What does ABC stand for in cost accounting?', NULL, 'Activity-Based Costing', 3, 4, 'Identify costing methods', 'ABC, activity-based costing', 'remember', JSON_ARRAY('costing-methods', 'short-answer'), 0, TRUE, 16, NULL),

-- ACC2304: Essay Questions
-- Study Unit 41: Costing Basics
(21, 41, 16, 'essay', 'medium', 'Discuss the advantages and disadvantages of activity-based costing.', NULL, 'Advantages: accurate costing; Disadvantages: costly to implement', 12, 20, 'Evaluate costing methods', 'activity-based costing, advantages disadvantages', 'evaluate', JSON_ARRAY('costing-methods', 'essay'), 0, TRUE, 16, NULL),
(21, 41, 16, 'essay', 'hard', 'Compare and contrast job order costing and process costing systems.', NULL, 'Job order: custom products; Process costing: homogeneous products', 15, 25, 'Analyze costing systems', 'job order costing, process costing', 'analyze', JSON_ARRAY('costing-systems', 'essay'), 0, TRUE, 16, NULL),

-- Study Unit 42: Budgets
(21, 42, 16, 'essay', 'medium', 'Explain the role of budgeting in planning and control functions of management.', NULL, 'Planning: setting objectives; Control: monitoring performance', 12, 20, 'Apply budgeting functions', 'budgeting, planning, control', 'apply', JSON_ARRAY('budgeting-functions', 'essay'), 0, TRUE, 16, NULL),
(21, 42, 16, 'essay', 'hard', 'Describe how variance analysis helps in performance evaluation.', NULL, 'Compares actual vs budget, identifies causes, facilitates corrective action', 15, 25, 'Analyze performance evaluation', 'variance analysis, performance evaluation', 'analyze', JSON_ARRAY('variance-analysis', 'essay'), 0, TRUE, 16, NULL),
(21, 41, 16, 'essay', 'medium', 'Discuss the ethical considerations in cost allocation and reporting.', NULL, 'Fair allocation methods, accurate reporting, transparency, avoiding manipulation', 10, 18, 'Evaluate cost accounting ethics', 'ethics, cost allocation, reporting', 'evaluate', JSON_ARRAY('accounting-ethics', 'essay'), 0, TRUE, 16, NULL);


-- =====================================================
-- EXAM PAPERS DATA (WITH VALID USER IDs)
-- =====================================================

-- Using lecturer IDs 1-10 (since you mentioned lecturers are 1-27)
-- Using HOD IDs 7-16 (from your previous structure)
-- Using Dean ID 5 (from your previous examples)

-- CSC1202: Programming Fundamentals - FINAL EXAM (Lecturer 1, HOD 7, Dean 5)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at, dean_id, dean_approved_at
) VALUES (
    'CSC1202-FINAL-2024-1', 2, 1, 'FINAL', 2024, 1, 
    '2024-05-15', 180, 100,
    'Answer ALL questions in Section A and ANY THREE questions from Section B. Show all your working. Calculators are not allowed.',
    'dean_approved', 7, NOW(), 5, NOW()
);

-- ICT1101: Information Systems I - CAT (Lecturer 2, HOD 8)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at, dean_id
) VALUES (
    'ICT1101-CAT1-2024-1', 4, 2, 'CAT', 2024, 1, 
    '2024-03-20', 90, 50,
    'Answer ALL questions. Write your answers in the spaces provided.',
    'hod_approved', 8, NOW(), NULL
);

-- STA1101: Basic Statistics - FINAL EXAM (Lecturer 3, HOD 9)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, dean_id
) VALUES (
    'STA1101-FINAL-2024-1', 6, 3, 'FINAL', 2024, 1, 
    '2024-05-20', 150, 100,
    'Answer ALL questions. Statistical tables and calculators are allowed.',
    'dean_review', 9, NULL
);

-- BIO1101: General Biology - FINAL EXAM (Lecturer 4, HOD 10)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at
) VALUES (
    'BIO1101-FINAL-2024-1', 8, 4, 'FINAL', 2024, 1, 
    '2024-05-18', 120, 100,
    'Answer ALL questions in Section A and ANY TWO questions from Section B.',
    'hod_approved', 10, NOW()
);

-- LAW1101: Introduction to Law - CAT (Lecturer 7, HOD 13)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status
) VALUES (
    'LAW1101-CAT1-2024-1', 14, 7, 'CAT', 2024, 1, 
    '2024-03-25', 90, 50,
    'Answer ALL questions. Support your answers with relevant legal principles.',
    'submitted'
);

-- BBA1101: Principles of Management - FINAL EXAM (Lecturer 8, HOD 14, Dean 5, Exam Master 6)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at, dean_id, dean_approved_at, exam_master_id, printed_at
) VALUES (
    'BBA1101-FINAL-2024-1', 16, 8, 'FINAL', 2024, 1, 
    '2024-05-22', 180, 100,
    'Answer ALL questions in Section A and ANY THREE questions from Section B.',
    'ready_for_print', 14, NOW(), 5, NOW(), 6, NOW()
);

-- ECO1101: Microeconomics I - FINAL EXAM (Lecturer 9, HOD 15, Dean 5)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at, dean_id, dean_approved_at
) VALUES (
    'ECO1101-FINAL-2024-1', 18, 9, 'FINAL', 2024, 1, 
    '2024-05-17', 150, 100,
    'Answer ALL questions. Show all calculations and diagrams where necessary.',
    'dean_approved', 15, NOW(), 5, NOW()
);

-- ACC1101: Financial Accounting I - FINAL EXAM (Lecturer 10, HOD 16, Dean 5, Exam Master 6)
INSERT INTO exam_papers (
    paper_code, course_id, created_by, exam_type, academic_year, semester, 
    exam_date, duration, total_marks, instructions, status, 
    hod_id, hod_approved_at, dean_id, dean_approved_at, exam_master_id, printed_at, print_quantity
) VALUES (
    'ACC1101-FINAL-2024-1', 20, 10, 'FINAL', 2024, 1, 
    '2024-05-19', 180, 100,
    'Answer ALL questions. Show all workings and journal entries clearly.',
    'printed', 16, NOW(), 5, NOW(), 6, NOW(), 500
);


-- =====================================================
-- EXAM PAPER QUESTIONS
-- =====================================================

-- CSC1202: Programming Fundamentals - FINAL EXAM Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) VALUES
-- Section A: Multiple Choice (Compulsory)
(1, 1, 'A', '1', 'Question 1', 2, 1),
(1, 2, 'A', '2', 'Question 2', 2, 2),
(1, 3, 'A', '3', 'Question 3', 2, 3),
(1, 4, 'A', '4', 'Question 4', 2, 4),
(1, 5, 'A', '5', 'Question 5', 2, 5),

-- Section B: Essay Questions (Answer any 3)
(1, 16, 'B', '6', 'Question 6', 15, 6),
(1, 17, 'B', '7', 'Question 7', 15, 7),
(1, 18, 'B', '8', 'Question 8', 15, 8),
(1, 19, 'B', '9', 'Question 9', 15, 9),
(1, 20, 'B', '10', 'Question 10', 15, 10);

-- ICT1101: Information Systems I - CAT Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) VALUES
-- Multiple Choice Questions
(2, 26, 'A', '1', 'Question 1', 2, 1),
(2, 27, 'A', '2', 'Question 2', 2, 2),
(2, 28, 'A', '3', 'Question 3', 2, 3),

-- Short Answer Questions
(2, 31, 'B', '4', 'Question 4', 5, 4),
(2, 32, 'B', '5', 'Question 5', 5, 5),
(2, 33, 'B', '6', 'Question 6', 5, 6),

-- Essay Questions
(2, 36, 'C', '7', 'Question 7', 10, 7),
(2, 37, 'C', '8', 'Question 8', 10, 8);

-- STA1101: Basic Statistics - FINAL EXAM Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) VALUES
-- Section A: Multiple Choice
(3, 51, 'A', '1', 'Question 1', 3, 1),
(3, 52, 'A', '2', 'Question 2', 3, 2),
(3, 53, 'A', '3', 'Question 3', 3, 3),

-- Section B: Short Answer
(3, 56, 'B', '4', 'Question 4', 8, 4),
(3, 57, 'B', '5', 'Question 5', 8, 5),
(3, 58, 'B', '6', 'Question 6', 8, 6),

-- Section C: Essay Questions (Answer any 2)
(3, 61, 'C', '7', 'Question 7', 20, 7),
(3, 62, 'C', '8', 'Question 8', 20, 8),
(3, 63, 'C', '9', 'Question 9', 20, 9);

-- BIO1101: General Biology - FINAL EXAM Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) VALUES
-- Section A: Multiple Choice
(4, 76, 'A', '1', 'Question 1', 2, 1),
(4, 77, 'A', '2', 'Question 2', 2, 2),
(4, 78, 'A', '3', 'Question 3', 2, 3),
(4, 79, 'A', '4', 'Question 4', 2, 4),
(4, 80, 'A', '5', 'Question 5', 2, 5),

-- Section B: Essay Questions (Answer any 2)
(4, 86, 'B', '6', 'Question 6', 20, 6),
(4, 87, 'B', '7', 'Question 7', 20, 7),
(4, 88, 'B', '8', 'Question 8', 20, 8);

-- LAW1101: Introduction to Law - CAT Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order) VALUES
-- Short Answer Questions
(5, 101, 'A', '1', 'Question 1', 5, 1),
(5, 102, 'A', '2', 'Question 2', 5, 2),
(5, 103, 'A', '3', 'Question 3', 5, 3),

-- Essay Questions
(5, 106, 'B', '4', 'Question 4', 15, 4),
(5, 107, 'B', '5', 'Question 5', 15, 5);

-- BBA1101: Principles of Management - FINAL EXAM Questions
INSERT INTO exam_paper_questions (exam_paper_id, question_id, section, question_number, display_number, marks, sequence_order, is_choice, choice_group) VALUES
-- Section A: Multiple Choice (Compulsory)
(6, 126, 'A', '1', 'Question 1', 2, 1, FALSE, NULL),
(6, 127, 'A', '2', 'Question 2', 2, 2, FALSE, NULL),
(6, 128, 'A', '3', 'Question 3', 2, 3, FALSE, NULL),
(6, 129, 'A', '4', 'Question 4', 2, 4, FALSE, NULL),
(6, 130, 'A', '5', 'Question 5', 2, 5, FALSE, NULL),

-- Section B: Essay Questions (Answer any 3)
(6, 136, 'B', '6', 'Question 6', 15, 6, TRUE, 'B1'),
(6, 137, 'B', '7', 'Question 7', 15, 7, TRUE, 'B1'),
(6, 138, 'B', '8', 'Question 8', 15, 8, TRUE, 'B1'),
(6, 139, 'B', '9', 'Question 9', 15, 9, TRUE, 'B1'),
(6, 140, 'B', '10', 'Question 10', 15, 10, TRUE, 'B1');


-- =====================================================
-- WORKFLOW HISTORY DATA
-- =====================================================

-- CSC1202: Programming Fundamentals - FINAL EXAM Workflow
INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments) VALUES
(1, 'created', NULL, 'draft', 13, 'lecturer', 'Initial paper creation with 10 questions'),
(1, 'submitted', 'draft', 'submitted', 13, 'lecturer', 'Submitted for HOD approval'),
(1, 'hod_approved', 'submitted', 'hod_approved', 7, 'hod', 'Paper meets all requirements, good question distribution'),
(1, 'dean_approved', 'hod_approved', 'dean_approved', 2, 'dean', 'Approved at college level');
-- ICT1101: Information Systems I - CAT Workflow
INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments) VALUES
(2, 'created', NULL, 'draft', 21, 'lecturer', 'CAT paper with 8 questions covering first 4 study units'),
(2, 'submitted', 'draft', 'submitted', 21, 'lecturer', 'Ready for HOD review'),
(2, 'hod_approved', 'submitted', 'hod_approved', 8, 'hod', 'Good coverage of IS concepts, approved for administration');
-- BIO1101: General Biology - FINAL EXAM Workflow
INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments) VALUES
(4, 'created', NULL, 'draft', 23, 'lecturer', 'Biology final exam covering cell structure and ecology'),
(4, 'submitted', 'draft', 'submitted', 23, 'lecturer', 'Ready for HOD evaluation'),
(4, 'hod_approved', 'submitted', 'hod_approved', 10, 'hod', 'Well-structured paper, good mix of theory and application');
-- LAW1101: Introduction to Law - CAT Workflow
INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments) VALUES
(5, 'created', NULL, 'draft', 26, 'lecturer', 'First CAT for legal systems course'),
(5, 'submitted', 'draft', 'submitted', 26, 'lecturer', 'Submitted for HOD approval');
-- BBA1101: Principles of Management - FINAL EXAM Workflow
INSERT INTO workflow_history (exam_paper_id, action, from_status, to_status, actor_id, actor_role, comments, metadata) VALUES
(6, 'created', NULL, 'draft', 27, 'lecturer', 'Management principles final examination', NULL),
(6, 'submitted', 'draft', 'submitted', 27, 'lecturer', 'Submitted for approval', NULL),
(6, 'hod_approved', 'submitted', 'hod_approved', 14, 'hod', 'Excellent paper structure, good case studies', NULL),
(6, 'dean_approved', 'hod_approved', 'dean_approved', 5, 'dean', 'Approved for printing', NULL),
(6, 'ready_for_print', 'dean_approved', 'ready_for_print', 5, 'exam_master', 'Paper queued for printing', '{"print_quantity": 500}');

-- =====================================================
-- PAPER COMMENTS DATA
-- =====================================================

-- CSC1202: Programming Fundamentals Comments
INSERT INTO paper_comments (exam_paper_id, user_id, comment_type, comment, is_resolved) VALUES
(1, 7, 'hod_approval_note', 'Good distribution of programming concepts. Multiple choice questions test fundamental knowledge effectively.', TRUE),
(1, 2, 'dean_note', 'Paper meets college standards. Well-structured for 3-hour examination.', TRUE);

-- ICT1101: Information Systems I Comments
INSERT INTO paper_comments (exam_paper_id, user_id, comment_type, comment, is_resolved) VALUES
(2, 8, 'hod_approval_note', 'CAT covers essential IS concepts. Consider adding more practical case studies in future papers.', TRUE),
(2, 21, 'general', 'Will incorporate more case-based questions in the next CAT as suggested.', TRUE);

-- STA1101: Basic Statistics Comments (Under Review)
INSERT INTO paper_comments (exam_paper_id, user_id, comment_type, comment, is_resolved) VALUES
(3, 9, 'revision_request', 'Question 7 seems too advanced for first-year students. Please review difficulty level.', FALSE),
(3, 9, 'feedback', 'Consider adding more graphical interpretation questions for better practical application.', FALSE);

-- BIO1101: General Biology Comments
INSERT INTO paper_comments (exam_paper_id, user_id, comment_type, comment, is_resolved) VALUES
(4, 10, 'hod_approval_note', 'Good balance between cellular biology and ecology. Essay questions require critical thinking.', TRUE),
(4, 23, 'general', 'Thank you for the feedback. Will maintain this balance in future papers.', TRUE);

-- LAW1101: Introduction to Law Comments (Awaiting HOD Review)
INSERT INTO paper_comments (exam_paper_id, user_id, comment_type, comment, is_resolved) VALUES
(5, 26, 'general', 'CAT focuses on legal systems and court structures as covered in first semester.', FALSE);


-- =====================================================
-- NOTIFICATIONS DATA
-- =====================================================

-- Permission Granted Notifications
INSERT INTO notifications (user_id, type, title, message, related_entity_type, related_entity_id, priority, is_read, created_at) VALUES
-- CS Lecturer (user_id: 13)
(13, 'permission_granted', 'Course permissions updated', 'You now have full rights for CSC2103', 'course', 3, 'medium', TRUE, '2024-02-15 14:00:00'),
-- IT Lecturer (user_id: 21)
(21, 'permission_granted', 'Course permissions updated', 'You have editing rights for ICT2205', 'course', 5, 'medium', TRUE, '2024-02-20 10:30:00'),
-- Statistics Lecturer (user_id: 22)
(22, 'permission_granted', 'Course permissions updated', 'Full editing rights granted for STA2203', 'course', 7, 'medium', TRUE, '2024-02-18 16:45:00');
-- All Lecturers - CAT deadline
(13, 'deadline_reminder', 'CAT 2 Submission Reminder', 'CAT 2 papers due by April 15, 2024', 'high', FALSE, '2024-04-10 14:00:00', '{"deadline_date": "2024-04-15", "paper_type": "CAT"}'),
(21, 'deadline_reminder', 'CAT 2 Submission Reminder', 'CAT 2 papers due by April 15, 2024', 'high', FALSE, '2024-04-10 14:00:00', '{"deadline_date": "2024-04-15", "paper_type": "CAT"}'),
(22, 'deadline_reminder', 'CAT 2 Submission Reminder', 'CAT 2 papers due by April 15, 2024', 'high', FALSE, '2024-04-10 14:00:00', '{"deadline_date": "2024-04-15", "paper_type": "CAT"}');
-- General System Notifications
INSERT INTO notifications (user_id, type, title, message, priority, is_read, created_at) VALUES
-- Admin notifications
(1, 'general', 'System Maintenance', 'Scheduled maintenance on Saturday, 8 PM - 10 PM', 'medium', TRUE, '2024-03-20 16:00:00'),
(1, 'general', 'New Feature Available', 'Question bank search functionality enhanced', 'low', FALSE, '2024-03-22 11:00:00'),
-- All users - system announcement
(7, 'general', 'Exam Policy Update', 'Please review updated exam security protocols', 'high', FALSE, '2024-03-18 10:30:00'),
(13, 'general', 'Exam Policy Update', 'Please review updated exam security protocols', 'high', FALSE, '2024-03-18 10:30:00'),
(5, 'general', 'Exam Policy Update', 'Please review updated exam security protocols', 'high', FALSE, '2024-03-18 10:30:00');
-- Notifications for HODs (Approval Required)
INSERT INTO notifications (user_id, type, title, message, related_paper_id, priority, is_read, created_at) VALUES
-- HOD Computer Science (user_id: 7)
(7, 'approval_required', 'New FINAL paper awaiting approval', 'Paper CSC1202-FINAL-2024-1 has been submitted for approval', 1, 'high', TRUE, '2024-03-10 09:15:00'),
-- HOD IT (user_id: 8)
(8, 'approval_required', 'New CAT paper awaiting approval', 'Paper ICT1101-CAT1-2024-1 has been submitted for approval', 2, 'high', TRUE, '2024-03-12 14:20:00'),
-- HOD Statistics (user_id: 9)
(9, 'approval_required', 'New FINAL paper awaiting approval', 'Paper STA1101-FINAL-2024-1 has been submitted for approval', 3, 'high', FALSE, '2024-03-14 11:30:00'),
-- HOD Biology (user_id: 10)
(10, 'approval_required', 'New FINAL paper awaiting approval', 'Paper BIO1101-FINAL-2024-1 has been submitted for approval', 4, 'high', TRUE, '2024-03-11 16:45:00'),
-- HOD Law (user_id: 13)
(13, 'approval_required', 'New CAT paper awaiting approval', 'Paper LAW1101-CAT1-2024-1 has been submitted for approval', 5, 'high', FALSE, '2024-03-15 10:00:00');
-- Notifications for Comment Interactions
INSERT INTO notifications (user_id, type, title, message, related_paper_id, priority, is_read, created_at) VALUES
-- Lecturer Statistics (user_id: 22) - Revision requested
(22, 'paper_returned', 'Paper STA1101-FINAL-2024-1 requires revision', 'HOD has requested revisions to your paper', 3, 'high', FALSE, '2024-03-15 09:20:00'),
-- Lecturer Statistics - Comment added
(22, 'comment_added', 'New comment on your paper', 'HOD added feedback on question difficulty', 3, 'medium', FALSE, '2024-03-15 09:25:00'),
-- HOD Statistics - Response to revision
(9, 'comment_added', 'Lecturer responded to your feedback', 'Lecturer has addressed your revision request', 3, 'medium', FALSE, '2024-03-16 11:10:00');
-- Deadline Reminders
INSERT INTO notifications (user_id, type, title, message, priority, is_read, created_at, metadata) VALUES
-- All HODs - Final exam deadline
(7, 'deadline_reminder', 'Final Exam Paper Deadline', 'Final exam papers due for submission by March 30, 2024', 'urgent', FALSE, '2024-03-25 09:00:00', '{"deadline_date": "2024-03-30", "paper_type": "FINAL"}'),
(8, 'deadline_reminder', 'Final Exam Paper Deadline', 'Final exam papers due for submission by March 30, 2024', 'urgent', FALSE, '2024-03-25 09:00:00', '{"deadline_date": "2024-03-30", "paper_type": "FINAL"}'),
(9, 'deadline_reminder', 'Final Exam Paper Deadline', 'Final exam papers due for submission by March 30, 2024', 'urgent', FALSE, '2024-03-25 09:00:00', '{"deadline_date": "2024-03-30", "paper_type": "FINAL"}'),
(10, 'deadline_reminder', 'Final Exam Paper Deadline', 'Final exam papers due for submission by March 30, 2024', 'urgent', FALSE, '2024-03-25 09:00:00', '{"deadline_date": "2024-03-30", "paper_type": "FINAL"}');


-- =====================================================
-- AUDIT LOGS DATA
-- =====================================================

-- Paper Creation Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(13, 'CREATE', 'exam_paper', 1, NULL, '{"paper_code": "CSC1202-FINAL-2024-1", "course_id": 2, "exam_type": "FINAL", "status": "draft"}', '192.168.1.101', '2024-03-10 09:00:00'),
(21, 'CREATE', 'exam_paper', 2, NULL, '{"paper_code": "ICT1101-CAT1-2024-1", "course_id": 4, "exam_type": "CAT", "status": "draft"}', '192.168.1.102', '2024-03-12 14:00:00'),
(22, 'CREATE', 'exam_paper', 3, NULL, '{"paper_code": "STA1101-FINAL-2024-1", "course_id": 6, "exam_type": "FINAL", "status": "draft"}', '192.168.1.103', '2024-03-14 11:00:00');
-- Paper Submission Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(13, 'UPDATE', 'exam_paper', 1, '{"status": "draft"}', '{"status": "submitted"}','192.168.1.101', '2024-03-10 09:15:00'),
(21, 'UPDATE', 'exam_paper', 2, '{"status": "draft"}', '{"status": "submitted"}', '192.168.1.102', '2024-03-12 14:20:00'),
(22, 'UPDATE', 'exam_paper', 3, '{"status": "draft"}', '{"status": "submitted"}', '192.168.1.103', '2024-03-14 11:30:00');
-- HOD Approval Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(7, 'UPDATE', 'exam_paper', 1, '{"status": "submitted"}', '{"status": "hod_approved", "hod_approved_at": "2024-03-11 15:30:00"}', '192.168.1.107', '2024-03-11 15:30:00'),
(8, 'UPDATE', 'exam_paper', 2, '{"status": "submitted"}', '{"status": "hod_approved", "hod_approved_at": "2024-03-13 09:45:00"}', '192.168.1.108', '2024-03-13 09:45:00'),
(10, 'UPDATE', 'exam_paper', 4, '{"status": "submitted"}', '{"status": "hod_approved", "hod_approved_at": "2024-03-12 14:15:00"}', '192.168.1.110', '2024-03-12 14:15:00');
-- Question Modification Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(7, 'UPDATE', 'question', 7, '{"difficulty_level": "medium"}', '{"difficulty_level": "easy"}', '192.168.1.107', '2024-03-05 10:20:00'),
(9, 'UPDATE', 'question', 53, '{"marks": 2}', '{"marks": 3}', '192.168.1.109', '2024-03-08 14:35:00'),
(13, 'CREATE', 'question', 1, NULL, '{"question_type": "multiple_choice", "course_id": 2, "marks": 2}', '192.168.1.101', '2024-02-20 11:15:00');
-- Permission Granting Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(7, 'CREATE', 'lecturer_permission', 1, NULL, '{"lecturer_id": 13, "course_id": 3, "can_edit_questions": true}', '192.168.1.107', '2024-02-15 14:00:00'),
(8, 'CREATE', 'lecturer_permission', 4, NULL, '{"lecturer_id": 21, "course_id": 5, "can_edit_questions": true}', '192.168.1.108', '2024-02-20 10:30:00'),
(9, 'CREATE', 'lecturer_permission', 6, NULL, '{"lecturer_id": 22, "course_id": 7, "can_edit_questions": true}', '192.168.1.109', '2024-02-18 16:45:00');
-- User Activity Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent, created_at) VALUES
(1, 'LOGIN', 'user', 1, NULL, '{"last_login": "2024-03-20 08:30:00"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-03-20 08:30:00'),
(7, 'LOGIN', 'user', 7, NULL, '{"last_login": "2024-03-20 09:15:00"}', '192.168.1.107', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '2024-03-20 09:15:00'),
(13, 'LOGIN', 'user', 13, NULL, '{"last_login": "2024-03-20 08:45:00"}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124', '2024-03-20 08:45:00');
-- Paper Printing Audit Log
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(5, 'UPDATE', 'exam_paper', 8, '{"status": "ready_for_print"}', '{"status": "printing"}', '192.168.1.105', '2024-03-16 09:00:00'),
(5, 'UPDATE', 'exam_paper', 8, '{"status": "printing"}', '{"status": "printed", "printed_at": "2024-03-16 14:30:00", "print_quantity": 600}', '192.168.1.105', '2024-03-16 14:30:00'),
(5, 'UPDATE', 'exam_paper', 6, '{"status": "dean_approved"}', '{"status": "ready_for_print"}', '192.168.1.105', '2024-03-17 08:30:00');
-- Comment Activity Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(9, 'CREATE', 'paper_comment', 9, NULL, '{"comment_type": "revision_request", "exam_paper_id": 3}', '192.168.1.109', '2024-03-15 09:20:00'),
(22, 'CREATE', 'paper_comment', 21, NULL, '{"comment_type": "general", "exam_paper_id": 3, "parent_comment_id": 9}', '192.168.1.103', '2024-03-16 11:10:00'),
(14, 'CREATE', 'paper_comment', 12, NULL, '{"comment_type": "feedback", "exam_paper_id": 6}', '192.168.1.114', '2024-03-16 12:30:00');
-- System Configuration Audit Logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, created_at) VALUES
(1, 'UPDATE', 'system_config', 1, '{"deadline_days": 14}', '{"deadline_days": 21}', '192.168.1.100', '2024-03-01 10:00:00'),
(1, 'UPDATE', 'system_config', 2, '{"max_questions_per_paper": 50}', '{"max_questions_per_paper": 60}', '192.168.1.100', '2024-03-05 14:20:00');