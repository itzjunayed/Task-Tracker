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
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl">Completing sign in...</div>
        </div>
    );
}

export default function AuthCallback() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}