import React from 'react';
import { useStyletron } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import {LightTheme, DarkTheme, ThemeProvider, BaseProvider} from 'baseui';
import { Button } from 'baseui/button';



const engine = new Styletron();

const THEME = {
    light: 'light',
    dark: 'dark',
};

export default function App() {
    const [theme, setTheme] = React.useState(THEME.light);
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={DarkTheme}>
                <ThemeProvider theme={theme === THEME.light ? LightTheme : DarkTheme}>
                    <Button
                        onClick={() =>
                            setTheme(theme === THEME.light ? THEME.dark : THEME.light)
                        }
                    >
                        Toggle light/dark theme!
                    </Button>
                </ThemeProvider>
            </BaseProvider>
        </StyletronProvider>
    );
}

