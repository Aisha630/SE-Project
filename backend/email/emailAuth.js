import nodemailer from "nodemailer";

export async function sendVerificationEmail(user) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'secondtimearound.gp2@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let verificationLink = `http://localhost:${process.env.PORT}/verify?token=${user.verificationToken}`;

    let mailOptions = {
        from: '"Second Time Around" <secondtimearound.gp2@gmail.com>',
        to: user.email,
        subject: 'Verify Your Email',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Welcome to Second Time Around!</h2>
            <p>Thank you for signing up. Please click the button below to verify your email address and activate your account.</p>
            <a href="${verificationLink}" style="background-color: #58A75B; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px; margin: 10px 0;">Verify Email</a>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}