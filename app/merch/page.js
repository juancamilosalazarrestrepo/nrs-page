import merch from '@/data/merch.json';
import MerchCard from '@/components/MerchCard';

export const metadata = {
    title: 'Merch — No Rules Clan',
    description: 'Merchandising oficial de No Rules Clan. Camisetas, hoodies, gorras y más.',
};

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
                            <MerchCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
