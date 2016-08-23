var questions;
var questionsList;

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
var selected = null;

//tree와 matrix연동 전에 임시 개발을 위한 변수
var treePerson = [];
var treeNameList = [];

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
    	ajaxCall('./getPatientsNameList', init, dif, function(data){
    		nameList = data;

    		cb(null);
    	});
    },function(cb){
    	//get all patientData
    	ajaxCall('./getCredosData3', init, dif, function(data){
        	//get all questionsData
    		ajaxCall('./getCredosQuestions', init, dif, function(qList){
    			var kmmseList = [];
    			var kdsqlList = [];
    			var siadlList = [];
    			var npiList = [];
    			var cdrList = [];
    			var hisList = [];
    			var ksfList = [];

    			for(var i=0; i<qList.length; i++){
    				var listObj = qList[i];
    				if(listObj.search('km_') != -1){
    					if(listObj.search('pent') == -1 && listObj.search('total') == -1){
    						kmmseList.push(listObj);
    					}
    				}
    				else if(listObj.search('q_kdsq') != -1){kdsqlList.push(listObj);}
    				else if(listObj.search('a_siadl') != -1){siadlList.push(listObj);}
    				else if(listObj.search('b_cga_npi') != -1){npiList.push(listObj);}
    				else if(listObj.search('g_cdr') != -1){cdrList.push(listObj);}
    				else if(listObj.search('rf_his') != -1){hisList.push(listObj);}
    				else if(listObj.search('b_ksf_gds') != -1){ksfList.push(listObj);}
    			}
    			
    			questionsList = {
    				kmmseList : kmmseList,
    				kdsqlList : kdsqlList,
    				siadlList : siadlList,
    				npiList : npiList,
    				cdrList : cdrList,
    				hisList : hisList,
    				ksfList : ksfList
    			};

    			cb(null, data);
    		});
    	});
    },function(data, cb){
    	if(selected == null){
    		selected = 'kmmseList';
    		questions = questionsList[selected];
    	}
    	//make personList & nameList
    	
    	var name = null;
    	var index = 0;
    	
    	for(var i=0; i<data.length; i++){
    		if(i == 0){
    			name = data[i].id;
    			index++;
    		}else if(i == data.length-1){personList.push(makeList(i-index, index+1, data));}
    		else{
    			if(name == data[i].id){
    				index++;
    			}else{
    				var object = makeList(i-(index), index, data);
    				personList.push(object);
    				index = 0;
    				index++;
    				name = data[i].id;
    			}
    		}
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

//user define for using waterfall
function makeList(start, index, data){
	switch(index){
		case 4: 
			return {
				first : data[start],
				second : data[start+1],
				third : data[start+2],
				fourth : data[start+3]
			};
		case 5: 
			return {
				first : data[start],
				second : data[start+1],
				third : data[start+2],
				fourth : data[start+3],
				fifth : data[start+4]
			};
	}
	
}

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
			0.5, 'rgba(208,208,212,0.8)', 'basicTriangle');
	plusAxis = height/(middleX-x);
	plusYxis = y - plusAxis*x;
	
	drawLine(treeInit.svg, 
			x+width, y+height, 
			middleX, y, 
			0.5, 'rgba(208,208,212,0.8)', 'basicTriangle');
	minusAxis = height/(middleX - x+width);
	minusYxis = y - minusAxis*(x+width);
	drawLine(treeInit.svg, 
			x, y+height, 
			x+width, y+height, 
			0.5, 'rgba(208,208,212,0.8)', 'basicTriangle');
	
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
					2.5*(1-obj[j]), 'rgb(36,171,229)', '');
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
					dif.xDif - 3.5, dif.yDif - 1.8, 'rgba(208,208,212,0.3)', 
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
				dif.yDif, 'gray',
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
	
	if(question.search('km_') != -1){range = 1;}
	else if(question.search('q_kdsq') != -1){range = 3;}
	else if(question.search('a_siadl') != -1){range = 3;}
	else if(question.search('b_cga_npi') != -1){range = 5;}
	else if(question.search('g_cdr') != -1){range = 3;}
	else if(question.search('rf_his') != -1){range = 3;}
	else if(question.search('b_ksf_gds') != -1){range = 3;}
	
	for(var i=0; i<range; i++){
		drawLine(gTag, 
				x, y+dif.yDif*order + (rectHeight/range*i), 
				x+width, y+dif.yDif*order + (rectHeight/range*i), 
				0.5, 'white', question+' order'+i);
	}
}

function drawPatientRectGuideLine(gTag, init, order, rect){

	var width = rect.attr('width')*1;
	var x = rect.attr('x')*1;

	var bigY = init.matrixRoot.attr('y')*1;
	var bigHeight = init.matrixRoot.attr('height')*1;
	var quarter = width/5;

	for(var i=0; i<5; i++){
		drawLine(gTag, 
				x + quarter*i, bigY, 
				x + quarter*i, bigY+bigHeight, 
				0.5, 'white', 'verticalGuideLine order'+i);
	}
}

function dataInputMatrix(init){
	var orderList = ['first', 'second', 'third', 
	                 'fourth', 'fifth'];

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
				if(person[orderList[j]][questions[i]] != 9 && 
						person[orderList[j]][questions[i]] != 'NA'){
					var value = person[orderList[j]][questions[i]];
					
					value = changeValueToYPos(questions[i], value, height)
					
					drawRect(gTag, 
							x + width/5*j, y+(height - value), 
							width/5, value, 
							'rgba(38,158,206,0.8)', 'smallRect', '');
				}else if(person[orderList[j]][questions[i]] != 9 || 
						person[orderList[j]][questions[i]] != 'NA'){
					drawRect(gTag, 
							x+width/5*j, y, 
							width/5, height, 
							'rgba(208,208,212,1)', 'smallRect', '');
				}
			}else{
				drawRect(gTag, 
						x+width/5*j, y, 
						width/5, height, 
						'rgba(208,208,212,1)', 'smallRect', '');
			}
		}
	}
}

function changeValueToYPos(question, value, height){
	var range;

	if(question.search('km_') != -1){range = 1;}
	else if(question.search('q_kdsq') != -1){range = 3;}
	else if(question.search('a_siadl') != -1){range = 3;}
	else if(question.search('b_cga_npi') != -1){range = 5;}
	else if(question.search('g_cdr') != -1){range = 3;}
	else if(question.search('rf_his') != -1){range = 3;}
	else if(question.search('b_ksf_gds') != -1){range = 3;}

	return height/range*value;
}

$('.listChange').click(function(){
	var thisObj = $(this);
	var rect = $('#matrixArea > svg > matrixSvg');
	$('#matrixArea > svg').empty();
	$('#matrixArea > svg').append(rect);
	questions = questionsList[thisObj.val()];
	
	init.svg.append('rect').attr({
		x : init.padding + 30,
		y : 10,
		width : init.graphW,
		height : init.graphH,
		fill : 'none',
		stroke : 'none',
		id : 'matrixSvg'
	});
	dif = {
    		xDif : init.graphW/nameList.length,
    		yDif : init.graphH/questions.length
    	}
    	makePatientRect(init, dif);
    	drawVariableText(init, dif);
    	dataInputMatrix(init);
    	d3.selectAll('.verticalGuideLine').moveToFront();
});
