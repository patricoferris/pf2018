---
path: '/tensorflow-word2vec-tsne'
title: 'Learn TensorFlow, the Word2Vec model, and the TSNE algorithm using rock bands'
subtitle: 'A guide to vectorising your favourite musicians'
date: '2018-08-14'
imageUrl: 'https://res.cloudinary.com/patricoferris/image/upload/v1534280789/pf2018/blogposts/14-08-2018/KMEANS_CLUSTERING.png'
---
*Posted on [freeCodeCamp](https://medium.freecodecamp.org/learn-tensorflow-the-word2vec-model-and-the-tsne-algorithm-using-rock-bands-97c99b5dcb3a)*
![KMEAN Clustering of the Genres](https://res.cloudinary.com/patricoferris/image/upload/v1534280789/pf2018/blogposts/14-08-2018/KMEANS_CLUSTERING.png)

Learning the “TensorFlow way” to build a neural network can seem like a big hurdle to getting started with machine learning. In this tutorial, we’ll take it step by step and explain all of the critical components involved as we build a Bands2Vec model using [Pitchfork](https://www.kaggle.com/nolanbconaway/pitchfork-data) data from [Kaggle](https://www.kaggle.com/nolanbconaway/pitchfork-data). For the full code, check out the GitHub [page](https://github.com/patricoferris/machinelearning/blob/master/word2vec/Pitchfork.ipynb).

###The Word2Vec Model

Neural networks consume numbers and produce numbers. They’re very good at it. But give them some text, and they’ll throw a tantrum and do nothing remotely interesting. If it is the neural network’s job to crunch the numbers and produce meaningful output, then it is our job to make sure that whatever we are feeding it is meaningful too. This quest for a meaningful representation of information gave birth to the Word2Vec model.

One approach to working with words is to form [one-hot encoded vectors](https://en.wikipedia.org/wiki/One-hot). Create a long (the number of distinct words in our vocabulary) list of zeroes, and have each word point to a unique index of this list. If we see this word, make that index in the list a number one.

While this approach works, it requires a lot space and is completely devoid of meaning. ‘Good’ and ‘Excellent’ are as similar as ‘Duck’ and ‘Blackhole’. If only there was a way to vectorise words so that we preserved this contextual similarity…

Thankfully, there is a way!

Using a neural network, we can produce ‘[embeddings](https://en.wikipedia.org/wiki/Word_embedding)’ of our words. These are vectors that represent each unique word extracted from the weights of the connections within our network.

But the question remains: how do we make sure they’re meaningful? The answer: feed in pairs of words as a target word and a context word. Do this enough times, throwing in some bad examples too, and the neural network begins to learn what words appear together and how this forms almost a graph. Like a social network of words interconnected by contexts. ‘Good’ goes to ‘helpful’ which goes to ‘caring’ and so on. Our task is to feed this data into the neural network.

One of the most common approaches is the [Skipgram](https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf) model, generating these target-context pairings based on moving a window across a dataset of text. But what if our data isn’t sentences, but we still have contextual meaning? In this tutorial, our words are artist names and our contexts are genres and mean review scores. We want artist A to be close to artist B if they share a genre and have a mean review score that is similar. So let’s get started.

Building our Dataset

[Pitchfork](https://pitchfork.com/) is an online American music magazine covering mostly rock, independent, and new music. The data released to Kaggle was scraped from their website and contains information like reviews, genres, and dates linked to each artist.

Let’s create an artist class and dictionary to store all of the useful information we want.

 ```python
# Connecting to the Kaggle Pitchfork Database
import sqlite3 as sql
import numpy as np


db = sql.connect('../../data/pitchfork.sqlite')
cursor = db.cursor()

artist_dict = {}
artist_lookup = {}

#An artist class for holding the information
class Artist:
    def __init__(self, name):
        self.name = name
        self.reviews = []
        self.genres = []
        self.scores = []
    def add_review(self, review):
        self.reviews.append(review)
    def add_genre(self, genre):
        self.genres.append(genre)
    def add_score(self, score):
        self.scores.append(score)
    def __str__(self):
        return self.name

#Reading in the data and storing it as Aritst objects in our dictionary
cursor.execute('select reviews.reviewid, artist, genre, score from reviews join genres on genres.reviewid = reviews.reviewid')
for row in cursor:
    if row[1] not in artist_dict:
        artist_dict[row[1]] = Artist(row[1])
        artist_dict[row[1]].add_review(row[0])
        artist_dict[row[1]].add_genre(row[2])
        artist_dict[row[1]].add_score(row[3])
        artist_lookup[row[1]] = len(artist_lookup)
    else:
        artist_dict[row[1]].add_review(row[0])
        artist_dict[row[1]].add_genre(row[2])
        artist_dict[row[1]].add_score(row[3])
 ```

Great! Now we want to manufacture our target-context pairings based on genre and mean review score. To do this, we’ll create two dictionaries: one for the different unique genres, and one for the scores (discretised to integers).

We’ll add all our artists to the corresponding genre and mean score in these dictionaries to use later when generating pairs of artists.

 ```python
genres = {}
genre_lookup = {}
scores = {}
cursor.execute('select distinct genre from genres')

for row in cursor:
    genre_lookup[len(genre_lookup)] = row[0]
    genres[row[0]] = []

for i in range(11):
    scores[i] = []

#We start adding the different artists into our dictionaries
for artist in artist_dict:
    for genre in artist_dict[artist].genres:
        #We don't want to add them more than once - although maybe this could be a weighting
        #as in how 'rocky' are the band?
        if artist not in genres[genre]:
            genres[genre].append(artist_lookup[artist])
    mean_score = np.mean(artist_dict[artist].scores)
    scores[round(mean_score)].append(artist_lookup[artist])
 ```

One last step before we dive into the TensorFlow code: generating a batch! A batch is like a sample of data that our neural network will use for each epoch. An epoch is one sweep across the neural network in a training phase. We want to generate two numpy arrays. One will contain the following code:

 ```python
#Our batch generator - the bias allows us to control how much of the context is from genre and how much is from score
def gen_batch(genres, scores, size, bias):
    #Initialise the numpy arrays - the xs are the target words and the ys the inidividual contexts.
    xs = np.ndarray(shape=(size), dtype=np.int32)
    ys = np.ndarray(shape=(size, 1), dtype=np.int32)
    for idx in range(size):
        b = np.random.randint(10)
        if b < bias:
            genre = np.random.randint(len(genres))
            g1 = np.random.randint(len(genres[genre_lookup[genre]]))
            g2 = np.random.randint(len(genres[genre_lookup[genre]]))
            #Probably an inefficient way to make sure we don't choose the same artist
            while g1 == g2:
                g2 = np.random.randint(len(genres[genre_lookup[genre]]))
            #Adding the artist unique integer id
            xs[idx] = genres[genre_lookup[genre]][g1]
            ys[idx][0] = genres[genre_lookup[genre]][g2]
        else:
            score = np.random.randint(len(scores))
            s1 = np.random.randint(len(scores[score]))
            s2 = np.random.randint(len(scores[score]))
            while s1 == s2:
                s2 = np.random.randint(len(scores[score]))
            xs[idx] = scores[score][s1]
            ys[idx][0] = scores[score][s2]
    return xs, ys

#A useful dictionary to go from unique integer to artist name
artist_decode = dict(zip(artist_lookup.values(), artist_lookup.keys()))
 ```

TensorFlow

There are a myriad of TensorFlow tutorials and sources of knowledge out there. Any of these [excellent articles](https://medium.freecodecamp.org/search?q=tensorflow) will help you as well as the [documentation](https://www.tensorflow.org/tutorials/). The following code is heavily based on the [word2vec](https://github.com/tensorflow/tensorflow/blob/r1.9/tensorflow/examples/tutorials/word2vec/word2vec_basic.py) tutorial from the TensorFlow people themselves. Hopefully I can demystify some of it and boil it down to the essentials.

The first step is understanding the ‘graph’ representation. This is incredibly useful for the [TensorBoard](https://www.tensorflow.org/guide/summaries_and_tensorboard) visualisations and for creating a mental image of the data flows within the neural network.

Take some time to read through the code and comments below. Before we feed data to a neural network, we have to initialise all of the parts we’re going to use. The placeholders are the inputs taking whatever we give the ‘feed_dict’. The variables are mutable parts of the graph that we will eventually tweak. The most important part of our model is the loss function. It’s the score of how well we did and the treasure map to how we can improve.

 ```python
#Before we dive in we need to declare some variables
vocabulary_size = len(artist_lookup)
#How big we want our final vectors to be
embedding_size = 64
#The number of training samples passed per epoch
batch_size = 64
#Number of negative samples to use in NCE [see below]
num_sampled = 16

#BAND2VEC - Tensorflow Time!
import tensorflow as tf
import math

graph = tf.Graph()

with graph.as_default():
    #Defining variables and functions in a scope is good practice - adds a prefix to the operations
    with tf.name_scope('inputs'):
        #Tensorflow Placeholders are the mouths of the neural network - they will constantly be fed new information
        training_inputs = tf.placeholder(tf.int32, shape=[batch_size])
        training_labels = tf.placeholder(tf.int32, shape=[batch_size, 1])

    #Using the CPU
    with tf.device('/cpu:0'):
        with tf.name_scope('embeddings'):
            #The embeddings - variables are maintained across runs and need to be initialised with a shape and type
            #Each row is a band represented by a vector of length 'embedding_size'
            embeddings = tf.Variable(tf.random_uniform([vocabulary_size, embedding_size], -1.0, 1.0))
            #Like passing muliple indices to a numpy array we get the vectors quickly with this function
            embed = tf.nn.embedding_lookup(embeddings, training_inputs)

        with tf.name_scope('weights'):
            #Like embeddings we initialise our weights and also...
            nce_weights = tf.Variable(
                tf.truncated_normal()
                    [vocabulary_size, embedding_size],
                    stddev=1.0 / math.sqrt(embedding_size)))

        with tf.name_scope('biases'):
            #...our biases
            nce_biases = tf.Variable(tf.zeros([vocabulary_size]))

    with tf.name_scope('loss'):
        #Finally our loss function - see below for an explanation of the Noise Contrastive Estimation Approach
        loss = tf.reduce_mean(
            tf.nn.nce_loss(
                weights=nce_weights,
                biases=nce_biases,
                labels=training_labels,
                inputs=embed,
                num_sampled=num_sampled,
                num_classes=vocabulary_size))

    with tf.name_scope('optimizer'):
        optimizer = tf.train.GradientDescentOptimizer(1.0).minimize(loss)
 ```

Noise Contrastive Estimation (NCE) is a loss function. Usually we would use cross-entropy and softmax, but in the natural language processing world, all of our classes amount to every single unique word.

Computationally, this is bad. NCE changes the framing of the problem from probabilities of classes to whether or not a target-context pairing is correct (a binary classification). It takes a true pairing and then samples to get bad pairings, the constant num\_sampled controls this. Our neural network learns to distinguish between these good and bad pairings. Ultimately, it learns the contexts! You can read more about NCE and how it works [here](https://www.tensorflow.org/api_docs/python/tf/nn/nce_loss).

###Run the Neural Network

Now that everything is set up nicely, we just have to hit the big green ‘go’ button and twiddle our thumbs for a bit.

 ```python
#Running our Neural Network!
#First we init the session
iterations = 100000

with tf.Session(graph=graph) as sess:
    #We run the initialize all global variables operation
    sess.run(tf.global_variables_initializer())
    average_loss = 0.0
    #For all of the iterations
    for index in range(iterations)
        #Generate a batch
        ti, tl = gen_batch(genres, scores, batch_size, 8)
        #Put these in our feed dictionary
        feed_dict = {training_inputs: ti, training_labels: tl}
        #Run the NN! Notice the feed dict feeding our placeholders from before
        _, loss_val = sess.run([optimizer, loss], feed_dict=feed_dict)
        #Some metrics so we can see how we're doing
        average_loss += loss_val
        if (index + 1) % 2000 == 0:
            print('Average loss at step', index + 1, average_loss / (index + 1))
    #Returns our Embeddings so we can access them       

    final_embeddings = embeddings.eval()
 ```

Visualization using TSNE

Okay, we’re not quite done. We now have context-rich, 64-dimensional vectors for our artists, but that’s perhaps too many dimensions to really visualize its usefulness.

Lucky for us we can squash this information into two dimensions while retaining as many of the properties as the 64 dimensions had! This is T-distributed Stochastic Neighbor Embedding, or TSNE for short. This [video](https://www.youtube.com/watch?v=NEaUSP4YerM) does a great job of explaining the main idea behind TSNE, but I’ll try to give a broad overview.

TSNE is an approach to dimensionality reduction that retains the similarities (like Euclidean distance) of higher dimensions. To do this, it first builds a matrix of point-to-point similarities calculated using a normal distribution. The centre of the distribution is the first point, and the similarity of the second point is the value of the distribution at the distance between the points away from the centre of the distribution.

Then we project randomly onto the dimension below and do exactly the same process using a t-distribution. Now we have two matrices of point-to-point similarities. The algorithm then slowly moves the points in the lower dimension to try and make it look like the matrix for the higher dimension where the similarities were preserved. And repeat. Thankfully, Sci-kit Learn has a function which can do the number crunching for us.

 ```python
try:
    from sklearn.manifold import TSNE
    import matplotlib.pyplot as plt

    tsne = TSNE(perplexity=30, n_components=2, verbose=1, init='pca', n_iter=500, method='exact')
    plot_only = len(artist_lookup)

    low_dim_embs = tsne.fit_transform(final_embeddings[:plot_only, :])
except ImportError as ex:
    print('Please install sklearn, matplotlib, and scipy to show embeddings.')
    print(ex)
 ```

### The Results

![All of the Artists plotted using their low dimensional embedding](https://res.cloudinary.com/patricoferris/image/upload/v1534280792/pf2018/blogposts/14-08-2018/LOW_DIM_EMBS_ALL.png)

The amazing aspect of these embeddings is that, just like vectors, they support mathematical operations. The classic example being: King — Man + Woman = Queen , or at least very close to it. Let’s try an example.

Take the low dimensional embeddings of Coil, a band with the following genres, [‘electronic’, ‘experimental', ‘rock’] , and mean score 7.9. Now subtract the low dimensional embeddings of Elder Ones, a band with genres,['electronic'] , and mean score 7.8. With this embedding difference, find the closest bands to it and print their names and genres.

Artist: black lips, Mean Score: 7.48, Genres: ['rock', 'rock', 'rock', 'rock', 'rock']

Artist: crookers, Mean Score: 5.5, Genres: ['electronic']

Artist: guided by voices, Mean Score: 7.23043478261, Genres: ['rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock', 'rock']

It worked! We’re getting rock and electronic bands with vaguely similar review scores. Below are the first three hundred bands plotted with labels. Hopefully you’ve found this project educational and inspiring. Go forth and build, explore, and play!

![Three hundred artists plotted and labelled](https://res.cloudinary.com/patricoferris/image/upload/v1534280789/pf2018/blogposts/14-08-2018/FIRST_300.png)
