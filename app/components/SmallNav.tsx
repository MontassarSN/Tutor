import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface SmallNavProps {
  children: ReactNode;
}
                                                                                                                       
const SmallNav: React.FC<SmallNavProps> = ({ children }) => {
  return (
    <div className="flex flex-row py-5 px-56 justify-between">
        <Link href="/">
        <div className="flex flex-row justify-between items-center gap-1">
        <div className="relative h-12 w-12">
          <Image src="/GraduationCap.jpg" alt="Graduation Cap" layout="fill" objectFit="contain" />
        </div>
        <h1 className="text-2xl font-bold">E-Tutor</h1>
        </div>
        </Link>

      <>{children}</>
    </div>
  );
}

export default SmallNav;
