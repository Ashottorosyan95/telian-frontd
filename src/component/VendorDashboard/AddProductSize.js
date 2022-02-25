import axios from 'axios';
import React, {useState} from 'react';
import Swal from 'sweetalert2';

const AddProdSizes = () => {
    const [sizeName, setSizeName] = useState('');
    const [validated, setValidated] = useState(true);

    const handleAddSize = (e) => {
      e.preventDefault();
      if(sizeName.trim() != ''){
          axios.post(process.env.REACT_APP_BACKEND_URL + '/addProductSize', {name: sizeName}).then(res => {
              if(res.status===200){
                setSizeName('')
                  Swal.fire('Հաջողություն','Ավելացվել է նոր կոշիկի չափս', 'success');
              }
          })
          .catch(err => {
              console.log('err', err)
          });
          setValidated(true)
      }else {
          setValidated(false)
      }
  }


    return (
            <section id="add_product_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="add_product_wrapper">
                                <h4>Ավելացնել կոշիկի չափս</h4>
                                <form className="add_product_form" onSubmit={handleAddSize}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_name">Կոշիկի Չափսը<span className="text-danger">*</span></label>
                                                <input 
                                                    type="number" 
                                                    id="product_name" 
                                                    className="form-control"
                                                    placeholder="Օր․՝ 36" 
                                                    value={sizeName} 
                                                    onChange={(e) => setSizeName(e.target.value)}
                                                />
                                                {!validated && !sizeName  ? <span style={{color: 'red'}}>Մուտքագրեք Կոշիկի Չափսը</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="btn_right_table">
                                                <button className="theme-btn-one bg-black btn_sm">Ավելացնել Կոշիկի Չափսը</button>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default AddProdSizes