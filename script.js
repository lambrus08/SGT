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
        console.log('current status of student array:', this.studentArray);
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
