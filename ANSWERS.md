Mention two parts of Express that you learned about this week.

We learned about making the server file cleaner by using routers and exporting them. Also learned to use and create our own middleware.

Describe Middleware?

Middleware is a function that is executed when a route includes it, or when we have server.use(middleware). Think of middleware as a function that executes after a request is sent but before the route itself processes it. A middleware can read and manipulate the request or response, or send a response and cancel the request. Etc.

Describe a Resource?

Resource could be a file like an image, a html file, an endpoint..etc

What can the API return to help clients know if a request was successful?

HTTP status codes are made just for the purpose of describing at a glance what the result is of a request. There is a 200 code to signify a successful operation. You have 404s for telling the browser a resource wasn't found. You have 500 errors to signify a server issue, and you have a 403 code to tell the browser it isn't authorized.

How can we partition our application into sub-applications?

We can declare and define routers in seperate files and then bring them into other files for the server to use. Like having a userRoutes file for user API endpoints, and then another file for different endpoints.