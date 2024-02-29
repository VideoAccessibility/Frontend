
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Box, createTheme, ThemeProvider} from '@mui/material';


import {Home, EditDescriptionPage, Issues, UploadVideo, IssuesPage, SignIn, UploadUrl, EditDescriptions, AddDescriptions, SRPage, SignUp, VideoSearch} from './components';
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
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
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
            <Route path='/UploadUrl' element={<UploadUrl/>} />
            <Route path='/EditDescriptions' element={<EditDescriptions/>} />
            <Route path='/AddDescriptions' element={<AddDescriptions/>} />
            <Route path='/SR' element={<SRPage/>} />
            <Route path='/SignUp' element={<SignUp/>} />
            <Route path="/video-search/:searchQuery" element={<VideoSearch />} />
            
        </Routes>
    </Box>
    </BrowserRouter>
    </ThemeProvider>
)

export default App;