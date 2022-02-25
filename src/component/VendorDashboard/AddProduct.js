import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import img1 from '../../assets/img/product-image/product1.png'

const AddProduct = () => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(true);
    const [title, setTitle] = useState('');
    const [labels, setLabels] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [count, setCount] = useState('');
    const [productPhotos, setProductPhotos] = useState([  ]);
    const [productCategories, setProductCategories] = useState([]);
    const [sizes, setProductSizes] = useState([]);
    const [types, setProducTypes] = useState('');

    const history = useHistory();
    
    const addProductPhotos = (e) => {
        const newProductPhotos = [];
        for(let i = 0; i < e.target.files.length; i++) {
          newProductPhotos.push(e.target.files[i]);
        }
        setProductPhotos(newProductPhotos);
    }

    const removeImage = (idx) => {
        const newProductPhotos = productPhotos.filter((el, i) => i !== idx);
        setProductPhotos(newProductPhotos);
      }

    const addProduct = (e) => {
        const checkedCategories = productCategories.filter(item => item.checked).map(item => item.id);
        const checkedSizes = sizes.filter(item => item.checked).map(item => item.id);
        
        e.preventDefault();
        const formData = new FormData();
        const productObj = {
            title: title,
            rate: types,
            price: price,
            count: count,
            sale_price: salePrice,
            labels: labels,
            description: description,
        };

        for (const key of Object.keys(productPhotos)) {
            formData.append('imgCollection', productPhotos[key])
        }

        if(
            title.trim() != '' &&
            types.trim() != '' &&
            productPhotos.length &&
            labels.trim() != '' &&
            price.trim() != '' &&
            count.trim() != ''
            ){
                if(checkedSizes.length || (!checkedSizes.length && types === 'bags' || types === 'accessories')) {
                    formData.append('product', JSON.stringify(productObj));
                    formData.append('productCategories', JSON.stringify(checkedCategories))
                    formData.append('productSize', JSON.stringify(checkedSizes))
                    axios.post(process.env.REACT_APP_BACKEND_URL + "/addProd", formData)
                    .then(res => {
                        dispatch({ type: "products/getProducts", products: res.data.products });
                        setTitle('');
                        setPrice('');
                        setCount('');
                        setSalePrice('');
                        setLabels('');
                        setDescription('');
                        setProducTypes('')
                        setProductSizes(sizes.map(item => ({...item, checked: false})));
                        setProductCategories(productCategories.map(item => ({...item, checked: false}) ));
                        Swal.fire('Success','Ավելացվել է նոր ապրանք', 'success');
                        history.push('/vendor/all-products');
            
                    })
                    .catch(err => {
                        console.log('errrrrrr', err)
                    });
                    setValidated(true)
                }
        } else {
            setValidated(false)
        }
    }

    useEffect(() => {
        // axios.get(process.env.REACT_APP_BACKEND_URL + '/category').then(res => {
        //     if(res.status === 200) {
        //       setProductCategories(res.data.categories)
        //     }
        // })
        // .catch(err => {
        //   console.log('errrrrrr', err)
        // });

        axios.get(process.env.REACT_APP_BACKEND_URL + '/product-size').then(res => {
            if(res.status === 200) {
              setProductSizes(res.data.sizes)
            }
          })
          .catch(err => {
            console.log('err', err)
          });
    }, [])


    const handleProductCategoryChange = (idx) => {
        const newProductCategories = [...productCategories];
        newProductCategories[idx].checked = !newProductCategories[idx].checked;
        setProductCategories(newProductCategories);
      }

      const handleProductSizeChange = (idx) => {
        setValidated(false);
        const newProductSize = [...sizes];
        newProductSize[idx].checked = !newProductSize[idx].checked;
        setProductSizes(newProductSize);
      } 
      

    return (
            <section id="add_product_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="add_product_wrapper">
                                <h4>Ավելացնել ապրանք</h4>
                                <form className="add_product_form" onSubmit={addProduct}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="image-input">
                                                <div className="selected-images">
                                                { productPhotos.length ? 
                                                    productPhotos.map((el, i) => <img onClick={() => removeImage(i)} src={URL.createObjectURL(el)} className="image-preview" alt="" key={i} />) :
                                                    <img src={img1} className="image-preview" alt="img" />
                                                }
                                                </div>
                                                <input 
                                                    id="imageInput"
                                                    type="file"
                                                    name="imgCollection"
                                                    onChange={(e) => addProductPhotos(e)}
                                                    multiple="multiple"
                                                    accept="image/png, image/jpeg"
                                                />
                                                {!validated && !productPhotos.length ?
                                                    <span style={{color: 'red'}}>Ավելացրեք Նկար</span> : <></>
                                                }
                                                <label htmlFor="imageInput" className="image-button">
                                                <i className="fa fa-image"></i>Ավելացնել Նկար</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_name">Ապրանքի Անունը<span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    id="product_name" 
                                                    className="form-control"
                                                    placeholder="Ապրանքի անունը"  
                                                    value={title} 
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                                {!validated && !title  ? <span style={{color: 'red'}}>Մուտքագրեք ապրանքի անունը</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_name">Ապրանքի Պիտակը<span className="text-danger">*</span></label>
                                                <input 
                                                    type="text" 
                                                    id="product_name" 
                                                    className="form-control"
                                                    placeholder="Ապրանքի անունը"  
                                                    value={labels} 
                                                    onChange={(e) => setLabels(e.target.value)}
                                                />
                                                {!validated && !labels  ? <span style={{color: 'red'}}>Մուտքագրեք ապրանքի պիտակը</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_price">Հիմնական Գին ( Դ)<span className="text-danger">*</span></label>
                                                <input 
                                                        type="number" 
                                                        id="product_price" 
                                                        className="form-control" 
                                                        placeholder="Ապրանքի Գինը" 
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                />
                                                {!validated && !price  ? <span style={{color: 'red'}}>Մուտքագրեք ապրանքի գինը</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_price">Զեղջված Գին ( Դ)</label>
                                                <input 
                                                        type="number" 
                                                        id="product_price" 
                                                        className="form-control" 
                                                        placeholder="Ապրանքի Գինը" 
                                                        
                                                        value={salePrice}
                                                        onChange={(e) => setSalePrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="available_stock">Քանակը Պահեստում<span className="text-danger">*</span></label>
                                                <input 
                                                      type="number" 
                                                      id="available_stock" 
                                                      className="form-control" 
                                                      placeholder="25" 
                                                      value={count}
                                                      onChange={(e)=> setCount(e.target.value)}
                                                />
                                                {!validated && !count  ? <span style={{color: 'red'}}>Նշեք քանակը</span> : <></>}
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="available_stock">Ընտրեք կատեգորիան<span className="text-danger">*</span></label>
                                                <select  name="cars" value={types}  onChange={(e)=> {setProducTypes(e.target.value); setValidated(false)}}>
                                                    <option value=""  disabled>Ընտրեք կատեգորիան...</option>
                                                    <option value="women">Կանացի</option>
                                                    <option value="men">Տղամարդու</option>
                                                    <option value="bags">Պայուսակներ</option>
                                                    <option value="accessories">Աքսեսուարներ</option>
                                                </select>
                                                {!validated && !types ? <span style={{color: 'red'}}>Նշեք կատեգորիան</span> : <></>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_name">Ապրանքի Նկարագրությունը</label>
                                                <textarea 
                                                    type="text" 
                                                    className="form-control-textarea"
                                                    value={description} 
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        {types !== "bags" &&  types !== "accessories" ?
                                            <div className="col-lg-6">
                                                <div className="fotm-group">
                                                    <label htmlFor="product_available">Ընտրեք Չափսը<span className="text-danger">*</span></label>
                                                    {sizes.map((el, i) => {
                                                        return (
                                                            <div key={el.id}>
                                                                <input 
                                                                    type="checkbox"
                                                                    id="product_available" 
                                                                    checked={el.checked}
                                                                    onChange={() => handleProductSizeChange(i)}
                                                                    className="category-checkbox"
                                                                />
                                                                {el.name} 
                                                            </div>
                                                        )
                                                    })}
                                                    {!validated && sizes.filter(item => item.checked).length == 0  ? <p style={{color: 'red'}}>Ընտրեք կոշիկի չափսը</p> : <></>}
                                                </div>
                                            </div> : <></>
                                        }
                                        {/* <div className="col-lg-3">
                                            <div className="fotm-group">
                                                <label htmlFor="product_available">Ընտրեք Գույնը<span className="text-danger">*</span></label>
                                                <input 
                                                      type="color" 
                                                      id="available_stock" 
                                                      className="form-control"      
                                                />
                                                
                                            </div>
                                        </div> */}
                                        {/* <div className="col-lg-6">
                                                    <div className="fotm-group">
                                                        <label htmlFor="product_available">Ընտրեք կատեգորիան<span className="text-danger">*</span></label>
                                                        {!validated && productCategories.filter(item => item.checked).length == 0  ? <p style={{color: 'red'}}>Ընտրեք նվազագույնը մեկ կատեգորիա</p> : <></>}
                                                    {productCategories.map((el, i) => {
                                                        return (
                                                                <div>
                                                                    <input 
                                                                        type="checkbox"
                                                                        id="product_available" 
                                                                        custom id={'catrgory_' + el.id}
                                                                        checked={el.checked}
                                                                        onChange={() => handleProductCategoryChange(i)}
                                                                        className="category-checkbox"
                                                                    />
                                                        <label 
                                                           variant="custom-checkbox" 
                                                           htmlFor={'catrgory_' + el.id}
                                                        > 
                                                        {el.name} 
                                                        </label>
                                                        </div>
                                                        )
                                                    })}
                                                    </div>
                                        </div> */}
                                        {/* <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="product_available">Ապրանքը Հասանելի է <span className="text-danger">*</span></label>
                                                <input type="date" id="product_available" className="form-control" />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="whole_sale">Whole Sale Support<span className="text-danger">*</span></label>
                                                <select name="product" id="whole_sale" required>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="flash_sale">Flash Sale Support<span className="text-danger">*</span></label>
                                                <select name="product" id="flash_sale" required>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="fotm-group">
                                                <label htmlFor="frequency_support">Frequency Support<span className="text-danger">*</span></label>
                                                <select name="product" id="frequency_support" required>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>
                                        </div> */}
                                         <div className="col-lg-6">
                                            {/* <div className="fotm-group">
                                                <label htmlFor="product_unit">Ապրանքի Կարգը<span className="text-danger">*</span></label>
                                                <select name="product" id="product_unit" >
                                                    <option value="Filter">Filter</option>
                                                    <option value="volvo">Ամենահյտնի</option>
                                                    <option value="saab">Շատ Վաճառված</option>
                                                    <option value="mercedes">Թրենդային</option>
                                                    <option value="audi">Featured</option>
                                                </select>
                                            </div> */}
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="btn_right_table">
                                                <button className="theme-btn-one bg-black btn_sm">Ավելացնել Ապրանքը</button>
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

export default AddProduct
