-- 1. Create Database
CREATE DATABASE IF NOT EXISTS course_management_edupro;

-- 2. Use Database
USE course_management_edupro;

-- 3. Create Department Table
CREATE TABLE IF NOT EXISTS department(
    departmentId INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(50) NOT NULL
);

-- 4. Insert into Department
INSERT INTO department(departmentName) VALUES
('Computer Science');

-- 5. Create Student Table
CREATE TABLE IF NOT EXISTS student(
    studentId VARCHAR(10) PRIMARY KEY,
    studentName VARCHAR(50) NOT NULL 
);

-- 6. Insert into Student
INSERT INTO student(studentId, studentName) VALUES 
('S101', 'Asha Gupta'),
('S102', 'Raj Verma');

-- 7. Create Instructor Table
CREATE TABLE IF NOT EXISTS instructor(
    instructorId INT AUTO_INCREMENT PRIMARY KEY,
    instructorName VARCHAR(50) NOT NULL,
    departmentId INT,
    FOREIGN KEY (departmentId) REFERENCES department(departmentId)
);

-- 8. Insert into Instructor
INSERT INTO instructor(instructorName, departmentId) VALUES
('Dr. Mehta', 1),
('Dr. Sharma', 1);

-- 9. Create Course Table
CREATE TABLE IF NOT EXISTS course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    courseName VARCHAR(50) NOT NULL,
    instructorId INT,
    departmentId INT,
    FOREIGN KEY (instructorId) REFERENCES instructor(instructorId),
    FOREIGN KEY (departmentId) REFERENCES department(departmentId)
);

-- 10. Insert into Course
INSERT INTO course(courseName, instructorId, departmentId) VALUES
('Database Systems', 1, 1),
('Data Structures', 2, 1);

-- 11. Create Enrollment Table
CREATE TABLE IF NOT EXISTS enrollment (
    enrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    studentID VARCHAR(10),
    courseID INT,
    grade CHAR(2),
    FOREIGN KEY (studentID) REFERENCES student(studentID),
    FOREIGN KEY (courseID) REFERENCES course(courseID)
);

-- 12. Insert into Enrollment
INSERT INTO enrollment(studentID, courseID, grade) VALUES 
('S101', 1, 'A'),
('S102', 2, 'B');
