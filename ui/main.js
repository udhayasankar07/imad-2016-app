console.log('Loaded!');

            var element=document.getElementById('main')
            element.innerHTML='Gadgets Wala'
            
            var marginleft=0;
          
           var image=document.getElementById('image')
            
            image.onclick=function()
            {
              
               
                var interval=setInterval(moveRight,1000);
                
                
                
            }
            function moveRight()
            {
               
               
                marginleft=marginleft+20;
            image.style.marginLeft=marginleft+'px';
                
               
                
                
            }
           