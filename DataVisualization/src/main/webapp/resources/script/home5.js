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
var phaseDif;
var rectWidth;

//tree와 matrix연동 전에 임시 개발을 위한 변수
var treePerson = [];
var treeNameList = [];
var similarityArr = [];

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
		nameList = data;
		drawSimilarityCircle();
		cb(null);
	}, function(cb){
    	//get all patientData
    	ajaxCall('./getCredosData3', init, dif, function(data){
        	//get all questionsData
    		ajaxCall('./getCredosQuestions', init, dif, function(qList){
    			var kmmseList = [];
    			var kdsqlList = [];
    			var siadlList = [];
    			var npiList = [];
    			var cdrList = [];
    			var ksfList = [];

    			for(var i=0; i<qList.length; i++){
    				var listObj = qList[i];
    				if(listObj.search('km_') != -1){
    					if(listObj.search('pent') == -1 && listObj.search('total') == -1){
    						kmmseList.push(listObj);
    					}
    				}else if(listObj.search('q_kdsq') != -1){kdsqlList.push(listObj);}
    				else if(listObj.search('a_siadl') != -1){
    					if(listObj.search('a_siadl_p') == -1)
    						siadlList.push(listObj);
    					
    				}else if(listObj.search('b_cga_npi') != -1){npiList.push(listObj);}
    				else if(listObj.search('g_cdr') != -1){cdrList.push(listObj);}
    				else if(listObj.search('b_ksf_gds') != -1){ksfList.push(listObj);}
    			}
    			
    			questionsList = {
    				kmmseList : kmmseList,
    				kdsqlList : kdsqlList,
    				siadlList : siadlList,
    				npiList : npiList,
    				cdrList : cdrList,

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
    	data = credosDataFitSimilarity(data);
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
    	drawPhaseGraph(init, dif);
    	cb(null);
    }, function(cb){
    	//data input!
    	dataInputMatrix(init);
    	d3.selectAll('.verticalGuideLine').moveToFront();

    	cb(null,'done');
    }
    ],
    function(err, result){
		if(err != null){
			console.log(err.message);
		}else{
			console.log(result);
		}
});

function credosDataFitSimilarity(data){
	var result=[];

	for(var i=0; i<nameList.length; i++){
		for(var j=0; j<data.length; j++){
			if(data[j].id == nameList[i])
				result.push(data[j]);
		}
	}

	return result;
}

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
		height : graphH+5,
		fill : 'none',
		stroke : 'none',
		id : 'treeSvg'
	});
	
	drawRect(svg, 
			graphW-padding*3 + 10-2.5, padding*2, 
			5, 10, 'rgba(53,158,131,1)', 
			'guideDescription', '');
	drawRect(svg, 
			graphW-padding*3 + 10-2.5, padding*3, 
			5, 10, 'rgba(49,58,66,1)', 
			'guideDescription', '');
	
	drawCircle(svg, 
			graphW-padding*3 + 10, padding*4+2.5, 
			5, 'rgba(53,158,131,1)', '');
	
	drawCircle(svg, 
			graphW-padding*3 + 10, padding*5+2.5, 
			2, 'rgba(53,158,131,1)', '');
	
	
	drawText(svg, 
			graphW-padding*3 + 20, padding*2-1, 
			10, 'white', 'guideDescription', 'Score').style({
				'text-anchor' : 'start'
			});
	drawText(svg, 
			graphW-padding*3 + 20, padding*3-1, 
			10, 'white', 'guideDescription', 'No data');
	drawText(svg, 
			graphW-padding*3 + 20, padding*4-3, 
			10, 'white', 'guideDescription', 'High similarity');
	
	drawText(svg, 
			graphW-padding*3 + 20, padding*5-3, 
			10, 'white', 'guideDescription', 'Low similarity');
	
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

	plusAxis = (y-(y+height))/(middleX-x);
	plusYxis = y+height - plusAxis*x;
	
	minusAxis = (y+height-y)/(x+width-middleX);
	minusYxis = y - minusAxis*(middleX);
	
	drawLine(treeInit.svg, 
			x, y+height, 
			x+width, y+height, 
			0.5, 'rgba(208,208,212,0.8)', 'basicTriangle');
	var lineData = [];
	lineData.push({x : x, y : y+height});
	lineData.push({x : middleX, y : y});
	lineData.push({x : x+width, y : y+height});
	
	drawGraph(treeInit.svg, lineData, '', 'rgba(208,208,212,0.8)', 
			0.5, 'linear', 'rgba(225,245,156,0.15)');
	
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
	var arr = [];

	similarityArr = getSimilarityCircleData();

	var yDif = height/similarityArr.length;
	var firstXDif = width/similarityArr.length/2;
	var xDif = width/similarityArr.length;

	for(var i=0; i<similarityArr.length; i++){
		var obj = similarityArr[i];
		
		for(var j=0; j<obj.length; j++){
			var circle = drawCircle(treeInit.svg, 
					x+xDif*j+xDif/2, y+height-yDif*i, 
					2.5*(1-obj[j]), 'rgb(53,158,131)', 
					nameList[j]+'And'+nameList[j+i]+' similarityCircle real circleOrder'+i+'-'+j);

			if(i == 0){
				circle.attr({
					'id' : nameList[j],
					'class' : nameList[j]+'And'+nameList[j]+' similarityCircle real circleOrder'+i+'-'+j
				});
			}else{
				drawCircle(treeInit.svg, 
						x+xDif*j+xDif/2, y+height-yDif*i, 
						3, 'rgba(53,158,131,0)', 
						nameList[j]+'And'+nameList[j+i]+' similarityCircle circleOrder'+i+'-'+j);
			}
		}
		x += xDif/2;
	}
	
	divideCluster(similarityArr);
}

function divideCluster(similarityArr){
	//same circle devide
	
	var x = treeInit.treeRoot.attr('x')*1;
	var y = treeInit.treeRoot.attr('y')*1;
	var width = treeInit.treeRoot.attr('width')*1;
	var height = treeInit.treeRoot.attr('height')*1;
	
	var sameCircle = ['MjMwMzEyLTE4MjkyMTQg', 'NDEwODI1LTE3OTgxMTEg',
	                  'NDExMjE1LTE0NjY3Mjkg', 'MjgwNjA2LTIwNjM2MTAg',
	                  'NTAwMzIyLTI4MDc4Mjcg', 'NTQwODA4LTE5MzA0MTgg',
	                  'NDkxMjE1LTIwNTYyMzgg', 'NDMwMzIzLTEwNDI3MTEg',
	                  'NDcxMTE2LTIwNTI0MTQg', 'NDEwODEzLTI0NzE2MTEg'];
	
	var middleList = ['#MzIxMjI5LTIxNjkzMTUg', 
	                  '.NDExMjE1LTE0NjY3MjkgAndMjgwNjA2LTIwNjM2MTAg',
	                  '.NTAwMzIyLTI4MDc4MjcgAndNTQwODA4LTE5MzA0MTgg',
	                  '.NDkxMjE1LTIwNTYyMzggAndNDMwMzIzLTEwNDI3MTEg',
	                  '.NDcxMTE2LTIwNTI0MTQgAndNDEwODEzLTI0NzE2MTEg'];
	
	var cx; 
	var cx2; 
	var xDif = $('#'+sameCircle[0]).attr('cx')*1 - x;
	var lineData = [];
	
	
//    'NDEwODEzLTI0NzE2MTEg', 'MjMwMzEyLTE4MjkyMTQg'
	var unSameCircle = ['MzUwMTAxLTIwMDAzMTEg', 'MjkwNDA5LTEwMzc4Mjcg',
	                    'MjMwMzEyLTE4MjkyMTQg', 'MzYwNTIxLTEwNDE5MTQg',
	                    'NDExMjE1LTE0NjY3Mjkg', 'MzYwNTIxLTEwNDE5MTQg',
	                    'MzUwMTAxLTIwMDAzMTEg', 'NDEwODEzLTI0NzE2MTEg',
	                    'MzYxMjAyLTIxMDg3MTkg', 'MjkwNDA5LTEwMzc4Mjcg',
	                    'NDAxMDE1LTEyMzE3MTEg', 'NDkxMjE1LTIwNTYyMzgg',
	                    'NDAxMDE1LTEyMzE3MTEg', 'MzYxMjAyLTIxMDg3MTkg',
	                    'NDAxMDE1LTEyMzE3MTEg', 'NDEwODEzLTI0NzE2MTEg'];
	//MzYwNTIxLTEwNDE5MTQg
	//
	var unSameMiddleList = ['.MzUwMTAxLTIwMDAzMTEgAndMjkwNDA5LTEwMzc4Mjcg',
	                        '.MjMwMzEyLTE4MjkyMTQgAndMzYwNTIxLTEwNDE5MTQg',
	                        '.NDExMjE1LTE0NjY3MjkgAndMzYwNTIxLTEwNDE5MTQg',
	                        '.MzUwMTAxLTIwMDAzMTEgAndNDEwODEzLTI0NzE2MTEg',
	                        '.MzYxMjAyLTIxMDg3MTkgAndMjkwNDA5LTEwMzc4Mjcg',
	                        '.NDAxMDE1LTEyMzE3MTEgAndNDkxMjE1LTIwNTYyMzgg',
	                        '.NDAxMDE1LTEyMzE3MTEgAndMzYxMjAyLTIxMDg3MTkg',
	                        '.NDAxMDE1LTEyMzE3MTEgAndNDEwODEzLTI0NzE2MTEg'
//	                        '.NDIxMjEyLTIwMjM1MTggAndNDAxMDE1LTEyMzE3MTEg'
	                        ];
	
	for(var i=0; i<unSameCircle.length/2; i++){
		cx = $('#'+unSameCircle[i*2]).attr('cx')*1;
		cx2 = $('#'+unSameCircle[i*2+1]).attr('cx')*1;
		lineData.push({x : cx - 2.5/2, y : y+height});
		lineData.push({x : cx2 + 2.5/2, y : y+height});
		var cr = $(unSameMiddleList[i]).attr('r')*1;
		lineData.push({
			x : $(unSameMiddleList[i]).attr('cx')*1,
			y : $(unSameMiddleList[i]).attr('cy')*1 - cr 
		});
		lineData.push({x : cx - 2.5/2, y : y+height});
		//rgba(0,17,30,1)
		if(i<2){
			drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
					0.5, 'linear', 'rgba(195,215,126,0.7)');
		}else if(i<5){
			if(i==2){
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(185,205,116,0.7)');
			}else{
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(185,205,116,0.7)');				
			}
		}else if(i<7){
			if(i==5){
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(185,205,116,0.7)');
			}else if(i==6){
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(195,215,126,0.7)');
			}else{
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(205,225,136,0.7)');			
			}
		}else if(i<8){
			if(i==7){
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(205,225,136,0.7)');
			}else{
				drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
						0.5, 'linear', 'rgba(215,235,146,0.7)');				
			}
		}
		lineData = [];
	}
	
	
	
	for(var i=0; i<sameCircle.length/2; i++){
		cx = $('#'+sameCircle[i*2]).attr('cx')*1;
		cx2 = $('#'+sameCircle[i*2+1]).attr('cx')*1;
		if(i == 0){
			lineData.push({x : x, y : y+height});
			lineData.push({x : cx2, y : y+height});
			lineData.push({
				x : $(middleList[i]).attr('cx')*1,
				y : plusAxis*($(middleList[i]).attr('cx')*1)+plusYxis
			});
			lineData.push({x : x, y : y+height});
		}else if(i == sameCircle.length/2-1){
			lineData.push({x : cx - xDif/2, y : y+height});
			lineData.push({x : x+width, y : y+height});
			var cr = $(middleList[i]).attr('r')*1;
			lineData.push({
				x : $(middleList[i]).attr('cx')*1,
				y : $(middleList[i]).attr('cy')*1 -cr 
			});
			lineData.push({x : cx - xDif/2, y : y+height});
		}else{
			lineData.push({x : cx - xDif/2, y : y+height});
			lineData.push({x : cx2 + xDif/2, y : y+height});
			var cr = $(middleList[i]).attr('r')*1;
			lineData.push({
				x : $(middleList[i]).attr('cx')*1,
				y : $(middleList[i]).attr('cy')*1 -cr 
			});
			lineData.push({x : cx - xDif/2, y : y+height});
		}
		drawGraph(treeInit.svg, lineData, '', 'rgba(255,255,255,0.8)', 
				0.5, 'linear', 'rgba(175,195,106,0.7)');
		lineData = [];
	}
	d3.selectAll('.real').moveToFront();
	d3.selectAll('.similarityCircle')
	.on('mouseover', function(){
		
		var className = $(this).attr('class');
		var split = className.split('And');
		var first = split[0];
		var second = (split[1].split(' '))[0];
		
		$('#'+first).attr('fill','orange');
		$('#'+second).attr('fill','orange');
		$('.'+first+'And'+second+'.similarityCircle.real').attr('fill','orange');
		
		$('#'+first+'NameGraph').find('.phase').attr('stroke','orange');
		$('#'+second+'NameGraph').find('.phase').attr('stroke','orange');
		
		treeNodeHoverFunction(first, second, this, 'Hover','rgba(255,165,0,0.2)');
		split = split[1].split(' ');
		guideCircleColorChange(split[split.length-1]);
		
		if(first != second){
			var firstClass = $('#'+first).attr('class');
			var secondClass = $('#'+second).attr('class');
			split = firstClass.split(' ');
			guideCircleColorChange(split[split.length-1]);
			split = secondClass.split(' ');
			guideCircleColorChange(split[split.length-1]);
		}

	}).on('mouseout', function(){
		var className = $(this).attr('class');
		var split = className.split('And');
		var first = split[0];
		var second = (split[1].split(' '))[0];
		
		$('#'+first+'NameGraph').find('.phase').attr('stroke','white');
		$('#'+second+'NameGraph').find('.phase').attr('stroke','white');
		
		d3.selectAll('.similarityCircle').attr('fill','rgba(53,158,131,0)');
		d3.selectAll('.real').attr('fill','rgb(53,158,131)');
		
		$('.Hover').remove();
	}).on('click', function(){
		var className = $(this).attr('class');
		var split = className.split('And');
		var first = split[0];
		var second = (split[1].split(' '))[0];
		
	});
}

function guideCircleColorChange(circleOrder){
	var order = circleOrder.substring('circleOrder'.length, circleOrder.length);
	var firstOrder = order.split('-')[0]*1;
	var secondOrder = order.split('-')[1]*1;
	var tempFirst = firstOrder;
	var tempSecond = secondOrder;
	//left upside node color change logic
	while(true){
		tempFirst++;
		tempSecond--;

		if(tempFirst>64 || tempSecond<0) break;
		
		$('.real'+'.circleOrder'+tempFirst+'-'+tempSecond).attr('fill','orange');
	}
	
	tempFirst = firstOrder;
	tempSecond = secondOrder;
	
	//right downside node color change logic
	while(true){
		tempFirst--;
		tempSecond++;

		if(tempFirst<0 || tempSecond>63) break;
		
		$('.real'+'.circleOrder'+tempFirst+'-'+tempSecond).attr('fill','orange');
	}
	
	tempFirst = firstOrder;
	tempSecond = secondOrder;
	//right upside node color change logic
	while(true){
		tempFirst++;
//		tempSecond++;

		if(similarityArr[tempFirst].length < tempSecond)break;

		$('.real'+'.circleOrder'+tempFirst+'-'+tempSecond).attr('fill','orange');
	}
	
	tempFirst = firstOrder;
	tempSecond = secondOrder;
	//left downside node color change logic
	while(true){
		tempFirst--;
		
		if(tempFirst<0) break;
		
		$('.real'+'.circleOrder'+tempFirst+'-'+tempSecond).attr('fill','orange');
	}
	
}

function treeNodeHoverFunction(first, second, zero, className, color){

	var firstObj = {x : $('#'+first).attr('cx')*1,y : $('#'+first).attr('cy')*1};
	var secondObj = {x : $('#'+second).attr('cx')*1,y : $('#'+second).attr('cy')*1};
	var thisObj = {x : $(zero).attr('cx')*1, y : $(zero).attr('cy')*1};
	
	var yVal1, yVal12, yVal2, yVal22;
	var xVal1, xVal2;
	var plusCrossDot, minusCrossDot;
	
	yVal1 = firstObj.y - firstObj.x*plusAxis;
	yVal12 = firstObj.y - firstObj.x*minusAxis;
	
	yVal2 = secondObj.y - secondObj.x*minusAxis;
	yVal22 = secondObj.y - secondObj.x*plusAxis;
	
	plusCrossDot = {
			x : (yVal1 - minusYxis)/(minusAxis - plusAxis),
			y : minusAxis*((yVal1 - minusYxis)/(minusAxis - plusAxis))+minusYxis
	};
	
	minusCrossDot = {
			x : (yVal2 - plusYxis)/(plusAxis - minusAxis),
			y : plusAxis*((yVal2 - plusYxis)/(plusAxis - minusAxis)) + plusYxis
	};
	
	drawLine(treeInit.svg, 
			firstObj.x, firstObj.y, 
			plusCrossDot.x, plusCrossDot.y, 
			0.8, color, className);
	drawLine(treeInit.svg, 
			secondObj.x, secondObj.y, 
			minusCrossDot.x, minusCrossDot.y, 
			0.8, color, className);
	
	
	if(first != second){
		
		plusCrossDot = {
				x : (plusYxis - yVal12)/(minusAxis - plusAxis),
				y : minusAxis*(((plusYxis - yVal12)/(minusAxis - plusAxis)))+yVal12
		};
		
		minusCrossDot = {
				x : (minusYxis - yVal22)/(plusAxis - minusAxis),
				y : plusAxis*((minusYxis - yVal22)/(plusAxis - minusAxis)) + yVal22
		};
		
		drawLine(treeInit.svg, 
				firstObj.x, firstObj.y, 
				plusCrossDot.x, plusCrossDot.y, 
				0.8, color, className);
		drawLine(treeInit.svg, 
				secondObj.x, secondObj.y, 
				minusCrossDot.x, minusCrossDot.y, 
				0.8, color, className);
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
		y : 20,
		width : graphW,
		height : graphH,
		fill : 'none',
		stroke : 'none',
		id : 'matrixSvg'
	});
	
	var phaseGraphRoot = svg.append('rect').attr({
		x : padding + 30,
		y : 5,
		width : graphW,
		height : 12,
		fill : 'none',
		stroke : 'none',
		id : 'phaseSvg'
	});
	
	return {
		svg : svg,
		matrixRoot : matrixRoot,
		padding : padding,
		graphW : graphW,
		graphH : graphH,
		phaseGraphRoot : phaseGraphRoot
	}
}

function drawPhaseGraph(init, dif){
	var x = init.phaseGraphRoot.attr('x')*1;
	var y = init.phaseGraphRoot.attr('y')*1;
	var width = init.phaseGraphRoot.attr('width');
	var height = init.phaseGraphRoot.attr('height');
	
	phaseDif = {
			xDif : dif.xDif,
			yDif : height/2
	};
	drawPhaseGuideLine(init);
}

function drawPhaseGuideLine(init){
	var x = init.phaseGraphRoot.attr('x')*1;
	var y = init.phaseGraphRoot.attr('y')*1;
	var width = init.phaseGraphRoot.attr('width')*1;
	var height = init.phaseGraphRoot.attr('height')*1;
	
	var phaseList = ['SMI', 'MCI VCI','AD SVD'];
	var phaseColor = ['white','white','white'];
	
	for(var i=0; i<3; i++){
		drawLine(init.svg, 
				x, y+phaseDif.yDif*i, 
				x+rectWidth, y+phaseDif.yDif*i, 
				0.5, 'rgba(255,255,255,0.3)', 'phaseGraphGuideLine '+phaseList[i]);
		
		drawText(init.svg, 
				x-5, y+phaseDif.yDif*i-(phaseDif.yDif/3*2), 
				phaseDif.yDif, 
				phaseColor[i], 'phaseGraphText', phaseList[i])
				.attr({'text-anchor' : 'end'})
				.style({'font-size' : '7px'});
	}
	
	drawPhaseLine(init);
}

function drawPhaseLine(init){
	var order = ['first','second','third','fourth','fifth'];
	
	for(var i=0; i<personList.length; i++){
		var person = personList[i];
		var array = [];
		
		for(var j=0; j<order.length; j++){
			if(person[order[j]] != null){
				array.push(person[order[j]].dx2);
			}else{
				
			}
		}
		drawPersonGraph(changeIntegerValue(array), i);
	}
}

function drawPersonGraph(array, index){
	var x = init.phaseGraphRoot.attr('x')*1;
	var quarters = rectWidth/5;
	var gTag = init.svg.append('g').attr('id',personList[index].first.id+'NameGraph');
	var line;
	var rect = $('#'+personList[index].id).attr('x')*1;
	var topLine = $('.SMI').attr('y1')*1;
	var middleLine = $('.MCI').attr('y1');
	var bottomLine = $('.AD').attr('y1')*1;

	drawLine(gTag, 
			x+dif.xDif*(index), topLine, 
			x+dif.xDif*(index), bottomLine, 
			0.5, 'rgba(255,255,255,0.3)', 'verticalPhaseGuide');
	
	drawLine(gTag, 
			x+dif.xDif*(index)+rectWidth, topLine, 
			x+dif.xDif*(index)+rectWidth, bottomLine, 
			0.5, 'rgba(255,255,255,0.3)', 'verticalPhaseGuide');
	
	for(var i=1; i<5; i++){
		drawLine(gTag, 
				x+dif.xDif*(index)+quarters*i, topLine, 
				x+dif.xDif*(index)+quarters*i, bottomLine, 
				0.5, 'rgba(255,255,255,0.3)', 'verticalPhaseGuide');
	}
	if(index != 0){
		drawLine(gTag, 
				x+dif.xDif*(index), topLine, 
				x+dif.xDif*(index)+rectWidth, topLine, 
				0.5, 'rgba(255,255,255,0.3)', 'parallelPhaseGuide');		
		drawLine(gTag, 
				x+dif.xDif*(index), middleLine, 
				x+dif.xDif*(index)+rectWidth, middleLine, 
				0.5, 'rgba(255,255,255,0.3)', 'parallelPhaseGuide');		
		drawLine(gTag, 
				x+dif.xDif*(index), bottomLine, 
				x+dif.xDif*(index)+rectWidth, bottomLine, 
				0.5, 'rgba(255,255,255,0.3)', 'parallelPhaseGuide');		
	}
	
	
	for(var i=0; i<array.length; i++){
		//here!
		
		line = drawLine(gTag, 
				x+dif.xDif*(index) + (quarters*(i)), array[i], 
				x+dif.xDif*(index) + (quarters*(i+1)), array[i], 
				'1', 'rgba(255,255,255,0.85)', 'phase');
		if(i != array.length-1){
			drawLine(gTag, 
					x+dif.xDif*(index) + (quarters*(i+1)), array[i], 
					x+dif.xDif*(index) + (quarters*(i+1)), array[i+1], 
					'1', 'rgba(255,255,255,0.85)', 'phase');
		}
	}
}

function changeIntegerValue(array){
	var result = [];
	var back;
	
	for(var i=0; i<array.length; i++){
		
		if(array[i].search('SMI') != -1){
			back = $('.SMI').attr('y1')*1;
			result.push(back);
		}else if(array[i].search('MCI') != -1 || 
				 array[i].search('VCI') != -1){
			back = $('.MCI').attr('y1')*1;
			result.push(back);
		}else if(array[i].search('AD') != -1 ||
				 array[i].search('SVD') != -1){
			back = $('.AD').attr('y1')*1;
			result.push(back);
		}
	}
//	console.log(result);
	return result;
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
			id : personList[i].first.id+' rect',
			'class' : 'verticalOrder'+i
		});
		
		for(var j=0; j<questions.length; j++){
			var rect = drawRect(gTag,
					x+dif.xDif*i, y+dif.yDif*j, 
					dif.xDif - 3.5, dif.yDif - 1.8, 'rgba(215,235,146,1)', 
					personList[i].first.id+' rectangle '+questions[j], '');
			
			rect.on('mouseover', function(){
				var objId = $(this).parent().attr('id');
				var id = objId.split(' ')[0];
				
				var className = $('#'+id).attr('class');
				var split = className.split('And');
				var first = split[0];
				var second = (split[1].split(' '))[0];
				
				//
				$('#'+id).attr('fill','orange');
				treeNodeHoverFunction(first, second, $('#'+id), 'Hover', 'rgba(255,165,0,0.2)');
				$('#'+id+'NameGraph').find('.phase').attr('stroke','orange');

				drawRect(init.svg, 
						$(this).parent().find('.rectangle').attr('x'), 
						$(this).parent().find('.rectangle').attr('y'), 
						rectWidth, dif.yDif*questions.length, 
						'none', 'rectHoverVerticalGuide', '').attr('stroke','orange');
				
				var thisClass = $(this).attr('class');
				var qName = thisClass.split(' ')[2];
				$('text.'+qName).attr('fill','orange');
				
				drawRect(init.svg, 
						init.matrixRoot.attr('x')*1, $(this).attr('y')*1, 
						dif.xDif*personList.length-3.5, dif.yDif, 
						'none', 'rectHoverParallelGuide', '').attr('stroke','orange');
				
				split = split[1].split(' ');
				guideCircleColorChange(split[split.length-1]);
				if(first != second){
					var firstClass = $('#'+first).attr('class');
					var secondClass = $('#'+second).attr('class');
					split = firstClass.split(' ');
					guideCircleColorChange(split[split.length-1]);
					split = secondClass.split(' ');
					guideCircleColorChange(split[split.length-1]);
				}

			}).on('mouseout', function(){
//				d3.selectAll('.similarityCircle').attr('fill','rgb(53,158,131)');
				d3.selectAll('.similarityCircle').attr('fill','rgba(53,158,131,0)');
				d3.selectAll('.real').attr('fill','rgb(53,158,131)');
				var objId = $(this).parent().attr('id');
				var id = objId.split(' ')[0];
				
				$('#'+id+'NameGraph').find('.phase').attr('stroke','rgba(255,255,255,0.85)');
				var thisClass = $(this).attr('class');
				var qName = thisClass.split(' ')[2];
				$('text.'+qName).attr('fill','white');
				
				$('.Hover').remove();
				$('.rectHoverVerticalGuide').remove();
				$('.rectHoverParallelGuide').remove();
			});
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
				dif.yDif, 'white',
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
	else if(question.search('b_cga_npi') != -1){range = 4;}
	else if(question.search('g_cdr') != -1){range = 3;}
	else if(question.search('rf_his') != -1){range = 3;}
	else if(question.search('b_ksf_gds') != -1){range = 3;}
	
	for(var i=0; i<range; i++){
		drawLine(gTag, 
				x, y+dif.yDif*order + (rectHeight/range*i), 
				x+width, y+dif.yDif*order + (rectHeight/range*i), 
				0.5, 'rgba(82,86,97,1)', question+' order'+i);
	}
}

function drawPatientRectGuideLine(gTag, init, order, rect){

	var width = rect.attr('width')*1;
	var x = rect.attr('x')*1;

	var bigY = init.matrixRoot.attr('y')*1;
	var bigHeight = init.matrixRoot.attr('height')*1;
	var quarter = width/5;
	rectWidth = width;
	
	for(var i=0; i<5; i++){
		drawLine(gTag, 
				x + quarter*(i+1), bigY, 
				x + quarter*(i+1), bigY+bigHeight, 
				0.5, 'rgba(82,86,97,1)', 'verticalGuideLine order'+i);
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
					var rect;
					if(value != 0){
						rect = drawRect(gTag, 
								x + width/5*j, y+(height - value), 
								width/5, value, 
								'rgba(53,158,131,1)', 'smallRect order'+i, '');						
					}else{
						rect = drawRect(gTag, 
								x + width/5*j, y+(height - value), 
								width/5, value, 
								'rgba(215,235,146,1)', 'smallRect order'+i, '');
					}
				}else if(person[orderList[j]][questions[i]] != 9 || 
						person[orderList[j]][questions[i]] != 'NA'){
					rect = drawRect(gTag, 
							x+width/5*j, y, 
							width/5, height, 
							'rgba(49,58,66,1)', 'smallRect order'+i, '');
				}
			}else{
				rect = drawRect(gTag, 
						x+width/5*j, y, 
						width/5, height, 
						'rgba(49,58,66,1)', 'smallRect order'+i, '');
			}
			rect.on('mouseover', function(){
				var objId = $(this).parent().attr('id');
				var id = objId.split(' ')[0];
				
				var className = $('#'+id).attr('class');
				var split = className.split('And');
				var first = split[0];
				var second = (split[1].split(' '))[0];
				
				
				$('#'+id).attr('fill','orange');
				treeNodeHoverFunction(first, second, $('#'+id), 'Hover', 'rgba(255,165,0,0.2)');
				$('#'+id+'NameGraph').find('.phase').attr('stroke','orange');
				
				drawRect(init.svg, 
						$(this).parent().find('.rectangle').attr('x'), 
						$(this).parent().find('.rectangle').attr('y'), 
						rectWidth, dif.yDif*questions.length, 
						'none', 'rectHoverVerticalGuide', '').attr('stroke','orange');
				
				//가로 가이드라인!
				var thisClass = $(this).attr('class');
				var thisOrder = thisClass.split(' ')[1];
				thisOrder = thisOrder.substring('order'.length, thisOrder.length)*1;
				$('#parallelGuideLine'+thisOrder).find('text').attr('fill','orange');
				
				drawRect(init.svg, 
						init.matrixRoot.attr('x')*1, $(this).attr('y')*1, 
						dif.xDif*personList.length-3.5, dif.yDif, 
						'none', 'rectHoverParallelGuide', '').attr('stroke','orange');
				//here
				
				split = split[1].split(' ');
				guideCircleColorChange(split[split.length-1]);
				if(first != second){
					var firstClass = $('#'+first).attr('class');
					var secondClass = $('#'+second).attr('class');
					split = firstClass.split(' ');
					guideCircleColorChange(split[split.length-1]);
					split = secondClass.split(' ');
					guideCircleColorChange(split[split.length-1]);
				}

			}).on('mouseout', function(){
				d3.selectAll('.similarityCircle').attr('fill','rgba(53,158,131,0)');
				d3.selectAll('.real').attr('fill','rgb(53,158,131)');
				var objId = $(this).parent().attr('id');
				var id = objId.split(' ')[0];
				
				$('#'+id+'NameGraph').find('.phase').attr('stroke','rgba(255,255,255,0.85)');
				
				var thisClass = $(this).attr('class');
				var thisOrder = thisClass.split(' ')[1];
				thisOrder = thisOrder.substring('order'.length, thisOrder.length)*1;
				$('#parallelGuideLine'+thisOrder).find('text').attr('fill','white');
				
				$('.rectHoverVerticalGuide').remove();
				$('.rectHoverParallelGuide').remove();
				$('.Hover').remove();
			});
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

$('#buttonList').change(function(){
	var thisObj = $(this).find(':selected');
	var rect = $('#matrixArea > svg > matrixSvg');
	$('#matrixArea > svg').fadeOut('slow',function(){
		$('#matrixArea > svg').empty();
		
		questions = questionsList[thisObj.val()];
		
		init.svg.append('rect').attr({
			x : init.padding + 30,
			y : 20,
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
	    	drawPhaseGraph(init, dif);
	    	d3.selectAll('.verticalGuideLine').moveToFront();
	    	$('#matrixArea > svg').fadeIn('slow',function(){
	    		
	    	});
	});
	
	
});
