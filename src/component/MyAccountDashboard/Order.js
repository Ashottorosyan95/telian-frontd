import React from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
    let orders = useSelector((state) => state.user.userOrders);

    return (
            <div className="myaccount-content">
                <h4 className="title">Պատվերներ</h4>
                <div className="table_page table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Պատվեր #</th>
                                <th>Ապրանքի անունը</th>
                                <th>Ընդհանուր արժեքը</th>
                                <th>Կարգավիճակ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((data, index)=>(
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>
                                            {data.products.map(p => {
                                                return (
                                                    <div key={p.id}>
                                                        <span>{p.title}</span>
                                                        <br/>
                                                    </div>
                                                )
                                            })}
                                        </td>
                                        <td>{data.cartTotal}</td>
                                        <td>
                                            <span className={`badge ${data.status === 'pending' ? 'badge-warning' : data.status === 'approved' ? 'badge-info' : 'badge-success'}`}>
                                                {data.status === 'pending' ? 'Ընթացքի մեջ' : data.status === 'approved' ? 'Հաստատված' : 'Ստացած'}
                                            </span>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Order
