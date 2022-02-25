import React from 'react'
// import img
import img1 from '../../assets/img/common/img-about.jpg'

const AboutTop = () => {
    return (
        <>
            <section id="about-top" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_img">
                                <img src={img1} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_left_content">
                                <h2>ՄԵՐ ՄԱՍԻՆ</h2>
                                <h4 className='about_details'>{`Սույն վեբկայքի, ինչպես նաև դրանում ներառված ապրանքների վաճառքի և ծառայությունների մատուցման կարգավորումն ու վերահսկումը իրականացվում է <<Արսեն Սաղաթելյան>> Ա/Ձ-ի կողմից՝`}</h4>
                                {/* <p>ՀՎՀՀ՝ 20020471</p> */}
                                <p><strong>Գործունեության հասցե՝</strong> Կ. Ուլնեցի 59/5, կրպակ 14</p>
                                <p><strong>Հեռախոսահամար՝</strong> +374 96 963807</p>
                                <p><strong>Էլեկտրոնային հասցե՝</strong>  info@telianicollection.am</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutTop
