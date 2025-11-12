import { NextRequest } from 'next/server';
import { gmailTransporter } from '@/lib/emailTransporter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, gender, answers, code } = body;

    if (!email || !name || !gender || !answers) {
      return Response.json(
        { success: false, message: 'Missing required fields: email, name, gender, answers' },
        { status: 400 }
      );
    }

    // Use pre-configured Gmail transporter
    const transporter = gmailTransporter;

    // Calculate personality type based on answers
    const personalityResult = calculatePersonalityType(answers);

    // Send email
    const mailOptions = {
      from: `"Personality Test" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Kết quả bài test tính cách',
      html: generateResultsHtml({
        name,
        gender,
        answers,
        code,
        personalityResult
      }),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', email);
    
    return Response.json(
      { success: true, message: 'Email sent successfully', data: { messageId: info.messageId } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { success: false, message: 'Failed to send email', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Calculate personality type based on MBTI-like scoring
function calculatePersonalityType(answers: Record<number, number>) {
  let E_I = 0; // Extraversion vs Introversion
  let S_N = 0; // Sensing vs Intuition
  let T_F = 0; // Thinking vs Feeling
  let J_P = 0; // Judging vs Perceiving

  // MBTI scoring logic based on question types
  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = parseInt(questionId);

    // Question 1: E/I (social interaction)
    if (qId === 1) E_I += answer;

    // Question 2: I/E (alone time preference)
    if (qId === 2) E_I -= answer;

    // Question 3: T/F (discussion preference)
    if (qId === 3) T_F += answer;

    // Question 4: N/S (big picture vs details)
    if (qId === 4) S_N -= answer;

    // Question 5: N/S (meaning vs facts)
    if (qId === 5) S_N -= answer;

    // Question 6: N/S (creativity vs practicality)
    if (qId === 6) S_N -= answer;

    // Question 7: F/T (emotion vs logic)
    if (qId === 7) T_F -= answer;

    // Question 8: T/F (direct feedback)
    if (qId === 8) T_F += answer;

    // Question 9: T/F (right/wrong vs harmony)
    if (qId === 9) T_F += answer;

    // Question 10: J/P (planning)
    if (qId === 10) J_P += answer;

    // Question 11: P/J (flexibility)
    if (qId === 11) J_P -= answer;

    // Question 12: P/J (adaptability)
    if (qId === 12) J_P -= answer;
  });

  // Determine personality type
  const personality = {
    E_I: E_I > 0 ? 'E' : 'I',
    S_N: S_N > 0 ? 'S' : 'N',
    T_F: T_F > 0 ? 'T' : 'F',
    J_P: J_P > 0 ? 'J' : 'P'
  };

  const type = personality.E_I + personality.S_N + personality.T_F + personality.J_P;

  return {
    type,
    description: getPersonalityDescription(type),
    scores: { E_I, S_N, T_F, J_P }
  };
}

// Get personality description
function getPersonalityDescription(type: string) {
  const descriptions: Record<string, string> = {
    'ENFP': 'Người truyền cảm hứng, sáng tạo, luôn tìm kiếm ý nghĩa và kết nối với người khác.',
    'ENFJ': 'Người lãnh đạo tự nhiên, đồng cảm, luôn quan tâm đến sự phát triển của người khác.',
    'ENTP': 'Người sáng tạo, thích tranh luận, luôn tìm cách cải tiến và đổi mới.',
    'ENTJ': 'Người lãnh đạo quyết đoán, có tầm nhìn, tập trung vào mục tiêu và hiệu quả.',
    'INFP': 'Người lý tưởng hóa, sáng tạo, luôn tìm kiếm giá trị và ý nghĩa trong cuộc sống.',
    'INFJ': 'Người đồng cảm sâu sắc, có tầm nhìn, luôn quan tâm đến sự phát triển tâm linh.',
    'INTP': 'Người phân tích, độc lập, thích khám phá ý tưởng và lý thuyết.',
    'INTJ': 'Người chiến lược, độc lập, tập trung vào việc đạt được mục tiêu dài hạn.',
    'ESFP': 'Người vui vẻ, thực tế, thích sống trong hiện tại và tận hưởng cuộc sống.',
    'ESFJ': 'Người chăm sóc, thân thiện, luôn quan tâm đến nhu cầu của người khác.',
    'ESTP': 'Người hành động, thực tế, thích đối mặt với thử thách và giải quyết vấn đề.',
    'ESTJ': 'Người có trách nhiệm, thực tế, tập trung vào việc duy trì trật tự và hiệu quả.',
    'ISFP': 'Người nghệ sĩ, dịu dàng, luôn trân trọng giá trị cá nhân và sự tự do.',
    'ISFJ': 'Người bảo vệ, tận tâm, luôn quan tâm đến sự an toàn và hạnh phúc của người khác.',
    'ISTP': 'Người thực tế, độc lập, thích làm việc với tay và giải quyết vấn đề kỹ thuật.',
    'ISTJ': 'Người đáng tin cậy, thực tế, tập trung vào việc duy trì trật tự và chính xác.'
  };

  return descriptions[type] || 'Không thể xác định loại tính cách. Cần thêm thông tin để đánh giá chính xác hơn.';
}

// Generate HTML email content
function generateResultsHtml(data: any) {
  const { name, gender, answers, code, personalityResult } = data;

  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kết quả bài test tính cách</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f3ed; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #BD9479; margin: 0; font-size: 28px; }
        .result-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #BD9479; }
        .personality-type { font-size: 24px; font-weight: bold; color: #BD9479; margin-bottom: 10px; }
        .description { font-size: 16px; line-height: 1.6; }
        .stats { margin: 20px 0; }
        .stat-item { display: inline-block; margin: 5px 10px 5px 0; padding: 8px 12px; background: #e9ecef; border-radius: 4px; font-size: 14px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Kết quả bài test tính cách</h1>
        </div>

        <p>Kết quả bài test BMTI của <strong>${name}</strong>,</p>

        <div class="result-box">
          <div class="personality-type">${personalityResult.type}</div>
          <div class="description">${personalityResult.description}</div>
        </div>

        <div class="stats">
          <h3>Chi tiết điểm số:</h3>
          <div class="stat-item">E/I: ${personalityResult.scores.E_I > 0 ? '+' : ''}${personalityResult.scores.E_I}</div>
          <div class="stat-item">S/N: ${personalityResult.scores.S_N > 0 ? '+' : ''}${personalityResult.scores.S_N}</div>
          <div class="stat-item">T/F: ${personalityResult.scores.T_F > 0 ? '+' : ''}${personalityResult.scores.T_F}</div>
          <div class="stat-item">J/P: ${personalityResult.scores.J_P > 0 ? '+' : ''}${personalityResult.scores.J_P}</div>
        </div>

        <p><strong>Thông tin bổ sung:</strong></p>
        <ul>
          <li>Giới tính: ${gender === 'male' ? 'Nam' : 'Nữ'}</li>
          <li>Số câu trả lời: ${Object.keys(answers).length}/12</li>
          ${code ? `<li>Mã tham chiếu: ${code}</li>` : ''}
        </ul>

        <div class="footer">
          <p>&copy; 2025 Personality Test. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}