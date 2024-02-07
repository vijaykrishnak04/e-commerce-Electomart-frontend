const ProductSpecification = ({ title, description,index }) => {
    return (
        <div className="mt-4 ">
           {index+1}.<strong className="ml-2">{title}:</strong> {description}
        </div>
    );
};

export default ProductSpecification;