
interface EmailTemplateOptions {
  title: string;
  description: string;
  otpCode?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const BRAND = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
};

export const EmailTemplate = ({
  title,
  description,
  otpCode,
  buttonText,
  buttonUrl,
}: EmailTemplateOptions): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Refqa</title>
  </head>

  <body style="margin:0; padding:0; background-color:${BRAND.background}; font-family: 'Segoe UI', Tahoma, Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:24px;">

          <table width="480" style="max-width:480px; width:100%; background:${BRAND.surface}; border-radius:16px; overflow:hidden; border:1px solid ${BRAND.border};">

            <!-- Header (bg gradient via VML fallback + solid fallback color) -->
            <tr>
              <td style="background-color:${BRAND.primaryDark}; background:linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDark}); padding:32px 24px; text-align:center;">
                <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="font-size:26px; font-weight:800; color:#ffffff; letter-spacing:-0.5px;">
                      Refqa
                    </td>
                  </tr>
                </table>
                <p style="margin:8px 0 0; font-size:11px; letter-spacing:1.5px; color:${BRAND.primaryLight}; text-transform:uppercase;">
                  Ride Smart &middot; Arrive on Time
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 28px; text-align:center;">

                <h2 style="margin:0 0 12px; color:${BRAND.textPrimary}; font-size:20px;">
                  ${title}
                </h2>

                <p style="margin:0 0 24px; font-size:15px; color:${BRAND.textSecondary}; line-height:1.6;">
                  ${description}
                </p>

                ${
                  otpCode
                    ? `
                <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
                  <tr>
                    <td style="background:${BRAND.primaryLight}; border-radius:12px; padding:16px 32px;">
                      <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:${BRAND.primaryDark};">
                        ${otpCode}
                      </span>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 24px; font-size:13px; color:${BRAND.textSecondary};">
                  This code expires shortly. Don't share it with anyone.
                </p>
                `
                    : ''
                }

                ${
                  buttonText && buttonUrl
                    ? `
                <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="background:${BRAND.primary}; border-radius:10px;">
                      <a href="${buttonUrl}"
                        style="display:inline-block; padding:13px 28px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">
                        ${buttonText}
                      </a>
                    </td>
                  </tr>
                </table>
                `
                    : ''
                }

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:${BRAND.background}; padding:20px 24px; text-align:center; border-top:1px solid ${BRAND.border};">
                <p style="margin:0; font-size:12px; color:${BRAND.textSecondary};">
                  &copy; ${new Date().getFullYear()} Refqa &middot; Campus Mobility
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};