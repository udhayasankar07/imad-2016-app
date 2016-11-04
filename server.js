var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'udhayasankar07',
  password: process.env.DB_PASSWORD,
  database: 'udhayasankar07',
  port: '5432'
};

var app = express();
app.use(morgan('combined'));

function createTemplate(data)
{
    
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var image=data.image;
    var rating=data.rating;
var htmlTemplate=`
<html>
    <head>
       <title>Gadgets</title>
        <meta name="viewport" content="width=device-width, initial -scale=1" />
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
    
    <body background="http://blog.hostbaby.com/wp-content/uploads/2014/03/PaintSquares_1920x1234.jpg">
        <div class="container">
             <div>
            <a href="/">Home</a>
        </div>
            
        <h1> 
       ${heading}
        </h1>
        
        <div >
             ${image}
        </div>
        
       
        <hr>
        <div>
            ${date.toDateString()}
        </div>
        
        <div>
            
        
        
            ${content}
         </div>
         <hr>
         
         <div>
         <h3> Rating </h3>
         
         ${rating}
         </div>;
         
         return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var pool = new Pool(config);

app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test',function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else
    {
        res.send(JSON.stringify(result.rows));
    }
      
  });
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req, res) {
    
   pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
       if(err)
    {
        res.status(500).send(err.toString());
    }
    else
    {
     if(result.rows.length===0)   
     {
          res.status(404).send('article not found');
     }
    else
    {
        var articleData=result.rows[0];
        res.send(createTemplate(articleData));
    }
    }   
   });
  
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
