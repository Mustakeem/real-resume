import React from 'react';

import {useStyletron} from 'baseui';

const Main = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                width: '80vw',
                flexDirection: 'column',
                marginLeft: '15vw',
                padding: '10% 10%',
                // backgroundColor: theme.colors.mono200
            })}
        >
            {children}
        </div>
    );
};

export default Main;
