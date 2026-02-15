'use client';
import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
    '491446109_18399452020110732_8230298409711823779_n.jpg',
    '491447033_18399452008110732_490951096133746480_n.jpg',
    '494447744_18399452038110732_3188554522135113094_n.jpg',
    '494594110_18399452029110732_2393307632691585712_n.jpg',
    '495206607_18399451999110732_7877286465127584780_n.jpg',
    '504188056_18405323272110732_7471875594620275783_n.jpg',
    '504487424_18405323293110732_4196524465540167570_n.jpg',
    '505455287_18405323302110732_1852568428100836816_n.jpg',
    '505473274_18405323284110732_4654527889663926477_n.jpg',
    '533046756_18414233440110732_6890116422541346884_n.jpg',
    '546523076_18418680121110732_6732293113232190962_n.jpg',
    '549215808_18418680136110732_8778006134418007590_n.jpg',
    '549626452_18418680148110732_307842062341846501_n.jpg',
    'no-rules-clan-1-960x960.png',
    'no-rules-clan-3.jpg',
];

export default function GalleryPage() {
    const [lightbox, setLightbox] = useState(null);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
                    <h1 className="section-title">Galería</h1>
                    <p className="section-subtitle">La calle, el estudio, el escenario — momentos NRS</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="masonry-grid">
                        {galleryImages.map((img, i) => (
                            <div key={i} className="masonry-item" onClick={() => setLightbox(`/images/${img}`)}>
                                <Image
                                    src={`/images/${img}`}
                                    alt={`No Rules Clan - ${i + 1}`}
                                    width={600}
                                    height={400 + (i % 4) * 80}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <Image src={lightbox} alt="Gallery" width={1200} height={800} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', width: 'auto', height: 'auto' }} />
                </div>
            )}
        </>
    );
}
