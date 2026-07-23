import React from 'react';
import ProductGrid from "./ProductGrid.jsx";

function ProductMngt() {
    const onEdit = (product) => {
        console.log("수정", product);
    };

    const onDelete = (product) => {
        console.log("삭제", product);
    };

    return (
        <div>
            <ProductGrid onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
}

export default ProductMngt;