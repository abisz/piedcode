---
title: "My first days with AngularJS"
date: "2016-01-26T22:12:03.284Z"
layout: post
path: "/my-first-days-with-angularjs/"
category: "Angular"
description: "Angular.js is a very powerful and popular frontend Javascript framework. This blogpost sums up my first experiences working with it and exploring it's core features."
readNext: "angular-js-test-your-services"
---

To prepare myself for a new job, I’m starting next week, I took a look at the javascript framework [“AngularJS“](https://angularjs.org/). Here are my first impression about what I learned so far.

## Directives
To start a project, the first thing you want to do is to tell AngularJS that you want to use it. This is done inside your view (e.g. index.html) by appending an attribute to the html-tag.


```
<html lang="en" ng-app>
```

At first, it seemed a little bit odd to add some strange attributes (always starting with ng-*) to your normal html page, but after a little while it made perfect sense. These attributes are called „directives“ and using them allows you to do some really crazy stuff in a very short time, without writing even a single line of javascript.

<p>
    <iframe height='265' scrolling='no' src='//codepen.io/abisz/embed/YweOZK/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/abisz/pen/YweOZK/'>AngularJS Demo1</a> by Simon Reinsperger (<a href='http://codepen.io/abisz'>@abisz</a>) on <a href='http://codepen.io'>CodePen</a>.
    </iframe>
</p>

## Controllers
AngularJS is a MVC-framework, therefore using controllers is essential when working with it. To create a controller, you first have to create your app-variable, on which you can append it. When creating an app you can inject various dependencies, depending which services and features you’ll need, the same goes for your controllers. Usually you’ll at least use the $scope variable, which allows you to transfer data from your controller to your view and the other way around. Finally you have to hook your controller to your view. This is done with another directive (ng-controller).

<p>
<iframe height='265' scrolling='no' src='//codepen.io/abisz/embed/wMyEpJ/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/abisz/pen/wMyEpJ/'>AngularJS Demo2</a> by Simon Reinsperger (<a href='http://codepen.io/abisz'>@abisz</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
</p>

### Creating multiple controllers
To create more than one controller, you have to create a variable, which contains all of them. Then you simply inject this container into your app when creating the app-variable. To declare which controller is affecting which part of your view, you use the “ng-controller=’ControllerName’“ directive.
<p>
<iframe height='265' scrolling='no' src='//codepen.io/abisz/embed/rxdGZN/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/abisz/pen/rxdGZN/'>AngularJS Demo5</a> by Simon Reinsperger (<a href='http://codepen.io/abisz'>@abisz</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
</p>

## Services
Services allow you to add some additional functionality to your app. It can help splitting up your app into smaller and cleaner modules. This is especially useful if you want to use the same kind of code on multiple occasions. Creating a service is rather simple, you call the factory() function on your app-variable, then declare the name of your service and whatever it should be able to do.

To access it’s functionality you have to inject it into your controller by adding the name to the required dependencies.

<p>
<iframe height='265' scrolling='no' src='//codepen.io/abisz/embed/WrMYKr/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/abisz/pen/WrMYKr/'>AngularJS Demo3</a> by Simon Reinsperger (<a href='http://codepen.io/abisz'>@abisz</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
</p>

### Validation
Validating forms and input fields is another easy thing to do. Basically all you have to do is adding a bunch of directives to your html tags to setup proper validation and the rest is done automatically. First you should add the „novalidate“ attribute to the form tag to prevent browser validating on their own and getting in your way. Then you can append your custom validation rules to each input field. You have the following options:
- ng-required: (boolean) the form is only valid if this field is filled in
- ng-minlegth/ng-maxlength: determine a min/max character limit
- ng-pattern: validate your input with a regular expression

Another nice feature is that AngularJS recognizes and validates email fields automatically and you can also access a few other [properties](http://www.w3schools.com/angular/angular_validation.asp) to check whether an input field has been used or not.

<p>
<iframe height='265' scrolling='no' src='//codepen.io/abisz/embed/YweByp/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/abisz/pen/YweByp/'>AngularJS Demo4</a> by Simon Reinsperger (<a href='http://codepen.io/abisz'>@abisz</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
</p>

## Routes
AngularJS is a proper MVC framework, therefore the possibility to route users based on a their URL exists. To do so you have to expand the framework with an extra module (angular-route.js) available on the [official website](https://code.angularjs.org/1.5.0-rc.1/). Like every other additional module, you have to inject it when creating the app.

```var myApp = angular.module('myApp', ['ngRoute']);```

### Configure your routes
When working with routes you definitely want to use multiple controllers. To decide which route belongs to which controller and html-partial, you use the config() function, after creating your app-variable.

(gist=abisz/cd13901717d6cf6c5ef36e40822738b0)

### Passing route parameters
If you need to fetch some id or any other information from the URL, add it inside your config function.

Inside your controller you can access this variable by adding the $routeParams variable to your dependencies.

(gist=abisz/4e1976460e56f34c79c77179effe03eb)

## Conclusion
Working with AngularJS has been a pretty pleasant experience so far. The workflow seems extremely fast and I really look forward digging deeper into this framework during the next months. Any recommendation on what aspect of the framework I should focus after having a good overview of the basic features?