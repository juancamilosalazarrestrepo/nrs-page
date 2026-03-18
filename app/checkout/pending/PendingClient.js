'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PendingClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isApproved, setIsApproved] = useState(false);
    
    useEffect(() => {
        const paymentId = searchParams.get('payment_id');
        if (!paymentId) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/checkout/status?payment_id=${paymentId}`);
                if (!res.ok) return;
                
                const data = await res.json();
                
                // Si el pago cambió a aprobado
                if (data.status === 'approved') {
                    setIsApproved(true);
                    clearInterval(interval);
                    
                    // Redirigir a success después de unos segundos
                    setTimeout(() => {
                        router.push('/checkout/success');
                    }, 2500);
                }
            } catch (error) {
                console.error("Error consultando estado del pago", error);
            }
        }, 5000); // Polling cada 5 segundos

        return () => clearInterval(interval);
    }, [searchParams, router]);

    if (isApproved) {
        return (
            <div className="checkout-result">
                <div className="container">
                    <div className="checkout-result-card success">
                        <div className="checkout-icon">✅</div>
                        <h1 className="checkout-result-title">¡Pago Aprobado!</h1>
                        <p className="checkout-result-text">
                            Tu pago ya fue confirmado por el banco. Redirigiendo...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-result">
            <div className="container">
                <div className="checkout-result-card pending">
                    <div className="checkout-icon">⏳</div>
                    <h1 className="checkout-result-title">Pago Pendiente</h1>
                    <p className="checkout-result-text">
                        Tu pago está siendo procesado (ej. PSE, Efectivo). Esto puede tardar unos minutos.
                        Por favor, <strong>no cierres esta ventana</strong> si quieres ver la confirmación.
                    </p>
                    <p className="checkout-result-text checkout-result-secondary">
                        Apenas el banco lo apruebe, esta pantalla se actualizará automáticamente.
                    </p>
                    <div className="checkout-result-actions">
                        <Link href="/merch" className="btn btn-sm btn-filled">
                            Volver a la tienda
                        </Link>
                        <Link href="/" className="btn btn-sm">
                            Ir al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
