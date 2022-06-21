video = "";
status = "";
obj = [];
function preload(){
    video=  createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video,0,0, 480,380);
    if(status != ""){
        ob.detect(video, gotResult);
        for(i=0; i<obj.length; i++){
            document.getElementById("status").innerHTML="estado: objetos detectados";
            document.getElementById("n0").innerHTML="numero de objetos detectados: "+obj.length;
            fill("red");
            porcentage = floor(obj[i].confidence*100);
            text(obj[i].label+" "+ porcentage+"%", obj[i].x+15, obj[i].y+15);
            stroke("red");
            noFill();
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        }
    }
}
function start(){
    ob = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="estado: detectando objetos";
}
function modelLoaded(){
    console.log("modelo cargado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    obj = results;
    }
}