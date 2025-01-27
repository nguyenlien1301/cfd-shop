import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  link = "",
  className = "",
  type = "text",
  loading = false,
  disabled,
  children,
  ...rest
}) => {
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "btn btn-primary";
      break;

    case "outline":
      variantClass = "btn btn-outline-primary-2";
      break;

    case "outline-black":
      variantClass = "btn btn-outline-dark-2";
      break;
    case "outline-white":
      variantClass = "btn btn-outline-white";
      break;
    default:
      variantClass = "";
      break;
  }

  if (disabled) {
    variantClass = "btn btn-light";
    rest.onClick = () => {};
  }

  if (link) {
    return (
      <Link to={link} className={`${variantClass} ${className}`} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${variantClass} ${className} ${
        loading ? "--processing" : ""
      }`}
      {...rest}
    >
      {children}
      {loading && (
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
    </button>
  );
};

export default Button;
