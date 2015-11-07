 /**
 * Define all global variables here
 */
/**
 *
 * @type {Array}
 */var studentArray = [];//student_array - global array to hold student objects
console.log(studentArray);

/**
 * inputIds -
 * @type {string[]}
 */


    //id's of the elements that are used to add students
   var stuName = $("#studentName");
   var stuCourse = $("#studentCourse");
   var stuGrade = $("#studentGrade");


/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){//function is called inside add button with "onclick"
    addStudent();//create obj and sets key values to input IDs value field
    clearStudentList();//clears value from IDs input field
    updateStudentList();//loops through global student array and appends each objects data into the student-list-container > list-body
    cancelClicked()
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

        name: $("#studentName").val(),// name:, course:, grade are my keys
        course: $("#studentCourse").val(),//Jquery selector targets the ID's inside input
        grade: $("#studentGrade").val(),// .val() method grabs info inside value field inside input
        delete: function () {
            studentArray.splice(studentArray.indexOf(this), 1);
            console.log();
        }
    };
    studentArray.push(student);//pushing student obj into global array, giving me access globally to student obj
    updateStudentList();
    calculateAverage();
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    // targets input ID's and clears field
    $("#studentName").val('');//targeting the value inside input field and resetting with open string ''
    $("#studentCourse").val('');
    $("#studentGrade").val('');
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var sum = 0; //total of the loop

    for( i=0; i<studentArray.length; i++){//go through loop

        sum += parseInt(studentArray[i].grade);//adding sum to with each loop
    }

    console.log('calling calculate average function',sum);
    var average = sum / studentArray.length;//var takes overall sum and divides by the length of the array(or students inside)
    $('.avgGrade').text(average.toFixed(2));//targets span in dom sets text to show average .toFixed method rounds up 2 decimals

}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    updateStudentList();
    calculateAverage();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    $('.student-list tbody');
    //loop through each student in the studentarray, and call addStudentToDom for EACH student in the array
    for(var i=0; i<studentArray.length; i++){//loops through studentArray
       var updateStudent = studentArray[i];//var for passing studentArray
        addStudentToDom(updateStudent, i);//for each object in the student array, and index call to ATSD


    }
    console.log(updateStudent);
}

/**
 * clearStudentList -
 */
function clearStudentList(){
    $(".student-list tbody").html('');//erases all of the dom elements from the student-list tbody

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 *
 */
function addStudentToDom(student){//passing in student obj and index
    console.log("this is the student at the beginning of addStudentToDom");
    //make td for student course and put student course into its text
    //make td for student grade and put student grade into its text
    //make delete button and put delete text into it
    //append delete button to student grade TD
    //append the 4 tds to the tr
    //append the tr to the tbody
    //adds one student to the student-list tbody
    //make tr
    //make td for student name and put student name into its text
    var td1 = $('<td>').text(student.name);
    var td2 = $('<td>').text(student.course);
    var td3 = $('<td>').text(student.grade);
    var td4 = $('<td>');

    var button = $('<button>').addClass('btn btn-danger').text('Delete').attr('type', 'button');

    td4.append(button);
    var tr = $('<tr>');
    $(tr).append(td1, td2, td3, td4);
    $('.student-list tbody').append(tr);
    console.log(student);

    button.click(function(){
        console.log('delete button clicked', $(this).parent().parent());
        student.delete();
        $(this).parents('tr').remove();
        console.log(studentArray)
    });


}

/**
 * reset -
 */
function reset (){//resets the application to initial state. Global variables reset, DOM get reset to initial load state
    studentArray = [];
    cancelClicked()}

/**
 *
 */
$(document).ready(function(){//Listen for the document to load and reset the data to the initial state
    reset();
});