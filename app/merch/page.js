import merch from '@/data/merch.json';

export const metadata = {
    title: 'Merch — No Rules Clan',
    description: 'Merchandising oficial de No Rules Clan. Camisetas, hoodies, gorras y más.',
};

function formatPrice(price, currency) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);
}

export default function MerchPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
                    <h1 className="section-title">Merch</h1>
                    <p className="section-subtitle">Representa el clan — Merchandising oficial NRS</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="merch-grid">
                        {merch.map((item) => (
                            <div key={item.id} className="merch-card">
                                <div className="merch-image">
                                    <div className="merch-placeholder">{item.name.split(' ').map(w => w[0]).join('')}</div>
                                </div>
                                <div className="merch-info">
                                    <h3 className="merch-name" style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {item.name}
                                    </h3>
                                    <p className="merch-price">{formatPrice(item.price, item.currency)}</p>
                                    <p className="merch-desc">{item.description}</p>
                                    <div className="merch-sizes">
                                        {item.sizes.map((size) => (
                                            <span key={size} className="merch-size">{size}</span>
                                        ))}
                                    </div>
                                    <a href={item.buyLink} className="btn btn-sm btn-filled" style={{ width: '100%', justifyContent: 'center' }}>
                                        Comprar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
