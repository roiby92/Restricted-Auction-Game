import React, { useEffect, useState } from 'react'

const Dealer = (props) => {


    const d = props.dealer
    console.log(d);
    return (
        <div>
            {/* {props.dealer.itemsList.map(i => <p>{i.name}</p>)} */}
        </div>
    )
};

export default Dealer;