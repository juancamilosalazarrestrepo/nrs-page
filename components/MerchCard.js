'use client';
import { useState } from 'react';
import Image from 'next/image';

function formatPrice(price, currency) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);
}

export default function MerchCard({ item }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];

    const nextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="merch-card">
            <div className="merch-image" style={{ position: 'relative' }}>
                <Image
                    src={images[currentImageIndex]}
                    alt={`${item.name} - Imagen ${currentImageIndex + 1}`}
                    width={400}
                    height={400}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {images.length > 1 && (
                    <>
                        <button className="carousel-btn prev" onClick={prevImage}>&#10094;</button>
                        <button className="carousel-btn next" onClick={nextImage}>&#10095;</button>
                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                ></span>
                            ))}
                        </div>
                    </>
                )}
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
    );
}
