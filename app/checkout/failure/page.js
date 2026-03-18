import Link from 'next/link';

export const metadata = {
    title: 'Pago Fallido — No Rules Clan',
    description: 'Hubo un problema con tu pago.',
};

export default function CheckoutFailure() {
    return (
        <div className="checkout-result">
            <div className="container">
                <div className="checkout-result-card failure">
                    <div className="checkout-icon">✕</div>
                    <h1 className="checkout-result-title">Pago No Procesado</h1>
                    <p className="checkout-result-text">
                        Hubo un problema al procesar tu pago. No se realizó ningún
                        cargo a tu cuenta.
                    </p>
                    <p className="checkout-result-text checkout-result-secondary">
                        Puedes intentar de nuevo o probar con otro método de pago.
                    </p>
                    <div className="checkout-result-actions">
                        <Link href="/merch" className="btn btn-sm btn-filled">
                            Intentar de nuevo
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
