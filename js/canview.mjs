import {} from "../node_modules/chroma-js/chroma.min.js";
export default class CanView {
    constructor(){
        this.canvas = document.createElement("canvas");
        this.W = 640;
        this.H = 360;
        this.canvas.width = this.W; this.canvas.height = this.H;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        requestAnimationFrame(this.trigger.bind(this));
        this.gridWidth = 4;
        this.grid = [];
    }
    draw(){
        let { H, W, ctx, grid, gridWidth } = this;
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,W,H);

        if(grid.length == 0) return;

        let w = W / gridWidth;
        let h = H / (grid.length / gridWidth);
        for(let i = 0; i < grid.length; i++){
            let item = grid[i];
            let y = Math.floor(i / gridWidth), x = i % gridWidth;
            ctx.fillStyle = chroma.gl(...item).css();
            ctx.fillRect(x*w, y*h, w+1, h+1);
        }
    }
    trigger(){
        this.draw();
        requestAnimationFrame(this.trigger.bind(this));
    }
}