const express = require("express");
const AuthRouter = express.Router();
const Auth = require("../modules/auth");

const bcrypt = require("bcrypt"); // Bcript import for password protect

AuthRouter.get("/users", async (request, response) => {
  const users = await Auth.findAll();
  response.status(200).json(users);
});

AuthRouter.post("/register", async (request, response) => {
  const UserDetails = request.body;
  const { email, password } = UserDetails;
  try {
    const user = await Auth.findOne({
      where: {
        email: email,
      },
    });

    if (user !== null) {
      return response
        .status(400)
        .send({ msg: "User already exists", status: "error" });
    } else {
      bcrypt.hash(password, 8, async (err, protected_password) => {
        if (!err) {
          UserDetails.password = protected_password;
          let NewUser = new Auth(UserDetails);
          NewUser.save();
          response
            .status(200)
            .send({ msg: "User has been created", status: "success" });
        } else {
          console.log(err);
          response.status(400).send({
            msg: "Something went wrong please try again",
            status: "error",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    response.status(400).send({
      msg: "Something went wrong please try again",
      status: "error",
    });  }
});


const correctPassword = (enteredPassword, originalPassword) => {
  return bcrypt.compare(enteredPassword, originalPassword, (err, res) =>{
    return res;
  });
}
AuthRouter.post("/login", async (request, response) => {

  const LoginUser = request.body;
  const { email  } = request.body;
  
  const user = await Auth.findOne({
    where: {
      email: email,
    },
  });

  if(user == null){
    response.status(400).send({ msg: "User not found", status: "error" });
    return
  }

  await Auth.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    let  au = correctPassword(LoginUser.password, user.password);
    response.send({ msg: "User login", status: "success" });
  })
  .then((authenticated) => {
    response.send({authenticated, "L":"l"});
  })
  .catch((error) => {
    response.status(400).send({
      msg: "Something went wrong please try again",
      status: "error",
    });
  
  });

});

module.exports = AuthRouter;
