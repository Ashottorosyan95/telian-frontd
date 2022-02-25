import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const YourOrders = () => {
    let dispatch = useDispatch();
    let carts = useSelector((state) => state.products.carts);
    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * (item.sale_price || item.price))
        }, 0)
    }

    return (
        <>
            <div className="order_review  box-shadow bg-white">
                <div className="check-heading">
                    <h3>Ձեր պատվերները</h3>
                </div>
                <div className="table-responsive order_table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ապրանքներ</th>
                                <th>Ընդհանուր</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title} <span className="product-qty">x {item.quantity}</span>
                                        </td>
                                        <td>{(item.sale_price || item.price)} դ․</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Ընդ․ արժեքը</th>
                                <td className="product-subtotal">{cartTotal()} Դ․</td>
                            </tr>
                            {/* <tr>
                                <th>Total</th>
                                <td className="product-subtotal">$349.00</td>
                            </tr> */}
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default YourOrders