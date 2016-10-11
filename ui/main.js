console.log('Loaded!');
alert("Are you interested in mobiles");
            var element=document.getElementById('main')
            element.innerHTML='Gadgets Wala'
            
            var marginleft=0;
            var marginright=500;
           
            
            image.onclick=function()
            {
               if(marginleft<=500)
               
                var interval=setInterval(moveRight,200);
                
                else
                 var interval1=setInterval(moveLeft,200);
                
            }
            function moveRight()
            {
               
               
                marginleft=marginleft+20;
            image.style.marginLeft=marginleft+'px';
                
               
                
                
            }
           function moveLeft()
            {
               
               
               
                
              
                     marginright=marginright-10;
            image.style.marginRight=marginright+'px';
                
                
                
                
                
            }