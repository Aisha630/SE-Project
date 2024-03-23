import juice from "juice";
import fs from "fs";

export default function checkoutEmail(seller, buyer, product) {
  const css = fs.readFileSync("./emailStyles.css");
  let html = `
        <div class="email-container">
            <div class="email-header">
                <h2>Congratulations on Your Sale!</h2>
            </div>
            <div class="email-body">
                <p>Hello ${seller.name},</p>
                <p>Your product has just been purchased! Here are the details of the sale:</p>
                <ul>
                    <li>Product name: <strong>${product.name}</strong></li>
                    <li>Price: <strong>${product.price}</strong></li>
                    <li>Buyer's Name: <strong>${buyer.name}</strong></li>
                </ul>
                <p>The buyer has been CC-ed in this email so that you two may coordinate the payment and delivery.</p>
                <p>Please make sure to change the status of this product to "Sold" in your Dashboard once the payment is complete.<p/>
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
    cc: buyer.email,
    subject: "Product Checkout Notification",
    html: html,
  };
}
