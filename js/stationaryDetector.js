/**
##########################################################
stationary detector  object constructor:
##########################################################
creates a stationary (cross-section) detector 
at a road segment at logical longitudinal coordinate u, 
updating its counts every dtAggr seconds. 

The macroscopic output also aggregates over all lanes while the 
microscopic output also gives the lane index of the passage event

@param road:          the road segement at which the detector is positioned
@param u:             the logical longitudinal coordinate [m] of the detector
@param dtAggr:        aggregation time [s] of the macroscopic output
*/
var infovalue = document.getElementById('infotext').getAttribute('value');
console.log(infovalue);




function stationaryDetector(road,u,dtAggr){
    var infovalue = document.getElementById('infotext').getAttribute('value');
console.log(infovalue);


    console.log("in stationaryDetector cstr: road=",road);
    this.road=road;
    this.u=u;
    this.dtAggr=dtAggr;

    if(this.u>road.roadLen){
	console.log("Warning: trying to place a detector at position u=",
		    this.u," greater than the road segment length ",
		    road.roadLen," resetting u=",road.roadLen);
	this.u=road.roadLen;
    }

    // initializing macroscopic records

    this.iAggr=0;
    this.historyFlow=[];
    this.historySpeed=[];
    this.historyFlow[0]=0;
    this.historySpeed[0]=0;
    this.vehCount=0; // counting inside each aggregation interval (all lanes)
    this.speedSum=0; // summing inside each aggregation interval
    this.nLanes=this.road.nLanes;
    this.vehNearOld=(this.u<0.5*this.road.roadLen) 
	? this.road.findLeaderAt(this.u) : this.road.findFollowerAt(this.u);
}


stationaryDetector.prototype.update=function(time,dt){
    var vehNear=(this.u<0.5*this.road.roadLen) 
	? this.road.findLeaderAt(this.u) : this.road.findFollowerAt(this.u);
    if(vehNear.id != this.vehNearOld.id){
        // if desired, add single-vehicle data record here
	if(false){
	    console.log("stationaryDetector.update: new single-veh",
			" t=",time," lane=",i," vehID=",vehNear.id);
	}
	this.vehNearOld=vehNear;
        this.vehCount++;
	this.speedSum += vehNear.speed;
    }


    if(time>=this.iAggr*this.dtAggr+this.dtAggr){
	this.iAggr++;
	this.historyFlow[this.iAggr]=this.vehCount/this.dtAggr;
	this.historySpeed[this.iAggr]=this.speedSum/this.vehCount;
	this.vehCount=0;
	this.speedSum=0;
	console.log("\nnew aggregation:",
		    " this.historyFlow[",this.iAggr,"]=",
		    this.historyFlow[this.iAggr],
		    " this.historySpeed[",this.iAggr,"]=",
		    this.historySpeed[this.iAggr]);
    }
}

stationaryDetector.prototype.display=function(){
    //console.log("in stationaryDetector.display()");
    //console.log("does Math.tanh exist?");
//

    var textsize=0.02*Math.min(canvas.width,canvas.height); // 2vw;

    ctx.font=textsize+'px Arial';
    //
    var infovalue = document.getElementById('infotext').getAttribute('value');
    if(infovalue==999){
    var flowStr="ፍሰት: "+Math.round(3600*this.historyFlow[this.iAggr])
    +" ነነዌ/ሰ";
    var speedStr="ፍጥነት: "+Math.round(3.6*this.historySpeed[this.iAggr])
    +" ኪሜ/ሰ";
   }else{
        var flowStr="Flow: "+Math.round(3600*this.historyFlow[this.iAggr])
    +" veh/h";
    var speedStr="Speed: "+Math.round(3.6*this.historySpeed[this.iAggr])
    +" km/h";
    }
    
    //var toRight_axis=-20;
    var toRight_axis=-1.1*this.road.nLanes*this.road.laneWidth;
    var xPixCenter=this.road.get_xPix(this.u, toRight_axis,scale);
    var yPixCenter=this.road.get_yPix(this.u, toRight_axis,scale);
    var boxWidth=8.2*textsize;
    var boxHeight=2.4*textsize;

    // the detector line

    var detLineWidth=0.2;    // [m]
    var detLineDist=2;     // dist of the loops of double-loop detector [m]
    var detLineLength=this.road.nLanes*this.road.laneWidth;

    var xCenterPix1=  scale*this.road.traj_x(this.u-0.5*detLineDist);
    var yCenterPix1= -scale*this.road.traj_y(this.u-0.5*detLineDist);//minus!!
    var xCenterPix2=  scale*this.road.traj_x(this.u+0.5*detLineDist);
    var yCenterPix2= -scale*this.road.traj_y(this.u+0.5*detLineDist); 
    var wPix=scale*detLineWidth;
    var lPix=scale*detLineLength;
    var phi=this.road.get_phi(this.u);
    var cphi=Math.cos(phi);
    var sphi=Math.sin(phi);

    ctx.fillStyle="rgb(0,0,0)";
    ctx.setTransform(cphi,-sphi,sphi,cphi,xCenterPix1,yCenterPix1);
    ctx.fillRect(-0.5*wPix, -0.5*lPix, wPix, lPix);
    ctx.setTransform(cphi,-sphi,sphi,cphi,xCenterPix2,yCenterPix2);
    ctx.fillRect(-0.5*wPix, -0.5*lPix, wPix, lPix);


    // the textbox

    ctx.setTransform(1,0,0,1,0,0); 
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(xPixCenter-0.5*boxWidth, yPixCenter-0.5*boxHeight,
		 boxWidth,boxHeight);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillText(flowStr,xPixCenter-0.46*boxWidth,yPixCenter-0.1*boxHeight);
    ctx.fillText(speedStr,xPixCenter-0.46*boxWidth,yPixCenter+0.4*boxHeight);
}



