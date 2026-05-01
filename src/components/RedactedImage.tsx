import Image from "next/image";

interface Redaction {
  top: string;
  left: string;
  width: string;
  height: string;
}

interface RedactedImageProps {
  src: string;
  alt: string;
  redactions?: Redaction[];
  className?: string;
}

export default function RedactedImage({
  src,
  alt,
  redactions = [],
  className = "",
}: RedactedImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={800}
        className="w-full h-auto"
      />
      {redactions.map((r, i) => (
        <div
          key={i}
          className="absolute bg-black"
          style={{
            top: r.top,
            left: r.left,
            width: r.width,
            height: r.height,
          }}
        />
      ))}
    </div>
  );
}
