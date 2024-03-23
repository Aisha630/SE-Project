import juice from "juice";
import fs from "fs";

export default function authEmail(user, verificationLink) {
  const css = fs.readFileSync("./emailStyles.css");
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Congratulations on Your Sale!</h2>
            </div>
            <div class="email-body">
                <h2>Welcome to Second Time Around!</h2>
                <p>Thank you for signing up. Please click the button below to verify your email address and activate your account.</p>
                <a href="${verificationLink}" class="verify-button">Verify Email</a>
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
