---
path: '/global-exporting-network-d3-and-networkx'
title: 'Visualising the Global Exporting Network'
subtitle: 'How to use NetworkX in Python and D3 in JavaScript to visualise the Global Exporting Network'
date: '2018-10-17'
imageUrl: 'https://res.cloudinary.com/patricoferris/image/upload/v1539814961/pf2018/blogposts/17-10-2018/network.png'
---

![Global Exporting Network](https://res.cloudinary.com/patricoferris/image/upload/v1539814961/pf2018/blogposts/17-10-2018/network.png)

Data-Driven Documents (D3) is a JavaScript library for building powerful graphics to communicate information in datasets. It is also fair to say that for many, myself included, it has a non-standard approach to building the graphics. Often the learning curve can feel steep.

In this post we’ll look at using NetworkX — a Python library for exploring graph structures — to do some of the initial data processing for us. Then we’ll add the artistic finishing touches in JavaScript with D3. The full code can be found on my [GitHub](https://github.com/patricoferris/blog-posts/tree/master/Exporting_Dependencies) and an interactive version can be found [here](https://bl.ocks.org/patricoferris/bd646b1122b087cc3ec61de0690625b8/104d0bbfd541851d99d0babdbc0a6f35a6f5a20f).

The data

I remember when I was first introduced to the [CIA World Factbook](https://www.cia.gov/library/publications/the-world-factbook/), and I loved it. It holds a treasure trove of information about all of the countries in the world. It is just screaming for visualisations of the data to be made. On top of this, it has been converted to different formats on [GitHub](https://github.com/factbook) and — most importantly for us — to JSON.

The data is given per country using their two character ISO encoding. We’ll need the continent each country is in to access the data. First we’ll create that dictionary:

 ```python 
import requests
from bs4 import BeautifulSoup
import json
#Accessing the Webpage
result = requests.get('https://github.com/factbook/factbook.json')
#Getting the content of the webpage
content = result.content
#Beautiful-souping it
bsoup = BeautifulSoup(content, 'html5lib')
#Getting the table data cells from the page with a specific class - (Use Chrome Dev Tools)
tds = bsoup.find_all('td', class_='content')

#An array of the possible continents
continents = []
for td in tds[1:14]:
continents.append(td.text.split('\n')[1].split(' ')[-1])
code_to_continent = {}
#Key-value pairs of country code to their respective continent
for continent in continents: 
    if continent != 'meta':
        url = 'https://github.com/factbook/factbook.json/tree/master/{c}'.format(c=continent)
        countries_page = requests.get(url)
        content = countries_page.content
        bsoup = BeautifulSoup(content, 'html5lib')
        tds = bsoup.find_all('td', class_='content')
for td in tds[1:]:
    code_to_continent[td.text.split('\n')[1].split(' ')[-1].split('.')[0]] = continent
 ``` 

The dictionary makes things a lot simpler when we want to access the URL for each country’s data.

The next step is to define a simple Country class to hold the data. While we’re at it, it would improve the visualisation if we could use actual country names — not their two character code — so we can find that information and store it for later use.

 ```python 
 
#A simple country class to store the data relating to the country
class Country:
    def __init__(self, name, code):
        self.name = name.lower()
        self.code = code
        #The country being exported to and the percentage
        self.exporting_partners = {}
    def add_partner(self, p, v):
        self.exporting_partners[p] = v
        #Different possible names pointing to one country code - we might have 'USA': 'us' and 'United States': 'us' etc. 
        names_to_code = {}
        for code in code_to_continent:
            url = 'https://raw.githubusercontent.com/factbook/factbook.json/master/{continent}/{code}.json'.format(continent=code_to_continent[code], code=code)
            names_to_code[code] = code
            json = requests.get(url).json()
            if 'Country name' in json['Government']:
                if 'conventional short form' in json['Government']['Country name']:
                    names_to_code[json['Government']['Country name']['conventional short form']['text'].lower()] = code
                if 'conventional long form' in json['Government']['Country name']:
                    names_to_code[json['Government']['Country name']['conventional long form']['text'].lower()] = code
 ``` 

And now we’re finally ready to add the exporter information — this method isn’t perfect but it gets a majority of the information.

Don’t worry too much about the split() functions on the exporting partners. That’s just cleaning up some of the data so we only get the names and the percentages we want. Check out the GitHub page to see the extra names I had to add for the graph construction to work.

 ```python 
 
countries = {}
#For all of the country codes
for code in code_to_continent:
    #Get the JSON Data
    url = 'https://raw.githubusercontent.com/factbook/factbook.json/master/{continent}/{code}.json'.format(continent=code_to_continent[code], code=code)
    json = requests.get(url).json()
    if 'Country name' in json['Government']:
    #We might miss a few if they don't have this
        if 'conventional short form' in json['Government']['Country name']:
        name = json['Government']['Country name']['conventional short form']['text']
            if 'Exports - partners' in json['Economy']:
                #Get the exporters
                partners = json['Economy']['Exports - partners']['text'].split(',')
                country = Country(name, code)

for partner in partners:
    #Process the data to drop some bits we don't need and get the values we want
    p = partner.split()
    if p[-1][0] == '(':
        country.add_partner(' '.join(p[0:-2]).lower(), float(p[-2].split('%')[0]))
    elif p[-1][0] == 'e':
        country.add_partner(' '.join(p[0:-3]).lower(), float(p[-3].split('%')[0]))  
    else:
        country.add_partner(' '.join(p[0:-1]).lower(), float(p[-1].split('%')[0]))
    countries[code] = country
 ``` 

NetworkX

[NetworkX](https://networkx.github.io/) is a fairly sophisticated Python library for constructing, analysing, and — to a certain extent — exporting graph data structures. It is also really simple to use.

Now that we have the data we want stored in our Country objects, the code for creating our directed graph is very simple.

We can also add attributes to our nodes like the degree of the node and the name (not the ISO code). Once we have our data structure we can export it to a JSON format and dump it in a file ready to be used with D3.

 ```python 
 
import networkx as nx
#Create the empty directed graph
G = nx.DiGraph()
#Add the edges with a weight proportional to their percentage expressed as a decimal
#For consistency we're using the ISO-Codes 
for country in countries:
    for partner in countries[country].exporting_partners: 
        G.add_edge(names_to_code[countries[country].name], names_to_code[partner], weight=countries[country].exporting_partners[partner]/100)

#So we can visualise some cooler things later on we can also add some attributes to the nodes
degrees = nx.degree(G)
#The non-ISO code name
names = {}
for country in countries:
    names[country] = countries[country].name
#Number of exporting partners
ds = {}
for name, d in degrees: 
    ds[name] = d

nx.set_node_attributes(G, ds, 'degree')
nx.set_node_attributes(G, names, 'name')
#And finally export it to a JSON format compatible with D3

from networkx.readwrite import json_graph
data = json_graph.node_link_data(G)
#And then dump it in a file
with open('graph.json', 'w') as fp:
    json.dump(data, fp)
 ``` 

What’s different about D3?

From the outset, Mike Bostock (the founder of D3) wanted to create a “reusable chart.” In his [post](https://bost.ocks.org/mike/chart/) on the subject, he highlights the key goals and missions for the D3 project. These can help us understand the syntactic structure it has.

The first, and most important, take-away is that charts should be implementable “as closures with getter-setter methods.” If you’re new to programming you may be confused as to what a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) is. Don’t worry! The big concept associated with closures is lexical scoping, which sounds a lot scarier than it really is. The basic idea behind it all is nested functions and how the inner function has access to the outer function’s variables.

Take a look at EXAMPLE 1 in the code below. Here we simply return the inner function, which has access to the arguments passed to the outer function. The variable we declare, closureOne , is a function and when we execute it with closureOne() we console.log(config.name) .

 ```javascript 
 
//EXAMPLE 1: A Closure - A function within a function (nested)
function closureOne(config) {
    return function() {
        console.log(config.name);
    }
}
config = {
    'name': 'Joe Blogs'
}
var closureOne = closureOne(config);
closureOne(); // 'Joe Blogs'
//EXAMPLE 2: A slightly more complicated D3-esque closure
function closureTwo() {
    var nameOfPerson = 'Bob Smith';

    function my() {
    // Some Code Here;
    }

    my.fullName = function(value) {
        if (!arguments.length) return nameOfPerson;
            nameOfPerson = value;
            return my;
        }
        return my;
    }

var closureTwo = closureTwo();
closureTwo.fullName('Alice Smith');
console.log(closureTwo.fullName()) // 'Alice Smith';
console.log(closureTwo.nameOfPerson) // Undefined;
 ``` 

In EXAMPLE 2, we declare variables within the scope of the outer function allowing the inner my function to have access to it. In the fullName function associated with the my function — a method — we can either set or get the nameOfPerson depending on it any arguments are passed. Notice how the developer does not have access to the variable nameOfPerson . The developer is forced to use our defined methods to update and access it, providing a level of security to our function.

This method of using closures is how D3 is coded. Take a look at the [line](https://github.com/d3/d3-shape/blob/master/src/line.js) function to see this in action. This [video](https://www.youtube.com/watch?v=-jysK0nlz7A&t=647s) may also shed some light on the topic.

Programming in D3

Thankfully you don’t need to be a master of closures and D3 to create a visualisation. In fact, so long as you can copy and paste, you can usually get something running in no time at all thanks to [Mike Bostock’s Blocks](https://bl.ocks.org/mbostock). This site has many open-source examples of building data visualisations in D3. You can use the code to create your own with your data.

To create the network for this tutorial, I used [this example](https://bl.ocks.org/mbostock/4062045). To get it running on screen, all I had to change was the name of the .csv file.

Let’s look at some of the key lines of code making this visualisation work, and also the parts I’ve added to hopefully improve it further.

Just before we dive in, Andrew Dunkman wrote a great article helping explain [D3 selection](https://techtime.getharvest.com/blog/understanding-d3-selection-operations) which I recommend reading.

 ```javascript 
 
// D3.select allows for DOM manipulation
// Here we get the SVG in our index.html and then get it's width and height 
var svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height");
// Here we create a the hover over 'tooltip' - note it is an element of the body and not the SVG
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
// the forceSimulation method starts a new force simulation to which we then add forces 
var simulation = d3.forceSimulation()
    //d3.forceLink applies the force between source and target nodes 
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    //d3.forceManyBody acts like 'electrical charge' and keeps the nodes separated
    .force("charge", d3.forceManyBody())
    //d3.forceCenter moves the position of the centre to the middle of our SVG instead of the top left corner
    .force("center", d3.forceCenter(width / 2, height / 2));

//d3.json(file, callback) - once we have the data we execute the code in the callback
d3.json("graph.json", function(error, graph) {
    if (error) throw error;
    //Here we create the links in the graph - we first append a 'g' or a group to the SVG
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line") //Don't worry that there are no lines - when we use the .enter() method we can create them
        .data(graph.links) //Our d3.json graph has the link information
        .enter().append("line") // For each of these we want to create a line
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); }); // With some width function associated with the value of the data point
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", scaledSize)
        .attr("fill", function(d) { return color(d.degree); })
    // All of the above should seem familiar from the 'links' code above - what's different is the extra functionality we add
        .on("mouseover", mouseOver(.7)) //two new functions for mousing over and mousing out which we will look at
        .on("mouseout", mouseOut)
        .call(d3.drag() 
    // Call performed on the entire selection - d3.drag does exactly what you would expect - again we'll
    // take a look at the functions passed in. 
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Supplying the simulation with the nodes and telling it to perform the ticked function per tick
    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);
    //... more functions - take a look at the full code to see them
});
 ``` 

To see the functions we’re calling like dragstarted , scaledSize , or mouseOut , be sure to look at the full code [here](https://github.com/patricoferris/blog-posts/blob/master/Exporting_Dependencies/index.js). As an example, let’s see what’s happening when we click on a node.

 ```javascript 
 
//We first perform a selectAll on the circles of the SVG (i.e. the nodes of our graph)
//And if a node is clicked, we perform the function supplying that nodes values as an argument
svg.selectAll("circle").on("click", function(d){
    //We first create a string for the country's name of the node clicked
    let name = "Country: " + d.name.toUpperCase();
    //We then set up the exporters string
    let string = "Exporters: ";
    //From our predefined object containing key-value pairs of linked nodes we check to see what our node is linked to
    //To make the linkedByIndex object we iterated over the links of the graph and placed them in it
    Object.keys(linkedByIndex[d.index]).forEach(key => {
        for(n of graph.nodes) {
            //Sometimes we might not have parsed the data perfectly so we need to do some sanity checks
            if(n.index == key && n.name != undefined) {
                //If everything is code we add it to the string
                string += (n.name.toUpperCase() + ", ");
            }
        }
    });

    //And then manipulate the DOM using some vanilla JS
    let country = document.getElementById("country");
    country.innerHTML = name;
    let exporters = document.getElementById("exporters");
    exporters.innerHTML = string;
});
 ``` 

Conclusion

The code is messy, the visualisation isn’t perfect, and there is so much left to discuss and learn.

But that’s beside the point. Hopefully this post has been able to let you get your feet wet with NetworkX and D3 without throwing too much at you. We all have to start somewhere, and this can be your beginning to create insightful and powerful data visualisations.

If you’re stuck wondering what to tackle next, here are a few of suggestions:

Mike Bostock’s Towards Reusable Charts — this is a great example of someone explaining their thought process and then their implementation. This shows how his goals for the project affected his implementation.

D3 and React — two libraries fighting over the DOM, this is currently what I’m reading about, and seeing what are the best ways to utilise both on a project.

Elijah Meeks, Senior Data Visualization Engineer at Netflix —any of Elijah Meeks’ posts are a great resource and often shed light on the world of data visualisation.

Thanks for sticking with me to the end. Happy visualising!