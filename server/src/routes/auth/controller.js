const controller = require ('./../controller')

module.exports = new (
    class extends controller {
        async register (req,res){
            console.log(req.body);
            res.send({message:`hello ${req.body.email} your user was registered`}) 
            
            // res.send('register')
        }
        async login (req,res){
            console.log(this)
            res.send('login')
        }
    }
)() 