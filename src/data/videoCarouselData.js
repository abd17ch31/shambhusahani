import afterEffectsVideo from '../assets/videos/aftereffects-removed.mp4';
import canvaGif from '../assets/videos/AI Canva Bubble Button.gif';
import illustratorVideo from '../assets/videos/illustrator-removed.mp4';
import photoshopVideo from '../assets/videos/photosop removed.mp4';
import premiereProVideo from '../assets/videos/premiere-pro.mp4';
import adobeDimensionVideo from '../assets/videos/wmremove-transformed (2).mp4';

export const videoCarouselData = [
  {
    id: 1,
    title: "Adobe Photoshop",
    category: "IMAGE EDITING",
    video: photoshopVideo,
    mobileBackground: '#EAF4FF',
  },
  {
    id: 2,
    title: "Premiere Pro",
    category: "VIDEO EDITING",
    video: premiereProVideo,
    mobileBackground: '#EEEEFF',
  },
  {
    id: 3,
    title: "After Effects",
    category: "MOTION GRAPHICS",
    video: afterEffectsVideo,
    mobileBackground: '#F1EEFF',
  },
  {
    id: 4,
    title: "Canva",
    category: "DESIGN TOOL",
    video: canvaGif,
    mediaType: 'image',
    mobileBackground: '#FFF0E8',
  },
  {
    id: 5,
    title: "Adobe Illustrator",
    category: "VECTOR DESIGN",
    video: illustratorVideo,
    mobileBackground: '#FFF2DE',
  },
  {
    id: 6,
    title: "Adobe Dimension",
    category: "3D DESIGN",
    video: adobeDimensionVideo,
    mobileBackground: '#EAF7F2',
  },
];
