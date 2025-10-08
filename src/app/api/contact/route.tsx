import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        if (!process.env.RESEND_API_KEY) {
            console.log("[Contact API] RESEND_API_KEY not set")
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
        }

        const resend = new Resend(process.env.RESEND_API_KEY)

        // Simple HTML template without React Email components
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #0f172a, #1e40af); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h2 style="margin: 0; font-size: 24px;">New Contact Message</h2>
                    <p style="margin: 5px 0 0; opacity: 0.9;">Al Kainaat Learning & Development Institute</p>
                </div>
                <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #334155;">Name:</strong>
                        <span style="color: #64748b; margin-left: 10px;">${name}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #334155;">Email:</strong>
                        <span style="color: #64748b; margin-left: 10px;">${email}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #334155;">Message:</strong>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; color: #374151; line-height: 1.6;">
                        ${message?.replace(/\n/g, "<br/>")}
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
                    <p>This message was sent from the Al Kainaat LDI contact form.</p>
                </div>
            </div>
        `

        // NOTE: In production, configure a verified domain sender in Resend.
        console.log("[Contact API] Attempting to send email to:", "devasad24@gmail.com")
        console.log("[Contact API] From email:", email)
        console.log("[Contact API] API Key exists:", !!process.env.RESEND_API_KEY)

        const data = await resend.emails.send({
            from: "Al Kainaat LDI <onboarding@resend.dev>",
            to: ["ohheyasad0@gmail.com"],
            replyTo: email,
            subject: `New inquiry from ${name}`,
            html: emailHtml,
        })

        console.log("[Contact API] Resend response:", data)
        return NextResponse.json({ ok: true, id: data?.data?.id ?? null })
    } catch (e: any) {
        console.log("[Contact API] Error:", e?.message)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
