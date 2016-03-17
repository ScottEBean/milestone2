var express = require('express');
var router = express.Router();

var entries = [
  {title:"How to get an A", body:"Go to class. Do homework, Study.", created_at: "03/05/2016"},
  {title:"How to get an F, and divorced", body:"Play video games all day", created_at: "03/05/2016"}
];

/*READ all: GET entries listing. */
router.get('/', function(req, res, next){
  // req.db.driver.exeQuery(
  //   "SELECT * FROM til;",
  //   function(err, data){
  //     if(err){
  //        console.log(err);
  //     }
  //     res.render('til/index', {title: 'Today I Learned', entries:entries});
  //   }
  // );
  res.render('til/index', {title: 'Today I Learned', entries:entries});//remove this line when database is running
});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next){
  res.render('til/new', {title: "Create a new entry"})
});

/* CREATE entry: POST /til/ */
router.post('/', function(req, res, next){
  // req.db.driver.execQuery(
  //   "INSERT INTO entries (title,body) VALUES ('" request.body.title +  "','" + request.body.body"');"
  //   function(err, data){
  //     if(err){
  //       console.log(err);
  //     }
  //     res.render('til/index', {title: 'Today I Learned', entries: entries});
  //   }
  // );
  entries.push(req.body);
  res.render('til/index', {title: 'Today I Learned', entries: entries});//remove this line after database is running
})

/*UPDATE entry from: GET /til/edit */
router.get('/:id/edit', function(req, res, next){
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE entry: POST /til/: */
router.post('/:id', function(req, res, next){
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

/*DELETE entry: GET /til/1/delete */
router.get('/:id/delete', function(req, res, next){
  var id= req.params.id;
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  // req.db.driver.exeQuery(
  //   'SELECT * FROM entries WHERE id=' + parseInt(req.params.id) + ';',
  //   function(err, data){
  //     if(err){
  //       console.log(err);
  //     }
  //   }
  //);
  //
  // req.db.driver.exeQuery(
  //   "SELECT * FROM til;",
  //   function(err, data){
  //     if(err){
  //        console.log(err);
  //     }
  //     res.render('til/index', {title: 'Today I Learned', entries:entries});
  //   }``
  // );
  res.render('til/index', {title: 'Today I Learned', entries: entries}); //delete this line when db is running
});

/* THIS NEEDS TO BE LAST OR /new goes here rather than where it should */
/* READ one entry: GET /til/0  */
router.get('/:id', function(req, res, next){
  // req.db.driver.exeQuery(
  //   'SELECT * FROM entries WHERE id=' + parseInt(req.params.id) + ';',
  //   function(err, data){
  //     if(err){
  //       console.log(err);
  //     }
  //     res.render('til/entry', {title:"An entry", entry: entries[req.params.id]});
  //   }
  //);
  res.render('til/entry', {title:"An entry", entry: entries[req.params.id]}); //remove when db is running
});

module.exports = router;
