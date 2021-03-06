import React from 'react';
import { Link } from 'react-router-dom';

import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { H4 } from 'baseui/typography'

import LoginForm from '../../components/LoginForm';
import Logo from '../../assets/Logo';
import { StyledLink } from 'baseui/link';
import { Card, StyledBody } from 'baseui/card';

const itemProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const Login = () => {
    const [css, theme] = useStyletron();
  
    return (
        <LayoutWrapper>
            <FlexGrid
                flexGridColumnCount={[1]}
                flexGridRowGap='scale800'
            >
                <FlexGridItem {...itemProps}>
                    <Logo />
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <H4>Sign in to Real Resume</H4>
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <LoginForm />
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <Card
                        overrides={{
                            Root: {
                                style: ({ $theme }) => {
                                    return {
                                        width: '50vh',
                                    };
                                }
                            }
                        }}
                    >
                        <StyledBody>
                            <div className={css({
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            })}>
                                New to Real resume?

                                  <Link to='/Signup'>
                                    <StyledLink 
                                                    className={css({
                                                    marginLeft: '10px'
                                                    })}
                                    >
                                        
                                        Create a account
                                        
                                    </StyledLink>
                                </Link>
                            </div>
                        </StyledBody>
                    </Card>
                </FlexGridItem>
            </FlexGrid>
        </LayoutWrapper>

    );
};

const LayoutWrapper = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10% 0',
            })}
        >
            {children}
        </div>
    );

};

// const FormWrapper = ({ children }) => {
//     const [css, theme] = useStyletron();
//     return (
//         <div
//             className={css({
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 // background: theme.colors.accent200,
//                 color: theme.colors.accent700,
//                 padding: '16px 16px'
//             })}
//         >
//             {children}
//         </div>
//     );

// };


export default Login;
