

const Footer = () => {
  return (
    <div>
      <div className="felx flex-col sm:grid grid-cols-[3fr,1fr,1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <h1 className="text-2xl">LOGO</h1>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer">+1-000-000-0000</li>
            <li className="cursor-pointer">forever@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center text-sm py-5">Copyright 2024@ ecommerse.com - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
