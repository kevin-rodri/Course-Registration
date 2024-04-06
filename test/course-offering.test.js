// Pulled from Github repo

const Institution = require('../src/institution.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')
const Student = require('../src/student.js')

describe('Test Group For Course Offering', () => {

    testInstitution = null
    courseTest = null
    courseOffering = null
    seniorStudent = null

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        courseTest = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
        courseOffering = new CourseOffering(courseTest, '12', '2024', '1')
        seniorStudent = new Student('Ryan', 'Dahl', testInstitution, '1/1/2024', 'rdahl')
    })


    test('CreatesCourseOffering_WhenAllConditionsMet_ReturnsOject', () => {

        // Assert
        expect(courseOffering).not.toBeNull
    })


    test('RegisterStudentToCourse_WhenAllConditionsMet_CompletesSuccessfully', () => {

        // Arrange
        const students = new Array(seniorStudent)

        // Create functions to spy on the affected operations
        const registerStudentsSpy = jest.spyOn(courseOffering, 'register_students')
        const registeredStudentsSpy = jest.spyOn(courseOffering.registeredStudents, 'push')
        const courseListSpy = jest.spyOn(seniorStudent.courseList, 'push')

        // Act
        courseOffering.register_students(students)

        // Assert
        // const registeredStudents = courseOffering.get_students()
        // expect(registeredStudents.length).toEqual(students.length)
        expect(registeredStudentsSpy).toHaveBeenCalledTimes(students.length)

    })

    test ('RegisterStudentToCourse_WhenConditionsAreMent_VerifiesCourseAddedToStudentCourseList', () => {
        // Arrange
        const students = new Array(seniorStudent)

        // Create functions to spy on the affected operations
        const registerStudentsSpy = jest.spyOn(courseOffering, 'register_students')
        const courseListSpy = jest.spyOn(seniorStudent.courseList, 'push')

        // Act
        courseOffering.register_students(students)

        // Assert
        expect(courseListSpy).toHaveBeenCalledTimes(students.length)


    })
    test('RegisterStudentToCourse_WhenStudentsIsNull_ReturnsError', () => {

        // Arrange
        const students = new Array(seniorStudent)

        // Create functions to spy on the affected operations
        const registerStudentsSpy = jest.spyOn(courseOffering, 'register_students')
        const registeredStudentsSpy = jest.spyOn(courseOffering.registeredStudents, 'push')
        const courseListSpy = jest.spyOn(seniorStudent.courseList, 'push')

        // Act
        //courseOffering.register_students(null)

        // Assert
        // Expect that an error is thrown
        // https://stackoverflow.com/questions/46042613/how-to-test-the-type-of-a-thrown-exception-in-jest
        expect(() => {courseOffering.register_students(null)}).toThrow(Error);
        
    })

    test ('RegisterStudentToCourse_WhenConditionsAreMent_ReturnsRegisteredStudents', () => {
        // Arrange
        const students = new Array(seniorStudent);

        // Create functions to spy on the affected operations
        const registerStudentsSpy = jest.spyOn(courseOffering, 'get_students')
        const registeredStudentListSpy = jest.spyOn(courseOffering.registeredStudents, 'push')

        // Act
        courseOffering.register_students(students)

        // Assert
        expect(registeredStudentListSpy).toHaveBeenCalledTimes(students.length)
    })

      // Tests submit_grade and get_grade
    test('RegistersStudentIntoCourseOffering_WhenAllConditionsAreMet_SubmitsGradeSuccessfuly', () => {
        // Arrange
        const students = new Array(seniorStudent)

        // Create functions to spy on the affected operations
        const submitGradeSpy = jest.spyOn(courseOffering, 'submit_grade')
    

        // Act
        courseOffering.submit_grade(seniorStudent, 'A')

        // Assert
        expect(submitGradeSpy).toHaveBeenCalledTimes(1);
        expect(courseOffering.submit_grade(seniorStudent, 'L')).toBe('Please enter a valid grade');
        expect(courseOffering.get_grade(seniorStudent)).toBe('A')
    
    
    })


    test('RegistersStudentIntoCourseOffering_WhenAllConditionsAreMet_ReturnsCourseOfferingToString', () => {
        // Assert
        expect(courseOffering.toString()).toEqual(`${courseOffering.course.name}, ${courseOffering.course.department} ${courseOffering.course.number}-${courseOffering.sectionNumber} (${courseOffering.quarter} ${courseOffering.year})`)
      })
})