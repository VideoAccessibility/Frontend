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
  { name: 'About Vidscribe', icon: <YouTubeIcon />, href: '/AboutPage'},
];

export const people = [
  {image:"https://webapp4.asu.edu/photo-ws/directory_photo/pfazli?size=medium&break=1715630896" , name: "Pooyan Fazli", info: "Pooyan Fazli is an assistant professor and the director of the People and Robots Laboratory (PeRL) in the School of Arts, Media and Engineering (AME) and the Media and Immersive eXperience (MIX) Center at Arizona State University. His research focuses on artificial intelligence, autonomous robots, multi-robot systems, human-robot teaming, and robot learning.", email:"pooyan@asu.edu"},
  {image:"https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=IAD0fQQAAAAJ&citpid=6" , name: "Hasti Seifi", info: "Hasti Seifi is an assistant professor in the School of Computing and Augmented Intelligence. Previously, she was an assistant professor at the University of Copenhagen. Her research is at the intersection of human-computer interaction, haptics and social robotics.", email: "hasti.seifi@asu.edu"},
  {image:"https://ca.slack-edge.com/T03TLJL4WFM-U05JZGH8U72-a2a6fccf8772-192" , name: "Sina ", info:"Sina Elahi Manesh is an undergraduate student of Computer Engineering at the Sharif University of Technology. His research interest lies into the intersection of Human-Computer Interaction, Social Computing, and Accessibility."},
  {image:"https://media.licdn.com/dms/image/C5603AQHE8rNO86axFw/profile-displayphoto-shrink_400_400/0/1663634479068?e=1721260800&v=beta&t=42Go2ZZ-vrjDowMbttdK48wVdNi7rqU2NQqyVaw3fRI" , name: "Maryam Saadat Cheema", info:"A Master's in CS student Arizona State University. Her work focuses on video accessibility for blind and low vision users."},
]

export const aboutWebsite = ["Welcome to Vidscribe, a platform designed specficically to empower blind and low vision users to create AI audio descriptions for videos. On Vidscribe, you can upload videos or paste a link of a youtube video to be described. After a while, a described video will be visible on the homepage. The audio descriptions are generated using GPT-4-Vision.",
"By providing a platform where blind users can independently create audio descriptions, our aim with Vidscribe is inclusivity and providing equal access to information and entertainment."]
