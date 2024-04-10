import juice from "juice";
import fs from "fs";

export function soldEmail(seller, buyer, product) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Sold!!</h2>
            </div>
            <div class="email-body">
                <p>A Sale has occured via auction!</p>
                <ul>
                    <li>Product name: ${product.name}</li>
                    <li>Seller: ${seller.username}</li>
                    <li>Buyer: ${buyer.username}</li>
                    <li>Sold at: Rs. ${product.currentBid}</li>
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

  return {
    from: '"Second Time Around" <secondtimearound.gp2@gmail.com>',
    to: buyer.email,
    subject: "You won the Auction!",
    cc: seller.email,
    html: html,
  };
}

export function notSoldEmail(seller, product) {
  const css = fs.readFileSync("./util/emailStyles.css").toString();
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>No one bought your product</h2>
            </div>
            <div class="email-body">
                <p>Your product ${product.name} was not bidded on by anyone. You can go to seller dashboard and delete or reopen.</p>
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
    to: seller.email,
    subject: "No one bid",
    html: html,
  };
}