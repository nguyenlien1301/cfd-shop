import {
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const ShareLink = ({ path, title, type, children, className }) => {
  switch (type) {
    case "twitter":
      return (
        <TwitterShareButton url={path}>
          <a
            href="#"
            className={`social-icon ${className || ""}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </TwitterShareButton>
      );
    case "instagram":
      return (
        <InstapaperShareButton url={path}>
          <a
            href="#"
            className={`social-icon ${className || ""}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </InstapaperShareButton>
      );
    case "pinterest":
      return (
        <PinterestShareButton url={path}>
          <a
            href="#"
            className={`social-icon ${className || ""}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </PinterestShareButton>
      );
    case "linkedin":
      return (
        <LinkedinShareButton>
          <a
            href="#"
            className={`social-icon ${className || ""}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </LinkedinShareButton>
      );
    default:
      return (
        <FacebookShareButton url={path}>
          <a
            href="#"
            className={`social-icon ${className || ""}`}
            title={title}
            target="_blank"
          >
            {children}
          </a>
        </FacebookShareButton>
      );
  }
};

export default ShareLink;
