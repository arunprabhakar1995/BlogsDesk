"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  return (
    <header className="py-4 px-20 flex justify-between items-center">
      <Link href={`/`} className="block">
      <h1 className="text-xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="60"
          viewBox="0 0 300 48"
          fill="none"
        >
          {/* Icon: Paper with Pen */}
          <g>
            {/* Paper */}
            <rect
              x="2"
              y="2"
              width="32"
              height="40"
              rx="4"
              fill="#3B82F6"
              stroke="black"
              strokeWidth="2"
            />
            {/* Lines on paper */}
            <line
              x1="8"
              y1="12"
              x2="28"
              y2="12"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="18"
              x2="28"
              y2="18"
              stroke="white"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="24"
              x2="20"
              y2="24"
              stroke="white"
              strokeWidth="2"
            />
            {/* Pen */}
            <path
              d="M30 34L42 46L36 48L28 40Z"
              fill="#FBBF24"
              stroke="black"
              strokeWidth="1.5"
            />
          </g>

          {/* Text */}
          <text
            x="56"
            y="32"
            fontSize="24"
            fontFamily="Verdana, sans-serif"
            fill="#111827"
            fontWeight="bold"
          >
            BlogsDesk
          </text>
        </svg>
      </h1>
      </Link>
    </header>
  );
}
