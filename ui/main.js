console.log('Loaded!');
alert("Are you interested in mobiles");
            var element=document.getElementById('main')
            element.innerHTML='Gadgets Wala'
            
            var marginleft=0;
           
            
            image.onclick=function()
            {
               if(marginleft<=500)
               
                var interval=setInterval(moveRight,800);
                
                else
                 var interval1=setInterval(moveLeft,800);
                
            }
            function moveRight()
            {
               
               
                marginleft=marginleft+10;
            image.style.marginLeft=marginleft+'px';
                
               
                
                
            }
           function moveLeft()
            {
               
               
               
                
              
                     marginleft=marginleft-10;
            image.style.marginLeft=marginleft+'px';
                
                
                
                
                
            }