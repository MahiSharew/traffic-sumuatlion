


function displayTime(time){
    ctx.setTransform(1,0,0,1,0,0); 
    var textsize=0.02*Math.min(canvas.width,canvas.height); // 2vw;

    ctx.font=textsize+'px Arial';
    var infovalue = document.getElementById('infotext').getAttribute('value');
    console.log(infovalue);
    if(infovalue==999){
     var timeStr="ፍጥነት="+Math.round(10*time)/10+ " ሰ";
     }
    else
    {
         var timeStr="Time="+Math.round(10*time)/10+ " s";
     }
   
    
    var timeStr_xlb=textsize;
    var timeStr_ylb=2*textsize;
    var timeStr_width=7*textsize;
    var timeStr_height=1.2*textsize;
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(timeStr_xlb,timeStr_ylb-timeStr_height,timeStr_width,timeStr_height);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillText(timeStr, timeStr_xlb+0.2*textsize, timeStr_ylb-0.2*textsize);
}






// function displayTime(time){
//     ctx.setTransform(1,0,0,1,0,0); 
//     var textsize=0.02*Math.min(canvas.width,canvas.height); // 2vw;

//     ctx.font=textsize+'px Arial';

//     var timeStr="Time67="+Math.round(10*time)/10+ " s";
//     var timeStr_xlb=textsize;
//     var timeStr_ylb=2*textsize;
//     var timeStr_width=7*textsize;
//     var timeStr_height=1.2*textsize;
//     ctx.fillStyle="rgb(255,255,255)";
//     ctx.fillRect(timeStr_xlb,timeStr_ylb-timeStr_height,timeStr_width,timeStr_height);
//     ctx.fillStyle="rgb(0,0,0)";
//     ctx.fillText(timeStr, timeStr_xlb+0.2*textsize, timeStr_ylb-0.2*textsize);
// }