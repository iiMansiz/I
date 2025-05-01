import { saveOrderToFirebase } from "@/lib/firebase/orders";

const handleSubmitOrder = async () => {
  const orderData = {
    items: cartItems,
    total: totalPrice,
    userId: currentUser.uid,
    alamat: alamatUser,
    metodePembayaran: "Transfer Bank",
    isPaid: false,
  };

  const orderId = await saveOrderToFirebase(orderData);
  if (orderId) {
    router.push(`/checkout/${orderId}`); // lanjut ke upload bukti
  }
};
