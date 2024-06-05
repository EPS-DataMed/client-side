import { createGlobalStyle } from 'styled-components'
import { darkenColor } from '../utils/colors'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *,
  *:hover,
  *:focus,
  *:active{
    outline: none;
  }

  button,
  fieldset,
  input {
    border: none;
    color: inherit;
    font: inherit;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 6px; 
    border-radius: ${(props) => props.theme.radii.full};
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.neutral400}; 
    border-radius: ${(props) => props.theme.radii.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.blue500}; 
    border-radius: ${(props) => props.theme.radii.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => darkenColor(props.theme.colors.blue440, 0.4)}; 
  }


  body {
    background-color: ${(props) => props.theme.colors.neutral100};
    color: ${(props) => props.theme.colors.neutral900};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Open Sans, sans-serif;
  }
`
