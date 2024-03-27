import { Router } from 'express';
import { isValidPassword, generateJWToken, createHash } from '../dirname.js';
import userModel from '../models/user.model.js';
import passport from 'passport';

const router = Router();

router.get('/login', async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email: email});
        console.log('Usuario encontrado para login:');
        console.log(user);
        if(!user){
            console.warn("User doesn't exists with username: " + email);
            return res.status(204).send({error:'Not Found', message:'Usuario no encontrado con username: '+ email});
        }
        if(!isValidPassword(user, password)){
            console.warn("Invalid Credentials for User:" + email);
            return res.status(401).send({status:"error", error:'El usuario y la contraseña no coinciden'})
        }
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role:user.role    
        }
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);

        res.cookie('jwtCookieToken', access_token,{
            maxAge:60000,
            httpOnly: true //no expone Cookie
            // httpOnly:false Expone cookie
        })
        res.send({message:'Login Success!!!'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
});

//register
router.post('/register', passport.authenticate('register',{session:false}), async(req,res)=>{
    console.log('Registrando Users');
    res.status(201).send({status:'success', message:'usuario Creado'})
})


// router.get('/profile', passport.authenticate('current', {session:false}), (req,res)=>{
//     res.json({user:req.user})
// });

export default router