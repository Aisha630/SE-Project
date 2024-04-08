import juice from "juice";
import fs from "fs";

export default function passwordResetEmail(user, resetToken) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Reset Your Account Password</h2>
            </div>
            <div class="email-body">
                <p>You have received this email because a password reset request for your account was received.</p>
                <p>Enter the following password reset code:</p>
                <div class="reset-token">${resetToken}</div>
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
    subject: "Reset Password",
    html: html,
  };
}
