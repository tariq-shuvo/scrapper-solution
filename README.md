# Running on heroku server

```
$ heroku buildpacks:clear
$ heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
$ heroku buildpacks:add --index 1 heroku/nodejs

$ git add .
$ git commit -m "Fixing deployment issue"
$ git push heroku master
```
