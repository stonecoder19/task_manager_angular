angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		$scope.modalData = {};
		$scope.query = "";

		$(document).ready(function() {
                $('#priority').on('click',function() {
					  $scope.formData.priority = $(this).val()
					  
				});
				$('#priorityModal').on('click',function() {
					  $scope.modalData.priority = $(this).val()
					  
				});
         });

		

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.description != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				
                                console.log("Hello");
                                 Todos.create($scope.formData)


					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
			//console.log("hello");
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.changeStatus = function(todo){
            		todo.status = "done";
            console.log(todo._id)
            Todos.update(todo)
               .success(function(data){
               	   $scope.todos = data;
               });
  

		};

		$scope.fillForm = function(todo){
			$scope.modalData._id = todo._id;
			$scope.modalData.status = todo.status;
			$scope.modalData.description = todo.description;
			$scope.modalData.notes = todo.notes;
			$scope.modalData.due_date = todo.due_date;
			$scope.modalData.category = todo.category;
			$scope.modalData.priority = todo.priority;
		}

		$scope.editTask = function(){
		 	Todos.update($scope.modalData)
               .success(function(data){
               	   $scope.todos = data;
               });
		}
	}]);
