const express = require('express');
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");


// Configurations
require('dotenv').config();
mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us14",
});


// constants
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;


    const listId = process.env.LIST_ID;
    const subscribingUser = {
        firstName,
        lastName,
        email
    };

    // async function run() {
    //     const response = await mailchimp.lists.addListMember(listId, {
    //         email_address: subscribingUser.email,
    //         status: "subscribed",
    //         merge_fields: {
    //             FNAME: subscribingUser.firstName,
    //             LNAME: subscribingUser.lastName
    //         }
    //     });

    //     console.log(response.status)

    //     console.log(
    //         `Successfully added contact as an audience member. The contact's id is ${response.id
    //         }.`
    //     );
    // }

    // run();

    mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    })
        .then(response => res.sendFile(__dirname + '/success.html'))
        .catch(error => res.sendFile(__dirname + '/failure.html'));
})


app.listen(PORT, () => console.log(`Server running @${PORT}`));