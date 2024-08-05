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
  {image:"https://media.licdn.com/dms/image/C5603AQHE8rNO86axFw/profile-displayphoto-shrink_200_200/0/1663634479068?e=1727913600&v=beta&t=qA_QhDtGP6B1vUljHLSLhhehJkIPXbYYEvLG6yEjpxY", name: "Maryam S Cheema", info:"Arizona State University", zoom: false},
  {image:"https://media.licdn.com/dms/image/D4D03AQHfxJERdOpCqw/profile-displayphoto-shrink_800_800/0/1720546929013?e=1727913600&v=beta&t=y4C3czpvBgqllkQFyBcUrZa_w-7TSWrhXEkKPKdyKeQ" , name: "Sina Elahimanesh", info:"Arizona State University", zoom: true},
  {image:"https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=IAD0fQQAAAAJ&citpid=6" , name: "Hasti Seifi", info: "Arizona State University", email: "hasti.seifi@asu.edu", site:"https://hastiseifi.com/", zoom: false},
  {image:"https://pooyanfazli.com/images/PooyanFazli.jpg" , name: "Pooyan Fazli", info: "Arizona State University.", email:"pooyan@asu.edu", site:"https://pooyanfazli.com/", zoom: false},
]

export const aboutWebsite = ["Welcome to VidScribe, a platform designed to empower blind and low vision users by providing AI-generated audio descriptions for videos and allowing users to ask questions about the content.",
"On VidScribe, you can upload videos or paste a YouTube link to receive descriptions. Once processed, the described video will appear on your homepage. Our goal with VidScribe is to foster inclusivity and ensure equal access to information for blind and low vision users."]
