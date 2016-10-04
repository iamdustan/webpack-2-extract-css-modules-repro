# Webpack 2 and Extracting CSS Modules

This is an attempt to create a minimal reproduction scenario of issues I’ve run
into getting the [ExtractTextWebpackPlugin](https://github.com/webpack/extract-text-webpack-plugin)
and [CSS Modules](https://github.com/webpack/css-loader#css-modules) working
together.

* `npm run dev`: run the non-extracted build. Outputs to `development`. (works as expected)
* `npm run prod`: run the extracted build. Outputs to `production`. (CSS loader failures)

------

At time of writing this has yet to be a feature parity representation of the app
I’m working on, though as I work through initial configuration and setup issues
I will be making it more representative of our configuration. Odds are high that
I won’t update this README accordingly though, so let git history be the guide.

