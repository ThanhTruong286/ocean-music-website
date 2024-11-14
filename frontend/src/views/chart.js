import React, { useEffect } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../styles/chart.scss';
import ZingChart from 'zingchart-react';  // Thư viện zingchart-react
import 'zingchart/es6';  // Đảm bảo import zingchart
import '@fortawesome/fontawesome-free/css/all.min.css';  // Fontawesome icon

const Chart = () => {

    // Sử dụng useEffect để gán key bản quyền
    useEffect(() => {
        ZingChart.LICENSE = ["YOUR_ZINGCHART_LICENSE_KEY"];  // Thay "YOUR_ZINGCHART_LICENSE_KEY" bằng key bản quyền của bạn
    }, []);

    // Cấu hình của biểu đồ
    const myConfig = {
        type: 'line',
        backgroundColor: '#1a1a2e', // Nền tối
        title: {
            text: '',
            fontColor: '#fff'
        },
        plot: {
            aspect: 'spline',
            marker: {
                visible: false
            },
            lineWidth: 2
        },
        scaleX: {
            values: ['16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
            item: {
                fontColor: '#fff'
            },
            lineColor: '#333',
            tick: {
                lineColor: '#333'
            }
        },
        scaleY: {
            lineColor: '#333',
            tick: {
                lineColor: '#333'
            },
            item: {
                fontColor: '#fff'
            }
        },
        series: [
            {
                values: [20, 30, 25, 35, 40, 45, 30, 25, 20, 30, 35, 40],
                lineColor: '#00bfff'
            },
            {
                values: [10, 15, 10, 20, 25, 30, 20, 15, 10, 15, 20, 25],
                lineColor: '#00ff00'
            },
            {
                values: [5, 10, 5, 15, 20, 25, 15, 10, 5, 10, 15, 20],
                lineColor: '#ff0000'
            }
        ]
    };
    

    return (
        <div>
            <aside className="sidebar sidebar-base" id="first-tour" data-toggle="main-sidebar">
                <Sidebar />
            </aside>    
            <main className="main-content">
                <div id="home">
                    <Header />
                    <div className="header">
                        <h1>Biểu đồ phổ biến </h1>
                        <i className="fas fa-play-circle"></i>
                    </div>
                    <div id="chartDiv">
                        {/* ZingChart component với cấu hình và kích thước */}
                        <ZingChart data={myConfig} height="500px" width="100%" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Chart;
