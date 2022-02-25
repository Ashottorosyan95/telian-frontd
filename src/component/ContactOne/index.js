import React from 'react'
import Map from './Map'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ContactArea = () => {
    return (
        <>
            <section id="contact_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact_info">
                                <h3>Կապ մեզ հետ</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="left_side_contact side_card">
                                <ul>
                                    <li className="address_location">
                                    <div className="contact_widget ">
                                    <i className="fa fa-map-marker"></i>
                                        <p>Կ. Ուլնեցի 59/5, կրպակ 14</p>
                                    </div>
                                    </li>
                                    <li className="address_location">
                                        <div className="contact_widget">
                                            <i className="fa fa-phone"></i>
                                            <a href="tel: +374 96 96 38 07">+374 96 96 38 07</a>
                                        </div>
                                    </li>
                                    <li className="address_location">
                                        <div className="contact_widget">
                                            <i className="fa fa-envelope"></i>
                                            <Link to="/">info@telianicollection.am</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            {/* <div className="contact_form_one">
                                <h3>ԹՈՂԵՔ ՄԵԶ ՀԱՂՈՐԴԱԳՐՈՒԹՅՈՒՆ</h3>
                                <form onSubmit={(e)=> {e.preventDefault(); Swal.fire('Thank You', 'We Got Your Message', 'success')}}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Անուն" required/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Էլ․ հասցե" required/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Հեռ․" required/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Վերնագիր" required/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                <textarea rows="7" className="form-control" placeholder="Նամակ"></textarea>
                                            </div>
                                            <div className="submit_bitton_contact_one">
                                                <button className="theme-btn-one btn-black-overlay btn_md">Ուղարկել</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                        <Map />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactArea