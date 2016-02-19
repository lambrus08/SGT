//OOP refactor created on 2/12/16

//base object constructor


$(document).ready(function () {
    console.log('Page Load?');
    //var school = new SchoolTemplate();

});

var SchoolTemplate = function () {
    var self = this;
    self.studentArray = [];
    self.addStudent = function(){
        var name = $('#studentName').val();
        var course = $('#studentCourse').val();
        var grade = $('#studentGrade').val();
        var student = new StudentTemplate();
        student.assign(name, course, grade);
        this.studentArray.push(student);
        self.calculateAverage();
        self.addStudentToDom(student);
        self.clearValuesFromForm();
        console.log('current status of student array:', this.studentArray);
    };
    self.calculateAverage = function(){
        var sum = 0;
        for(i = 0; i < this.studentArray.length; i++){
            sum += parseInt(this.studentArray[i]['grade']);
            console.log('sum of all grades =', sum);
        }
        var average = sum/this.studentArray.length;
        console.log('This is my average:', average);
        $('.avgGrade').text(average.toFixed(2));
        return average;

    };

    self.addStudentToDom = function(student) {
        console.log('add student to dom check: ', student.name);
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
            var element = this;
            $(element).empty();
            console.log('delete button clicked');

        })
    };
    self.clearValuesFromForm = function(){
        $('#studentName').val('');
        $('#studentCourse').val('');
        $('#studentGrade').val('');
    };
    self.cancelClicked = function(){
        self.clearValuesFromForm();
        this.studentArray = [];
        $('tbody').empty();
        $('.avgGrade').text('0');

    }
};



var StudentTemplate = function(){
    var self = this;
    var name = self.name;
    var course = self.course;
    var grade =  self.grade;
    self.assign = function(name, course, grade){
        this.name = name;
        this.course = course;
        this.grade = grade;

    }
};
var school = new SchoolTemplate();
