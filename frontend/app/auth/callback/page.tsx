"use client";
import { Suspense } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handleGoogleCallback } = useAuthStore();

    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            handleGoogleCallback(code)
                .then(() => {
                    router.push("/");
                })
                .catch((error) => {
                    console.error("Authentication failed:", error);
                    router.push("/?error=auth_failed");
                });
        } else {
            router.push("/?error=no_code");
        }
    }, [searchParams, handleGoogleCallback, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="flex flex-col items-center gap-6">
                {/* Animated loader */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-900 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                </div>

                {/* Text */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Completing Sign In
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default function AuthCallback() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-900 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="text-2xl font-bold text-white">Loading...</div>
                </div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}