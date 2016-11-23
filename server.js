var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


var config = {
  host: 'db.imad.hasura-app.io',
  user: 'udhayasankar07',
  password: process.env.DB_PASSWORD,
  database: 'udhayasankar07',
  port: '5432'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));



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
    
    <body background="https://designm.ag/images/0809/ff2/8-full.jpg">
        <div class="container">
             <div>
            <a href="/home">Home</a>
           
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
         </div>
         <hr>
         <!-- begin htmlcommentbox.com -->
 <div id="HCB_comment_box"><a href="http://www.htmlcommentbox.com">HTML Comment Box</a> is loading comments...</div>
 <link rel="stylesheet" type="text/css" href="http://www.htmlcommentbox.com/static/skins/default/skin.css" />
 <script type="text/javascript" language="javascript" id="hcb"> /*<!--*/ if(!window.hcb_user){hcb_user={  };} (function(){s=document.createElement("script");s.setAttribute("type","text/javascript");s.setAttribute("src", "http://www.htmlcommentbox.com/jread?page="+escape((window.hcb_user && hcb_user.PAGE)||(""+window.location)).replace("+","%2B")+"&opts=470&num=10");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})(); /*-->*/ </script>
<!-- end htmlcommentbox.com -->
         <hr>
        <a href="/logout">logout</a>
        
           
           `;
         
         return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mylogin.html'));

});


function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});



app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.get('/register/:input', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var input = req.params.input.split('$');
   var username =input[0];
   var password = input[1];
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.get('/login/:input', function (req, res) {
   var input=req.params.input.split('$');
   var username = input[0];
   var password = input[1];
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});







app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.status(200).send("Log out successfully");
   
});





app.get('/home', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId)
    {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
    }
    else
     res.sendFile(path.join(__dirname, 'ui', 'mylogin.html'));
});
app.get('/resume', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'resume.html'));
});







app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
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
        if (req.session && req.session.auth && req.session.auth.userId)
        {
        res.send(createTemplate(articleData));
        }
        else
         res.sendFile(path.join(__dirname, 'ui', 'mylogin.html'));
        
    }
    }   
   });
  
});










var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
