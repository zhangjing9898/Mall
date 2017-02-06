$(function(){
	var pagination_later=$(".pagination_later");
	var originalPage=$("#originalPage");
	var otherPage=$("#otherPage");
	
	for(var i=0;i<pagination_later.length;i++)
	{
		pagination_later[i].onclick=function()
		{
			for(var i=0;i<pagination_later.length;i++)
			{
				pagination_later[i].className="pagination_later";
			}
			originalPage.fadeOut();
			otherPage.fadeIn();
			this.className="currentpage";
		}
	}
})