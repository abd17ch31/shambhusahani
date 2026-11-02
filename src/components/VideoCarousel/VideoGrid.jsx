import { videoCarouselData } from '../../data/videoCarouselData';

const VideoCard = ({ item, index }) => {
  return (
    <div
      className="mobile-video-card group relative w-full flex flex-row md:flex-col rounded-2xl overflow-hidden bg-white border border-gray-900 md:border-none md:bg-gray-100 md:shadow-sm transition-all duration-500 md:hover:-translate-y-2 md:hover:shadow-xl"
      style={{ '--mobile-card-bg': item.mobileBackground }}
    >
      
      {/* VIDEO SECTION (Left on mobile, Top on desktop) */}
      <div className="mobile-video-media relative w-1/3 md:w-full h-32 md:h-auto md:aspect-[4/5] border-r border-gray-900 md:border-none overflow-hidden shrink-0">
        {item.mediaType === 'image' ? (
          <img
            loading="lazy"
            src={item.video}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
        ) : (
          <video
            src={item.video}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
          >
            <img loading="lazy" src={item.poster} alt={item.title} className="w-full h-full object-cover" />
          </video>
        )}
        
        {/* Desktop Gradient Overlay for Video */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* TEXT SECTION (Right on mobile, Bottom on desktop) */}
      <div className="flex-1 flex flex-col justify-center p-4 md:absolute md:bottom-0 md:left-0 md:w-full md:p-6 pointer-events-none">
        <div className="flex flex-col md:block text-left md:text-white">
          <span className="hidden md:block text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
            {item.category}
          </span>
          <div className="flex items-center justify-between w-full">
            <h3 className="mobile-video-title text-sm md:text-2xl font-semibold tracking-tight text-gray-900 md:text-white leading-tight">
              {item.title}
            </h3>
            <span className="text-xs font-medium tracking-widest text-gray-400 hidden md:block pb-1">
              0{index + 1}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default function VideoGrid({ items = videoCarouselData }) {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item, index) => (
          <VideoCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
