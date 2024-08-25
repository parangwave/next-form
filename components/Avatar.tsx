import Image from "next/image";
import defaultProfileImg from "@/public/profile.jpg";

export default function UserAvatar({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const avatarSrc = src ? src : defaultProfileImg;

  return (
    <>
      <Image
        src={avatarSrc}
        alt={alt}
        width={width}
        height={height}
        className={`overflow-hidden rounded-full border border-zinc-300 ${className}`}
      />
    </>
  );
}
