            function todu(n) {
				if(n < 10) {
					return '0' + n;
				} else {
					return '' + n;
				}
			}
            function getstyle(obj, name) {
				if(obj.currentStyle) {
					return obj.currentStyle[name];
				} else {
					return getComputedStyle(obj, 2)[name];
				}
			};
			function startMove(obj,json,fnEnd) {
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					for(var attr in json)
					{
					var cur=0;
					if(attr=='opacity')
					{
					  cur=Math.round(parseFloat(getstyle(obj,attr))*100);	
					}
					else
					{
					  cur=parseInt(getstyle(obj,attr));	
					}
					
					var speed = (json[attr] - cur)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					
					if(attr[json]==cur)
					{
						clearInterval(obj.timer);
						if(fnEnd)
						fnEnd();
					}
					else
					{
						if(attr=='opacity')
						{
							obj.style.filter='alpha(opacity:'+(cur+speed)+')';
							obj.style.opacity=(cur+speed)/100;
						}
						else
						{
						obj.style[attr]=cur+speed+'px';	
						}	
					}	
					}	
				}, 30);
			 };
		  
           window.onload = function() {
					function tick() {
					var odiv=document.getElementById('div1');
				    var oimg = odiv.getElementsByTagName('img');
					var oDate = new Date();
					var str = todu(oDate.getHours()) + todu(oDate.getMinutes()) + todu(oDate.getSeconds());
					var h=todu(oDate.getHours());
					var m=todu(oDate.getMinutes());
					var s=todu(oDate.getSeconds());
					odiv.innerHTML=h+":"+m+":"+s;
				}
				setInterval(tick, 1000);
				tick();
               
				function week() {
					var odiv2=document.getElementById('div2');
					var oDate = new Date();
					var str = oDate.getDay();
					var arr=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					odiv2.innerHTML=arr[str];
				}
				setInterval(week,1440000);
				week();
				
				var odiv=document.getElementById('paly');
				var obtn=odiv.getElementsByTagName('ol')[0].getElementsByTagName('li');
				var oUl=odiv.getElementsByTagName('ul')[0];
				var now=0;
				for(var i=0;i<obtn.length;i++)
				{
					obtn[i].index=i;
					obtn[i].onclick=function()
					{ 
						now=this.index;
						tab();
						
					}
					function tab()
					{
						for(var i=0;i<obtn.length;i++)
						{
							obtn[i].className='';
						}
						obtn[now].className='active';
						startMove(oUl,{top:-260*now})
						
					}
					function next()
					{	
						
						if(now==obtn.length)
						{
							now=0;
						}
						tab();
					    now++;
					}
				}
					var timer=null;
				   timer=setInterval(next,2000);
				   odiv.onmouseover=function()
				   {
				   	clearInterval(timer);
				   }
				   odiv.onmouseout=function()
				   {
				   	timer=setInterval(next,2000);
				   }
				   
				
			}
          