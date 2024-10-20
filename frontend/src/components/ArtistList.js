import bin from "../assets/images/artists/bin.jpg";
import guma from "../assets/images/artists/gumayusi.jpg";
import peanut from "../assets/images/artists/peanut.jpg";
import faker from "../assets/images/artists/faker.jpg";
import React, { useEffect, useState } from 'react';
import { fetchArtists } from '../api/api';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchArtists(); // Gọi hàm fetchArtists
                setArtists(data); // Cập nhật danh sách artist
            } catch (err) {
                setError('Không thể tải danh sách artist');
            } finally {
                setLoading(false);
            }
        };

        loadArtists();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <div className="row artist-list">
            {artists.map((artist) => (
                <div className="col-xl-3 col-md-6 mb-3" key={artist.artist_id}> {/* Sử dụng artist.artist_id làm key */}
                    <div className="bg-soft-danger position-relative rounded-3 card-box mb-3">
                        <img
                            src={artist.image || peanut}
                            id="artist-playlist"
                            className="img-fluid mx-auto d-block"
                            alt="play-img"
                        />
                    </div>
                    <a href="../dashboard/music-player.html" className="text-capitalize h5">{artist.name}</a>
                    <small className="fw-normal line-count-1 text-capitalize">
                        <b style={{ color: artist.color || '#F05A22' }}>{artist.tag || 'Tag'}</b> {artist.bio || 'Nickname'}
                    </small>
                </div>
            ))}
        </div>
    );

}

export default ArtistList;
