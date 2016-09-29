---
title: "Creating a WordPress theme using underscore_s"
date: "2015-08-01T23:46:37.121Z"
layout: post
path: "/creating-a-wordpress-theme-using-underscore_s/"
category: "Wordpress"
description: "The Underscore_s template can save you a lot of time when developing Wordpress Themes. Here are some basic things to get started."
hide: true
readNext: ""
---
There are countless WP themes available on the web, good and bad ones, some of them are free to use, for some you have to pay. It’s pretty easy to make your site look good and work properly and you can have a successful website without ever writing one line of code, which is great, because it also means that you don’t have to know anything about programming. But there are some benefits from creating your own custom theme.

First of all, if you use a free or commercial theme, you won’t be the only person using it. Maybe you don’t care about that, but you will never have a really individual site, which no one else has. Additionally the themes come with a lot of features you most likely won’t need, because the developers try to make their themes attractive to many people with different usage scenarios. There will be a lot of code overhead for things you don’t even use. And finally it’s hard to change or customize things in other people’s code, which leaves you with just being able to use the limited customization options implemented from the developers.

All of these things can be avoided by creating your own custom theme, which might feel a bit overwhelming if you’re not a PHP pro, but in fact can be very easy, knowing a few things.

# what is underscore_s?
If you decide to create your own theme, you don’t have to start from scratch. There are plenty of tools making the beginning easier, because there are many things everybody needs when creating a theme, like certain files, folders or even basic code blocks. One of these tools is called underscore_s, which is basically already a blank WP theme. You can download it on their [website](http://underscores.me/) and start developing immediately.

The following parts are already included in underscore_s:

several templates files for 404, archive, index, page, comments, footer, etc.
- several templates for different content scenarios
- a stylesheet with reset and some basic styles
- two basic layout options for content and sidebar
- functions.php already containing a basic theme setup
- /inc-folder with some additional php functionality
- /js-folder with some scripts
- other useful files for language support, a README.md, etc.

# Let’s get started
Underscore_s does already a good job at displaying content correctly, even so it’s basically not styled and the main part of creating a theme is – of course – writing your custom styles. While developing it makes sense to fill your site with some test content. WP offers a file with every possible content scenario, just download it from the [WP site](https://codex.wordpress.org/Theme_Unit_Test) and import it into your development site (Tools-Import-Wordpress). Now you should see tons of pages, posts, comments, edge cases, etc. and your goal as a theme developer is to style all of these properly.

## Adding stylesheets and scripts to your theme
If you need to add additional links for css or js files, WP offers two function to do so effectively. Inside functions.php there is one function called [yourThemeName]_scripts(), which handles loading your resources. By default the style.css and some scripts are already implemented. Just add your files to the function and WP will add the links to your head (or footer) while rendering the sites.

To add a stylesheet you have to use the wp_enqueue_style() function. The parameters to pass are the name of your resource, the source url (get_template_directory_uri() returns the theme folder so you can use relative paths) and some optional parameters, which you can look up in the WP core files.

Adding scripts is working the same way, the biggest difference is the name of the function (wp_enqueue_script()). For scripts you’ll want to use the other parameters as well. The first two are identical with the style function. After that you can pass an array of dependencies (for example you can declare that your script relies on jQuery), a string with the version number, to avoid caching problems and finally a boolean whether you want to load the script in the head or footer (true means to load it in the footer, default is false), which you definitely want to set to „true“, because of the way browsers render sites.

## Creating new Nav Menus
If you feel the need to add additional menus, you have to register them inside the [yourThemeName]_setup(), found in functions.php. You already see the primary menu registered there. Just add a new one the same way. Once you done that, you will see your menu as an option in your WP appearance section and you can fill it with menu items. But to actually embed it into your site you also have to call wp_nav_menu() inside your templates, which will generate and return the proper navigation markup. By passing an array you can customize a lot of things, like classes and ids for specific elements of the navigation, like the container or menu items, you also have to declare which „theme_location“ you want to use. This refers to the name you chose while registering your menu. To see a full list of what you can do, simply search for the wp_nav_menu() function inside WP core files.

## Creating additional widget areas
That works pretty much like the menus. First you have to declare them inside [yourThemeName]_widgets_init(), also located in functions.php. Just copy the already existing sidebar registration and customize it the way you want to. Once this is done you will be able to fill it with widgets inside the appearance section as well. And finally to display it you have to call dynamic_sidebar(„sidebar-id“) inside your templates.

# Dig deep into WordPress
Of course there’s a bunch of other stuff you can do to create an unique design and user experience. If you want to improve your theme it’s advisable to dig through every single file included in underscore_s. With a basic understanding of PHP it shouldn’t be too hard to customize even more and once you have an insight of what’s included and how everything works, you can start exploring even more features provided by WP core functions.

WP is a very powerful CMS and due to it’s success it’s most likely it will improve even more. The code is clean and well documented and there is a big community if you need help. Underscore_s can help you save a lot of time compared to starting from scratch and I’m sure the people behind it will keep it up-to-date with new WP releases.
