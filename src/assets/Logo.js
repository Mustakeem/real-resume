import React from 'react';

const Logo = ({
    height = 187,
    width = 194
}) => {
    return (
        <svg width={width.toString()} height={height.toString()} viewBox="0 0 187 194" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Logo">
        <g id="Rectangle 5" filter="url(#filter0_d)">
        <rect x="20" y="16" width="147" height="143" fill="black"/>
        </g>
        <path id="R" d="M94.144 113.216H78.592V140H50.08V39.2H96.16C105.28 39.2 113.2 40.736 119.92 43.808C126.64 46.784 131.824 51.104 135.472 56.768C139.12 62.336 140.944 68.912 140.944 76.496C140.944 83.792 139.216 90.176 135.76 95.648C132.4 101.024 127.552 105.248 121.216 108.32L142.96 140H112.432L94.144 113.216ZM112.144 76.496C112.144 71.792 110.656 68.144 107.68 65.552C104.704 62.96 100.288 61.664 94.432 61.664H78.592V91.184H94.432C100.288 91.184 104.704 89.936 107.68 87.44C110.656 84.848 112.144 81.2 112.144 76.496Z" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_d" x="0" y="11" width="187" height="183" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="15"/>
        <feGaussianBlur stdDeviation="10"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>
    );
}



export default Logo;