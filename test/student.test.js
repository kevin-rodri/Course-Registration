const Student = require('../src/student')
const Institution = require('../src/institution.js')
const Course = require('../src/course')
const CourseOffering = require('../src/course-offering')


describe('Student Test', () => {
    let testInstitution = null 
    let student = null
    let courseTest = null
    let courseOffering = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        student = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
        courseTest = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
        courseOffering = new CourseOffering(courseTest, '01', '2024', '1')
     })

     test('CreatesStudent_WhenAllConditionsMet_ReturnsListedCourse', () => {
         // Arrange
         const studentCourseCredits = new Array(student)
         // Act
         courseOffering.register_students(studentCourseCredits);
         courseOffering.submit_grade(student, 'A')
        //Assert
        expect(student.list_courses()).toEqual([courseOffering.toString()])

    })


    test('CreatesStudent_WhenAllConditionsMet_ReturnsCredit', () => {
        // Arrange
        const studentCourseCredits = new Array(student)
    
        // Act
        courseOffering.register_students(studentCourseCredits);
        
        // Assert
        expect(student.credits).toEqual(3);
    });
    
     
    test('CreatesStudent_WhenAllConditionsMet_ReturnsGPA', () => {
        // Arrange
        const studentCourseCredits = new Array(student)
    
        // Act
        courseOffering.register_students(studentCourseCredits);
        courseOffering.submit_grade(student, 'A');
    
        // Assert
        expect(student.gpa).toEqual(4.0);
    });
    test('CreatesStudent_WhenAllConditionsMet_ReturnsStudentInfoToString', () => {
        //Assert
        expect(
            '\n' + 'Student Name: ' + student.firstName + ' ' + student.lastName + '\n' +
            'School: ' + student.school.name + '\n' +
            'DOB: ' + student.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '\n' +
            'Username: ' + student.userName + '\n' +
            'Email: ' + student.email + '\n' +
            'GPA: ' + student.gpa + '\n' +
            'Credits: ' + student.credits + '\n'
        )

    })
});