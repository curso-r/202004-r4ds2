/*
  Highcharts JS v7.0.1 (2018-12-19)
 Sankey diagram module

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:"function"===typeof define&&define.amd?define(function(){return g}):g("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(g){(function(c){c.NodesMixin={createNode:function(g){function r(b,a){return c.find(b,function(b){return b.id===a})}var d=r(this.nodes,g),k=this.pointClass,b;d||(b=this.options.nodes&&r(this.options.nodes,g),d=(new k).init(this,c.extend({className:"highcharts-node",isNode:!0,id:g,y:1},b)),d.linksTo=
[],d.linksFrom=[],d.formatPrefix="node",d.name=d.name||d.options.id,d.getSum=function(){var b=0,a=0;d.linksTo.forEach(function(a){b+=a.weight});d.linksFrom.forEach(function(b){a+=b.weight});return Math.max(b,a)},d.offset=function(b,a){for(var e=0,f=0;f<d[a].length;f++){if(d[a][f]===b)return e;e+=d[a][f].weight}},d.hasShape=function(){var b=0;d.linksTo.forEach(function(a){a.outgoing&&b++});return!d.linksTo.length||b!==d.linksTo.length},this.nodes.push(d));return d}}})(g);(function(c){var g=c.defined,
r=c.seriesType,d=c.pick,k=c.Point;r("sankey","column",{colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){return""},inside:!0},linkOpacity:.5,nodeWidth:20,nodePadding:10,showInLegend:!1,states:{hover:{linkOpacity:1}},tooltip:{followPointer:!0,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: \x3cb\x3e{point.weight}\x3c/b\x3e\x3cbr/\x3e",
nodeFormat:"{point.name}: \x3cb\x3e{point.sum}\x3c/b\x3e\x3cbr/\x3e"}},{isCartesian:!1,forceDL:!0,createNode:c.NodesMixin.createNode,createNodeColumn:function(){var b=this.chart,e=[],a=this.options.nodePadding;e.sum=function(){var a=0;this.forEach(function(b){a+=b.getSum()});return a};e.offset=function(b,d){for(var f=0,c=0;c<e.length;c++){if(e[c]===b)return f+(b.options.offset||0);f+=e[c].getSum()*d+a}};e.top=function(d){for(var f=0,c=0;c<e.length;c++)0<c&&(f+=a),f+=e[c].getSum()*d;return(b.plotSizeY-
f)/2};return e},createNodeColumns:function(){var b=[];this.nodes.forEach(function(a){var e=-1,d,g;if(!c.defined(a.options.column))if(0===a.linksTo.length)a.column=0;else{for(d=0;d<a.linksTo.length;d++)g=a.linksTo[0],g.fromNode.column>e&&(e=g.fromNode.column);a.column=e+1}b[a.column]||(b[a.column]=this.createNodeColumn());b[a.column].push(a)},this);for(var e=0;e<b.length;e++)void 0===b[e]&&(b[e]=this.createNodeColumn());return b},pointAttribs:function(b,e){var a=this.options.linkOpacity,d=b.color;
e&&(a=this.options.states[e].linkOpacity||a,d=this.options.states[e].color||b.color);return{fill:b.isNode?d:c.color(d).setOpacity(a).get()}},generatePoints:function(){var b={},e=this.chart;c.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;this.nodes.forEach(function(a){a.linksFrom.length=0;a.linksTo.length=0});this.points.forEach(function(a){g(a.from)&&(b[a.from]||(b[a.from]=this.createNode(a.from)),b[a.from].linksFrom.push(a),a.fromNode=b[a.from],e.styledMode?
a.colorIndex=d(a.options.colorIndex,b[a.from].colorIndex):a.color=a.options.color||b[a.from].color);g(a.to)&&(b[a.to]||(b[a.to]=this.createNode(a.to)),b[a.to].linksTo.push(a),a.toNode=b[a.to]);a.name=a.name||a.options.id},this)},translate:function(){this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();var b=this.chart,d=b.inverted,a=this.options,c=0,g=a.nodeWidth,r=this.nodeColumns,A=(b.plotSizeX-g)/(r.length-1),B=(d?-A:A)*a.curveFactor,m=Infinity;
this.nodeColumns.forEach(function(d){m=Math.min(m,(b.plotSizeY-(d.length-1)*a.nodePadding)/d.sum())});this.nodeColumns.forEach(function(a){a.forEach(function(e){var f=e.getSum(),k=f*m,E=a.top(m)+a.offset(e,m),l=d?b.plotSizeX-c:c;e.sum=f;e.shapeType="rect";e.shapeArgs=d?{x:l-g,y:b.plotSizeY-E-k,width:g,height:k}:{x:l,y:E,width:g,height:k};e.shapeArgs.display=e.hasShape()?"":"none";e.plotY=1;e.linksFrom.forEach(function(a){var c=a.weight*m,f=e.offset(a,"linksFrom")*m,f=E+f,h=a.toNode,n=r[h.column].top(m)+
h.offset(a,"linksTo")*m+r[h.column].offset(h,m),p=g,h=h.column*A,k=a.outgoing,q=h>l;d&&(f=b.plotSizeY-f,n=b.plotSizeY-n,h=b.plotSizeX-h,p=-p,c=-c,q=l>h);a.shapeType="path";if(q)a.shapeArgs={d:["M",l+p,f,"C",l+p+B,f,h-B,n,h,n,"L",h+(k?p:0),n+c/2,"L",h,n+c,"C",h-B,n+c,l+p+B,f+c,l+p,f+c,"z"]};else{var k=h-20-c,q=h-20,w=h,v=l+p,u=v+20,C=u+c,H=f,x=f+c,F=x+20,y=F+(b.plotHeight-f-c),t=y+20,D=t+c,G=n,z=G+c,I=z+20,J=t+.7*c,K=w-.7*c,L=v+.7*c;a.shapeArgs={d:["M",v,H,"C",L,H,C,x-.7*c,C,F,"L",C,y,"C",C,J,L,D,
v,D,"L",w,D,"C",K,D,k,J,k,y,"L",k,I,"C",k,z-.7*c,K,G,w,G,"L",w,z,"C",q,z,q,z,q,I,"L",q,y,"C",q,t,q,t,w,t,"L",v,t,"C",u,t,u,t,u,y,"L",u,F,"C",u,x,u,x,v,x,"z"]}}a.dlBox={x:l+(h-l+p)/2,y:f+(n-f)/2,height:c,width:0};a.y=a.plotY=1;a.color||(a.color=e.color)})});c+=A},this)},render:function(){var b=this.points;this.points=this.points.concat(this.nodes);c.seriesTypes.column.prototype.render.call(this);this.points=b},animate:c.Series.prototype.animate,destroy:function(){this.data=[].concat(this.points,this.nodes);
c.Series.prototype.destroy.call(this)}},{getClassName:function(){return(this.isNode?"highcharts-node ":"highcharts-link ")+k.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}})})(g)});
//# sourceMappingURL=sankey.js.map
