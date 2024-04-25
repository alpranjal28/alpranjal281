import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className=" text-center my-16" id="about">
        <SectionHeader subHeader="Our Story" mainHeader="About Us" />
        <div className="max-w-md mx-auto text-gray-500 font-medium mt-4 flex flex-col gap-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eos culpa, hic ex perferendis est maxime nulla
            quibusdam quisquam cum aliquid ab tenetur atque deserunt quis quo
            nihil optio nesciunt.
          </p>
          <p>
            Reprehenderit eos culpa, hic ex perferendis est maxime nulla
            quibusdam quisquam cum aliquid ab tenetur atque deserunt quis quo
            nihil optio nesciunt.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eos culpa.
          </p>
        </div>
      </section>

      <section className="text-center flex flex-col gap-4" id="contact">
        <SectionHeader subHeader="Do not hesitate" mainHeader="Contact us" />
        <a href="tel:+919876540321" className="text-2xl font-medium">
          +91 98 7654 0321
        </a>
      </section>
    </>
  );
}
