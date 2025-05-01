import UploadBukti from "@/components/UploadBukti";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div>
      <h1>Checkout - Upload Bukti Pembayaran</h1>
      {orderId && <UploadBukti orderId={orderId} />}
    </div>
  );
}
