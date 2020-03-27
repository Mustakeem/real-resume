import React from 'react';

import { useStyletron } from 'baseui';
import { Alert } from 'baseui/icon';

export function Negative() {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                paddingRight: theme.sizing.scale500,
                color: theme.colors.negative400,
            })}
        >
            <Alert size='18px' />
        </div>
    );
};

