var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/todo');

var todoSchema = new mongoose.Schema({
  item : String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'be strong'}).save(function(err) {
//   if (err) throw err;
//   console.log('item saved');
// });
//
// var data = [ {item: 'review for the final'}, {item: "groceries shopping"}, {item: 'get this app to run'} ];;

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    var itemOne = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}
