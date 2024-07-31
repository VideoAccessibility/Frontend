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
  {image:"https://media.licdn.com/dms/image/C5603AQHE8rNO86axFw/profile-displayphoto-shrink_200_200/0/1663634479068?e=1727913600&v=beta&t=qA_QhDtGP6B1vUljHLSLhhehJkIPXbYYEvLG6yEjpxY", name: "Maryam S Cheema", info:"Arizona State University"},
  {image:"https://media.licdn.com/dms/image/D4D03AQHfxJERdOpCqw/profile-displayphoto-shrink_800_800/0/1720546929013?e=1727913600&v=beta&t=y4C3czpvBgqllkQFyBcUrZa_w-7TSWrhXEkKPKdyKeQ" , name: "Sina Elahimanesh", info:"Arizona State University"},
  {image:"https://webapp4.asu.edu/photo-ws/directory_photo/pfazli?size=medium&break=1715630896" , name: "Pooyan Fazli", info: "Arizona State University.", email:"pooyan@asu.edu", site:"https://pooyanfazli.com/"},
  {image:"https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=IAD0fQQAAAAJ&citpid=6" , name: "Hasti Seifi", info: "Arizona State University", email: "hasti.seifi@asu.edu", site:"https://hastiseifi.com/"},
]

export const aboutWebsite = ["Welcome to VidScribe, a platform designed specficically to empower blind and low vision users to create AI audio descriptions for videos. On Vidscribe, you can upload videos or paste a link of a youtube video to be described. After a while, a described video will be visible on the homepage. The audio descriptions are generated using a vision language model.",
"By providing a platform where blind users can independently create audio descriptions, our aim with VidScribe is inclusivity and providing equal access to information and entertainment."]
