import Link from 'next/link';

export const metadata = {
    title: 'Pago Pendiente — No Rules Clan',
    description: 'Tu pago está siendo procesado.',
};

export default function CheckoutPending() {
    return (
        <div className="checkout-result">
            <div className="container">
                <div className="checkout-result-card pending">
                    <div className="checkout-icon">⏳</div>
                    <h1 className="checkout-result-title">Pago Pendiente</h1>
                    <p className="checkout-result-text">
                        Tu pago está siendo procesado. Esto puede tardar unos minutos.
                        Recibirás una notificación cuando se confirme.
                    </p>
                    <p className="checkout-result-text checkout-result-secondary">
                        No te preocupes, tu pedido está reservado.
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
