import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'MYSTERY MESSAGE  verification code',
      react: VerificationEmail({ username, otp: verifyCode}),
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    return {
      success: true,
      message: "Verification code sent successfully",
    };
  } catch (emailError) {
    console.error("Failed to send verification code", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}