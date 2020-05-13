import React from 'react';
import moment from 'moment-timezone';
import { Table, Button } from 'react-bootstrap';


const TiingoStock = ({ products }) => {
    const product = products[0];
    const {date} = product;
    const time = moment(date).format("YYYY-MM-DD");

    return (
        <Table variant="dark" style={{margin:'5px'}}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>Close</th>
                    <th>High</th>
                    <th>Low</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{time}</td>
                    <td>{product.open}</td>
                    <td>{product.close}</td>
                    <td>{product.high}</td>
                    <td>{product.low}</td>
                </tr>
            </tbody>

        </Table>
    );

}

export default TiingoStock;