// require("dotenv").config();
const nodemailer = require("nodemailer");


const user = "wilando45@gmail.com";
const pass = "whatyourhopes";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hallo ${name}</h2>
        <p>Terima Kasih Telah Mendaftar. Silahkan Konfirmasi Email dengan mengakses link dibawah</p>
        <a href=http://localhost:8000/auth/verify/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};