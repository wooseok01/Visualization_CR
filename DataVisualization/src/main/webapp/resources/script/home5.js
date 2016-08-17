var questions = ['a_barthel_3','a_barthel_8','a_barthel_10','a_siadl_p9','km_o_t_5',
                 'km_o_p_2','km_o_p_4','a_siadl_p2','a_siadl_c6','a_siadl_p6',
                 'km_o_t_2','km_o_t_4','q_kdsq_14','q_kdsq_15','a_siadl_c2',
                 'a_siadl_c7','km_o_t_1','km_o_t_3','km_o_p_5','q_kdsq_13',
                 'a_siadl_c3','a_siadl_p3','a_siadl_p4','a_siadl_p5','a_siadl_p13',
                 'a_siadl_p14','a_siadl_c1','a_siadl_c8','a_siadl_p8','a_siadl_c13',
                 'a_siadl_c14','a_siadl_c15','a_siadl_p15'];

var dif;
var treeDif;
var init = init();
var treeInit = treeInit();
var nameList = [];
var personList = [];
var plusAxis;
var plusYxis;
var minusAxis;
var minusYxis;

//tree와 matrix연동 전에 임시 개발을 위한 변수
var treePerson = [];
var treeNameList = [];
//var treeNameList = ['MjcwODE1LTEwNjM2MTEg', 'MjgwNjA2LTIwNjM2MTAg', 'MjgxMjMwLTExMTEwMTEg', 'MjkwMjI2LTEwNTg0MTcg', 
//                    'MjkwMjI2LTIwMzcyMjkg', 'MjkwMTAxLTIwMzc0Mjkg', 'MjkwNDA5LTEwMzc4Mjcg', 'MjkwNDE3LTIzNTc1MTQg',
//                    'MjkwODE3LTEwNjk1MTEg', 'MjkwOTI1LTI3MDE2MTgg', 'MjkxMTIwLTIwMzY1MTQg', 'MjMwMzEyLTE4MjkyMTQg',
//                    'MjUwMjAxLTEwMjU0MTQg', 'MjUwNDI4LTI2NzA5MTAg', 'MzAwMTI0LTIwMDU3MTYg', 'MzAwNjEwLTEwNDc4MTUg',
//                    'MzAwNjIxLTEwMTc0MTMg', 'MzAwNjIyLTIwNTExMjUg', 'MzAwNzMwLTE0NzA2MTgg', 'MzAwODA3LTEwMDU4MTAg',
//                    'MzAxMDI4LTI0ODExMTcg', 'MzcwMTA1LTI1NTE0MTMg', 'MzcwNDAxLTExNDk0MTUg', 'MzEwODI4LTI5MjcyMTEg', 
//                    'MzEwOTI0LTIwMzYxMTEg', 'MzExMTExLTIwMzc5MjEg', 'MzgwMjA0LTIyMjk4MTYg', 'MzgwNDI1LTIwMTc3MTcg', 
//                    'MzgxMTA1LTIwMTczMTIg', 'MzIwNjA3LTIwNDIxMjgg', 'MzIwNjEyLTEwNDc3MTEg', 'MzIwNzAxLTIwNDI0MTUg',
//                    'MzIwOTE4LTExNjMwMTMg', 'MzIxMjI5LTIxNjkzMTUg', 'MzkwNTAxLTEwNzQzNDEg', 'MzMwMjI1LTIwMDA3MTEg', 
//                    'MzMxMjAyLTIwNjY5MTIg', 'MzMxMTA3LTIwNjkwMTAg', 'MzQwMjIxLTI3Nzc4MTEg', 'MzQxMjIwLTEwNTIwMTQg',
//                    'MzUwMjE1LTIwMTkyMjgg', 'MzUwMTAxLTIwMDAzMTEg', 'MzUxMjA1LTI1NTI3MTcg', 'MzUxMjAyLTIwNDIyMTcg',
//                    'MzYwMTIwLTIwMzczMTkg', 'MzYwMzA4LTIwNzQ0MTcg', 'MzYwNTIxLTEwNDE5MTQg', 'MzYwOTE1LTI4OTQ0MTQg',
//                    'MzYxMDAxLTE1NDI5MjYg', 'MzYxMjAyLTIxMDg3MTkg', 'NDAwOTIwLTEwMjM1MjUg', 'NDAxMDE1LTEyMzE3MTEg',
//                    'NDcwMzE1LTIxMDYyMjgg', 'NDcxMTE2LTIwNTI0MTQg', 'NDEwMTIwLTExNjIzMTgg', 'NDEwNjAyLTExMDA3MTUg',
//                    'NDEwODEzLTI0NzE2MTEg', 'NDEwODI1LTE3OTgxMTEg', 'NDExMjE1LTE0NjY3Mjkg', 'NDgwNzA5LTI4MTQ2MTMg',
//                    'NDIxMjEyLTIwMjM1MTgg', 'NDkxMjE1LTIwNTYyMzgg', 'NDMwMzIzLTEwNDI3MTEg', 'NDMwOTAyLTEwMTEyMTgg',
//                    'NDMxMTEwLTIxMTk4MTkg', 'NTAwMzIyLTI4MDc4Mjcg', 'NTQwODA4LTE5MzA0MTgg'];



d3.selection.prototype.moveToFront = function() {  
	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};

d3.selection.prototype.moveToBack = function() {  
	return this.each(function() { 
		var firstChild = this.parentNode.firstChild; 
		if (firstChild) { 
			this.parentNode.insertBefore(this, firstChild); 
		} 
	});
};

async.waterfall([
    function(cb){
    	ajaxCall('./getCredosData3', init, dif, function(data){
    		cb(null, data);
    	});
    },function(data, cb){
    	//make personList & nameList
    	for(var i=0; i<data.length; i+=4){
    		personList.push({
    			first : data[i],
				second : data[i+1],
				third : data[i+2],
				fourth : data[i+3]
    		});
    		nameList.push(data[i].name);
    	}
    	cb(null);
    }, function(cb){
    	//draw basic template
    	dif = {
    		xDif : init.graphW/nameList.length,
    		yDif : init.graphH/questions.length
    	}
    	
    	makePatientRect(init, dif);
    	drawVariableText(init, dif);
    	cb(null);
    }, function(cb){
    	//data input!
    	dataInputMatrix(init);
    	d3.selectAll('.verticalGuideLine').moveToFront();

    	cb(null);
    }, function(cb){
    	ajaxCall('./getSimilarityPerson', init, dif, function(data){
    		cb(null, data);
    	});
    	
    }, function(data, cb){
    	// draw tree
    	//basic triangle
    	treePerson = data;
    	drawBasicTriangle(treeInit);
    	cb(null);
    }, function(cb){
    	ajaxCall('./getSimilarityColumn', init, dif, function(data){
    		cb(null,data);
    	});
    },function(data, cb){
    	treeNameList = data;
    	drawSimilarityCircle();
    	cb(null, 'done');
    }
    ],
    function(err, result){
		if(err != null){
			console.log(err.message);
		}else{
			console.log(result);
		}
		
});

// user define function
// tree
function treeInit(){
	var width = $('#treeArea').width()*1;
	var height = $('#treeArea').height()*1;
	var padding = 20;
	var graphW = width - padding*2 - 30;
	var graphH = height - padding;
	
	var svg = d3.select('#treeArea').append('svg').attr({
		width : width,
		height : height
	});
	
	var treeRoot = svg.append('rect').attr({
		x : padding + 30,
		y : 10,
		width : graphW,
		height : graphH,
		fill : 'none',
		stroke : 'none',
		id : 'treeSvg'
	});
	
	return {
		svg : svg,
		treeRoot : treeRoot,
		padding : padding,
		graphW : graphW,
		graphH : graphH
	};
}

function drawBasicTriangle(treeInit){
	var x = treeInit.treeRoot.attr('x')*1;
	var y = treeInit.treeRoot.attr('y')*1;
	var height = treeInit.treeRoot.attr('height')*1;
	var width = treeInit.treeRoot.attr('width')*1;
	
	var middleX = (x + (x+width))/2;
	
	drawLine(treeInit.svg, 
			x, y+height, 
			middleX, y, 
			0.5, 'rgba(255,255,255,0.5)', 'basicTriangle');
	plusAxis = height/(middleX-x);
	plusYxis = y - plusAxis*x;
	
	drawLine(treeInit.svg, 
			x+width, y+height, 
			middleX, y, 
			0.5, 'rgba(255,255,255,0.5)', 'basicTriangle');
	minusAxis = height/(middleX - x+width);
	minusYxis = y - minusAxis*(x+width);
	drawLine(treeInit.svg, 
			x, y+height, 
			x+width, y+height, 
			0.5, 'rgba(255,255,255,0.5)', 'basicTriangle');
	
	treeDif = {
			xDif : width/treePerson.length,
			yDif : height/treePerson.length
	};
}

function drawSimilarityCircle(){
	var x = treeInit.treeRoot.attr('x')*1;
	var y = treeInit.treeRoot.attr('y')*1;
	var width = treeInit.treeRoot.attr('width')*1;
	var height = treeInit.treeRoot.attr('height')*1;
	var similarityArr = getSimilarityCircleData();
	var yDif = height/similarityArr.length;
	var firstXDif = width/similarityArr.length/2;
	var xDif = width/similarityArr.length;
	
	for(var i=0; i<similarityArr.length; i++){
		var obj = similarityArr[i];
		
		for(var j=0; j<obj.length; j++){
			drawCircle(treeInit.svg, 
					x+xDif*j+xDif/2, y+height-yDif*i, 
					2.5*obj[j], 'green', '');
		}
		x+=xDif/2;
	}
}

function getSimilarityCircleData(){
	var similarityArr = [];
	var length = treePerson.length;
	
	for(var i=0; i<treePerson.length; i++){
		var arr = [];
		
		for(var j=0; j<treePerson.length-i; j++){
			var name = treeNameList[j+i];
			var first = name.substring(0,1);
			
			if(first == 'M')
				name = first.toLowerCase() + name.substring(1, name.length);
			
			var value = treePerson[j][name];
			arr.push(value);
		}
		similarityArr.push(arr);
	}
	
	return similarityArr;
}

// user define function
// matrix
function init(){
	$('#resetButton').css({
		left : $('#matrixArea').width()-$('#resetButton').width()-50
	});
	
	var width = $('#matrixArea').width()*1;
	var height = $('#matrixArea').height()*1;
	var padding = 20;
	var graphW = width - padding*2 - 30;
	var graphH = height - 40;
	
	var svg = d3.select('#matrixArea').append('svg').attr({
		width : width,
		height : height
	});
	
	var matrixRoot = svg.append('rect').attr({
		x : padding + 30,
		y : 10,
		width : graphW,
		height : graphH,
		fill : 'none',
		stroke : 'none',
		id : 'matrixSvg'
	});
	
	return {
		svg : svg,
		matrixRoot : matrixRoot,
		padding : padding,
		graphW : graphW,
		graphH : graphH
	}
}

function ajaxCall(url, init, dif, cb){
	$.ajax({
		url : url,
		dataType : 'json',
		success : function(data){
			cb(data);
		},
		error : function(err){
			console.log(err.message);
		}
	});
}

function makePatientRect(init, dif){
	var width = $('#matrixSvg').attr('width')*1;
	var height = $('#matrixSvg').attr('height')*1;
	var x = $('#matrixSvg').attr('x')*1;
	var y = $('#matrixSvg').attr('y')*1;
	
	for(var i=0; i<personList.length; i++){
		var gTag = init.svg.append('g').attr({
			id : personList[i].first.name+' rect',
			'class' : 'verticalOrder'+i
		});
		
		for(var j=0; j<questions.length; j++){
			var rect = drawRect(gTag,
					x+dif.xDif*i, y+dif.yDif*j, 
					dif.xDif - 3.5, dif.yDif - 1.8, 'rgba(255,255,255,0.8)', 
					personList[i].first.name+' rectangle '+questions[j], '');
		}
		drawPatientRectGuideLine(gTag, init, i, rect);
	}
}

function drawVariableText(init, dif){
	var x = init.matrixRoot.attr('x')*1;
	var y = init.matrixRoot.attr('y')*1;
	
	for(var i=0; i<questions.length; i++){
		var gTag = init.svg.append('g').attr({
			id : 'parallelGuideLine'+i
		});
		
		drawText(gTag, 
				x-7, dif.yDif*i-(dif.yDif/3)+y, 
				dif.yDif, 'rgba(255,255,255,0.8)',
				questions[i], questions[i])
				.attr({'text-anchor' : 'end'})
				.style({'font-size' : '7px'});
		
		drawVariableGuideLine(init, questions[i], i, gTag);
	}
}

function drawVariableGuideLine(init, question, order, gTag){
	
	var range;
	var x = init.matrixRoot.attr('x')*1;
	var y = init.matrixRoot.attr('y')*1;
	var width = init.matrixRoot.attr('width')*1;
	var rectHeight = $('.rectangle').attr('height')*1;
	
	if(question.search('km_o') != -1){range = 1;}
	else if(question.search('a_siadl') != -1){range = 3;}
	else if(question.search('q_kdsq') != -1){range = 3;}
	else if(question.search('a_barthel') != -1){range = 3;}
	
	for(var i=0; i<range; i++){
		drawLine(gTag, 
				x, y+dif.yDif*order + (rectHeight/range*i), 
				x+width, y+dif.yDif*order + (rectHeight/range*i), 
				0.5, 'rgba(0,17,30,0.7)', question+' order'+i);
	}
}

function drawPatientRectGuideLine(gTag, init, order, rect){

	var width = rect.attr('width')*1;
	var x = rect.attr('x')*1;

	var bigY = init.matrixRoot.attr('y')*1;
	var bigHeight = init.matrixRoot.attr('height')*1;
	var quarter = width/7;

	for(var i=0; i<7; i++){
		drawLine(gTag, 
				x + quarter*i, bigY, 
				x + quarter*i, bigY+bigHeight, 
				0.5, 'rgba(0,17,30,0.7)', 'verticalGuideLine order'+i);
	}
}

function dataInputMatrix(init){
	var orderList = ['first', 'second', 'third', 
	                 'fourth', 'fifth', 'sixth',
	                 'seventh'];

	for(var i=0; i<personList.length; i++){
		var gTag = d3.select('.verticalOrder'+i);
		drawSmallVarGraph(init, gTag, personList[i], orderList, i);
	}
}

function drawSmallVarGraph(init, gTag, person, orderList, order){
	
	for(var i=0; i<questions.length; i++){
		var rect = gTag.select('.'+questions[i]);

		var x = rect.attr('x')*1;
		var y = rect.attr('y')*1;
		var width = rect.attr('width')*1;
		var height = rect.attr('height')*1;

		for(var j=0; j<orderList.length; j++){
			if(person[orderList[j]] != null){
				if(person[orderList[j]][questions[i]] != 9){
					var value = person[orderList[j]][questions[i]];
					value = changeValueToYPos(questions[i], value, height)
					
					drawRect(gTag, 
							x + width/7*j, y+(height - value), 
							width/7, value, 
							'rgba(187,104,41,0.95)', 'smallRect', '');
				}else{
					drawRect(gTag, 
							x+width/7*j, y, 
							width/7, height, 
							'rgba(37,48,57,0.7)', 'smallRect', '');
				}
			}else{
				drawRect(gTag, 
						x+width/7*j, y, 
						width/7, height, 
						'rgba(37,48,57,0.7)', 'smallRect', '');
			}
		}
	}
}

function changeValueToYPos(question, value, height){
	var range;

	if(question.search('km_o') != -1){range = 1;}
	else if(question.search('a_siadl') != -1){range = 3;}
	else if(question.search('q_kdsq') != -1){range = 3;}
	else if(question.search('a_barthel') != -1){range = 3;}

	return height/range*value;
}

