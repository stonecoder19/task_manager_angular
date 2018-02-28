var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            description: req.body.description,
            notes: req.body.notes,
            due_date: req.body.due_date,
            category: req.body.category,
            priority: req.body.priority
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    app.put('/api/todos', function(req,res){
        console.log("hello");
        var id = req.body._id;
        var description = req.body.description;
        var notes = req.body.notes;
        var status = req.body.status;
        var due_date = req.body.due_date;
        var category = req.body.category;
        var priority = req.body.priority;

        //console.log(id);
         
        var oldTodo = null;
        Todo.findOne({_id: id},function(err,result){
            if(err){

                console.log(err);
                return;
            }
            
            oldTodo = result;
            if(!oldTodo)
              return;

            //console.log(oldTodo.description);
            //conole.log(req.body._id);
            oldTodo.description = description;
            oldTodo.notes = notes;
            oldTodo.status = status;
            oldTodo.due_date = due_date;
            oldTodo.category = category;
            oldTodo.priority = priority;
            console.log(oldTodo);
            Todo.updateOne({_id: id},{
                description: description,
                notes: notes,
                status: status,
                due_date: due_date,
                category: category,
                priority: priority
                }
            , function(err, todo){
                 if(err)
                    res.send(err);
                getTodos(res);
            });

        });
    

        

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
