'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
];

export default function Home() {
  const [lightbox, setLightbox] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        {/* Imagen de fondo (placeholder mientras carga el video) */}
        <div className={`hero-bg ${videoLoaded ? 'hero-bg-hidden' : ''}`}>
          <Image
            src="/images/504188056_18405323272110732_7471875594620275783_n.jpg"
            alt="No Rules Clan"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
        {/* Video de YouTube como fondo */}
        <div className={`hero-video-bg ${videoLoaded ? 'hero-video-loaded' : ''}`}>
          <iframe
            src="https://www.youtube.com/embed/sYACeqlvPfs?autoplay=1&mute=1&loop=1&playlist=sYACeqlvPfs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
            title="No Rules Clan - Bisiestos"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            onLoad={() => setVideoLoaded(true)}
          ></iframe>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <Image src="/images/logoTransparent.png" alt="NRS Logo" width={180} height={180} style={{ width: '180px', height: 'auto' }} />
          </div>
          <h1 className="hero-title">No Rules Clan</h1>
          <p className="hero-tagline">Medellín · Envigado · Colombia</p>
          <div className="hero-cta">
            <Link href="/albums" className="btn" style={{ marginRight: '16px' }}>Escuchar</Link>
            <Link href="/videos" className="btn btn-filled">Ver Videos</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line"></div>
        </div>
      </section>

      {/* ===== LO NUEVO (FEATURED VIDEO) ===== */}
      <section className="section" id="new" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">Lo Nuevo</h2>
          <p className="section-subtitle">Último lanzamiento en nuestro canal oficial</p>

          <div className="featured-video-container">
            <div className="video-embed" style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <iframe
                src="https://www.youtube.com/embed/sYACeqlvPfs?autoplay=0&rel=0"
                title="No Rules Clan - Lo Nuevo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <a href="https://www.youtube.com/watch?v=sYACeqlvPfs" target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                Ver en YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-divider"></div>
              <h2 className="section-title">NRS</h2>
              <p className="section-subtitle">Y otra vez, NRS in the area, the same players, strictly love for my neas!</p>
              <p>
                No Rules Clan, grupo fundamental e ineludible para entender el estilo del rap colombiano de los últimos años,
                compuesto por Anyone/Cualkiera, Sison Beats y DJ Kario One. A lo largo de más de 10 años de trayectoria artística,
                No Rules Clan ha llevado su emblema a otro nivel.
              </p>
              <p>
                Un parche de panas que han puesto su sello por donde pasan. No hay pared ni caneca que se resista a sus tags.
                Del parche, un trío que rapea lo que sea con la estructura básica del género: un DJ y dos MCs.
                Bombo, caja, bajo y samples se hacen oír.
              </p>
              <p>
                Oriundos de Envigado, al sur del Valle de Aburrá, siguieron los pasos de su vecino, el escritor Fernando González,
                quien pudo filosofar sin sonar europeo, y ellos se pusieron a rapear sin sonar gringos. Un rap con lenguaje propio
                que habla de neas, de baros, de crema, de caballos y donde las baladas pasaron de ser la música de fondo en las
                trapeadas de las mamás, para volverse las protagonistas de sus samples.
              </p>
              <blockquote className="about-quote">
                &ldquo;En la vuelta del hip hop no hay reglas, pero hay códigos, hay un lenguaje que no se habla pero se entiende.&rdquo;
              </blockquote>
              <p>
                Su pasión por lo clásico y la estética de lo tradicional que tanto los caracteriza, los ha catalogado como uno
                de los grupos de Hip Hop más importantes a nivel nacional.
              </p>
            </div>
            <div className="about-image">
              <Image
                src="/images/491447033_18399452008110732_490951096133746480_n.jpg"
                alt="No Rules Clan"
                width={600}
                height={750}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEMBERS ===== */}
      <section className="section" id="members" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">El Clan</h2>
          <p className="section-subtitle">Tres pilares del boom bap colombiano</p>
          <div className="members-grid">
            <div className="member-card">
              <div className="member-image">
                <Image
                  src="/images/549215808_18418680136110732_8778006134418007590_n.jpg"
                  alt="Anyone / Cualkiera"
                  width={400}
                  height={530}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="member-name">Anyone / Cualkiera</h3>
              <p className="member-role">MC</p>
              <p className="member-bio">
                También conocido como Godie, es un rapero que continúa fiel a su sonido boom bap.
                Un artista que suele plasmar en rimas todo lo que piensa y siente, con una métrica certera
                que no filtra pensamientos y entre códigos y rimas nos deja ver lo que hay atrás de años de escuela
                en el rap antioqueño.
              </p>
            </div>
            <div className="member-card">
              <div className="member-image">
                <Image
                  src="/images/546523076_18418680121110732_6732293113232190962_n.jpg"
                  alt="Sison Beats"
                  width={400}
                  height={530}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="member-name">Sison Beats</h3>
              <p className="member-role">MC · Beatmaker</p>
              <p className="member-bio">
                También conocido como Nemesis, es MC y Beatmaker, Lo Life codificador de Rap y surfista de la wavy.
                Una de las caras más destacadas del boom bap nacional, escuchando sus letras se puede comprender el
                océano creativo en el que se sumergen para crear.
              </p>
            </div>
            <div className="member-card">
              <div className="member-image">
                <Image
                  src="/images/549626452_18418680148110732_307842062341846501_n.jpg"
                  alt="DJ Kario One"
                  width={400}
                  height={530}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="member-name">DJ Kario One</h3>
              <p className="member-role">DJ</p>
              <p className="member-bio">
                DJ de mil batallas, de skills en las tornamesas y un oído excelso para acompañar a sus dos secuaces.
                Precursor de una gran cantidad de eventos vinculados a la escena Hip Hop de Medellín, constantemente
                está evolucionando los eventos de la ciudad con conceptos frescos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MINI GALLERY (MASONRY) ===== */}
      <section className="section" id="gallery">
        <div className="container">
          <div className="section-divider"></div>
          <h2 className="section-title">Galería</h2>
          <p className="section-subtitle">La calle, el estudio, el escenario</p>
          <div className="masonry-grid">
            {galleryImages.slice(0, 8).map((img, i) => (
              <div key={i} className="masonry-item" onClick={() => setLightbox(`/images/${img}`)}>
                <Image
                  src={`/images/${img}`}
                  alt={`No Rules Clan - ${i + 1}`}
                  width={600}
                  height={400 + (i % 3) * 100}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/galeria" className="btn">Ver Galería Completa</Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Booking</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
            Contrataciones y prensa
          </p>
          <a href="mailto:norulesclan@outlook.com" className="contact-email">
            norulesclan@outlook.com
          </a>
          <div className="contact-socials">
            <a href="https://open.spotify.com/artist/6i28S1MHCSNJtufoq0DnPv" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://www.youtube.com/channel/UChkjGOeb5fp-OXfPdUibrIg" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.instagram.com/norulesclan" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.instagram.com/kario.one_nrs" target="_blank" rel="noopener noreferrer">Kario One</a>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <Image src={lightbox} alt="Gallery" width={1200} height={800} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', width: 'auto', height: 'auto' }} />
        </div>
      )}
    </>
  );
}
