
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Box, createTheme, ThemeProvider} from '@mui/material';


import { EditDescriptionPage, SRPage} from './components';
import { SignIn, SignUp, Home, UploadVideo, UploadURL, VideoPage, AddDescriptions, EditDescriptions, AboutPage, Search, ErrorPage} from './pages';

const theme = createTheme({
    palette: {
      primary: {
        light: '#FFFFFF',
        main: '#8C1D40',
        dark: '#000000',
      },
      secondary: {
        main: '#FFC627',
        light: '#EF6262',
        contrastText: 'white',
      },
    },
    typography: {
      fontFamily: [
        'Arial',
      ].join(','),
    },
  });


const App = () => (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Box sx={{backgroundColor : '#fff'}}>
    <div className="pattern">
        <Routes>
        {/* Home here is the feed */}
            <Route path='/' exact element={<Home />} />
            <Route path='/VideoPage/:video_id' element={<VideoPage/>} />
            <Route path='/EditDescriptionPage' element={<EditDescriptionPage/>} />
            <Route path='/UploadVideo' element={<UploadVideo/>} />
            <Route path='/SignIn' element={<SignIn/>} />
            <Route path='/UploadUrl' element={<UploadURL/>} />
            <Route path='/EditDescriptions' element={<EditDescriptions/>} />
            <Route path='/AddDescriptions' element={<AddDescriptions/>} />
            <Route path='/SR' element={<SRPage/>} />
            <Route path='/SignUp' element={<SignUp/>} />
            <Route path='/AboutPage' element={<AboutPage/>} />
            <Route path="/video-search/:searchQuery" element={<Search />} />
            <Route path="/error" element={<ErrorPage />} />
        </Routes>
        </div>
    </Box>
    
    </BrowserRouter>
    </ThemeProvider>
)

export default App;