
let spot, shape_draw_angle, sides, path_radius, back_color, back_color_alt, fore_color, hue, song;
let amp, waiting, player_angle;
let screen_vector, obstacles;

//loads song before setting up anything else
function preload() {
    song = loadSound("Dreamscape.mp3");
}

//initialize canvas
function setup() {
    colorMode(HSB, 150);

    console.log("hi");
    createCanvas(900, 450);

    //number of sides on center shape
    sides = 6;
    //rotation of the screen
    screen_rotation = 0.0;
    //used to drraw current shape
    shape_draw_angle = 0.0;
    //radius of the circle player can move; also affects shape size;
    path_radius = 45;
    //hue of background and inside of shape 
    hue = 0;
    //player's angle from "origin"
    player_angle = 0;
    //wait for mouse to be clicked to start the game
    waiting = true;
    //speed that screen spins
    screen_vector = 0.02;
    //list of obstacles
    obstacles = [];

    textSize(32);
    //amplitude of song used for circle radius
    amp = new p5.Amplitude();
}

function mousePressed() {
    waiting = false;
    if (!song.isPlaying()) {
        song.play();
    }
    else {
        song.stop();
    }
}

function draw() {
    //rotates the screen every tick
    screen_rotation += screen_vector;
    //puts the "origin" of drawing at the center of the screen instead of top right
    translate(width / 2, height / 2);
    //rotates the screen for eack tick
    rotate(screen_rotation);
    //sets colors
    hue = (hue + 0.3) % 150;
    back_color = color(hue, 150, 25);
    fore_color = color((hue + 30) % 150, 100, 70);
    background(hue, 100, 40);

    //displayes text instead of playing
    if (waiting) {
        text("Click to start", -100, 0);
        return;
    }

    path_radius = map(amp.getLevel(), 0, 1, 25, 120);

    //detects if key is pressed and moves player
    if (keyIsDown(RIGHT_ARROW)) {
        player_angle += 0.1;
    }
    if (keyIsDown(LEFT_ARROW)) {
        player_angle -= 0.1;
    }
    

    //pushes new obstacles if conditions are met
    if (random(100) < 3) {
        obstacles.push(new Obstacle());
    }

    //update and draw obstacles
    noStroke();
    fill(fore_color);
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        if (obstacles[i].dist <= 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    //makes the background pattern 
    fill(back_color);
    for (var i = 0; i < sides / 2; i++) {
        beginShape();
        vertex(path_radius * cos(shape_draw_angle), path_radius * sin(shape_draw_angle));
        vertex(700 * cos(shape_draw_angle), 700 * sin(shape_draw_angle));
        shape_draw_angle += 2 * PI / sides;
        vertex(700 * cos(shape_draw_angle), 700 * sin(shape_draw_angle));
        vertex(path_radius * cos(shape_draw_angle), path_radius * sin(shape_draw_angle));
        endShape();
        shape_draw_angle += 2 * PI / sides;
    }

    shape_draw_angle = 0.0;
    stroke(fore_color);
    strokeWeight(5);

    //draws the current shape

    beginShape();
    for (var i = 0; i <= sides; i++) {
        shape_draw_angle += 2 * PI / sides;
        vertex(path_radius * cos(shape_draw_angle), path_radius * sin(shape_draw_angle));
    }
    shape_draw_angle = 0.0;
    endShape();

    //draw player
    circle(path_radius * cos(player_angle) * 1.22, path_radius * sin(player_angle) * 1.22, 3)


}

class Obstacle {
    constructor() {
        this.side = floor(random(sides));
        this.dist = 650;
    }

    update() {
        this.dist-=3;
        beginShape();
        let dist1 = this.dist + path_radius;
        let dist2 = this.dist + (path_radius * 1.3);
        shape_draw_angle = 2 * PI * this.side / sides;
        vertex(dist1 * cos(shape_draw_angle), dist1 * sin(shape_draw_angle));
        vertex(dist2 * cos(shape_draw_angle), dist2 * sin(shape_draw_angle));
        shape_draw_angle += 2 * PI / sides;
        vertex(dist2 * cos(shape_draw_angle), dist2 * sin(shape_draw_angle));
        vertex(dist1 * cos(shape_draw_angle), dist1 * sin(shape_draw_angle));
        endShape();
        shape_draw_angle = 0;
    }
}