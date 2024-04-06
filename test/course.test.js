const course = require('../src/course');


describe('Course Test', () => {
    let courseTest = null 

    beforeEach(() => {
        courseTest = new course('Software Engineering', 'SER330', 'Software Quality Assurance', 3)
     })

     test('CreatesCourse_WhenAllConditionsMet_ReturnsCourseToString', () => {
        expect(courseTest.toString()).toEqual(`${courseTest.name}, ${courseTest.department} ${courseTest.number} (${courseTest.credits} credits)`); 
    })

});