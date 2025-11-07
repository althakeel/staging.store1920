import React from "react";

const ProductFeatures = ({ product }) => {
  if (!product.section2contentTitle) return null;

  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold mb-2">{product.section2contentTitle}</h2>
      <p className="mb-2">{product.section2contentDesc}</p>
      <ul className="list-disc list-inside">
        {product.section2contentPoints?.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
