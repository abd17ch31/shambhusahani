import afterEffectsVideo from '../assets/videos/aftereffects-removed.mp4';
import animateVideo from '../assets/videos/animate-removed.mp4';
import illustratorVideo from '../assets/videos/illustrator-removed.mp4';
import photoshopVideo from '../assets/videos/photosop removed.mp4';
import premiereProVideo from '../assets/videos/premiere-pro.mp4';

export const videoCarouselData = [
  {
    id: 1,
    title: "Adobe Photoshop",
    category: "IMAGE EDITING",
    video: photoshopVideo,
    mobileBackground: '#EAF4FF',
    poster: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Premiere Pro",
    category: "VIDEO EDITING",
    video: premiereProVideo,
    mobileBackground: '#EEEEFF',
    poster: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "After Effects",
    category: "MOTION GRAPHICS",
    video: afterEffectsVideo,
    mobileBackground: '#F1EEFF',
    poster: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Adobe Animate",
    category: "2D ANIMATION",
    video: animateVideo,
    mobileBackground: '#FFF0E8',
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    title: "Adobe Illustrator",
    category: "VECTOR DESIGN",
    video: illustratorVideo,
    mobileBackground: '#FFF2DE',
    poster: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600",
  },
];
