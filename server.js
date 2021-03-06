const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ivaylo',
        database: 'smart-brain'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    db.select('email', 'hashedPass').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hashedPass);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            }
            else{
                res.status(400).json('Wrong username or password')
            }
        })
        .catch(err => res.status(400).json('Wrong username or password'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, 8);
    db.transaction(trx => {
        trx.insert({
                hashedPass: hashedPass,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.callback)
            })
            .catch(err => res.status(400).json('Unable to register'));
    })
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries count.'))
})

app.listen(3001, () => {

});