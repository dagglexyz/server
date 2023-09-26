<p align="center">
  <a href="https://beta.daggle.xyz">
    <img src="https://i.ibb.co/4JLkjfQ/Group-5.png" alt="Daggle logo" />
  </a>
  </p>

<h1 align="center">Daggle Server⚙️<br>Nodejs server with Indexer📇</h1>

A NodeJS server utilizing inbuilt wrappers to power https://bet.daggle.xyz.


## **Follow the below steps to run it locally.**
### Server⚙️

1. Clone Repo.
> $ git clone https://github.com/leostelon/dagglexyz/server server
>  $ cd server
2. Add the .env file in the root directory. Add the below variables and replace them with your tokens, respectively.

		  SPHERON_TOKEN= < spheron-webapp-token > [Know More](https://docs.spheron.network/rest-api/#creating-an-access-token)
		  MONGODB_URL=mongodb://127.0.0.1:27017/daggle
		  ALLOWED_DOMAINS="http://localhost:3002"
		  JWT_SECRET= < your-secret >
	  

3. Run server!
> $ npm run start
