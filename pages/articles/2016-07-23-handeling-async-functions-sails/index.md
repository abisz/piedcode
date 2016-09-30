---
title: "Handling async functions in Sails.js"
date: "2016-07-23T22:12:03.284Z"
layout: post
path: "/handling-async-functions-in-sails-js/"
category: "Sails"
description: "Working with asynchronous code can be very intimidating at the beginning. When building a web server with the node framework Sails.js it's inevitable to deal with this. This blog post explores multiple solutions for a very common async issue."
readNext: ""
---
Working with [Sails](http://sailsjs.org/) was my first experience with [node.js](https://nodejs.org/en/) and dealing with a lot of asynchronous code at once. At first I hated it, because I didn’t quite understand the problems and therefore the solutions I found. Of course I knew what I had to do to make basic stuff work, but because I lacked a deeper understanding of what was going on under the hood, I could only copy and paste code snippets, which I found somewhere else. After a while I internalized the standard problems and knew how to solve them, still not fully understanding how and why. I think many developers have similar experiences and can relate to this situation.

Anyway after some weeks I started beginning to like working with Sails, I was fast at building working applications and everything was fine. Still there were times when my unawareness came to light and I was faced with problems I didn’t know how to solve. In the end I always found some way to fix these issues, even so from todays’ point of view I’m ashamed of most of this solutions.

I started learning more about Javascript and I think I have a pretty good idea about its’ async functionality today, one resource that was particularly useful was this [talk about Javascripts’ event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ). Still, I come across new information every few months that destroy my understanding about half the things I thought I already knew, but that’s progress, I guess…

So what is this post about? This week I came across a npm package – [async](https://github.com/caolan/async) –  that offers a bunch of utility functions for async problems and I wanted to show how to solve a common problem in Sails, which I encountered several times and had to come up with nasty spaghetti code solutions, because I didn’t know better.

## What’s the problem?
The problem I’m talking about is calling an async function inside a loop and wanting to return something after the loop is done. This sounds a little abstract but let me give an example: The project is a forum, where users can own several posts and each post can have multiple comments attached to it. So the user model has an one-to-many relationship with the post model and the same is true for posts and comments. Let’s say you need a function that returns a user object containing all posts created by this user and all comments attached to these posts.

Sails and waterline, the ORM of Sails, have this concept of “populate”, which makes it easy to fill an object with all its’ related models. Therefore finding a user with all associated posts isn’t hard, but attaching all comments is tricky, because Sails can’t nest these populate calls (there is a long discussion on GitHub about this problem). So we have to find a way to get all comments and attach them to the corresponding post before responding to the client.

## Solution #1: The spaghetti way
This is one of these solutions that I came up with after despairing for hours. It’s not very beautiful but it works. I wanna call it „spaghetti code“ because it feels more like a hack for me now that I know the other solutions.

(gist=abisz/4bcb6f869e1fd9f25dfc746ab48253bd)

## Solution #2: The Bluebird way
Sails ships with the [bluebird promise library](https://github.com/petkaantonov/bluebird), I’ve been using it for quite a while now but only found out about this way of solving this problem during research for this post. Even so this solutions requires more writing than the first one, I still think it’s better to do it this way.

(gist=abisz/dd04fb76460e11850759b46a554ba857)

## Solution #3: The async library
When I found out about the async library I knew it was the perfect solutions for this problem. It was very surprising for me to see that is was already included in the Sails dependencies and available all the time i’ve been using this framework. I never saw it getting used in any tutorial or screencast, which is odd because I watched a lot of them.

This library offers some really nice functions. One of them doing exactly what we were trying to do. Offering a for each loop with a final callback once it is finished.

(gist=abisz/e20e0668d4ba63eb846bb9ac8667a30f)

After cleaning it up a little and moving the iterator function outside the controller, it ends up being quite a nice and easy-to-read block of code:

(gist=abisz/e87124c557c3d30b68f9b63b8d4638f5)

I hope this post was informative. What I learned from it was to check the package.json of the next framework I’m going to use for some useful stuff that’s already there and not depending solely on techniques that I learn from tutorials.
If you wanna learn more about the async library, make sure to look into their [documentation](http://caolan.github.io/async/docs.html). I didn’t see much yet, but my first impression is definitely a good one.