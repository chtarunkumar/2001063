const express = require('express')
// Let's us access the file structure of the app itself
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

const cookieParser = require('cookie-parser')
const session = require('cookie-session')

const app = express()

const API_URL = "https://smarta-marta-backend.herokuapp.com"

/* MIDDLEWARES */
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))
// BODY PARSER - Let's us read the body of JSON responses
app.use(bodyParser.json())
// COOKIE-PARSER - Let's us use and read Cookies
app.use(cookieParser())
// COOKIE-SESSION - Let's us use sessions. Set's the session's
// key to a temporary, random value that will be overwritten
app.use(session({ name: 'jwt', keys: ['Temporary value'] }))

// // An API endpoint that returns the word, "Hi y'all!"
// app.get('/api/sayhello', (req, res) => {
//     let salutation = "Hi y'all!"

//     // This line spits whatever is above onto the web page
//     res.json(salutation)
//     // Just a simple console.log() in the app's terminal
//     console.log("I told 'em hello!")
// })

// AUTHENTICATION ROUTE
app.post('/api/v1/users', async (req, res) => {
    const loginRes = await axios({
        method: "POST",
        url: `${API_URL}/v1/users`,
        data: req.body
    }).then(resp => {
        if (resp.data.errors) {
            res.send(resp.data)
        } else {
            req.session.jwt = resp.data.data.user.authentication_token
            return res.send(resp.data)
        }

    })
        .catch(err => {
            return res.send(err)
        })
})

app.post('/api/v1/sessions', async (req, res) => {
    const loginRes = await axios({
        method: "POST",
        url: `${API_URL}/v1/sessions`,
        data: req.body
    }).then(resp => {
        if (resp.data.errors) {
            res.send(resp.data)
        } else {
            req.session.jwt = resp.data.data.user.authentication_token
            req.session.email = resp.data.data.user.email
            req.session.id = resp.data.data.user.id
            return res.send(resp.data)
        }
    })
        .catch(err => {

            res.send(err)
        })

})

app.delete('/api/v1/sessions', async (req, res) => {
    await axios({
        method: 'DELETE',
        url: `${API_URL}/v1/sessions`,
        data: req.body
    }).then(resp => {
        res.send(resp.data)
        req.session = null

    })
        .catch(err => console.log(err))

})

app.delete('/api/v1/quick_picks', async (req, res) => {
    console.log('in delete quick pick')
    await axios({
        method: 'DELETE',
        url: `${API_URL}/v1/quick_picks/${req.body.id}`,
        data: ({
            user_email: req.session.email,
            user_token: req.session.jwt
        })
    }).then(resp => res.send({ status: 200 })).catch(err => console.log(err))
})

app.post('/api/v1/quick_picks', async (req, res) => {
    await axios({
        method: 'POST',
        url: `${API_URL}/v1/quick_picks`,
        data: ({
            ...req.body,
            user_email: req.session.email,
            user_token: req.session.jwt
        })
    }).then(resp => res.send(resp.data)).catch(err => console.log('error'))
})

app.patch('/api/v1/quick_picks', async (req, res) => {
    await axios({
        method: 'PATCH',
        url: `${API_URL}/v1/quick_picks/${req.body.id}`,
        data: ({
            ...req.body,
            user_email: req.session.email,
            user_token: req.session.jwt
        })
    }).then(resp => res.send(resp.data)).catch(err => console.log('error'))
})

// REGISTRATION ROUTE
// app.post('/api/auth/local/register', async (req, res) => {
//     const signupRes = await axios({
//         method: "POST",
//         url: `${API_URL}/auth/local/register`,
//         data: req.body
//     })

//     // Destructures the response we received from the API from
//     // logging in / sending in our credentials.
//     const { jwt, user } = signupRes.data
//     // Sets the session's value to the JWT
//     req.session.jwt = jwt

//     // The data we're sending back to the frontend.
//     // Now, we can display routes based on what's in the site's
//     // user object.
//     const data = { user }
//     res.send(data)
// })

app.get('/api/userlogin', async (req, res) => {
    console.log(req.session.jwt)
    if (req.session.jwt) {
        console.log('yes Token')

        await axios({
            method: 'GET',
            url: `${API_URL}/v1/quick_picks`,
            data: ({

                user_email: req.session.email,
                user_token: req.session.jwt
            })
        }).then(resp => {
            res.send(resp.data)


        })
            .catch(err => console.log('error'))

    } else {
        console.log('no Token')
    }
})



// app.get('/api/sales/logout', (req, res) => {
//     req.session = null
//     res.send({ status: 200 })
// })

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Names the port that will be used for prod and local development
const port = process.env.PORT || 5000
app.listen(port)

console.log('Your app is running on port ' + port)
