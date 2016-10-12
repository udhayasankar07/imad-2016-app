console.log('Loaded!');

          //  var element=document.getElementById('main');
            //element.innerHTML='Gadgets Wala';
            //<script type="text/javascript" src="/ui/main.js">
        //</script> //use this above two lines in index.html
            
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
            
           