import React, {useEffect, useState} from 'react';
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import {deepOrange, indigo, red, teal} from "@mui/material/colors";
import {CssBaseline, darken, lighten, NoSsr} from '@mui/material';
import {ThemeProvider} from "@emotion/react";
import {itIT} from "@mui/x-data-grid";


export const ThemeModeContext = React.createContext({
    mode: 'ligth' as string,
    setMode: (mode: string) => {
    },
  }
);

interface ThemeProps {
  children?: React.ReactNode,
}

const Theme: React.FC<ThemeProps> = ({children}) => {
  const [mode, setMode] = useState('light');
  const themeValue = {mode, setMode}
  const palletType = mode === 'dark' ? 'dark' : 'light';
  const primaryColor = mode === 'light' ? indigo["900"] : teal["300"];
  const secondaryColor = mode === 'light' ? red["800"] : deepOrange["300"];
  const backgroundPaper = mode === 'light' ? '#ffffff' : '#323232';
  const backgroundDefault = mode === 'light' ? '#eeeef4' : '#202020';

  let theme = createTheme({
    typography: {
      fontFamily: 'Lexend, sans-serif',
    },
    shape: {
      borderRadius: 16,
    },
    palette: {
      mode: palletType,
      primary: {
        main: primaryColor
      },
      secondary: {
        main: secondaryColor
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      }
    },
  }, itIT);
  theme = createTheme(theme, {
      components: {
        MuiDataGrid: {
          styleOverrides: {
            root: {
              WebkitFontSmoothing: 'auto',
              letterSpacing: 'normal',
              border: 0,
              backgroundColor: theme.palette.background.paper,
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 900,
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                padding: 0,
              },
              '& .MuiDataGrid-columnsContainer': {
                borderTop: `1px solid ${
                  theme.palette.mode === 'light' ? '#f0f0f0' : '#ffffff1f'
                }`,
              },
              '& .MuiDataGrid-row--editing': {
                boxShadow: 'none',
              },
              '& .MuiDataGrid-iconSeparator': {},
              '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {},
              '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${
                  theme.palette.mode === 'light' ? '#f0f0f0' : '#ffffff1f'
                }`,
              },
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
            }
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
            }
          }
        },
        MuiStaticDatePicker: {
          styleOverrides: {
            root: {
              borderRadius: '16px',
            }
          }
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              border: `1px solid ${theme.palette.divider}`,
              '&:not(:last-child)': {
                borderBottom: 0,
              },
              '&:before': {
                display: 'none',
              },
            }
          }
        },
        MuiSwitch: {
          styleOverrides: {
            root: {
              padding: 8,
              '& .MuiSwitch-track': {
                borderRadius: 22 / 2,
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                },
                '&:before': {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24">{<path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                  )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                  left: 12,
                },
              },
              '& .MuiSwitch-thumb': {
                boxShadow: 'none',
                height: 16,
                width: 16,
                margin: 2,
              },
            },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: '50px',
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              marginLeft: '8px',
              marginRight: '8px',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '32px',
            }
          }
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
            }
          }
        },
        MuiToggleButton: {
          styleOverrides: {
            root: {
              borderRadius: '32px',
              border: 'none',
              "&.MuiToggleButtonGroup-grouped": {
                borderRadius: "32px !important",
                mx: 1,
                border: "none"
              }
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              //border: 0,
            }
          }
        },
        MuiAvatar: {
          styleOverrides: {
            root: {
              color: theme.palette.primary.main,
              backgroundColor: mode === 'light'
                ? lighten(theme.palette.primary.main, 0.75)
                : darken(theme.palette.primary.main, 0.6),
            }
          }
        },
        MuiFab: {
          styleOverrides: {
            root: {
              borderRadius: '16px',
              backgroundColor: mode === 'light'
                ? lighten(theme.palette.primary.main, 0.75)
                : darken(theme.palette.primary.main, 0.4),
              "&:hover": {
                backgroundColor: mode === 'light'
                  ? lighten(theme.palette.primary.main, 0.75)
                  : darken(theme.palette.primary.main, 0.4)
              },
              "&:active": {
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
              },
              color: mode === 'light' ? theme.palette.primary.main : 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            },
          }
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              //border: 'none',
            }
          }
        },
        MuiTextField: {
          defaultProps: {
            variant: 'standard'
          }
        },
        MuiFormControl: {
          defaultProps: {
            variant: 'standard'
          }
        }
      }
    });

  useEffect(() => {
    const preferredMode = localStorage.getItem("mode")
    if (preferredMode) {
      preferredMode === 'light'
        ? setMode('light')
        : setMode('dark')
    } else {
      setMode('light');
      localStorage.setItem("mode", 'light')
    }
  }, [])

  return (
    <NoSsr>
      <ThemeModeContext.Provider value={themeValue}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </ThemeModeContext.Provider>
    </NoSsr>
  );
};

export default Theme;