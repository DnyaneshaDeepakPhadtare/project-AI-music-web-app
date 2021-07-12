song1="";
song2="";

song1_status="";
song2_status="";

leftWristx=0;
leftWristy=0;

rightWristx=0;
rigthWristy=0;

score_leftWrist=0;
score_rightWrist=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

    fill('#6f12a1');
    stroke('#6f12a1');


    if(score_rightWrist>0.2){

    circle(rightWristx,rightWristy,20);

    song2.stop();

    if(song1_status==false){
        song1.play();

        document.getElementById("song").innerHTML="Playing Harry Potter Theme Song"
    }
    }



    if(score_leftWrist>0.2){

        circle(leftWristx,leftWristy,20);
    
        song1.stop();
    
        if(song2_status==false){
            song2.play();
    
            document.getElementById("song").innerHTML="Playing Peter Pan Song"
        }
        }

}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        score_leftWrist=results[0].pose.keypoints[9].score;
        score_rightWrist=results[0].pose.keypoints[10].score;

        console.log("score left wrist = "+score_leftWrist+ ", score right wrist = "+score_rightWrist);
        
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristx+", left wrist y= "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rightWristx+", right wrist y= "+rightWristy);
    }
}