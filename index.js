const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

//using postman to test

app.get('/api', (req, res)=> {
    res.send({
        success: '/api access OK!'
    })
})

app.post('/api/login', (req, res)=>{
    const user = { id: 7 }
    const token = jwt.sign({ user }, 'secret_key', { expiresIn: '30s' })
    console.log(token)
    res.json({
        token
    })
})

app.get('/api/protect', checkToken, (req, res)=> {
    jwt.verify(req.token, 'secret_key', (err, data)=> {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'this is /api/protect',
                data
            })
        }
    console.log(data)
    })
})

function checkToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.listen(3000, ()=> console.log('running....'))