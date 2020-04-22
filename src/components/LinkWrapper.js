import React from 'react';

import {useStyletron} from 'baseui'

const LinkWrapper = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'block',
                margin: '2vh 2vw 0 0',
            })}
        >
            {children}
        </div>
    )
};

export default LinkWrapper;