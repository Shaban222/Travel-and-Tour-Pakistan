const Hero2 = () => {
    return (
      <>
        <div className="px-36 py-10">
          <div className="container mx-auto">
            <div className="flex flex-row items-center justify-between">
              {/* Left Section (Text) */}
              <div className="w-1/2 px-4">
                <div className="mt-10">
                  <span className="text-[#41A4FF] mb-2 block text-lg font-semibold">
                    Travel with Us
                  </span>
                  <h2 className="text-dark mb-8 text-4xl font-bold">
                    TAKE ONLY MEMORIES, LEAVE ONLY FOOTPRINTS
                  </h2>
                  <p className="text-body-color mb-8 text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                    nulla enim aperiam culpa cupiditate quas animi ducimus
                    blanditiis! Dolorum, perspiciatis.
                  </p>
                  <p className="text-body-color mb-12 text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                    nulla enim aperiam culpa cupiditate quas animi ducimus
                    blanditiis! Dolorum, perspiciatis.
                  </p>
                </div>
              </div>
  
              {/* Right Section (Images) */}
              <div className="w-1/2">
                <div className="flex flex-row items-center justify-between">
                  {/* First Image Column */}
                  <div className="w-1/2 px-3">
                    <div className="py-4">
                      <img
                        src="https://images.unsplash.com/photo-1627895457805-c7bf42cb9873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="Travel Destination 1"
                        className="w-full rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="py-4">
                      <img
                        src="https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                        alt="Travel Destination 2"
                        className="w-full rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
  
                  {/* Second Image Column */}
                  <div className="w-1/2 px-3">
                    <div className="py-4">
                      <img
                        src="https://images.unsplash.com/photo-1594993877167-a08f13013dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                        alt="Travel Destination 3"
                        className="w-full rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Hero2;
  