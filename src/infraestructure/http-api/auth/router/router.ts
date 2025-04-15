import { AuthClt, authApp } from "../../../dependences/auth.dependences";
import 'dotenv/config';
import { validationField, validationJWT } from "../../../../middleware";
import express from "express";
import { check } from "express-validator";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { AuthMiddleware } from "../../../../middleware";
const rAuth = express.Router();
const googleStrategy = passportGoogle.Strategy;
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/api/v1/p/auth/redirect/google',
    scope: ['profile']
}, async (token, refreshToken,  profile, done) => {
    const existEmail = await authApp.getByEmail(String(profile._json.email), 'local');    
    if (existEmail?.idUser) return done(null, { user: {}, msg: 'Ya existe un usuario con ese correo' }); 
    const response = await AuthClt.loginWithGoogle(profile._json as any);
    done(null, { user: response, msg: 'Bienvenido' });    
}));

rAuth.get('/refreshToken', validationJWT, AuthClt.refreshToken.bind(AuthClt));

rAuth.use(passport.initialize());
rAuth.post('/login',  
    [
        check('auth.pass', 'El pass es obligatorio').not().isEmpty(),
        validationField 
    ],AuthClt.auth.bind( AuthClt ) as any);

rAuth.post("/register", [
    check('auth.name', 'El nombre es obligatorio').not().isEmpty(),
    check('auth.lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('auth.email', 'El email es obligatorio').not().isEmpty(),
    check('auth.gender', 'El genero es obligatorio').not().isEmpty(),
    check('auth.phoneNumber', 'El numero telefonico es obligatorio').not().isEmpty(),       
    check('auth.city', 'La ciudad es obligatorio').not().isEmpty(),        
    check('auth.state', 'El estado es obligatorio').not().isEmpty(),        
    check('auth.nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('auth.pass', 'El pass es obligatorio').not().isEmpty(),    
    check('auth.code', 'El codigo es obligatorio').not().isEmpty(),   
    validationField    
], AuthMiddleware.existEmail.bind( AuthMiddleware ), AuthMiddleware.verifyCode.bind( AuthMiddleware ), AuthClt.addUser.bind(AuthClt));

rAuth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'],
    session: false
 }));

rAuth.get("/redirect/google", passport.authenticate("google",{
    scope: ['profile', 'email'],
    session: false,    
}), (req, res) => {
    const user = req.user as any;
    res.send(` <script>
      window.opener.postMessage(
        { token: "${user.user.token}",
            msg: "${user.msg}"
        },
        "http://localhost:4900"
      );
      window.close();
    </script>`);
});

rAuth.post("/send-code", [
    check('auth.email', 'El email es obligatorio').not().isEmpty(),
    validationField
],AuthClt.sendCode.bind(AuthClt));



rAuth.post("/verify-email", AuthClt.existEmail.bind(AuthClt));

rAuth.post("/send-code-reset", [
    check('auth.email', 'El email es obligatorio').not().isEmpty(),
    validationField
], AuthMiddleware.noExistEmail.bind( AuthMiddleware ) ,AuthClt.sendCode.bind(AuthClt));

rAuth.post("/exist-code", [
    check('auth.code', 'El codigo es obligatorio').not().isEmpty(),
    check('auth.email', 'El email es obligatorio').not().isEmpty(),
    validationField
], AuthClt.existCode.bind(AuthClt));

rAuth.post("/update-pass", [
    check('auth.email', 'El email es obligatorio').not().isEmpty(),
    check('auth.pass', 'El pass es obligatorio').not().isEmpty(),
    check('auth.code', 'El codigo es obligatorio').not().isEmpty(),
    validationField
], AuthMiddleware.verifyCode.bind( AuthMiddleware ), AuthClt.updatePass.bind(AuthClt));

export {
    rAuth
}
