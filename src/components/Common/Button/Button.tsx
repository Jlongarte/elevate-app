import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button' 
}) => {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;