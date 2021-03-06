const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

//  POST '/signup'

router.post(
  "/signup",
  // revisamos si el user no está ya logueado usando la función helper (chequeamos si existe req.session.currentUser)
  isNotLoggedIn(),
  // revisa que se hayan completado los valores de username y password usando la función helper
  validationLoggin(),
  async (req, res, next) => {
    const { username, password,name, lastName  } = req.body;

    try {
      // chequea si el username ya existe en la BD
      const usernameExists = await User.findOne({ username }, "username");
      // si el usuario ya existe, pasa el error a middleware error usando next()
      if (usernameExists) return next(createError(400));
      else {
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass, name, lastName  });
        
        req.session.currentUser = newUser;
        res
          .status(200) 
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/login",
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      
      const user = await User.findOne({ username });
      
      if (!user) {
        next(createError(404));
      }
      
      else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        req.session.save()
        console.log(req.session.id)
        res.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

// POST '/logout'

// revisa si el usuario está logueado usando la función helper (chequea si la sesión existe), y luego destruimos la sesión
router.post("/logout", isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  //  - setea el código de estado y envía de vuelta la respuesta
  res
    .status(204) //  No Content
    .send();
  return;
});

// GET '/private'   --> Only for testing

// revisa si el usuario está logueado usando la función helper (chequea si existe la sesión), y devuelve un mensaje
router.get("/private", isLoggedIn(), (req, res, next) => {
  //  - setea el código de estado y devuelve un mensaje de respuesta json
  res
    .status(200) // OK
    .json({ message: "Test - User is logged in" });
});

// GET '/me'

// chequea si el usuario está logueado usando la función helper (chequea si existe la sesión)
router.get("/me", isLoggedIn(), (req, res, next) => {
  // si está logueado, previene que el password sea enviado y devuelve un json con los datos del usuario (disponibles en req.session.currentUser)
  req.session.currentUser.password = "*";
  res.json(req.session.currentUser);
});

module.exports = router;
