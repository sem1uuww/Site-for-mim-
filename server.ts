import express from "express";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not configured on the server.");
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/contact", async (req, res) => {
    const { service, propertyType, city, district, rooms, budget, name, phone, telegram, email } = req.body;
    
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error("ADMIN_EMAIL is not set");
      return res.status(500).json({ error: "Server configuration error: Admin email not configured." });
    }

    try {
      const resend = getResend();
      const { data, error } = await resend.emails.send({
        from: 'Shvedova Estate <onboarding@resend.dev>',
        to: [adminEmail],
        subject: `Новая заявка: ${service || 'Консультация'} - ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #BA9D49;">Новая заявка с сайта Shvedova Estate</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Услуга:</strong> ${service || 'Не указано'}</p>
            <p><strong>Тип объекта:</strong> ${propertyType || 'Не указано'}</p>
            ${city ? `<p><strong>Город:</strong> ${city}</p>` : ''}
            <p><strong>Район/ЖК:</strong> ${district || 'Не указано'}</p>
            ${rooms ? `<p><strong>Комнат:</strong> ${rooms}</p>` : ''}
            <p><strong>Бюджет:</strong> ${budget || 'Не указано'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <h3 style="color: #2C2C2C;">Контактные данные клиента:</h3>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Telegram:</strong> @${telegram || 'Не указано'}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
            <div style="margin-top: 40px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 2px;">
              Shvedova Private Estate • Система уведомлений
            </div>
          </div>
        `,
      });

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, id: data?.id });
    } catch (err) {
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
