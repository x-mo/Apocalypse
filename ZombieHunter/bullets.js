var bullets = new Bullets();

function Bullets(){
	this.objects = [];
	this.maxID = 0;
	this.r=4;
	this.init = function(bullet){
		bullet.vx = bullet.v * Math.cos(bullet.angle)*3;
		bullet.vy = bullet.v * Math.sin(bullet.angle)*3;
	}
	this.push = function(bullet){
		this.init(bullet);
		
		var id = -1;
		//Search empty space
		while(this.objects[++id] != undefined);
		this.objects[id] = bullet;
		if(id > this.maxID) this.maxID = id;		
	};
	
	this.update = function(dt){
		for(var i = 0;i <= this.maxID;i++){
			if(this.objects[i] == undefined) continue;
			
			var obj = this.objects[i];
			
			obj.x += obj.vx * dt;
			obj.y += obj.vy * dt;
			//Detect if on screen
			if(
				obj.x < 0 || obj.y < 0 ||
				obj.x > width || obj.y > height ||
				obj.remove)
			delete this.objects[i];
			
		}
	}
	
	this.render = function(ctx){
		ctx.fillStyle = "#FF0";
		for(var i = 0;i < this.maxID;i++){
			if(this.objects[i] == undefined) continue;
			
			var obj = this.objects[i];
			ctx.beginPath();
			ctx.arc(obj.x,obj.y,this.r,0,6.28);
			ctx.fill();
		}
	};
	
	this.getSize = function(){
		var size = 0;
		for(var i = 0;i <= this.maxID;i++){
			if(this.objects[i] == undefined) continue;
			size++;
		}
		return size;
	};
	
	this.getMinInfo = function(o){
		var dist = 99999;
		var obj;
		for(var i = 0;i <= this.maxID;i++){
			if(this.objects[i] == undefined) continue;
			var d = Math.sqrt(
				(o.x - this.objects[i].x)*(o.x - this.objects[i].x)+
				(o.y - this.objects[i].y)*(o.y - this.objects[i].y)
			);
			if(d < dist){
				dist = d;
				obj = this.objects[i];

			}
		}
		return {dist:dist,object:obj};
	};
	
}

