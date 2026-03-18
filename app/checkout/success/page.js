import Link from 'next/link';

export const metadata = {
    title: 'Pago Exitoso — No Rules Clan',
    description: 'Tu compra ha sido procesada exitosamente.',
};

export default function CheckoutSuccess() {
    return (
        <div className="checkout-result">
            <div className="container">
                <div className="checkout-result-card success">
                    <div className="checkout-icon">✓</div>
                    <h1 className="checkout-result-title">¡Pago Exitoso!</h1>
                    <p className="checkout-result-text">
                        Tu compra ha sido procesada correctamente. Recibirás un correo
                        de confirmación con los detalles de tu pedido.
                    </p>
                    <p className="checkout-result-text checkout-result-secondary">
                        Nos pondremos en contacto contigo para coordinar el envío.
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
