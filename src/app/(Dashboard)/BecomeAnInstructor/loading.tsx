"use client";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <div>
      <Player
        className="m-auto"
        autoplay
        loop
        src="/AnimationLoading.json"
        style={{ height: "20rem", width: "20rem" }}
      />
    </div>
  );
}
