const Institution = require('../src/institution')
const Student = require('../src/student')
const Instructor = require('../src/instructor')
const Course = require('../src/course')
const CourseOffering = require('../src/course-offering')


describe('Institution Test', () => {
    let testInstitution = null 
    let sqaInstructor = null
    let softwareQualityAssuranceCourse = null
    let softwareQualityAssuranceFallCourseOffering = null 
    let student = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')
        softwareQualityAssuranceCourse = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
        softwareQualityAssuranceFallCourseOffering = new CourseOffering(softwareQualityAssuranceCourse, '01', '2024', '1')
        student = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
        
     })

     test('CreatesInstitution_WhenAllConditionsMet_ReturnsObject', () => {
            //Assert
            expect(testInstitution).not.toBeNull();
            expect(testInstitution.name).toEqual(`Quinnipiac University`); 
            expect(testInstitution.domain).toEqual(`qu.edu`); 
    })

    test('CreatesInstitution_WhenAllConditionsMet_ReturnsStudentEnrolled', () => {
        // Act
        testInstitution.enroll_student(student);

        //Assert
        expect(testInstitution.studentList[student.userName]).toEqual(student);
        expect(() => testInstitution.enroll_student(sqaInstructor)).toThrow(TypeError); // only accepts Student Object
    })



test('CreatesInstitution_WhenAllConditionsMet_ReturnsListedStudents', () => {
    // Arrange
    const logSpy = jest.spyOn(console, 'log');
    // Act 
    testInstitution.enroll_student(student);
    testInstitution.listStudents();

    
    //Assert
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(`\nEnrolled Students (${testInstitution.name})\n-------------------------------------------`)
    // hopefully this is the way to loop
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(testInstitution.studentList).sort()) {
        expect(logSpy).toHaveBeenCalledWith(`${value.lastName}, ${value.firstName}`);
      }
    expect(logSpy).toHaveBeenCalledWith('\n')
    expect(testInstitution.listStudents()).not.toBeNull()
    logSpy.mockRestore();
})


test('CreatesInstitution_WhenAllConditionsMet_ReturnsHiredInstructor', () => {
    // Arrange 
    let softwareDevelopmentInstructor = new Instructor('Thimineur', 'Alex', testInstitution, '1/1/2024', 'athimineur');

   
    
    //  Act 
    testInstitution.hire_instructor(softwareDevelopmentInstructor);


    //Assert
    expect(testInstitution.facultyList[softwareDevelopmentInstructor.userName]).toEqual(softwareDevelopmentInstructor);
    expect(() => {testInstitution.hire_instructor(student)}).toThrow(TypeError); // just ensure proper type error
    
});



test('CreatesInstitution_WhenAllConditionsMet_ReturnsAssignedInstructor', () => {
    // Arrange 
    const logSpy = jest.spyOn(console, 'log');

   
    
    // Act 
    testInstitution.hire_instructor(sqaInstructor);
    testInstitution.add_course(softwareQualityAssuranceCourse)
    testInstitution.add_course_offering(softwareQualityAssuranceFallCourseOffering)
    testInstitution.assign_instructor(sqaInstructor, softwareQualityAssuranceCourse.name, softwareQualityAssuranceCourse.department, softwareQualityAssuranceCourse.number, softwareQualityAssuranceFallCourseOffering.sectionNumber,  softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter);


    //Assert
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${sqaInstructor.firstName} ${sqaInstructor.lastName} has been assigned to teach ${softwareQualityAssuranceFallCourseOffering}`)
    logSpy.mockRestore();
});

test('CreatesInstitution_WhenAllConditionsMet_ReturnsCourseCatalog', () => {
    // Arrange
    const logSpy = jest.spyOn(console, 'log');
    // Act 
    testInstitution.add_course(softwareQualityAssuranceCourse);
    testInstitution.list_course_catalog();

    // Assert
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(`\nCourse Catalog (${testInstitution.name})\n----------------------------------------`)
    for (const [key, value] of Object.entries(testInstitution.courseCatalog)) {
        expect(logSpy).toHaveBeenCalledWith(value);
      }
    expect(logSpy).toHaveBeenCalledWith('\n')
    expect(testInstitution.list_course_catalog()).not.toBeNull();
    logSpy.mockRestore();
})

// 
test('CreatesInstitution_WhenAllConditionsMet_ReturnsListedInstructor', () => {
    // Arrange 
    const logSpy = jest.spyOn(console, 'log');
    // Act 
    testInstitution.hire_instructor(sqaInstructor);
    testInstitution.list_instructors();

    // Assert 
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(`\nInstructor List (${testInstitution.name})\n-------------------------------------------`)
    for (const [key, value] of Object.entries(testInstitution.facultyList)) {
        expect(logSpy).toHaveBeenCalledWith(`${value.lastName}, ${value.firstName}`);
    }
    expect(logSpy).toHaveBeenCalledWith('\n');
    expect(testInstitution.list_instructors()).not.toBeNull()
    logSpy.mockRestore();
})

// 
test('CreatesInstitution_WhenAllConditionsMet_ReturnsListOfRegisteredStudents', () => {
    //Arrange 
    const logSpy = jest.spyOn(console, 'log');
    // Act 
    testInstitution.add_course(softwareQualityAssuranceCourse);
    testInstitution.add_course_offering(softwareQualityAssuranceFallCourseOffering);
    testInstitution.register_student_for_course(student, softwareQualityAssuranceCourse.name, softwareQualityAssuranceCourse.department, softwareQualityAssuranceCourse.number, softwareQualityAssuranceFallCourseOffering.sectionNumber,  softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter)
    testInstitution.list_registered_students(softwareQualityAssuranceCourse.name, softwareQualityAssuranceCourse.department, softwareQualityAssuranceCourse.number, softwareQualityAssuranceFallCourseOffering.sectionNumber, softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter);
    // Assert 
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`Registered Students List (${softwareQualityAssuranceFallCourseOffering})\n------------------------------------------------------------`)
    for (const [key, value] of Object.entries(softwareQualityAssuranceFallCourseOffering.registeredStudents)){
        expect(logSpy).toHaveBeenCalledWith(`${value.lastName}, ${value.firstName}`);
    }
    expect(() => testInstitution.list_registered_students(softwareQualityAssuranceCourse.name, softwareQualityAssuranceCourse.department, softwareQualityAssuranceCourse.number, softwareQualityAssuranceFallCourseOffering.sectionNumber, softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter)).not.toBeNull() // figure a way to do more tests 
    logSpy.mockRestore();
})

// 
test('CreatesInstitution_WhenAllConditionsMet_ReturnsListCourseScheduleWithDepartmentQuarterAndYear', () => {
        // Arrange
        // https://dev.to/zirkelc/how-to-test-console-log-5fhd for helping me figure out how to write tests for functions that have console.log in them
        const logSpy = jest.spyOn(console, 'log');
        // Act
        testInstitution.add_course(softwareQualityAssuranceCourse);
        testInstitution.add_course_offering(softwareQualityAssuranceFallCourseOffering);
        testInstitution.list_course_schedule(softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter, softwareQualityAssuranceFallCourseOffering.course.department); 
        // Assert
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith(`\nCourse Schedule (${softwareQualityAssuranceFallCourseOffering.course.department}, ${softwareQualityAssuranceFallCourseOffering.quarter} ${softwareQualityAssuranceFallCourseOffering.year})\n----------------------------------------`);
        for (const [key, value] of Object.entries(testInstitution.courseSchedule)){
            expect(logSpy).toHaveBeenCalledWith(value.toString()); // I think... 
        }
    logSpy.mockRestore();
})

// 
test('CreatesInstitution_WhenAllConditionsMet_ReturnsListCourseScheduleWithQuarterAndYear', () => {
    // Arrange
    // https://dev.to/zirkelc/how-to-test-console-log-5fhd for helping me figure out how to write tests for functions that have console.log in them
    const logSpy = jest.spyOn(console, 'log');
    // Act
    testInstitution.add_course(softwareQualityAssuranceCourse);
    testInstitution.add_course_offering(softwareQualityAssuranceFallCourseOffering);
    testInstitution.list_course_schedule(softwareQualityAssuranceFallCourseOffering.year, softwareQualityAssuranceFallCourseOffering.quarter); 
     // Assert
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(`\nCourse Schedule (${softwareQualityAssuranceFallCourseOffering.quarter} ${softwareQualityAssuranceFallCourseOffering.year})\n----------------------------------------`);
    for (const [key, value] of Object.entries(testInstitution.courseSchedule)){
        expect(logSpy).toHaveBeenCalledWith(value.toString()); // I think... 
    }
logSpy.mockRestore();
})

test('CreatesInstitution_WhenAllConditionsMet_ReturnsAddedCourse', () => {
    // Arrange 
     const softwareProjectManagement = new Course('Software Engineering', 'SER350', 'Software Project Management', 3)

    //Act 
   testInstitution.add_course(softwareProjectManagement);
   
    //Assert
    expect(testInstitution.courseCatalog[softwareProjectManagement.name]).toEqual(softwareProjectManagement)
    expect(() => testInstitution.add_course(softwareQualityAssuranceFallCourseOffering)).toThrow(TypeError)
    expect(testInstitution.add_course(softwareProjectManagement)).toBe('Course has already been added') // which happens to be the case
})

test('CreatesInstitution_WhenAllConditionsMet_ReturnsAddedCourseOffering', () => {
    //Arrange 
     const softwareProjectManagement = new Course('Software Engineering', 'SER350', 'Software Project Management', 3)
     const softwareProjectManagementOffering = new CourseOffering(softwareProjectManagement, '01', '2024', '1')
     // Act 
   testInstitution.add_course(softwareProjectManagement);
   testInstitution.add_course_offering(softwareProjectManagementOffering);
   
    //Assert
    expect(testInstitution.courseSchedule[softwareProjectManagementOffering.course.name]).toEqual([softwareProjectManagementOffering]);
    expect(() => testInstitution.add_course_offering(softwareProjectManagement)).toThrow(TypeError);
    expect(testInstitution.add_course_offering(softwareQualityAssuranceFallCourseOffering)).toBe('Please create a course before creating course offering')
    })
});