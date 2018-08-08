---
path: '/graphics-and-p5'
title: 'Computer Graphics for Everyone'
subtitle: 'An Introduction to Computer Graphics using p5.js'
date: '2018-02-27'
imageUrl: 'https://res.cloudinary.com/patricoferris/image/upload/v1532857964/pf2018/blogposts/27-02-2018/tree.png'
---

![Recursive Tree](https://res.cloudinary.com/patricoferris/image/upload/v1532857964/pf2018/blogposts/27-02-2018/tree.png)

Graphics and computer programming are two dearly intertwined disciplines. The oscilloscope is often recognised as one of the first examples of “computer graphics”, the cathode-ray versions emitting a beam of electrons onto a phosphorescent screen. By using magnetic fields to change the beam’s direction, we can sweep from left to right and move up and down — the basic idea behind most CG! (I highly recommend watching this [video](https://archive.org/details/introductiontothecathoderayoscilloscope) from 1970).

We’ve come a long way since then — modern day graphics is a complicated science as well as an art, and the barrier to entry is constantly increasing. Graphics programming can be so complex, that a simple program to draw a triangle can be over [1000 lines of code](https://github.com/SaschaWillems/Vulkan/blob/master/examples/triangle/triangle.cpp)! However, this article will introduce you to [p5.js](https://p5js.org/) (also known as p5). A simpler, less complex solution for people who want to start making computer graphics, but don’t want the headache of streams of boiler-plate code.

Straight from the landing page of the p5.js website.
> # …make coding accessible for artists, designers, educators and beginners…

p5.js is the result of hard-work of the [Processing Foundation](https://processingfoundation.org/), a group focused on spreading computer and visual literacy. It distills their [Processing](https://en.wikipedia.org/wiki/Processing_(programming_language)) language into a JavaScript library that makes creating graphics easy and accessible whilst providing an ideal platform to springboard people’s careers in computer graphics. It should be mentioned now that a lot of inspiration has been taken from [Daniel Shiffman’s](http://shiffman.net/) p5 projects (from the [classic snake game](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_03_Snake_game_p5.js), to a [double pendulum](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_93_DoublePendulum_p5.js)). I can’t urge you enough to follow these projects to really improve your understanding of coding concepts and the p5 library.

### Some prerequisites:

Before jumping into the p5 code I first want to make clear that there is assumed knowledge of HTML5 and JavaScript including arrays, functions, variables etc. in the rest of this article. If you have a good grasp of JavaScript then skip to the p5 code below, otherwise here are few resources to get you up to scratch.

* [HaC Intro to Programming](https://www.youtube.com/watch?v=spIVWmv1jnw) — A workshop that is being run by Hackers at Cambridge to help anyone start learning to program (which uses JavaScript).

* [Codecademy](https://www.codecademy.com/learn/introduction-to-javascript) — a great resource for learning how to code with instant feedback in your browser.

* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — a great resource for learning about all aspects of web development.

* [Codepen](https://codepen.io/) — a brilliant online text-editor for creating cool projects in HTML, CSS and JavaScript. Equally good for getting inspiration from a lot of talented users. Another possible solution would be [JSFiddle](https://jsfiddle.net/).

What follows is a series of steps that will introduce you to p5 concepts. With code examples and explanations I hope to give you enough information to understand the ideas, but to fully grasp the concepts you will have to dive into the code, experiment with it, break it and learn from it. So without further ado, let’s get coding.

### Step 1: The Setup

```javascript
function setup(){
  //Initialisation of canvas, objects, variables etc.
}
function draw(){
  //The drawing loop - updates at a constant rate declared in setup
}
```

p5 is really simple to setup once you know what to do. There are two files shown above — an index.html and a template.js. The index.html file gets the libraries for us and the template.js is the barebones structure of a p5 project and at the moment it does nothing! Within this we have two functions:

* setup() — a function for creating what we will need for our graphic or project. Like creating a canvas, initialising some objects or arrays etc.

* draw() — a function which will be called periodically like a loop. This is where will call draw functions and update functions to make graphics and animations.

<iframe height='400' scrolling='no' title='Simple Triangle Tutorial' src='//codepen.io/patricoferris/embed/dddxjr/?height=400&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/patricoferris/pen/dddxjr/'>Simple Triangle Tutorial</a> by Patrick Ferris (<a href='https://codepen.io/patricoferris'>@patricoferris</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Let’s first look at the setup function. We used the p5 function createCanvas(width, height) which created and initialised a [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) with arguments width and height. Now within our setup() and createCanvas() functions we can reference the variables width and height without ever instantiating them!

Next comes the meaty, draw function. I have purposefully put extra code in here so we can learn more about what p5 has to offer. Firstly always remember that draw() is a loop that runs from top to bottom. Initially, we set the background (of our canvas) to white with background(255) which is the same as background(255, 255, 255) (maximising the red, green and blue values to give white). This may seem simple, but implicitly we are also clearing our canvas every loop… in one line of code! This will be useful for animations later as we want to redraw objects in a new location rather than have the [build-up on the same canvas](https://codepen.io/patricoferris/pen/paxZaw) (click to see it go spectacularly wrong). Next is a translate(width/2, height/2) which moves our current drawing location to the centre of our canvas. We then declare the fill colour of our triangle with fill(255, 0, 0)(making it red).

We want to create an equilateral triangle with side length s. The triangle itself is a function that takes the vertex coordinates as arguments — triangle(x1, y1, x2, y2, x3, y3) and in this example starting from the centre we have one vertex at (-s/2, 0) another at (s/2, 0) giving a bottom length of s . Now comes the trickier part. A very important aspect of most computer graphics is that the coordinate system starts in the top left corner (or wherever your origin is) and x increases left to right, whilst y increases top to bottom. To move of the screen we need a negative y value. Our last coordinate is given as (0, -sin(PI/3)) (if you’re stuck, think about cutting the triangle in two and using trigonometry).

### Step 2: Get Creative

We’ve learnt how to set up our canvas and start drawing. Armed with the p5 [reference page](https://p5js.org/reference/) and our creativity, we can make some truly stunning graphics. How about a bouncing ball animation?

<iframe height='400' scrolling='no' title='Bouncing Balls' src='//codepen.io/patricoferris/embed/PQpOrB/?height=400&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/patricoferris/pen/PQpOrB/'>Bouncing Balls</a> by Patrick Ferris (<a href='https://codepen.io/patricoferris'>@patricoferris</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Let’s look at the interesting p5 aspects that we didn’t know before:

* frameRate(20) — This enables us to specify the frame rate of our drawing loop, that is, how many times per second it redraws everything for us.

* gravity = createVector(0, 9) — p5 allows us to [create vector objects](https://p5js.org/reference/#/p5.Vector) with which we can perform vector operations like addition, multiplication, dot-product and cross-product. This is useful when we want to simulate physics like forces.

* floor(random(50)) — Here we’re using p5 math functions. floor() takes a real number and rounds it down to the nearest integer. random(arg) produces a random number as small as 0 or up to 49. In this example, we are giving it to the ellipse(x, y, w)function to create randomly sized balls by setting the width to a random number. If we gave another argument it would set the ellipse’s height, but here it infers that we want a circle.

* stroke(0) — This function sets the colour of our shape’s outline. If you don’t want any border you can add noStroke() .

All you need now is to add some physics to these ideas and you have yourself a bouncing ball animation.

### Step 3: Experiment with p5

Hopefully now you have a good understanding of the p5 fundamentals, but we’ve barely scratched the surface. This last example will use two extra features of p5: interactivity and [Perlin Noise](http://flafla2.github.io/2014/08/09/perlinnoise.html). Keep reading to find out more on these two concepts.

<iframe height='400' scrolling='no' title='Pixel Fire' src='//codepen.io/patricoferris/embed/XZMxmV/?height=400&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/patricoferris/pen/XZMxmV/'>Pixel Fire</a> by Patrick Ferris (<a href='https://codepen.io/patricoferris'>@patricoferris</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In this CodePen I have created a relatively simple flame model using squares and Perlin Noise. First of all, how do we get user input? Lucky for us p5 has some functions that can help.

```javascript
var touch = false;
function setup(){
  createCanvas(640, 640);
}
function draw(){
  if(touch){
    fill(255, 0, 0);
    rect(mouseX, mouseY, 20, 20);
  }
}
function touchStarted(){
  touch = true;
}
function touchEnded(){
  touch = false;
}
```

At the top of the code we have declared a boolean “flag” as to whether or not our mouse is being pressed — this allows us to do things if the mouse is being held down. The touchStarted() and touchEnded() are p5 functions that are executed whenever the mouse is pressed or released or the screen is touched and released. Lastly, in our rect() function we have the variables mouseX and mouseY which are p5 variables corresponding to the mouse’s current position. Oddly, these also refer to your [“touch” coordinates](https://github.com/processing/p5.js/issues/1705). With all these variables and functions predefined for us we can focus on making visually stunning graphics, whilst not being hampered by having to code extra functions unrelated to the graphic we’re producing.

Now for the Perlin Noise. In 1983, tired with the artificial look of computer graphics, Ken Perlin developed a type of gradient noise. The basic idea being you create a big grid of gradients randomly and then use the dot product to interpolate between them. In short, we get random values based on the coordinate system we’re drawing on. Great! For each of our squares we can start them at a random position near our mouse, and generate a random upward vector using their position and Perlin Noise. Let’s look at the code:

```javascript
function Particle(x, y, color){
  this.pos = createVector(x + random(-10, 10), y + random(-10, 10));
  this.vel = createVector(floor(random(-1, 1))*noise(this.pos.x), -noise(this.pos.y)*7);
  this.alpha = 255;
  this.r = random(170, 255);
  this.g = random(10, 255);
  this.b = random(0, 100);
  this.update = function(){
    this.pos.add(this.vel);
    this.alpha -= 5;
  }
  this.show = function(){
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    rect(this.pos.x, this.pos.y, 5, 5);
  }
  this.dead = function(){
    if(this.alpha < 0){
      return true;
    }else{
      return false;
    }
  }
}
```

Some key things to notice:

* noise(this.pos.x) — The Perlin Noise [function](https://p5js.org/reference/#/p5/noise) that gets a random number based on the square’s current x position. It returns a value between 0 and 1.

* fill(this.r, this.g, this.b, this.alpha) — Here we have extended fill’s ability by including an alpha value for the objects transparency, by decreasing alpha in the update() function we get a nice fade out like a flame.

* dead() — This function allows us to keep track of which particles have disappeared as their alpha is now less than zero. We can then splice() them out of our array to ensure we’re not drawing an unbounded number of particles over time which would cause performance issues.

As a challenge, you can also use blendMode() to make it seem even more realistic — check this [alteration](https://codepen.io/anon/pen/YeOaJX) to see it in action.

With only a few concepts and the p5 library, it is incredibly straightforward to start building anything you want. Be sure to checkout what else is possible with the library. Here are few cool ideas to get you started: [3D graphics](https://p5js.org/examples/3d-geometries.html), [sliders](https://p5js.org/examples/dom-slider.html) and [images](https://p5js.org/examples/image-load-and-display-image.html).

### Conclusion

As computers and technology become ubiquitous in our daily lives and an increasing number of professions are now relying on computer literacy, p5.js is a beautiful example of how we can ensure as many people as possible have an entry-point to the wonderful world of computer programming. It also acts as a reminder to some more experienced programmers that creativity and imagination are vital in producing meaningful code and ultimately making the tech world a better place.

Hopefully this intro to p5 has convinced you of its usefulness and has encouraged you to start taking your first steps into the world of graphics programming. Here are my recommendations for where to go next:

* [The Coding Train](https://www.youtube.com/user/shiffman) — A brilliant YouTube channel by Daniel Shiffman where he teaches JavaScript and p5.js amongst many other incredible things!

* [p5js.org ](https://p5js.org/examples/)— The examples page on this website is full of inspiring projects which you could recreate and extend further.

* [Sratchapixel](https://www.scratchapixel.com/index.php) — If you feel ready to delve into the deeper concepts and implementations of computer graphics then this website is an incredible resource for you to use.

A special thanks to [Tom Read Cutting](undefined) for editing this article and [Christian Silver](undefined) for helping get it off the ground.
