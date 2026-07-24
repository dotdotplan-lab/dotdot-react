import React, {useState} from 'react';

function ProductImageModal({ product, onClose }) {
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);

    useState(() => {
        fetch(`/api/products/${product.id}/images`)
            .then(res => res.json())
            .then((json) => {
                setImage(json.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{product.productName} - 이미지</h3>
                {loading ? (
                    <p>불러오는 중....</p>
                ) : (
                    <div className="image-list">
                        {image.map((img) => (
                            <div key={img.id} className={`image-item ${img.isMain ? "image-item--main" : ""}`}>
                                <img src={img.imageUrl} alt={img.originalFileName }/>
                                <span>{img.originalFileName}</span>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default ProductImageModal;