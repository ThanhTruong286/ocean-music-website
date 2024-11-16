import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/artist.scss';
const Artist = () => {
  return (
    <div>
      <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <div id="home">
          <Header />
          <div className="content-inner pb-0 container-fluid" id="page_layout">
            <div className="row mb-5">
            </div>
          </div>
          <div class="container">
            <div class="header">
              <h1>
                Release
              </h1>
            </div>
            <div class="tabs">
              <div class="tab active">
                Featured
              </div>
              <div class="tab">
                Popular
              </div>
              <div class="tab">
                Newest
              </div>
            </div>
            <div class="grid">
              <div class="card">
                <img alt="A man playing guitar" height="200" src="https://storage.googleapis.com/a1aa/image/xZoM7JyQ2wIVHdjDSJAGsBvoc7Fvc4NsGeeAiePo0jCp7AjnA.jpg" width="200" />
                <div class="info">
                  <h3>
                    The Girl
                  </h3>
                  <p>
                    By Snoods Smith Jonas
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A woman singing on stage" height="200" src="https://storage.googleapis.com/a1aa/image/dimBiYgEMB50FR7wss2bWW8AWIiXp7hmdEVGTrKS3t2aHY8E.jpg" width="200" />
                <div class="info">
                  <h3>
                    Masinc Party Album
                  </h3>
                  <p>
                    By Kerana Euc Veena
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A person walking in a foggy forest" height="200" src="https://storage.googleapis.com/a1aa/image/CPEBhj1uX6KmP5IZ5uyUPha6HREwDCfX4YmrMC4OIhX4Ow4JA.jpg" width="200" />
                <div class="info">
                  <h3>
                    The Silent One
                  </h3>
                  <p>
                    By Alex Williams
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A woman with headphones" height="200" src="https://storage.googleapis.com/a1aa/image/eu3hzb6g6X2neEWe9gPEwoJJeVESzDe7YXei82GGActkaHY8E.jpg" width="200" />
                <div class="info">
                  <h3>
                    Just Perfect
                  </h3>
                  <p>
                    By Karuna Truss
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A car driving into the sunset" height="200" src="https://storage.googleapis.com/a1aa/image/tNmJsSghYkI7OdcBKdmiF6HZsg9Cat8Vj0GVInK5jFUdHY8E.jpg" width="200" />
                <div class="info">
                  <h3>
                    Everything I Want
                  </h3>
                  <p>
                    By Neha Arena
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A person sitting in a dark room with a glowing infinity symbol" height="200" src="https://storage.googleapis.com/a1aa/image/HxJvdK2eDJSftUTTbXwmJfRZWKhhF17oY6rfCyrrjKd72BGPB.jpg" width="200" />
                <div class="info">
                  <h3>
                    Infinity
                  </h3>
                  <p>
                    By Nil Ana Meet Nagak
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A vintage car on a road" height="200" src="https://storage.googleapis.com/a1aa/image/qfKq56sMtSzvVa1M88S805f66djhzTICDub0ynAdM0RvdgxTA.jpg" width="200" />
                <div class="info">
                  <h3>
                    Travel Mix
                  </h3>
                  <p>
                    By Alex Williams
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A couple embracing in a field" height="200" src="https://storage.googleapis.com/a1aa/image/eeRK9yJ2c0s1YEZcF8jeMo2FtILtiwxiqHpJfM1MqRKy2BGPB.jpg" width="200" />
                <div class="info">
                  <h3>
                    Romantic Songs
                  </h3>
                  <p>
                    By Euc Veena
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A man singing and playing guitar on stage" height="200" src="https://storage.googleapis.com/a1aa/image/0HGr3L8QSzLlJ5TxbzOz8fmdITWm3KJ7NN6SUtluoFv7Ow4JA.jpg" width="200" />
                <div class="info">
                  <h3>
                    Rocking Party
                  </h3>
                  <p>
                    By Omaso Smith
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A woman looking out of a window at sunrise" height="200" src="https://storage.googleapis.com/a1aa/image/b1kDLrCR4N7FLtLwwVMfuuumXQl6XNCPKVr2M1ybS8m0Ow4JA.jpg" width="200" />
                <div class="info">
                  <h3>
                    Peace Of Mind
                  </h3>
                  <p>
                    By Karuna Truss
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A man in a recording studio with headphones" height="200" src="https://storage.googleapis.com/a1aa/image/fiejSwfAU6EhBJseqme9KcznXnZZqgAA66RzTDcYMStSuDMeE.jpg" width="200" />
                <div class="info">
                  <h3>
                    Rap Songs
                  </h3>
                  <p>
                    By Karuna Truss
                  </p>
                </div>
              </div>
              <div class="card">
                <img alt="A woman in a retro outfit with a group of people in the background" height="200" src="https://storage.googleapis.com/a1aa/image/exqxbdVEKu2seErpj4Qq6QPJYcpb8T2oKchCIIFxleGm7AjnA.jpg" width="200" />
                <div class="info">
                  <h3>
                    Retro Albums
                  </h3>
                  <p>
                    By Retro Albums
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </main>
      <Footer />
    </div>
  )
}
export default Artist