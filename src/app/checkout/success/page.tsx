"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MapPin, Package } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);
    const [point, setPoint] = useState<string | null>(null);

    useEffect(() => {
        const id = searchParams.get("orderId");
        const p = searchParams.get("point");

        if (!id) {
            router.push("/");
            return;
        }

        setOrderId(id);
        setPoint(p);
    }, [searchParams, router]);

    if (!orderId) return null;

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50 relative overflow-hidden">
            {/* Декоративный индустриальный шум на фоне */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"%23000000\\" fill-opacity=\\"1\\" fill-rule=\\"evenodd\\"%3E%3Ccircle cx=\\"3\\" cy=\\"3\\" r=\\"3\\"%3E%3C/circle%3E%3Ccircle cx=\\"13\\" cy=\\"13\\" r=\\"3\\"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")' }} />

            <Card className="w-full max-w-lg border-4 border-zinc-900 shadow-brutal rounded-none bg-white relative z-10 text-center">
                <CardHeader className="pt-12 pb-6 border-b-2 border-zinc-100">
                    <div className="mx-auto w-24 h-24 bg-emerald-500 text-white flex items-center justify-center rounded-none shadow-[8px_8px_0px_#047857] mb-8 animate-bounce-short">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <CardTitle className="font-display text-3xl sm:text-4xl uppercase tracking-widest font-black text-zinc-900">
                        Оплата Успешна
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-8 space-y-8">
                    <div className="bg-zinc-100 p-6 border-2 border-zinc-200 text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <Package className="w-6 h-6 text-zinc-500" />
                            <div>
                                <p className="text-sm font-bold font-mono text-zinc-500 uppercase">Сектор / Заказ</p>
                                <p className="font-mono text-lg font-bold">#{orderId.split("-")[0].toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-zinc-500 mt-1" />
                            <div>
                                <p className="text-sm font-bold font-mono text-zinc-500 uppercase">Пункт Выдачи</p>
                                <p className="font-mono text-base font-bold text-zinc-900 mt-1 leading-snug">{point || "Доставка курьером"}</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-mono text-zinc-600 text-sm">
                        Информация о заказе и чек отправлены на ваш Email. Вы можете отслеживать статус сборки в личном кабинете.
                    </p>

                    <Button
                        onClick={() => router.push("/catalog")}
                        className="w-full h-16 text-lg font-display uppercase tracking-widest rounded-none bg-zinc-900 hover:bg-primary text-white transition-colors duration-300 shadow-brutal hover:shadow-none hover:translate-y-1"
                    >
                        ВЕРНУТЬСЯ В АРСЕНАЛ
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center font-mono">ЗАГРУЗКА БАЗЫ ДАННЫХ...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
