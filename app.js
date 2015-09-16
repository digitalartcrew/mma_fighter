var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  db = require('./models');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); //post
app.use(methodOverride('_method'));// Put and Delete 


//Get the home application page
app.get('/', function(req,res){
	db.Fighter.find({}, function(err, fighters){
		if (err){
			console.log(err);
		} 
		res.render('index',{fighters: fighters});
	});
});

// To get a form to save a new fighter
app.get('/fighters/new', function (req,res){
	res.render('fighters/new');
});

//To save a new fighter
app.post('/fighters', function (req,res){
  db.Fighter.create(req.body.fighter, function(err, fighter){
    if(err){
      var errorText = "Title can't be blank";
      res.render("fighters/new", {error: errorText});
    } else {
      res.redirect("/");
    }
  });
});

//To Find a fighter by ID and display info
app.get('/fighters/:id', function (req, res){
	db.Fighter.findById(req.params.id, function(err, foundfighter){
    if(err){
      res.render("404");
    } else {
      res.render('fighters/show', {fighter: foundfighter});
    }
  });

});

//Update page for specific fighter information on page
app.get('/fighters/update/:id', function (req, res){
 db.Fighter.findById(req.params.id, function(err, foundfighter){
    if(err){
      res.render("404");
    } else {
      res.render('fighters/update', {fighter:foundfighter});
    }
  });
});

//Update info and redirect
app.put('/fighters/:id', function (req, res){
 db.Fighter.findByIdAndUpdate(req.params.id, req.body.fighter,  function(err, fighter){
  if(err){
    res.render("404");
  } else{
    res.redirect('/');
  }
 });
});

//Delete a fighter
app.delete('/fighters/:id', function (req, res){
  db.Fighter.findByIdAndRemove(req.params.id, function(err, fighter){
    if(err){
      res.render("404");
    } else{
      res.redirect('/');
    }
  });
});



//Sort Array
app.put('/sort', function(req,res){
db.fighters.find().sort( { name: -1 } );
});

//Additonal Application
app.get('/about', function (req, res){
	res.render('site/about');
});

app.get('/contact', function ( req, res){
	res.render('site/contact');
});

app.listen(3000, function(){
	console.log("Server running on port 3000");
});