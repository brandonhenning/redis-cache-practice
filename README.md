# Redis Caching Practice

## What this is: 
Just a simple Redis setup using Node.js. I wanted to test the difference between making an API request to Wikipedia using a normal GET request and retrieving that same information from a Redis session store. The difference can be seen by starting app.js and then making a request to http://localhost:3000/api/search?query= and then fill in a query of your choice such as 'Colorado'. 

In the developer tools on Chrome click on Network and notice the difference between storing the result in Redis for retrieval and having to make an additional GET request to the API. Redis is usually around 100 times faster to bring back the requested data! 

I need more practice but this was a good simple example of the performance gains to be had by utilizing Redis. 

### Tech used: 
- Node.js
- Redis
- Axios
- Express