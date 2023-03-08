let mobilenet;

let puffin;

function modelReady(){
    console.log("Model is Ready!!!");
    mobilenet.predict(puffin, gotResults);
}

function gotResults(error, results){
    if (error){
        console.error(error)
    }else{
        console.log(results);
        let label = results[0].label;
        let confidence = results[0].confidence;
        fill(0)
        textSize(64)
        text(label, 10, height - 100)
        createP(label)
        createP(confidence)
    }
}

function imageReady(){
    image(puffin, 0, 0, width, height);
}

function setup(){
    createCanvas(640, 480);
    background(0)
    puffin = createImg('img/puffin.jpg', imageReady)
    puffin.hide()
    mobilenet = ml5.imageClassifier('MobileNet', modelReady)
}