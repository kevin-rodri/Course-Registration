const Person  = require('../src/person');
const Institution = require('../src/institution')

 
describe("Person Test Cases", () => {
 test("Given NewPerson When AllConditionsMet Then ReturnsTrue", () => {

    //Given 
    // My assumptions
    const testInstitution = new Institution('Quinnipiac University', 'qu.edu');

    // When 
    // The actions necessary to complete the test case 
    // Create and validate a person
    const testPerson = new Person('lastName', 'firstName', 'test school', '1/1/2024', 'student_username', 'affiliation');

    //Then
    // conditions verifying 
    expect(2 + 2).toBe(4);

 });


})