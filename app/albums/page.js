import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export const metadata = {
    title: 'Álbumes — No Rules Clan',
    description: 'Discografía de No Rules Clan. Escucha y compra sus álbumes: Rap Nativo, Pantone y más.',
};

function getAlbums() {
    const albumsDir = path.join(process.cwd(), 'data', 'albums');
    const files = fs.readdirSync(albumsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
        const data = JSON.parse(fs.readFileSync(path.join(albumsDir, f), 'utf-8'));
        return data;
    }).sort((a, b) => b.year - a.year);
}

export default function AlbumsPage() {
    const albums = getAlbums();

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
                    <h1 className="section-title">Discografía</h1>
                    <p className="section-subtitle">Cada disco es un capítulo de la calle</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    {albums.map((album, index) => (
                        <div key={album.id} style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '48px',
                            marginBottom: index < albums.length - 1 ? '80px' : 0,
                            paddingBottom: index < albums.length - 1 ? '80px' : 0,
                            borderBottom: index < albums.length - 1 ? '1px solid var(--border)' : 'none',
                            alignItems: 'start',
                        }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1/1',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                position: 'relative',
                            }}>
                                <Image
                                    src={album.cover}
                                    alt={album.title}
                                    width={500}
                                    height={500}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <p className="album-year">{album.year}</p>
                                <h2 className="album-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>{album.title}</h2>
                                <p className="album-desc">{album.description}</p>
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
                                <div className="album-links">
                                    {album.spotifyLink && (
                                        <a href={album.spotifyLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                                            Spotify
                                        </a>
                                    )}
                                    {album.buyLink && album.buyLink !== '#' && (
                                        <a href={album.buyLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-filled">
                                            Comprar
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
