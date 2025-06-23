import React from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { CartItem } from "../../types";

interface CartPageProps {
  items: CartItem[];
  onRemove: (productId: number, quantity?: number) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClear: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onRemove,
  onUpdateQuantity,
  onClear,
}) => {
  if (items.length === 0) {
    return (
      <Card className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-2">Your cart is empty</p>
        <p className="text-gray-500">Add some products to get started!</p>
      </Card>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleQuantityChange = (productId: number, change: number) => {
    const item = items.find((i) => i.product_id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
          items)
        </h1>
        <Button variant="danger" onClick={onClear}>
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product_id}>
              <div className="p-6 flex flex-col sm:flex-row gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="text-gray-600 mb-1">
                    ${item.price.toFixed(2)} each
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Total: ${item.total.toFixed(2)}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.product_id, -1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 p-0 flex items-center justify-center"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.product_id, 1)}
                      className="w-8 h-8 p-0 flex items-center justify-center"
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemove(item.product_id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button size="lg" fullWidth className="mt-6">
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
