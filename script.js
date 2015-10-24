/**
 * Define all global variables here
 */

/**
 * student_array - global array to hold student objects
 * @type {Array}
 */

//array to hold student info objects.


   var studentArray = [];
console.log(studentArray);
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 *
 */
      //global variable to get value of input data.

   var student = {
   studentName: $("#studentName").val(),
   studentCourse: $("#studentCourse").val(),
   studentGrade: $("#studentGrade").val()
};
console.log(student);

   //user submit button(stores date from student object to student array
/**
 *
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

//clear student form

function cancelClicked(){

}

/// creates student objects and stores in studentArray
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *a
 * @return undefined
 */
  $("input").change(function() {
      var value = $(this).val();
      student.value = value;
      studentArray.push(student);
      console.log('my object is: ', student);
      console.log('student array now holds ', studentArray);

   });


/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */

/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */