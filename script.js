//OOP refactor created on 2/12/16

//base object constructor


$(document).ready(function () {
    console.log('Page Load?');//checking for page load
    $('body').append("<div id='ajaxLoader'><p><img src='assets/ajax-loader.gif'></p></div>");//addiing gif to body

    $('#ajaxLoader').css({//applying css to my gif as page loads
        display: 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    });
    $('#getDataBaseInfo').on('click',function(){
        $.ajax({
            dataType: 'json',
            data: {api_key: 'RoRFiNXGQj'},
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function (response) {
                if (response.success) {
                    console.log('AJAX was called, was it successful?: ', response);
                    console.log('response.data: ', response.data);
                    console.log('response.data[12]: ', response.data[12]);
                    for (i = 0; i < response.data.length; i++) {//loop to grab object data and send to my school object
                        console.log('response.data[i]: ', response.data[i]);
                        var studentDataBase = response.data[i];
                        console.log('dataBaseInfo: ', studentDataBase);
                        school.addStudentFromDataBase(studentDataBase);
                    }
                    school.calculateAverage();
                    var lowestStudents = school.findLowestGrade();
                    var highestStudents = school.findHighestGrade();
                    for(var index in highestStudents){
                        console.log('going to highlight ',highestStudents[index]);
                        highestStudents[index].highLight('success');
                    }
                    for(var index in lowestStudents){
                        lowestStudents[index].highLight('danger')
                    }

                }

                else {
                    school.ajaxErrorHandling(response);//error handler, pops up modal if needed
                }
            },
            error: function (response) {
                if (response.success) {// console error message to further assist handling errors
                    console.log('Error, your response was not successful: ', response.error);
                }
            }
        });
    });
});
$(document).ajaxStart(function () {//function to start loading screen every time an
    $('#ajaxLoader').show();//ajax call is made
}).ajaxStop(function () {
    $('#ajaxLoader').hide();
});


var SchoolTemplate;
SchoolTemplate = function () {//parent school template
    var self = this;
    self.studentArray = [];
    self.addStudent = function () {
        var name = $('#studentName').val();
        var course = $('#studentCourse').val();
        var grade = $('#studentGrade').val();
        var id = null;
        if (typeof name && course && grade && id !== 'string') {//this was done to stop from pressing the add button
            $.ajax({                                            //while no values are set inside input fields
                dataType: 'json',
                method: 'POST',
                url: 'http://s-apis.learningfuze.com/sgt/create',
                data: {
                    api_key: 'RoRFiNXGQj',
                    name: name,
                    course: course,
                    grade: grade,
                    new_id: 'value'//ajax purpose to add info to server data base. need id to identify students being added
                },
                success: function (response) {
                    if (response.success) {
                        console.log('Successful response: ', response, response.new_id);
                        id = response.new_id;
                        Student.assignStudentInfoToSelf(name, course, grade, id);//passing info to student obj to
                        console.log('this is id: ', id);                         //assign itself
                    }
                    else {
                        school.ajaxErrorHandling(response);//error handler with modal pop up if error occurs
                    }
                },
                error: function (response) {
                    console.log('Error, your response was not successful: ', response)
                }
            });
            var Student = new StudentTemplate(this);//creating student object
            Student.assignStudentInfoToSelf(name, course, grade, id);//passing in info to student to assign itself
            self.addStudentToDom(Student);
            self.studentArray.push(Student);//pushing student info to school student array
            self.calculateAverage();
            self.cancelClicked();
            console.log('current status of student array:', this.studentArray);
        }
        else {
            console.log('exit');
            return;
        }

    };
    self.calculateAverage = function () {
        var sum = 0;
        for (i = 0; i < this.studentArray.length; i++) {
            sum += parseInt(this.studentArray[i]['grade']);
            //console.log('sum of all grades =', sum);
        }
        if (sum > 0) {
            var average = sum / this.studentArray.length;
            console.log('This is my average:', average);
            $('.avgGrade').text(average.toFixed(2));
            return average;
        }
        else {
            $('.avgGrade').text('0');
        }
    };

    self.addStudentToDom = function (student) {//adding all elements to appear on the DOM itself
        var element = student.createStudentDomElements();
        $('tbody').append(element);
    };


    self.cancelClicked = function () {//clears all input fields
        $('#studentName').val('');
        $('#studentCourse').val('');
        $('#studentGrade').val('');

    };
    self.removeStudentFromArray = function (student) {//removes current student pressed used by delete button
        for (var i = 0; i < this.studentArray.length; i++) {
            if (student === this.studentArray[i]) {//giving student parameter a value of current item selected in my student array
                this.studentArray.splice(i, 1);//the actual removal of student;
            }
        }

    };
    self.addStudentFromDataBase = function (data) {//data para comes from our ajax call which passes in object with all info
        console.log('data: ', data['id']);//from server side
        var name = data['name'];//setting variables to construct new student object call dataBaseStudent
        var course = data['course'];
        var grade = data['grade'];
        var id = data['id'];//id is use to verify if student has been added to server data base

        var dataBaseStudent = new StudentTemplate(this);
        dataBaseStudent.assignStudentInfoToSelf(name, course, grade, id);
        self.studentArray.push(dataBaseStudent);
        self.addStudentToDom(dataBaseStudent);

    };


    self.ajaxErrorHandling = function (answer) {//error handler for ajax calls that uses a modal to notify user
        console.log('answer: ', answer);
        if (answer.success !== true) {
            $('#errorModal').modal('show');
            $('#detailsButton').popover({
                trigger: "hover",
                placement: "left",
                content: answer.errors
            });
        }
    };

    self.findHighestGrade = function () {
        var highGrade = this.studentArray[0]['grade'];//grabbing current grade from student array
        console.log('test high grade grades: ', highGrade);
        var highGradeArr = [];// output array to keep track of highest grade
        if (highGradeArr.length <= 1) {// my high grade array must be equal to one or less to run loop
            highGradeArr.push(this.studentArray[0]);//pushing results to my grade array
            console.log('grade array: ', highGradeArr);
        }
        for (var i = 1; i < this.studentArray.length; i++) {
            if (this.studentArray[i]['grade'] > highGrade) {//comparing current grade selected to last grade selected
                highGrade = this.studentArray[i]['grade'];//if greater than, assign highGrade to current highest grade
                highGradeArr = [];//empty array

            }
            if (this.studentArray[i]['grade'] == highGrade) {//if current grade selected == to high grade
                highGradeArr.push(this.studentArray[i]);//push studentArray grade into high grade array;
            }
        }
        console.log('return of high grades: ', highGradeArr);
        return highGradeArr;

        //gives me current status of all high grades.
    };

    self.findLowestGrade = function () {
        var lowGrade = this.studentArray[0]['grade'];
        console.log('low grade: ', lowGrade);
        var lowGradeArr = [];
        if (lowGradeArr <= 1) {
            lowGradeArr.push(this.studentArray[0]);
            console.log('test for low grade array: ', lowGradeArr);
        }
        for (var i = 1; i < this.studentArray.length; i++) {
            if (this.studentArray[i]['grade'] < lowGrade) {
                lowGrade = this.studentArray[i]['grade'];
                lowGradeArr = [];
            }
            if (this.studentArray[i]['grade'] == lowGrade) {
                lowGradeArr.push(this.studentArray[i]);
            }

        }
        console.log('return of low grade array: ', lowGradeArr);
        return lowGradeArr;
    }

};


var StudentTemplate = function (parent) {//student template to handle the construction of new student objects
    var self = this;
    this.parent = parent;//parameter to identify its parent which in this case is school object
    console.log('this.parent', this.parent);
    this.name = null;
    this.course = null;
    this.grade = null;
    this.id = null;
    this.studentTableRow = null;
    self.assignStudentInfoToSelf = function (name, course, grade, id) {
        this.name = name;
        this.course = course;
        this.grade = grade;
        this.id = id;
    };
    self.createStudentDomElements = function () {//method to create all elements added to DOM dynamically
        console.log('add student to dom check: ', this.name);
        var td1 = $('<td>').text(this.name);
        var td2 = $('<td>').text(this.course);
        var td3 = $('<td>').text(this.grade);
        var td4 = $('<td>');
        var button = $('<button>').addClass('btn btn-danger').text('Delete').attr('type', 'button');
        var tr = $('<tr>');
        td4.append(button);
        $(tr).append(td1, td2, td3, td4);
        this.studentTableRow = tr;
        button.click(function () {
            self.removeSelf();
            console.log('current student array after delete is pressed', parent.studentArray);
        });


        return tr;
    };

    self.highLight = function(highlight){
        self.studentTableRow.addClass(highlight);
    };



    self.removeSelf = function () {//method to remove current student out of school student array as well as server data base.
        $.ajax({
            dataType: 'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            data: {
                api_key: 'RoRFiNXGQj',
                student_id: this.id
            },
            success: function (response) {
                if (response.success) {
                    console.log('Your response was successful: ', response.success);
                }
                else {
                    school.ajaxErrorHandling(response);
                }
            },
            error: function () {
                console.log('Your response failed');
            }
        });
        console.log('this is inside remove self method', this);
        this.studentTableRow.remove();
        this.parent.removeStudentFromArray(this);
        this.parent.calculateAverage();
    };
};
var school = new SchoolTemplate();


