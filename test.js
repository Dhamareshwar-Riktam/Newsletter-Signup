const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us14",
});


const listId = process.env.LIST_ID;
const subscribingUser = {
    firstName: "Prudence",
    lastName: "McVankab",
    email: "prudence.mcvankab@google.com"
};

async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    });

    console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id
        }.`
    );
}

run();