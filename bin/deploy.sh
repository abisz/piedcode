#!/bin/bash

FILE="../secret.sh"
UPLOAD="public"

if [ ! -f $FILE ]; then
    echo "File with Server Credentials not found!"
    exit
fi

. $FILE

# Build
gatsby build

# Generate RSS/Atom Feed
node scripts/generate-rss.js

# Upload to Server
lftp -u $USERNAME,$PASSWORD $SERVER <<END_SCRIPT
mirror -R $UPLOAD "/"
exit
END_SCRIPT
exit 0