const controller = require ('./../controller')

module.exports = new (
    class extends controller {
        async register (req,res){
            
            res.send('register')
        }
        async login (req,res){
            console.log(this)
            res.send('login')
        }
    }
)() 