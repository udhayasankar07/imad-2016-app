var loggedinFlag=false;
var request=new XMLHttpRequest();
var loggedinAs="";
request.onreadystatechange=function()
{
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200)
        {   
            loggedinFlag=true;
            loggedinAs=request.responseText.toString().substring(13);
        }else{
            loggedinFlag=false;
        }
    }
};
request.open('GET','http://udhayasankar07.imad.hasura-app.io/checklogin',true);
request.send(null);















           
            
            
            
            
            
            
            function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};







function loginFunction () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  
                  window.location.href='http://udhayasankar07.imad.hasura-app.io/home';
                  
              } else if (request.status === 403) {
                  alert('Username/password incorrect');
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  
              } 
          }  
         
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        var input=username+'$'+password;
        request.open('GET', 'http://udhayasankar07.imad.hasura-app.io/login/'+input, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);  
        
        
}


function registerFunction () {
        // Create a request object
        var request = new XMLHttpRequest();
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        var input=username+'$'+password;
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                 alert('User '+ username+' created successfully');
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  
              } 
          }  
         
        };
        
        if(username.length!==0&&password.length!==0)
        {
        request.open('GET', 'http://udhayasankar07.imad.hasura-app.io/register/'+input, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(null);
        }
        else
        {
            alert('Enter a username and password');
        }
        
        
}

function logout(){
    var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                 window.location.href="http://udhayasankar07.imad.hasura-app.io/";
              }
          }  
         
        };
        request.open('GET', 'http://udhayasankar07.imad.hasura-app.io/logout', true);
        request.send(null); 
}


function addComment(){
    if(loggedinFlag === true){
        var commentElement=document.getElementById('commenttext');
        var commentText=commentElement.value.toString();
        var request=new XMLHttpRequest();
        request.onreadystatechange=function()
        {
            if(request.readyState===XMLHttpRequest.DONE)
            {
                if(request.status===200)
                {
                    fetchComments();
                    commentElement.value="";
                }else{
                    alert('Comment failed.. Please login to comment..');
                }
            }
        };
        request.open('GET','http://udhayasankar07.imad.hasura-app.io/addcomments/'+commentText,true);
        request.send(null);
    }else{
        alert('Please Login to comment');
    }
}


function fetchComments(){
    var commentsElement = document.getElementById("comments");
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status ===200){
                commentsElement.innerHTML = request.responseText.toString();
            }
        }
    };
    request.open('GET','http://udhayasankar07.imad.hasura-app.io/getcomments',true);
    request.send(null);
}




