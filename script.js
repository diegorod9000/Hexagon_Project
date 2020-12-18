
let spot, shape_draw_angle, sides, path_radius, back_color, back_color_alt, fore_color, hue, song, amp, waiting, player_angle;

//loads song before setting up anything else
function preload(){
    song=loadSound("Dreamscape.mp3");
}

//initialize canvas
function setup()
{
    colorMode(HSB,150)

    console.log("hi");
    createCanvas(900, 450);
    stroke(51);

    //number of sides on center shape
    sides=6;
    //rotation of the screen
    screen_rotation=0.0;
    //used to drraw current shape
    shape_draw_angle=0.0;
    //radius of the circle player can move; also affects shape size;
    path_radius=70;
    //hue of background and inside of shape 
    hue=0;
    //player's angle from "origin"
    player_angle=0;
    //wait for mouse to be clicked to start the game
    waiting=true;

    textSize(32);
    //amplitude of song used for circle radius
    amp=new p5.Amplitude();
}

function mousePressed()
{
    waiting=false;
    if(!song.isPlaying())
        song.play();
}

function draw()
{
    //rotates the screen every tick
    screen_rotation+=0.02;
    //puts the "origin" of drawing at the center of the screen instead of top right
    translate(width/2,height/2);
    //rotates the screen for eack tick
    rotate(screen_rotation);
    //sets colors
    hue=(hue+0.3)%150;
    back_color=color(hue,150,25);
    fore_color=color((hue+30)%150, 100, 70)
    background(hue,100,40);

    //displayes text instead of
    if(waiting)
    {
        text("Click to start",-100,0)
        return;
    }

    path_radius=map(amp.getLevel(),0,1, 20, 100);

    //makes the background pattern 
    fill(back_color);
    noStroke()
    for(var i=0;i<sides/2;i++)
    {
        beginShape();
        vertex(path_radius*cos(shape_draw_angle),path_radius*sin(shape_draw_angle));
        vertex(700*cos(shape_draw_angle),700*sin(shape_draw_angle));
        shape_draw_angle+=2*PI/sides;
        vertex(700*cos(shape_draw_angle),700*sin(shape_draw_angle));
        vertex(path_radius*cos(shape_draw_angle),path_radius*sin(shape_draw_angle));
        endShape();
        shape_draw_angle+=2*PI/sides;
    }
    shape_draw_angle=0.0;
    stroke(fore_color);
    strokeWeight(6);

    //draws the current shape

    beginShape();
    for (var i=0;i<=sides;i++)
    {
        shape_draw_angle+=2*PI/sides;
        vertex(path_radius*cos(shape_draw_angle),path_radius*sin(shape_draw_angle));
    }
    shape_draw_angle=0.0;
    endShape();

    //draw player
    //circle(path_radius*cos(player_angle))


}