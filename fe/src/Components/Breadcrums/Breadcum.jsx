// import React from 'react';
// import './Breadcum.css';
// import arrow_icon from '../Assets/breadcrum_arrow.png';

// const Breadcum = (props) => {
//     const {product} = props;
//   return (
//     <div className='breadcrum'>
//         HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
//     </div>
//   )
// }

// export default Breadcum;

import React from 'react';
import './Breadcum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcum = (props) => {
    const { product } = props;

    // Check if product exists and has category property
    const category = product && product.category ? product.category : '';

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {category} <img src={arrow_icon} alt="" /> {product ? product.name : ''}
        </div>
    );
}

export default Breadcum;
