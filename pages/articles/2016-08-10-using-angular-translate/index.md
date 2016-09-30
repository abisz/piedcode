---
title: "Using angular-translate for Multi Language Apps"
date: "2016-08-10T22:12:03.284Z"
layout: post
path: "/using-angular-translate-for-multi-language-apps/"
category: "Angular"
description: "Angular-translate makes creating multi-language apps really easy. With a few simple steps for integrating the module. You gain some powerful tools to localize your user and support their language."
readNext: ""
---
Managing multi-language angular projects is really easy with [angular-translate](https://angular-translate.github.io/). This module allows an easily accomplished segregation of text and templates and several translation features. Once the text in your HTML templates is replaced with references to certain translation keys, it’s easy to add support for new languages, because the actual content is bundled in your assets folder. If you consistently used angular-translate from the beginning of the project, translating becomes an easy task and doesn’t require technical skills.

To get started you need a couple of dependencies. First of course angular-translate itself. You can use bower or npm, whatever you’re comfortable with. The package is called angular-translate. Then you need to inject it into your app module, to make it available.

Inside your config of your app you can use the $translateProvider to configure the module, such as setting the preferred language or a default fallback language if a key isn’t available.

(gist=abisz/13ad4cf9966f3ee8353cca2aeaf48709)

You probably guess that it’s not a very convenient way to put all your translation keys inside your code, because they will quickly consume a lot of space. So it’s best to move them out of sight. There are several ways to do so. I personally preferred the static files loader. This extension allows you to dynamically load JSON files containing all translations of a language. This way you can keep a nice distinction between your code and assets.
To use this feature you have to include another module called:

```
angular-translate-loader-static-files
```

Then you can declare where you’re going to put your translation files, inside your config function. To do so you need to declare a prefix and a suffix. Together with the language abbreviation this should be the path to your files — in my case I want all my language files to be inside a specified folder and be named lang-xxx.json.

Once you have multiple languages it’s best to declare a default fallback language in case translation keys are missing. If you don’t do this the key itself will be displayed, which could confuse users.

(gist=abisz/77f036d707c5150a1c11d52945468091)

## Switch Language during Runtime
One very common thing you probably want to offer your users is to change the language of your app. Angular-translate provides a very easy way to do so. The use function will load the desired file. If no parameters are passed it will instead return the current active language.

If you are going to offer various translations you should probably save the preference of your users so they don’t have to change it every time they visit your site. Angular-translate can take care of this as well. First you need to include a few more dependencies, one of those also requires the angular cookies module, which you have to inject into your module.

```
angular-cookies
angular-translate-storage-cookie
angular-translate-storage-local
```

Once these are included you just have to call the useLocalStorage function and each language switch will be persistent into the local storage or the cookies (as a fallback).

(gist=abisz/6bfe25428a70d650807a5080be52f07d)

## Résumé
Angular-translate makes it really easy to work with several languages. I would totally recommend using it from the beginning and keeping a clear distinction between templates and text. It’s not that much of extra work if you do it regularly compared to filter all language-biased terms at once later on.
I think it’s also good to have all your labels, warnings, descriptions, etc in one place. Looking through them is a lot easier and consistent language is a positive side effect.
I pushed all the code to [github](https://github.com/abisz/angular-translate-demo) if you want to take a closer look.
