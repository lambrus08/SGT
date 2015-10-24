/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */var studentArray = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */



   var stuName = $("#studentName");
   var stuCourse = $("#course");
   var stuGrade = $("#studentGrade");


/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    addStudent();
    //clearStudentList();
    updateStudentList();
    //calculateAverage();

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
    //creates object and sets key values to input ID's value field
    var student = {

        name: $("#studentName").val(),
        course: $("#studentCourse").val(),
        grade: $("#studentGrade").val()

    };
    studentArray.push(student);
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    // targets input ID's and clears field
    $("#studentName").val('');
    $("#studetnCourse").val('');
    $("#studentGrade").val('');
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
function updateData(){
    updateStudentList()
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    //loop through each student in the studentarray, and call addStudentToDom for EACH student in the array
    for(var i=0; i<studentArray.length; i++){
       var updateStudent = studentArray[i].name; // create var and sets to arrays name index
       var updateCourse =  studentArray[i].course;//create var and sets to arrays course index
        var updateGrade = studentArray[i].grade;// create var and sets to arrays grade index
    }
    addStudentToDom(updateStudent, updateCourse, updateGrade);//variables set in to call ASD
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
 *
 */
function addStudentToDom(student){
    //make td for student course and put student course into its text
    //make td for student grade and put student grade into its text
    //make delete button and put delete text into it
    //append delete button to student grade TD
    //append the 4 tds to the tr
    //append the tr to the tbody
    //adds one student to the student-list tbody
    //make tr
    //make td for student name and put student name into its text
    // 'studentName': $("#studentName").val();
    var td1 = $('<td>').text(student.name);
    var td2 = $('<td>').text(student.course);
    var td3 = $('<td>').text(student.grade);
    var tr = $('<tr>');
    var button = $('<button>').addClass('btn btn-danger').text('Delete').click();
    $(tr).append(td1, td2, td3, button);
    $('.student-list tbody').append(tr);

}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */