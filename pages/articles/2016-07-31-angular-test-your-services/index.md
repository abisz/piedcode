---
title: "Angular: Test your Services"
date: "2016-07-31T22:12:03.284Z"
layout: post
path: "/angular-js-test-your-services/"
category: "Angular"
description: "Unit Tests are an essential part of Software Development and QA. Still many developer don't write tests because they don't know how. This post introduces you to testing angular applications with karma and jasmine and shows you how to integrate that into your daily workflow."
readNext: "using-angular-translate-for-multi-language-apps"
---

When people start learning about software development and working on their first projects it seems that very few of them know about the value of testing. That is at least my perception from myself and peers from university. We start big projects and have the skills and endurance to build what we picture, but without writing one single test case. I feel like many of them, me included, know that there is something that we should use, but we procrastinate learning about it because we think we don’t have any time or that it is an overkill for the little side project etc.

I’m working on a pretty big angular.js 1.x application at the moment and I felt like it wasn’t bearable to continue development without integrating a proper testing framework, so I took one day for taking a closer look at [karma](https://karma-runner.github.io/) and [jasmine](http://jasmine.github.io/), testing tools that are very commonly used with angular. Here’s what I learned concerning unit tests for services.

## Things you need to start
First of all you need several things to get started. If you want to use the same testing stack as I do, you need to install:

```
npm install karma karma-jasmine karma-chrome-launcher jasmine-core —save-dev
```

Additionally you need to install the karma client globally on your computer

```
npm install karma-cli -g
```

Karma is basically a test environment, it will know which files to watch, spin up a local web server, logs the result etc. Jasmine on the other hand is a behavior driven development framework. It lets you define test scenarios and validates the result. Jasmine also has a very readable syntax, which you will see later on. There are other frameworks to test your angular app, but from what I saw this combination seems to be one of the most popular ones.

You also need an additional angular extension called angular-mocks, this is used to fake a few things like http request in order to test your code properly. To install it you can either use bower or npm

```
npm/bower install angular-mocks
```

## Setting up your testing environment
Once you have everything installed you can start by initializing karma. Inside your terminal, go to the root folder of your project and execute the command
```
karma init
```

this will start a little configuration dialog to setup karma properly. You can go with the default settings, everything can be changed later on in the karma.conf.js that will be created.

To get started you need to add all files, required for the application to work, inside the karma configuration. You can do so by adding the path to the ‚files‘ array.

Then you should be good to go. You can start karma with the command
```
karma start
```
but this won’t do much, because you haven’t written any tests yet.

## Organize your tests
Let’s start by doing something simple.

First we need to create a file that will include all tests for a specific service. John Papa, author of a very popular angular style guide, suggests to place your testing files at the same location as the code that they test. He also recommends to name them the same with the appendix ‘spec’.

For this example, image we have a simple forum application. Let’s assume we want to write some tests to check whether our PostService is working correctly. The PostService is responsible for all http requests that have something to do with posts. Our folder structure could look something like that

```
- posts
     - PostModule.js
     - PostController.js
     - PostPartial.html
     - PostService.js
     // John Papa actually suggest a notation like that post.service.spec.js
     // but I’m more used to write camel case. It doesn’t really matter as long as you are consistent
     - PostServiceSpec.js
 ```
 
## Write your first test
We want to write a test to check whether the service exists.
(gist=abisz/c4a1b0a43b562ce820c158279797725f)

If you now start karma again you should see the test fail or succeed, depending if you created the service correctly or not.

## Faking http requests
So far so good, but dealing with a service we have to test functions that make http request and their result is depending on some server. How can we possibly test something like that?

Angular mock offers us an utility to fetch http requests and respond with fake data. That way we can test this kind of code without being dependent on anything else.

Inside our PostService we have a function called addPost. Let’s write a test to see if it’s working correctly.

(gist=abisz/820effe5df39ecd7273502d34c1a4586)

Here is another example to illustrate the flexibility of validating the functions with jasmine. For a full list of the different possibilities and example visit the documentation on their website.

In this example a GET request is faked, of course this is also possible for PUT and DELETE requests.

(gist=230a2d8d9201a7c1a307799c5b77f01d)

Résumé
You maybe heard of the benefits of Test Driven Development (TDD: first writing the test than the actual code). I certainly did and in an abstract way I imagined that to be beneficial. Anyway I didn’t follow this approach, because I thought it wasn’t worth investing the extra time for my typical side projects.

Now I wrote test cases for an angular service I developed this week and I had to discover that 80% of my code wasn’t consistent and easy-to-test. I basically had to rewrite the whole thing to be able to test it and the result is a much cleaner code. I didn’t think the code was bad before, but from the todays perspective it was. TDD isn’t just about testing, but thinking about how your code is structured and ensuring certain quality standards. I think you just have to start doing it and once you developed the habit of writing unit tests it won’t take that much extra time compared to the benefits you gain.

Plus it’s also a nice reward to see all your test cases pass!