import Image from "next/image";
import svg from "../../app/icon.svg"

export const Logo = () => <Image src={svg} alt="logo" width={100} height={100} className="p-1" style={{margin: -20}} />