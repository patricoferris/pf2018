---
path: '/optimise-your-website'
title: 'Optimising your Website'
subtitle: 'Tips and tricks to keep your website lean and fast'
date: '2018-07-28'
imageUrl: 'https://res.cloudinary.com/patricoferris/image/upload/v1532781201/pf2018/blogposts/28-07-2018/website_optimisation_2.png' 
---
![Optimising your Website](https://res.cloudinary.com/patricoferris/image/upload/v1532781201/pf2018/blogposts/28-07-2018/website_optimisation_2.png)
Inspired by a [Syntax](https://syntax.fm/) podcast, I got really interested in website optimisation. It can often be an overlooked aspect in web development with more focus on design and functionality, I realised my number one priority whenever I visited a website is load speed. My attention is a website’s number one goal, lose it and they lose all potential ad revenue or possibility to give me whatever information I was looking for. [Many seem to agree. 53% of users abandon websites that take more than 3 seconds to load](https://developers.google.com/web/fundamentals/performance/get-started/). No amount of fancy graphics or parallax scrolling that appears five seconds after someone’s clicked will hide the slow loading times.

The aim of this article is to give a broad overview of the concepts and ideas behind optimising your website, experienced developers are likely already using things like Webpack (a module bundler) among other tools to speed-up their sites.

For testing load-times I will be using the [Page Load Time ](https://chrome.google.com/webstore/detail/page-load-time/fploionmjgeclbkemipmkogoaohcdbig?hl=en)Chrome extension. There are a few ways to measure website loading time including: [first paint, first meaning paint, DOMContentLoaded](https://developers.google.com/web/tools/chrome-user-experience-report/) etc. For a more detailed look into what this timer measures, check out the Github repository below.
[**alex-vv/chrome-load-timer**
*chrome-load-timer - Google Chrome extension to measure page load time and display it in the toolbar*github.com](https://github.com/alex-vv/chrome-load-timer)

### **Use Minified Stylesheets and Scripts**

You would be amazed at how much performance can be gained by this simple trick. What is a minified document? When we write code it is never our job to make it optimised for the computer, instead our golden rule is to make it readable to humans. This improves readability, cuts down on debug time and makes it easier to maintain. However, to achieve this we often add extra spacing which costs us precious space. Minifying the code is trimming all this fat from what we’ve written to have code that produces the same result but is far more difficult to read and maintain. This is okay though, because a computer has no problem deciphering it. Take the following code for example.

```javascript
//Normal JavaScript Code
const arr = [1, 2, 3, 4, 5];
for(let i = 0; i < arr.length; i++){
  console.log(arr[i]);
}

//Minified Code - A 22.83% Compression saving 0.02kB
const arr=[1,2,3,4,5];for(let a=0;a<arr.length;a++)console.log(arr[a]);
```

Notice how, wherever possible, our line-breaks and spaces are gone. On top of that, the code in the for-loop is only one line so there’s no need for the curly braces which extends our code over three lines when it can be done in one. Does this make a difference?

I tried it out on simple website that just had one script tag being loaded in for the graphics library [p5.js](https://p5js.org/). Using the non-minified CDN link I got a load time of 0.25 seconds. Using the minified version I got a markedly improved load time of 0.08 seconds. Depending on what your website project is, there are a few ways to automatically minify code. If it is a [Meteor app](https://guide.meteor.com/build-tool.html) it will be done automatically, using [Webpack ](https://webpack.js.org/guides/production/)will also allow you to do this. Otherwise there are some online tools like [JSCompress ](https://jscompress.com/)or [CSSMinifier ](https://cssminifier.com/)that you can upload your code to.

### Design Versus Performance

Whilst design is undoubtedly a major aspect to a website’s overall success, both developers and designers must work together to compromise and make a mutually beneficial trade-off between design and performance. The classic example is fonts. Take the two screenshots of a simple website below.

![The example website using Helvetica Font (commonly found on many computers) — check [this](https://css-tricks.com/snippets/css/system-font-stack/) link for common system fonts](https://res.cloudinary.com/patricoferris/image/upload/v1532780050/pf2018/blogposts/28-07-2018/Helvetica.png)
*The example website using Helvetica Font (commonly found on many computers) — check [this](https://css-tricks.com/snippets/css/system-font-stack/) link for common system fonts*

![The example website using Roboto Font (designed by Google and linked from [Google Fonts](https://fonts.google.com/?selection.family=Roboto))](https://cdn-images-1.medium.com/max/5760/1*8ciuJNBdqMhlLSaOpNUXow.png)*The example website using Roboto Font (designed by Google and linked from [Google Fonts](https://fonts.google.com/?selection.family=Roboto))*

Before critiquing my questionable design skills take a moment to appreciate that these two fonts are very similar — yet the loading time for a website for the Roboto font was 0.22 seconds as compared with 0.17 for Helvetica. Whilst not that significant, using lots of custom fonts will slow down your website, although using Google Fonts’ API will help keep your website optimised. As an over-the-top example, linking 20 different fonts from the Google API increased the load time to 0.87 seconds.

### Inlining your JavaScript and CSS

For each individual document or component of your website, when the parser reaches the script tag or link tag it sends and HTTP request for that document and if not stated differently, these will be blocking actions. What this means is your machine is parsing the HTML document getting the words to display in your browser but if it hits the script tag with the attribute src='js/main.js' for example, it will block the parsing and load in that file. This is where as a developer you need to be clever about where in the document you place things.

Whilst it may not ultimately affect the loading time of your website, it can affect the order in which things are loaded. Again we’ll be using the un-minified p5.js library to simulate a large JavaScript file and load it in different places to see how it affects our user experience.

![Refreshing website with the script tag inserted at the bottom of the body tag](https://cdn-images-1.medium.com/max/2780/1*h_3GogfkaahcXCO9a43CPA.gif)*Refreshing website with the script tag inserted at the bottom of the body tag*

![Refreshing website with the script tag inserted at the top of the body tag](https://cdn-images-1.medium.com/max/2780/1*xLOq5r4erQAwb4Au_hB-Ww.gif)*Refreshing website with the script tag inserted at the top of the body tag*

Whilst the load times were similar for both cases — the user experience is far better by placing the script at the body tag allowing the HTML to be parsed before the JavaScript giving the user the website content immediately!

In the same vein CSS can also be render-blocking especially because more often than not it is linked in the head tag of your HTML document before the body. But if we want our user to see the content in the quickest time we don’t want to be loading CSS for the footer of our document which the user won’t see until they’ve scrolled to the bottom. In fact, we don’t want to load any CSS in that the user can’t immediately see when the page first loads on their device.

The CSS that you need is often called the *Critical CSS*. Finding it for yourself would be a headache. It will be different for different devices, meaning you would have to check manually for all possible devices. Lucky for us we have (if you’re using [Node.js](https://nodejs.org/en/)) [Critical](https://github.com/addyosmani/critical). This helpful package does the CSS inlining for us and all we do is add some code to a Javascript file. Here’s a code snippet from the Github page.

```javascript
let critical = require('critical');

critical.generate({
    base: 'test/',
    src: 'index.html',
    dest: 'styles/main.css',
    dimensions: [{
        height: 200,
        width: 500
    }, {
        height: 900,
        width: 1200
    }]
});
```

Using the generate function, we supply it with a JavaScript object with some values defined. base is where we’re going to save our src and dest (our project folder usually). What’s great is now we just supply an array of dimensions and the code will compute the critical CSS for each and inline that code into our head tag.

### Async and Defer

Again, we come back to this idea of render-blocking and how best we should implement this for our website. When you have a plain script tag in your HTML it blocks the HTML from loading whilst the JavaScript loads **and** runs. Async and defer are simple attributes that you can add to your script tags that change the way your JavaScript will be loaded.

Defer essentially “defers” execution of the script until after the HTML has been parsed. A major advantage of this is that you no longer need some $(document).ready() jQuery-style function to make sure the body was loaded before you could manipulate it, which could cut out some of the dependencies on libraries like jQuery which helps reduce load-time.

Async is, unsurprisingly, the asynchronous loading of JavaScript files. What does this mean? Your HTML will continue to be parsed whilst the file is loaded and then whenever its ready the file will be executed. This helps improving user experience whilst viewing your website. Imagine for example you had a JavaScript file for doing some cool graphics. You want the words around this graphic to be parsed until your graphic is ready to be executed. As soon as it is ready, it is executed and we get a more seamless loading of our webpage without missing pieces.

Check this [website](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html) for a really intuitive, graphical representation of this.

### Image Optimisation and Media Queries

The cornerstone of all website performance optimisation is the simple rule that, the less data you send to the client, the quicker and better your website will perform. With the plethora of devices on the market capable of viewing websites, there is a growing trend to optimise your website based on the device it is being viewed on.

Media queries are a fairly new tool added to CSS3. With more and more content being consumed using mobile-devices there has been a shift in design thinking towards mobile first. Using media queries you can then add stylings for larger screen sizes.

```css
@media only screen and (min-width: 600px) {
 /* Some CSS for screen sizes bigger than 600px but smaller than 992px */
}

@media only screen and (min-width: 992px) {
 /*  Some CSS for screen sizes bigger than 992px */
}

@media only screen and (orientation: landscape) {
  /* Some CSS for landscape-oriented devices */
}
```

The @media tag starts a new CSS rule, whilst the only keyword stops older browsers that don’t support media queries from using it. The screen keyword applies the rules to screens rather than prints. After that you add the media-feature which supports the and , or and not keywords so you can get as specific as you want. When you’re loading your image you can write code like:

```css
@media only screen and (min-width: 600px) {
   background-image: url('supercoolimages/dog-small.png');
}

@media only screen and (min-width: 992px) {
   background-image: url('supercoolimages/dog-big.png');
}
```

This isn’t necessarily the best or optimal approach for image optimisation. Luckily we have other options. [Imgix](https://www.imgix.com/) and [Cloudinary](https://cloudinary.com/) are two ways you can help optimise your site for the right device. Imgix is a Content Delivery Network (CDN) for images with a lot of cool features. A CDN simply takes your files and spreads them across the globe so that someone in a different country doesn’t have to wait for your files on your server to make it all the way to them. This [tutorial](https://docs.imgix.com/tutorials/responsive-images-srcset-imgix) goes through how to use Imgix for different device pixel ratios. Cloudinary is a similar service, and their [tutorial ](https://cloudinary.com/documentation/image_optimization)will take you through the importance of optimisation and how to achieve it will their incredible services. Below is a small example showing how easy it is to use Cloudinary straight in the HTML markup.

<iframe height='400' scrolling='no' title='Cloudinary Example' src='//codepen.io/patricoferris/embed/ejgVJN/?height=400&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/patricoferris/pen/ejgVJN/'>Cloudinary Example</a> by Patrick Ferris (<a href='https://codepen.io/patricoferris'>@patricoferris</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As a last point on image optimisation, the format you use can have a large impact on file size. Some files contain lots of metadata which you don’t want to be serving to your client — [ExifTool](https://www.sno.phy.queensu.ca/~phil/exiftool/) is a commonly used command-line application that can help you trim down those files sizes. On top of this, Scalable Vector Graphics (SVG) are a web-standard developed by W3C that offers XML-based vector graphics. This means they have infinite resolution unlike PNG or JPG files. It also makes them highly versatile, easily editable and can even be animated. At the end of the day SVGs are just code and so the file sizes tend to be small. For more reasons to use them, check out this [article](https://watb.co.uk/5-reasons-you-should-be-using-svgs-over-pngs/).

### Conclusion

We’ve only scratched the surface of what’s possible for website optimisation. There are many tools you can use to help you stream-line this process like [Webpack](https://webpack.js.org/) for bundling or static-site generators like [Gatsby](https://www.gatsbyjs.org/). [Tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) is another commonly used technique to remove excess, unused modules lying around your website.

Hopefully this article has touched on some useful techniques you can use on your next site to help improve its performance. Happy coding!

A big thank you to [Christian Silver](https://medium.com/@pinpickle) and [Charlie Crisp](https://medium.com/@charliecrisp249) for editing this post and providing extremely useful advice and extra content to make it even better.
