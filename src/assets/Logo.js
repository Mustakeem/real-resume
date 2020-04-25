import React from 'react';

const Logo = ({
    height = 89,
    width = 89
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width.toString()} height={height.toString()} viewBox="0 0 89 89">
            <g id="Logo" transform="translate(-1087.12 -351.12)">
                <g id="Rectangle_3" data-name="Rectangle 3" transform="translate(1087.12 351.12)" stroke="#000" strokeWidth="5">
                    <rect width="89" height="89" stroke="none" />
                    <rect x="2.5" y="2.5" width="84" height="84" fill="none" />
                </g>
                <text id="R" transform="translate(1111.12 415.12)" fill="#fff" fontSize="54" fontFamily="Montserrat-ExtraBold, Montserrat" fontWeight="800"><tspan x="0" y="0">R</tspan></text>
            </g>
        </svg>
    );
}



export default Logo;