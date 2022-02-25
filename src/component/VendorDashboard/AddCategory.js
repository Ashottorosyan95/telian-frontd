import axios from 'axios';
import React, {useState} from 'react';
import Swal from 'sweetalert2';

const AddCategory = () => {
    const [categoryName, setcategoryName] = useState('');
    const [validated, setValidated] = useState(true);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if(categoryName.trim() != ''){
            axios.post(process.env.REACT_APP_BACKEND_URL + '/addCategory', {name: categoryName}).then(res => {
                if(res.status===200){
                    setcategoryName('')
                    Swal.fire('Հաջողություն','Ավելացվել է նոր կատեգորիա', 'success');
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
                                <h4>Ավելացնել կատեգորիա</h4>
                                <form className="add_product_form" onSubmit={handleAddCategory}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_name">Կատեգորիայի Անունը<span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    id="product_name" 
                                                    className="form-control"
                                                    placeholder="Օր․՝ Կոշիկ" 
                                                    value={categoryName} 
                                                    onChange={(e) => setcategoryName(e.target.value)}
                                                />
                                                {!validated && !categoryName  ? <span style={{color: 'red'}}>Մուտքագրեք կատեգորիայի անունը</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="btn_right_table">
                                                <button className="theme-btn-one bg-black btn_sm">Ավելացնել Կատեգորիա</button>
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

export default AddCategory