const SECRET_LUBEASY = "ESTE AQUI SERA A CHAVE, DOMINAS";
const SECRET_ACCOUNT_LUBEASY = "ESTE AQUI SERA A CHAVE, DOMINAS dfs";





/*var data = new Date();

console.log("getUTCHours: ", data.getUTCHours());
console.log("getUTCDay: ", data.getUTCDay());
console.log("getFullYear: ", data.getFullYear());
console.log("getDate: ", data.getDate());
console.log("getDay: ", data.getDay());
console.log("getHours: ", data.getHours());
console.log("getMilliseconds: ", data.getMilliseconds());
console.log("getMinutes: ", data.getMinutes());
console.log("getMonth: ", data.getMonth());
console.log("getSeconds: ", data.getSeconds());
console.log("getTime: ", data.getTime());
console.log("getTimezoneOffset: ", data.getTimezoneOffset());
console.log("getUTCDate: ", data.getUTCDate());
console.log("getUTCFullYear: ", data.getUTCFullYear());
console.log("getUTCMonth: ", data.getUTCMonth());
console.log("getUTCMilliseconds: ", data.getUTCMilliseconds());
console.log("getUTCSeconds: ", data.getUTCSeconds());
console.log("getUTCMinutes: ", data.getUTCMinutes());*/



/*var moment = require('moment');


console.log("moment", moment().format('YYYY-DD-MM HH:mm:ss'))*/

//var today = new Date();

//console.log("L: ",today.getFullYear()+"-"+(today.getUTCMonth()+1)+"-"+today.getUTCDay()+" "+today.getUTCHours()+":"+today.getUTCMinutes()+":"+today.getUTCSeconds());


module.exports = {

    sendEmail: function sendEmail(from, to, subject, text, html, callback) {
        const nodemailer = require("nodemailer");

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oauth2',
                user: 'malaferneque16@gmail.com',
                clientId: "150300311035-oj0tvvlfj6bgvemku3gc5p8rs9g6vjvh.apps.googleusercontent.com",
                clientSecret: "IiUJuCWOo3oC6PeS6Ba_etW0",
                refreshToken: "1/HpKZiyhJPqnhYRrdIOtlDmjKbN7uagiNW9cfotQVqeY",
            },
        });

        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        transporter.sendMail(mailOptions, callback);
    },
    SECRET_LUBEASY: SECRET_LUBEASY,
    SECRET_ACCOUNT_LUBEASY: SECRET_ACCOUNT_LUBEASY
};
