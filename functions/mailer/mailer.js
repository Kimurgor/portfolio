var nodemailer = require('nodemailer');

var smtp_host = process.env.SES_SMTP
var smtp_user = process.env.SES_USER
var smtp_pass = process.env.SES_PASS


var transporter = nodemailer.createTransport({
    host: smtp_host,
    port: 465,
    secure: true,
    auth: {
        user: smtp_user,
        pass: smtp_pass
    }
});

exports.handler = async function (event, context, callback) {

    var { name, first_name, last_name, phone, email, message, company, subject, love, details } = JSON.parse(event.body)
    var mailOptions = {}
    let toEmail = "info@globalsouthclimate.org"
    if (subject) {
        toEmail = String(subject).match(/Support/i) ? "info@globalsouthclimate.org" : toEmail
    }
    console.log({ toEmail, subject })
    var mailOptions1 = {
        from: 'GLOBAL SOUTH CLIMATE INITIATIVES FORM <info@globalsouthclimate.org>',
        to: toEmail,
        subject: 'New Message From ' + first_name,
        html: `Name: ${first_name} ${last_name} <br>
        Email Address: ${email} <br>
        Phone Number: ${phone} <br>
        <b>Message: </b> ${message}`
    };
    var mailOptions2 = {
        from: 'GLOBAL SOUTH CLIMATE INITIATIVES WEB FORM <info@globalsouthclimate.org>',
        to: toEmail,
        subject: 'Support Request from ' + name,
        html: `Name: ${name} <br>
        Email Address: ${email} <br>
        Phone Number: ${phone} <br>
        Phone Number: ${company} <br>
        More Info: ${details} <br>
        <b>Subject: </b> ${subject}`
    };

    if (first_name) {
        mailOptions = mailOptions1
    } else {
        mailOptions = mailOptions2
    }

    // context.succeed({statusCode: 302, location: event.headers.origin+"thank-you"});

    const text = mailOptions.html

    const spam = () => {
        return text.includes("http") || text.includes("nude") || text.includes("sex") || text.includes("fuck") || text.includes("porn") || love || !name || !message || !email
    }

    // if (spam()) {
    //     callback(null, {
    //         statusCode: 500,
    //         body: `<h1>Internal Server Error.</>`
    //     });
    // } else {
    try {
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        callback(null, {
            statusCode: 200,
            body: `<b>Redirecting...</b> <br> Go <a href="/">Back</a> <script>
                  setTimeout(() => {
                      window.location = "${event.headers.origin}"
                  }, 2000);
                </script>`
        });
    } catch (error) {
        console.log(error)
        callback(null, {
            statusCode: 500,
            body: `There was an error`
        });
    }

    // }

}