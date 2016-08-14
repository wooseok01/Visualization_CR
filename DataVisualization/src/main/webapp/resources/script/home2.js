//var init = init();
//var dif;
//var nameList;
//var fullData;
//var questions = ['km_o_p_4','a_barthel_3','a_barthel_10','km_o_t_5',
//                 'a_barthel_8','a_siadl_p9','km_o_p_2',
//                 'km_o_t_2','a_siadl_p2','a_siadl_p6','a_siadl_c6','q_kdsq_15',
//                 'km_o_t_4','km_o_t_1','a_siadl_c2','km_o_p_5','a_siadl_c7',
//                 'km_o_t_3','q_kdsq_13','q_kdsq_14','a_siadl_p3','a_siadl_p4',
//                 'a_siadl_c3','a_siadl_p13','a_siadl_p5','a_siadl_p14','a_siadl_c1',
//                 'a_siadl_p8','a_siadl_c14','a_siadl_p15','a_siadl_c8','a_siadl_c13',
//                 'a_siadl_c15','q_kdsq_1','a_siadl_c4'];
//
//
//async.waterfall([
//    function(cb){
//    	ajaxCall('./getPatientName', init, dif, function(data){
//    		cb(null, data);
//    	});
//    },
//    
//    function(nameList, cb){
//    	ajaxCall('./getCredosData2',init, dif, function(data){
//	    	
//	    	var yDif = init.graphW/59;
//	    	var xDif = init.graphH/questions.length;
//	    	dif = {
//	    		xDif : xDif,
//	    		yDif : yDif
//	    	};
//
//	    	var yDif = dif.yDif;
//	    	
//	    	for(var i=0; i<nameList.length; i++){
//	    		var gTag = init.svg.append('g').attr('id','row'+i);
//		    	
//		    	drawText(gTag, 
//		    			yDif*i+init.padding, init.padding, yDif, 
//		    			'black', nameList[i]+' text vertical', nameList[i])
//		    			.attr({
//		    				'text-anchor' : 'end',
//		    				style : 'position : absolute;',
//		    				transform : 'translate('+(yDif*i)+','+(yDif*i+35)+') rotate(-90)',
//		    				id : nameList[i]
//		    			});
//	    	}
//	    	
//	    	drawGuideLine(init, data, dif);
//	    	drawCell(init, data, dif, questions);
//	    	cb(null, 'done');
//    	});
//    }
//              
//    ], 
//    function(err, result){
//		console.log(result);
//});
//
//
//function ajaxCall(url, init, dif, cb){
//	$.ajax({
//		url : url,
//		dataType : 'json',
//		success : function(data){
//			cb(data);
//		},
//		error : function(err){
//			console.log(err.message);
//		}
//	});
//}
//
//
//
////user define
//function init(){
//	var width = $('#content').width();
//	var height = $('#content').height()*0.9;
//	var padding = 60;
//	var graphW = width - (padding*2);
//	var graphH = height - (padding*2);
//	
//	var svg = d3.select('#content').append('svg').attr({
//		width : width,
//		height : height*0.8
//	});
//
//	var root = svg.append('rect').attr({
//		x : padding,
//		y : padding,
//		width : graphW,
//		height : graphH,
//		fill : 'rgba(237,237,237,0.6)'
//	});
//	
//	dif = {
//		xDif : 
//		yDif : graphH/questions.length
//	}
//	
//	return{
//		svg : svg,
//		rootSvg : root,
//		padding : padding,
//		graphW : graphW,
//		graphH : graphH
//	}
//}
//
//
//function drawGuideLine(init, data, dif){
//	
//	var yDif = dif.yDif;
//	var xDif = dif.xDif;
//	
//	for(var i=0; i<questions.length; i++){
//		var gTag = init.svg.append('g').attr('id','column'+i);
//		
//		drawLine(gTag, 
//				init.padding, xDif*i+init.padding, 
//				init.graphW+init.padding, xDif*i+init.padding, 
//				1.8, 'white', 'parallel'+i);
//		drawText(gTag, 
//				init.padding-5, xDif*i+init.padding, xDif,
//				'black', questions[i]+' text', questions[i])
//				.attr({
//					'text-anchor':'end',
//					id : questions[i]
//				});
//	}
//	
//	
//	for(var i=0; i<59; i++){
//		var gTag = d3.select('#row'+i); 
//			//init.svg.append('g').attr('id','row'+i);
//		//console.log('xxxxx -> '+gTag.html());
//		drawLine(gTag,
//				yDif*i+init.padding, init.padding,
//				yDif*i+init.padding,init.padding+init.graphH,
//				1, 'white','vertical'+i);
//		
//	}
//	return {
//		xDif : xDif,
//		yDif : yDif
//	}
//}
//
//function drawCell(init, data, dif, questions){
////	console.log(questions);
//	
//	
//	var nameList = [];
//	for(var i=0; i<data.length; i+=4){
//		
//		nameList.push({
//			first : data[i],
//			second : data[i+1],
//			third : data[i+2],
//			fourth : data[i+3]
//		});
//	}
//	
//	var rectX = init.rootSvg.attr('x')*1;
//	var rectY = init.rootSvg.attr('y')*1;
//	var xDif = dif.xDif;
//	var yDif = dif.yDif;
//	
//	//better -> betterworse -> maintain -> worse -> worsebetter
//	var color = ['rgba(0,73,176,', 'rgba(139,2,255,', 'rgba(36,178,78,',
//	             'rgba(255,0,102,', 'rgba(255,102,255,'];
//	
//	for(var i=0; i<nameList.length; i++){
//		var tagId = '#'+$('#'+nameList[i].first.name).parent().attr('id');
//		var gTag = d3.select(tagId);
//	}
//	
//	for(var i=0; i<nameList.length; i++){
//		var tagId = '#'+$('#'+nameList[i].first.name).parent().attr('id');
//		var gTag = d3.select(tagId);
//		var x = $('#'+nameList[i].first.name).parent().find('line').attr('x1')*1;
//		
//		for(var j=0; j<questions.length; j++){
//			var y = $('#'+questions[j]).parent().find('line').attr('y1')*1
//			//console.log(y);
//			drawSmallCell(gTag, nameList[i], x, y, dif, color, questions[j]);			
//		}
//		
//		
//		
//	}
//}
//
//function drawSmallCell(root, eachTest,x, y, dif, color, testName){
//	
//	var interval = (dif.yDif)/4;
//	var name = eachTest.first.name;
//	var num = ['first','second','third','fourth'];
//	var index;
//	//better -> betterworse -> maintain -> worse -> worsebetter
//	if(eachTest.first.pGroup == 'better'){
//		index = 0;
//	}else if(eachTest.first.pGroup == 'betterworse'){
//		index = 1;
//	}else if(eachTest.first.pGroup == 'maintain'){
//		index = 2;
//	}else if(eachTest.first.pGroup == 'worse'){
//		index = 3;
//	}else if(eachTest.first.pGroup == 'worsebetter'){
//		index = 4;
//	}
//	for(var i=0; i<4; i++){
//		drawRect(root, 
//				x+interval*i, y, 
//				dif.yDif/4, dif.xDif, 
//				getOpacity(eachTest[num[i]][testName], color[index], testName), 'cell', name);
//	}
//}
//
//function getOpacity(score, fill, testName){
//	if(testName.search('km_o') != -1){
//		switch(score){
//			case 0 : return fill+'0.9)'; break;
//			case 1 : return fill+'0.06)'; break;
//			//default : return fill+'0'; break;
//		}
//	}else if(testName.search('a_siadl') != -1){
//		switch(score){
//			case 0 :  return fill + '0.9)'; break;
//			case 1 : return fill+'0.75)'; break;
//			case 2 : return fill +'0.3)' ; break;
//			case 3 : return fill+'0.06)'; break;
////			default : return fill+'0.06'; break;
//		}
//	}else if(testName.search('q_kdsq') != -1){
//		switch(score){
//			case 0 : return fill + '0.9)'; break;
//			case 1 : return fill+'0.5)'; break;
//			case 2 : return fill+'0.06)'; break;
////			default : return fill+'0.06'; break;
//		}
//	}else if(testName.search('a_barthel') != -1){
//		console.log('xxxx');
//		switch(score){
//			case 0 : return fill + '0.9)'; break;
//			case 1 : return fill+'0.5)'; break;
//			case 2 : return fill+'0.06)'; break;
////			default : return fill+'0.06'; break;
//		}
//	}
//	
//}
//
////function getLineData(init, eachTest, dif, xIndex, yIndex, testName){
////	var lineData = []
////	var num = ['first','second','third','fourth'];
////	var obj = [];
////	var devide;
////	
////	
////	if(testName.search('km_o') != -1){
////		devide = 3;
////	}else if(testName.search('a_siadl') != -1){
////		devide = 5;
////	}else if(testName.search('q_kdsq') != -1 || testName.search('a_barthel') != -1){
////		devide = 4;
////	}
////	
////	for(var i=0; i<num.length; i++){
////		
////		var value = eachTest[num[i]][testName]*1;
////		//console.log(eachTest);
////		if(value != 9){
////			obj.push({
////				x : init.rootSvg.attr('x')*1 + dif.yDif*xIndex + dif.yDif/4*value,
////				y : init.rootSvg.attr('y')*1 + dif.xDif*yIndex + dif.xDif/5*value
////			});
////		}else{
////			continue;
////		}
////	}
////	
////	return obj;
////}
//
//
//
