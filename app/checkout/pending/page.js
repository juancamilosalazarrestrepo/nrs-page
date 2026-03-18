import { Suspense } from 'react';
import PendingClient from './PendingClient';

export const metadata = {
    title: 'Pago Pendiente — No Rules Clan',
    description: 'Tu pago está siendo procesado.',
};

export default function CheckoutPending() {
    return (
        <Suspense fallback={
            <div className="checkout-result">
                <div className="container">
                    <p style={{ textAlign: 'center', color: '#fff', padding: '100px 0' }}>Cargando estado del pago...</p>
                </div>
            </div>
        }>
            <PendingClient />
        </Suspense>
    );
}
