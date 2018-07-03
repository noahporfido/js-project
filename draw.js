

var repaintFlag = false;
var nodeEdge = 3;
var nodeWidth = 85;
var nodeHeight = 60;
var dragNode = null;
var contextMenu = null
var dragFlag = false;

function initCanvas() {

	var elem = document.getElementById("myCanvas");
	elem.addEventListener("mousedown", mouseDown);
	elem.addEventListener("mouseup", mouseUp);
	elem.addEventListener("mousemove", mousemove);
	elem.addEventListener("contextmenu", contextmenuListener);
	elem.addEventListener("click", click);

	//Kontext Menü ausschalten
	elem.oncontextmenu = function (e) {
		e.preventDefault();
	};
	
	extendObjects(tree);
	resetAllNodes(tree);
	repaint();
	noah(tree);
}

function repaint() {
	
	clear();
	drawTreeObject();
}

function drawTreeObject() {
	
	
	if (tree == null)
	{
		return;
	}
	
	var element = document.getElementById('myCanvas');
	
	if (element.getContext) {
		
		var context = element.getContext('2d');
	
		tree.drawTransitions(context);
		tree.drawMe(context);
		tree.drawToolTip(context);
		
	}
}

function noah(start) 
{
	console.log(start.name);

	for (var i = 0; i < start.child.length; i++) 
	{
		noah(start.child[i]);
	
	}
}

function drawContextDirect(context, highlight)
{
	entries = ["Play prompts", "etwas anderes", "noch etwas anderes", "noch was ganz langes zum Anzeigen"];
	if (contextMenu != null)
	{
		var pox = contextMenu.pox;
		var poy = contextMenu.poy;
		var maxWidth = 0;
		
		context.font = "15px Arial";
		entries.forEach(function (str)
			{
				maxWidth = Math.max(maxWidth, context.measureText(str).width);
			}
		)
		contextMenu.width = maxWidth + 30;
		contextMenu.height = contextMenu.hmenu*entries.length;
		
		context.beginPath();
		context.clearRect(pox, poy, contextMenu.width, (entries.length)*contextMenu.hmenu);
		
		for (var i = 0; i < entries.length; i++) 
		{
			context.beginPath();
			context.lineWidth = 1;
			context.strokeStyle = '#000000';
			
			context.moveTo(pox, poy+i*contextMenu.hmenu);
			context.lineTo(pox + contextMenu.width , poy+i*contextMenu.hmenu);
			context.lineTo(pox + contextMenu.width, poy+(i+1)*contextMenu.hmenu);
			context.lineTo(pox, poy+(i+1)*contextMenu.hmenu);
			context.lineTo(pox, poy+i*contextMenu.hmenu);
			context.closePath();
			context.stroke(); 
			if (highlight == i+1)
			{
				context.fillStyle = '#aaaaaa';	
			}
			else
			{
				context.fillStyle = '#dddddd';	
			}
			context.fill();	
		}
		
		
		//Pfeil
		context.beginPath();
		context.strokeStyle = '#00aa00';
		context.fillStyle = '#00aa00';
		context.moveTo(pox+5, poy+5);
		context.lineTo(pox+5, poy+5+10);
		context.lineTo(pox+5+10, poy+5+5);
		context.lineTo(pox+5, poy+5);
		context.stroke(); 
		context.fill();
		
		
		//Texte
		for (var i = 0; i < entries.length; i++) 
		{
			context.lineWidth = 2;
			context.beginPath();
			context.fillStyle = '#000000';
			
			context.fillText(entries[i], pox +25, poy+15+i*contextMenu.hmenu);
		}

	}
}

function checkContext(x, y) {
	
	if (x >= contextMenu.pox && x <= contextMenu.pox + contextMenu.width && y >= contextMenu.poy && y <= contextMenu.poy + contextMenu.height)
	{
		var element = document.getElementById('myCanvas');
		var context = element.getContext('2d');
	
		var ypos = Math.floor((y - contextMenu.poy)/contextMenu.hmenu);
	
		drawContextDirect(context, ypos+1)
	}
}

function mouseDown(event) {
	
	var elementPos = document.getElementById('myCanvas').getBoundingClientRect();
	x = event.clientX - elementPos.left;
	y = event.clientY - elementPos.top;
	
	dragNode = tree.dragStart(x, y, event);
	
	if (dragNode != null)
	{
		repaint();
	}
}

function mouseUp(event) {
	dragNode = null;

	repaint();
}

function mousemove(event) {
	
	var elementPos = document.getElementById('myCanvas').getBoundingClientRect();
	x = event.clientX - elementPos.left;
	y = event.clientY - elementPos.top;
	
	if(contextMenu == null)
	{
		var node = tree.findNode(x, y, event);
		if (node != null)
		{
			node.selected = true;
			node.mousex = x - node.pox;
			node.mousey = y -node.poy;

			repaint();
			
			repaintFlag = true;
		}
		else
		{
			resetAllNodes(tree);
			if (repaintFlag)
			{
				repaint();
			}
		}
		
		if (dragNode != null)
		{
			dragNode.drag(x, y, event);
		}
	}
	else
	{
		checkContext(x, y);
	}
}

function click(event) {
	
	contextMenu = null;
	resetAllNodes(tree);
}

function contextmenuListener(event) {
	
	var element = document.getElementById('myCanvas');
	var context = element.getContext('2d');
	var elementPos = element.getBoundingClientRect();
	x = event.clientX - elementPos.left;
	y = event.clientY - elementPos.top;
	
	var node = tree.findNode(x, y, event);

	if (node != null && dragFlag == false)
	{
		contextMenu = {};
		contextMenu.pox = x;
		contextMenu.poy = y;
		contextMenu.width = 150;
		contextMenu.hmenu = 20;
		contextMenu.height = 0;
		
		repaint();
		drawContextDirect(context, 0);
		
		log.innerHTML += "Show ContextMenü for " + node.name + "  x=" + node.pox + "  y=" + node.poy + "<br>";
	}
	else
	{
		contextMenu = null;
	}
	dragFlag = false;
}

function clear() {
	
	var element = document.getElementById('myCanvas');
	if (element.getContext) 
	{
		var context = element.getContext('2d');
		context.clearRect(0, 0, element.width, element.height);
		
	}
	
}

function resetAllNodes(node) {
	
	node.selected = false;
	contextMenu = null;
	for (var i = 0; i < node.child.length; i++) 
	{
		resetAllNodes(node.child[i]);
	}
}

function extendObjects(node) {
	
	extendNodes(node);
	//Kinder
	node.child.forEach(function(childTree) {
		extendObjects(childTree);
	});
}

//Ergänze das Object um einige Methoden
function extendNodes(node) {
	
	function ClassNode(){};
	ClassNode.prototype.drawMe = function(context) {
		
			//Rechteck
			context.beginPath();
			context.lineWidth = 3;
			if (this.selected)
			{
				context.strokeStyle = '#ff0000';
			}
			else
			{
				context.strokeStyle = '#000000';
			}
			context.moveTo(this.pox + nodeEdge, this.poy);
			context.lineTo(this.pox + nodeWidth - nodeEdge, this.poy);
			context.lineTo(this.pox + nodeWidth, this.poy+nodeEdge);
			context.lineTo(this.pox + nodeWidth, this.poy + nodeHeight - nodeEdge);
			context.lineTo(this.pox + nodeWidth - nodeEdge, this.poy + nodeHeight);
			context.lineTo(this.pox + nodeEdge, this.poy + nodeHeight);
			context.lineTo(this.pox, this.poy + nodeHeight - nodeEdge);
			context.lineTo(this.pox, this.poy + nodeEdge);
			context.lineTo(this.pox + nodeEdge, this.poy);
			context.closePath();
			context.stroke(); 
			if (this.child.length > 0)
			{
				context.fillStyle = '#cccccc';
			}
			else
			{
				context.fillStyle = '#bbbbdd';
			}
			context.fill();
			
			//Texte
			context.lineWidth = 2;
			context.beginPath();
			context.fillStyle = '#000000';
			context.font = "15px Arial";
			context.fillText(this.name, this.pox + 5, this.poy + 15);
			if (this.reason != undefined)
			{
				context.fillText(this.reason, this.pox + 5, this.poy + 53);
			}
			context.beginPath();
			context.font = "16px Arial";
			if (this.reason != undefined)
			{
				context.fillText(this.rid, this.pox + 5, this.poy + 35);
			}
			
			//Bullets
			if(this.isRed)
			{
				context.beginPath();
				context.fillStyle = '#ff0000';
				context.strokeStyle = '#ff0000';
				context.beginPath();
				context.arc(this.pox + (nodeWidth/2) - 10, this.poy, 5, 0, 360, false);
				context.fill(); 
			}
			
			if(this.isGreen)
			{
				context.beginPath();
				context.fillStyle = '#009900';
				context.strokeStyle = '#009900';
				context.beginPath();
				context.arc(this.pox + (nodeWidth/2) + 10, this.poy, 5, 0, 360, false);
				context.fill(); 
			}
			
			//Lautspreche
			if(this.audios !== undefined)
			{
				var pox = this.pox + nodeWidth - 15;
				var poy = this.poy + 20;
				context.beginPath();
				context.lineWidth = 1;
				context.strokeStyle = '#000000';
				context.moveTo(pox, poy);
				context.lineTo(pox, poy-10);
				context.lineTo(pox+5, poy-10);
				context.lineTo(pox+5, poy);
				context.lineTo(pox, poy);
				
				context.moveTo(pox+5, poy-10);
				context.lineTo(pox+10, poy-10 - 5);
				context.lineTo(pox+10, poy + 5);
				context.lineTo(pox+5, poy);
				context.stroke(); 
			}
			
			//Kinder
			this.child.forEach(function(childTree) {
				childTree.drawMe(context);
			});
		};
		
		
		ClassNode.prototype.drawToolTip = function(context) {
				//ToolTip
				if (this.mousex != null && this.mousey != null) 
				{	
					if (this.selected && dragNode == null && contextMenu == null)
					{
						var pox = this.pox+this.mousex;
						var poy = this.poy+this.mousey;
						var toolwidth = 500;
						var toolheight = 100;
						var tooledge = 3;
						var toolarrowh = 30;
						var toolarroww = 10;
						var toolarrowoffset = -20;
						context.beginPath();
						context.lineWidth = 1;
						context.strokeStyle = '#000000';
						context.moveTo(pox, poy);
						context.lineTo(pox+toolarroww+toolarrowoffset, poy+toolarrowh);
						context.lineTo(pox+toolwidth-tooledge, poy+toolarrowh);
						context.lineTo(pox+toolwidth, poy+toolarrowh+tooledge);
						context.lineTo(pox+toolwidth, poy+toolarrowh+toolheight-tooledge);
						context.lineTo(pox+toolwidth-tooledge, poy+toolarrowh+toolheight);
						context.lineTo(pox-50+tooledge, poy+toolarrowh+toolheight);
						context.lineTo(pox-50, poy+toolarrowh+toolheight-tooledge);
						context.lineTo(pox-50, poy+toolarrowh+tooledge);
						context.lineTo(pox+tooledge-50, poy+toolarrowh);
						context.lineTo(pox-toolarroww+toolarrowoffset, poy+toolarrowh);
						context.lineTo(pox, poy);
						context.stroke(); 
						
						context.fillStyle = '#ffffdd';
						context.fill();
						
						context.lineWidth = 2;
						context.beginPath();
						context.fillStyle = '#000000';
						context.font = "15px Arial";
						if(this.audios !== undefined)
						{
							for (var i = 0; i < this.audios.length; i++) 
							{
								context.fillText(this.audios[i].name, pox -40, poy +50 + (i*20));
							}
						}
						
						context.fillText("x="+this.pox+"  y="+this.poy, pox -40, poy + toolheight + 20);
					}
				}
				
				//Kinder
				this.child.forEach(function(childTree) {
					childTree.drawToolTip(context);
				});	
		};	
		
		
		ClassNode.prototype.drawTransitions = function(context) {

				for (var i = 0; i < this.child.length; i++) 
				{				
					context.beginPath();
					context.strokeStyle = '#000000';
					context.lineWidth = 2;
					context.moveTo(this.pox + (nodeWidth/2), this.poy + nodeHeight);
					context.lineTo(this.child[i].pox + (nodeWidth/2), this.child[i].poy);
					context.stroke(); 
					
					this.child[i].drawTransitions(context);
				}
		};
		
		ClassNode.prototype.findNode = function(x, y, event) {
			
			if (x >= this.pox && x <= this.pox + nodeWidth && y >= this.poy && y <= this.poy + nodeHeight)
			{
				return this;
			}
			else
			{
				for (var i = 0; i < this.child.length; i++) 
				{
					var foundNode = this.child[i].findNode(x, y)
					if (foundNode != null)
					{
						return foundNode;
					}
				}
			}
		};

		ClassNode.prototype.dragStart = function(x, y, event) {
			
			if (x >= this.pox && x <= this.pox + nodeWidth && y >= this.poy && y <= this.poy + nodeHeight)
			{
				this.startx = x;
				this.starty = y;
				this.originalx = this.pox;
				this.originaly = this.poy;
				
				if (event.buttons == 2)
				{
					//Kinder
					this.child.forEach(function(childTree) {
						childTree.originalx = childTree.pox;
						childTree.originaly = childTree.poy;
						childTree.populateDragStart();
					});
				}
				
				return this;
			}
			for (var i = 0; i < this.child.length; i++) 
			{
				var foundNode = this.child[i].dragStart(x, y, event)
				if (foundNode != null)
				{
					return foundNode;
				}
			}

			return null;			
		};
		
		ClassNode.prototype.populateDragStart = function() {
			
			this.child.forEach(function(childTree) {
				childTree.originalx = childTree.pox;
				childTree.originaly = childTree.poy;
				
				childTree.populateDragStart();
			});			
		};
		
		ClassNode.prototype.drag = function(x, y, event) {
			
			this.pox = this.originalx + (x - this.startx)
			this.poy = this.originaly + (y - this.starty)

			dragFlag = true;
			
			if (event.buttons == 2)
			{
				for (var i = 0; i < this.child.length; i++) 
				{
					childTree = this.child[i];
					childTree.pox = childTree.originalx + (x - this.startx);
					childTree.poy = childTree.originaly + (y - this.starty);
					childTree.populateDrag((x - this.startx), (y - this.starty));
				}
			}
			
			repaint();				
		};
		
		ClassNode.prototype.populateDrag = function(x, y) {
			
			this.child.forEach(function(childTree) {
				childTree.pox = childTree.originalx + x;
				childTree.poy = childTree.originaly + y;
				
				childTree.populateDrag(x, y);
			});			
		};		
		
		
	node.__proto__ = ClassNode.prototype
}