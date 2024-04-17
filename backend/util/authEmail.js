import juice from "juice";
import fs from "fs";

export default function authEmail(user, verificationToken) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Welcome to Second Time Around!</h2>
            </div>
            <div class="email-body">
                <p>Thank you for signing up. Please enter the following verification code on our page:</p>
                <div class="reset-token">${verificationToken}</div>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="email-footer">
                <p>Thank you for using Second Time Around!</p>
                <p>Best regards,</p>
                <p>The Second Time Around Team</p>
            </div>
        </div>
    `;
  html = juice.inlineContent(html, css);

  return {
    from: '"Second Time Around" <secondtimearound.gp2@gmail.com>',
    to: user.email,
    subject: "Verify Your Email",
    html: html,
  };
}
