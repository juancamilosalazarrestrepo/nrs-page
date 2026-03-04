import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function getAlbum(id) {
    const filePath = path.join(process.cwd(), 'data', 'albums', `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getAllAlbumIds() {
    const albumsDir = path.join(process.cwd(), 'data', 'albums');
    return fs.readdirSync(albumsDir)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
}

export async function generateStaticParams() {
    const ids = getAllAlbumIds();
    return ids.map(id => ({ id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const album = getAlbum(id);
    if (!album) return { title: 'Álbum no encontrado' };
    return {
        title: `${album.title} — ${album.artist || 'No Rules Clan'}`,
        description: album.description,
    };
}

function formatPrice(price, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);
}

export default async function AlbumDetailPage({ params }) {
    const { id } = await params;
    const album = getAlbum(id);
    if (!album) notFound();

    return (
        <>
            <div className="album-detail-header">
                <div className="container">
                    <Link href="/albums" className="album-back-link" aria-label="Volver al catálogo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="album-back-text">Volver al catálogo</span>
                    </Link>
                </div>
            </div>

            <section className="album-detail-section">
                <div className="container">
                    <div className="album-detail">
                        <div className="album-detail-cover">
                            <Image
                                src={album.cover}
                                alt={album.title}
                                width={500}
                                height={500}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                priority
                            />
                        </div>
                        <div className="album-detail-info">
                            <p className="album-year">{album.year}</p>
                            <h1 className="album-detail-title">{album.title}</h1>
                            <p className="album-detail-artist">{album.artist || 'No Rules Clan'}</p>

                            <p className="album-detail-price">{formatPrice(album.price || 50000, album.currency || 'COP')}</p>

                            <p className="album-desc" style={{ marginBottom: '32px' }}>{album.description}</p>

                            <ul className="album-tracks">
                                {album.tracks.map((track, i) => (
                                    <li key={i}>
                                        <span>
                                            <span className="album-track-num">{String(i + 1).padStart(2, '0')}</span>
                                            {track.name}
                                        </span>
                                        <span className="album-track-duration">{track.duration}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="album-detail-actions">
                                {album.spotifyLink && (
                                    <a href={album.spotifyLink} target="_blank" rel="noopener noreferrer" className="btn">
                                        Escuchar en Spotify
                                    </a>
                                )}
                                <a href={album.buyLink && album.buyLink !== '#' ? album.buyLink : '#'} className="btn btn-filled">
                                    Comprar Álbum
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
