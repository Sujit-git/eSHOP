import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'chetan matkar',
        email: 'chetan@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Chetan matkar',
        email: 'chetya@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;