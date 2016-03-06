var express = require('express');
var router = express.Router();

var entries = [
  {title:"How to get an A", body:"Go to class. Do homework, Study.", created_at: "03/05/2016"},
  {title:"How to get an F, and divorced", body:"Play video games all day", created_at: "03/05/2016"}
];

/*READ all: GET entries listing. */
router.get('/', function(req, res, next){
  res.render('til/index', {title: 'Today I Learned', entries:entries});
});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next){
  res.render('til/new', {title: "Create a new entry"})
});

/* CREATE entry: POST /til/ */
router.post('/', function(req, res, next){
  entries.push(req.body);
  res.render('til/index', {title: 'Today I Learned', entries: entries});
})

/*UPDATE entry from: GET /til/edit */
router.get('/:id/edit', function(req, res, next){
  res.render('til/update',
  {
    title: 'Update an entry',
    id: req,params.id;
    entry: entries[req.params.id]
  });
});

/* UODATE entry: POST /til/: */
router.post('/:id', function(req, res, next){
  entries[req.params.id] = req.body;
  res.render('til/index',
  {
    title: 'Update an entry',
    til: entries
  });
});

/*DELETE entry: GET /til/1/delete */
router.get('/:id/delete', function(req, res, next){
  var id= req.params.id;
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('til/index', {title: 'Today I Learned', entries: entries});
});

/* THIS NEEDS TO BE LAST OR /new goes here rather than where it should */
/* READ one entry: GET /til/0  */
router.get('/:id', function(req, res, next){
  res.render('til/entry', {title:"An entry", entry: entries[req.params.id]});
});

module.exports = router;
