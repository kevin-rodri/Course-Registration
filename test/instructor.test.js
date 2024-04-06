const Instructor = require('../src/instructor')
const Course = require('../src/course');
const Institution = require('../src/institution')
const CourseOffering = require('../src/course-offering')

describe('Instructor Tests', ()  => {
    let sqaInstructor = null
    let softwareQualityAssuranceCourse = null
    let testInstitution = null 

    beforeEach(() => {
        testInstitution = new Institution('Quinnipiac University', 'qu.edu')
        sqaInstructor = new Instructor('Nicolini', 'Dylan', testInstitution, '1/1/2024', 'dnicolini')
        softwareQualityAssuranceCourse = new Course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
     })

    test('CreateCourse_WhenPushingCourse_ReturnsListedCourseWithYear', () => {

        // Arrange 
         sqaInstructor.course_list.push(softwareQualityAssuranceCourse)    

         // Act
        let quarterNull = sqaInstructor.list_courses('2024');

         // Assert
         expect(sqaInstructor.list_courses()).toEqual([softwareQualityAssuranceCourse.toString()]);
        
       
    })

    test('CreateAnotherCourse_WhenPushingCourse_ReturnsNewlyListedCourseWithQuarter', () => {

        // Arrange 
        let fullStack = new Course('Software Engineering', 'SER341', 'Full Stack Dev 2: Software Design', 3);
         

         // Act
         sqaInstructor.course_list.push(fullStack)   
        let yearNull = sqaInstructor.list_courses(null , '1'); // this is probably not the right way to do this.. 

         // Assert
         expect(sqaInstructor.list_courses()).toEqual([fullStack.toString()]);
        
       
    })

    test('CreateAnotherCourse_WhenPushingCourse_ReturnsNewlyListedCourseWithYearAndQuarter', () => {

        // Arrange 
        let fullStack = new Course('Software Engineering', 'SER341', 'Full Stack Dev 2: Software Design', 3);
           

         // Act
         sqaInstructor.course_list.push(fullStack)
        let yearAndQuarter = sqaInstructor.list_courses('2024' , '1');  

         // Assert
         expect(sqaInstructor.list_courses()).toEqual([fullStack.toString()]);
        
       
    })

    test('CreateInstructor_WhenAllConditionsMet_ReturnsInstructorInfoToString', () => {
        //Assert
       expect(sqaInstructor.toString()).toEqual(
        '\n' + 'Instructor Name: ' + sqaInstructor.firstName + ' ' + sqaInstructor.lastName + '\n' +
            'School: ' + testInstitution.name + '\n' +
            'DOB: ' + sqaInstructor.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '\n' +
            'Username: ' + sqaInstructor.userName + '\n'
       ); 
    })
})