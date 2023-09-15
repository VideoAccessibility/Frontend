
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Box, createTheme, ThemeProvider} from '@mui/material';


import {Home, EditDescriptionPage, Issues, UploadVideo, IssuesPage, SignIn} from './components';
import VideoPage from './components/VideoPage';

const theme = createTheme({
    palette: {
      primary: {
        light: '#C6C6C6',
        main: '#D9D9D9',
        dark: '#33363F',
      },
      secondary: {
        main: '#1D5B79',
        light: '#EF6262',
        contrastText: 'white',
      },
    },
  });


const App = () => (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Box sx={{backgroundColor : '#fff'}}>
        <Routes>
        {/* Home here is the feed */}
            <Route path='/' exact element={<Home />} />
            <Route path='/VideoPage' element={<VideoPage/>} />
            <Route path='/EditDescriptionPage' element={<EditDescriptionPage/>} />
            <Route path='/Issues' element={<Issues/>} />
            <Route path='/UploadVideo' element={<UploadVideo/>} />
            <Route path='/IssuesPage' element={<IssuesPage/>} />
            <Route path='/SignIn' element={<SignIn/>} />
        </Routes>
    </Box>
    </BrowserRouter>
    </ThemeProvider>
)

export default App;