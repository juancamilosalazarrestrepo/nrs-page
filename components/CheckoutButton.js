'use client';
import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar SDK con la public key
if (typeof window !== 'undefined') {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: 'es-CO',
    });
}

export default function CheckoutButton({ item, selectedSize }) {
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        if (!selectedSize) {
            setError('Selecciona una talla');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.name,
                    price: item.price,
                    quantity: 1,
                    size: selectedSize,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar el pago');
            }

            // Redirigir directamente al checkout de Mercado Pago
            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                setPreferenceId(data.id);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            {error && <p className="checkout-error">{error}</p>}

            {!preferenceId ? (
                <button
                    className="btn btn-sm btn-filled checkout-btn"
                    onClick={handleCheckout}
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    {loading ? (
                        <span className="checkout-loading">
                            <span className="spinner"></span>
                            Procesando...
                        </span>
                    ) : (
                        'Comprar'
                    )}
                </button>
            ) : (
                <Wallet
                    initialization={{ preferenceId }}
                    customization={{
                        visual: { buttonBackground: 'black', borderRadius: '2px' },
                    }}
                />
            )}
        </div>
    );
}
