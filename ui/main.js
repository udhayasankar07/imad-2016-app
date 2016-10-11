console.log('Loaded!');
alert("Are you interested in mobiles");
            var element=document.getElementById('main')
            element.innerHTML='Gadgets Wala'
            
            var marginleft=0;
            image.onclick=function()
            {
                var interval=setInterval(moveRight,500);
                
            }
            function moveRight()
            {
                marginleft=marginleft+10;
            image.style.marginLeft=marginleft+'px';
                
            }