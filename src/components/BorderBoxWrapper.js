import React from 'react';

import {useStyletron} from 'baseui';

const BorderBoxWrapper = ({ children }) => {
    const [css] = useStyletron();
    return (
        <div
            className={css({
                border: 'solid 2px black',
                borderStyle:'dashed',
                padding: '4vh 4vw',
                width: '50vw',
                margin: '5vh 0'
            })}
        >
            {children}
        </div>
    )

};

export default BorderBoxWrapper;