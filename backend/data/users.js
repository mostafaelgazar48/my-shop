const bcrypct = require('bcryptjs')

const users= [
    {
        name:'mariam',
        email:'mariam@gmail.com',
        password:bcrypct.hashSync('123456',10)
    },
    {
        name:'Admin',
        email:'admin@gmail.com',
        password:bcrypct.hashSync('123456',10),
        isAdmin:true
    }, {
        name:'mostafa',
        email:'mostafa@gmail.com',
        password:bcrypct.hashSync('123456',10)
    }
]
module.exports =users;