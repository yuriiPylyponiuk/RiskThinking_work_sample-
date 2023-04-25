import { Navigation } from "@/components/NavigationComponent";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-8/12 m-auto mt-16">
        <div className="">
          <h1 className="text-4xl">Yurii Pylyponiuk</h1>
          <h2 className="text-1xl">Front-end web developer</h2>
        </div>
        <div>
          <p className="text-2xl">Contacts:</p>
          <p>Phone Number: +1(236) 889-1757</p>
          <p>Email: yuriipylyponiuk@gmail.com</p>
        </div>
      </div>
      <p className="self-center mt-10 text-2xl">
        Work Sample for UI/UX Developers
      </p>
      <Navigation />
    </div>
  );
};

export default Home;
