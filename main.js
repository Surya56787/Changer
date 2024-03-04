song=""
song2=""
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreleftWrist=0;
music_status =""
scorerightWrist=0;
music_status2 =""

function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.position(650,250);
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
}

function draw(){
image(video, 0, 0, 600, 500);
music_status = song.isPlaying();
fill("red");
stroke("red");

if(scoreleftWrist>0.2){
    circle(leftWristX, leftWristY, 20);
    song2.stop();

if(music_status==false){
  song2.stop();
  song.play();
  document.getElementById("song").innerHTML="Harry Potter";
}
}
music_status_2 = song2.isPlaying();
fill("blue");
stroke("blue");

if(scorerightWrist>0.2){
    circle(rightWristX, rightWristY, 20);
    song.stop();

if(music_status2==false){
    song.stop();
    song2.play();
  document.getElementById("song").innerHTML="Peter Pan";
}
}
}

function modelLoaded(){
    console.log("Model Loaded");
    poseNet.on("pose", Gotposes);
}

function Gotposes(results){
   if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreleftWrist);
    scorerightWrist=results[0].pose.keypoints[10].score;
    console.log(scorerightWrist);
   }
}