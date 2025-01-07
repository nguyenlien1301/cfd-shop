export const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

export const MESSAGE = {
  required: "Please enter your information",
  email: "Please enter email with format abc@def.com",
  phone: "Please enter correct phone number",
};
