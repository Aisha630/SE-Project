import juice from "juice";
import fs from "fs";

export function bidEmail(email, product) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>A bid has been placed on your product!</h2>
            </div>
            <div class="email-body">
                <p>A bid has been placed on your product with the following details:</p>
                <ul>
                    <li>Name: ${product.name}</li>
                    <li>Bidder: ${product.buyerUsername}</li>
                    <li>Bid: ${product.currentBid}</li>
                </ul>
            </div>
            <div class="email-footer">
                <p>Thank you for using Second Time Around!</p>
                <p>Best regards,</p>
                <p>The Second Time Around Team</p>
            </div>
        </div>
    `;
  html = juice.inlineContent(html, css);

  console.log(email);
  return {
    from: '"Second Time Around" <secondtimearound.gp2@gmail.com>',
    to: email,
    subject: "Bid placed",
    html: html,
  };
}
