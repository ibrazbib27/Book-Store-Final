# Barebones React/TypeScript/Express/Sass Boilerplate
This project is a starting point for a TypeScript based React app that also has a local API server using express.

There are 2 different Webpack configurations. One for the server and one for the client.

## Server
The server build process compiles the TypeScript files found in `/src/server` into a single bundled JavaScript file located in the `/dist` directory.

## Client
The client build process compiles the React app located in `/src/client` into a bundled located at `/public/js/app.js`.

The client configuration will also build the Sass files found at `/src/client/scss`. The `index.tsx` imports the `app.scss` file which already includes an import for Bootstrap.

## Running the project
In order to run the server, use `npm run dev`, and the server will start on port 3000 (http://localhost:3000). 

Webpack will watch the files. Once you save a file, you can refresh your browser to ensure you got the updated client files. If you only change server files, you *shouldn't* need to refresh.


## Important Notes
I blatantly excluded the server/config directory to git for security and privacy purposes.
In my config directory I had only one file named 'index.ts' and in that file I stored my 'mysql'
configuration data and a secret code. it resembles the following format:

export default { <br />
&emsp;&emsp;mysql: {<br/>
&emsp;&emsp;&emsp;&emsp;host: '',<br/>
&emsp;&emsp;&emsp;&emsp;port: num, <br/>
&emsp;&emsp;&emsp;&emsp;database: '',<br/>
&emsp;&emsp;&emsp;&emsp;user: '',<br/>
&emsp;&emsp;&emsp;&emsp;password: '',<br/>
&emsp;&emsp;&emsp;&emsp;connectionLimit: num <br/>
&emsp;&emsp;},<br/>
&emsp;&emsp;auth:{<br/>
&emsp;&emsp;&emsp;&emsp;secret: ''<br/>
&emsp;&emsp;}<br/>
};<br/>

