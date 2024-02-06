const ProductSpecification = ({ title, description }) => {
    return (
        <div className="mt-4">
            <strong>{title}:</strong> {description}
        </div>
    );
};

export default ProductSpecification;