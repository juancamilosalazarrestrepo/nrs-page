import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const paymentId = url.searchParams.get('payment_id');

        if (!paymentId) {
            return NextResponse.json({ error: 'Falta el payment_id en la solicitud' }, { status: 400 });
        }

        const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
        const paymentModel = new Payment(client);
        
        const payment = await paymentModel.get({ id: paymentId });

        return NextResponse.json({
            status: payment.status,              // e.g. "approved", "pending", "rejected"
            status_detail: payment.status_detail 
        });

    } catch (error) {
        console.error('[Status API Error]', error);
        return NextResponse.json({ error: 'No se pudo obtener el estado del pago' }, { status: 500 });
    }
}
