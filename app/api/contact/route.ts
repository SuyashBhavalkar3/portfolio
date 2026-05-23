import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Verify fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields (name, email, message)." },
        { status: 400 }
      );
    }

    const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables:", {
        serviceId: !!serviceId,
        templateId: !!templateId,
        publicKey: !!publicKey,
      });
      return NextResponse.json(
        { error: "Contact service is currently unavailable. Please email directly at suyashbhavalkar82@gmail.com" },
        { status: 500 }
      );
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
        // In case template uses name, email, message directly
        name: name,
        email: email,
      },
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Email sent successfully!" });
    } else {
      const errorText = await response.text();
      console.error("EmailJS REST API error status:", response.status, errorText);
      return NextResponse.json(
        { error: `Failed to send email: ${errorText || response.statusText}` },
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
