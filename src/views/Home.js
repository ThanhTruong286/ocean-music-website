import Header from "../components/Header";
import Footer from "../components/Footer";
import peanut from "../assets/images/artists/peanut.jpg";
import faker from "../assets/images/artists/faker.jpg";
import bin from "../assets/images/artists/bin.jpg";
import guma from "../assets/images/artists/gumayusi.jpg";

const Home = () => {
    return (
        <div id="header">
            <Header />
            <div className="content-inner pb-0 container-fluid" id="page_layout">
                <div className="row mb-5">
                    <div className="col-lg-12">
                        <div className="card-header">
                            <div className="header-title">
                                <h4 className="card-title text-capitalize mb-3">playlist by artist</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row artist-list">
                        <div className="col-xl-3 col-md-6 mb-3">
                            <div className="bg-soft-danger position-relative  rounded-3 card-box mb-3 ">
                                <img src={peanut} id="artist-playlist" class="img-fluid mx-auto d-block" alt="play-img"></img>
                            </div>
                            <a href="../dashboard/music-player.html" class="text-capitalize h5">HAN WANGHO</a>
                            <small class="fw-normal line-count-1 text-capitalize"><b style={{ color: '#F05A22' }}>HLE</b> PEANUT</small>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-3">
                            <div className="bg-soft-danger position-relative  rounded-3 card-box mb-3 ">
                                <img src={faker} id="artist-playlist" class="img-fluid mx-auto d-block" alt="play-img"></img>
                            </div>
                            <a href="../dashboard/music-player.html" class="text-capitalize h5">LEE SANG-HYEOK</a>
                            <small class="fw-normal line-count-1 text-capitalize"><b style={{ color: 'red' }}>T1</b> FAKER</small>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-3">
                            <div className="bg-soft-danger position-relative  rounded-3 card-box mb-3 ">
                                <img src={bin} id="artist-playlist" class="img-fluid mx-auto d-block" alt="play-img"></img>
                            </div>
                            <a href="../dashboard/music-player.html" class="text-capitalize h5">CHEN ZE-BIN</a>
                            <small class="fw-normal line-count-1 text-capitalize"><b style={{ color: 'rgb(37, 150, 190)' }}>BLG</b> BIN</small>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-3">
                            <div className="bg-soft-danger position-relative  rounded-3 card-box mb-3 ">
                                <img src={guma} id="artist-playlist" class="img-fluid mx-auto d-block" alt="play-img"></img>
                            </div>
                            <a href="../dashboard/music-player.html" class="text-capitalize h5">LEE MIN-HYUNG</a>
                            <small class="fw-normal line-count-1 text-capitalize"><b style={{ color: 'red' }}>T1</b> Gumayusi</small>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export {
    Home
}