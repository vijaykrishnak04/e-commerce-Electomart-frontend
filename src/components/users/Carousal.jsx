import { Carousel } from "@material-tailwind/react";

export function Carousal() {
  return (
    <div className="px-4 py-2 md:h-[30rem]">
      <Carousel transition={{ duration: 1 }} className="rounded-xl">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9d55ba21454081.56301800cf41a.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6ab62f21454081.563018010a704.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8af2fa21454081.563018018334d.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}
