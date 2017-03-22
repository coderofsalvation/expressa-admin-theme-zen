This is a css theme for the [expressa-admin](https://npmjs.org/package/expressa-admin) database editor.

![](https://github.com/coderofsalvation/expressa-admin-theme-zen/raw/master/screenshot.png)

## Features 

* touch-friendly interface (some inputs are slightly bigger than bootstrap default)
* WYSIGYWIG html editor (sceditor) when using `format="html"`
* language-file
* page-specific css-rules in `css/style.css`
* minimized padding for nested objects, to forms look more 'human'

## Usage 

This module is used by the backend:

    cd my-expressa-app 
    mkdir public
    cd public
    git clone https://github.com/coderofsalvation/expressa-admin-theme-zen.git admin

Now add these lines to `my-expressa-app/app.js`:

		// admin panel 
		app.get('/builds*', >(req, res, next){
			req.url = '/admin'+req.url
			next()
		})
		app.get('/admin/', >(req, res){
			var index = fs.readFileSync( __dirname+'/public/admin/admin.html').toString()
			res.set({"content-type": "text/html"})
			res.send( index )
			res.end()
		})
		app.use('/admin', expressa.admin() )  

		// serve website files
		app.use( express.static(__dirname+'/public') )  

