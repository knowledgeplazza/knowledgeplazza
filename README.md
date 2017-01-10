# Knowledge Plazza
The Wizzard Lizzard's 2017 CodeTN Project  

__Notes for cloud9__
- Building the app takes forever on cloud9, so you can use the pre build code by running `npm start`
- To see the app from cloud9, make sure to change the url to begin with `http://`

_Ex: [http://knowledgeplazza-rjsmith.c9users.io](http://knowledgeplazza-rjsmith.c9users.io/)_

> Our app uses an api server that runs in a separate process and communicates back to it over a secondary port (`8081`)  
> There are lots of advantages to structuring our app this way,
> a big one is allowing our client code to be distributed on a CDN
> 
> Unfortunately, cloud9 does not enable https over secondary ports, so most browsers will block loading data from it.
> The workaround is to load the app over the http protocol.

#
Run `npm run build` and `npm start` to get started

### Setup ###
To run this project on a personal computer, setup your computer using these steps:

0. Clone the project from GitHub

1. Download [nvm](http://nvm.sh)
2. Run `nvm install v6` (We have been running our project on node v6)
3. Open the directory of the project on your computer and run `npm install` to install all necessary packages
4. Run `npm run build` and `npm start` to get started
