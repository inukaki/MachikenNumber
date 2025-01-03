import nodemailer from 'nodemailer';

// SMTPサーバの設定
const transporter = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  port: 465, // GmailのSMTPサーバのポート
  auth: {
    user: process.env.EMAIL!,
    pass: process.env.EMAIL_PASSWORD!,
  },
  maxConnections: 1,
});

// メール送信
export const sendEmail = async (subject: string, body: string, sendTo: string) => {
  const mailOptions = {
    from: `MachikenNumber <${process.env.EMAIL}>`,
    to: sendTo,
    subject,
    html: body,
  };

  // メール送信
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      throw new Error('メールの送信に失敗しました');
    }
  });
};
