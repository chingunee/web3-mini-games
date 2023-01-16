import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import background from "../../assets/images/bg.png";
import rocket from "../../assets/images/rocket.png";
import game1 from "../../assets/images/game1.png";
import littleImg1 from "../../assets/images/littleImg1.png";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import titleImg1 from "../../assets/images/titleImg1.png";
import titleImg2 from "../../assets/images/titleImg2.png";
import stepImg1 from "../../assets/images/stepImg1.png";
import stepImg2 from "../../assets/images/stepImg2.png";
import stepImg3 from "../../assets/images/stepImg3.png";
import offerImg1 from "../../assets/images/offerImg1.png";
import offerImg2 from "../../assets/images/offerImg2.png";
import offerImg3 from "../../assets/images/offerImg3.png";
import offerImg4 from "../../assets/images/offerImg4.png";
import memberImg1 from "../../assets/images/memberImg1.png";
import GameCard from "./components/GameCard";
import StepCard from "./components/StepCard";
import RoadmapCard from "./components/RoadmapCard";
import OfferCard from "./components/OfferCard";
import MemberCard from "./components/MemberCard";
import { useWindowSize } from "../../components/useWindowSize";
import Footer from "../../components/Footer";

export default function HomePage() {
  const elemRef = useRef(null);
  const size = useWindowSize();

  const [isHoveredCard, setIsHoveredCard] = useState({
    id: null,
    hover: false,
  });
  const [isHoveredMember, setIsHoveredMember] = useState({
    id: null,
    hover: false,
  });
  const [prevSlide, setPrevSlide] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);
  const [cardHeight, setCardHeight] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (elemRef.current) {
      setCardHeight(elemRef.current?.clientHeight);
    }
  }, [size]);

  const toggleHoverCard = (id, state) => {
    setIsHoveredCard({ id: id, hover: state });
  };

  const toggleHoverMemberCard = (id, state) => {
    setIsHoveredMember({ id: id, hover: state });
  };

  function SamplePrevArrow(props) {
    prevSlide && props.onClick();

    setPrevSlide(false);
  }

  function SampleNextArrow(props) {
    nextSlide && props.onClick();

    setNextSlide(false);
  }

  const settings = {
    className: "",
    infinite: true,
    speed: 500,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="object-cover lg:h-screen w-screen py-20 lg:py-0"
      >
        <div className="h-full xl:container xl:px-20 md:px-12 px-4 mx-auto flex flex-col md:flex-row items-center space-y-20 md:space-y-0">
          <div className="w-full md:w-1/2 text-white font-body">
            <div className="w-full xl:w-2/3 space-y-6">
              <h1 className="uppercase font-bold lg:text-7xl md:text-5xl text-4xl">
                web 3.0 launchpad for igo & ido
              </h1>
              <p className="font-medium lg:text-lg">
                The next generation gaming ecosystem for IGOs and IDO launchpad
                web 3.0 platform{" "}
              </p>
              <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold text-lg h-14 px-8 rounded -skew-x-6">
                Explore IGO
              </button>
            </div>
          </div>
          <div className="hidden md:w-1/2 md:flex justify-center items-end xl:animate-bounce-slow">
            <img
              className="xl:w-1/2 w-2/3 object-contain"
              src={rocket}
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#02121d]">
        <div className="xl:container xl:px-20 md:px-12 px-4 mx-auto h-full w-full lg:py-32 md:py-20 py-10 flex lg:flex-row flex-col items-start space-y-6 lg:space-y-0">
          <div className="lg:w-1/3 w-full text-white font-body lg:pr-10 space-y-4">
            <h3 className="text-[#28dbd1] md:text-2xl text-lg font-semibold">
              Trending
            </h3>
            <h2 className="md:text-4xl text-2xl font-bold">
              Most Popular IGO Projects
            </h2>
            <p className="font-medium text-white/80 text-sm md:text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum,
              quod?
            </p>
            <div className="flex items-center space-x-4 pt-6">
              <div
                onClick={() => setPrevSlide(true)}
                className="border border-[#0d3340] rounded w-11 h-11 cursor-pointer hover:bg-[#28dbd1] text-[#28dbd1] hover:text-[#0a1f2f] flex items-center justify-center bg-[#0a1f2f] -skew-x-6"
              >
                <BiLeftArrowAlt size={20} />
              </div>
              <div
                onClick={() => setNextSlide(true)}
                className="border border-[#0d3340] rounded w-11 h-11 cursor-pointer hover:bg-[#28dbd1] text-[#28dbd1] hover:text-[#0a1f2f] flex items-center justify-center bg-[#0a1f2f] -skew-x-6"
              >
                <BiRightArrowAlt size={20} />
              </div>
            </div>
          </div>
          <Slider {...settings} className="lg:w-2/3 w-full">
            <div className="w-1/2 flex justify-start">
              <div className="w-11/12 h-[35rem] bg-[#0a1f2f]">
                <GameCard
                  slug={"stick-hero"}
                  bgImage={game1}
                  titleImage={littleImg1}
                  gameName="Stick Hero"
                  txt1="Public"
                  txt2="42"
                  txt3="TBA"
                />
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="w-11/12 h-[35rem] bg-[#0a1f2f]">
                <GameCard
                  slug={"torkgo"}
                  bgImage={img2}
                  titleImage={titleImg1}
                  gameName="Torkgo"
                  txt1="Private"
                  txt2="37"
                  txt3="NAS"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-11/12 h-[35rem] bg-[#0a1f2f]">
                <GameCard
                  slug={"football"}
                  bgImage={img1}
                  titleImage={titleImg2}
                  gameName="Football"
                  txt1="Public"
                  txt2="42"
                  txt3="TBA"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-11/12 h-[35rem] bg-[#0a1f2f]">
                <GameCard
                  slug={"bounce-bounce"}
                  bgImage={img2}
                  titleImage={titleImg1}
                  gameName="Bounce bounce"
                  txt1="Private"
                  txt2="37"
                  txt3="NAS"
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className="bg-[#0a1f2f]">
        <div className="xl:container xl:px-20 md:px-12 px-4 mx-auto h-full w-full md:py-32 py-10 font-body flex flex-col items-center space-y-4">
          <p className="text-[#28dbd1] font-semibold md:text-2xl text-lg">
            Getting Start
          </p>
          <h1 className="text-white font-bold md:text-5xl text-2xl text-center">
            Simple as 1,2,3
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center md:pt-16 pt-10 space-y-6 md:space-y-0">
            <div className="md:w-1/4">
              <StepCard
                id="1"
                toggle={toggleHoverCard}
                isHover={isHoveredCard}
                step="1"
                title="Submit KYC"
                img={stepImg1}
                desc="Lorem ipsum dolor sit amet consectetur adipiscing elit odio massa ege."
              />
            </div>
            <div className="md:w-1/4">
              <StepCard
                id="2"
                toggle={toggleHoverCard}
                isHover={isHoveredCard}
                step="1"
                title="Submit KYC"
                img={stepImg2}
                desc="Lorem ipsum dolor sit amet consectetur adipiscing elit odio massa ege."
              />
            </div>
            <div className="md:w-1/4">
              <StepCard
                id="3"
                toggle={toggleHoverCard}
                isHover={isHoveredCard}
                step="1"
                title="Submit KYC"
                img={stepImg3}
                desc="Lorem ipsum dolor sit amet consectetur adipiscing elit odio massa ege."
              />
            </div>
          </div>
          <div className="pt-10">
            <button className="bg-[#28dbd1] text-[#0a1f2f] hover:text-[#28dbd1] hover:border-[#28dbd1] hover:skew-x-0 duration-300 border border-transparent hover:bg-[#0a1f2f] font-semibold text-lg h-14 px-8 rounded -skew-x-6">
              Verify KYC
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#02121d]">
        <div className="xl:container xl:px-20 md:px-12 px-4 mx-auto h-full w-full md:py-20 py-10 font-body flex flex-col items-center space-y-4">
          <p className="text-[#28dbd1] font-semibold md:text-2xl text-lg">
            Explore
          </p>
          <h1 className="text-white font-bold md:text-5xl text-2xl">
            Our Roadmap
          </h1>
          <div className="hidden md:flex pt-10 w-full justify-between space-x-8">
            <div
              ref={elemRef}
              className={`w-1/2 flex flex-col space-y-[13rem] mt-[13rem]`}
            >
              <RoadmapCard
                title="Website Creation"
                step="02"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                    numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                    alias reiciendis cupiditate facere aliquid iusto inventore!"
              />
              <RoadmapCard
                title="Website Creation"
                step="04"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                    numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                    alias reiciendis cupiditate facere aliquid iusto inventore!"
              />
            </div>
            <div
              className={`p-1 h-[${cardHeight * 5}rem] bg-[#0a1f2f] rounded`}
            >
              <div className={`bg-[#28dbd1] w-3 h-[30rem] rounded`}></div>
            </div>
            <div className="w-1/2 flex flex-col space-y-[13rem]">
              <RoadmapCard
                title="Website Creation"
                step="01"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                    numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                    alias reiciendis cupiditate facere aliquid iusto inventore!"
              />
              <RoadmapCard
                title="Website Creation"
                step="03"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                    numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                    alias reiciendis cupiditate facere aliquid iusto inventore!"
              />
              <RoadmapCard
                title="Website Creation"
                step="05"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                    numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                    alias reiciendis cupiditate facere aliquid iusto inventore!"
              />
            </div>
          </div>
          <div className="flex flex-col pt-10 md:hidden w-full space-y-6">
            <RoadmapCard
              title="Website Creation"
              step="01"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                alias reiciendis cupiditate facere aliquid iusto inventore!"
            />
            <RoadmapCard
              title="Website Creation"
              step="02"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                alias reiciendis cupiditate facere aliquid iusto inventore!"
            />
            <RoadmapCard
              title="Website Creation"
              step="03"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                alias reiciendis cupiditate facere aliquid iusto inventore!"
            />
            <RoadmapCard
              title="Website Creation"
              step="04"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                alias reiciendis cupiditate facere aliquid iusto inventore!"
            />
            <RoadmapCard
              title="Website Creation"
              step="05"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusant ium! Dolores maxime 
                                numquam animi saepe sapiente tempora, veritatis velit delectus debitis provident dolore 
                                alias reiciendis cupiditate facere aliquid iusto inventore!"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#0a1f2f]">
        <div className="xl:container xl:px-20 md:px-12 px-4 mx-auto h-full w-full md:py-32 py-10 font-body flex flex-col items-center space-y-4">
          <p className="text-[#28dbd1] font-semibold md:text-2xl text-lg">
            Benefits
          </p>
          <h1 className="text-white font-bold md:text-5xl text-2xl text-center">
            What We Offer
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between items-center md:pt-16 pt-10 lg:space-x-6 space-y-6 lg:space-y-0">
            <div className="lg:w-1/4 md:w-1/2 px-4 lg:px-0">
              <OfferCard
                title="Cross Chain"
                img={offerImg1}
                desc="Lorem ipsum dolor, sit amet consec tetur adipisicing elit. 
                                Provident eius eaque aspernatur amet "
              />
            </div>
            <div className="lg:w-1/4 md:w-1/2 px-4 lg:px-0">
              <OfferCard
                title="Stack Pad"
                img={offerImg2}
                desc="Lorem ipsum dolor, sit amet consec tetur adipisicing elit. 
                                Provident eius eaque aspernatur amet "
              />
            </div>
            <div className="lg:w-1/4 md:w-1/2 px-4 lg:px-0">
              <OfferCard
                title="Multi Layer"
                img={offerImg3}
                desc="Lorem ipsum dolor, sit amet consec tetur adipisicing elit. 
                                Provident eius eaque aspernatur amet "
              />
            </div>
            <div className="lg:w-1/4 md:w-1/2 px-4 lg:px-0">
              <OfferCard
                title="Elite Projects"
                img={offerImg4}
                desc="Lorem ipsum dolor, sit amet consec tetur adipisicing elit. 
                                Provident eius eaque aspernatur amet "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#02121d]">
        <div className="xl:container xl:px-20 md:px-12 px-4 mx-auto h-full w-full md:py-20 py-10 font-body flex flex-col items-center">
          <p className="text-[#28dbd1] font-semibold md:text-2xl text-lg">
            Team
          </p>
          <h1 className="text-white font-bold md:text-5xl text-2xl text-center">
            Meet the Crew
          </h1>
          <div className="pt-10 flex flex-wrap lg:flex-nowrap items-center justify-between lg:space-x-6">
            <div className="md:w-[48%] md:mr-2 mb-5 lg:m-0">
              <MemberCard
                id="1"
                toggle={toggleHoverMemberCard}
                isHover={isHoveredMember}
                name="Alex Mike"
                profession="Founder"
                img={memberImg1}
              />
            </div>
            <div className="md:w-[48%] md:ml-2 mb-5 lg:m-0">
              <MemberCard
                id="2"
                toggle={toggleHoverMemberCard}
                isHover={isHoveredMember}
                name="David Vice"
                profession="Founder"
                img={memberImg1}
              />
            </div>
            <div className="md:w-[48%] md:mr-2 mt-5 lg:m-0">
              <MemberCard
                id="3"
                toggle={toggleHoverMemberCard}
                isHover={isHoveredMember}
                name="Young Jong"
                profession="Founder"
                img={memberImg1}
              />
            </div>
            <div className="md:w-[48%] md:ml-2 mt-5 lg:m-0">
              <MemberCard
                id="4"
                toggle={toggleHoverMemberCard}
                isHover={isHoveredMember}
                name="David Dzue"
                profession="Founder"
                img={memberImg1}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
