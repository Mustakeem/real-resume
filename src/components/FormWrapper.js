import React from 'react';

import { useStyletron } from 'baseui';

const FormWrapper = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                width: '50vw',
                height: 'auto',
                // backgroundColor: theme.colors.mono200
            })}
        >
            {children}
        </div>
    );

};

export default FormWrapper;