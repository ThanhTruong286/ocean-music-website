const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="row">
                    <div className="col-12">
                        <input type="range" min="1" max="100" value="0" class="seek_slider" onchange="seekTo()" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">

            </div>
        </footer>
    )
}

export default Footer