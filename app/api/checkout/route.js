import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, price, quantity, size } = body;

        if (!title || !price || !quantity) {
            return NextResponse.json(
                { error: 'Faltan datos del producto' },
                { status: 400 }
            );
        }

        // Determinar la URL base. Prioridad:
        // 1. Variable manual configurada (ej. ngrok o dominio custom local)
        // 2. Variable de producción de Vercel
        // 3. Variable de preview/branch de Vercel
        // 4. Fallback a localhost
        let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
            if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
                baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
            } else if (process.env.VERCEL_URL) {
                baseUrl = `https://${process.env.VERCEL_URL}`;
            } else {
                baseUrl = 'http://localhost:3000';
            }
        }

        const preference = new Preference(client);

        const isLocalAddress = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

        const preferenceBody = {
            items: [
                {
                    id: `merch-${title.toLowerCase().replace(/\s+/g, '-')}`,
                    title: size ? `${title} — Talla ${size}` : title,
                    quantity: Number(quantity),
                    unit_price: Number(price),
                    currency_id: 'COP',
                },
            ],
            statement_descriptor: 'NRS MERCH',
        };

        // Mercado Pago solo acepta URLs públicas para las redirecciones.
        // Si baseUrl no es localhost, activamos las redirecciones automáticas.
        if (!isLocalAddress) {
            preferenceBody.back_urls = {
                success: `${baseUrl}/checkout/success`,
                failure: `${baseUrl}/checkout/failure`,
                pending: `${baseUrl}/checkout/pending`,
            };
            preferenceBody.auto_return = 'approved';
        }

        const result = await preference.create({
            body: preferenceBody,
        });

        return NextResponse.json({
            id: result.id,
            init_point: result.init_point,
        });
    } catch (error) {
        console.error('Error creando preferencia de Mercado Pago:', error);
        return NextResponse.json(
            { error: 'Error al crear la preferencia de pago' },
            { status: 500 }
        );
    }
}
