var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var myFile={
    

 'udhaya':{
   
    heading:'Galaxy J7',
    date:'oct 10 2016',
    content: `
               <p>
                The Samsung Galaxy J7 Prime has been launched in India at a price of Rs. 18,790 and is now available at various retail stores. It has a lot of features such as a metal body, large 3300mAh battery, S Power Planning, and superb screen. S Power Planning and Secure Folder are both neat value additions in software. Despite featuring a large 5.5-inch screen, the J7 Prime is easy to manage. At this price point, the phone is pleasure to use.

                   The new Samsung J-series handset will easily compete with current favourites such as the Motorola Moto X Play and Lenovo Vibe X3. The Galaxy J7 Prime however faces its biggest challenge with the launch of the Lenovo Z2 Plus which packs a flagship-grade Snapdragon 820 processor and starts at a price of Rs. 17,999.
               </p>`
},

'udhaya1':{
    
    heading:'One plus 3',
    date:'oct 08 2016',
    content: `
               <p>
                The OnePlus 3 is another amazing smartphone from the Chinese company as easily its best effort yet. It's a little bit more expensive than its predecessor but it's still a ridiculous price considering the design, build and hardware on offer which matches rivals but also beats them in some areas. There's very little to dislike here unless you really need things like expandable storage and waterproofing. You don't even need an invite any longer, either.
               </p>`
    
}


};
function createTemplate(data)
{
    
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`
<html>
    <head>
       <title>Gadgets</title>
        <meta name="viewport" content="width=device-width, initial -scale=1" />
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
    
    <body>
        <div class="container">
             <div>
            <a href="/">Home</a>
        </div>
            
        <h1> 
       ${heading}
        </h1>
        
        <div >
            <img src="/ui/madi.png" class="img-medium"/>
        </div>
        
       
        <hr>
        <div>
            ${date}
        </div>
        
        <div>
            
        
        
            ${content}
         </div>`;
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
var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

app.get('/:newUdhaya', function (req, res) {
    var newUdhaya=req.params.newUdhaya;
  res.send(createTemplate(myFile[newUdhaya]));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
