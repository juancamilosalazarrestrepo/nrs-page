import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
    try {
        const url = new URL(request.url);
        
        // Obtener parámetros de la URL
        let action = url.searchParams.get('action') || url.searchParams.get('type') || url.searchParams.get('topic');
        let id = url.searchParams.get('data.id') || url.searchParams.get('id');

        // Leer el body por si vienen allí en lugar de la URL
        const body = await request.json().catch(() => ({}));
        if (!action) action = body?.action || body?.type;
        if (!id) id = body?.data?.id || body?.id;

        // Si Mercado Pago está verificando la ruta
        if (!id) {
            return NextResponse.json({ success: true });
        }

        // Procesar solo actualizaciones de pagos
        if (action === 'payment.created' || action === 'payment.updated' || action === 'payment') {
            const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
            const paymentModel = new Payment(client);
            
            // Consultar toda la info del pago en Mercado Pago
            const payment = await paymentModel.get({ id });

            // Solo enviamos correo si apenas fue aprobado y no lo habíamos procesado
            if (payment.status === 'approved') {
                const payerEmail = payment.payer?.email;
                const items = payment.additional_info?.items || [];
                const total = payment.transaction_amount;

                // Preparar resumen del carrito
                const itemDetails = items.map(item => `
                    <li style="margin-bottom: 10px;">
                        <strong>${item.title}</strong><br/>
                        Cantidad: ${item.quantity} <br/>
                        Precio Unitario: $${item.unit_price} COP
                    </li>
                `).join('');

                // Inicializar Resend si existe la key
                const resendKey = process.env.RESEND_API_KEY;
                if (payerEmail && resendKey && !resendKey.includes('Aquí_Tu_Api_Key')) {
                    const resend = new Resend(resendKey);
                    
                    await resend.emails.send({
                        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
                        to: payerEmail,
                        subject: '¡Tu compra en NRS fue exitosa! 🛒',
                        html: `
                            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                    <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 15px;">¡Confirmación de Pago!</h2>
                                    <p style="color: #444; font-size: 16px;">Hola,</p>
                                    <p style="color: #444; font-size: 16px;">Queremos informarte que hemos recibido y procesado <strong>exitosamente</strong> tu pago por <strong>$${total} COP</strong>.</p>
                                    
                                    <h3 style="color: #222; margin-top: 30px;">Resumen de tu pedido:</h3>
                                    <ul style="color: #444; font-size: 15px; padding-left: 20px;">
                                        ${itemDetails}
                                    </ul>
                                    
                                    <div style="background-color: #eef8ff; border-left: 4px solid #0070f3; padding: 15px; margin-top: 30px; border-radius: 4px;">
                                        <p style="margin: 0; color: #004b9e; font-size: 14px;">Pronto comenzaremos a preparar tu paquete. Estate atento al correo para los detalles de envío.</p>
                                    </div>

                                    <div style="margin-top: 40px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
                                        <p style="color: #888; font-size: 12px; margin: 0;">ID de Transacción: ${payment.id}</p>
                                        <p style="color: #888; font-size: 12px; margin: 5px 0 0 0;">No Rules Clan</p>
                                    </div>
                                </div>
                            </div>
                        `
                    });

                    console.log(`[Webhook] ✅ Correo enviado a ${payerEmail} por el pago ${id}`);
                } else {
                    console.log(`[Webhook] Pago ${id} aprobado, pero faltan credenciales de Resend o email.`);
                }
            }
        }

        // Siempre devolver 200 para que Mercado Pago no reenvíe
        return NextResponse.json({ success: true, received: true });

    } catch (error) {
        console.error('[Webhook Error]', error);
        // Responder 200 de todos modos a veces es mejor en producción para detener retries, 
        // pero 500 ayuda a que vuelva a intentar si falló la red temporalmente.
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
