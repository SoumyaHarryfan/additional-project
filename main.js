Webcam.set({
    width:350,
    height:300,
    image_format :'png',
    png_quality:90
});
camera =  document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("snapshot").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = prediction1;
    speak_data_2 = prediction2;
    var Utterthis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(Utterthis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("p_1").innerHTML=results[0].label;
        document.getElementById("p_2").innerHTML=results[1].label
        prediction1 = results[0].label;
        prediction2 = results[1].label
        speak();
    }
    }