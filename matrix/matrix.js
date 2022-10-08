const cvs = document.getElementById("mat_can"); // DOM object
const ctx = cvs.getContext("2d");

// store these because i heard that these were faster than accesing it on the spot ig
let cw = window.innerWidth;
let ch = window.innerHeight;

// change so that canvas fits the whole window
cvs.width = cw;
cvs.height = ch;

//resize event 
window.addEventListener('resize', (event) => {
    console.log(event.type)
    cw = window.innerWidth;
    ch = window.innerHeight;
    cvs.width = cw;
    cvs.height = ch;
    //maxCols = cw / fSize;
    console.log(cw, ch);
}, true);

const cChars = [
    "ア","ァ","カ","サ","タ","ナ","ハ","マ","ヤ","ャ","ラ","ワ","ガ","ザ","ダ","バ","パ","イ","ィ","キ","シ","チ","ニ","ヒ","ミ","リ","ヰ","ギ","ジ","ヂ","ビ","ピ","ウ","ゥ",
    "ク","ス","ツ","ヌ","フ","ム","ユ","ュ","ル","グ","ズ","ブ","ヅ","プ","エ","ェ","ケ","セ","テ","ネ","ヘ","メ","レ","ヱ","ゲ","ゼ","デ","ベ","ペ","オ","ォ","コ","ソ","ト",
    "ノ","ホ","モ","ヨ","ョ","ロ","ヲ","ゴ","ゾ","ド","ボ","ポ","ヴ","ッ","ン", // katakanas
    "0","1","2","3","4","5","6","7","8","9", // nums why not, throwing in some variance
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

let fSize = 18;
let maxCols = cw / fSize;

class droplet
{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.cc = cChars[Math.floor(Math.random() * (cChars.length-1))];
        this.speed = (-Math.random() * fSize * 3) / 4 + (fSize * 3) / 4;
    }

    update(cc, x, y){
        this.cc = cc;
        this.x = x;
        this.y = y;
        this.speed = (-Math.random() * fSize * 3) / 4 + (fSize * 3) / 4;
    }

    draw(ctx){
        ctx.fillStyle = "rgba(0,255,0)";
        ctx.font = fSize + "px monospace";

        ctx.fillText(this.cc, this.x, this.y*fSize);
        
        // reset
        let ucc = this.cc = cChars[Math.floor(Math.random() * (cChars.length-1))];
        let ux = this.x;
        let uy= this.y + 1; //this.speed;
        
        if(this.y*fSize > ch && Math.random() > 0.975){ // the rand part because they got clothed
            ux = (Math.floor(Math.random() * maxCols) * fSize);
            uy = 0; //(Math.random() * ch) / 2 - 50;
        }
        this.update(ucc, ux, uy);
    }
}

let frame = 0

let rain = [];
for(let i = 0; i < 300; ++i){
    let x = (Math.floor(Math.random() * maxCols) * fSize);
    let y = (Math.random() * ch) / 2 - 50;

    let drop = new droplet(x ,y);
    rain.push(drop);
}

let update = () => {
    ctx.fillStyle = "rgba(0,0,0,0.05)"
    ctx.fillRect(0,0,cw,ch);

    for(let i = 0; i < 300 && frame % 5 == 0; ++i){
        rain[i].draw(ctx);
    }

    window.requestAnimationFrame(update);
    frame++;
}

update();