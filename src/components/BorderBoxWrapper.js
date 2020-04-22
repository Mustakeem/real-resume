import React from 'react';

import {useStyletron} from 'baseui';

const BorderBoxWrapper = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                border: `solid 2px ${theme.colors.mono900}`,
                borderStyle: 'dashed',
                padding: '0 4vw',
                width: '50vw',
                margin: '5vh 0'
            })}
        >
            {children}
        </div>
    )

};

export default BorderBoxWrapper;