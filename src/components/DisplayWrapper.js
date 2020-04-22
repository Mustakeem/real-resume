import React from 'react';

import { useStyletron } from 'baseui';

const DisplayWrapper = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                flexWrap: 'wrap',
                display: 'flex',
                alignItems: 'center',
                margin: '5vh 0'
            })}
        >
            {children}
        </div>
    )
};

export default DisplayWrapper;