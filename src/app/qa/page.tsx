"use client";
import React from "react";

export default function QA() {
  function openMessenger() {
    // Replace this with your provider’s open call, e.g. window.YourMessenger.open()
    // @ts-ignore
    (window as any).RAINMAKR_MESSENGER?.open?.();
  }
  return (
    <main className="max-w-xl mx-auto py-16 px-6 space-y-6">
      <h1 className="text-2xl font-semibold">Messenger QA</h1>
      <button
        onClick={openMessenger}
        className="px-4 py-2 rounded-xl bg-pink-600 text-white"
      >
        Open Messenger
      </button>
      <p className="text-sm text-gray-400">This page is only for testing the widget on the live domain.</p>
    </main>
  );
}
