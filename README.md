#R3-GO!

## A full-featured react / rails framework

Based on some great, popular projects from around the nets, combined together for awesomeness and speed.

* Rails Backend, React/Redux client.  

* Hosted completely independently on Heroku and Netlify, respectively.

* React-toolbox for quickly leveraging redux friendly components styled with
Material Design

* Various features you "always" need are done! Including
 - Authentication system, email/pass using JWT tokens, ready to go, as well as Facebook(wip) and Google(wip)
 - Simple deploy scripts, done!
 - Admin portal(wip)


Client system is based primarily on
https://github.com/react-boilerplate/react-boilerplate

Server is just a simple Rails 5 server for now. Considering basing
 the rails system on https://github.com/thoughtbot/suspenders but for now that seems like overkill

## Requirements

### Client
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

### Server
* Ruby 2+

## Getting Started

### Setting up locally
* Fork or clone the repo
* In the 'server' directory, install the gems with `bundle`
  (hint: consider creating a gemset for housekeeping)
* In the 'client' directory, install the node modules with yarn install
* Run the rails server; cd to 'server' and run `env PORT=3001 rails server`
* In another terminal window, run the React client; cd to 'client' and run `yarn start`
* If you like foreman, do both at once with foreman start Procfile in the
  root dir.

### Setting up for 'prod' deploy
* Set up a free heroku instance for the rails server
* In the './deploy-server.sh' file, change the name of the heroku instance
  (the one you just created)
* Run `./deploy-server` - Browse to your heroku server to make sure things are working
* Run `heroku run rake db:migrate`
* Add a sample user by connecting to the Heroku rails console `heroku run rails console` and issuing the command `User.create({email: 'test@test.com', password: 'password'})`
* Update the API_URL variable in 'webpack.prod.babel.js' with the URL of your heroku instance
* Configure a free netlify instance for your JS client, configuring it to auto-deploy on push to your repo branch
* Browse to your netlify page to see your awesome website and test your login flow!

## More about React client

### Updating global js variables
See the 'API_URL' example in the webpack.<env>.babel.js files.
WIP

## More about Rails server
WIP
