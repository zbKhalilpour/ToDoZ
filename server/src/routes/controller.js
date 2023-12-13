const autoBind=require('auto-bind')
const {validationResult} = require('express-validator')
const User=require('./../modeles/users')

module.exports = class {
    constructor(){
        autoBind(this)
        this.User=User
    }

    validationBody(req,res){
        const result = validationResult(req)
        const errors = result.array()
        const message = []
        if (!result.isEmpty()) { 
            errors.forEach(err=>message.push(err.msg))
            res.status(400).json({
                message : 'validation error',
                data : message
            })
            return false
        }
        return true
    }

    validate(req,res,next){
        if (!this.validationBody(req,res)) {
            return
        }  
        next()
    }

    response({res, message, code=400, data={}}){
        res.status(code).json({
            message,
            data
        })
    }
}