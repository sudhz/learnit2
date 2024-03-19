CREATE TABLE student (
  student_id INT PRIMARY KEY IDENTITY(1,1),
  student_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE instructor (
  instructor_id INT PRIMARY KEY IDENTITY(1,1),
  instructor_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  password VARCHAR(255) NOT NULL,
  bio VARCHAR(max)
);

CREATE TABLE category (
  category_id INT PRIMARY KEY IDENTITY(1,1),
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE module (
  module_id INT PRIMARY KEY IDENTITY(1,1),
  module_name VARCHAR(255) NOT NULL,
  module_duration TIME NOT NULL
);

CREATE TABLE course (
  course_id INT PRIMARY KEY IDENTITY(1,1),
  course_name VARCHAR(255) NOT NULL,
  course_description TEXT NOT NULL,
  img_url VARCHAR(255),
  price MONEY NOT NULL,
  created_at DATETIME NOT NULL,
  instructor_id INT REFERENCES instructor(instructor_id)
);

CREATE TABLE lecture (
  lecture_id INT PRIMARY KEY IDENTITY(1,1),
  lecture_name VARCHAR(255) NOT NULL,
  lecture_url VARCHAR(255) NOT NULL,
  lecture_duration TIME NOT NULL,
  module_id INT REFERENCES module(module_id)
);

CREATE TABLE course_module (
  course_id INT NOT NULL,
  module_id INT NOT NULL,
  PRIMARY KEY (course_id, module_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id),
  FOREIGN KEY (module_id) REFERENCES module(module_id)
);

CREATE TABLE category_course (
  category_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (category_id, course_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE student_course (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  completion_percentage INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (course_id) REFERENCES course(course_id)
);
