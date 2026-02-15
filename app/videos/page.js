import videos from '@/data/videos.json';

export const metadata = {
    title: 'Videos — No Rules Clan',
    description: 'Videos musicales y contenido audiovisual de No Rules Clan. Boom bap desde Envigado, Medellín.',
};

export default function VideosPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div className="section-divider" style={{ margin: '0 auto 20px' }}></div>
                    <h1 className="section-title">Videos</h1>
                    <p className="section-subtitle">Videoclips, presentaciones en vivo y contenido audiovisual</p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="videos-grid">
                        {videos.map((video) => (
                            <div key={video.id} className="video-card">
                                <div className="video-embed">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </div>
                                <div className="video-info">
                                    <h3 className="video-title">{video.title}</h3>
                                    <p className="video-year">{video.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
