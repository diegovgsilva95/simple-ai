const loadImage = (url, timeoutTime = 5000) => new Promise((res, rej)=>{
    let img = new Image();
    let timeout = setTimeout(_ => rej(`Failed loading ${url} due to timeout`), timeoutTime);
    
    img.onload = function(ev){
        console.log(ev)
        clearTimeout(timeout);
        res(img);
    }

    img.onerror = function(){
        clearTimeout(timeout);
        rej(`Failed loading ${url}`);
    }

    img.crossOrigin = "anonymous";
    img.src = url;
});

export default class CanGet {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.resize(1,1)
        this.ctx = this.canvas.getContext("2d");
    }
    resize(W,H){
        this.W = W;
        this.H = H;
        this.canvas.width = this.W; this.canvas.height = this.H;
    }
    async load(url){
        let img = await loadImage(url);
        let W = img.width, H = img.height;
        this.resize(W, H);
        this.ctx.clearRect(0,0, W, H);
        this.ctx.drawImage(img, 0, 0);
        let idata = this.ctx.getImageData(0, 0, W, H);

        let pixels = [];
        for(let i = 0; i < W*H; i++){
            pixels.push([
                idata.data[i*4 + 0]/255,
                idata.data[i*4 + 1]/255,
                idata.data[i*4 + 2]/255
            ]);
        }
        return {
            width: W,
            height: H,
            data: pixels
        };
    }
}