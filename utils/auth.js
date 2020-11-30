export const authorize = (req, res, next) =>{
    let token = req.get("authorization");
    if(!token) return res.status(401).send("You are not authenticated");
  
    jwt.verify(token, process.env.JWT_TOKEN, (err, token) =>{
      if(err) return res.status(401).send(err.message);
      let user = User.getUserFromUsername(token.username);
      if(!user) return res.status(401).send("User not found");
      next();
    });
  };