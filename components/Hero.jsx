const Hero = () => {
  return (
    <>
      <div
        className="hero overflow-hidden rounded-lg "
        style={{
          backgroundImage: `url(/hero.png)`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content md:py-30 py-20 text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold dark:text-gray-100">
              Welcome to Recipe Book
            </h1>
            <p className="mb-5">Discover and share amazing recipes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
