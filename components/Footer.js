import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <ul className="footer-links">
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/albums">Álbumes</Link></li>
                    <li><Link href="/merch">Merch</Link></li>
                    <li><Link href="/videos">Videos</Link></li>
                    <li><Link href="/galeria">Galería</Link></li>
                    <li><a href="https://open.spotify.com/artist/6i28S1MHCSNJtufoq0DnPv" target="_blank" rel="noopener noreferrer">Spotify</a></li>
                    <li><a href="https://www.youtube.com/channel/UChkjGOeb5fp-OXfPdUibrIg" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                    <li><a href="https://www.instagram.com/norulesclan" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
                <p>© {new Date().getFullYear()} No Rules Clan — Medellín, Colombia</p>
            </div>
        </footer>
    );
}
