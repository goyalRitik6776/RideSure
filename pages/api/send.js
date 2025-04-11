import { Resend } from "resend";
import EmailTemplate from "../../components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    const { data, error } = await resend.emails.send({
      from: "Ridesure <onboarding@resend.dev>",
      to: [process.env.NEXT_PUBLIC_MY_EMAIL],
      subject: "New Message from Ridesure",
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
