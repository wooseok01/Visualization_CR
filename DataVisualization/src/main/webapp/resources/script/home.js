var init = init();
var dif;

ajaxCall(1, init, dif);

$('#container > div').click(function(){
	$('.selected').attr('class','');
	$(this).attr('class','selected');
	var number = $('.selected').html();
	$('svg').find('g').remove();
	$('svg').find('.cell').remove();

	ajaxCall(number, init, dif);
});


function ajaxCall(number, init, dif){
	$.ajax({
		url : './getCredosData?number='+number,
		dataType : 'json',
		success : function(data){
			dif = drawGuideLine(init, data);
			drawCell(init, data, dif);
		},
		error : function(err){
			console.log(err.message);
		}
	});
}



//user define
function init(){
	var width = $('#content').width();
	var height = $('#content').height();
	var padding = 60;
	var graphW = width - (padding*2);
	var graphH = height - (padding*2);
	
	var svg = d3.select('#content').append('svg').attr({
		width : width,
		height : height
	});

	var root = svg.append('rect').attr({
		x : padding,
		y : padding,
		width : graphW,
		height : graphH,
		fill : 'rgba(237,237,237,0.6)'
	});
	
	return{
		svg : svg,
		rootSvg : root,
		padding : padding,
		graphW : graphW,
		graphH : graphH
	}
}


function drawGuideLine(init, data){
	var xDif = init.graphH/60;
	var yDif = init.graphW/(data.length);
	var questions = ['kdsq1','kdsq2','kdsq3','kdsq4','kdsq5',
	                 'kdsq6','kdsq7','kdsq8','kdsq9','kdsq10',
	                 'kdsq11','kdsq12','kdsq13','kdsq14','kdsq15',
	                 'siadlC1','siadlC2','siadlC3','siadlC4','siadlC5',
	                 'siadlC6','siadlC7','siadlC8','siadlC9','siadlC10',
	                 'siadlC11','siadlC12','siadlC13','siadlC14','siadlC15',
	                 'kmmse1','kmmse2','kmmse3','kmmse4','kmmse5','kmmse6',
	                 'kmmse7','kmmse8','kmmse9','kmmse10','kmmse11','kmmse12',
	                 'kmmse13','kmmse14','kmmse15','kmmse16','kmmse17','kmmse18',
	                 'kmmse19','kmmse20','kmmse21','kmmse22','kmmse23','kmmse24',
	                 'kmmse25','kmmse26','kmmse27','kmmse28','kmmse29','kmmse30'];
	
	for(var i=0; i<60; i++){
		var gTag = init.svg.append('g').attr('id','column'+i);
		drawLine(gTag, 
				init.padding, xDif*i+init.padding, 
				init.graphW+init.padding, xDif*i+init.padding, 
				1, 'white', 'parallel'+i);
		drawText(gTag, 
				init.padding-5, xDif*i+init.padding, xDif,
				'black', questions[i]+' text', questions[i])
				.attr({
					'text-anchor':'end',
					id : questions[i]
				});
	}
	
	
	for(var i=0; i<data.length; i++){
		var gTag = init.svg.append('g').attr('id','row'+i).attr({
			
		});
		drawLine(gTag,
				yDif*i+init.padding, init.padding,
				yDif*i+init.padding,init.padding+init.graphH,
				1, 'white','vertical'+i);
		drawText(gTag, 
				yDif*i+init.padding, init.padding, yDif, 
				'black', data[i].pName+' text vertical', data[i].pName)
				.attr({
					'text-anchor' : 'end',
					style : 'position : absolute;',
					transform : 'translate('+(yDif*i)+','+(yDif*i+35)+') rotate(-90)',
					id : data[i].pName
				});
	}
	return {
		xDif : xDif,
		yDif : yDif
	}
}


function drawCell(init, data, dif){
	
	for(var i=0; i<data.length; i++){
		var name = data[i].pName;
		var x = $('#'+name).parent().find('line').attr('x1');
		var fill;
		
		if(data[i].pGroup == 'better'){
			fill = 'rgba(38,197,163,';
		}else{
			fill = 'rgba(189,44,92,';
		}
		
		
		
		drawRect(init.svg, x, $('#kdsq1').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq1, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq2').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq2, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq3').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq3, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq4').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq4, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq5').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq5, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq6').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq6, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq7').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq7, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq8').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq8, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq9').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq9, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq10').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq10, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq11').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq11, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq12').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq12, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq13').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq13, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq14').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq14, fill,'kdsq'), 'cell', name);
		drawRect(init.svg, x, $('#kdsq15').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kdsq15, fill,'kdsq'), 'cell', name);
		
		drawRect(init.svg, x, $('#siadlC1').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC1, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC2').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC2, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC3').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC3, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC4').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC4, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC5').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC5, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC6').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC6, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC7').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC7, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC8').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC8, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC9').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC9, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC10').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC10, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC11').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC11, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC12').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC12, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC13').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC13, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC14').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC14, fill, 'siadl'), 'cell', name);
		drawRect(init.svg, x, $('#siadlC15').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].siadlC15, fill, 'siadl'), 'cell', name);

		drawRect(init.svg, x, $('#kmmse1').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse1, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse2').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse2, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse3').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse3, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse4').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse4, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse5').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse5, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse6').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse6, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse7').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse7, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse8').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse8, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse9').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse9, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse10').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse10, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse11').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse11, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse12').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse12, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse13').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse13, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse14').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse14, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse15').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse15, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse16').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse16, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse17').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse17, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse18').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse18, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse19').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse19, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse20').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse20, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse21').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse21, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse22').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse22, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse23').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse23, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse24').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse24, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse25').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse25, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse26').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse26, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse27').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse27, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse28').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse28, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse29').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse29, fill, 'kmmse'), 'cell', name);
		drawRect(init.svg, x, $('#kmmse30').parent().find('line').attr('y1')*1+1, dif.yDif-1, dif.xDif-1, getOpacity(data[i].kmmse30, fill, 'kmmse'), 'cell', name);
		
	}
}

function getOpacity(score, fill, plag){
	if(plag == 'kdsq'){
		switch(score){
			case 0 : return fill+'0)'; break;
			case 1 : return fill+'0.5)'; break;
			case 2 : return fill + '1)'; break;
		}
	}else if(plag == 'siadl'){
		switch(score){
			case 0 :  return fill + '1)'; break;
			case 1 : return fill+'0.33)'; break;
			case 2 : return fill + '0.66)'; break;
			case 3 : return fill+'0)'; break;
		}
	}else if(plag == 'kmmse'){
		switch(score){
			case 0 : return fill+'1)'; break;
			case 1 : return fill+'0)'; break;
		}
	}
	
}