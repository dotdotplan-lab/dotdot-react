import MainSpace from "../../../layouts/MainSpace.jsx";
import ProductMngt from "./ProductMngt.jsx";
import Button from "../../../components/Button.jsx";

function Shop() {

  return (
      <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">상품 관리(... 준비중 ...)</h1>
          </div>
          <hr className="border-gray-300 mb-6" />
          <ProductMngt />
      </div>
  );
}
export default Shop;