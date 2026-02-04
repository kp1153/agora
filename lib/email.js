import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(orderDetails) {
  try {
    const { customerDetails, items, totalAmount, orderId } = orderDetails;

    const itemsList = items
      .map(item => `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('\n');

    const emailContent = `
नया ऑर्डर प्राप्त हुआ!

ऑर्डर ID: ${orderId}

ग्राहक विवरण:
नाम: ${customerDetails.name}
ईमेल: ${customerDetails.email || 'नहीं दिया'}
फोन: ${customerDetails.phone}

डिलीवरी पता:
${customerDetails.address}
शहर: ${customerDetails.city || 'नहीं दिया'}
राज्य: ${customerDetails.state || 'नहीं दिया'}
पिनकोड: ${customerDetails.pincode || 'नहीं दिया'}

ऑर्डर आइटम:
${itemsList}

कुल राशि: ₹${totalAmount}

भुगतान स्थिति: पूर्ण
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.PUBLISHER_EMAIL,
      subject: `नया ऑर्डर #${orderId} - ${customerDetails.name}`,
      text: emailContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Email भेजने में error:', error);
    return { success: false, error };
  }
}