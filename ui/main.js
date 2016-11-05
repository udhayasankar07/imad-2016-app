console.log('Loaded!');

          
            
            var marginleft=0;
          
           var image=document.getElementById('image');
            
            image.onclick=function()
            {
              
               
                var interval=setInterval(moveRight,1000);
                
                
                
            };
            function moveRight()
            {
               
               
                marginleft=marginleft+20;
            image.style.marginLeft=marginleft+'px';
                
               
                
                
            }
            
            var button=document.getElementById('counter');
            
            button.onclick=function()
            {
                var request=new XMLHttpRequest();
                request.onreadystatechange=function()
                {
                    if(request.readyState===XMLHttpRequest.DONE)
                    {
                        if(request.status===200)
                        {
                            var counter =request.responseText;
                            var span=document.getElementById('count');
                            span.innerHTML=counter.toString();
                        }
                    }
                };
                
                request.open('GET','http://udhayasankar07.imad.hasura-app.io/counter',true);
                request.send(null);
             
              
              
            };
            
            
            var submit=document.getElementById('submit_bth');
            submit.onclick=function()
            {
                 var nameInput=document.getElementById('name');
        var name=nameInput.value;
                
                  var request=new XMLHttpRequest();
                request.onreadystatechange=function()
                {
                    if(request.readyState===XMLHttpRequest.DONE)
                    {
                        if(request.status===200)
                        {
                            var names=request.responseText;
                            names=JSON.parse(names);
                                var list='';
                     for(var i=0;i<names.length;i++)
                    {
                    list+='<li>' + names[i] +'</li>';
                    }
                    var ul=document.getElementById('namelist');
                     ul.innerHTML=list;
                        }
                    }
                };
                
                request.open('GET','http://udhayasankar07.imad.hasura-app.io/submit-name?name='+name,true);
                request.send(null);
                
                
               
            };
            
            
            
            
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
                  alert('logged in Successfully');
                  windows.location.href='http://udhayasankar07.imad.hasura-app.io/';
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





