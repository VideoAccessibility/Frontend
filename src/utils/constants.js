import HomeIcon from '@mui/icons-material/Home';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BugReportIcon from '@mui/icons-material/BugReport';
import YouTubeIcon from '@mui/icons-material/YouTube';
import maryamImage from './images/maryam.jpeg';
import sinaImage from './images/sina.jpeg';
export const logo = './viLogo.png';

export const categories = [
  { name: 'Home', icon: <HomeIcon />,  href: '/'},
  { name: 'Upload', icon: <FileUploadIcon />, href: '/UploadVideo'},
  { name: 'Use URL', icon: <YouTubeIcon />, href: '/UploadUrl'},
  { name: 'About ViDScribe', icon: <YouTubeIcon />, href: '/AboutPage'},
];

export const people = [
  {image:maryamImage, name: "Maryam S Cheema", info:"Arizona State University", zoom: false},
  {image:sinaImage , name: "Sina Elahimanesh", info:"Arizona State University", zoom: true},
  {image:"https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=IAD0fQQAAAAJ&citpid=6" , name: "Hasti Seifi", info: "Arizona State University", email: "hasti.seifi@asu.edu", site:"https://hastiseifi.com/", zoom: false},
  {image:"https://pooyanfazli.com/images/PooyanFazli.jpg" , name: "Pooyan Fazli", info: "Arizona State University.", email:"pooyan@asu.edu", site:"https://pooyanfazli.com/", zoom: false},
]

export const aboutWebsite = ["Welcome to ViDScribe, a platform designed to empower blind and low vision users by providing AI-generated audio descriptions for videos and allowing users to ask questions about the content.",
"On ViDScribe, you can upload videos or paste a YouTube link to receive descriptions. Once processed, the described video will appear on your homepage. Our goal with ViDScribe is to foster inclusivity and ensure equal access to information for blind and low vision users."]
