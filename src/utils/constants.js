import HomeIcon from '@mui/icons-material/Home';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BugReportIcon from '@mui/icons-material/BugReport';
import YouTubeIcon from '@mui/icons-material/YouTube';
export const logo = './viLogo.png';

export const categories = [
  { name: 'Home', icon: <HomeIcon />,  href: '/'},
  { name: 'Upload', icon: <FileUploadIcon />, href: '/UploadVideo'},
  { name: 'Use URL', icon: <YouTubeIcon />, href: '/UploadUrl'},
  { name: 'About VidScribe', icon: <YouTubeIcon />, href: '/AboutPage'},
];

export const people = [
  {image:"https://media.licdn.com/dms/image/v2/C5603AQHE8rNO86axFw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1663634479068?e=1735776000&v=beta&t=aJFmX_R0Fp0-8O5yPoCoxq8Li253ihOCZOzncwuFIQk", name: "Maryam S Cheema", info:"Arizona State University", zoom: false},
  {image:"https://media.licdn.com/dms/image/v2/D4D03AQFFvlF4uARqxQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729888171070?e=1735776000&v=beta&t=0ghICC39Llvz2NTj79bMVFLLEj41XmoFE10d-HGmPrM" , name: "Sina Elahimanesh", info:"Arizona State University", zoom: true},
  {image:"https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=IAD0fQQAAAAJ&citpid=6" , name: "Hasti Seifi", info: "Arizona State University", email: "hasti.seifi@asu.edu", site:"https://hastiseifi.com/", zoom: false},
  {image:"https://pooyanfazli.com/images/PooyanFazli.jpg" , name: "Pooyan Fazli", info: "Arizona State University.", email:"pooyan@asu.edu", site:"https://pooyanfazli.com/", zoom: false},
]

export const aboutWebsite = ["Welcome to VidScribe, a platform designed to empower blind and low vision users by providing AI-generated audio descriptions for videos and allowing users to ask questions about the content.",
"On VidScribe, you can upload videos or paste a YouTube link to receive descriptions. Once processed, the described video will appear on your homepage. Our goal with VidScribe is to foster inclusivity and ensure equal access to information for blind and low vision users."]
