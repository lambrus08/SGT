/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

var student = {

    'studentName': $("#studentName").val();
'course': $("#course").val();
'studentGrade': $("#studentGrade").val();

}
studentarray.push(student);
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    addStudent();
    clearStudentList();
    updateStudentList();
    calculateAverage();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    clearAddStudentForm();

}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    var student = {

        studentName: $("#studentName").val(),
        course: $("#course").val(),
        studentGrade: $("#studentGrade").val(),

    };
    studentarray.push(student);
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    $("#studentName").val('');
    $("#course").val();
    $("#studentGrade").val();
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    console.log('calling calculate average function');

}

/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    //loop through each student in the studentarray, and call addStudentToDom for EACH student in the array
    for(var i=0; i<studentarray.length; i++){
        addStudentToDom(studentarray[i]);
    }
    //make a for loop to go through the studentarray
    //for each object in the student array, call addStudentToDom
}

/**
 * clearStudentList - erases all of the dom elements from the student-list tbody
 */
function clearStudentList(){
    $(".student_list tbody").html('');

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(student_object){
    console.log('calling add student to dom function');
    //adds one student to the student-list tbody
    //make tr
    //make td for student name and put student name into its text
    // 'studentName': $("#studentName").val();
    $('<td>').text(student_object.studentName);
    //make td for student course and put student course into its text
    //make td for student grade and put student grade into its text
    //make delete button and put delete text into it
    //append delete button to student grade TD
    //append the 4 tds to the tr
    //append the tr to the tbody
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */