#!/bin/bash

echo "rm -r ./node_modules/"
rm -r ./node_modules/

npm rm -g angular-cli

npm cache clean

npm install -g angular-cli

npm install
