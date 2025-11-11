import { NextRequest } from 'next/server';
import { gmailTransporter } from '@/lib/emailTransporter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, datetime, code, codeFound } = body;

    if (!email || !phone || !datetime) {
      return Response.json(
        { success: false, message: 'Missing required fields: email, phone, datetime' },
        { status: 400 }
      );
    }

    // Use pre-configured Gmail transporter
    const transporter = gmailTransporter;

    // Send email
    const mailOptions = {
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thông tin liên hệ từ khách hàng',
      html: generateContactEmailHtml({
        phone,
        datetime,
        code,
        codeFound
      }),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Contact email sent successfully to:', email);
    return Response.json(
      { success: true, message: 'Contact email sent successfully', data: { messageId: info.messageId } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    return Response.json(
      { success: false, message: 'Failed to send contact email', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Generate HTML email content for contact form
function generateContactEmailHtml(data: any) {
  const { phone, datetime, code, codeFound } = data;

  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thông tin liên hệ</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f3ed; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #BD9479; margin: 0; font-size: 28px; }
        .info-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #BD9479; }
        .info-item { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #dee2e6; }
        .info-item:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #5a6b6a; }
        .value { color: #333; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 14px; }
        .code-notice { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 10px; border-radius: 4px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thông tin liên hệ</h1>
        </div>

        <p>Xin chào,</p>
        <p>Khách hàng đã gửi thông tin liên hệ qua form. Dưới đây là chi tiết:</p>

        <div class="info-box">
          <div class="info-item">
            <span class="label">Số điện thoại:</span>
            <span class="value">${phone}</span>
          </div>
          <div class="info-item">
            <span class="label">Thời gian hẹn:</span>
            <span class="value">${new Date(datetime).toLocaleString('vi-VN')}</span>
          </div>
          ${code ? `
          <div class="info-item">
            <span class="label">Mã tham chiếu:</span>
            <span class="value">${code}</span>
          </div>
          ` : ''}
        </div>

        ${!codeFound && code ? `
        <div class="code-notice">
          <strong>Lưu ý:</strong> Mã "${code}" không tìm thấy trong hệ thống. Email được gửi đến địa chỉ mặc định.
        </div>
        ` : ''}

        <p>Vui lòng liên hệ với khách hàng trong thời gian sớm nhất.</p>

        <div class="footer">
          <p>Email tự động từ hệ thống liên hệ</p>
          <p>&copy; 2025 Contact System. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}