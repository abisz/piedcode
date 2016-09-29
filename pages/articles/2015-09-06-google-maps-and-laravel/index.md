---
title: "Tutorial: Creating a Webapp with Google Maps and Laravel"
date: "2015-09-01622:12:03.284Z"
layout: post
path: "/tutorial-creating-a-webapp-with-google-maps-and-laravel/"
category: "Laravel"
description: "See Google Maps easily used within a Laravel app managed with my jQuery library Maperizer. Create appealing location-based user experiences with these tools."
readNext: ""
---
Working with the Google Maps API isn’t very hard. You can easily implement some basic map functionality to improve your user experience for projects that include geographic information. In this tutorial I will show you how I implemented Google Maps with a custom javascript library I wrote called Maperizer.js into a travel diary application.

## Setting up a Google Maps API key
To use the Google Maps API you have to register your project, that’s so Google can monitor your usage of requests (25,000 request/day are for free) and provide you some statistics. The registration is simple, just visit [this site](https://developers.google.com/maps/documentation/javascript/get-api-key) and follow the steps. Once you’re finished with this you should have your individual API key.

## Include required scripts
To use the Google Maps API you now have to include their script into your views. Just replace the placeholder with your individual API key. You can also add some additional parameters to your url, like requiring some libraries to extend your functionality or allow user to be signed in and see their private markers.

I created a little javascript library for this project, I tried to code it as generic as possible so it’s easy to use it for other projects as well. Here’s the [link](https://github.com/abisz/Maperizer.js) to my github repository where you can download the files. For this library to work you’ll need a few other scripts (jQuery, jQuery UI and a marker clustered [script](https://github.com/googlemaps/js-marker-clusterer/)) as well.

And finally you have to include the scripts from the Maperizer library as well. I saved them in a folder inside my public directory. To create links for including them I use the [asset()](https://laravel.com/docs/5.1/helpers#urls) helper function provided by Laravel. This function generated a url to your public directory and let’s you append additional path parts.

Once you finished your script tags inside your views, it should look like this:
(gist=abisz/d253aa7792de4178053e5a8d44782da7)

## Display a map
Now you should be ready to bring your map to life. First you have to make some basic configuration about the features you want to use. These options can be seen inside the map-options.js. There’s an object with the following attributes:
- geolocation – if this is set to true, the start position of the map will be the current geolocation of the user
- center – here you can pass an latitude and longitude value for the start position in case you don’t want to use geolocation or if the user doesn’t give you the permission to read his or her location
- zoom – that’s the starting zoom level
- searchbox – if set to true and you have an input field with the id of ‚pac-input‘ you enable the functionality of a search box to allow users to search for locations
- cluster – enables/disables markerclustering (if you zoom out nearby markers will collapse into another symbol)
- geocoder – enables/disables the functionality of adding markers by location name (e.g. the exact address) instead of using the coordinates

There is a bunch of other stuff you can write into the map options object provided by the Google Maps API. Just check out this link to learn more about it.

The remaining steps of bringing your map to your site are simple. The only thing left to do is creating a canvas where you want to place your map. An empty div container with the id ‚map-canvas‘ is enough. At this point it’s important to know that the map won’t need any space and just fill the container. Therefore you’ll need to give the div element an actual size!

The last step is to create a maperizer object and pass it your previous created options.

(gist=abisz/061294cf81670243228ffa290c3e825f)

### Adding a Searchbox
If you decide that you want to add a search box you need to create another element and set the searchbox-attribute inside your options to true.
(gist=abisz/cc260d91a69a545cd2ef362dc66fe43a)

## Add Functionality
For the project I was recently working on I needed a map where the user clicks to add a marker. It was part of a form to create a new entry for the online travel diary. Additionally if the user clicks a second time on the map, I didn’t want to add another marker but move the existing one to the new position.

After creating the map, the only thing I to do is adding a click event handler to the it. Inside the callback function of the event I first remove all existing markers and then create a new one at the position where the user clicked.
(gist=abisz/20e2f027092a780bf4f1a3830ada5ed9)

## Using Map Input in Laravel Forms
Now the adding and moving from markers should look fine, but we still don’t access and save the coordinates of the user input. For this task I use hidden input field inside my form. For creating forms in Laravel I use the Formfacade which you’ll have to include first. There’s a [video](https://laracasts.com/series/laravel-5-fundamentals/episodes/10) by Jeffrey Way explaining very well how to do this.
(gist=abisz/35db036156859c73c64cb146887bed48)

For the user these two fields won’t be visible but we gave them an id which allows us to manipulate them inside our javascript and because they are part of the form they will be sent with the other fields. This way we can fetch them in our controller and easily save them in our database.

Here’s what the updated version of our previous function looks like, every time the user clicks on the map we will overwrite the values of the two hidden fields:
(gist=abisz/775731d4f1d8ff5a7ad6590d27205345)

### Validating the Map Input
To save a location we only need the longitude and latitude value, which we pass to the backend with regular form fields. That also allows us to validate them and make sure the user selects a location. For validating forms I use Form Requests, if you don’t know this kind of validation,  I can deeply recommend watching [this video](https://laracasts.com/series/laravel-5-fundamentals/episodes/12) (also by Jeffrey Way). I make sure the user selects something by declaring the ‘lat’ and ‘lng’ values as required and add a custom error message so the user knows what’s wrong.
(gist=abisz/1df3d858695cf687da431d27f3a8add0)

## Getting data from Laravel
Another scenario of using a map is, of course, the opposite of what we just did. Instead of saving some user input we’d also like to present data from our database to the user. To achieve this we need a way of communication between our javascript files and the Laravel backend. The way to do that is with an AJAX request. For this to work you first have to prepare your controller and routes for a new request. I choose to use the same URL as the current site, but it doesn’t matter where you get your data from. Anyway in the Laravel files you have to register a new route for the POST request you’re gonna make and your controller should just return the object (or array of objects). Laravel will automatically return them as JSON, which is exactly what you want to have.

The rest is easy, just make the AJAX Request and add a Marker to the map with the coordinates that come from the backend:
(gist=abisz/90083538e31f91fec3a45a0d378cf54d)

## Multiple Scenarios
If you have different usage scenarios for maps inside you site, I would suggest using an individual script file for each. This way you can easily decide which one to load by passing a variable to the view to check it with a regular if statement.
(gist=abisz/5f180f08a43dba6d23a0a7a9ad0828cb)

## Conclusion
I hope this tutorial was useful to you and you enjoyed working with Maperizer.js. I will definitely continue working on this little project. Please feel free to give me feedback or suggestions for improvement.