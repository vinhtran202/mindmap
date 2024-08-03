import Image from "next/image";

export default function Spinner() {
  return (
    <div className="flex justify-center ">
      <Image
        className="h-96"
        src="./svg/ripple.svg"
        alt="loading..."
        width={300}
        height={300}
      />
    </div>
  );
}
