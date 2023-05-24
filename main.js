    function preload(){
      classifier=ml5.imageClassifier('DoodleNet');
    }

    function setup(){
        canvas=createCanvas(400,400);
        canvas.center();
        background("white");
        canvas.mouseReleased(classifyCanvas);
        speech=window.speechSynthesis;

    }
      function draw(){
        strokeWeight(10);
        stroke(0);
        if(mouseIsPressed){
          line(pmouseX,pmouseY,mouseX,mouseY);
        }
      }

      function clearCanvas(){
        background("white")
      }

      function classifyCanvas(){
        classifier.classify(canvas, gotResults);
      }

      function gotResults(error,results){
        if(error){
          console.error(error);
        }
        console.log(results)

        document.getElementById("label").innerHTML="Label : " + results[0].label;
        document.getElementById("confidence").innerHTML="Confidence : " + Math.round(results[0].confidence*100)+"%";
        utterThis=new SpeechSynthesisUtterance(results[0].label)
        speech.speak(utterThis);
      }