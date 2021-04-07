import {UseDarkMode} from "./components/darkLightmode/useDarkMode";
import {darkTheme, lightTheme} from "./styles/Themes";
import styled, {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./styles/GlobalStyles";
import Toggle from "./components/darkLightmode/toggler";
import OurRouter from './routes';
import { useState} from "react";
import Burger from "./components/navi/burger";
import Menu from "./components/navi/menu";

const MenuWrapper = styled.div`
  margin-bottom: 80px;
`;
const ToggleButton = styled.div`
    width: 100vw;
    display:flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;


function App() {

  const [theme, themeToggler, mountedComponent] = UseDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const [open, setOpen] = useState(false);

  if(!mountedComponent) return <div/>
  return (
    <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles/>
           <ToggleButton>
          <Toggle theme={theme} toggleTheme={themeToggler} />
           </ToggleButton>
           <MenuWrapper>
             <Burger  open={open} setOpen={setOpen}/>
             <Menu  open={open} setOpen={setOpen} />
          </MenuWrapper>

          <OurRouter/>
        </>
    </ThemeProvider>
  );
}

export default App;

