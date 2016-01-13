var StudentListView = Backbone.View.extend({


	el: '#app',

	events: {
		'submit form': 'addStudent', 
		'change input[type="radio"]': 'presentStudent'
	},

	presentStudent: function(event) {

		var $input = $(event.currentTarget);
		var inputValue = $input.val();


		var studentFirstname = $input.parents('li').attr('data-firstname');

		var targetModel = this.myStudentCollection.findWhere({
			firstname: studentFirstname
		});


		if (targetModel) {

			if (inputValue === 'present') {

				targetModel.set({
					present: true
				});

			} else {

				targetModel.set({
					present: false
				});

			}
		}
	},

	addStudent: function (event) {

		event.preventDefault();

		var $form = $(event.currentTarget);
		var studentFirstname = $form.find('.firstname').val();
		var studentName = $form.find('.name').val();
		
		var newStudentModel = new StudentModel({
			firstname: studentFirstname,
			name: studentName
		});

		this.myStudentCollection.add(newStudentModel);

		newStudentModel.save();

		this.render();

	},

	initialize: function() {

		var self = this;

		this.myStudentCollection = new StudentCollection();

		this.myStudentCollection.fetch();

		this.myStudentCollection.on('change', function(){
			self.updateStat();
		});

		this.render();
	},

	render: function() {

		var $renderTarget = this.$('.student-list');

		$renderTarget.empty();

		var allMyStudents = this.myStudentCollection.toJSON();

		for (var i = 0;  i < allMyStudents.length; i++) {
			var student = allMyStudents [i];
			var studentTemplate = this.getTemplate(student);
			$renderTarget.append(studentTemplate);

		};
	},

	getTemplate: function(studentData) {

		
		var isPresentChecked = '';
		var isAbsentChecked = 'checked';

		console.log(studentData);


		if (studentData.present) {
			isPresentChecked = 'checked';
			isAbsentChecked = '';
		}

		var studentTemplate = '\
			<li data-firstname="'+ studentData.firstname +'">\
				<h2>'+ studentData.firstname +' '+ studentData.name +' </h2>\
				<form>\
					<label>Présent</label>\
					<input '+ isPresentChecked +' type="radio" class="present" name="student" value="present" />\
					<label>Absent</label>\
					<input '+ isAbsentChecked +' type="radio" class="absent" name="student" value="absent" />\
				</form>\
			</li>\
		 ';

		return $(studentTemplate)

	},

	updateStat: function() {

		var studentNumber = this.myStudentCollection.length;
		var targetModel = this.myStudentCollection.findWhere({
		console.log('$$'),
		});
	}
});








