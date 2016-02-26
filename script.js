//OOP refactor created on 2/12/16

//base object constructor


$(document).ready(function(){
    console.log('Page Load?');

});
    $('#getDataBaseInfo').on('click',function(){
        console.log('was button pressed');
        $.ajax({
            dataType: 'json',
            data: {api_key: 'RoRFiNXGQj'},
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function (response) {
                console.log('AJAX was called, was it successful?: ', response);
                console.log('response.data: ', response.data);
                console.log('response.data[12]: ', response.data[12]);
                for (i = 0; i < response.data.length; i++) {
                    console.log('response.data[i]: ', response.data[i]);
                    var studentDataBase = response.data[i];
                    console.log('dataBaseInfo: ', studentDataBase);
                    school.addStudentFromDataBase(studentDataBase);
                }
            }
        })
    });




var SchoolTemplate = function () {
    var self = this;
    self.studentArray = [];
    self.addStudent = function () {
        var name = $('#studentName').val();
        var course = $('#studentCourse').val();
        var grade = $('#studentGrade').val();
        if (typeof name && course && grade !== 'string') {
            var Student = new StudentTemplate(this);
            Student.assignStudentInfoToSelf(name, course, grade);
            self.addStudentToDom(Student);
            this.studentArray.push(Student);
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
            console.log('sum of all grades =', sum);
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

    self.addStudentToDom = function (student) {
        var element = student.createStudentDomElements();
        $('tbody').append(element);
    };


    self.cancelClicked = function () {
        $('#studentName').val('');
        $('#studentCourse').val('');
        $('#studentGrade').val('');

    };
    self.removeStudentFromArray = function (student) {
        for (var i = 0; i < this.studentArray.length; i++) {
            if (student === this.studentArray[i]) {
                this.studentArray.splice(i, 1);
            }
        }

    };
    self.addStudentFromDataBase = function (data) {
        console.log('data: ', data['name']);
        var name = data['name'];
        var course = data['course'];
        var grade = data['grade'];
        var dataBaseStudent = new StudentTemplate(this);
        dataBaseStudent.assignStudentInfoToSelf(name, course, grade);
        self.calculateAverage();
        self.addStudentToDom(dataBaseStudent);
        this.studentArray.push(dataBaseStudent);
    }

};


var StudentTemplate = function (parent) {
    var self = this;
    this.parent = parent;
    console.log('this.parent', this.parent);
    this.name = null;
    this.course = null;
    this.grade = null;
    this.studentTableRow = null;
    self.assignStudentInfoToSelf = function (name, course, grade) {
        this.name = name;
        this.course = course;
        this.grade = grade;
    };
    self.createStudentDomElements = function () {
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

    self.removeSelf = function () {
        console.log('this is inside remove self method', this);
        this.studentTableRow.remove();
        this.parent.removeStudentFromArray(this);
        this.parent.calculateAverage();
    };
};
var school = new SchoolTemplate();

