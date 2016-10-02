#!/bin/bash

NAME=$1
DATE=`date +%Y-%m-%d`

FORMATTEDNAME=$(echo "${NAME,,}" | tr ' ' '-')

DIRNAME=$DATE-$FORMATTEDNAME

mkdir pages/articles/$DIRNAME

cd pages/articles/$DIRNAME

touch index.md

echo "---
title: \"$NAME\"
date: \"$(date -Is)\"
layout: post
path: \"/$FORMATTEDNAME/\"
category: \"\"
description: \"\"
readNext: \"\"
hide: false
---" > index.md