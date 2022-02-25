import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const Map = () => {
    const mapStyles = {
        height: "50vh",
        width: "100%",
        margin: "0 0 0 0"
    };
    const defaultCenter = {
        lat: 22.8136822, lng: 89.5635596
    }
    return (
        <>
            <div className="col-lg-12">
                <div className="map_area">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.0385068793416!2d44.537781014755105!3d40.208206376220204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2d04dab4d5d%3A0x6081554736dbac6c!2zNTkgS2FyYXBldCBVbG5ldHNpIFN0LCBZZXJldmFuLCDQkNGA0LzQtdC90LjRjw!5e0!3m2!1sru!2sru!4v1610491071733!5m2!1shy!2shy" width="600" height="400" frameborder="0" style={{border: '0px', pointerEvents: 'none'}} allowFullScreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
        </>
    )
}
export default Map