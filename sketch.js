var scelta = ["./assets/bar.jpg","./assets/bru.jpg","./assets/gui.jpg","./assets/bro.jpg"];
var img = [];
var cover;
var video;
var inizio;
var start=0;
var restart=0;
var count=0;

function preload() {
    cover = loadImage("./assets/mano.jpg");
    coverMask = loadImage("./assets/mano.png");
    
    for(var x=0;x<4;x++)
        img[x] = loadImage(scelta[x]);
}

function setup() {
    cover.mask(coverMask);
    
    createCanvas(windowWidth, windowHeight);
    if (windowWidth > windowHeight){
        image(img[count], 0, 0, width, width * 1.23);
    }
    else{
        image(img[count], width / 2 - (height / 1.23) / 2, 0, height / 1.23, height);
    }
    //aux=get();
}

function draw() {
    if (start==0){
        fill(255);
        rect(0,0,width,height);
        image(cover, width / 2 - (height/1.5 / 1.38) / 2, height/10, height/1.5/ 1.38, height/1.5);
        
        textAlign(CENTER);
        textSize(height/20);
        fill(0);
        text("Tap to start",0,height-height/11,width,height/11);
        textSize(height/30);
        text("Tap to change image",0,height-2*height/11,width,height/11);
        text("Shake to glitch",0,height-2.5*height/11,width,height/11);
    }
    if (restart==1){
        
        if (windowWidth > windowHeight){
            image(img[count], 0, 0, width, width * 1.23);
        }
        else{
            image(img[count], width / 2 - (height / 1.23) / 2, 0, height / 1.23, height);
        }
        restart=0;
    }
    if(start==1){
        textAlign(CENTER);
        textSize(height/20);
        fill(255);
        text("Main menu",0,height-height/11,width,height/11);
    }
}

function deviceShaken() {
    if(start==1){
        var dim_x = random(0, width);
        var dim_y = random(0, 5);

        var or_x = random(0, width - dim_x);
        var or_y = random(0, height - dim_y - height/10);
        var arr_x = random(0, width - dim_x);
        var arr_y = random(0, height - dim_y - height/10);

        var partenza = [];
        var arrivo = [];
        //prendi
        for (var x = 0; x < dim_x; x++) {
            partenza[x] = []; // create nested array
            arrivo[x] = []; // create nested array
            for (var y = 0; y < dim_y; y++) {
                partenza[x][y] = get(or_x + x, or_y + y);
                arrivo[x][y] = get(arr_x + x, arr_y + y);
            }
        }
        //lascia
        for (var x = 0; x < dim_x; x++) {
            for (var y = 0; y < dim_y; y++) {
                fill(partenza[x][y]);
                noStroke();
                //aux.set(arr_x + x, arr_y + y, partenza[x][y]);
                rect(arr_x + x, arr_y + y, 1, 1);

                fill(arrivo[x][y]);
                noStroke();
                //aux.set(or_x + x, or_y + y, arrivo[x][y]);
                rect(or_x + x, or_y + y, 1, 1);
            }
        }
        /*
        var or_x=random(0,width);
        var or_y=random(0,height);
        var arr_x=random(0,width);
        var arr_y=random(0,height);
        var or = get(or_x, or_y);
        var arr = get(arr_x, arr_y);
        fill(or);
        noStroke();
        rect(arr_x, arr_y, 1, 1);

        fill(arr);
        noStroke();
        rect(or_x, or_y, 1, 1);
        */
    }
}

function touchStarted() {
    
    if(start==0){
        restart=1;
        start=1;
    }
    else{
        if(touchY>height-height/10){
           start=0; 
        }else{
            restart=1;
            count++;
            if(count==4)
                count=0;
        }
    }
}
