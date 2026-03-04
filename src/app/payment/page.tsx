"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/store/cart";
import { createClient } from "@/utils/supabase/client";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
    const router = useRouter();
    const { items, clearCart } = useCart();
    const [checkoutData, setCheckoutData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");

    useEffect(() => {
        const data = sessionStorage.getItem("checkoutData");
        if (!data) {
            router.push("/checkout");
            return;
        }
        setCheckoutData(JSON.parse(data));
    }, [router]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Имитируем задержку процессинга банка
        await new Promise((r) => setTimeout(r, 1500));

        try {
            const supabase = createClient();

            // Создаём заказ в Supabase со статусом "оплачен"
            const { data: order, error } = await supabase
                .from("orders")
                .insert({
                    customer_info: checkoutData.customer,
                    items: items.map((item) => ({
                        product_id: item.product.id,
                        title: item.product.title,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                    total: checkoutData.total,
                    delivery_info: checkoutData.delivery,
                    status: "paid", // Устанавливаем статус оплачен
                })
                .select()
                .single();

            if (error) throw error;

            clearCart();
            sessionStorage.removeItem("checkoutData");

            // Переход на страницу успеха
            router.push(`/checkout/success?orderId=${order.id}&point=${checkoutData.delivery.address}`);
        } catch (error: any) {
            console.error("Order payment error:", error);
            alert("Ошибка при обработке платежа: " + error.message);
            setLoading(false);
        }
    };

    if (!checkoutData) return null;

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 py-24">
            <Card className="w-full max-w-md border-4 border-zinc-900 shadow-brutal rounded-none bg-white">
                <CardHeader className="border-b-4 border-zinc-900 bg-zinc-100 text-center pb-8 pt-8">
                    <div className="mx-auto w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full mb-4">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-display text-2xl uppercase tracking-widest text-zinc-900">
                        Оплата заказа
                    </CardTitle>
                    <p className="font-mono text-zinc-600 mt-2">
                        К оплате: <strong className="text-xl text-zinc-900">{checkoutData.total.toLocaleString()} ₽</strong>
                    </p>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold font-mono uppercase tracking-wider text-zinc-700 mb-2">Номер карты</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        maxLength={19}
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-zinc-900 outline-none transition-colors font-mono text-lg bg-zinc-50"
                                        value={cardNumber}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                                            setCardNumber(val.replace(/(\d{4})/g, '$1 ').trim());
                                        }}
                                    />
                                    <Lock className="absolute right-3 top-3 text-zinc-400 w-6 h-6" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold font-mono uppercase tracking-wider text-zinc-700 mb-2">ММ/ГГ</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={5}
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-zinc-900 outline-none transition-colors font-mono text-lg bg-zinc-50 text-center"
                                        value={cardExpiry}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                                            if (val.length >= 2) {
                                                setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
                                            } else {
                                                setCardExpiry(val);
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold font-mono uppercase tracking-wider text-zinc-700 mb-2">CVC/CVV</label>
                                    <input
                                        type="password"
                                        required
                                        maxLength={3}
                                        placeholder="***"
                                        className="w-full px-4 py-3 border-2 border-zinc-200 focus:border-zinc-900 outline-none transition-colors font-mono text-lg bg-zinc-50 text-center tracking-widest"
                                        value={cardCvc}
                                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-16 text-lg font-display uppercase tracking-widest rounded-none bg-primary hover:bg-zinc-900 text-white transition-colors duration-300"
                                disabled={loading || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvc.length < 3}
                            >
                                {loading ? "ОБРАБОТКА..." : `ОПЛАТИТЬ ${checkoutData.total.toLocaleString()} ₽`}
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-2 mt-6 text-emerald-600">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-sm font-mono font-bold">БЕЗОПАСНЫЙ ПЛАТЕЖ</span>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
