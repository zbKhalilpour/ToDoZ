const controller = require ('./../controller')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken');
module.exports = new (
    class extends controller {
        async register (req,res){
            console.log(req.body);
            
            let user=await this.User.findOne({email:req.body.email})
            console.log("yes")
            if(user){
                console.log("yes1")
                return this.response({
                    res, code:400, message:'This user already registerd'
                })
            }

            // const {email, name, password}=req.body
            // user = new this.User({email,name,password})

            user= new this.User(_.pick(req.body, ["email","name","password"]))
            const salt=await bcrypt.genSalt(10)
            user.password= await bcrypt.hash(user.password, salt)

            await user.save()
            this.response({
                res,
                message:"you registered successfully",
                // data: user
                data: _.pick(user, ["_id","name","email"])
            })

            //res.send({message:`hello ${req.body.email} your user was registered`}) 
            //  res.send('register')
        }
        async login (req,res){
           
            const user=await this.User.findOne({email:req.body.email})
            console.log(user)
            if(!user){
                console.log("login2")
                return this.response({
                    res, code:400, message: "invalid email or password"
                })
            }
            const isValid=await bcrypt.compare(req.body.password, user.password)
            if(!isValid){
                return this.response({
                    res, code:400, message: "invalid email or password"
                })
            }
            // const jwt_key="xdctyvtfg78iokjbhgtfr56uioikjhgvfcdesrty6789ol"
            const token = jwt.sign({_id: user.id}, config.get("jwt_key"))
            this.response({
                res, message: "successfuly logged in", data: {token}
            })

            // res.send('login')
        }
    }
)() 