status1 = "";
objects = [];
song = "";

function preload()
{
    song = loadSound("alert.mp3");
}

function setup()
{
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();
   od = ml5.objectDetector("cocossd", modelLoaded);
   document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, canvas.width, canvas.height);
    if(status1 != "")
    {
        od.detect(video, gotResult);
       for(var i=0; i< objects.length; i++)
       {
       document.getElementById("status").innerHTML = "Status : Objects Detected";
       fill('red');
       t = objects[i].label;
       p = Math.floor(objects[i].confidence * 100);
       text(t + " " + p + "%", objects[i].x, objects[i].y - 15);
       noFill();
       stroke('red');
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       if(t == 'person')
       {
        document.getElementById("baby_status").innerHTML = "Baby Status : Found";
        song.stop();
       }
       else
       {
        document.getElementById("baby_status").innerHTML = "Baby Status : Not Found";
        song.play();
       }
       }
       if(objects.length == 0)
       {
        document.getElementById("baby_status").innerHTML = "Baby Status : Not Found";
        song.play();
       }
    }
}

function modelLoaded()
{
    console.log('Model is Loaded');
    status1 = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}
