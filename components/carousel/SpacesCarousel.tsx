import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getSpacesByUser } from '@api/users';
import { Space } from '@customTypes/spaces';
import { useRouter } from 'next/router';

const carouselSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: 'slides',
};

export const SpacesCarousel: React.FC = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        const spaces = await getSpacesByUser();
        setSpaces(spaces);
    };

    const handleSpaceClick = (space_id: string) => {
        router.push(`/spaces/${space_id}`);
    };

    return (
        <div className="carousel-container w-full px-10">
            <Slider {...carouselSettings}>
                {spaces.map((space) => (
                    <div
                        key={space.space_id}
                        className="space-card w-1/3 cursor-pointer"
                        onClick={() => handleSpaceClick(space.space_id)}
                    >
                        <div className="bg-gray-300 h-32 w-32 flex items-center justify-center m-auto">
                            {space.name}
                        </div>
                        <div className="text-center mt-2">{space.name}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
