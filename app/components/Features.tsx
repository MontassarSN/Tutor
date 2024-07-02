import React from 'react';
import Image from 'next/image';

// Import images using StaticImageData type (if needed in the future)
interface Feature {
    label: string;
    title: string;
    CurrentPrice: string;
    PreviousPrice: string;
    colors: string;
    pic: string; // Change pic type to string
    rating: string;
    NumberOfRaters: string;
    ownerpic: string; // Change ownerpic type to string
    owner: string;
    NumberOfStudents: string;
    Time: string;
    Level: string;
}

const features: Feature[] = [
    {
        label: "Health & Fitness",
        title: "Investing In Stocks The Complete Course! (13 H...",
        CurrentPrice: "$14.00",
        PreviousPrice: "$26.00",
        colors: "bg-green-100 text-green-500",
        pic: "/BestSellingCourses/Course4.png",
        rating: "5.0",
        NumberOfRaters: "357,914",
        ownerpic: "/Features/Photo.png",
        owner: "Kevin Gilbert",
        NumberOfStudents: "265.7K",
        Time: "6 Hours",
        Level: "Beginner",
    },
    {
        label: "Personal Development",
        title: "Google Analytics Certification - Learn How To...",
        CurrentPrice: "$14.00",
        PreviousPrice: "$26.00",
        colors: "bg-rose-100 text-rose-500",
        pic: "/BestSellingCourses/Course5.png",
        rating: "5.0",
        NumberOfRaters: "357,914",
        ownerpic: "/Features/Photo.png",
        owner: "Kevin Gilbert",
        NumberOfStudents: "265.7K",
        Time: "6 Hours",
        Level: "Beginner",
    },
    {
        label: "Productivity",
        title: "Adobe XD for Web Design: Essential Principles",
        CurrentPrice: "$14.00",
        PreviousPrice: "$26.00",
        colors: "bg-gray-100 text-gray-800",
        pic: "/BestSellingCourses/Course6.png",
        rating: "5.0",
        NumberOfRaters: "357,914",
        ownerpic: "/Features/Photo.png",
        owner: "Kevin Gilbert",
        NumberOfStudents: "265.7K",
        Time: "6 Hours",
        Level: "Beginner",
    },
    {
        label: "Music",
        title: "The Python Mega Course: Build 10 Real World ...",
        CurrentPrice: "$14.00",
        PreviousPrice: "$26.00",
        colors: "bg-pink-100 text-pink-500",
        pic: "/BestSellingCourses/Course7.png",
        rating: "5.0",
        NumberOfRaters: "357,914",
        ownerpic: "/Features/Photo.png",
        owner: "Kevin Gilbert",
        NumberOfStudents: "265.7K",
        Time: "6 Hours",
        Level: "Beginner",
    },
];

const Features: React.FC = () => {
    return (
        <div className="w-5/6 bg-white mx-auto mt-10">
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center py-10 px-36">
                    <h1 className="text-3xl font-semibold">Our Features</h1>
                    <div className="text-xs text-gray-400">Vestibulum sed dolor sed diam mollis maximus vel nec dolor.<br /> Donec varius purus et eleifend porta.</div>
                </div>
                <div className="flex flex-row  w-full flex-wrap gap-10 justify-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-row w-[42%] gap-1 items-center ">
                            <div className="relative h-44 w-44">
                                <Image
                                    src={feature.pic}
                                    alt="Course"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="w-full px-4 flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <div className={`text-xs px-2 py-1 ${feature.colors}`}>{feature.label}</div>
                                    <div className="text-semibold text-gray-900">{feature.CurrentPrice}
                                        <span className="text-xs text-gray-400 line-through">{feature.PreviousPrice}</span>
                                    </div>
                                </div>
                                <div className="text-sm font-semibold  line-clamp-1 ">{feature.title}</div>
                                <div className="flex flex-row justify-between items-center ">
                                    <div className="flex flex-row items-center gap-1 text-sm">
                                        <div className="relative h-6 w-6">
                                            <Image
                                                src={feature.ownerpic}
                                                alt="Owner"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        {feature.owner}
                                    </div>
                                    <div className="flex flex-row items-center gap-1">
                                        ⭐ {feature.rating} ({feature.NumberOfRaters})
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-center ">
                                    <div className="flex flex-row gap-1 items-center">
                                        <Image src="/Features/user.png" alt="User" width={16} height={16} />
                                        {feature.NumberOfStudents}
                                        <span className="text-xs text-gray-400">students</span>
                                    </div>
                                    <div className="flex flex-row gap-1 items-center text-sm">
                                        <Image src="/Features/bar-chart.png" alt="Level" width={16} height={16} />
                                        {feature.Level}
                                    </div>
                                    <div className="flex flex-row gap-1 items-center text-xs">
                                        <Image src="/Features/Clock.png" alt="Time" width={16} height={16} />
                                        {feature.Time}
                                    </div>
                                </div>
                            </div>  
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Features;
