var questions = ['a_barthel_3','a_barthel_8','a_barthel_10','a_siadl_p9','km_o_t_5',
                 'km_o_p_2','km_o_p_4','a_siadl_p2','a_siadl_c6','a_siadl_p6',
                 'km_o_t_2','km_o_t_4','q_kdsq_14','q_kdsq_15','a_siadl_c2',
                 'a_siadl_c7','km_o_t_1','km_o_t_3','km_o_p_5','q_kdsq_13',
                 'a_siadl_c3','a_siadl_p3','a_siadl_p4','a_siadl_p5','a_siadl_p13',
                 'a_siadl_p14','a_siadl_c1','a_siadl_c8','a_siadl_p8','a_siadl_c13',
                 'a_siadl_c14','a_siadl_c15','a_siadl_p15'];

var better = ['a_barthel_3','a_barthel_8', 'a_barthel_10', 'a_siadl_p9', 'km_o_t_5',
              'km_o_p_2', 'km_o_p_4', 'a_siadl_p2', 'a_siadl_c6', 'a_siadl_p6',
              'km_o_t_2', 'km_o_t_4', 'q_kdsq_14', 'q_kdsq_15', 'a_siadl_c2',
              'a_siadl_c7', 'km_o_t_1', 'km_o_t_3', 'km_o_p_5', 'q_kdsq_13',
              'a_siadl_c3', 'a_siadl_p3', 'a_siadl_p4', 'a_siadl_p13']

var betterWorse = ['a_barthel_3', 'a_barthel_8', 'a_barthel_10', 'a_siadl_p9', 'km_o_t_5',
                   'km_o_p_2', 'km_o_p_4', 'a_siadl_p2', 'a_siadl_c6', 'a_siadl_p6',
                   'km_o_t_2', 'km_o_t_4', 'q_kdsq_14', 'q_kdsq_15', 'a_siadl_c2',
                   'a_siadl_c7', 'km_o_t_1', 'km_o_t_3', 'km_o_p_5', 'q_kdsq_13',
                   'a_siadl_c3', 'a_siadl_p3', 'a_siadl_p4', 'a_siadl_p5', 'a_siadl_p13',
                   'a_siadl_p14', 'a_siadl_c1', 'a_siadl_c8', 'a_siadl_p8', 'a_siadl_c13',
                   'a_siadl_c15', 'a_siadl_p15'];

var maintain = ['a_barthel_3', 'a_barthel_8', 'a_barthel_10', 'a_siadl_p9', 'km_o_t_5',
                'km_o_p_2', 'km_o_p_4', 'a_siadl_p2', 'a_siadl_c6', 'a_siadl_p6',
                'km_o_t_2', 'km_o_t_4', 'q_kdsq_15'];

var worse = ['a_barthel_3', 'a_barthel_8', 'a_barthel_10', 'a_siadl_p9', 'km_o_t_5',
             'km_o_p_2', 'km_o_p_4'];

var worseBetter = ['a_barthel_3', 'a_barthel_8', 'a_barthel_10', 'a_siadl_p9', 'km_o_t_5',
                   'km_o_p_2', 'km_o_p_4', 'a_siadl_p2', 'a_siadl_c6', 'a_siadl_p6',
                   'km_o_t_2', 'km_o_t_4', 'q_kdsq_14', 'a_siadl_c2', 'a_siadl_c7',
                   'km_o_t_1', 'km_o_t_3', 'km_o_p_5', 'a_siadl_p5', 'a_siadl_p14',
                   'a_siadl_c14'];

var init = init();
var initParallel;
var dif;
var nameList;
var fullData;
var description;
var personList = [];
var nameGraphGuideLineList = [];

$('#resetButton').css({
	left : $('#content').width() - $('#resetButton').width()-30
});

async.waterfall([
    function(cb){
    	ajaxCall('./getPatientName', init, dif, function(data){
    		nameList = data;
    		
    		cb(null, data);
    	});
    },
    
    function(nameList, cb){
    	ajaxCall('./getCredosData2',init, dif, function(data){
	    	var yDif = dif.yDif;
	    	var xDif = dif.xDif;
	    	
	    	for(var i=0; i<data.length; i+=4){
			
	    		personList.push({
					first : data[i],
					second : data[i+1],
					third : data[i+2],
					fourth : data[i+3]
			});
		}
	    	var gTagList = [];
	    
		    for(var i=0; i<nameList.length; i++){
		   		var gTag = init.svg.append('g').attr({
		   			'id' : 'row'+i
		   		});
		   		gTagList.push(gTag);
		   		
		   		
		   		if(i<12) gTag.attr('class','rOrder'+i+' Better');
		   		else if(i<18) gTag.attr('class','rOrder'+i+' BetterWorse');
		   		else if(i<36) gTag.attr('class','rOrder'+i+' Maintain');
		   		else if(i<54) gTag.attr('class','rOrder'+i+' Worse');
		   		else gTag.attr('class','rOrder'+i+' WorseBetter');
//		   		console.log(nameList);
		   		//console.log(personList);
		   		
		   		//수정해야함
//			    addPatientName(gTag, nameList[i], personList, init, yDif, i, i, 'first', 1, true);
//			    addPatientName(gTag, nameList[i], personList, init, yDif, i,i, 'second', 2,  false);
//			    addPatientName(gTag, nameList[i], personList, init, yDif, i, i, 'third', 3, false);
//			    addPatientName(gTag, nameList[i], personList, init, yDif, i, i, 'fourth', 4, false);
		    }
//		    console.log(gTag)
//		    console.log(personList);
		    addPatient(gTagList, personList, init, yDif, xDif, nameList);
		    drawGuideLine(init, data, dif);
		    drawCell(init, personList, dif, questions);
		    cb(null);
    	});
    },
    
    function(cb){
    	ajaxCall('./getDescription', init, dif, function(data){
    		description = data;
			cb(null);   
    	});
    },
    
    function(cb){
    	initParallel = initParallel();
    	drawPrallelGuideLine(initParallel);
    	cb(null);
    },
    
    function(cb){
    	drawCircle(init.svg, 
    			10, 10, 
    			dif.yDif/4/2, 'rgb(46,119,73)', 'sample');
    	drawText(init.svg,
    			10+dif.yDif/4/2+3, 10, 
    			dif.yDif/4/2/2, 
    			'rgb(46,119,73)', 'sample', 'GoodValue').style('font-size',10);
    	
    	drawCircle(init.svg, 
    			10, 10+dif.yDif/4+3, 
    			dif.yDif/4/2, 'rgb(215,155,43)', 'sample');
    	drawText(init.svg, 
    			10+dif.yDif/4/2+3, 10+dif.yDif/4+3, 
    			dif.yDif/4/2/2, 'rgb(215,155,43)', 'sample', 'NeutralValue').style('font-size',10);

    	drawCircle(init.svg, 
    			10, 10+dif.yDif/2+6, 
    			dif.yDif/4/2, 'rgb(227,90,60)', 'sample');
    	drawText(init.svg, 
    			10+dif.yDif/4/2+3, 10+dif.yDif/2+8, 
    			dif.yDif/4/2/2, 'rgb(227,90,60)', 'sample', 'BadValue').style('font-size',10);
    	
    	//drawLine(root, x1, y1, x2, y2, strokeWidth, stroke, addClass)
    	
    	drawRect(initParallel.svg, 
    			10, 10, 10, 10, 'skyblue', 'sample', '');
    	drawText(initParallel.svg, 
    			30, 10, 10, 'skyblue', 'sample', '1회차').style('font-size',10);

    	drawRect(initParallel.svg, 
    			10, 30, 10, 10, 'green', 'sample', '');
    	drawText(initParallel.svg, 
    			30, 30, 10, 'green', 'sample', '2회차').style('font-size',10);
    	
    	drawRect(initParallel.svg, 
    			10, 50, 10, 10, 'rgba(239,155,15,1)', 'sample', '');
    	drawText(initParallel.svg, 
    			30, 50, 10, 'rgba(239,155,15,1)', 'sample', '3회차').style('font-size',10);
    	
    	drawRect(initParallel.svg, 
    			10, 70, 10, 10, 'red', 'sample', '');
    	drawText(initParallel.svg, 
    			30, 70, 10, 'red', 'sample', '4회차').style('font-size',10);
    	
    	cb(null);
    },
    
    function(cb){
    	
    	for(var i=0; i<better.length; i++){
    		$('g.Better').find('circle.'+better[i]).css('opacity',0.8);
    	}
    	
    	for(var i=0; i<betterWorse.length; i++){
    		$('g.BetterWorse').find('circle.'+betterWorse[i]).css('opacity',0.8);
    	}
    	
    	for(var i=0; i<maintain.length; i++){
    		$('g.Maintain').find('circle.'+maintain[i]).css('opacity',0.8);
    	}
    	
    	for(var i=0; i<worse.length; i++){
    		$('g.Worse').find('circle.'+worse[i]).css('opacity',0.8);
    	}
    	
    	for(var i=0; i<worseBetter.length; i++){
    		$('g.WorseBetter').find('circle.'+worseBetter[i]).css('opacity',0.8);
    	}
    	cb(null, 'done');
    }
    ], 
    function(err, result){
		console.log(result);
});

function addPatient(gTag, personList, init, yDif, xDif, nameList){
	var guideText = ['SVD&AD', 'MCI&VCI', 'SMI'];
	var colorArray = ['rgb(46,119,73)', 'rgb(215,155,43)', 'rgb(227,90,60)']
	//요기요기
	var dif = init.nameGraph.attr('height')*1;
	var nameYDif = init.nameGraph.attr('y')*1;
	for(var i=0; i<=2; i++){
		drawLine(init.svg, 
				init.nameGraph.attr('x')*1-20, dif/3*i+ nameYDif + dif/4, 
				init.nameGraph.attr('x')*1+init.nameGraph.attr('width')*1, dif/3*i+nameYDif + dif/4,
				0.2, 'rgba(0,0,0,0.4)', 'nameGraphGuideLine '+guideText[2-i]);
		nameGraphGuideLineList.push(dif/3*i+ nameYDif + dif/4);
		drawText(init.svg, 
				init.nameGraph.attr('x')*1-25, dif/3*i+nameYDif, 
				init.nameGraph.attr('height')*1/3, colorArray[i], 'nameGraphGuideText', guideText[2-i]).style({
					'font-size' : '5px',
					'text-anchor' : 'end'
				});
	}
		
	var array = [];
	
	for(var i=0; i<personList.length; i++){
		var group = personList[i].first.pGroup;
		array.push(personList[i].first.dx);
		array.push(personList[i].second.dx);
		array.push(personList[i].third.dx);
		array.push(personList[i].fourth.dx);
		
		drawNameGraph(array, init, i, yDif, xDif, init.nameGraph, gTag[i], nameList[i]+'graph', nameList[i]);
		
//		if(nullCount == 0){
//			var graph = drawGraph(gTag[i], changeNameGraphToData(array, init.nameGraph, i, yDif, xDif, init.nameGraph), 
//					nameList[i]+'graph', 'rgba(0,0,0,1)', 1, 'linear');
//			graph.attr({
//				'id': nameList[i],
//				'order' : i
//			});
//		}else{
//			
//		}
		array = [];
	}	
}

function drawNameGraph(array, init, order, yDif, xDif, nameGraph, gTag, className, id){
	var backPos;
	var xQuarter = yDif/4;
	var yQuarter = xDif/3;
	var value = 0;
	var plag = false;
	var width = nameGraph.attr('width')*1;
	var height = nameGraph.attr('height')*1;
	var y = nameGraph.attr('y')*1;
	var x = nameGraph.attr('x')*1;
	
	for(var i=0; i<array.length-1; i++){
		if(array[i] != '#N/A' && array[i+1] != '#N/A'){
			var graph = drawLine(gTag, 
					x + yDif*order + xQuarter*i, changePhaseToValue(array[i]), 
					x + yDif*order + xQuarter*(i+1), changePhaseToValue(array[i+1]), 
					1, 'rgba(0,0,0,1)', className+' mouseOverChange');
			if(!plag){
				plag = true;
				var beforeClass = graph.attr('class');
				graph.attr({
					id : id,
					order : order,
					'class' : beforeClass + ' nameFirst'
				});
				backPos = changePhaseToValue(array[i+1]);
			}
		}else{
			var graph;
			if(array[i] == '#N/A' && array[i+1] == '#N/A'){
				graph = drawLine(gTag,
						x + yDif*order + xQuarter*i , backPos, 
						x + yDif*order + xQuarter*(i+1), backPos, 
						1, 'rgba(0,0,0,0.3)', className+' mouseOverChange'+' opacityDown');
				backPos = graph.attr('y1')*1;
			}else if(array[i] == '#N/A' && array[i+1] != '#N/A'){
				graph = drawLine(gTag,
						x + yDif*order + xQuarter*i , backPos, 
						x + yDif*order + xQuarter*(i+1), changePhaseToValue(array[i+1]), 
						1, 'black', className+' mouseOverChange');
				backPos = changePhaseToValue(array[i+1]);
			}else if(array[i+1] == '#N/A'){
				graph = drawLine(gTag,
						x + yDif*order + xQuarter*i , changePhaseToValue(array[i]), 
						x + yDif*order + xQuarter*(i+1), changePhaseToValue(array[i]), 
						1, 'rgba(0,0,0,0.3)', className+' mouseOverChange'+' opacityDown');
				backPos = changePhaseToValue(array[i]);
			}
			
			if(!plag){
				plag = true;
				var beforeClass = graph.attr('class');
				graph.attr({
					id : id,
					order : order,
					'class' : beforeClass + ' nameFirst'
				});
			}
		}
	}
//	for(var i=0; i<array.length; i++){
//		if(array[i] != '#N/A'){
//			if(array[i] == 'SMI'){value = 3;}
//			else if(array[i] == 'MCI' || array[i] == 'VCI'){value = 2;}
//			else if(array[i] == 'SVD' || array[i] == 'AD'){value = 1;}
//			drawLine(gTag, yDif*order + xQuarter*i, y1, x2, y2, strokeWidth, stroke, addClass)
//		}else{
//			
//		}
//	}
}

function changePhaseToValue(phase){
	if(phase == 'MCI' || phase == 'VCI'){
		return nameGraphGuideLineList[1];
	}else if(phase == 'SMI'){
		return nameGraphGuideLineList[0];
	}else if(phase == 'SVD' || phase == 'AD'){
		return nameGraphGuideLineList[2];
	}
}

function changeNameGraphToData(array, init, order, yDif, xDif, nameGraph){
	var innerArray = [];
	var height = nameGraph.attr('height')*1;
	var width = nameGraph.attr('width')*1;
	var xQuarter = yDif/3-1;
	var yQuarter = height/4;
	var index = 0;

	var value;
	
	for(var i=0; i<array.length; i++){
		
		if(array[i] == 'MCI' || array[i] == 'VCI'){value = 2;}
		else if(array[i] == 'SMI'){value = 3;}
		else if(array[i] == 'SVD' || array[i] == 'AD'){value = 1;}
		else if(array[i] == '#N/A'){value = 0;}
		
		innerArray.push({
			x : yDif*order + xQuarter*index + nameGraph.attr('x')*1,
			y : height-(value*yQuarter) + nameGraph.attr('y')*1
		});
		index++;
	}
	return innerArray;
}

//function addPatientName(gTag, nameList, personList, init, yDif, index, pIndex, testName, nIndex, plag){
//	var textValue;
//	var interval = yDif/4;
//	textValue = drawText(gTag, 
//    		0, 0, 0, 
////    		'rgba(255,255,255,0.8)', nameList+' text vertical','');
//    		'rgba(0,0,0,0.8)', nameList+' text vertical','');
//    textValue.attr({
//   				'text-anchor' : 'start',
//   				transform : 'translate('+(init.padding+yDif*index+(interval*nIndex))+','+(init.padding-5)+') rotate(-90)',
//   				id : nameList
//			});
//    
//	if(plag){
//		textValue.on('click', function(){
//			textClick(personList[pIndex], $(this));
//		}).html(personList[pIndex][testName].dx+'_patient'+index);
//	}else{
//		textValue.on('click', function(){
//			textClick(personList[pIndex],$(this));
//		}).html(personList[pIndex][testName].dx);
//	}
//}

function textClick(personList, thisValue){
	
	var id = thisValue.attr('id');
	console.log('id->'+id);
	var order = $('#'+id).parent().attr('class').replace('rOrder','');
	
	var obj = personList;
	console.log(personList);
//	thisValue.parent().find('circle');
	var $thisCircle = thisValue.parent().find('circle');
//	console.log(thisValue.parent().html());
	if ($thisCircle.attr('class').search(' select') == -1) {
		var className;

		$thisCircle.each(function() {
			className = $(this).attr('class') + ' select';
			$(this).attr('class', className);
		});
		
		$thisCircle.attr({
//			'stroke' :  'white',
			'stroke' :  'rgba(0,0,0,1)',
			'stroke-width' : 1
		});

		//$('circle:not(.select)').css('opacity', 0.4);
	} else {
		var className;

		$thisCircle.each(function() {
			className = $(this).attr('class').replace(' select', '');
			$(this).attr('class', className);
		});
		
		$thisCircle.attr({
			'stroke' : 'none',
			'stroke-width' : 0
		});
	}

	drawParallelGraph(obj);
	
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

//draw parallel area
function initParallel(){
	var width = $('#parallelDiv').width();
	var height = $('#parallelDiv').height();
	var padding = 5;
	var graphW = width - 100;
	var graphH = height - (40);
	
	var svg = d3.select('#parallelDiv').append('svg').attr({
		width : width,
		height : height,
		class : 'parallelSvg'
	});
	
	var root = d3.select('.parallelSvg').append('rect').attr({
		x : 80,
		y : padding,
		width : graphW,
		height : graphH/3*2,
		fill : 'none',
		class : 'parallelRect'
		//stroke : 'rgba(255,255,255,0.8)'
	});
	
	return{
		svg : svg,
		rootSvg : root,
		padding : padding,
		graphW : graphW,
		graphH : graphH
	}
}


function drawPrallelGuideLine(init){
	
	var x = $('.parallelRect').attr('x')*1;
	var y = $('.parallelRect').attr('y')*1;
	var parallelRectHeight = $('.parallelRect').attr('height')*1;
	
	drawLine(init.svg,
			x, parallelRectHeight, 
			x+init.graphW, parallelRectHeight, 
//			1.2, 'white', 'initParallelGuide');
			1.2, 'rgba(0,0,0,1)', 'initParallelGuide');
	
	var interval = init.graphW/(questions.length-1);
	
	for(var i=0; i<questions.length; i++){
		drawLine(init.svg,
				x+(interval*i), y, 
				x+(interval*i), parallelRectHeight, 
//				0.8, 'rgba(255,255,255,0.6)', 'parallel'+questions[i]);
				0.8, 'rgba(0,0,0,0.6)', 'parallel'+questions[i]);
		
		drawText(init.svg, 
				0, 0, 
//				0, 'white', 'parallelText '+questions[i], questions[i]).attr({
				0, 'rgba(0,0,0,1)', 'parallelText '+questions[i], questions[i]).attr({
					'text-anchor' : 'end',
					transform : 'translate('+(x+(interval*i))+', '+(parallelRectHeight+parallelRectHeight/3+10)+') rotate(-45)'
				});
		
		drawParallelValueLine(questions[i], x+(interval*i), parallelRectHeight);
	}
	
	drawLine(init.svg, 
			x, parallelRectHeight+parallelRectHeight/3*1, 
			x+init.graphW, parallelRectHeight+parallelRectHeight/3*1, 
			0.8, 'gray', 'nullValue');
	
	drawText(init.svg, 
			x-20, parallelRectHeight+parallelRectHeight/3*1, 
			0, 'gray', 'nullValueText', 'null').style('font-size',8);
}

function drawParallelValueLine(question, interval, y){
	var index;
	var height = initParallel.graphH;
	
	if(question.search('km_o') != -1){index = 1;}
	else if(question.search('a_siadl') != -1){index = 3;}
	else if(question.search('q_kdsq') != -1 || question.search('a_barthel') != -1){index = 2;}
	
	drawLine(initParallel.svg, 
			interval-5, 5, 
			interval, 5, 
//			0.5, 'white', question+'Guide'+i);
			0.5, 'rgba(0,0,0,1)', question+'Guide'+i);
	
	drawText(initParallel.svg,
			interval-8, 9, 
//			4, 'white', 'guideValue', index).style('font-size','5px');
			4, 'rgba(0,0,0,1)', 'guideValue', index).style('font-size','5px');
	
	
	for(var i=0; i<index-1; i++){
		drawLine(initParallel.svg, 
				interval-5, 5+y/index*(i+1), 
				interval, 5+y/index*(i+1), 
//				0.5, 'white', question+'Guide'+i);
				0.5, 'rgba(0,0,0,1)', question+'Guide'+i);
		
		drawText(initParallel.svg,
				interval-8, 5+y/index*(i+1)-4, 
//				4, 'white', 'guideValue', index-i-1).style('font-size','5px');
				4, 'rgba(0,0,0,1)', 'guideValue', index-i-1).style('font-size','5px');
	}
}

function drawParallelGraph(person){
	$('.graph').remove();
	var first = [];
	var second = [];
	var third = [];
	var fourth = [];
	
	var num = ['first','second','third','fourth'];
	
	
	for(var j=0; j<questions.length; j++){
		makeLineData(first, questions[j], person.first[questions[j]], j);
		makeLineData(second, questions[j], person.second[questions[j]], j);
		makeLineData(third, questions[j], person.third[questions[j]], j);
		makeLineData(fourth, questions[j], person.fourth[questions[j]], j);			
	}

	drawGraph(initParallel.svg, first, 'graph','skyblue',8).style('opacity',0.7);
	drawGraph(initParallel.svg, second, 'graph','green',5).style('opacity',0.7);
	drawGraph(initParallel.svg, third, 'graph','rgba(239,155,15,1)',3).style('opacity',0.7);
	drawGraph(initParallel.svg, fourth, 'graph','red',1).style('opacity',0.7);
	
}

function makeLineData(obj, testName, score, order){
	
	var index;
	
	if(testName.search('km_o') != -1){index = 1;}
	else if(testName.search('a_siadl') != -1){index = 3;}
	else if(testName.search('q_kdsq') != -1 || testName.search('a_barthel') != -1){index = 2;}
	
	var height = $('.parallelRect').attr('height')*1;
	var interval = initParallel.graphW/questions.length;
	var x = $('.parallel'+testName).attr('x1')*1;
	var y = $('.parallelRect').attr('y')*1;
	var temp = score;
	var yValue;

	if(score == 9) yValue = height+height/3*1;
	else if(score == 0) yValue = height;
	else yValue = (height+5-height/index*score);

	obj.push({
		x : x,
		y : yValue
	});
	
}


//draw matrix area
function init(){
	var width = $('#content').width();
	var height = $('#content').height() - 60;
	var padding = 80;
	var graphW = width - (100);
	var graphH = height - (padding);
	
	var yDif = graphW/59;
	var xDif = graphH/questions.length;
	dif = {
		xDif : xDif,
		yDif : yDif
	};
	
	var svg = d3.select('#content').append('svg').attr({
		width : width,
		height : height
	});

	var root = svg.append('rect').attr({
		x : padding,
		y : padding,
		width : graphW,
		height : graphH,
		fill : 'none',
//		stroke : 'rgba(255,255,255,0.8)'
		stroke : 'rgba(0,0,0,0.8)'
		//fill : 'none'
	}).style('z-index',100);
	
	var nameGraph = svg.append('rect').attr({
		x : padding,
		y : padding-(padding/4)-5,
		width : graphW,
		height : padding/4,
		fill : 'none',
		stroke : 'none'
	});
	
	return{
		svg : svg,
		rootSvg : root,
		padding : padding,
		graphW : graphW,
		graphH : graphH,
		nameGraph : nameGraph
	}
}

function drawGuideLine(init, data, dif){
	
	var yDif = dif.yDif;
	var xDif = dif.xDif;
	
	for(var i=0; i<questions.length; i++){
		var gTag = init.svg.append('g').attr({
			'id' : 'column'+i,
			'class' : 'pOrder'+i
		});
		
		drawLine(gTag, 
				init.padding, xDif*i+init.padding, 
				init.graphW+init.padding, xDif*i+init.padding, 
//				0.5, 'rgba(255,255,255,0.8)', 'parallel'+i);
				0.5, 'rgba(0,0,0,0.8)', 'parallel'+i);
		drawText(gTag, 
				init.padding-5, xDif*i+init.padding, xDif,
//				'rgba(255,255,255,0.8)', questions[i]+' text', questions[i])
				'rgba(0,0,0,0.8)', questions[i]+' text', questions[i])
				.attr({
					'text-anchor':'end',
					id : questions[i]
				}).on('mouseover', function(){
					var x = $(this).attr('x')*1+xDif;
					var y = $(this).attr('y')*1;
					var question = $(this).html();
					
					$('#hoverDiv').html(getDescription(question));
					$('#hoverDiv').css({
						top : y,
						left : x
					}).show();
				}).on('mouseout', function(){
					$('#hoverDiv').hide();
				});
		
		drawLine(init.svg, 
				init.padding, init.padding+init.graphH+xDif, 
				init.padding+yDif*12-5, init.padding+init.graphH+xDif, 
				2, 'rgba(96,193,233,1)', 'betterGroup');
				
		drawText(init.svg, 
				(init.padding+init.padding+yDif*12-5)/2-10, init.padding+init.graphH+xDif, 
				20, 'rgba(96,193,233,1)', 'betterText', 'Better');
		
		drawLine(init.svg, 
				init.padding+yDif*12+5, init.padding+init.graphH+xDif, 
				init.padding+yDif*18-5, init.padding+init.graphH+xDif, 
				2, 'rgba(251,181,50,1)', 'betterWorseGroup');
		drawText(init.svg, 
				(init.padding+yDif*12+5+init.padding+yDif*18-5)/2-40, init.padding+init.graphH+xDif, 
				20, 'rgba(251,181,50,1)', 'betterworseText', 'BetterWorse');
		
		drawLine(init.svg, 
				init.padding+yDif*18+5, init.padding+init.graphH+xDif, 
				init.padding+yDif*36-5, init.padding+init.graphH+xDif, 
				2, 'rgba(46,119,73,1)', 'maintainGroup');
		drawText(init.svg, 
				(init.padding+yDif*18+5+init.padding+yDif*36-5)/2-35, init.padding+init.graphH+xDif, 
				20, 'rgba(46,119,73,1)', 'maintainText', 'Maintain');
		
		drawLine(init.svg, 
				init.padding+yDif*36+5, init.padding+init.graphH+xDif, 
				init.padding+yDif*56-5, init.padding+init.graphH+xDif, 
				2, 'rgba(227,90,60,1)', 'worseGroup');
		drawText(init.svg, 
				(init.padding+yDif*36+5+init.padding+yDif*56-5)/2-15, init.padding+init.graphH+xDif, 
				20, 'rgba(227,90,60,1)', 'worseText', 'Worse');

		drawLine(init.svg, 
				init.padding+yDif*56+5, init.padding+init.graphH+xDif, 
				init.padding+yDif*59-5, init.padding+init.graphH+xDif, 
				2, 'rgba(248,121,49,1)', 'worsebtterGroup');
		drawText(init.svg, 
				init.padding+yDif*56, init.padding+init.graphH+xDif, 
				20, 'rgba(248,121,49,1)', 'worsebetterText', 'WorseBetter');
	}
	
	for(var i=0; i<59; i++){
		var gTag = d3.select('#row'+i); 

//		var color = ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.7)'];
		var color = ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)'];
		var index = 0;
		var firstY = init.padding;
		var lastY = init.padding+init.graphH;
		var strokeWidth = 1;
		
		if(i==12 || i==18 || i==36 || i==56 || i==59){
			lastY += 20;
			strokeWidth +=2;
			index = 1;
		}
		
		drawLine(gTag,
				yDif*i+init.padding, firstY,
				yDif*i+init.padding, lastY,
				strokeWidth, color[index],'vertical'+i);
		
	}
	return {
		xDif : xDif,
		yDif : yDif
	}
}

function getDescription(question){
	for(var i=0; i<description.length; i++){
		if(description[i].question == question){
			return description[i].description;
		}
	}
}

function drawCell(init, nameList, dif, questions){
	
	var rectX = init.rootSvg.attr('x')*1;
	var rectY = init.rootSvg.attr('y')*1;
	var xDif = dif.xDif;
	var yDif = dif.yDif;
	var color = ['rgba(96,193,233,1)', 'rgba(251,181,50,1)', 'rgba(46,119,73,1)',
	             'rgba(227,90,60,1)', 'rgba(248,121,49,1)'];
	
	
	for(var i=0; i<nameList.length; i++){
		var tagId = '#'+$('#'+nameList[i].first.name).parent().attr('id');
		var gTag = d3.select(tagId);
	}
	
	for(var i=0; i<nameList.length; i++){
		var tagId = '#'+$('#'+nameList[i].first.name).parent().attr('id');
		var gTag = d3.select(tagId);
		var x = $('#'+nameList[i].first.name).parent().find('line').attr('x1')*1;
		
		for(var j=0; j<questions.length; j++){
			var y = $('#'+questions[j]).parent().find('line').attr('y1')*1
			//console.log(y);
			drawSmallCell(gTag, nameList[i], x+1.5/2, y, dif, color, questions[j]);			
		}
	}
	
	return nameList;
}

function drawSmallCell(root, eachTest,x, y, dif, color, testName){
	
	var interval = (dif.yDif-3.5)/4;
	var name = eachTest.first.name;
	var num = ['first','second','third','fourth'];
	var index;

	if(eachTest.first.pGroup == 'better'){
		index = 0;
	}else if(eachTest.first.pGroup == 'betterworse'){
		index = 1;
	}else if(eachTest.first.pGroup == 'maintain'){
		index = 2;
	}else if(eachTest.first.pGroup == 'worse'){
		index = 3;
	}else if(eachTest.first.pGroup == 'worsebetter'){
		index = 4;
	}
	
	for(var i=0; i<4; i++){
//		if(eachTest[num[i]][testName] != 9){
//			drawCircle(root, 
//					x+interval*i+(interval/2)+1, y+(dif.xDif/2), 
//					interval/2, choiceColor(eachTest[num[i]][testName], color,testName), testName+' '+eachTest.first.name)
//					.style('opacity','0.3')
//					.on('mouseover', function(){
//						
//						var order = $(this).parent().attr('class');
//						order = order.split(' ');
//						order = order[0].substring('rOrder'.length, order[0].length)*1;
//						
//						//order = order.substring('rOrder'.length, order.length)*1;
//						
//						var test = $(this).attr('class').split(' ')[0];
//						var pOrder = $('#'+test).parent().attr('class');
//						pOrder = pOrder.substring('pOrder'.length, pOrder.length)*1;
//						
//						$(this).parent().find('text').attr('fill','red');
//						d3.select('#'+test).attr('fill','red');
//						drawRect(init.svg, 
//								init.padding+(dif.yDif*order), init.padding, 
////								dif.yDif, init.graphH, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','white');
//								dif.yDif, init.graphH, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','rgba(0,0,0,0.8)');
//						
//						drawRect(init.svg, 
//								init.padding, init.padding+(dif.xDif*pOrder), 
////								init.graphW, dif.xDif, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','white');
//								init.graphW, dif.xDif, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','rgba(0,0,0,0.8)');
//						
//					}).on('mouseout', function(){
//						var order = $(this).parent().attr('class');
//						order = order.substring('rOrder'.length, order.length)*1;
//						
//						var test = $(this).attr('class').split(' ')[0];
//						var pOrder = $('#'+test).parent().attr('class');
//						pOrder = pOrder.substring('pOrder'.length, pOrder.length)*1;
//						
//						
////						d3.select('#'+test).attr('fill','rgba(255,255,255,0.8)');
//						d3.select('#'+test).attr('fill','rgba(0,0,0,0.8)');
//						$(this).parent().find('text').attr('fill','rgba(0,0,0,0.8)');
//						$('.gGuide').remove();
//					});
//		}
			drawCircle(root, 
					x+interval*i+(interval/2)+1, y+(dif.xDif/2), 
					interval/2, choiceColor(eachTest[num[i]][testName], color,testName), testName+' '+eachTest.first.name)
					.style('opacity','0.3')
					.on('mouseover', function(){
						
						var order = $(this).parent().attr('class');
						order = order.split(' ');
						order = order[0].substring('rOrder'.length, order[0].length)*1;
						
						//order = order.substring('rOrder'.length, order.length)*1;
						
						var test = $(this).attr('class').split(' ')[0];
						var pOrder = $('#'+test).parent().attr('class');
						pOrder = pOrder.substring('pOrder'.length, pOrder.length)*1;
						
//						$(this).parent().find('text').attr('fill','red');
						$(this).parent().find('.mouseOverChange').attr('stroke','red');
						$(this).parent().find('.opacityDown').attr('stroke','rgba(255,0,0,0.3)');
						d3.select('#'+test).attr('fill','red');
						drawRect(init.svg, 
								init.padding+(dif.yDif*order), init.padding, 
//								dif.yDif, init.graphH, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','white');
								dif.yDif, init.graphH, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','rgba(0,0,0,0.8)');
						
						drawRect(init.svg, 
								init.padding, init.padding+(dif.xDif*pOrder), 
//								init.graphW, dif.xDif, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','white');
								init.graphW, dif.xDif, 'none', 'gGuide', '').attr('stroke-width',2).attr('stroke','rgba(0,0,0,0.8)');
						
					}).on('mouseout', function(){
						var order = $(this).parent().attr('class');
						order = order.substring('rOrder'.length, order.length)*1;
						
						var test = $(this).attr('class').split(' ')[0];
						var pOrder = $('#'+test).parent().attr('class');
						pOrder = pOrder.substring('pOrder'.length, pOrder.length)*1;
						
						
//						d3.select('#'+test).attr('fill','rgba(255,255,255,0.8)');
						d3.select('#'+test).attr('fill','rgba(0,0,0,0.8)');
//						$(this).parent().find('text').attr('fill','rgba(0,0,0,0.8)');
						$(this).parent().find('.mouseOverChange').attr('stroke','rgba(0,0,0,1)');
						$(this).parent().find('.opacityDown').attr('stroke', 'rgba(0,0,0,0.3)');
						$('.gGuide').remove();
					}).on('click', function(){
						var order = $(this).parent().find('.nameFirst').attr('order')*1;
						console.log(order);
						textClick(personList[order], $(this).parent().find('.nameFirst'));
					});
	}
}



function getYposition(score, yDif, testName){
	return yDif+(yDif-getHeight(score, yDif, testName));
}

function getHeight(score, yDif, testName){
	var interval;
	if(testName.search('km_o') != -1){
		interval = yDif;
	}else if(testName.search('a_siadl') != -1){
		interval = yDif/3;
	}else if(testName.search('q_kdsq') != -1){
		interval = yDif/2;
	}else if(testName.search('a_barthel') != -1){
		interval = yDif/2;
	}
	
	if(score == 0){return 0;}
	else if(score != 9){return interval*score;}
	else if(score == 9) return yDif;	
}

function choiceColor(score, color, testName){
	if(testName.search('km_o') != -1){
		switch(score){
			case 0 : return color[3]; break;
			case 1 : return color[2]; break;
//			default : return 'rgba(255,255,255,0.8)'; break;
			default : return 'rgba(0,0,0,0.8)'; break;
		}
	}else if(testName.search('a_siadl') != -1){
		switch(score){
			case 0 :  return color[2]; break;
			case 1 : return color[1]; break;
			case 2 : return color[1]; break;
			case 3 : return color[3]; break;
//			default : return 'rgba(255,255,255,0.8)'; break;
			default : return 'rgba(0,0,0,0.8)'; break;
		}
	}else if(testName.search('q_kdsq') != -1){
		switch(score){
			case 0 : return color[3]; break;
			case 1 : return color[1]; break;
			case 2 : return color[2]; break;
//			default : return 'rgba(255,255,255,0.8)'; break;
			default : return 'rgba(0,0,0,0.8)'; break;
		}
	}else if(testName.search('a_barthel') != -1){
		switch(score){
			case 0 : return color[3]; break;
			case 1 : return color[1]; break;
			case 2 : return color[2]; break;
//			default : return 'rgba(255,255,255,0.8)'; break;
			default : return 'rgba(0,0,0,0.8)'; break;
		}
	}
}


function resetClick(){
	var $circles = $('circle');
	$circles.attr({
		'stroke' : 'none',
		'stroke-width' : 0
	});
	
	var className;
	
	$circles.each(function(){
		className = $(this).attr('class');
		if(className.search(' select') != -1){
			className = className.replace(' select','');
			$(this).attr('class', className);
		}
	});
	
	$('.graph').remove();
}
