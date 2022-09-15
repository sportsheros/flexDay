const redis = require('redis');
const client = redis.createClient()
const uuid = require('uuid')
const Responder = require('@service/responder')


module.exports = {

   /* * 
    * @api {post} api/user/create
 * @apiDescription api is used to create user
 * */
   async CreateUser(req, res) {
    try{
      const { name, email, dob, address } = req.body;     
      let users = await connectClient();
      if (Object.values(users).find((user) => email == user.email)) {
            await client.disconnect();
            return Responder.respondWithCustomError(req,res,'Email already Exists',users.email);        
      }
            const id = uuid.v4();
            const newUser = { name, email, dob, address, id };
            users[id] = newUser;
            const result = await client.set("users", JSON.stringify(users));
            await client.disconnect()
            return Responder.respondWithSuccess(req, res, result, 'user created successfully');  
  }   
  catch (error) {
    return Responder.respondWithError(req, res, error);
  }
    },

  /* *
 * @api {get} api/user/s-list
 * @apiDescription api to fetch  a list of all users
 * */

  async GetUserLists(req, res) {
    try {   
      let users = await connectClient();
      await client.disconnect()
      const result = users;
      return Responder.respondWithSuccess(req, res, result, 'orders fetch successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }

  },
    /* *
 * @api {get} api/user/get-user
 * @apiDescription api to fetch  a user information
 * */

    async GetUserById(req, res) {
      try {   
        const {id}= req.query;
        if(!id) return Responder.respondWithValidationError(req,res,"please provide user id");
        const users = await connectClient();        
        if(!users[id]) {
          await client.disconnect();
          return Responder.respondWithNotFound(req,res,'No Record Exists');
        }
        await client.disconnect();  
        const result=users[id] ;     
        return Responder.respondWithSuccess(req, res, result, 'fetch successfully'); 
      }
      catch (error) {
        return Responder.respondWithError(req, res, error);
      }
  
    },
   /* *
 * @api {get} api/user/remove
 * @apiDescription api to remove  a user record
 * */

   async RemoveUser(req, res) {
    try {   
      const {id}= req.query;
      if(!id) return Responder.respondWithValidationError(req,res,"please provide user id");
      let users = await connectClient();
      if (users && !users[id]) {
        await client.disconnect()
        return Responder.respondWithNotFound(req,res,'No Record Exists');
    }
    delete users[id]
    await client.set("users", JSON.stringify(users));
    await client.disconnect()
    return Responder.respondWithSuccess(req, res, [], 'Delete successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }

  },
 /* *
 * @api {get} api/user/update
 * @apiDescription api to update user information
 * */
 async UpdateUser(req, res) {
  try{
    const { name, email, dob, address, id } = req.body;
    if(!id) return Responder.respondWithValidationError(req,res,"please provide id"); 
    let users = await connectClient();
    if(users && !users[id]) {
      await client.disconnect();
      return Responder.respondWithNotFound(req,res,`User ${id} not found`);
    }
    let user = users[id];
            users[id] = {
                id,
                name: name ? name : user.name,
                email: email ? email : user.email,
                dob: dob ? dob : user.dob,
                address: address ? address : user.address
            }
            await client.set("users", JSON.stringify(users));
            await client.disconnect()
            const result = users[email];
    return Responder.respondWithSuccess(req, res, result, 'User Update successfully');  
 }
catch (error) {
  return Responder.respondWithError(req, res, error);
}
  },
  };

  const connectClient = async()=>
  {
    await client.connect()
    let users = await client.get("users")
   return  users ? JSON.parse(users) : false;
  }
 