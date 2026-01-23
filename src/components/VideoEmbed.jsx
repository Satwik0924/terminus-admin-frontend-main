import { useEffect } from "react";

const VimeoEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
      <iframe
        src="https://player.vimeo.com/video/1157448117?autoplay=1&loop=1&muted=1&background=1"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        referrerpolicy="strict-origin-when-cross-origin"
        title="Terminus Shorts"
      ></iframe>
    </div>
  );
};

export default VimeoEmbed;
