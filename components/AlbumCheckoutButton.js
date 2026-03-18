'use client';
import { useState } from 'react';

export default function AlbumCheckoutButton({ title, price, currency }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `Álbum: ${title}`,
                    price: price || 50000,
                    quantity: 1,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar el pago');
            }

            if (data.init_point) {
                window.location.href = data.init_point;
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && <p className="checkout-error" style={{ marginTop: '8px' }}>{error}</p>}
            <button
                className="btn btn-sm btn-filled"
                onClick={handleCheckout}
                disabled={loading}
                style={{ flex: 1, justifyContent: 'center' }}
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
        </>
    );
}
