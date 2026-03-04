"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface CdekWidgetProps {
    onSelect: (data: { pointCode: string; tariffCode: number; deliverySum: number; address: string; time: string }) => void;
    weight: number; // in grams
}

export function CdekWidget({ onSelect, weight }: CdekWidgetProps) {
    const widgetRef = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (!scriptLoaded || !widgetRef.current) return;

        // Init CDEK Widget
        // @ts-ignore
        const widget = new window.CDEKWidget({
            from: "Новосибирск",
            root: "cdek-map",
            apiKey: "90060938-1649-41d5-bc65-055cfed602c3", // public test key or left blank if local
            servicePath: "/api/cdek/widget", // if we want to proxy it, but widget usually works directly
            // test keys don't always need servicePath if they use raw widget, but we can set default.
            goods: [
                {
                    width: 20,
                    height: 10,
                    length: 30,
                    weight: weight / 1000 // widget expects kg
                }
            ],
            onReady: () => {
                console.log("CDEK Widget ready");
            },
            onChoose: (type: string, tariff: any, address: any) => {
                const pointCode = address.code;
                const tariffCode = tariff.tariff_code;
                const deliverySum = tariff.delivery_sum;
                const addressFull = address.address;
                const time = `${tariff.period_min}-${tariff.period_max} дней`;

                onSelect({
                    pointCode,
                    tariffCode,
                    deliverySum,
                    address: addressFull,
                    time
                });
            }
        });

        return () => {
            if (widget) {
                widget.destroy();
            }
        };
    }, [scriptLoaded, weight, onSelect]);

    return (
        <div className="w-full relative min-h-[500px] border-2 border-zinc-900 bg-zinc-50 flex items-center justify-center shadow-brutal">
            <Script
                src="https://widget.cdek.ru/widget/widjet.js"
                onLoad={() => setScriptLoaded(true)}
            />
            <div id="cdek-map" ref={widgetRef} className="w-full h-[500px]" />
            {!scriptLoaded && (
                <div className="absolute inset-0 flex items-center justify-center font-mono text-zinc-500">
                    ЗАГРУЗКА БОЕВОЙ СИСТЕМЫ СДЭК...
                </div>
            )}
        </div>
    );
}
