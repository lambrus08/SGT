 /**
 * Define all global variables here
 */
/**
 *
 * @type {Array}
 */
    var studentArray = [];
 console.log(studentArray);


/**
 * inputIds -
 * @type {string[]}
 */

 /*var stuName = $('#studentName');
 var stuCourse = $('#studentCourse');
 var stuGrade = $('#studentGrade');*/
/**
 * addClicked - Event Handler when user clicks the add button
 *
 */
function addClicked()
{
    addStudent();
    clearAddStudentForm();
    /*updateStudentList();*/
    calculateAverage();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked()
{
    clearAddStudentForm()
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 *
 * @return undefined
 */
function addStudent()
{
    var student =
    {
        name: $('#studentName').val(),
        course: $('#studentCourse').val(),
        grade: $('#studentGrade').val(),
        delete: function(){
            console.log('this:', this);
        }
    };
    addStudentToDom(student);
    studentArray.push(student);
    console.log(studentArray);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm()
{
    $('#studentName').val('');
    $('#studentCourse').val('');
    $('#studentGrade').val('');

}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var sum = 0;
    for(i=0; i < studentArray.length; i++)
    {
        sum += parseInt(studentArray[i].grade);
        console.log('sum of all grades =', sum);


    }
   var average = sum/studentArray.length;
    console.log(average);
    $('.avgGrade').text(average.toFixed(2));
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
/*
function updateStudentList()
{

    for(i = 0; i < studentArray.length; i++){
       console.log('update student', studentArray[i].name);
        $('tbody').append(studentArray[i]);

    }
}
*/

/**
 * clearStudentList -
 */


/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 *
 */

function addStudentToDom(student)
{
    console.log('add student to dom check:', student.name);
    var td1 = $('<td>').text(student.name);
    var td2 = $('<td>').text(student.course);
    var td3 = $('<td>').text(student.grade);
    var td4 = $('<td>');
    var button = $('<button>').addClass('btn btn-danger').text('Delete').attr('type', 'button');

    var tr = $('<tr>');
    td4.append(button);
    $('tbody').append(tr);
    $(tr).append(td1, td2, td3, td4);
    button.click(function(){
        console.log('delete button was clicked');
    })


}
function reset(){
    studentArray = [];
    cancelClicked();
}
$(document).ready(function(){
    reset();

});