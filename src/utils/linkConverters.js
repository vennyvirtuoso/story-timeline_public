export const convertGoogleDriveLink = (url) => {
    if (!url) return url;
    if (url.includes('google.com')) {
      const match = url.match(/[-\w]{25,}/);
      if (match) return `https://lh3.googleusercontent.com/d/${match[0]}`;
    }
    return url;
  };
  
  export const convertVideoLink = (url) => {
    if (!url) return url;
  
    if (url.includes('drive.google.com')) {
      const match = url.match(/[-\w]{25,}/);
      if (match)
        return `https://drive.google.com/file/d/${match[0]}/preview`;
    }
  
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const match =
        url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
      if (match) return `https://www.youtube.com/embed/${match[1]}`;
    }
  
    return url;
  };