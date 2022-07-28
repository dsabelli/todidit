const Hero = ({ children, text, className }) => {
  return (
    <div className="hero md:min-h-screen">
      <div
        className={`hero-content bg-base-100 flex-col-reverse md:flex-row-reverse items-center flex-1 w-full ${className}`}
      >
        {children}
        <div className="">{text}</div>
      </div>
    </div>
  );
};

export default Hero;
