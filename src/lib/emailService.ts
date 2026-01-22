import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
  apiKey: import.meta.env.VITE_MAILJET_API_KEY,
  apiSecret: import.meta.env.VITE_MAILJET_SECRET_KEY
});

/**
 * Sends a test email using Mailjet.
 * @param toEmail The recipient's email address.
 * @returns A promise that resolves when the email is sent.
 */
export const sendTestEmail = async (toEmail: string) => {
  try {
    const request = await mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": "noreply@uhbccs.com", // You should verify this sender in Mailjet
              "Name": "UHBC CS Resources Hub"
            },
            "To": [
              {
                "Email": toEmail,
                "Name": "Student"
              }
            ],
            "Subject": "Test Email from UHBC CS Hub",
            "TextPart": "Hello! This is a test email from your Supabase/Mailjet integration.",
            "HTMLPart": "<h3>Welcome to UHBC CS Resources Hub!</h3><p>This is a test email to verify your custom email service is working.</p>",
            "CustomID": "AppTestEmail"
          }
        ]
      });
    
    console.log("Email sent successfully:", request.body);
    return { success: true, data: request.body };
  } catch (error: any) {
    console.error("Error sending email:", error.statusCode, error.message);
    return { success: false, error: error.message };
  }
};
