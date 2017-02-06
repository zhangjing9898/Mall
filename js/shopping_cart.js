window.onload = function() {
	var cartTable = document.getElementById('cartTable');
	var tr = cartTable.children[1].rows;
	var checkInput = document.getElementsByClassName('check');
	var checkInputAlls = document.getElementsByClassName('check-all');
	var selectDiv = document.getElementById('selected');
	var priceDiv = document.getElementById('totalMoney');
	var selected = document.getElementsByClassName('amount-sum')[0];
	var selectArrow = document.getElementById('arrow-top');
	var infBox = document.getElementsByClassName('infBox')[0];
	var delectAll = document.getElementById('foot-delectAll');
	for(var i = 0; i < checkInput.length; i++) {
		checkInput[i].onclick = function() {
			if(this.className == 'check-all check') {
				for(var i = 0; i < checkInput.length; i++) {
					checkInput[i].checked = this.checked;
				}
			}
			if(this.checked == false) {
				for(var k = 0; k < checkInputAlls.length; k++) {
					checkInputAlls[k].checked = false;
				}
			}
			getTotal();

		}
	}
	//计算
	function getTotal() {
		var select = 0;
		var price = 0;
		var HTMLstr = '';

		for(var i = 0; i < tr.length; i++) {
			if(tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = "on";
				select += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML);
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '" width="100" height="100"/><span class="del" index="' + i + '">取消选择</span></div>';

			} else {
				tr[i].className = "";
			}

		}

		selectDiv.innerHTML = select;
		priceDiv.innerHTML = price.toFixed(2);
		selectViewList.innerHTML = HTMLstr;

		if(selectDiv.innerHTML == 0) {
			infBox.style.display = 'none';
		}
	}

	//小计
	function getSubTotal(tr) {
		/*innerHTML是指标签里的值，而value是控件的值*/
		var tds = tr.cells;
		var price = parseFloat(tds[2].innerHTML);
		var count = parseInt(tr.getElementsByTagName('input')[1].value);
		var subTotal = parseFloat(count * price).toFixed(2);
		tds[4].innerHTML = subTotal;
	}

	selected.onclick = function() {
		if(selectDiv.innerHTML == 0) {
			infBox.style.display = 'none';
		} else {
			if(selectArrow.style.transform != 'rotateX(180deg)') {
				selectArrow.style.transform = 'rotateX(180deg)';
				infBox.style.display = 'block';

			} else {
				selectArrow.style.transform = 'rotateX(0)';
				infBox.style.display = 'none';
			}
			if(selectDiv.innerHTML == 0) {
				infBox.style.display = 'none';
			}
		}
	}
	var selectViewList = document.getElementsByClassName('selectViewList')[0];
	selectViewList.onclick = function(e) {
		e = e || window.event;
		var el = e.srcElement;
		if(el.className == 'del') {
			var index = el.getAttribute('index');
			var input = tr[index].getElementsByTagName('input')[0];
			input.checked = false;
			input.onclick();
		}
	}

	for(var i = 0; i < tr.length; i++) {
		tr[i].onclick = function(e) {
			e = e || window.event;
			var el = e.srcElement;
			var cls = el.className;
			var input = this.getElementsByTagName('input')[1];
			var val = parseInt(input.value);
			switch(cls) {
				case 'input-number-decrement':
					if(val > 1) {
						input.value = val - 1;
					}
					getSubTotal(this);
					break;
				case 'input-number-increment':
					input.value = val + 1;
					getSubTotal(this);
					break;
				case 'delect':
					var conf = confirm("您确定要删除吗？");
					if(conf) {
						this.parentNode.removeChild(this);
					}
					break;
				default:
					break;
			}
			getTotal();
		}

		tr[i].getElementsByTagName('input')[1].onkeyup = function() {

			var val = parseInt(this.value);
			var tr = this.parentNode.parentNode.parentNode;
			if(isNaN(val) || val < 1) {
				val = 1;
			}
			this.val = 1;
			getSubTotal(tr);
			getTotal();
		}
	}

	delectAll.onclick = function() {
		if(selectDiv.innerHTML != '0') {
			var conf = confirm("您确定要删除吗？");
			if(conf) {
				for(var i = 0; i < tr.length; i++) {
					var input = tr[i].getElementsByTagName('input')[0];
					if(input.checked) {
						tr[i].parentNode.removeChild(tr[i]);
						i = i - 1;
					}
				}
			}
		}

	}
	
	checkInputAlls[0].checked=true;
    checkInputAlls[0].onclick();	
}