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
          <div class="ocean-container">
            <div class="ocean-header">
              <h1>Release</h1>
            </div>
            <div class="ocean-tabs">
              <div class="ocean-tab ocean-active">Featured</div>
              <div class="ocean-tab">Popular</div>
              <div class="ocean-tab">Newest</div>
            </div>
            <div class="ocean-grid">
              <div class="ocean-card">
                <img alt="A man playing guitar" height="200" src="https://storage.googleapis.com/a1aa/image/xZoM7JyQ2wIVHdjDSJAGsBvoc7Fvc4NsGeeAiePo0jCp7AjnA.jpg" width="200" />
                <div class="ocean-info">
                  <h3>The Girl</h3>
                  <p>By Snoods Smith Jonas</p>
                </div>
              </div>
              <div class="ocean-card">
                <img alt="A woman singing on stage" height="200" src="https://storage.googleapis.com/a1aa/image/dimBiYgEMB50FR7wss2bWW8AWIiXp7hmdEVGTrKS3t2aHY8E.jpg" width="200" />
                <div class="ocean-info">
                  <h3>Masinc Party Album</h3>
                  <p>By Kerana Euc Veena</p>
                </div>
              </div>
              <div class="ocean-card">
                <img alt="A person walking in a foggy forest" height="200" src="https://storage.googleapis.com/a1aa/image/CPEBhj1uX6KmP5IZ5uyUPha6HREwDCfX4YmrMC4OIhX4Ow4JA.jpg" width="200" />
                <div class="ocean-info">
                  <h3>The Silent One</h3>
                  <p>By Alex Williams</p>
                </div>
              </div>
              <div class="ocean-card">
                <img alt="A woman with headphones" height="200" src="https://storage.googleapis.com/a1aa/image/eu3hzb6g6X2neEWe9gPEwoJJeVESzDe7YXei82GGActkaHY8E.jpg" width="200" />
                <div class="ocean-info">
                  <h3>Just Perfect</h3>
                  <p>By Karuna Truss</p>
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