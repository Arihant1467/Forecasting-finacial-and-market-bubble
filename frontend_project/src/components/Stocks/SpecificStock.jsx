import React from 'react';
import moment from 'moment-timezone';
import { Table, Button } from 'react-bootstrap';


const SpecificStock = ({ products }) => {
    // if (products[0]) {

    // }
    console.log(products);
    const product = products;
    // const {date} = product;
    // const time = moment.utc(date).format("YYYY-MM-DD");

    return (
        <Table variant="dark" style={{margin:'5px'}}>
            <thead>
                <tr>
                    {/* <th>Date</th> */}
                    <th>Open</th>
                    <th>Average Vol</th>
                    <th>Market Cap</th>
                    <th>Website</th>
                    <th>Image</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    {/* <td>{time}</td> */}
                    <td>{product.price ? product.price : ""}</td>
                    <td>{product.volAvg ? product.volAvg : ""}</td>
                    <td>{product.mktCap ? product.mktCap : ""}</td>
                    <td>{product.website ? product.website : ""}</td>
                    <td><img alt = "N/A" src={product.image}/></td>
                </tr>
            </tbody>

        </Table>
    );

}

export default SpecificStock;