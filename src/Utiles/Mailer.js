import { createTransport } from 'nodemailer';

const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER || "iridescentcosting@gmail.com",
        pass: process.env.MAIL_PASSWORD || "qowiqsbixattwtmw",
    },
}

const transporter = createTransport(MAIL_SETTINGS);

export async function sendMailforVerification(params) {
    console.log(params.to, "paramsto")
    try {
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.email,
            subject: 'Login verification',
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Costing</h2>
          <h4>OTP for Login verification ✔</h4>
          <h4>OTP for ${params.username} </h4>

          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
        });
        return info;
    } catch (error) {
        console.log(error);
        return false;
    }
}