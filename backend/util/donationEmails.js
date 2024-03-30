import juice from "juice";
import fs from "fs";

export function donationApproval(donar, acceptedDonee, product) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Your donation request has been approved!</h2>
            </div>
            <div class="email-body">
                <p>Here's the details of the donation:</p>
                <ul>
                    <li>Product Name: ${product.name}</li>
                    <li>Donar: ${donar}</li>
                </ul>
                <p>Please coordinate the delivery amongst yourself. The donar has been CCed in this email for your convenience.</p>
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
    to: acceptedDonee.email,
    cc: donar.email,
    subject: "Donation Approval",
    html: html,
  };
}

export function donationRejection(rejectedDonee, product) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>We're sorry :(</h2>
            </div>
            <div class="email-body">
                <p>Unfortunately, the donar did not approve your donation request for the following product:</p>
                <ul>
                    <li>Product name: ${product.name}</li>
                </ul>
                <p>We apologise if you feel let down. Please feel free to request for other donation items.</p>
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
    to: rejectedDonee,
    subject: "Sale occured",
    html: html,
  };
}
