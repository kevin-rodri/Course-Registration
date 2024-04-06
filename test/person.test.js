const Person  = require('../src/person');
const Institution = require('../src/institution')

 
describe("Person Test Cases", () => {

   let testPerson = null
   let testInstitution = null
   beforeEach(() => {
      testInstitution = new Institution('Quinnipiac University', 'qu.edu')
      testPerson = new Person('Rodriguez', 'Kevin', testInstitution, '1/1/2024', 'krodriguez', 'student');
   })
   
 test("CreateNewPerson_WhenAllConditionsMet_ReturnsEmail", () => {
   //Assert
    expect(testPerson.email).toEqual( `${testPerson.userName}@${testPerson.school.domain}`);

 });


 test("CreateNewPerson_WhenAllConditionsMet_ReturnsPersonToString", () => {

   //Assert
   expect(testPerson.toString()).toEqual(
      '\n' + 'Student Name: ' + testPerson.firstName + ' ' + testPerson.lastName + '\n' +
            'School: ' + testPerson.school.name + '\n' +
            'DOB: ' + testPerson.dateOfBirth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '\n' +
            'Username: ' + testPerson.userName + '\n' +
            'affiliation: ' + testPerson.affiliation + '\n')
   

});

})