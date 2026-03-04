import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Catálogo — No Rules Clan',
    description: 'Catálogo oficial de discos de No Rules Clan y sus miembros. Compra y escucha la discografía completa.',
};

function getAlbums() {
    const albumsDir = path.join(process.cwd(), 'data', 'albums');
    const files = fs.readdirSync(albumsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
        const data = JSON.parse(fs.readFileSync(path.join(albumsDir, f), 'utf-8'));
        return data;
    }).sort((a, b) => b.year - a.year);
}

function formatPrice(price, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);
}

export default function AlbumsPage() {
    const albums = getAlbums();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
                    <h1 className="section-title">Catálogo</h1>
                    <p className="section-subtitle">Discografía oficial — Compra y escucha</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="catalog-grid">
                        {albums.map((album) => (
                            <div key={album.id} className="catalog-card">
                                <Link href={`/albums/${album.id}`} className="catalog-cover">
                                    <Image
                                        src={album.cover}
                                        alt={album.title}
                                        width={400}
                                        height={400}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div className="catalog-cover-overlay">
                                        <span className="catalog-view">Ver detalles</span>
                                    </div>
                                </Link>
                                <div className="catalog-info">
                                    <h3 className="catalog-title">{album.title}</h3>
                                    <p className="catalog-artist">{album.artist || 'No Rules Clan'}</p>
                                    <p className="catalog-price">{formatPrice(album.price || 50000, album.currency || 'COP')}</p>
                                    <div className="catalog-actions">
                                        <Link href={`/albums/${album.id}`} className="btn btn-sm">
                                            Ver Más
                                        </Link>
                                        <a href={album.buyLink && album.buyLink !== '#' ? album.buyLink : '#'} className="btn btn-sm btn-filled">
                                            Comprar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
