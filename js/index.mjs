import CanView from "./canview.mjs";
import Network from "./nn/network.mjs";
import CanGet from "./canget.mjs";

let 
    points = [],
    //                   \/ Mudar apenas esse número (a segunda camada, ou a camada intermediária).
    net = new Network([2,10,3]), 
    canvasImgGet = new CanGet(),
    canvasView = new CanView(),
    {width: imgWidth, height: imgHeight, data: imgData} = await canvasImgGet.load("img/hello.png"),
    imgRWidth = imgWidth, 
    imgRHeight = imgHeight,
    epoch = 0,
    elmInfo = document.querySelector("div");

net.setLearningRate(0.8);

setInterval(function(){

    // Train the grid
    for(let i = 0; i < 10; i++){

        for(let y = 0; y < imgHeight; y++){
            let ny = y / (imgHeight - 1);
            for(let x = 0; x < imgWidth; x++){
                let v = imgData[y * imgWidth + x];
                let nx = x / (imgWidth - 1);
                net.train([nx, ny], v)
            }
        }
    }

    if(epoch++ % 5 == 0){
        points = [];
        for(let y = 0; y < imgRHeight; y++){
            let ny = y / (imgRHeight - 1);
            for(let x = 0; x < imgRWidth; x++){
                let nx = x / (imgRWidth - 1);
                let v = net.activateAndRun([nx, ny]);
                points.push(v);
            }
        }

        canvasView.gridWidth = imgRWidth;
        canvasView.grid = points;
    }

    elmInfo.innerText = `Epoch: ${epoch}`;

}, 1000/5);
