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
            var countelement=0;
            var count=document.getElementById('count');
            var counter=document.getElementById('counter');
            counter.onClick=function()
            {
                countelement=countelement+1;
                count.innerHtml=countelement;
                
            };
            
           