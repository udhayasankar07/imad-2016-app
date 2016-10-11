console.log('Loaded!');
alert("Are you interested in mobiles");
            var element=document.getElementById('main')
            element.innerHTML='Gadgets Wala'
            
            var marginleft=0;
            var marginright=1000;
            
            image.onclick=function()
            {
                if(marginleft<1000)
                var interval=setInterval(moveRight,100);
                else
                  var interval1=setInterval(moveLeft,100);
                
                
            }
            function moveRight()
            {
               
                
                marginleft=marginleft+10;
            image.style.marginLeft=marginleft+'px';
                
                
                
            }
             function moveLeftt()
            {
               
               
                     marginright=marginright-10;
            image.style.marginRight=marginright+'px';
                
                
            }